
import React from 'react';
import { useServices } from '../contexts/ServiceContext';
import { formatCOP } from '../utils/currency';
import Button from './Button';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const WishlistDrawer: React.FC<WishlistDrawerProps> = ({ isOpen, onClose }) => {
  const { wishlist, toggleWishlist, addToCart } = useServices();

  return (
    <div className={`fixed inset-y-0 left-0 z-[70] w-full md:w-96 bg-[#121218] border-r border-white/10 shadow-2xl transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="h-full flex flex-col p-6">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-black text-white italic">TU <span className="text-red-500">WISHLIST</span></h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white"><i className="fa-solid fa-xmark text-xl"></i></button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-4">
          {wishlist.length === 0 ? (
            <div className="text-center text-gray-500 mt-20">
              <i className="fa-regular fa-heart text-4xl mb-4 opacity-50"></i>
              <p>No tienes favoritos aún.</p>
              <p className="text-xs mt-2">Dale corazón a lo que te guste.</p>
            </div>
          ) : (
            wishlist.map((service, idx) => (
              <div key={idx} className="bg-white/5 p-4 rounded-xl flex items-center justify-between border border-white/5">
                <div className="flex items-center gap-3">
                  <img src={service.logoUrl} alt="" className="w-10 h-10 object-contain" />
                  <div>
                    <h4 className="font-bold text-sm text-white">{service.name}</h4>
                    <p className="text-xs text-neon-blue font-bold">{formatCOP(service.plans[0].price)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => { addToCart(service, service.plans[0]); onClose(); }}
                    className="bg-white/10 w-8 h-8 rounded-full text-white hover:bg-neon-blue hover:text-black flex items-center justify-center transition-colors"
                  >
                    <i className="fa-solid fa-cart-plus text-xs"></i>
                  </button>
                  <button onClick={() => toggleWishlist(service)} className="text-red-500 hover:text-red-400 w-8 h-8 flex items-center justify-center">
                    <i className="fa-solid fa-trash-can"></i>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default WishlistDrawer;
