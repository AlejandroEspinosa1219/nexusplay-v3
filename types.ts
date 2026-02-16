
export type Language = 'en' | 'es' | 'fr' | 'de' | 'pt' | 'zh' | 'ja' | 'ru';
export type Category = 'all' | 'streaming' | 'music' | 'combos' | 'iptv';

export interface ServicePlan {
  id: string;
  name: string;
  price: number;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  logoUrl: string;
  category: Category;
  brandColor: string;
  bgGradient: string;
  plans: ServicePlan[];
  status: 'online' | 'maintenance';
  // New Features
  stock?: number; // Feature 2: Stock Real
  flashOfferEnds?: number; // Feature 3: Flash Timer (timestamp)
  wholesalePrice?: number; // Feature 16: Precio Revendedor
  popularContent?: string[]; // Feature 7: Preview Content (images)
}

export interface GlobalConfig {
  promoText: string;
  promoCode: string;
  promoDetail: string; // New: Suffix text control
  showBanner: boolean;
  maintenanceMode: boolean;
}

export interface PaymentConfig {
  whatsappNumber: string;
  qrImageUrl: string;
  nequiNumber: string;
  daviplataNumber: string;
  bankName: string;
  bankAccountType: string;
  bankAccountNumber: string;
  bankAccountHolder: string;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  avatar: string;
  quote: string;
  rating: number;
}

// Feature 19: CRM Client
export interface Client {
  id: string;
  name: string;
  service: string;
  phone: string;
  purchaseDate: string;
  expiryDate: string;
  active: boolean;
}

// User Auth
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  avatar?: string;
  referralCode?: string;
  referralBalance?: number;
  referralCount?: number;
}

// Reviews
export interface Review {
  id: string;
  userId: string;
  userName: string;
  serviceId: string;
  rating: number;
  comment: string;
  date: string;
}

// Orders
export interface Order {
  id: string;
  userId: string;
  userName: string;
  serviceName: string;
  serviceLogoUrl: string;
  planName: string;
  price: number;
  date: string;
  status: 'pending' | 'active' | 'expired';
  paymentMethod: string;
  referralCode?: string;
}

// Notifications
export interface AppNotification {
  id: string;
  title: string;
  message: string;
  icon: string;
  date: string;
  read: boolean;
  type: 'offer' | 'price_drop' | 'info' | 'referral';
}
