
import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ServiceCard from './components/ServiceCard';
import Features from './components/Features';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import Modal from './components/Modal';
import CartDrawer from './components/CartDrawer';
import WishlistDrawer from './components/WishlistDrawer';
import ToolsSection from './components/ToolsSection';
import AdminPanel from './components/AdminPanel';
import AuthModal from './components/AuthModal';
import CookieBanner from './components/CookieBanner';
import Notifications from './components/Notifications';
import SplashScreen from './components/SplashScreen';
import OrderHistory from './components/OrderHistory';
import ReferralSystem from './components/ReferralSystem';
import AdminDashboard from './components/AdminDashboard';
import { Service, ServicePlan, Category } from './types';
import { LanguageProvider } from './contexts/LanguageContext';
import { ServiceProvider, useServices } from './contexts/ServiceContext';
import { AuthProvider } from './contexts/AuthContext';

// Advanced Filters inside Catalog
const CatalogSection = ({ onBuy }: { onBuy: (s: Service, p: ServicePlan) => void }) => {
  const { services, categories, isAdmin, addService } = useServices();
  const [filter, setFilter] = useState<Category>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState<number>(100000);
  const [statusFilter, setStatusFilter] = useState<'all' | 'online' | 'maintenance'>('all');
  const [sortBy, setSortBy] = useState<'default' | 'price_asc' | 'price_desc' | 'popular'>('default');
  const [showFilters, setShowFilters] = useState(false);

  const filteredServices = services
    .filter(s => {
      const matchesCategory = filter === 'all' || s.category === filter;
      const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPrice = s.plans.some(p => p.price <= priceRange);
      const matchesStatus = statusFilter === 'all' || s.status === statusFilter;
      return matchesCategory && matchesSearch && matchesPrice && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === 'price_asc') return (a.plans[0]?.price || 0) - (b.plans[0]?.price || 0);
      if (sortBy === 'price_desc') return (b.plans[0]?.price || 0) - (a.plans[0]?.price || 0);
      if (sortBy === 'popular') return (b.stock || 0) - (a.stock || 0);
      return 0;
    });

  const formatPrice = (n: number) => `$${(n / 1000).toFixed(0)}K`;

  return (
    <section id="catalog" className="py-32 relative container mx-auto px-6">
      <div className="flex flex-col items-center mb-16 text-center">
        <span className="text-neon-blue font-bold tracking-[0.2em] text-sm mb-4 animate-pulse">
          CATÁLOGO 2026
        </span>
        <h2 className="text-4xl md:text-6xl font-black text-white mb-8">
          Elige tu <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">Suscripción</span>
        </h2>

        {/* Search + Category Filters */}
        <div className="w-full max-w-4xl bg-white/5 border border-white/10 p-2 rounded-2xl flex flex-col md:flex-row gap-4 backdrop-blur-md">
          <div className="relative flex-grow">
            <i className="fa-solid fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"></i>
            <input
              type="text"
              placeholder="Buscar servicio..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-black/40 border border-transparent focus:border-neon-blue rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none transition-colors"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-3 rounded-xl font-bold text-sm uppercase whitespace-nowrap transition-all ${filter === cat
                  ? 'bg-neon-blue text-black shadow-[0_0_15px_rgba(0,243,255,0.4)]'
                  : 'bg-black/40 text-gray-400 hover:text-white hover:bg-white/10'
                  }`}
              >
                {cat === 'all' ? 'Todos' : cat === 'combos' ? '🔥 COMBOS' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Advanced Filters Toggle */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="mt-4 text-xs text-gray-400 hover:text-neon-blue transition-colors font-bold flex items-center gap-2"
        >
          <i className={`fa-solid fa-sliders ${showFilters ? 'text-neon-blue' : ''}`}></i>
          {showFilters ? 'Ocultar filtros avanzados' : 'Filtros avanzados'}
          <i className={`fa-solid fa-chevron-${showFilters ? 'up' : 'down'} text-[10px]`}></i>
        </button>

        {/* Advanced Filters Panel */}
        {showFilters && (
          <div className="w-full max-w-4xl mt-4 bg-white/5 border border-white/10 p-5 rounded-2xl backdrop-blur-md animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Price Range */}
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-2">
                  <i className="fa-solid fa-dollar-sign mr-1 text-neon-blue"></i>Precio Máximo: {formatPrice(priceRange)}
                </label>
                <input
                  type="range"
                  min="5000"
                  max="200000"
                  step="5000"
                  value={priceRange}
                  onChange={e => setPriceRange(Number(e.target.value))}
                  className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
                <div className="flex justify-between text-[9px] text-gray-500 mt-1">
                  <span>$5K</span>
                  <span>$200K</span>
                </div>
              </div>

              {/* Status Filter */}
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-2">
                  <i className="fa-solid fa-signal mr-1 text-green-400"></i>Estado
                </label>
                <div className="flex gap-2">
                  {[
                    { id: 'all' as const, label: 'Todos' },
                    { id: 'online' as const, label: '🟢 Online' },
                    { id: 'maintenance' as const, label: '🟡 Mant.' }
                  ].map(s => (
                    <button
                      key={s.id}
                      onClick={() => setStatusFilter(s.id)}
                      className={`flex-1 px-2 py-2 rounded-lg text-[10px] font-bold transition-all ${statusFilter === s.id
                        ? 'bg-neon-blue/20 text-neon-blue border border-neon-blue/30'
                        : 'bg-black/30 text-gray-500 border border-white/5 hover:bg-white/5'
                        }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort By */}
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-2">
                  <i className="fa-solid fa-arrow-down-wide-short mr-1 text-purple-400"></i>Ordenar Por
                </label>
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value as any)}
                  className="w-full bg-black/50 border border-white/10 rounded-lg py-2 px-3 text-xs text-white focus:outline-none focus:border-neon-blue cursor-pointer"
                >
                  <option value="default" className="bg-black">Por defecto</option>
                  <option value="price_asc" className="bg-black">Precio: Menor a Mayor</option>
                  <option value="price_desc" className="bg-black">Precio: Mayor a Menor</option>
                  <option value="popular" className="bg-black">Más Popular</option>
                </select>
              </div>
            </div>

            <div className="mt-3 text-center text-[10px] text-gray-500">
              {filteredServices.length} servicio{filteredServices.length !== 1 ? 's' : ''} encontrado{filteredServices.length !== 1 ? 's' : ''}
            </div>
          </div>
        )}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {isAdmin && (
          <div
            onClick={() => addService(filter === 'all' ? 'streaming' : filter)}
            className="h-[450px] border-2 border-dashed border-white/20 rounded-3xl flex flex-col items-center justify-center cursor-pointer hover:border-neon-blue hover:bg-white/5 transition-all group"
          >
            <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <i className="fa-solid fa-plus text-3xl text-gray-400 group-hover:text-neon-blue"></i>
            </div>
            <p className="text-gray-400 font-bold group-hover:text-white">Crear Nuevo {filter === 'combos' ? 'Combo' : 'Servicio'}</p>
          </div>
        )}

        {filteredServices.map(service => (
          <div key={service.id} className="min-h-[450px]">
            <ServiceCard service={service} onSelect={onBuy} />
          </div>
        ))}
      </div>
    </section>
  );
};

