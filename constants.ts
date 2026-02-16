import { Service, Testimonial } from './types';

export const getStreamingServices = (t: (key: string) => string): Service[] => [
  {
    id: 'netflix',
    name: 'Netflix',
    description: t('serviceDescs.netflix'),
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/75/Netflix_icon.svg',
    category: 'streaming',
    status: 'online',
    brandColor: '#E50914',
    bgGradient: 'from-red-900 to-black',
    plans: [
      { id: 'netflix-basic', name: t('plans.basic'), price: 16000 },
      { id: 'netflix-premium', name: t('plans.premium'), price: 25000 }
    ]
  },
  {
    id: 'disney',
    name: 'Disney+',
    description: t('serviceDescs.disney'),
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/3e/Disney%2B_logo.svg',
    category: 'streaming',
    status: 'online',
    brandColor: '#113CCF',
    bgGradient: 'from-blue-900 to-black',
    plans: [
      { id: 'disney-basic', name: t('plans.basic'), price: 12000 },
      { id: 'disney-trio', name: t('plans.trio'), price: 22000 }
    ]
  },
  {
    id: 'hulu',
    name: 'Hulu',
    description: t('serviceDescs.hulu'),
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e4/Hulu_Logo.svg',
    category: 'streaming',
    status: 'online',
    brandColor: '#1CE783',
    bgGradient: 'from-green-900 to-black',
    plans: [
      { id: 'hulu-ad', name: t('plans.adSupported'), price: 10000 },
      { id: 'hulu-noads', name: t('plans.noAds'), price: 18000 }
    ]
  },
  {
    id: 'prime',
    name: 'Prime Video',
    description: t('serviceDescs.prime'),
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/11/Amazon_Prime_Video_logo.svg',
    category: 'streaming',
    status: 'online',
    brandColor: '#00A8E1',
    bgGradient: 'from-sky-900 to-black',
    plans: [
      { id: 'prime-monthly', name: t('plans.monthly'), price: 12000 },
      { id: 'prime-annual', name: t('plans.annual'), price: 120000 }
    ]
  },
  {
    id: 'hbo',
    name: 'HBO Max',
    description: t('serviceDescs.hbo'),
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/ce/Max_logo.svg', 
    category: 'streaming',
    status: 'online',
    brandColor: '#9900FF',
    bgGradient: 'from-purple-900 to-black',
    plans: [
      { id: 'hbo-lite', name: t('plans.adLite'), price: 15000 },
      { id: 'hbo-free', name: t('plans.adFree'), price: 20000 }
    ]
  },
  {
    id: 'apple',
    name: 'Apple TV+',
    description: t('serviceDescs.apple'),
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/28/Apple_TV_Plus_Logo.svg',
    category: 'streaming',
    status: 'online',
    brandColor: '#A3AAAE',
    bgGradient: 'from-gray-800 to-black',
    plans: [
      { id: 'apple-monthly', name: t('plans.monthly'), price: 15000 },
      { id: 'apple-annual', name: t('plans.annual'), price: 150000 }
    ]
  }
];

export const getMusicServices = (t: (key: string) => string): Service[] => [
  {
    id: 'spotify',
    name: 'Spotify',
    description: t('serviceDescs.spotify'),
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg',
    category: 'music',
    status: 'online',
    brandColor: '#1DB954',
    bgGradient: 'from-green-900 to-black',
    plans: [
      { id: 'spotify-ind', name: t('plans.individual'), price: 16000 },
      { id: 'spotify-duo', name: t('plans.duo'), price: 20000 }
    ]
  },
  {
    id: 'applemusic',
    name: 'Apple Music',
    description: t('serviceDescs.applemusic'),
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/5f/Apple_Music_icon.svg',
    category: 'music',
    status: 'online',
    brandColor: '#FC3C44',
    bgGradient: 'from-pink-900 to-black',
    plans: [
      { id: 'applemusic-ind', name: t('plans.individual'), price: 16000 },
      { id: 'applemusic-fam', name: t('plans.family'), price: 25000 }
    ]
  },
  {
    id: 'youtube',
    name: 'YouTube Music',
    description: t('serviceDescs.youtube'),
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/6a/Youtube_Music_icon.svg',
    category: 'music',
    status: 'online',
    brandColor: '#FF0000',
    bgGradient: 'from-red-900 to-black',
    plans: [
      { id: 'youtube-prem', name: t('plans.premium'), price: 18000 },
      { id: 'youtube-fam', name: t('plans.family'), price: 27000 }
    ]
  },
  {
    id: 'soundcloud',
    name: 'SoundCloud',
    description: t('serviceDescs.soundcloud'),
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a2/Soundcloud_logo.svg',
    category: 'music',
    status: 'online',
    brandColor: '#FF5500',
    bgGradient: 'from-orange-900 to-black',
    plans: [
      { id: 'sc-go', name: t('plans.goPlus'), price: 15000 },
      { id: 'sc-dj', name: t('plans.dj'), price: 30000 }
    ]
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: 'Sarah Jenkins',
    role: 'Freelance Designer',
    avatar: 'https://picsum.photos/100/100?random=1',
    quote: 'StreamHub is a lifesaver! I manage all my subscriptions in one place and save about $20 a month.',
    rating: 5
  },
  {
    id: 2,
    name: 'Mike Ross',
    role: 'Software Engineer',
    avatar: 'https://picsum.photos/100/100?random=2',
    quote: 'Instant activation and the customer support is top notch. Highly recommended for binge watchers.',
    rating: 5
  },
  {
    id: 3,
    name: 'Emily Blunt',
    role: 'Marketing Specialist',
    avatar: 'https://picsum.photos/100/100?random=3',
    quote: 'The interface is so sleek and easy to use. I love the dark mode aesthetics!',
    rating: 4
  }
];
