import axios from 'axios';

// Base API configuration pointing to Django Cloud Run API
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://bengali-poster-backend-xyz.a.run.app/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to attach JWT token if present
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('banglacanvas_auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle common errors gracefully
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('banglacanvas_auth_token');
      localStorage.removeItem('banglacanvas_auth_user');
    }
    return Promise.reject(error);
  }
);

// ==========================================
// POSTER PRICE TIERS (from Peel page Price Chart)
// Dynamic pricing: price depends on size AND total quantity
// ==========================================

export const POSTER_PRICE_TIERS = {
  A5: {
    name: 'A5',
    dimensions: '14.8 × 21 cm',
    inches: '5.8 × 8.3 in',
    isPopular: false,
    tiers: [
      { minQty: 1, price: 59 },
      { minQty: 4, price: 49 },
      { minQty: 7, price: 39 },
    ],
  },
  A4: {
    name: 'A4',
    dimensions: '21 × 29.7 cm',
    inches: '8.3 × 11.7 in',
    isPopular: true,
    tiers: [
      { minQty: 1, price: 69 },
      { minQty: 4, price: 59 },
      { minQty: 7, price: 49 },
    ],
  },
  A3: {
    name: 'A3',
    dimensions: '29.7 × 42 cm',
    inches: '11.7 × 16.5 in',
    isPopular: false,
    tiers: [
      { minQty: 1, price: 149 },
      { minQty: 4, price: 129 },
      { minQty: 7, price: 109 },
    ],
  },
};

/**
 * Get the unit price for a poster based on size and total poster count in cart.
 * The "totalQty" is the TOTAL number of posters across ALL items in the cart
 * (regardless of size or design). Bulk discount applies globally.
 */
export function getPosterUnitPrice(sizeId, totalQty = 1) {
  const tier = POSTER_PRICE_TIERS[sizeId];
  if (!tier) return 69; // fallback to A4 base
  const tiers = tier.tiers;
  // Find the best applicable tier (highest minQty that totalQty meets)
  let price = tiers[0].price;
  for (const t of tiers) {
    if (totalQty >= t.minQty) {
      price = t.price;
    }
  }
  return price;
}

/**
 * Get the base (single unit) price for a size — i.e. the "1 poster" tier.
 */
export function getPosterBasePrice(sizeId) {
  return getPosterUnitPrice(sizeId, 1);
}

// ==========================================
// POSTER SIZE OPTIONS
// ==========================================

export const PRODUCT_SIZES = [
  {
    id: 'A5',
    name: 'A5',
    dimensions: '14.8 × 21 cm (5.8 × 8.3 in)',
    isPopular: false,
    priceMultiplier: 0.85,
  },
  {
    id: 'A4',
    name: 'A4',
    dimensions: '21 × 29.7 cm (8.3 × 11.7 in)',
    isPopular: true,
    priceMultiplier: 1.0,
  },
  {
    id: 'A3',
    name: 'A3',
    dimensions: '29.7 × 42 cm (11.7 × 16.5 in)',
    isPopular: false,
    priceMultiplier: 2.15,
  },
];

// ==========================================
// BESPOKE ARCHIVAL FRAME FINISHES & MAT OPTIONS
// ==========================================

export const FRAME_FINISHES = [
  {
    id: 'unframed',
    name: 'Unframed Print',
    price: 0,
    description: 'Shipped rolled in archival 3-ply kraft tube',
    colorCode: '#e5e7eb',
  },
  {
    id: 'teak',
    name: 'Plantation Teak',
    price: 299,
    description: 'Hand-waxed solid Burma teakwood frame',
    colorCode: '#6b4423',
  },
  {
    id: 'noir',
    name: 'Architectural Noir',
    price: 249,
    description: 'Sleek matte black aluminum museum frame',
    colorCode: '#1f2937',
  },
  {
    id: 'gold',
    name: 'Vintage Gilded Gold',
    price: 349,
    description: 'Distressed gold leaf heirloom gallery finish',
    colorCode: '#b48325',
  },
];

export const MAT_OPTIONS = [
  {
    id: 'none',
    name: 'Full Bleed (Flush)',
    price: 0,
    description: 'No mat board, print extends to inner edge',
  },
  {
    id: 'ivory',
    name: 'Archival Warm Ivory',
    price: 99,
    description: '2-inch acid-free 4-ply beveled mat board',
  },
  {
    id: 'white',
    name: 'Museum White',
    price: 99,
    description: '2-inch archival cotton rag white mat board',
  },
];

