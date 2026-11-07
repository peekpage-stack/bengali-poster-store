// Mock catalogue. Replace with Django API responses later.
// `image` can hold a real poster URL; until then PosterArt draws a printed-paper placeholder from `tone`.

export const collections = [
  { slug: 'cinema', name: 'Bengali Cinema Canon', bn: 'বাংলা সিনেমা', blurb: 'Restored publicity art from the golden age of Ray, Ghatak and Sen.', tone: ['#2b2420', '#6e4a36'] },
  { slug: 'heritage', name: 'Kolkata Heritage', bn: 'কলকাতার ঐতিহ্য', blurb: 'Trams, doorways and yellow taxis from the city that never rushes.', tone: ['#b9803f', '#e7c28a'] },
  { slug: 'literature', name: 'Tagore & Literature', bn: 'সাহিত্য', blurb: 'Manuscript leaves, calligraphy and verses set in fine letterpress.', tone: ['#5b6b5c', '#c9c1a6'] },
  { slug: 'folk', name: 'Folk & Festival', bn: 'লোকশিল্প', blurb: 'Pujo, Baul songs and Kumortuli clay — colour straight from the street.', tone: ['#a8321f', '#e08850'] },
  { slug: 'adda', name: 'Coffee House Adda', bn: 'আড্ডা', blurb: 'Marble tables, steaming cups and endless conversation on College Street.', tone: ['#3f3a33', '#a8886a'] },
];

const base = (o) => ({ rating: 4.8, reviews: 120, edition: 'Edition of 150', left: 40, image: null, ...o });

export const products = [
  base({ id: 1, slug: 'pather-panchali-legacy-folio', title: 'Pather Panchali Legacy Folio', bn: 'পথের পাঁচালী', collection: 'cinema', medium: '300 GSM cotton rag', price: 649, originalPrice: 1299, tone: ['#2b2420', '#9a7a5c'], left: 14, reviews: 324, rating: 4.9, description: "A restored publicity lithograph from Ray's debut, printed on cold-pressed cotton rag with deep, glare-free blacks." }),
  base({ id: 2, slug: 'kolkata-tram-route-36', title: 'Kolkata Tram Route 36', bn: 'ট্রাম ৩৬', collection: 'heritage', medium: 'Teak frame optional', price: 849, originalPrice: 1499, tone: ['#c2652a', '#f0d2a8'], left: 22 }),
  base({ id: 3, slug: 'robithakur-calligraphy-no-4', title: 'Robithakur Calligraphy No. 4', bn: 'রবিঠাকুর', collection: 'literature', medium: 'Raw-edge cotton rag', price: 349, originalPrice: 599, tone: ['#e9dcc3', '#b9a27a'], left: 3 }),
  base({ id: 4, slug: 'charulata-minimalist-screenprint', title: 'Charulata Minimalist Screenprint', bn: 'চারুলতা', collection: 'cinema', medium: '12-colour archival giclée', price: 599, originalPrice: 899, tone: ['#8c3c3c', '#e8c9b8'] }),
  base({ id: 5, slug: 'feluda-ghats-of-kashi', title: 'Feluda: Ghats of Kashi', bn: 'ফেলুদা', collection: 'cinema', medium: 'Heavyweight art folio', price: 799, originalPrice: 1199, tone: ['#1f2a3a', '#d9a05b'] }),
  base({ id: 6, slug: 'victoria-dawn-maidan-reverie', title: 'Victoria Dawn: Maidan Reverie', bn: 'ভিক্টোরিয়া', collection: 'heritage', medium: 'Textured rag paper', price: 499, originalPrice: 799, tone: ['#9fb3c8', '#f3e1c8'] }),
  base({ id: 7, slug: 'ghare-baire-the-home-the-world', title: 'Ghare Baire: The Home & the World', bn: 'ঘরে বাইরে', collection: 'literature', medium: 'Archival velvet finish', price: 749, originalPrice: 1099, tone: ['#6e3030', '#d9b48a'] }),
  base({ id: 8, slug: 'north-kolkata-doorway-no-12', title: 'North Kolkata Doorway No. 12', bn: 'উত্তর কলকাতা', collection: 'heritage', medium: '300 GSM matte', price: 549, originalPrice: 899, tone: ['#4f5f4a', '#d8c08c'] }),
  base({ id: 9, slug: 'durga-pujo-dhunuchi', title: 'Durga Pujo: Dhunuchi', bn: 'দুর্গাপূজা', collection: 'folk', medium: 'Pigment giclée', price: 699, originalPrice: 999, tone: ['#a8321f', '#f0b45c'], left: 9 }),
  base({ id: 10, slug: 'howrah-bridge-dusk', title: 'Howrah Bridge at Dusk', bn: 'হাওড়া ব্রিজ', collection: 'heritage', medium: '300 GSM matte', price: 599, originalPrice: 899, tone: ['#2d3b55', '#e9a066'] }),
  base({ id: 11, slug: 'baul-ektara-folk-art', title: 'Baul & Ektara Folk Art', bn: 'বাউল', collection: 'folk', medium: 'Raw-edge cotton rag', price: 449, originalPrice: 699, tone: ['#c47a2a', '#f2d9a0'] }),
  base({ id: 12, slug: 'coffee-house-adda', title: 'The Coffee House Adda', bn: 'কফি হাউস', collection: 'adda', medium: 'Heavyweight art folio', price: 549, originalPrice: 849, tone: ['#3f3a33', '#b79a78'], reviews: 210 }),
];

