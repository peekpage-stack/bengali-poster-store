// Every function returns a Promise so the pages need no changes when the Django API goes live.
// To switch: replace each body with e.g. `api.get('/products/', { params }).then((r) => r.data)`.
import { products, collections, faqs, testimonials, demoOrder } from '../data/catalog';

const resolve = (value) => new Promise((r) => setTimeout(() => r(value), 120));

export const getProducts = ({ collection, q, sort, limit } = {}) => {
  let list = [...products];
  if (collection) list = list.filter((p) => p.collection === collection);
  if (q) {
    const t = q.toLowerCase();
    list = list.filter((p) => `${p.title} ${p.bn} ${p.collection}`.toLowerCase().includes(t));
  }
  if (sort === 'price-asc') list.sort((a, b) => a.price - b.price);
  if (sort === 'price-desc') list.sort((a, b) => b.price - a.price);
  if (sort === 'rating') list.sort((a, b) => b.rating - a.rating);
  return resolve(limit ? list.slice(0, limit) : list);
};

export const getProduct = (slug) => resolve(products.find((p) => p.slug === slug) || null);
export const getRelated = (slug, n = 4) => {
  const current = products.find((x) => x.slug === slug);
  const others = products.filter((x) => x.slug !== slug);
  const same = others.filter((x) => x.collection === current?.collection);
  return resolve([...same, ...others.filter((x) => !same.includes(x))].slice(0, n));
};
export const getCollections = () => resolve(collections);
export const getCollection = (slug) => resolve(collections.find((c) => c.slug === slug) || null);
export const getFaqs = () => resolve(faqs);
export const getTestimonials = () => resolve(testimonials);
export const trackOrder = (id) => resolve(id?.trim().toUpperCase() === demoOrder.id ? demoOrder : null);
export const placeOrder = (payload) => resolve({ id: demoOrder.id, ...payload });
export const subscribe = (email) => resolve({ ok: true, email });
export const sendMessage = (payload) => resolve({ ok: true, ...payload });
