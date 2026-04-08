import React, { useState, useEffect } from 'react';
import { Download, X, Smartphone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const InstallHUD: React.FC = () => {
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    // Detect iOS
    const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    setIsIOS(isIOSDevice);

    // Check if already installed
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone === true;
    
    if (!isStandalone) {
      const timer = setTimeout(() => setShowPrompt(true), 3000);
      return () => clearTimeout(timer);
    }

    // Listen for BeforeInstallPrompt (Android/Chrome)
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setShowPrompt(false);
      }
      setDeferredPrompt(null);
    }
  };

  return (
    <AnimatePresence>
      {showPrompt && (
        <motion.div 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-6 left-6 right-6 z-[100] md:left-auto md:max-w-md"
        >
          <div className="relative p-6 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl backdrop-blur-xl">
            <button 
              onClick={() => setShowPrompt(false)}
              className="absolute top-4 right-4 p-1 text-slate-500 hover:text-white"
            >
              <X size={20} />
            </button>

            <div className="flex items-start space-x-4">
              <div className="p-3 bg-indigo-600 rounded-xl shadow-lg shadow-indigo-500/20">
                <Download className="text-white" size={24} />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white tracking-tight">Download HealthShield AI</h3>
                <p className="text-sm text-slate-400 mt-1">
                  Install this app locally to bypass app stores and unlock direct cardiovascular telemetry.
                </p>
                
                {isIOS ? (
                  <div className="mt-4 flex flex-col space-y-2 p-3 bg-slate-800/50 rounded-lg border border-slate-700">
                    <p className="text-xs font-bold text-indigo-400 uppercase tracking-widest flex items-center">
                      <Smartphone size={14} className="mr-2" /> iOS Manual Install
                    </p>
                    <p className="text-xs text-slate-300">
                      1. Tap <span className="font-bold text-white">Share</span> in the browser bar
                      <br /> 
                      2. Scroll and select <span className="font-bold text-white">"Add to Home Screen"</span>
                    </p>
                  </div>
                ) : (
                  <button 
                    onClick={handleInstall}
                    className="mt-4 w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-indigo-500/20 active:scale-95"
                  >
                    Install Now
                  </button>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default InstallHUD;
