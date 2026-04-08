import React, { useState } from 'react';
import { PRICING_TIERS } from '../config/pricing';
import { Check, ShieldCheck, Zap, Info } from 'lucide-react';
import { usePageMeta } from '../hooks/usePageMeta';
import { supabase } from '../lib/supabase';

export function Pricing(): React.ReactElement {
  const [loadingTier, setLoadingTier] = useState<string | null>(null);

  usePageMeta({
    title: 'Pricing - HealthShield AI Premium',
    description: 'Upgrade your cardiovascular health intelligence with Pro and Business plans.',
    canonicalPath: '/pricing',
  });

  const handleUpgrade = async (priceId: string, tierId: string) => {
    if (!priceId) return;
    setLoadingTier(tierId);
    try {
      // 1. Get current sovereign user (Sovereign Identify Pattern)
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        // Redirect to login if user is not authenticated
        window.location.href = '/login';
        return;
      }

      // 2. Initiate Secure Checkout with userId mapping
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          priceId,
          userId: user.id, // 👈 Critical for Webhook Sync
          successUrl: `${window.location.origin}/dashboard?success=true`,
          cancelUrl: `${window.location.origin}/pricing?canceled=true`,
        }),
      });
      const { url } = await response.json();
      if (url) window.location.href = url;
    } catch (err) {
      console.error('Checkout failed:', err);
    } finally {
      setLoadingTier(null);
    }
  };

  return (
    <div className="flex flex-col space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-black tracking-tight sm:text-6xl text-slate-900 dark:text-slate-100 italic uppercase">
          Intelligence Tiers
        </h1>
        <p className="max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-400 font-medium">
          Choose the level of analysis and monitoring that matches your health goals.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {PRICING_TIERS.map((tier) => (
          <div
            key={tier.id}
            className={`relative rounded-3xl p-8 transition-all duration-300 hover:scale-[1.02] ${
              tier.isPopular
                ? 'bg-indigo-600 text-white shadow-2xl shadow-indigo-500/40 ring-4 ring-indigo-500/20'
                : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 shadow-xl'
            }`}
          >
            {tier.isPopular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-indigo-200 px-4 py-1 text-xs font-black uppercase text-indigo-900 tracking-widest shadow-lg">
                Most Popular
              </div>
            )}
            
            <div className="flex flex-col h-full space-y-8">
              <div>
                <div className="flex items-center space-x-2 text-sm font-black uppercase tracking-widest opacity-80">
                  {tier.id === 'pro' ? <Zap size={16} /> : <ShieldCheck size={16} />}
                  <span>{tier.name}</span>
                </div>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-5xl font-black tracking-tighter italic">
                    {tier.price}
                  </span>
                  <span className="text-sm font-bold opacity-60">/month</span>
                </div>
                <p className="mt-4 text-sm font-medium opacity-80 leading-relaxed">
                  {tier.description}
                </p>
              </div>

              <div className="flex-1 space-y-4">
                {tier.features.map((feature) => (
                  <div key={feature} className="flex items-start space-x-3 group">
                    <div className={`mt-0.5 rounded-full p-1 ${
                      tier.isPopular ? 'bg-white/20' : 'bg-indigo-600/10 dark:bg-indigo-400/10'
                    }`}>
                      <Check size={12} className={tier.isPopular ? 'text-white' : 'text-indigo-600 dark:text-indigo-400'} />
                    </div>
                    <span className="text-sm font-bold group-hover:translate-x-1 transition-transform">{feature}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => handleUpgrade(tier.priceId, tier.id)}
                disabled={tier.id === 'free' || loadingTier === tier.id}
                className={`w-full rounded-2xl py-4 text-sm font-black uppercase tracking-widest transition-all ${
                  tier.isPopular
                    ? 'bg-white text-indigo-600 hover:bg-slate-50'
                    : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-600/20'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {loadingTier === tier.id ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    <span>Processing...</span>
                  </div>
                ) : (
                  tier.cta
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
         <div className="rounded-2xl bg-slate-100 dark:bg-slate-900/50 p-6 flex flex-col space-y-4">
            <div className="flex items-center space-x-2 text-indigo-600 dark:text-indigo-400">
               <Info size={18}/>
               <span className="text-xs font-black uppercase tracking-widest">Why Pro?</span>
            </div>
            <p className="text-sm font-bold text-slate-600 dark:text-slate-400 opacity-80 leading-relaxed font-mono italic">
               &gt; Access Confidence Scores (transparency) and 3-Day Projections (predictive insights) to get a deeper metabolic edge.
            </p>
         </div>
         <div className="rounded-2xl bg-slate-100 dark:bg-slate-900/50 p-6 flex flex-col space-y-4">
            <div className="flex items-center space-x-2 text-indigo-600 dark:text-indigo-400">
               <ShieldCheck size={18}/>
               <span className="text-xs font-black uppercase tracking-widest">Data Privacy</span>
            </div>
            <p className="text-sm font-bold text-slate-600 dark:text-slate-400 opacity-80 leading-relaxed font-mono italic">
               &gt; All analyses are performed with aggressive privacy guardrails. We never share raw health logs with 3rd parties.
            </p>
         </div>
      </div>
    </div>
  );
}

export default Pricing;
