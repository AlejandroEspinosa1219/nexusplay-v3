
import React, { useState } from 'react';
import { useServices } from '../contexts/ServiceContext';
import { useAuth } from '../contexts/AuthContext';
import { formatCOP } from '../utils/currency';
import Button from './Button';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

type PaymentMethod = 'bancolombia' | 'nequi' | 'daviplata' | 'transferencia';

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const { cart, removeFromCart, paymentConfig, addOrder } = useServices();
  const { user } = useAuth();
  const [name, setName] = useState('');
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod>('bancolombia');

  const total = cart.reduce((acc, item) => acc + item.plan.price, 0);
  const discount = cart.length >= 3 ? total * 0.15 : 0;
  const finalTotal = total - discount;

  const paymentMethodLabel: Record<PaymentMethod, string> = {
    bancolombia: 'Bancolombia QR',
    nequi: 'Nequi',
    daviplata: 'Daviplata',
    transferencia: 'Transferencia'
  };

  const handleCheckout = () => {
    const itemsList = cart.map(i => `➡️ ${i.service.name} (${i.plan.name})`).join('\n');

    const lines = [
      `Hola NexusPlay, quiero comprar este Combo Personalizado:`,
      ``,
      itemsList,
      ``,
      `💰 *TOTAL A PAGAR:* ${formatCOP(finalTotal)}`,
      discount > 0 ? `(Incluye descuento por combo ✅)` : ``,
      `💳 *MÉTODO DE PAGO:* ${paymentMethodLabel[selectedPayment]}`,
      ``,
      `👤 *CLIENTE:* ${name}`,
      ``,
      `📄 *Adjunto mi comprobante de pago a continuación* 👇`
    ];

    const text = lines.filter(line => line !== '').join('\n');

    // Register order for each item
    cart.forEach(item => {
      addOrder({
        id: `${Date.now()}_${item.service.id}`,
        userId: user?.id || 'guest',
        userName: name,
        serviceName: item.service.name,
        serviceLogoUrl: item.service.logoUrl,
        planName: item.plan.name,
        price: item.plan.price,
        date: new Date().toLocaleDateString('es-CO'),
        status: 'pending',
        paymentMethod: paymentMethodLabel[selectedPayment]
      });
    });

    window.open(`https://wa.me/${paymentConfig.whatsappNumber}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className={`fixed inset-y-0 right-0 z-[70] w-full md:w-96 bg-[#121218] border-l border-white/10 shadow-2xl transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="h-full flex flex-col p-6">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-black text-white italic">TU <span className="text-neon-blue">COMBO</span></h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white"><i className="fa-solid fa-xmark text-xl"></i></button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-4">
          {cart.length === 0 ? (
            <div className="text-center text-gray-500 mt-20">
              <i className="fa-solid fa-cart-shopping text-4xl mb-4 opacity-50"></i>
              <p>Tu carrito está vacío.</p>
              <p className="text-xs mt-2">Agrega 3 servicios para obtener 15% OFF.</p>
            </div>
          ) : (
            cart.map((item, idx) => (
              <div key={idx} className="bg-white/5 p-4 rounded-xl flex items-center justify-between border border-white/5">
                <div className="flex items-center gap-3">
                  <img src={item.service.logoUrl} alt="" className="w-8 h-8 object-contain" />
                  <div>
                    <h4 className="font-bold text-sm text-white">{item.service.name}</h4>
                    <p className="text-xs text-gray-400">{item.plan.name}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-white">{formatCOP(item.plan.price)}</span>
                  <button onClick={() => removeFromCart(idx)} className="text-red-500 hover:text-red-400">
                    <i className="fa-solid fa-trash-can"></i>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="mt-6 border-t border-white/10 pt-4">
          {/* Payment Method */}
          {cart.length > 0 && (
            <div className="mb-4">
              <p className="text-[10px] font-bold text-gray-500 uppercase mb-2">Método de Pago</p>
              <div className="grid grid-cols-2 gap-2">
                {([
                  { id: 'bancolombia' as const, icon: 'fa-qrcode', label: 'Bancolombia' },
                  { id: 'nequi' as const, icon: 'fa-mobile-screen', label: 'Nequi' },
                  { id: 'daviplata' as const, icon: 'fa-mobile-screen-button', label: 'Daviplata' },
                  { id: 'transferencia' as const, icon: 'fa-building-columns', label: 'Transfer.' }
                ]).map(pm => (
                  <button
                    key={pm.id}
                    onClick={() => setSelectedPayment(pm.id)}
                    className={`p-2 rounded-lg text-[10px] font-bold flex items-center gap-1.5 transition-all border ${selectedPayment === pm.id
                        ? 'bg-neon-blue/10 border-neon-blue text-white'
                        : 'bg-black/30 border-white/5 text-gray-400 hover:bg-white/5'
                      }`}
                  >
                    <i className={`fa-solid ${pm.icon}`}></i>{pm.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-gray-400 text-sm">
              <span>Subtotal</span>
              <span>{formatCOP(total)}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-green-400 text-sm font-bold">
                <span>Descuento Combo (15%)</span>
                <span>-{formatCOP(discount)}</span>
              </div>
            )}
            <div className="flex justify-between text-white text-xl font-black">
              <span>Total</span>
              <span>{formatCOP(finalTotal)}</span>
            </div>
          </div>

          <input
            type="text"
            placeholder="Tu nombre..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-black/50 border border-white/10 rounded-lg p-3 mb-4 text-white text-sm focus:border-neon-blue outline-none"
          />

          <Button
            onClick={handleCheckout}
            disabled={cart.length === 0 || !name}
            className="w-full shadow-[0_0_20px_rgba(0,243,255,0.3)]"
          >
            <i className="fa-brands fa-whatsapp mr-2"></i> Pedir Combo
          </Button>

          <p className="text-center text-[10px] text-gray-500 mt-2">
            Serás redirigido a WhatsApp para enviar tu comprobante.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
