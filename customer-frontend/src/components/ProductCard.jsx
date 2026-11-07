import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Eye, ShoppingBag, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { getPosterBasePrice, POSTER_PRICE_TIERS } from '../services/api';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [isHovered, setIsHovered] = useState(false);
  const [addedNotice, setAddedNotice] = useState(false);

  const isFavorited = isInWishlist(product.id);
  const baseA4Price = getPosterBasePrice('A4');
  const lowestPrice = getPosterBasePrice('A5');

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, {
      size: { id: 'A4', name: 'A4', dimensions: '21 × 29.7 cm (8.3 × 11.7 in)' },
      quantity: 1,
    });
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2000);
  };

  const handleWishlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <div
      className="group relative flex flex-col bg-surface-container-lowest rounded-xl overflow-hidden shadow-subtle hover:shadow-atelier transition-all duration-500 border border-surface-container"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Artwork Image Container */}
      <Link to={`/product/${product.id}`} className="block relative p-4 sm:p-5 bg-surface-container-low overflow-hidden">
        <div className="relative aspect-[3/4] w-full rounded-lg overflow-hidden bg-surface-container flex items-center justify-center shadow-inner">
          <img
            src={isHovered && product.hoverImage ? product.hoverImage : product.image}
            alt={product.title}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
          />

          {/* Premium Quality Badge */}
          <div className="absolute top-3 left-3 bg-surface-container-lowest/95 backdrop-blur-md px-2.5 py-1 rounded-md text-amber-700 font-label text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            <span>Premium Print</span>
          </div>

          {/* Floating Wishlist Action */}
          <button
            onClick={handleWishlistClick}
            className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 shadow-sm ${
              isFavorited
                ? 'bg-tertiary text-white scale-110'
                : 'bg-surface-container-lowest/90 backdrop-blur-md text-on-surface hover:text-tertiary hover:scale-110'
            }`}
            aria-label="Save to Wishlist"
          >
            <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
          </button>
        </div>
      </Link>

      {/* Metadata */}
      <div className="p-4 sm:p-5 flex flex-col flex-grow justify-between bg-surface-container-lowest">
        <div>
          <Link to={`/product/${product.id}`} className="block group-hover:text-primary transition-colors">
            <h3 className="font-headline text-lg sm:text-xl font-medium text-on-surface line-clamp-1 leading-snug">
              {product.title}
            </h3>
            <p className="font-bengali text-xs text-on-surface-variant/90 mt-0.5 line-clamp-1">
              {product.bengaliTitle}
            </p>
          </Link>
        </div>

        {/* Pricing & Quick Add */}
        <div className="mt-4 pt-3 border-t border-surface-container flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-headline text-xl sm:text-2xl font-semibold text-on-surface">
                ₹{baseA4Price}
              </span>
              <span className="text-[10px] font-label text-on-surface-variant/70">
                A4
              </span>
            </div>
            <span className="inline-block text-[10px] font-label font-bold text-emerald-700">
              From ₹{lowestPrice} (A5) • Buy more, save more
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to={`/product/${product.id}`}
              className="p-2 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface transition-colors"
              title="View Details & Sizes"
            >
              <Eye className="w-4 h-4" />
            </Link>

            <button
              onClick={handleQuickAdd}
              className={`py-2 px-3.5 rounded-lg font-label text-xs font-semibold tracking-wider flex items-center gap-1.5 transition-all shadow-sm ${
                addedNotice
                  ? 'bg-secondary text-white'
                  : 'bg-primary hover:bg-primary-hover text-on-primary active:scale-95'
              }`}
            >
              {addedNotice ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Added</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Add A4</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
