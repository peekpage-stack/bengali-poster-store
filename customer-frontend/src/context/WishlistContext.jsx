import React, { createContext, useContext, useState, useEffect } from 'react';

const WishlistContext = createContext(null);
const STORAGE_KEY = 'banglacanvas_wishlist';

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) return [];
      const parsed = JSON.parse(saved);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(wishlist));
    } catch {
      // ignore
    }
  }, [wishlist]);

  const toggleWishlist = (product) => {
    if (!product || !product.id) return;
    setWishlist((prev) => {
      const safePrev = Array.isArray(prev) ? prev : [];
      const exists = safePrev.some((p) => p.id === product.id);
      if (exists) {
        return safePrev.filter((p) => p.id !== product.id);
      } else {
        return [...safePrev, product];
      }
    });
  };

  const isInWishlist = (productId) => {
    if (!productId || !Array.isArray(wishlist)) return false;
    return wishlist.some((p) => p.id === productId);
  };

  const removeFromWishlist = (productId) => {
    if (!productId) return;
    setWishlist((prev) => (Array.isArray(prev) ? prev.filter((p) => p.id !== productId) : []));
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist: Array.isArray(wishlist) ? wishlist : [],
        toggleWishlist,
        isInWishlist,
        removeFromWishlist,
        count: Array.isArray(wishlist) ? wishlist.length : 0,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
