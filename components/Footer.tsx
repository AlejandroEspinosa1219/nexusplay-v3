
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
              {t('footer.tagline')} <br/>
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

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600">
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
      </div>
    </footer>
  );
};

export default Footer;
