
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Service, ServicePlan, Category, PaymentConfig, Testimonial, Client, GlobalConfig, Review, Order, AppNotification } from '../types';
import { useLanguage } from './LanguageContext';

// Helper to provide reliable initial services
const getInitialServices = (t: (key: string) => string): Service[] => [
  // --- COMBOS ---
  {
    id: 'combo_net_dis',
    name: 'Combo Cine',
    description: 'Netflix 1 Pantalla + Disney+ Estándar',
    logoUrl: 'https://cdn-icons-png.flaticon.com/512/5977/5977590.png',
    category: 'combos',
    brandColor: '#FFD700',
    bgGradient: 'from-yellow-900 to-black',
    status: 'online',
    stock: 10,
    wholesalePrice: 20000,
    plans: [
      { id: 'c_nd1', name: 'Ahorro Total', price: 24000 }
    ]
  },
  {
    id: 'combo_max_prime',
    name: 'Pack Diversión',
    description: 'Max (HBO) + Prime Video Mensual',
    logoUrl: 'https://cdn-icons-png.flaticon.com/512/8777/8777983.png',
    category: 'combos',
    brandColor: '#FF5500',
    bgGradient: 'from-orange-900 to-black',
    status: 'online',
    stock: 15,
    wholesalePrice: 18000,
    plans: [
      { id: 'c_mp1', name: 'Oferta', price: 21000 }
    ]
  },
  // --- Streaming ---
  {
    id: 'netflix',
    name: 'Netflix',
    description: t('serviceDescs.netflix'),
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/75/Netflix_icon.svg',
    category: 'streaming',
    brandColor: '#E50914',
    bgGradient: 'from-red-950 to-black',
    status: 'online',
    stock: 4,
    wholesalePrice: 12000,
    popularContent: ['https://image.tmdb.org/t/p/w200/9zcbqSxdsRMZ80ftGd9fpRpBMAn.jpg', 'https://image.tmdb.org/t/p/w200/scZlQQYnDVlnpxFTuEbK9QDScbV.jpg'],
    plans: [
      { id: 'n1', name: '1 Pantalla HD', price: 15000 },
      { id: 'n2', name: '4 Pantallas UHD', price: 35000 }
    ]
  },
  {
    id: 'youtube_prem',
    name: 'YouTube Premium',
    description: 'Videos sin anuncios, descargas y Music Premium.',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/d6/Youtube_Premium_logo.svg',
    category: 'streaming',
    brandColor: '#FF0000',
    bgGradient: 'from-red-950 to-black',
    status: 'online',
    stock: 50,
    wholesalePrice: 14000,
    plans: [
      { id: 'yt1', name: 'Individual', price: 17000 },
      { id: 'yt2', name: 'Familiar', price: 26000 }
    ]
  },
  {
    id: 'win',
    name: 'Win Sports+',
    description: 'FPC en vivo, Liga BetPlay y torneos.',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/c3/Win_Sports_Plus_logo.png',
    category: 'streaming',
    brandColor: '#E85C0D',
    bgGradient: 'from-orange-950 to-black',
    status: 'online',
    stock: 20,
    wholesalePrice: 24000,
    plans: [
      { id: 'win1', name: 'Mensual', price: 28000 },
      { id: 'win2', name: 'Semestral', price: 150000 }
    ]
  },
  {
    id: 'disney',
    name: 'Disney+',
    description: t('serviceDescs.disney'),
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/3e/Disney%2B_logo.svg',
    category: 'streaming',
    brandColor: '#113CCF',
    bgGradient: 'from-blue-950 to-black',
    status: 'online',
    stock: 12,
    wholesalePrice: 8000,
    flashOfferEnds: Date.now() + 7200000,
    plans: [
      { id: 'd1', name: 'Estándar', price: 12000 },
      { id: 'd2', name: 'Premium', price: 20000 }
    ]
  },
  {
    id: 'max',
    name: 'Max (HBO)',
    description: t('serviceDescs.hbo'),
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/ce/Max_logo.svg',
    category: 'streaming',
    brandColor: '#002BE7',
    bgGradient: 'from-indigo-950 to-black',
    status: 'online',
    stock: 30,
    wholesalePrice: 10000,
    plans: [
      { id: 'h1', name: 'Estándar', price: 14000 },
      { id: 'h2', name: 'Platino', price: 19000 }
    ]
  },
  {
    id: 'prime',
    name: 'Prime Video',
    description: t('serviceDescs.prime'),
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/11/Amazon_Prime_Video_logo.svg',
    category: 'streaming',
    brandColor: '#00A8E1',
    bgGradient: 'from-sky-950 to-black',
    status: 'online',
    stock: 45,
    wholesalePrice: 7000,
    plans: [
      { id: 'p1', name: 'Mensual', price: 10000 },
      { id: 'p2', name: '6 Meses', price: 50000 }
    ]
  },
  {
    id: 'apple',
    name: 'Apple TV+',
    description: 'Series y películas Apple Originals exclusivas.',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/28/Apple_TV_Plus_Logo.svg',
    category: 'streaming',
    brandColor: '#FFFFFF',
    bgGradient: 'from-gray-800 to-black',
    status: 'online',
    stock: 10,
    wholesalePrice: 12000,
    plans: [
      { id: 'a1', name: 'Cuenta Personal', price: 15000 },
      { id: 'a2', name: 'Familiar', price: 22000 }
    ]
  },
  {
    id: 'paramount',
    name: 'Paramount+',
    description: 'Una montaña de entretenimiento, cine y series.',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a5/Paramount_Plus.svg',
    category: 'streaming',
    brandColor: '#0064FF',
    bgGradient: 'from-blue-900 to-black',
    status: 'online',
    stock: 15,
    wholesalePrice: 8000,
    plans: [
      { id: 'pm1', name: 'Estándar', price: 11000 },
      { id: 'pm2', name: 'Anual', price: 90000 }
    ]
  },
  {
    id: 'spotify',
    name: 'Spotify',
    description: t('serviceDescs.spotify'),
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg',
    category: 'music',
    brandColor: '#1DB954',
    bgGradient: 'from-green-950 to-black',
    status: 'online',
    stock: 20,
    wholesalePrice: 9000,
    plans: [
      { id: 's1', name: 'Individual', price: 14000 },
      { id: 's2', name: 'Duo', price: 18000 }
    ]
  },
  {
    id: 'crunchyroll',
    name: 'Crunchyroll',
    description: 'Anime en HD sin anuncios. Simulcast Japón.',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Crunchyroll_Logo.png',
    category: 'streaming',
    brandColor: '#F47521',
    bgGradient: 'from-orange-950 to-black',
    status: 'online',
    stock: 25,
    wholesalePrice: 9000,
    plans: [
      { id: 'c1', name: 'Fan', price: 12000 },
      { id: 'c2', name: 'Mega Fan', price: 16000 }
    ]
  },
  {
    id: 'iptv',
    name: 'IPTV Premium',
    description: '+3000 Canales, Deportes y Películas.',
    logoUrl: 'https://cdn-icons-png.flaticon.com/512/3208/3208728.png',
    category: 'iptv',
    brandColor: '#8E24AA',
    bgGradient: 'from-purple-950 to-black',
    status: 'online',
    stock: 99,
    wholesalePrice: 10000,
    plans: [
      { id: 'ip1', name: '1 Mes', price: 18000 },
      { id: 'ip2', name: '3 Dispositivos', price: 25000 }
    ]
  }
];

