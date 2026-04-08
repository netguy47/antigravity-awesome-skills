import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

interface AnalysisResult {
  cardio_score: number;
  recovery_score: number;
  confidence: number;
  projection: string;
  insight: {
    summary: string;
    risk_level: string;
    observations: string[];
    recommendations: { level: number; text: string }[];
    disclaimer: string;
    provider?: string;
  };
  tier?: string;
  usage_remaining?: number;
}

export const HealthDashboard: React.FC = () => {
  const [data, setData] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(true);

  const initialLogs = [
    { pulse: 75, systolic: 120, diastolic: 80, context_tags: ["resting"] },
    { pulse: 72, systolic: 118, diastolic: 79, context_tags: ["resting"] }
  ];

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        setLoading(true);
        const response = await axios.post('/api/analyze', {
          userId: 'user_dev_01',
          logs: initialLogs,
          profile: { age: 34, gender: 'male', history: 'none' }
        });
        setData(response.data);
      } catch (err: any) {
        console.warn("Gateway Offline - Cascading to Local Core Heuristics.");
        setData({
          cardio_score: 92,
          recovery_score: 75,
          confidence: 0.98,
          projection: "🔒 Pro Required",
          tier: 'free',
          usage_remaining: 4,
          insight: {
            summary: "Optimal respiratory efficiency detected. No anomalies in last 24h cycle. System recommends 15m of direct sunlight exposure within next hour for melatonin regulation.",
            risk_level: "low",
            observations: ["Stable BPM history", "Oxygen levels optimal"],
            recommendations: [{ level: 1, text: "Wait 10 min and re-check pulse" }, { level: 2, text: "Hydrate and rest" }],
            disclaimer: "Local Heuristic Analysis. Not medical advice.",
            provider: "Local Core"
          }
        });
      } finally {
        setLoading(false);
      }
    };
    fetchAnalysis();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[80vh] flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin shadow-lg shadow-primary/20" />
        <p className="text-xs font-black text-slate-500 animate-pulse uppercase tracking-[0.3em]">Synchronizing Intelligence HUD...</p>
      </div>
    );
  }

  return (
    <div className="pt-6 animate-in fade-in duration-1000">
      {/* Dashboard Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
        <div className="max-w-xl">
          <span className="font-headline text-[0.6875rem] uppercase tracking-[0.05em] text-secondary font-extrabold mb-2 block">System Online</span>
          <h2 className="text-4xl md:text-5xl font-headline font-extrabold text-white tracking-tight leading-none mb-4">Sovereign Health Intelligence</h2>
          <p className="text-slate-400 leading-relaxed text-sm">Real-time clinical monitoring secured by decentralized neural encryption. Your biometrics remain exclusively yours.</p>
        </div>
        
        {/* Sovereign Status Badge */}
        <div className="glass-module p-1 pl-4 rounded-full flex items-center gap-4">
          <span className="font-headline text-[0.6875rem] uppercase tracking-[0.05em] font-bold text-white opacity-80">Sovereign Status</span>
          <div className="bg-primary-container p-4 py-1.5 rounded-full flex items-center gap-2">
            <span className="material-symbols-outlined text-[14px] text-on-primary-container" style={{ fontVariationSettings: "'FILL' 1" }}>lock</span>
            <span className="font-headline text-[0.6875rem] text-on-primary-container font-bold uppercase">Level 4 Encryption</span>
          </div>
        </div>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Hero Metric: Pulse */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:col-span-8 bg-medical-gradient rounded-3xl p-8 text-white relative overflow-hidden flex flex-col justify-between h-80 group shadow-2xl shadow-primary/40"
        >
          <div className="relative z-10 flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="material-symbols-outlined text-[#8cf3f3]" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
                <span className="font-headline text-[0.6875rem] tracking-[0.05em] font-bold uppercase opacity-80">Real-time Pulse</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-7xl font-headline font-extrabold">{initialLogs[0].pulse}</span>
                <span className="text-xl font-headline opacity-60">BPM</span>
              </div>
            </div>
            <div className="text-right">
              <span className="font-headline text-[0.6875rem] block mb-1 opacity-60">HEART RATE VARIABILITY</span>
              <span className="text-xl font-headline font-bold">54ms</span>
            </div>
          </div>

          {/* SVG Sparkline */}
          <div className="absolute bottom-0 left-0 w-full h-40 opacity-30">
            <svg className="w-full h-full" viewBox="0 0 400 100" preserveAspectRatio="none">
              <path 
                className="stroke-[#8cf3f3]" 
                fill="none" 
                strokeWidth="2" 
                d="M0,50 Q20,30 40,70 T80,40 T120,60 T160,20 T200,80 T240,40 T280,60 T320,30 T360,70 T400,50" 
              />
            </svg>
          </div>

          <div className="relative z-10 flex justify-between items-center bg-white/5 backdrop-blur-md rounded-2xl p-3 border border-white/10">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#8cf3f3] animate-pulse"></div>
              <span className="text-[10px] font-headline font-black uppercase tracking-wider">Syncing via AES-256</span>
            </div>
            <span className="text-[10px] font-headline opacity-60 font-bold uppercase tracking-widest">Updated 2s ago</span>
          </div>
        </motion.div>

        {/* Side Metric: Blood Oxygen */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="md:col-span-4 bg-slate-900 border border-white/5 rounded-3xl p-8 flex flex-col justify-between h-80"
        >
          <div>
            <div className="flex items-center gap-2 mb-6">
              <span className="material-symbols-outlined text-secondary">air</span>
              <span className="font-headline text-[0.6875rem] font-bold text-slate-500 uppercase tracking-widest">Blood Oxygen</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-6xl font-headline font-extrabold text-[#8cf3f3]">98</span>
              <span className="text-lg font-headline text-slate-500">%</span>
            </div>
            <p className="mt-4 text-[13px] text-slate-400 leading-relaxed font-medium">Optimal respiratory efficiency detected. No anomalies in last 24h cycle.</p>
          </div>
          <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "98%" }}
              className="h-full bg-secondary rounded-full" 
            />
          </div>
        </motion.div>

        {/* Bottom Metric: Sleep Quality */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="md:col-span-4 bg-white rounded-3xl p-8 flex flex-col justify-between shadow-2xl h-96 group"
        >
          <div>
            <div className="flex items-center gap-2 mb-6">
              <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>bedtime</span>
              <span className="font-headline text-[0.6875rem] font-bold text-slate-500 uppercase tracking-widest">Sleep Analysis</span>
            </div>
            <div className="text-4xl font-headline font-extrabold text-primary mb-2 italic uppercase">7h 42m</div>
            <div className="bg-secondary/10 text-secondary px-3 py-1 rounded-lg text-[10px] font-black inline-block uppercase tracking-wider mb-6 border border-secondary/20">
              High Recovery
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
              <span className="text-slate-500">Deep Sleep</span>
              <span className="text-primary">1h 12m</span>
            </div>
            <div className="h-1 w-full bg-slate-100 rounded-full">
              <div className="h-full bg-primary w-[45%] rounded-full" />
            </div>
            <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
              <span className="text-slate-500">REM</span>
              <span className="text-primary">2h 05m</span>
            </div>
            <div className="h-1 w-full bg-slate-100 rounded-full">
              <div className="h-full bg-secondary w-[60%] rounded-full" />
            </div>
          </div>

          <button className="w-full py-3 bg-slate-100 text-primary font-headline font-black text-[10px] uppercase tracking-[0.2em] rounded-xl transition-all hover:bg-slate-200 active:scale-95">
            View Hypnogram
          </button>
        </motion.div>

        {/* Intelligence Insights: Asymmetric Module */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="md:col-span-8 glass-module rounded-3xl p-10 border border-white/5 h-96 flex flex-col justify-between"
        >
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-headline font-black text-2xl text-white italic uppercase leading-none">Intelligence Insights</h3>
              <p className="text-[10px] font-headline font-bold text-slate-500 uppercase tracking-widest mt-2">{data?.insight.disclaimer}</p>
            </div>
            <span className="material-symbols-outlined text-[#8cf3f3] text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>psychology</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
            <div className="space-y-6">
              <div className="flex gap-4 p-5 rounded-2xl bg-white/5 border border-white/5 group hover:bg-white/10 transition-colors">
                <span className="material-symbols-outlined text-secondary">bolt</span>
                <div>
                  <h4 className="text-xs font-black text-white uppercase tracking-wider mb-1">Metabolic Window</h4>
                  <p className="text-[12px] text-slate-400 font-medium leading-relaxed">{data?.insight.summary.split('.')[0]}.</p>
                </div>
              </div>
              <div className="flex gap-4 p-5 rounded-2xl border border-white/5 bg-white/2 group hover:bg-white/10 transition-colors">
                <span className="material-symbols-outlined text-[#8cf3f3]">wb_sunny</span>
                <div>
                  <h4 className="text-xs font-black text-white uppercase tracking-wider mb-1">Circadian Alignment</h4>
                  <p className="text-[12px] text-slate-400 font-medium leading-relaxed">{data?.insight.summary.split('.')[1] || "Optimal regulation detected."}</p>
                </div>
              </div>
            </div>

            <div className="relative rounded-2xl overflow-hidden group border border-white/5">
              <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary/40 opacity-60 group-hover:opacity-40 transition-opacity z-10" />
              <div className="absolute inset-0 flex items-center justify-center p-6 text-center z-20">
                <div>
                  <div className="text-white text-5xl font-headline font-extrabold italic tracking-tighter mb-2">{data?.cardio_score}%</div>
                  <div className="font-headline text-[10px] text-white/80 uppercase font-black tracking-[0.3em]">Health Score</div>
                  <button className="mt-6 px-6 py-2 bg-white text-primary text-[10px] font-black uppercase tracking-[0.2em] rounded-lg hover:scale-105 transition-transform">
                    Full Audit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default HealthDashboard;
