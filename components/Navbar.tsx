
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { useServices } from '../contexts/ServiceContext';
import PushNotifications from './PushNotifications';

interface NavbarProps {
  onCartOpen: () => void;
  onWishlistOpen: () => void;
  onAuthOpen: () => void;
  onOrdersOpen: () => void;
  onReferralsOpen: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onCartOpen, onWishlistOpen, onAuthOpen, onOrdersOpen, onReferralsOpen }) => {
  const { language, setLanguage, t } = useLanguage();
  const { user, isAuthenticated, logout } = useAuth();
  const { cart, wishlist, theme, toggleTheme, globalConfig } = useServices();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Inicio', href: '#home' },
    { label: 'Catálogo', href: '#catalog' },
    { label: 'Herramientas', href: '#tools' },
    { label: 'Contacto', href: '#footer' }
  ];

  const handleScroll = (id: string) => {
    const section = document.querySelector(id);
    section?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Promo Banner */}
      {globalConfig.showBanner && (
        <div className="bg-gradient-to-r from-neon-blue via-neon-purple to-neon-blue text-black text-center py-1.5 text-xs font-bold tracking-wide z-50 relative animate-pulse">
          <i className="fa-solid fa-bolt mr-1"></i> {globalConfig.promoText} — USA <span className="bg-black text-white px-2 py-0.5 rounded font-mono mx-1">{globalConfig.promoCode}</span> {globalConfig.promoDetail}
        </div>
      )}

      <nav className={`sticky top-0 z-40 transition-all duration-500 ${scrolled ? 'bg-black/80 backdrop-blur-xl shadow-2xl shadow-black/50 border-b border-white/5' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <div className="flex items-center gap-3">
              <a href="#home" className="text-xl font-black italic tracking-tighter text-white hover:text-neon-blue transition-colors">
                NEXUS<span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple">PLAY</span>
              </a>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-6">
              {navLinks.map(link => (
                <button
                  key={link.href}
                  onClick={() => handleScroll(link.href)}
                  className="text-gray-400 hover:text-white text-sm transition-colors font-medium"
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* Right Controls */}
            <div className="flex items-center gap-1">
              {/* Language Selector */}
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as any)}
                className="bg-transparent text-white text-xs border border-white/10 rounded-lg px-1.5 py-1 cursor-pointer focus:outline-none hover:border-white/30"
              >
                {['en', 'es', 'fr', 'de', 'pt', 'zh', 'ja', 'ru'].map(lang => (
                  <option key={lang} value={lang} className="bg-black">{lang.toUpperCase()}</option>
                ))}
              </select>

              {/* Theme Toggle */}
              <button onClick={toggleTheme} className="p-2 rounded-xl hover:bg-white/10 transition-colors">
                <i className={`fa-solid ${theme === 'cyber' ? 'fa-sun text-yellow-400' : 'fa-moon text-blue-400'}`}></i>
              </button>

              {/* Notifications */}
              <PushNotifications />

              {/* Wishlist */}
              <button onClick={onWishlistOpen} className="p-2 rounded-xl hover:bg-white/10 transition-colors relative">
                <i className="fa-solid fa-heart text-gray-400 hover:text-red-500 transition-colors"></i>
                {wishlist.length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[9px] font-black rounded-full flex items-center justify-center">{wishlist.length}</span>
                )}
              </button>

              {/* Cart */}
              <button onClick={onCartOpen} className="p-2 rounded-xl hover:bg-white/10 transition-colors relative">
                <i className="fa-solid fa-cart-shopping text-gray-400 hover:text-neon-blue transition-colors"></i>
                {cart.length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-neon-blue text-black text-[9px] font-black rounded-full flex items-center justify-center">{cart.length}</span>
                )}
              </button>

              {/* Auth Area */}
              {isAuthenticated ? (
                <div className="flex items-center gap-1 ml-1">
                  {/* Order History */}
                  <button onClick={onOrdersOpen} className="p-2 rounded-xl hover:bg-white/10 transition-colors" title="Historial">
                    <i className="fa-solid fa-receipt text-gray-400 hover:text-white transition-colors"></i>
                  </button>

                  {/* Referrals */}
                  <button onClick={onReferralsOpen} className="p-2 rounded-xl hover:bg-white/10 transition-colors" title="Referidos">
                    <i className="fa-solid fa-gift text-gray-400 hover:text-purple-400 transition-colors"></i>
                  </button>

                  {/* User Avatar + Name */}
                  <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-xl border border-white/10 ml-1">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center text-[10px] font-bold text-white">
                      {user?.name?.charAt(0) || 'U'}
                    </div>
                    <span className="text-xs text-white font-bold hidden sm:block max-w-[80px] truncate">
                      {user?.name}
                    </span>
                    <button onClick={logout} className="text-gray-500 hover:text-red-400 transition-colors" title="Salir">
                      <i className="fa-solid fa-right-from-bracket text-xs"></i>
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={onAuthOpen}
                  className="ml-1 bg-gradient-to-r from-neon-blue to-neon-purple text-black px-4 py-1.5 rounded-xl text-xs font-bold hover:shadow-[0_0_15px_rgba(0,243,255,0.4)] transition-all"
                >
                  <i className="fa-solid fa-user mr-1"></i>Entrar
                </button>
              )}

              {/* Mobile Menu Toggle */}
              <button
                className="md:hidden p-2 text-gray-400 hover:text-white ml-1"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <i className={`fa-solid ${mobileMenuOpen ? 'fa-xmark' : 'fa-bars'} text-lg`}></i>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-black/95 border-t border-white/5 p-4 space-y-2 animate-fade-in">
            {navLinks.map(link => (
              <button
                key={link.href}
                onClick={() => handleScroll(link.href)}
                className="block w-full text-left text-gray-300 hover:text-white py-2 text-sm font-medium"
              >
                {link.label}
              </button>
            ))}
            {isAuthenticated && (
              <>
                <button onClick={() => { onOrdersOpen(); setMobileMenuOpen(false); }} className="block w-full text-left text-gray-300 hover:text-white py-2 text-sm font-medium">
                  <i className="fa-solid fa-receipt mr-2 text-neon-blue"></i>Mis Pedidos
                </button>
                <button onClick={() => { onReferralsOpen(); setMobileMenuOpen(false); }} className="block w-full text-left text-gray-300 hover:text-white py-2 text-sm font-medium">
                  <i className="fa-solid fa-gift mr-2 text-purple-400"></i>Referidos
                </button>
              </>
            )}
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