const INITIAL_TESTIMONIALS: Testimonial[] = [
  { id: 1, name: 'Carlos A.', role: 'Cliente', avatar: 'https://randomuser.me/api/portraits/men/32.jpg', quote: 'Excelente servicio.', rating: 5 }
];

const INITIAL_PAYMENT_CONFIG: PaymentConfig = {
  whatsappNumber: '573234754109',
  qrImageUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=Bancolombia',
  nequiNumber: '3234754109',
  daviplataNumber: '3234754109',
  bankName: 'Bancolombia',
  bankAccountType: 'Ahorros',
  bankAccountNumber: '000-000000-00',
  bankAccountHolder: 'NexusPlay S.A.S'
};

// Updated Defaults for 2026
const INITIAL_GLOBAL_CONFIG: GlobalConfig = {
  promoText: 'OFERTA DE LANZAMIENTO',
  promoCode: 'NEXUS2026',
  promoDetail: 'PARA 10% OFF EXTRA',
  showBanner: true,
  maintenanceMode: false
};

const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: '1',
    title: '🔥 Flash Sale en Disney+',
    message: 'Disney+ Estándar con 20% de descuento por tiempo limitado.',
    icon: 'offer',
    date: new Date().toLocaleDateString('es-CO'),
    read: false,
    type: 'offer'
  },
  {
    id: '2',
    title: '📉 Bajó de precio: Prime Video',
    message: 'Prime Video Mensual ahora a $10.000 COP.',
    icon: 'price_drop',
    date: new Date().toLocaleDateString('es-CO'),
    read: false,
    type: 'price_drop'
  },
  {
    id: '3',
    title: '🎉 ¡Bienvenido a NexusPlay!',
    message: 'Explora nuestro catálogo 2026 con los mejores precios de Colombia.',
    icon: 'info',
    date: new Date().toLocaleDateString('es-CO'),
    read: false,
    type: 'info'
  }
];