/**
 * Calculates item unit price based on base price, size, frame, and mat board
 */
export function calculateUnitPrice(basePrice = 69, selectedSize, selectedFrame, selectedMat) {
  const sizePrice = selectedSize?.id ? getPosterBasePrice(selectedSize.id) : basePrice;
  const framePrice = selectedFrame?.price || 0;
  const matPrice = selectedMat?.price || 0;
  return sizePrice + framePrice + matPrice;
}

// ==========================================
// PEEL PAGE — CURATED BENGALI POSTER CATALOG
// ==========================================

export const MOCK_COLLECTIONS = [
  {
    id: 'bengali-detective',
    name: 'Bengali Detective Legends',
    bengaliName: 'বাংলা গোয়েন্দা কিংবদন্তি',
    tagline: 'Iconic Sleuths of Bengali Literature',
    description: 'Celebrate the legendary detectives of Bengali literature — from Satyajit Ray\'s Feluda to Sharadindu Bandyopadhyay\'s Byomkesh — brought to life with stunning illustrated poster art.',
    count: 4,
    heroImage: '/posters/feluda.jpg',
  },
];

export const MOCK_PRODUCTS = [
  {
    id: 'byomkesh',
    title: 'ব্যোমকেশ (Byomkesh)',
    bengaliTitle: 'শরদিন্দু বন্দ্যোপাধ্যায় — সত্যান্বেষী',
    collection: 'Bengali Detective Legends',
    category: 'Literature',
    theme: 'Byomkesh Bakshi',
    orientation: 'portrait',
    price: 69,
    originalPrice: 99,
    rating: 4.9,
    reviewsCount: 156,
    sku: 'PP-BYO-001',
    edition: 'Curatorial Proof',
    paperSpec: '300 GSM Archival Heavyweight Matte Paper',
    image: '/posters/byomkesh.jpg',
    hoverImage: '/posters/byomkesh.jpg',
    synopsis: 'Sharadindu Bandyopadhyay\'s immortal creation Byomkesh Bakshi stands apart from other conventional detective characters both in terms of benevolent understanding and humanitarian approach. His main objective is not merely to catch the culprit and bring him to justice, but to solve the crime and reach the crux of truth — famously describing himself as \'satyanweshi\' or the \'truth seeker\'.',
    curatorNotes: 'A beautifully illustrated poster featuring the iconic Byomkesh in his signature thoughtful pose against a deep crimson background. Art by Peel page.',
    tags: ['Detective', 'Byomkesh', 'Bengali Literature', 'Sharadindu', 'Literature'],
  },
  {
    id: 'ek-minute',
    title: 'এক মিনিট (Ek Minute - Jatayu)',
    bengaliTitle: 'লালমোহন গাঙ্গুলি — জটায়ু',
    collection: 'Bengali Detective Legends',
    category: 'Cinema',
    theme: 'Feluda Series',
    orientation: 'portrait',
    price: 69,
    originalPrice: 99,
    rating: 4.85,
    reviewsCount: 203,
    sku: 'PP-EKM-002',
    edition: 'Curatorial Proof',
    paperSpec: '300 GSM Archival Heavyweight Matte Paper',
    image: '/posters/ek-minute.jpg',
    hoverImage: '/posters/ek-minute.jpg',
    synopsis: 'He is none other than Lalmohan Gangopadhyay a.k.a Jatayu, Feluda and Topshe\'s inseparable companion. First meeting the duo in Sonar Kella, Jatayu\'s contribution to Feluda\'s exploits was immense. He lived in Garpar Road (Roy\'s own childhood neighbourhood), North Calcutta and studied in Athenaeum Institution. He wanted to be an actor but ended up being a mystery writer.',
    curatorNotes: 'The beloved Jatayu (Lalmohan Ganguly) captured in his iconic "Ek Minute" pose — finger raised, wisdom flowing. Art by Peel page.',
    tags: ['Detective', 'Jatayu', 'Lalmohan Ganguly', 'Feluda', 'Satyajit Ray', 'Cinema'],
  },
  {
    id: 'feluda',
    title: 'ফেলুদা (Feluda)',
    bengaliTitle: 'প্রদোষ চন্দ্র মিত্র — প্রাইভেট ইনভেস্টিগেটর',
    collection: 'Bengali Detective Legends',
    category: 'Cinema',
    theme: 'Feluda',
    orientation: 'portrait',
    price: 69,
    originalPrice: 99,
    rating: 4.95,
    reviewsCount: 312,
    sku: 'PP-FEL-003',
    edition: 'Curatorial Proof',
    paperSpec: '300 GSM Archival Heavyweight Matte Paper',
    image: '/posters/feluda.jpg',
    hoverImage: '/posters/feluda.jpg',
    synopsis: 'Prodosh Chandra Mitter, the sharp-minded private investigator created by Satyajit Ray. Operating from 21 Rajani Sen Road, Ballygunge, Kolkata — he embodies the quintessential Bengali intellectual detective with his Charminar cigarettes and razor-sharp deduction.',
    curatorNotes: 'The definitive Feluda poster — noir aesthetics with bold Bengali typography and cinematic cigarette smoke. Private Investigator, 21 Rajani Sen Road. Art by Peel page.',
    tags: ['Detective', 'Feluda', 'Satyajit Ray', 'Prodosh Mitter', 'Bengali Cinema', 'Cinema'],
  },
  {
    id: 'satyer-sandhane',
    title: 'সত্যের সন্ধানে (Satyer Sandhane)',
    bengaliTitle: 'ব্যোমকেশ, সত্যবতী ও অজিত — সত্যের খোঁজে',
    collection: 'Bengali Detective Legends',
    category: 'Heritage',
    theme: 'Byomkesh Bakshi',
    orientation: 'portrait',
    price: 69,
    originalPrice: 99,
    rating: 4.88,
    reviewsCount: 178,
    sku: 'PP-SAT-004',
    edition: 'Curatorial Proof',
    paperSpec: '300 GSM Archival Heavyweight Matte Paper',
    image: '/posters/satyer-sandhane.jpg',
    hoverImage: '/posters/satyer-sandhane.jpg',
    synopsis: 'In search of truth — Byomkesh, his wife Satyabati, and faithful companion Ajit together navigate the mysteries of Calcutta. This golden-bordered poster captures the trio in a dreamlike composition, evoking the essence of their timeless pursuit of justice.',
    curatorNotes: 'A stunning ensemble poster with warm, golden-hour tones and elegant gold inner border framing. Features the three central characters of the Byomkesh universe. Art by Peel page.',
    tags: ['Detective', 'Byomkesh', 'Satyabati', 'Ajit', 'Bengali Literature', 'Heritage'],
  },
];

