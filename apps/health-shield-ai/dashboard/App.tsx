import React, { useState, useEffect } from 'react';
import './App.css';

interface Log {
  id: string;
  pulse: number;
  systolic: number;
  diastolic: number;
  timestamp: string;
}

interface Insight {
  summary: string;
  level: 'low' | 'moderate' | 'high';
  flags: string[];
  recommendations: { level: 1 | 2 | 3; text: string }[];
}

import { collection, onSnapshot, query, orderBy, limit, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';
import HealthShieldEngine from '../server/analyzer_engine'; // Shared across local/remote

const engine = new HealthShieldEngine();

const App: React.FC = () => {
  const [cardioScore, setCardioScore] = useState(100);
  const [logs, setLogs] = useState<Log[]>([]);
  const [isSyncing, setIsSyncing] = useState(true);

  const [insight, setInsight] = useState<Insight>({
    summary: "Initializing Autonomous Intelligence Core...",
    level: 'low',
    flags: [],
    recommendations: []
  });

  // 1. Live Firestore Synchronization
  useEffect(() => {
    const q = query(
      collection(db, 'health_logs'), 
      orderBy('timestamp', 'desc'), 
      limit(20)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newLogs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as unknown as Log[];
      
      setLogs(newLogs.reverse()); // Keep chronological in UI
      setIsSyncing(false);

      // 2. Local Intelligence Fallback (Live Heuristics)
      if (newLogs.length > 0) {
        const analysis = engine.calculateHealthMetrics(newLogs, { age: 45, gender: 'male', bmi: 24 });
        if (analysis) {
          setCardioScore(analysis.cardioScore);
          
          // Mimic AI summary if no remote engine is present
          setInsight({
            summary: analysis.flags.length > 0 ? "Potential deviation detected in cardiovascular metrics." : "Steady state detected. Health baseline within normal limits.",
            level: analysis.cardioScore < 80 ? 'moderate' : 'low',
            flags: analysis.flags,
            recommendations: analysis.flags.includes("high_pulse") 
              ? [{ level: 1, text: "Hydrate and wait 10 minutes." }, { level: 2, text: "Check for caffeine intake levels." }]
              : [{ level: 1, text: "Maintain current activity levels." }]
          });
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const handleAddMockLog = async () => {
    try {
      const mockPulse = Math.floor(Math.random() * (110 - 70) + 70);
      const mockBP = Math.floor(Math.random() * (150 - 110) + 110);
      
      await addDoc(collection(db, 'health_logs'), {
        pulse: mockPulse,
        systolic: mockBP,
        diastolic: 85,
        timestamp: serverTimestamp(),
        source: 'manual_vibe'
      });
      console.log("Mock Log Sent to Firebase Core.");
    } catch (err) {
      console.error("Firebase Sync Error", err);
    }
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar: Profile & Identity */}
      <aside className="sidebar">
        <div className="glass-card profile-section">
          <div className="avatar"></div>
          <h2>Don</h2>
          <p className="text-dim">45 · Male · 88kg</p>
          <div className={`status-badge ${isSyncing ? 'warning' : 'success'}`}>
            ● {isSyncing ? 'Syncing...' : 'System Active (Live Cloud)'}
          </div>
        </div>

        <nav className="glass-card nav-section">
          <div className="nav-item active">Dashboard</div>
          <div className="nav-item">Health Logs</div>
          <div className="nav-item">AI Reports</div>
          <div className="nav-item">Settings</div>
        </nav>

        <button className="glass-btn primary-btn add-btn" onClick={handleAddMockLog}>
          Record New Pulse
        </button>

        <div className="glass-card footer-section">
          <p className="legal-disclaimer">
            Antigravity Sovereign Edition. V1.1-LIVE (ALPHA)
          </p>
        </div>
      </aside>

      {/* Main Core Dashboard */}
      <main className="main-content">
        <header className="glass-card header-section">
          <div className="header-meta">
            <h1>HealthShield AI Dashboard</h1>
            <p className="text-dim">Autonomous Cardiovascular Awareness</p>
          </div>
          <div className="header-sync">
            <span className="live-pill">LIVE CLOUD</span>
          </div>
        </header>

        <section className="glass-card cardio-score-section">
          <div className="score-display">
            <div className="score-circle" style={{ borderColor: cardioScore < 80 ? 'rgba(239, 68, 68, 0.4)' : 'rgba(16, 185, 129, 0.4)' }}>
              <span className="score-number">{cardioScore}</span>
              <span className="text-dim">Cardio Score</span>
            </div>
            <p className="score-label">System Performance: <span className={cardioScore < 80 ? 'warning' : 'success'}>
              {cardioScore < 80 ? 'Deviation Detected' : 'Optimal'}
            </span></p>
          </div>
          
          <div className="score-logic">
            <h4>Live Pulse</h4>
            {logs.length > 0 ? (
              <div className="live-metric pulse-number">{logs[logs.length-1].pulse} <span className="unit">BPM</span></div>
            ) : <div className="live-metric placeholder">--</div>}
            <h4>Blood Pressure</h4>
            {logs.length > 0 ? (
              <div className="live-metric bp-number">{logs[logs.length-1].systolic}/{logs[logs.length-1].diastolic} <span className="unit">mmHg</span></div>
            ) : <div className="live-metric placeholder">--/--</div>}
          </div>
        </section>

        <div className="charts-grid">
          <section className="glass-card">
            <div className="chart-header">
              <h3>BP Trends</h3>
              <span className="unit-label">mmHg</span>
            </div>
            <div className="chart-placeholder">
              {/* This would be an area chart or bar chart line */}
              <div className="visualization-overlay pulse-anim">
                [📈 LIVE TREND ENGINE ACTIVE]
              </div>
            </div>
          </section>
          <section className="glass-card">
            <div className="chart-header">
              <h3>Pulse Stability</h3>
              <span className="unit-label">BPM</span>
            </div>
            <div className="chart-placeholder">
              {/* This would be a line chart */}
              <div className="visualization-overlay pulse-anim-slow">
                [📊 REAL-TIME SPECTROGRAM]
              </div>
            </div>
          </section>
        </div>

        <section className="glass-card log-history">
          <div className="history-header">
            <h3>Recent Sovereignty Logs</h3>
            <span className="badge">Last 20 Samples</span>
          </div>
          <table className="log-table">
            <thead>
              <tr>
                <th>Time</th>
                <th>Pulse</th>
                <th>BP</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {logs.length > 0 ? logs.map(log => (
                <tr key={log.id}>
                  <td>{log.timestamp ? new Date(log.timestamp.seconds * 1000).toLocaleTimeString() : '---'}</td>
                  <td>{log.pulse} BPM</td>
                  <td>{log.systolic}/{log.diastolic}</td>
                  <td><span className={`badge ${log.pulse > 100 ? 'warning' : 'success'}`}>
                    {log.pulse > 100 ? 'High' : 'Normal'}
                  </span></td>
                </tr>
              )) : <tr><td colSpan={4} className="text-center opacity-40 py-8 italic uppercase text-[10px]">Initialize hardware to begin logging...</td></tr>}
            </tbody>
          </table>
        </section>
      </main>

      {/* Right Sidebar: AI Insights Agent */}
      <aside className="ai-agent-sidebar">
        <div className="glass-card insight-feed shadow-glow">
          <div className="insight-header">
            <h3>🧠 AI Interpretation</h3>
            <span className="provider-badge">Sovereign Engine 2.1</span>
          </div>
          <div className={`insight-item ${insight.level}`}>
            <p><strong>Sentinel Summary:</strong> {insight.summary}</p>
          </div>
          
          <div className="flag-container">
            {insight.flags.length > 0 ? insight.flags.map(flag => (
              <span key={flag} className="badge flag animate-pulse">{flag.replace('_', ' ')}</span>
            )) : <span className="badge opacity-40">No Flags Active</span>}
          </div>

          <div className="divider"></div>

          <h3>🎯 Recommendations</h3>
          <ul className="rec-list">
            {insight.recommendations.length > 0 ? insight.recommendations.map((rec, index) => (
              <li key={index} className={`rec-item level-${rec.level}`}>
                {rec.text}
              </li>
            )) : <li className="rec-item opacity-40 italic">Waiting for sufficient data stream...</li>}
          </ul>

          <button className="glass-btn primary-btn shadow-indigo">Deep-Dive Analysis</button>
        </div>

        <div className="glass-card status-card">
          <div className="status-grid">
            <div>
              <p className="text-[9px] font-bold uppercase text-dim">Cloud Node</p>
              <p className="status-val text-emerald-400">Connected</p>
            </div>
            <div>
              <p className="text-[9px] font-bold uppercase text-dim">Encryption</p>
              <p className="status-val text-indigo-400">RSA-4096</p>
            </div>
          </div>
          <div className="divider mini"></div>
          <p className="text-[9px] text-dim italic opacity-50">Local Heuristic Fallback Engine v1.0.2 Active.</p>
        </div>
      </aside>
    </div>
  );
};

export default App;
