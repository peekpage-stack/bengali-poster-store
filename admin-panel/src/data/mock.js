export const stats = [
  { label: 'Gross revenue', value: '₹8,42,950', note: '120 orders · avg ₹2,890', delta: '+18.4%' },
  { label: 'Active catalogue', value: '148', note: '12 limited runs · 4 archived' },
  { label: 'Dispatch queue', value: '24', note: '6 curing · 14 tubes · 4 air' },
  { label: 'Collectors', value: '1,840', note: '+142 this week' },
];

export const initialProducts = [
  { id: 1, title: 'Pather Panchali Legacy', slug: 'pather-panchali-legacy', collection: 'Bengali Cinema', price: 649, stock: 14, sold: 340, status: 'live', image: null },
  { id: 2, title: 'Kolkata Tram Route 36', slug: 'kolkata-tram-36', collection: 'Urban Heritage', price: 849, stock: 22, sold: 184, status: 'live', image: null },
  { id: 3, title: 'Robithakur Calligraphy No. 4', slug: 'robithakur-no-4', collection: 'Tagore Literary', price: 349, stock: 3, sold: 412, status: 'live', image: null },
  { id: 4, title: 'Charulata Minimalist Screenprint', slug: 'charulata-screenprint', collection: 'Bengali Cinema', price: 599, stock: 40, sold: 96, status: 'draft', image: null },
  { id: 5, title: 'Durga Pujo: Dhunuchi', slug: 'durga-pujo-dhunuchi', collection: 'Folk & Festival', price: 699, stock: 0, sold: 150, status: 'archived', image: null },
];

export const initialOrders = [
  { id: 'BC-2025-0841', customer: 'Sreemoyee Roy', city: 'Bengaluru', items: 3, total: 1797, status: 'processing', placed: '24 Oct' },
  { id: 'BC-2025-0840', customer: 'Aniket Das', city: 'Mumbai', items: 1, total: 849, status: 'packed', placed: '24 Oct' },
  { id: 'BC-2025-0839', customer: 'Priyanka Ghosh', city: 'Kolkata', items: 2, total: 1248, status: 'shipped', placed: '23 Oct' },
  { id: 'BC-2025-0838', customer: 'Tanmoy Sen', city: 'Delhi', items: 1, total: 599, status: 'delivered', placed: '21 Oct' },
  { id: 'BC-2025-0837', customer: 'Ishita Paul', city: 'Pune', items: 4, total: 2596, status: 'processing', placed: '21 Oct' },
];

export const ORDER_STATUSES = ['processing', 'packed', 'shipped', 'delivered'];
