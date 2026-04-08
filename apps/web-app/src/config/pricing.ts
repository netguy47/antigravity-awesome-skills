export interface PricingTier {
  id: string;
  name: string;
  price: string;
  priceId: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  cta: string;
}

export const PRICING_TIERS: PricingTier[] = [
  {
    id: 'free',
    name: 'Free',
    price: '$0',
    priceId: '',
    description: 'Perfect for getting started with cardiovascular awareness.',
    features: [
      '5 AI Analyses per month',
      '7-day Data History',
      'Basic Health Heuristics',
      'Manual Data Ingestion',
    ],
    cta: 'Current Plan',
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '$29.99',
    priceId: 'price_PRO_SUBSCRIPTION_ID', // Replace with real Stripe Price ID
    description: 'Advanced monitoring for proactive health management.',
    features: [
      'Unlimited AI Analyses',
      'Unlimited History (Visual Trends)',
      'Confidence Score Transparency',
      '3-Day Projection (AI Trajectory)',
      'Priority Email Support',
    ],
    isPopular: true,
    cta: 'Upgrade to Pro',
  },
  {
    id: 'business',
    name: 'Business',
    price: '$99.99',
    priceId: 'price_BIZ_SUBSCRIPTION_ID', // Replace with real Stripe Price ID
    description: 'For clinics and teams needing multi-user health management.',
    features: [
      'Everything in Pro',
      'Manage up to 10 Profiles',
      'API Access for Data Export',
      'Custom Risk Thresholds',
      '24/7 Priority Support',
    ],
    cta: 'Get Business',
  },
];
