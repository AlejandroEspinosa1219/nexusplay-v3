
import React, { useState } from 'react';
import Button from './Button';
import { useLanguage } from '../contexts/LanguageContext';
import { useServices } from '../contexts/ServiceContext';

interface FooterProps {
  onOpenAdmin: () => void;
}

const Footer: React.FC<FooterProps> = ({ onOpenAdmin }) => {
  const { t } = useLanguage();
  const { toggleAdmin, isAdmin, paymentConfig } = useServices();
  const [showAuth, setShowAuth] = useState(false);
  const [password, setPassword] = useState('');

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') {
      toggleAdmin();
      setShowAuth(false);
      setPassword('');
    } else {
      alert('Contraseña incorrecta');
    }
  };

  const handleBotAction = () => {
    const message = "Hola NexusPlay Bot 🤖\n\nEstoy interesado en los servicios, ¿me puedes mostrar el menú de precios?";
    window.open(`https://wa.me/${paymentConfig.whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <footer id="footer" className="bg-[#050508] border-t border-white/5 pt-20 pb-10 relative z-10">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <a href="#" className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center text-white font-bold text-xl shadow-[0_0_15px_rgba(188,19,254,0.5)]">
                <i className="fa-solid fa-bolt"></i>
              </div>
              <span className="text-2xl font-bold text-white tracking-tight">NexusPlay</span>
            </a>
            <p className="text-gray-500 text-sm mb-8 leading-relaxed">
              {t('footer.tagline')} <br />
              Soporte 24/7 vía WhatsApp.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 text-lg">Explorar</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><a href="#home" className="hover:text-neon-blue transition-colors">Inicio</a></li>
              <li><a href="#catalog" className="hover:text-neon-blue transition-colors">Catálogo</a></li>
              <li><a href="#features" className="hover:text-neon-blue transition-colors">Beneficios</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 text-lg">Legal</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><a href="#" className="hover:text-neon-blue transition-colors">Términos y Condiciones</a></li>
              <li><a href="#" className="hover:text-neon-blue transition-colors">Política de Privacidad</a></li>
              <li><a href="#" className="hover:text-neon-blue transition-colors">Garantía de Reembolso</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 text-lg">Bot de Ayuda</h4>
            <p className="text-gray-500 text-sm mb-4">¿Dudas? Nuestro bot responde precios al instante.</p>
            <button
              onClick={handleBotAction}
              className="bg-white/5 border border-white/10 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-neon-blue hover:text-black transition-colors w-full md:w-auto justify-center group"
            >
              <i className="fa-solid fa-robot group-hover:animate-bounce"></i> Hablar con Bot
            </button>
          </div>
        </div>

        {/* 🔥 PAGE FOR SALE BANNER */}
        <div className="mb-16 relative overflow-hidden rounded-2xl border border-yellow-500/30 bg-gradient-to-r from-yellow-900/20 via-amber-900/30 to-yellow-900/20 p-8 md:p-10 backdrop-blur-md">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Ccircle%20cx%3D%221%22%20cy%3D%221%22%20r%3D%221%22%20fill%3D%22rgba(255%2C215%2C0%2C0.05)%22%2F%3E%3C%2Fsvg%3E')] opacity-50"></div>
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent animate-pulse"></div>

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <div className="flex items-center gap-3 justify-center md:justify-start mb-3">
                <span className="bg-yellow-500 text-black text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full animate-pulse">
                  En Venta
                </span>
                <span className="text-yellow-500/50 text-xs">•</span>
                <span className="text-yellow-400/70 text-xs font-bold">Oportunidad Única</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-black text-white mb-2">
                🚀 Esta página está{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-amber-400 to-yellow-500">
                  en venta
                </span>
              </h3>
              <p className="text-gray-400 text-sm max-w-md leading-relaxed">
                Página web profesional completamente funcional con catálogo, sistema de pagos, panel admin, notificaciones, PWA y mucho más. Lista para usar.
              </p>
            </div>

            <div className="flex flex-col items-center gap-3">
              <button
                onClick={() => window.open(`https://wa.me/${paymentConfig.whatsappNumber}?text=${encodeURIComponent('Hola, estoy interesado en comprar la página web NexusPlay. ¿Cuál es el precio?')}`, '_blank')}
                className="bg-gradient-to-r from-yellow-400 to-amber-500 text-black px-8 py-3 rounded-xl font-black text-sm hover:shadow-[0_0_30px_rgba(255,215,0,0.4)] transition-all hover:scale-105 flex items-center gap-2"
              >
                <i className="fa-brands fa-whatsapp text-lg"></i> Consultar Precio
              </button>
              <span className="text-[10px] text-gray-500">Respuesta inmediata por WhatsApp</span>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col items-center gap-4 text-xs text-gray-600">
          <div className="flex flex-col md:flex-row justify-between items-center w-full">
            <p>&copy; 2026 NexusPlay Colombia.</p>

            <div className="flex flex-col md:flex-row items-center gap-8 mt-4 md:mt-0 relative z-[100]">
              {/* Admin Logic */}
              <div className="relative">
                {!showAuth && !isAdmin && (
                  <button onClick={() => setShowAuth(true)} className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10 transition-colors">
                    <i className="fa-solid fa-lock text-xs"></i> Admin
                  </button>
                )}

                {showAuth && !isAdmin && (
                  <form onSubmit={handleAuthSubmit} className="flex items-center gap-2 bg-black border border-neon-blue/50 rounded-full px-2 py-1">
                    <input type="password" autoFocus value={password} onChange={(e) => setPassword(e.target.value)} className="bg-transparent border-none text-white text-xs px-2 w-24 focus:outline-none" placeholder="Pass..." />
                    <button type="submit" className="text-neon-green"><i className="fa-solid fa-check"></i></button>
                  </form>
                )}

                {isAdmin && (
                  <div className="flex gap-2">
                    <button onClick={onOpenAdmin} className="flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600 text-white shadow-lg animate-pulse">
                      <i className="fa-solid fa-gauge-high text-xs"></i> Dashboard
                    </button>
                    <button onClick={toggleAdmin} className="flex items-center gap-2 px-3 py-1 rounded-full bg-red-500 text-white">
                      <i className="fa-solid fa-lock-open text-xs"></i> Salir
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Developer Credit */}
          <div className="border-t border-white/5 w-full pt-4 text-center">
            <p className="text-gray-500 text-[11px] font-medium">
              Diseñado y desarrollado con <span className="text-red-500">❤</span> por{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple font-bold">
                Alejandro Espinosa
              </span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