interface ServiceContextType {
  services: Service[];
  updateService: (serviceId: string, field: keyof Service | 'price' | 'planName', value: any, planId?: string) => void;
  addService: (type: Category) => void;
  deleteService: (serviceId: string) => void;

  testimonials: Testimonial[];
  addTestimonial: () => void;
  updateTestimonial: (id: number, field: keyof Testimonial, value: any) => void;
  deleteTestimonial: (id: number) => void;

  isAdmin: boolean;
  toggleAdmin: () => void;
  categories: Category[];
  paymentConfig: PaymentConfig;
  updatePaymentConfig: (key: keyof PaymentConfig, value: string) => void;

  globalConfig: GlobalConfig;
  updateGlobalConfig: (key: keyof GlobalConfig, value: any) => void;

  // Cart
  cart: { service: Service; plan: ServicePlan }[];
  addToCart: (service: Service, plan: ServicePlan) => void;
  removeFromCart: (index: number) => void;
  clearCart: () => void;

  resellerMode: boolean;
  toggleResellerMode: () => void;

  clients: Client[];
  addClient: (client: Client) => void;

  theme: 'cyber' | 'light';
  toggleTheme: () => void;

  // Wishlist
  wishlist: Service[];
  toggleWishlist: (service: Service) => void;

  // Reviews
  reviews: Review[];
  addReview: (review: Review) => void;

  // Orders
  orders: Order[];
  addOrder: (order: Order) => void;

  // Notifications
  notifications: AppNotification[];
  addNotification: (notif: AppNotification) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
}

const ServiceContext = createContext<ServiceContextType | undefined>(undefined);

