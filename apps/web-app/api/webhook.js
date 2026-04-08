/**
 * Vercel Serverless Function: webhook.js
 * 
 * Securely handles Stripe events and updates user tiers in Supabase (PCI Compliant).
 */

import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY // Use Service Role for DB Write
);

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export const config = {
  api: {
    bodyParser: false, // Stripe signature verification requires raw body
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  const sig = req.headers['stripe-signature'];
  let event;

  try {
    // 1. Verify Signature (Sovereign Security Pattern)
    const rawBody = await getRawBody(req);
    event = stripe.webhooks.constructEvent(rawBody, sig, endpointSecret);
  } catch (err) {
    console.error(`[WEBHOOK_ERROR] Signature Verification Failed: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // 2. Handle Event
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;
      
      // Extract userId from Metadata (Sovereign Mapping)
      const userId = session.metadata?.userId || session.client_reference_id;
      
      if (userId) {
        console.log(`[STRIPE_SUCCESS] User ${userId} completed checkout for Pro.`);
        
        // 3. Update Supabase User Tier
        const { error } = await supabase
          .from('user_profiles')
          .update({ tier: 'pro', subscription_id: session.subscription })
          .eq('user_id', userId);

        if (error) {
          console.error(`[SUPABASE_SYNC_ERROR] ${error.message}`);
        }
      }
      break;

    case 'customer.subscription.deleted':
      const subscription = event.data.object;
      // Handle cancellation logic (Downgrade user)
      break;

    default:
      console.log(`[STRIPE_INFO] Unhandled event type ${event.type}`);
  }

  res.status(200).json({ received: true });
}

// Utility to get raw body for signature verification
async function getRawBody(req) {
  return new Promise((resolve, reject) => {
    let chunks = [];
    req.on('data', (chunk) => chunks.push(chunk));
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', (err) => reject(err));
  });
}
