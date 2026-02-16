
import React, { useState } from 'react';
import { formatCOP } from '../utils/currency';
import { useServices } from '../contexts/ServiceContext';

const ToolsSection: React.FC = () => {
  const [currentSpend, setCurrentSpend] = useState('');
  const [nexusSpend, setNexusSpend] = useState('');
  const { paymentConfig } = useServices();
  const [renewEmail, setRenewEmail] = useState('');

  const savings = (Number(currentSpend) - Number(nexusSpend)) * 12;

  const handleRenew = () => {
    window.open(`https://wa.me/${paymentConfig.whatsappNumber}?text=Hola, quiero renovar mi cuenta asociada a: ${renewEmail}`, '_blank');
  };

  return (
    <section className="py-20 container mx-auto px-6 grid md:grid-cols-2 gap-8">
      {/* Feature 11: Savings Calculator */}
      <div className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-3xl border border-white/10 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/20 rounded-full blur-[50px]"></div>
        <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <i className="fa-solid fa-calculator text-green-400"></i> Calculadora de Ahorro
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="text-gray-400 text-xs uppercase font-bold">¿Cuánto pagas hoy mensualmente?</label>
            <input 
              type="number" 
              placeholder="Ej: 50000" 
              value={currentSpend}
              onChange={(e) => setCurrentSpend(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-green-400 outline-none mt-1"
            />
          </div>
          <div>
            <label className="text-gray-400 text-xs uppercase font-bold">¿Cuánto pagarías con NexusPlay?</label>
            <input 
              type="number" 
              placeholder="Ej: 15000" 
              value={nexusSpend}
              onChange={(e) => setNexusSpend(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-green-400 outline-none mt-1"
            />
          </div>
          
          {savings > 0 && (
             <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-xl text-center animate-pulse">
               <p className="text-gray-300 text-sm">Podrías ahorrar:</p>
               <p className="text-3xl font-black text-green-400">{formatCOP(savings)} / Año</p>
               <p className="text-xs text-gray-500 mt-1">¡Suficiente para un viaje! ✈️</p>
             </div>
          )}
        </div>
      </div>

      {/* Feature 6: Quick Renew */}
      <div className="bg-gradient-to-br from-blue-900/20 to-black p-8 rounded-3xl border border-white/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-[50px]"></div>
        <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <i className="fa-solid fa-rotate text-blue-400"></i> Renovación Rápida
        </h3>
        <p className="text-gray-400 text-sm mb-6">¿Ya eres cliente? Ingresa tu email para renovar tu servicio en 1 clic sin llenar formularios.</p>
        
        <div className="flex gap-2">
          <input 
            type="email" 
            placeholder="tu@email.com" 
            value={renewEmail}
            onChange={(e) => setRenewEmail(e.target.value)}
            className="flex-1 bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-blue-400 outline-none"
          />
          <button 
            onClick={handleRenew}
            className="bg-blue-600 hover:bg-blue-500 text-white px-6 rounded-lg font-bold transition-colors"
          >
            <i className="fa-solid fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </section>
  );
};

export default ToolsSection;
