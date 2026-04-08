import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState } from 'react';

const HealthDashboard = lazy(() => import('./pages/HealthDashboard'));
const Pricing = lazy(() => import('./pages/Pricing'));
const InstallHUD = lazy(() => import('./components/InstallHUD'));

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Router basename={import.meta.env.BASE_URL.replace(/\/$/, '') || '/'}>
      <div className="min-h-screen bg-slate-950 text-slate-50 transition-colors duration-300 font-body">
        
        {/* Sovereign Header HUD */}
        <header className="bg-white dark:bg-[#001629] fixed top-0 w-full z-50 border-b border-white/5 shadow-2xl shadow-black/20">
          <div className="flex justify-between items-center px-6 h-16 w-full max-w-screen-2xl mx-auto">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center group-hover:rotate-6 transition-transform shadow-xl shadow-primary/40">
                <span className="material-symbols-outlined text-white text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>security</span>
              </div>
              <h1 className="text-lg font-extrabold text-[#001629] dark:text-white tracking-[-0.02em] font-headline">HealthShield AI</h1>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              <nav className="flex gap-10">
                <Link to="/" className="text-secondary dark:text-[#00ffff] font-extrabold font-headline text-[11px] uppercase tracking-widest transition-opacity hover:opacity-80">Biometrics</Link>
                <Link to="/" className="text-slate-400 font-extrabold font-headline text-[11px] uppercase tracking-widest transition-opacity hover:opacity-80">Insights</Link>
                <Link to="/pricing" className="text-slate-400 font-extrabold font-headline text-[11px] uppercase tracking-widest transition-opacity hover:opacity-80">Upgrade Engine</Link>
              </nav>
              <div className="w-8 h-8 rounded-full overflow-hidden bg-slate-800 border border-white/10">
                <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD1DUC_WW6HYOVgI2vJ9fz1E4b8AEtBP81BpBsgNQiO2dc7DWZavMFPt6UVnRbYXohEhSzMa0LY73QlwZpTEK8mafC7QOKFW1KbhU9Cz9VN1kEAaOeTkyrdcpiNY-12raZ7z4gp4Vbi0PWAGQoSAcFaTgpVaAlLrxIW8EoDRPxvTTy5he2XF9IXF3B9mYKX2ijwm0HhgWG7tFGJYm6IjBPx56lxO6iyDcVbqxq1lOgMk8kAy31vSw3lWDPRJiZ0dvZ6BlF5Z5h_ZN8" alt="Profile" />
              </div>
            </div>

            <button 
              className="md:hidden text-[#001629] dark:text-white p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="material-symbols-outlined">{isMenuOpen ? 'close' : 'menu'}</span>
            </button>
          </div>
        </header>

        {/* Intelligence HUD Content */}
        <main className="max-w-screen-2xl mx-auto px-6 pt-24 pb-12">
          <Suspense
            fallback={
              <div className="flex min-h-[60vh] flex-col items-center justify-center space-y-4">
                <div className="w-12 h-12 border-[3px] border-primary border-t-transparent rounded-2xl animate-spin shadow-2xl shadow-primary/20" />
                <p className="text-[10px] font-black text-slate-500 animate-pulse uppercase tracking-[0.4em]">Optimizing Stark Intelligence...</p>
              </div>
            }
          >
            <Routes>
              <Route path="/" element={<HealthDashboard />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="*" element={<HealthDashboard />} />
            </Routes>
          </Suspense>
        </main>

        <footer className="border-t border-white/5 py-16 px-6 bg-slate-950/40">
          <div className="container max-w-screen-2xl mx-auto flex flex-col md:flex-row justify-between items-center opacity-70 hover:opacity-100 transition-opacity duration-700">
            <div className="flex items-center space-x-3 mb-6 md:mb-0">
               <div className="p-2 bg-slate-900 rounded-lg">
                <span className="material-symbols-outlined text-slate-500 text-[16px]">security</span>
               </div>
               <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                 &copy; 2026 HealthShield AI. Sovereignty Layer Active.
               </p>
            </div>
            <div className="flex space-x-8 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400/80">
                <span className="hover:text-secondary transition-colors cursor-pointer">Security Core</span>
                <span className="hover:text-secondary transition-colors cursor-pointer">Local Edge</span>
                <span className="hover:text-secondary transition-colors cursor-pointer">AI Protocols</span>
            </div>
          </div>
        </footer>
        <InstallHUD />
      </div>
    </Router>
  );
}

export default App;
