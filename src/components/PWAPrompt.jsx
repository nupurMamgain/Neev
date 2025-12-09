import React, { useState, useEffect } from 'react';

const PWAPrompt = () => {
  const [showPrompt, setShowPrompt] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showOffline, setShowOffline] = useState(false);

  useEffect(() => {
    // Check if already installed
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    const isInstalled = localStorage.getItem('pwaInstalled') === 'true';
    const dismissed = localStorage.getItem('pwaDismissed');
    const dismissedTime = dismissed ? parseInt(dismissed) : 0;
    const daysPassed = (Date.now() - dismissedTime) / (1000 * 60 * 60 * 24);

    // Listen for install prompt
    const handleBeforeInstall = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      
      // Show prompt if not installed and not recently dismissed
      if (!isStandalone && !isInstalled && daysPassed > 7) {
        setTimeout(() => setShowPrompt(true), 3000);
      }
    };

    // Listen for successful install
    const handleAppInstalled = () => {
      localStorage.setItem('pwaInstalled', 'true');
      setShowPrompt(false);
      setDeferredPrompt(null);
    };

    // Online/Offline handlers
    const handleOnline = () => {
      setIsOnline(true);
      setShowOffline(false);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowOffline(true);
      setTimeout(() => setShowOffline(false), 3000);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    window.addEventListener('appinstalled', handleAppInstalled);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
      window.removeEventListener('appinstalled', handleAppInstalled);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      localStorage.setItem('pwaInstalled', 'true');
    }
    
    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  const handleDismiss = () => {
    localStorage.setItem('pwaDismissed', Date.now().toString());
    setShowPrompt(false);
  };

  return (
    <>
      {/* Install Prompt */}
      {showPrompt && (
        <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:max-w-sm bg-white rounded-2xl shadow-2xl border border-gray-200 p-4 z-50 animate-slide-up">
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center shrink-0">
              <span className="text-blue-600 font-bold text-lg">N</span>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">Install NEEV</h3>
              <p className="text-sm text-gray-500 mt-1">
                Add to your home screen for quick access and offline support
              </p>
              <div className="flex gap-2 mt-3">
                <button
                  onClick={handleInstall}
                  className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Install
                </button>
                <button
                  onClick={handleDismiss}
                  className="px-4 py-2 text-gray-600 text-sm font-medium hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Not now
                </button>
              </div>
            </div>
            <button
              onClick={handleDismiss}
              className="p-1 text-gray-400 hover:text-gray-600"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Offline Indicator */}
      {showOffline && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg z-50 flex items-center gap-2 animate-slide-up">
          <svg className="w-4 h-4 text-red-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l6.921 6.922c.05.062.105.118.168.167l6.91 6.911a1 1 0 001.415-1.414l-.675-.675a9.001 9.001 0 00-.668-11.982A1 1 0 1014.95 5.05a7.002 7.002 0 01.657 9.143l-1.435-1.435a5.002 5.002 0 00-.636-6.294A1 1 0 0012.12 7.88a3 3 0 01.587 3.415l-1.992-1.992a.922.922 0 00-.018-.018l-6.99-6.991zM3.238 8.187a1 1 0 00-1.933-.518c-.115.43-.185.903-.185 1.331 0 .954.223 1.856.619 2.657a1 1 0 101.808-.851 3.973 3.973 0 01-.309-1.806c0-.136.016-.273.047-.406zM5.636 10.878a1 1 0 00-1.414 0 4.002 4.002 0 00-.585 4.536 1 1 0 101.776-.924 2.001 2.001 0 01.223-2.198 1 1 0 000-1.414z" clipRule="evenodd" />
          </svg>
          You're offline
        </div>
      )}

      {/* Online restored indicator */}
      {!isOnline && (
        <div className="fixed top-0 left-0 right-0 bg-yellow-500 text-yellow-900 text-center py-2 text-sm font-medium z-50">
          📵 No internet connection
        </div>
      )}
    </>
  );
};

export default PWAPrompt;