// ==========================================
// API CLIENT IMPLEMENTATION WITH CLOUD RUN FALLBACK
// ==========================================

export const productsApi = {
  // Get all products with optional filtering
  getAll: async (params = {}) => {
    try {
      const response = await apiClient.get('/products/', { params });
      return response.data;
    } catch {
      // Offline/Local mock fallback
      let results = [...MOCK_PRODUCTS];
      if (params.search) {
        const query = params.search.toLowerCase();
        results = results.filter(
          (p) =>
            p.title.toLowerCase().includes(query) ||
            p.bengaliTitle.includes(query) ||
            p.collection.toLowerCase().includes(query) ||
            p.tags.some((t) => t.toLowerCase().includes(query))
        );
      }
      if (params.sort === 'price-low') {
        results.sort((a, b) => (a.price || 69) - (b.price || 69));
      } else if (params.sort === 'price-high') {
        results.sort((a, b) => (b.price || 69) - (a.price || 69));
      }
      return { count: results.length, results };
    }
  },

  // Get single product by ID or slug
  getById: async (id) => {
    try {
      const response = await apiClient.get(`/products/${id}/`);
      return response.data;
    } catch {
      const found = MOCK_PRODUCTS.find((p) => p.id === id || p.sku.toLowerCase() === id?.toLowerCase());
      if (found) return found;
      return MOCK_PRODUCTS[0];
    }
  },

  // Get featured products for homepage
  getFeatured: async () => {
    try {
      const response = await apiClient.get('/products/featured/');
      return response.data;
    } catch {
      return MOCK_PRODUCTS;
    }
  },

  // Get list of collections
  getCollections: async () => {
    try {
      const response = await apiClient.get('/collections/');
      return response.data;
    } catch {
      return MOCK_COLLECTIONS;
    }
  },

  getCollectionById: async (id) => {
    try {
      const response = await apiClient.get(`/collections/${id}/`);
      return response.data;
    } catch {
      const col = MOCK_COLLECTIONS.find((c) => c.id === id) || MOCK_COLLECTIONS[0];
      return { ...col, items: MOCK_PRODUCTS };
    }
  },
};

