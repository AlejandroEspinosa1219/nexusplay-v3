
import React, { useState, useEffect } from 'react';
import { Service, ServicePlan } from '../types';
import Button from './Button';
import { useLanguage } from '../contexts/LanguageContext';
import { useServices } from '../contexts/ServiceContext';
import { formatCOP } from '../utils/currency';
import ReviewSystem from './ReviewSystem';

interface ServiceCardProps {
  service: Service;
  onSelect: (service: Service, plan: ServicePlan) => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, onSelect }) => {
  const [selectedPlanIndex, setSelectedPlanIndex] = useState(0);
  const { t } = useLanguage();
  const { isAdmin, updateService, deleteService, addToCart, resellerMode, wishlist, toggleWishlist } = useServices();
  const currentPlan = service.plans[selectedPlanIndex];

  const [imageError, setImageError] = useState(false);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [timeLeft, setTimeLeft] = useState<string>('');

  // Helper to format timestamp for datetime-local input
  const formatForInput = (timestamp?: number) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    // Adjust to local ISO string for input value
    const offset = date.getTimezoneOffset() * 60000;
    const localISOTime = new Date(date.getTime() - offset).toISOString().slice(0, 16);
    return localISOTime;
  };

  // Edit Mode State
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: service.name,
    description: service.description,
    logoUrl: service.logoUrl,
    brandColor: service.brandColor,
    flashDate: service.flashOfferEnds ? formatForInput(service.flashOfferEnds) : ''
  });

  const isCombo = service.category === 'combos';
  const isLiked = wishlist.some(s => s.id === service.id);

  // Sync state when entering edit mode or service updates
  useEffect(() => {
    if (isEditing) {
      setEditForm(prev => ({
        ...prev,
        name: service.name,
        description: service.description,
        logoUrl: service.logoUrl,
        brandColor: service.brandColor,
        flashDate: service.flashOfferEnds ? formatForInput(service.flashOfferEnds) : ''
      }));
    }
  }, [isEditing, service]);

  // Feature 3: Flash Timer Logic
  useEffect(() => {
    if (service.flashOfferEnds) {
      const interval = setInterval(() => {
        const now = Date.now();
        const diff = service.flashOfferEnds! - now;
        if (diff <= 0) {
          setTimeLeft('Expirado');
          clearInterval(interval);
        } else {
          const days = Math.floor(diff / (1000 * 60 * 60 * 24));
          const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((diff % (1000 * 60)) / 1000);

          if (days > 0) {
            setTimeLeft(`${days}d ${hours}h ${minutes}m`);
          } else {
            setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
          }
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [service.flashOfferEnds]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isEditing) return;
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left;
    const y = e.clientY - box.top;
    const centerX = box.width / 2;
    const centerY = box.height / 2;
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => setRotate({ x: 0, y: 0 });

  const handleSave = () => {
    updateService(service.id, 'name', editForm.name);
    updateService(service.id, 'description', editForm.description);
    updateService(service.id, 'logoUrl', editForm.logoUrl);
    updateService(service.id, 'brandColor', editForm.brandColor);

    // Save Flash Date
    if (editForm.flashDate) {
      const timestamp = new Date(editForm.flashDate).getTime();
      updateService(service.id, 'flashOfferEnds', timestamp);
    } else {
      // Remove offer if empty
      updateService(service.id, 'flashOfferEnds', undefined);
    }

    setIsEditing(false);
  };

  return (
    <div
      className={`group relative w-full h-full perspective-1000 ${isEditing ? 'z-[60]' : ''}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: !isEditing ? `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale3d(1, 1, 1)` : 'none',
        transition: 'transform 0.1s ease-out'
      }}
    >
      {/* Feature 16: Reseller Price */}
      {!isEditing && resellerMode && service.wholesalePrice && (
        <div className="absolute -left-2 top-10 z-50 bg-purple-600 text-white text-xs font-bold px-3 py-1 -rotate-45 shadow-lg">
          REV: {formatCOP(service.wholesalePrice)}
        </div>
      )}

      {/* Admin Controls */}
      {isAdmin && (
        <div className="absolute -top-3 -right-3 z-50 flex gap-2">
          {!isEditing ? (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-500 transition-colors"
              >
                <i className="fa-solid fa-pen text-xs"></i>
              </button>
              <button
                onClick={() => updateService(service.id, 'stock', (service.stock || 0) + 5)}
                className="bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center shadow-lg"
              >
                <i className="fa-solid fa-plus text-xs"></i>
              </button>
              <button
                onClick={() => deleteService(service.id)}
                className="bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center shadow-lg"
              >
                <i className="fa-solid fa-trash text-xs"></i>
              </button>
            </>
          ) : (
            <button
              onClick={handleSave}
              className="bg-green-500 text-black font-bold w-20 h-8 rounded-full flex items-center justify-center shadow-lg animate-pulse"
            >
              GUARDAR
            </button>
          )}
        </div>
      )}

      {/* Feature 3: Flash Timer UI */}
      {service.flashOfferEnds && !isEditing && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 z-40 bg-red-600 text-white text-[10px] font-bold px-4 py-1 rounded-b-lg animate-pulse shadow-[0_0_15px_rgba(255,0,0,0.5)]">
          <i className="fa-regular fa-clock mr-1"></i> {timeLeft}
        </div>
      )}

      {/* Status & Stock */}
      <div className="absolute top-4 right-4 z-30 flex flex-col items-end gap-1">
        <div className="flex items-center gap-2 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
          <div className={`w-2 h-2 rounded-full ${service.status === 'online' ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
          <span className="text-[10px] font-bold uppercase text-white/80">{service.status}</span>
        </div>
        {/* Feature 2: Stock Counter */}
        {service.stock !== undefined && service.stock < 10 && !isEditing && (
          <span className="text-[10px] font-bold text-red-400 bg-black/60 px-2 rounded animate-bounce">
            ¡Solo quedan {service.stock}!
          </span>
        )}
      </div>

      <div className={`relative h-full rounded-3xl p-6 bg-gradient-to-b ${service.bgGradient} border ${isCombo ? 'border-yellow-500/30' : 'border-white/10'} shadow-2xl flex flex-col overflow-hidden`}>

        {/* Wishlist Button */}
        {!isEditing && (
          <button
            onClick={(e) => { e.stopPropagation(); toggleWishlist(service); }}
            className="absolute top-4 left-4 z-40 text-xl transition-transform active:scale-90 hover:scale-110"
          >
            <i className={`fa-solid fa-heart ${isLiked ? 'text-red-500' : 'text-white/20 hover:text-white'}`}></i>
          </button>
        )}

        {/* --- EDIT MODE INPUTS --- */}
        {isEditing ? (
          <div className="flex flex-col gap-3 h-full overflow-y-auto pr-1">
            <div className="text-center text-xs text-blue-400 font-bold mb-2">MODO EDICIÓN TOTAL</div>

            <div>
              <label className="text-[9px] text-gray-400 uppercase font-bold">Nombre</label>
              <input
                className="w-full bg-black/50 text-white text-sm border border-white/10 rounded p-1"
                value={editForm.name}
                onChange={e => setEditForm({ ...editForm, name: e.target.value })}
              />
            </div>

            <div>
              <label className="text-[9px] text-gray-400 uppercase font-bold">Logo URL</label>
              <input
                className="w-full bg-black/50 text-white text-xs border border-white/10 rounded p-1"
                value={editForm.logoUrl}
                onChange={e => setEditForm({ ...editForm, logoUrl: e.target.value })}
              />
            </div>

            <div>
              <label className="text-[9px] text-gray-400 uppercase font-bold">Descripción</label>
              <textarea
                className="w-full bg-black/50 text-white text-xs border border-white/10 rounded p-1"
                rows={2}
                value={editForm.description}
                onChange={e => setEditForm({ ...editForm, description: e.target.value })}
              />
            </div>

            <div>
              <label className="text-[9px] text-gray-400 uppercase font-bold">Color Hex</label>
              <div className="flex gap-2">
                <input
                  type="color"
                  className="bg-transparent h-8 w-8 cursor-pointer"
                  value={editForm.brandColor}
                  onChange={e => setEditForm({ ...editForm, brandColor: e.target.value })}
                />
                <input
                  className="flex-1 bg-black/50 text-white text-xs border border-white/10 rounded p-1"
                  value={editForm.brandColor}
                  onChange={e => setEditForm({ ...editForm, brandColor: e.target.value })}
                />
              </div>
            </div>

            <div className="border-t border-white/10 pt-2">
              <label className="text-[9px] text-gray-400 uppercase font-bold block mb-1">Precios & Planes</label>
              {service.plans.map(plan => (
                <div key={plan.id} className="flex gap-2 mb-2">
                  <input
                    className="w-1/2 bg-black/50 text-white text-xs border border-white/10 rounded p-1"
                    value={plan.name}
                    onChange={e => updateService(service.id, 'planName', e.target.value, plan.id)}
                  />
                  <input
                    type="number"
                    className="w-1/2 bg-black/50 text-neon-green text-xs border border-white/10 rounded p-1 font-bold"
                    value={plan.price}
                    onChange={e => updateService(service.id, 'price', e.target.value, plan.id)}
                  />
                </div>
              ))}
            </div>

            <div className="border-t border-white/10 pt-2 bg-red-900/10 p-2 rounded">
              <div className="flex justify-between items-center mb-1">
                <label className="text-[9px] text-red-400 uppercase font-bold">Oferta Flash (Fecha Fin)</label>
                {editForm.flashDate && (
                  <button
                    onClick={() => setEditForm({ ...editForm, flashDate: '' })}
                    className="text-[9px] text-red-500 underline"
                  >
                    Quitar Oferta
                  </button>
                )}
              </div>
              <input
                type="datetime-local"
                className="w-full bg-black text-white text-xs border border-red-500/30 rounded p-1 focus:border-red-500 outline-none"
                value={editForm.flashDate}
                onChange={e => setEditForm({ ...editForm, flashDate: e.target.value })}
              />
              <p className="text-[9px] text-gray-500 mt-1">Selecciona la fecha exacta de finalización.</p>
            </div>
          </div>
        ) : (
          <>
            {/* VIEW MODE CONTENT */}
            <div className="relative z-10 flex flex-col items-center mb-6 mt-4 group-hover:-translate-y-2 transition-transform duration-300">
              <div className={`h-20 w-full flex items-center justify-center mb-4 transition-transform duration-300`}>
                {!imageError ? (
                  <img
                    src={service.logoUrl}
                    alt={service.name}
                    className="h-full w-auto object-contain drop-shadow-lg group-hover:scale-125 transition-transform duration-300"
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <i className="fa-solid fa-play-circle text-6xl text-white/50"></i>
                )}
              </div>

              <h3 className={`text-xl font-bold text-center ${isCombo ? 'text-yellow-400' : 'text-white'}`}>{service.name}</h3>
            </div>

            <p className="relative z-10 text-gray-400 text-sm mb-2 text-center leading-relaxed h-12 overflow-hidden flex items-center justify-center">
              {service.description}
            </p>

            {/* Reviews */}
            <ReviewSystem serviceId={service.id} serviceName={service.name} />

            {/* Plans */}
            <div className="relative z-10 grid grid-cols-2 gap-2 bg-black/40 p-1 rounded-xl mb-6 backdrop-blur-sm border border-white/5">
              {service.plans.map((plan, idx) => (
                <button
                  key={plan.id}
                  onClick={() => setSelectedPlanIndex(idx)}
                  className={`text-xs font-bold py-3 rounded-lg transition-all duration-300 ${selectedPlanIndex === idx
                      ? 'bg-white/10 text-white shadow'
                      : 'text-gray-500 hover:text-white'
                    } ${service.plans.length === 1 ? 'col-span-2' : ''}`}
                >
                  {plan.name}
                </button>
              ))}
            </div>

            {/* Price & Actions */}
            <div className="relative z-10 mt-auto">
              <div className="flex flex-col items-center gap-1 mb-4">
                <span className={`text-3xl font-black tracking-tight drop-shadow-md ${isCombo ? 'text-yellow-400' : 'text-white'}`}>
                  {formatCOP(currentPlan.price)}
                </span>
                <span className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">COP / Mes</span>
              </div>

              <div className="grid grid-cols-4 gap-2">
                {/* Feature 1: Add to Cart Button */}
                <button
                  onClick={() => addToCart(service, currentPlan)}
                  className="col-span-1 bg-white/10 hover:bg-white/20 text-white rounded-xl flex items-center justify-center transition-colors border border-white/5"
                  title="Agregar al Carrito"
                >
                  <i className="fa-solid fa-cart-plus"></i>
                </button>

                <Button
                  className="col-span-3 w-full shadow-lg relative overflow-hidden"
                  style={{ background: `linear-gradient(90deg, ${service.brandColor} 0%, ${service.brandColor}dd 100%)` }}
                  onClick={() => onSelect(service, currentPlan)}
                >
                  {t('card.buyNow')}
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ServiceCard;
