import React, { createContext, useContext, useState, useEffect } from 'react';
import { getPosterUnitPrice, getPosterBasePrice } from '../services/api';

const CartContext = createContext(null);

const STORAGE_KEY = 'banglacanvas_cart';
const COUPON_KEY = 'banglacanvas_coupon';

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) return [];
      const parsed = JSON.parse(saved);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [coupon, setCoupon] = useState(() => {
    try {
      return localStorage.getItem(COUPON_KEY) || '';
    } catch {
      return '';
    }
  });
  const [couponDiscountPercent, setCouponDiscountPercent] = useState(0);
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // storage unavailable
    }
  }, [items]);

  useEffect(() => {
    try {
      if (coupon) {
        localStorage.setItem(COUPON_KEY, coupon);
      } else {
        localStorage.removeItem(COUPON_KEY);
      }
    } catch {
      // ignore
    }
  }, [coupon]);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const toggleCart = () => setIsCartOpen((prev) => !prev);

  // Calculate total poster count across ALL cart items (for bulk tier discount)
  const getTotalPosterCount = (cartItems = []) => {
    if (!Array.isArray(cartItems)) return 0;
    return cartItems.reduce((sum, item) => sum + (Number(item?.quantity) || 0), 0);
  };

  // Recalculate dynamic unit prices for all items based on total cart quantity
  const getItemsWithDynamicPricing = () => {
    if (!Array.isArray(items)) return [];
    const totalQty = getTotalPosterCount(items);
    return items.map((item) => {
      const sizeId = item.selectedSize?.id || 'A4';
      const framePrice = item.selectedFrame?.price || 0;
      const matPrice = item.selectedMat?.price || 0;
      const dynamicUnitPrice = getPosterUnitPrice(sizeId, totalQty) + framePrice + matPrice;
      return { ...item, unitPrice: dynamicUnitPrice };
    });
  };

  const calculateUnitPrice = (basePrice = 69, selectedSize, selectedFrame, selectedMat) => {
    const sizePrice = selectedSize?.id ? getPosterBasePrice(selectedSize.id) : basePrice;
    const framePrice = selectedFrame?.price || 0;
    const matPrice = selectedMat?.price || 0;
    return sizePrice + framePrice + matPrice;
  };

  const addToCart = (product, options = {}) => {
    if (!product) return;
    const selectedSize = options.size || { id: 'A4', name: 'A4', dimensions: '21 × 29.7 cm (8.3 × 11.7 in)' };
    const selectedFrame = options.frame || { id: 'unframed', name: 'Unframed Print', price: 0 };
    const selectedMat = options.mat || { id: 'none', name: 'Full Bleed', price: 0 };
    const qty = Math.max(1, Number(options.quantity) || 1);

    const cartItemId = `${product.id}-${selectedSize.id}-${selectedFrame.id}-${selectedMat.id}`;

    setItems((prevItems) => {
      const safeItems = Array.isArray(prevItems) ? prevItems : [];
      const existingIndex = safeItems.findIndex((item) => item.cartItemId === cartItemId);
      if (existingIndex > -1) {
        const updated = [...safeItems];
        updated[existingIndex].quantity += qty;
        return updated;
      } else {
        const currentTotalPosters = getTotalPosterCount(safeItems) + qty;
        const dynamicBase = getPosterUnitPrice(selectedSize.id, currentTotalPosters);
        const unitPrice = dynamicBase + (selectedFrame.price || 0) + (selectedMat.price || 0);

        const newItem = {
          cartItemId,
          id: product.id,
          title: product.title,
          bengaliTitle: product.bengaliTitle,
          collection: product.collection,
          image: product.image,
          selectedSize,
          selectedFrame,
          selectedMat,
          unitPrice,
          quantity: qty,
        };
        return [newItem, ...safeItems];
      }
    });

    openCart();
  };

  const removeFromCart = (cartItemId) => {
    setItems((prev) => (Array.isArray(prev) ? prev.filter((item) => item.cartItemId !== cartItemId) : []));
  };

  const updateQuantity = (cartItemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setItems((prev) =>
      Array.isArray(prev)
        ? prev.map((item) => (item.cartItemId === cartItemId ? { ...item, quantity: newQuantity } : item))
        : []
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const applyCoupon = (code = '') => {
    const clean = code.trim().toUpperCase();
    if (clean === 'PEEL10' || clean === 'BENGAL10') {
      setCoupon(clean);
      setCouponDiscountPercent(10);
      setCouponError('');
      setCouponSuccess('10% Archival Discount Applied!');
      return true;
    } else {
      setCouponError('Invalid promo code. Try BENGAL10');
      setCouponSuccess('');
      return false;
    }
  };

  const removeCoupon = () => {
    setCoupon('');
    setCouponDiscountPercent(0);
    setCouponError('');
    setCouponSuccess('');
  };

  // Calculations with dynamic pricing
  const dynamicItems = getItemsWithDynamicPricing();
  const itemsCount = dynamicItems.reduce((sum, item) => sum + (Number(item?.quantity) || 0), 0);
  const subtotal = dynamicItems.reduce((sum, item) => sum + (Number(item?.unitPrice) || 0) * (Number(item?.quantity) || 0), 0);
  const discount = Math.round((subtotal * couponDiscountPercent) / 100);
  const shipping = subtotal >= 299 || dynamicItems.length === 0 ? 0 : 49;
  const total = Math.max(0, subtotal - discount + shipping);

  return (
    <CartContext.Provider
      value={{
        items: dynamicItems,
        isCartOpen,
        openCart,
        closeCart,
        toggleCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        coupon,
        couponDiscountPercent,
        couponError,
        couponSuccess,
        applyCoupon,
        removeCoupon,
        calculateUnitPrice,
        itemsCount,
        subtotal,
        discount,
        shipping,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
