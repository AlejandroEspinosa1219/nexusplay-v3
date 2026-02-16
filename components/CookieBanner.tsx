
import React, { useState, useEffect } from 'react';

const CookieBanner: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem('nexus_cookies');
    if (!accepted) {
      setTimeout(() => setVisible(true), 2000);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('nexus_cookies', 'true');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#121218] border-t border-white/10 p-4 z-[90] flex flex-col md:flex-row items-center justify-center gap-4 shadow-[0_-5px_20px_rgba(0,0,0,0.5)] animate-fade-in-up">
      <div className="text-center md:text-left">
        <p className="text-gray-300 text-sm">
          🍪 <strong>Usamos cookies</strong> para asegurar que tengas la mejor experiencia en NexusPlay.
        </p>
      </div>
      <div className="flex gap-2">
        <button 
          onClick={handleAccept}
          className="bg-neon-blue text-black px-6 py-2 rounded-full font-bold text-sm hover:scale-105 transition-transform"
        >
          Aceptar
        </button>
        <button 
          onClick={() => setVisible(false)}
          className="text-gray-500 text-sm hover:text-white underline px-2"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default CookieBanner;
