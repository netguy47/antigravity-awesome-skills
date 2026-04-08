/**
 * Vercel Serverless Function: checkout.js
 * 
 * Securely creates a Stripe Checkout Session for HealthShield AI.
 */

import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_dummy');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { priceId, successUrl, cancelUrl, userId } = req.body;

  if (!priceId) {
    return res.status(400).json({ error: 'Missing priceId' });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      client_reference_id: userId, // 👈 Identifies user in Webhook
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      subscription_data: {
        trial_period_days: 14,
      },
      metadata: {
        userId: userId, // 👈 Extra redundancy
      },
      allow_promotion_codes: true,
      success_url: successUrl || `${req.headers.origin}/dashboard?success=true`,
      cancel_url: cancelUrl || `${req.headers.origin}/pricing?canceled=true`,
    });

    res.status(200).json({ url: session.url });

  } catch (error) {
    console.error(`[STRIPE_CHECKOUT_ERROR] ${error.message}`);
    res.status(500).json({ error: 'Failed to create payment session' });
  }
}