const AppContent: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [adminPanelOpen, setAdminPanelOpen] = useState(false);
  const [ordersOpen, setOrdersOpen] = useState(false);
  const [referralsOpen, setReferralsOpen] = useState(false);
  const [dashboardOpen, setDashboardOpen] = useState(false);
  const [showSplash, setShowSplash] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<ServicePlan | null>(null);
  const { isAdmin } = useServices();

  // Show splash only once per session
  useEffect(() => {
    if (!sessionStorage.getItem('nexus_splash_shown')) {
      setShowSplash(true);
    }
  }, []);

  const handleSplashFinish = useCallback(() => {
    setShowSplash(false);
    sessionStorage.setItem('nexus_splash_shown', 'true');
  }, []);

  const handleBuyNow = (service: Service, plan: ServicePlan) => {
    setSelectedService(service);
    setSelectedPlan(plan);
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#050508] text-white font-sans selection:bg-neon-blue selection:text-black">
      {showSplash && <SplashScreen onFinish={handleSplashFinish} />}

      <Navbar
        onCartOpen={() => setCartOpen(true)}
        onWishlistOpen={() => setWishlistOpen(true)}
        onAuthOpen={() => setAuthOpen(true)}
        onOrdersOpen={() => setOrdersOpen(true)}
        onReferralsOpen={() => setReferralsOpen(true)}
      />

      {isAdmin && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[60] flex gap-2">
          <div className="bg-red-600/90 text-white text-xs font-bold px-4 py-1 rounded-full shadow animate-bounce">
            <i className="fa-solid fa-wrench mr-2"></i> MODO EDITOR ACTIVADO
          </div>
          <button
            onClick={() => setDashboardOpen(true)}
            className="bg-blue-600/90 text-white text-xs font-bold px-4 py-1 rounded-full shadow hover:bg-blue-500 transition-colors"
          >
            <i className="fa-solid fa-chart-pie mr-2"></i>DASHBOARD
          </button>
        </div>
      )}

      <main>
        <Hero />
        <CatalogSection onBuy={handleBuyNow} />
        <ToolsSection />
        <Features />
        <Testimonials />
      </main>

      <Footer onOpenAdmin={() => setAdminPanelOpen(true)} />

      {/* Drawers & Modals */}
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      <WishlistDrawer isOpen={wishlistOpen} onClose={() => setWishlistOpen(false)} />
      <AdminPanel isOpen={adminPanelOpen} onClose={() => setAdminPanelOpen(false)} />
      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
      <OrderHistory isOpen={ordersOpen} onClose={() => setOrdersOpen(false)} />
      <ReferralSystem isOpen={referralsOpen} onClose={() => setReferralsOpen(false)} />
      <AdminDashboard isOpen={dashboardOpen} onClose={() => setDashboardOpen(false)} />

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        service={selectedService}
        selectedPlan={selectedPlan}
      />

      {/* Trust & Legal */}
      <CookieBanner />
      <Notifications />
    </div>
  );
};

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <ServiceProvider>
          <AppContent />
        </ServiceProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;
