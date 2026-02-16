
import React, { useState, useEffect } from 'react';
import Button from './Button';
import { Service, ServicePlan } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { useServices } from '../contexts/ServiceContext';
import { useAuth } from '../contexts/AuthContext';
import { formatCOP } from '../utils/currency';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: Service | null;
  selectedPlan: ServicePlan | null;
}

type PaymentMethod = 'whatsapp' | 'nequi' | 'daviplata' | 'transfer';

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, service, selectedPlan }) => {
  const [name, setName] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('whatsapp');
  const { t } = useLanguage();
  const { isAdmin, paymentConfig, updatePaymentConfig, addOrder } = useServices();
  const { user } = useAuth();

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen || !service || !selectedPlan) return null;

  const handleWhatsAppRedirect = (e: React.FormEvent) => {
    e.preventDefault();

    const paymentMethodLabel = paymentMethod === 'whatsapp' ? 'QR Bancolombia' :
      paymentMethod === 'nequi' ? 'Nequi' :
        paymentMethod === 'daviplata' ? 'Daviplata' : 'Transferencia';

    const lines = [
      `Hola NexusPlay, deseo adquirir este servicio:`,
      ``,
      `📦 *SERVICIO:* ${service.name}`,
      `🏷️ *PLAN:* ${selectedPlan.name}`,
      `💵 *VALOR:* ${formatCOP(selectedPlan.price)}`,
      `💳 *MÉTODO DE PAGO:* ${paymentMethodLabel}`,
      ``,
      `👤 *CLIENTE:* ${name}`,
      ``,
      `📄 *Adjunto mi comprobante de pago a continuación* 👇`
    ];

    const text = lines.join('\n');

    // Register order
    addOrder({
      id: Date.now().toString(),
      userId: user?.id || 'guest',
      userName: name,
      serviceName: service.name,
      serviceLogoUrl: service.logoUrl,
      planName: selectedPlan.name,
      price: selectedPlan.price,
      date: new Date().toLocaleDateString('es-CO'),
      status: 'pending',
      paymentMethod: paymentMethodLabel
    });

    window.open(`https://wa.me/${paymentConfig.whatsappNumber}?text=${encodeURIComponent(text)}`, '_blank');
    onClose();
  };

  const paymentMethods: { id: PaymentMethod; label: string; icon: string; color: string }[] = [
    { id: 'whatsapp', label: 'QR Bancolombia', icon: 'fa-solid fa-qrcode', color: 'text-blue-400' },
    { id: 'nequi', label: 'Nequi', icon: 'fa-solid fa-mobile-screen', color: 'text-fuchsia-400' },
    { id: 'daviplata', label: 'Daviplata', icon: 'fa-solid fa-mobile-screen-button', color: 'text-red-400' },
    { id: 'transfer', label: 'Transferencia', icon: 'fa-solid fa-building-columns', color: 'text-yellow-400' }
  ];

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/95 backdrop-blur-xl transition-opacity" onClick={onClose} />

      <div className="relative bg-[#121218] border border-white/10 w-full max-w-md rounded-[2rem] p-0 shadow-[0_0_60px_rgba(0,100,255,0.15)] overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header Image Background */}
        <div className="h-28 w-full relative overflow-hidden bg-black flex-shrink-0">
          <div className={`absolute inset-0 bg-gradient-to-b ${service.bgGradient} opacity-80`}></div>
          <div className="absolute inset-0 flex items-center justify-center pt-2">
            <img src={service.logoUrl} alt={service.name} className="h-14 w-auto object-contain drop-shadow-2xl" />
          </div>
          <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-black/40 hover:bg-white/20 text-white transition-colors z-20">
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <div className="p-6 overflow-y-auto flex-1">
          {/* Price Summary */}
          <div className="mb-5 flex justify-between items-center border-b border-white/5 pb-4">
            <div>
              <p className="text-gray-400 text-xs uppercase font-bold">Total a Pagar</p>
              <p className="text-3xl font-black text-white">{formatCOP(selectedPlan.price)}</p>
            </div>
            <div className="text-right">
              <span className="bg-white/5 border border-white/10 px-3 py-1 rounded text-xs text-gray-300">
                {selectedPlan.name}
              </span>
            </div>
          </div>

          {/* Payment Method Selector */}
          <div className="mb-5">
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3 pl-1">Método de Pago</p>
            <div className="grid grid-cols-2 gap-2">
              {paymentMethods.map(pm => (
                <button
                  key={pm.id}
                  onClick={() => setPaymentMethod(pm.id)}
                  className={`p-3 rounded-xl text-left transition-all flex items-center gap-2 border ${paymentMethod === pm.id
                      ? 'bg-white/10 border-neon-blue shadow-[0_0_10px_rgba(0,243,255,0.2)] scale-[1.02]'
                      : 'bg-black/30 border-white/5 hover:bg-white/5'
                    }`}
                >
                  <i className={`${pm.icon} ${paymentMethod === pm.id ? pm.color : 'text-gray-500'}`}></i>
                  <span className={`text-[10px] font-bold ${paymentMethod === pm.id ? 'text-white' : 'text-gray-400'}`}>{pm.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Payment Info Display */}
          <div className="mb-5 bg-black/30 rounded-xl p-4 border border-white/5">
            {paymentMethod === 'whatsapp' && (
              <div className="flex flex-col items-center text-center">
                <div className="bg-white p-3 rounded-xl mb-3">
                  <img
                    src={paymentConfig.qrImageUrl}
                    alt="QR Bancolombia"
                    className="w-36 h-36 object-contain mix-blend-multiply"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=Error+URL+Imagen';
                    }}
                  />
                </div>
                <p className="text-xs text-gray-300">Escanea con tu app de Bancolombia</p>
              </div>
            )}

            {paymentMethod === 'nequi' && (
              <div className="text-center space-y-3">
                <div className="w-12 h-12 mx-auto rounded-xl bg-gradient-to-br from-fuchsia-500 to-purple-600 flex items-center justify-center">
                  <i className="fa-solid fa-mobile-screen text-white text-xl"></i>
                </div>
                <p className="text-xs text-gray-300">Envía el pago a</p>
                <p className="text-2xl font-black text-white tracking-wider">{paymentConfig.nequiNumber}</p>
                <p className="text-[10px] text-gray-500">Abre tu app de Nequi → Enviar dinero → Ingresa el número</p>
              </div>
            )}

            {paymentMethod === 'daviplata' && (
              <div className="text-center space-y-3">
                <div className="w-12 h-12 mx-auto rounded-xl bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center">
                  <i className="fa-solid fa-mobile-screen-button text-white text-xl"></i>
                </div>
                <p className="text-xs text-gray-300">Envía el pago a</p>
                <p className="text-2xl font-black text-white tracking-wider">{paymentConfig.daviplataNumber}</p>
                <p className="text-[10px] text-gray-500">Abre tu app Daviplata → Enviar plata → Ingresa el número</p>
              </div>
            )}

            {paymentMethod === 'transfer' && (
              <div className="space-y-2">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-500 to-amber-600 flex items-center justify-center">
                    <i className="fa-solid fa-building-columns text-white"></i>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">{paymentConfig.bankName}</p>
                    <p className="text-[10px] text-gray-400">Transferencia bancaria</p>
                  </div>
                </div>
                {[
                  { label: 'Tipo de cuenta', value: paymentConfig.bankAccountType },
                  { label: 'Número de cuenta', value: paymentConfig.bankAccountNumber },
                  { label: 'Titular', value: paymentConfig.bankAccountHolder },
                ].map((item, i) => (
                  <div key={i} className="flex justify-between py-1.5 border-b border-white/5 last:border-0">
                    <span className="text-[10px] text-gray-500">{item.label}</span>
                    <span className="text-xs font-bold text-white">{item.value}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Admin Payment Config */}
          {isAdmin && (
            <div className="bg-red-900/20 border border-red-500/30 p-3 rounded-xl mb-4">
              <p className="text-[10px] text-red-400 font-bold uppercase mb-2">
                <i className="fa-solid fa-wrench mr-1"></i>Config de Pagos (Admin)
              </p>
              <div className="space-y-2">
                {[
                  { key: 'whatsappNumber' as const, label: 'WhatsApp', placeholder: '573...' },
                  { key: 'nequiNumber' as const, label: 'Nequi', placeholder: '3...' },
                  { key: 'daviplataNumber' as const, label: 'Daviplata', placeholder: '3...' },
                  { key: 'qrImageUrl' as const, label: 'URL QR Bancolombia', placeholder: 'https://...' },
                  { key: 'bankName' as const, label: 'Banco', placeholder: 'Bancolombia' },
                  { key: 'bankAccountType' as const, label: 'Tipo Cuenta', placeholder: 'Ahorros' },
                  { key: 'bankAccountNumber' as const, label: 'Nro. Cuenta', placeholder: '000-000-00' },
                  { key: 'bankAccountHolder' as const, label: 'Titular', placeholder: 'Nombre...' },
                ].map(field => (
                  <div key={field.key} className="flex items-center gap-2">
                    <label className="text-[9px] text-gray-400 w-20 flex-shrink-0">{field.label}</label>
                    <input
                      type="text"
                      value={paymentConfig[field.key]}
                      onChange={e => updatePaymentConfig(field.key, e.target.value)}
                      placeholder={field.placeholder}
                      className="flex-1 bg-black/50 text-white text-[10px] p-1.5 rounded border border-red-500/30 focus:outline-none font-mono"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Name + Submit */}
          <form onSubmit={handleWhatsAppRedirect} className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 pl-2">Tu Nombre Completo</label>
              <div className="relative group">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-neon-blue transition-colors">
                  <i className="fa-regular fa-user"></i>
                </span>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Escribe tu nombre..."
                  className="w-full bg-black/50 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-neon-blue focus:shadow-[0_0_15px_rgba(0,243,255,0.3)] transition-all"
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full py-4 text-lg shadow-lg hover:shadow-green-500/50 hover:scale-[1.02] active:scale-95 transition-all"
              style={{ background: 'linear-gradient(to right, #25D366, #128C7E)' }}
            >
              <i className="fa-brands fa-whatsapp mr-2 text-xl"></i>
              Solicitar Activación
            </Button>
            <p className="text-center text-[10px] text-gray-500 mt-1">
              Serás redirigido a WhatsApp para enviar tu comprobante.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;
