import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

export default function Wishlist() {
  const { wishlist, removeFromWishlist, count } = useWishlist();
  const { addToCart } = useCart();

  const handleMoveToBag = (product) => {
    addToCart(product, {
      size: { id: 'A2', name: 'A2 Standard', dimensions: '18 × 24 in', priceMultiplier: 1.0 },
      frame: { id: 'unframed', name: 'Unframed / Archival Tube', price: 0 },
      mat: { id: 'none', name: 'Flush Edge', price: 0 },
      quantity: 1,
    });
    removeFromWishlist(product.id);
  };

  return (
    <div className="min-h-screen pb-16 sm:pb-20 bg-surface w-full max-w-full overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 w-full">
        
        {/* Header */}
        <div className="py-6 sm:py-8 border-b border-surface-container flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-label uppercase tracking-widest text-primary font-bold">
              <Heart className="w-4 h-4 fill-primary text-primary" />
              <span>Personal Art Folio</span>
            </div>
            <h1 className="font-headline text-2xl sm:text-4xl text-on-surface font-normal mt-1">
              Curated Wishlist & Saved Plates
            </h1>
            <p className="text-xs sm:text-sm font-body text-on-surface-variant mt-1">
              Your privately preserved archival selections for interior curation and salon viewings.
            </p>
          </div>

          <span className="font-label text-xs uppercase tracking-wider text-primary font-bold">
            {count} {count === 1 ? 'Plate' : 'Plates'} Saved
          </span>
        </div>

        {wishlist.length === 0 ? (
          <div className="py-16 sm:py-24 text-center space-y-4 max-w-md mx-auto px-4">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-surface-container flex items-center justify-center mx-auto text-on-surface-variant">
              <Heart className="w-7 h-7 sm:w-8 sm:h-8 opacity-40" />
            </div>
            <h3 className="font-headline text-xl sm:text-2xl text-on-surface">Your Folio is Empty</h3>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Explore our fine Bengali wall art catalog and tap the heart icon on any artwork to preserve it in your personal folio.
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-on-primary font-label text-xs font-semibold hover:bg-primary-hover transition-colors"
            >
              <span>Browse Catalog</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 my-8 sm:my-10">
            {wishlist.map((product) => (
              <div
                key={product.id}
                className="group relative flex flex-col bg-surface-container-lowest rounded-2xl overflow-hidden shadow-subtle hover:shadow-atelier transition-all border border-surface-container"
              >
                {/* Image */}
                <Link to={`/product/${product.id}`} className="block relative p-3 sm:p-4 bg-surface-container-low overflow-hidden">
                  <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden bg-surface-container shadow-inner">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <button
                      onClick={(e) => { e.preventDefault(); e.stopPropagation(); removeFromWishlist(product.id); }}
                      className="absolute top-2.5 right-2.5 p-2 rounded-full bg-black/60 hover:bg-black text-white transition-colors"
                      title="Remove from Folio"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </Link>

                {/* Details */}
                <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between">
                  <div>
                    <span className="font-label text-[10px] uppercase tracking-widest text-primary font-bold block mb-1">
                      {product.collection}
                    </span>
                    <Link to={`/product/${product.id}`}>
                      <h3 className="font-headline text-base sm:text-lg font-medium text-on-surface truncate group-hover:text-primary transition-colors">
                        {product.title}
                      </h3>
                    </Link>
                    <p className="font-bengali text-xs text-on-surface-variant/80 mt-0.5 truncate">
                      {product.bengaliTitle}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-surface-container flex items-center justify-between gap-2">
                    <span className="font-headline text-lg sm:text-xl font-semibold text-on-surface">
                      ₹{product.price}
                    </span>
                    <button
                      onClick={() => handleMoveToBag(product)}
                      className="py-1.5 sm:py-2 px-3 sm:px-3.5 rounded-lg bg-primary hover:bg-primary-hover text-on-primary font-label text-xs font-semibold flex items-center gap-1.5 transition-colors"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Move to Bag</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