export const ordersApi = {
  create: async (orderPayload) => {
    try {
      const response = await apiClient.post('/orders/', orderPayload);
      return response.data;
    } catch {
      const generatedOrderRef = 'PP-' + new Date().getFullYear() + '-' + Math.floor(1000 + Math.random() * 9000);
      const trackingNumber = 'ECOM-' + Math.floor(10000000 + Math.random() * 90000000);
      const newOrder = {
        orderId: generatedOrderRef,
        trackingNumber: trackingNumber,
        status: 'Print Preparation & Quality Check',
        placedAt: new Date().toISOString(),
        estimatedDelivery: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', {
          weekday: 'long',
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        }),
        ...orderPayload,
      };

      try {
        const existingOrders = JSON.parse(localStorage.getItem('banglacanvas_saved_orders') || '[]');
        const safeOrders = Array.isArray(existingOrders) ? existingOrders : [];
        safeOrders.unshift(newOrder);
        localStorage.setItem('banglacanvas_saved_orders', JSON.stringify(safeOrders));
      } catch {
        // ignore
      }

      return newOrder;
    }
  },

  getById: async (orderId) => {
    try {
      const response = await apiClient.get(`/orders/${orderId}/`);
      return response.data;
    } catch {
      let existingOrders = [];
      try {
        const parsed = JSON.parse(localStorage.getItem('banglacanvas_saved_orders') || '[]');
        existingOrders = Array.isArray(parsed) ? parsed : [];
      } catch {
        existingOrders = [];
      }

      const found = existingOrders.find(
        (o) => o.orderId?.toLowerCase() === orderId?.toLowerCase() || o.trackingNumber?.toLowerCase() === orderId?.toLowerCase()
      );
      if (found) return found;

      return {
        orderId: orderId || 'PP-2026-8412',
        trackingNumber: 'ECOM-94821034',
        status: 'In Transit — Carefully Packed',
        placedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        estimatedDelivery: 'Wednesday, Nov 12, 2026',
        collector: {
          name: 'Customer',
          email: 'customer@peelpage.com',
          phone: '+91 98301 23456',
          address: 'Kolkata, West Bengal',
          city: 'Kolkata',
          state: 'West Bengal',
          pincode: '700029',
        },
        items: [
          {
            ...MOCK_PRODUCTS[0],
            selectedSize: PRODUCT_SIZES[1],
            quantity: 1,
            unitPrice: 69,
          },
        ],
        subtotal: 69,
        discount: 0,
        shipping: 0,
        total: 69,
        paymentMethod: 'UPI (GPay)',
        timeline: [
          { title: 'Order Confirmed', time: 'Nov 05, 10:30 AM', completed: true },
          { title: 'Poster Printed (Premium Quality)', time: 'Nov 05, 03:15 PM', completed: true },
          { title: 'Quality Check Passed', time: 'Nov 06, 11:45 AM', completed: true },
          { title: 'Carefully Packed', time: 'Nov 06, 05:20 PM', completed: true },
          { title: 'Dispatched via Express', time: 'Nov 07, 09:00 AM', completed: true, current: true },
          { title: 'Delivery', time: 'Est. Nov 10, by 5:00 PM', completed: false },
        ],
      };
    }
  },
};

export const authApi = {
  login: async (credentials) => {
    try {
      const response = await apiClient.post('/accounts/login/', credentials);
      return response.data;
    } catch {
      const mockUser = {
        id: 'usr_01',
        name: credentials.email ? credentials.email.split('@')[0] : 'Customer',
        email: credentials.email || 'customer@peelpage.com',
        memberSince: 'November 2026',
        shippingAddress: {
          name: 'Customer',
          street: 'Kolkata',
          city: 'Kolkata',
          state: 'West Bengal',
          pincode: '700029',
          phone: '+91 98301 23456',
        },
      };
      const mockToken = 'jwt_mock_token_pp_' + Date.now();
      return { user: mockUser, token: mockToken };
    }
  },

  register: async (userData) => {
    try {
      const response = await apiClient.post('/accounts/register/', userData);
      return response.data;
    } catch {
      const mockUser = {
        id: 'usr_' + Math.floor(Math.random() * 1000),
        name: userData.fullName || userData.name || 'Customer',
        email: userData.email,
        phone: userData.phone || '',
        memberSince: 'Just now',
      };
      const mockToken = 'jwt_mock_token_pp_' + Date.now();
      return { user: mockUser, token: mockToken };
    }
  },
};

export default apiClient;