export const ServiceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { t } = useLanguage();
  const [services, setServices] = useState<Service[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [paymentConfig, setPaymentConfig] = useState<PaymentConfig>(INITIAL_PAYMENT_CONFIG);
  const [globalConfig, setGlobalConfig] = useState<GlobalConfig>(INITIAL_GLOBAL_CONFIG);

  // Existing States
  const [cart, setCart] = useState<{ service: Service; plan: ServicePlan }[]>([]);
  const [resellerMode, setResellerMode] = useState(false);
  const [clients, setClients] = useState<Client[]>([]);
  const [theme, setTheme] = useState<'cyber' | 'light'>('cyber');
  const [wishlist, setWishlist] = useState<Service[]>([]);

  // NEW States
  const [reviews, setReviews] = useState<Review[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [notifications, setNotifications] = useState<AppNotification[]>([]);

  useEffect(() => {
    const savedServices = localStorage.getItem('nexusplay_services_v12');
    const savedClients = localStorage.getItem('nexusplay_clients_v1');
    const savedWishlist = localStorage.getItem('nexusplay_wishlist');
    const savedConfig = localStorage.getItem('nexusplay_global_config_v3');
    const savedReviews = localStorage.getItem('nexusplay_reviews_v1');
    const savedOrders = localStorage.getItem('nexusplay_orders_v1');
    const savedNotifications = localStorage.getItem('nexusplay_notifications_v1');
    const savedPayment = localStorage.getItem('nexusplay_payment_v2');

    if (savedServices) setServices(JSON.parse(savedServices));
    else setServices(getInitialServices(t));

    if (savedClients) setClients(JSON.parse(savedClients));
    if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
    if (savedConfig) setGlobalConfig(JSON.parse(savedConfig));
    if (savedReviews) setReviews(JSON.parse(savedReviews));
    if (savedOrders) setOrders(JSON.parse(savedOrders));
    if (savedNotifications) setNotifications(JSON.parse(savedNotifications));
    else setNotifications(INITIAL_NOTIFICATIONS);
    if (savedPayment) setPaymentConfig(JSON.parse(savedPayment));

    setTestimonials(INITIAL_TESTIMONIALS);
  }, [t]);

  // Persistence effects
  useEffect(() => {
    if (services.length > 0) localStorage.setItem('nexusplay_services_v12', JSON.stringify(services));
  }, [services]);

  useEffect(() => {
    localStorage.setItem('nexusplay_clients_v1', JSON.stringify(clients));
  }, [clients]);

  useEffect(() => {
    localStorage.setItem('nexusplay_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('nexusplay_global_config_v3', JSON.stringify(globalConfig));
  }, [globalConfig]);

  useEffect(() => {
    localStorage.setItem('nexusplay_reviews_v1', JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem('nexusplay_orders_v1', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('nexusplay_notifications_v1', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('nexusplay_payment_v2', JSON.stringify(paymentConfig));
  }, [paymentConfig]);

  // Generate periodic notifications for flash offers
  useEffect(() => {
    const interval = setInterval(() => {
      const flashServices = services.filter(s => s.flashOfferEnds && s.flashOfferEnds > Date.now());
      if (flashServices.length > 0) {
        const svc = flashServices[Math.floor(Math.random() * flashServices.length)];
        const existing = notifications.find(n => n.title.includes(svc.name) && !n.read);
        if (!existing) {
          const newNotif: AppNotification = {
            id: Date.now().toString(),
            title: `⚡ Oferta flash: ${svc.name}`,
            message: `${svc.name} tiene una oferta activa. ¡No te la pierdas!`,
            icon: 'offer',
            date: new Date().toLocaleDateString('es-CO'),
            read: false,
            type: 'offer'
          };
          setNotifications(prev => [newNotif, ...prev]);
        }
      }
    }, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [services, notifications]);

  // CRUD functions
  const updateService = (serviceId: string, field: keyof Service | 'price' | 'planName', value: any, planId?: string) => {
    setServices(prev => prev.map(svc => {
      if (svc.id !== serviceId) return svc;

      if (field === 'price' && planId) {
        return { ...svc, plans: svc.plans.map(p => p.id === planId ? { ...p, price: Number(value) } : p) };
      }
      if (field === 'planName' && planId) {
        return { ...svc, plans: svc.plans.map(p => p.id === planId ? { ...p, name: value } : p) };
      }
      if (field !== 'price' && field !== 'planName') return { ...svc, [field]: value };
      return svc;
    }));
  };

  const addService = (type: Category) => {
    const newId = `new_${Date.now()}`;
    const newService: Service = {
      id: newId,
      name: type === 'combos' ? 'Nuevo Combo' : 'Nuevo Servicio',
      description: 'Descripción aquí...',
      logoUrl: 'https://cdn-icons-png.flaticon.com/512/3524/3524335.png',
      category: type,
      brandColor: type === 'combos' ? '#FFD700' : '#808080',
      bgGradient: type === 'combos' ? 'from-yellow-900 to-black' : 'from-gray-900 to-black',
      status: 'online',
      stock: 50,
      plans: [
        { id: `${newId}_p1`, name: 'Plan 1', price: 10000 },
        { id: `${newId}_p2`, name: 'Plan 2', price: 20000 }
      ]
    };
    setServices(prev => [newService, ...prev]);
  };

  const deleteService = (serviceId: string) => {
    if (window.confirm('¿Borrar servicio?')) setServices(prev => prev.filter(s => s.id !== serviceId));
  };

  const addTestimonial = () => {
    const newTestimonial: Testimonial = {
      id: Date.now(),
      name: 'Cliente',
      role: 'Usuario',
      avatar: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
      quote: 'Opinión...',
      rating: 5
    };
    setTestimonials(prev => [...prev, newTestimonial]);
  };

  const updateTestimonial = (id: number, field: keyof Testimonial, value: any) => {
    setTestimonials(prev => prev.map(t => t.id === id ? { ...t, [field]: value } : t));
  };

  const deleteTestimonial = (id: number) => {
    if (window.confirm('¿Borrar reseña?')) setTestimonials(prev => prev.filter(t => t.id !== id));
  };

  const toggleAdmin = () => setIsAdmin(!isAdmin);
  const updatePaymentConfig = (key: keyof PaymentConfig, value: string) => setPaymentConfig(prev => ({ ...prev, [key]: value }));
  const updateGlobalConfig = (key: keyof GlobalConfig, value: any) => setGlobalConfig(prev => ({ ...prev, [key]: value }));

  // Cart
  const addToCart = (service: Service, plan: ServicePlan) => setCart(prev => [...prev, { service, plan }]);
  const removeFromCart = (index: number) => setCart(prev => prev.filter((_, i) => i !== index));
  const clearCart = () => setCart([]);

  const toggleResellerMode = () => setResellerMode(!resellerMode);

  const addClient = (client: Client) => setClients(prev => [...prev, client]);

  const toggleTheme = () => {
    setTheme(prev => {
      const newTheme = prev === 'cyber' ? 'light' : 'cyber';
      document.documentElement.classList.toggle('light-theme', newTheme === 'light');
      return newTheme;
    });
  };

  const toggleWishlist = (service: Service) => {
    setWishlist(prev => {
      const exists = prev.find(s => s.id === service.id);
      if (exists) return prev.filter(s => s.id !== service.id);
      return [...prev, service];
    });
  };

  // NEW: Reviews
  const addReview = (review: Review) => {
    setReviews(prev => [review, ...prev]);
  };

  // NEW: Orders
  const addOrder = (order: Order) => {
    setOrders(prev => [order, ...prev]);
    // Add notification for new order
    const notif: AppNotification = {
      id: `order_${Date.now()}`,
      title: '✅ Pedido registrado',
      message: `Tu pedido de ${order.serviceName} (${order.planName}) fue registrado.`,
      icon: 'info',
      date: new Date().toLocaleDateString('es-CO'),
      read: false,
      type: 'info'
    };
    setNotifications(prev => [notif, ...prev]);
  };

  // NEW: Notifications
  const addNotification = (notif: AppNotification) => {
    setNotifications(prev => [notif, ...prev]);
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  return (
    <ServiceContext.Provider value={{
      services, updateService, addService, deleteService,
      testimonials, addTestimonial, updateTestimonial, deleteTestimonial,
      isAdmin, toggleAdmin, categories: ['all', 'combos', 'streaming', 'music', 'iptv'],
      paymentConfig, updatePaymentConfig,
      globalConfig, updateGlobalConfig,
      cart, addToCart, removeFromCart, clearCart,
      resellerMode, toggleResellerMode,
      clients, addClient,
      theme, toggleTheme,
      wishlist, toggleWishlist,
      reviews, addReview,
      orders, addOrder,
      notifications, addNotification, markNotificationRead, markAllNotificationsRead
    }}>
      {children}
    </ServiceContext.Provider>
  );
};

export const useServices = () => {
  const context = useContext(ServiceContext);
  if (!context) throw new Error("useServices must be used within ServiceProvider");
  return context;
};
