export const formatINR = (n) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);

// Print sizes and presentation formats (prices are add-ons to the product's base A4 price)
export const SIZES = [
  { id: 'A4', dims: '21 × 29.7 cm', add: 0, note: 'Standard wall or desk' },
  { id: 'A3', dims: '29.7 × 42 cm', add: 350, note: "Collector's choice" },
  { id: 'A2', dims: '42 × 59.4 cm', add: 850, note: 'Centerpiece scale' },
];

export const FORMATS = [
  { id: 'tube', label: 'Rolled in archival tube', add: 0, note: 'Packed in a 3mm moisture-sealed kraft cylinder. Ideal for custom framing.' },
  { id: 'teak', label: 'Handcrafted teak frame', add: 999, note: 'Sustainably sourced Bengal wood with a 2mm shatterproof acrylic face.' },
];

export const unitPrice = (product, size = 'A4', format = 'tube') =>
  product.price +
  (SIZES.find((s) => s.id === size)?.add ?? 0) +
  (FORMATS.find((f) => f.id === format)?.add ?? 0);

export const PROMO_CODES = { BENGAL10: 0.1 };