export const faqs = [
  { q: 'What paper and printing do you use?', a: 'Every poster is printed with UltraChrome archival pigment inks on 300 GSM, 100% cotton rag paper with no optical brighteners. Expect rich, glare-free blacks and colour that holds for 100+ years in indirect light.' },
  { q: 'How are posters packed and shipped?', a: 'Unframed prints travel flat-rolled in a reinforced 3mm kraft tube with air-sealed caps. Framed prints ship in a protective crate. Orders dispatch within 24–48 hours from our Calcutta studio.' },
  { q: 'How long does delivery take?', a: 'Standard insured courier delivers in 3–4 business days across India. Air express is available at checkout for 1–2 day delivery to metro cities. You get SMS and WhatsApp tracking updates.' },
  { q: 'Can I return or exchange a poster?', a: 'Yes. If a print arrives damaged we replace it free with expedited re-dispatch. Unframed prints can be returned within 7 days if unused and in the original tube.' },
  { q: 'Do you offer custom sizes or framing advice?', a: 'We can print most designs at custom sizes and advise on framing. Message our studio on WhatsApp with your wall dimensions and we will suggest a layout.' },
  { q: 'Do you ship outside India?', a: 'Not yet. International shipping is planned; join the newsletter to hear when it opens.' },
];

export const testimonials = [
  { name: 'Sreemoyee R.', place: 'Bengaluru', text: 'The Pather Panchali print looks like it came out of a museum archive. The paper feel alone is worth it.' },
  { name: 'Aniket D.', place: 'Mumbai', text: 'Arrived in three days, perfectly rolled. We framed the tram print in our hallway and every guest asks about it.' },
  { name: 'Priyanka G.', place: 'Kolkata', text: 'It felt like bringing a piece of College Street home. The colours are exactly as rich as the photos.' },
];

export const demoOrder = {
  id: 'BC-2025-0841',
  placed: '24 Oct 2025',
  eta: '29 Oct 2025',
  courier: 'Bluedart',
  awb: 'BD 7742 1096 55',
  steps: [
    { label: 'Order confirmed', detail: 'Payment received and archival edition reserved.', done: true },
    { label: 'Printing & curing', detail: 'Pigment ink is curing on cotton rag for 24 hours.', done: true },
    { label: 'Packed in armored tube', detail: 'Quality checked and sealed with humidity capsule.', done: true },
    { label: 'In transit', detail: 'Handed to Bluedart at Calcutta atelier.', done: false, current: true },
    { label: 'Out for delivery', detail: 'Expected 29 Oct 2025.', done: false },
  ],
};
