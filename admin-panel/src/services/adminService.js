// Swap each body for an `api.*` call once Django is running.
import { initialOrders, initialProducts, stats } from '../data/mock';

const wait = (v) => new Promise((r) => setTimeout(() => r(structuredClone(v)), 100));

export const getStats = () => wait(stats);
export const getProducts = () => wait(initialProducts);
export const getOrders = () => wait(initialOrders);
export const saveProduct = (p) => wait(p);          // api.post('/products/', formData)
export const deleteProduct = (id) => wait({ id });  // api.delete(`/products/${id}/`)
export const updateOrderStatus = (id, status) => wait({ id, status }); // api.patch(`/orders/${id}/`, { status })
