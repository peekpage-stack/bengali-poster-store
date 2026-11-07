import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Tag,
  AlertCircle,
  BarChart3,
  Lock
} from 'lucide-react';
import { POSTER_PRICE_TIERS } from '../services/api';

export default function CartDrawer() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const {
    items,
    isCartOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    itemsCount,
    subtotal,
    discount,
    shipping,
    total,
    coupon,
    couponDiscountPercent,
    couponError,
    applyCoupon,
    removeCoupon,
  } = useCart();

  const [inputCoupon, setInputCoupon] = useState('');
  const [showMiniChart, setShowMiniChart] = useState(false);

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (inputCoupon.trim()) {
      applyCoupon(inputCoupon.trim());
      setInputCoupon('');
    }
  };

  const handleCheckoutClick = () => {
    closeCart();
    if (!isAuthenticated) {
      navigate('/login?redirect=/checkout', { state: { from: '/checkout' } });
    } else {
      navigate('/checkout');
    }
  };

  // Calculate how many more posters needed for next tier discount
  const getNextTierInfo = () => {
    if (itemsCount >= 7) return null;
    if (itemsCount >= 4) return { needed: 7 - itemsCount, tier: '7+', label: 'best prices' };
    return { needed: 4 - itemsCount, tier: '4+', label: 'bulk discount' };
  };

  const nextTier = getNextTierInfo();

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Dimmed backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={closeCart}
      />

      {/* Sliding Drawer Container */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-screen max-w-full sm:max-w-md lg:max-w-lg bg-surface/98 backdrop-blur-2xl shadow-2xl border-l border-surface-container flex flex-col justify-between animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="p-4 sm:p-6 border-b border-surface-container bg-surface-container-low/70">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                  <ShoppingBag className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="font-headline text-lg sm:text-xl font-semibold text-on-surface leading-tight">
                    Your Cart
                  </h2>
                  <p className="font-label text-xs text-on-surface-variant">
                    {itemsCount} {itemsCount === 1 ? 'Poster' : 'Posters'}
                  </p>
                </div>
              </div>
              <button
                onClick={closeCart}
                className="p-1.5 sm:p-2 rounded-full hover:bg-surface-container text-on-surface-variant hover:text-on-surface transition-colors"
                aria-label="Close Cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Bulk Discount Progress */}
            <div className="mt-3 sm:mt-4 pt-2.5 sm:pt-3 border-t border-surface-container/60">
              {nextTier ? (
                <div className="flex items-center justify-between text-xs font-label">
                  <span className="flex items-center gap-1.5 text-amber-700 font-semibold text-[11px] sm:text-xs">
                    <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                    Add {nextTier.needed} more poster{nextTier.needed > 1 ? 's' : ''} for {nextTier.tier} {nextTier.label}!
                  </span>
                  <span className="text-on-surface-variant text-[10px] sm:text-[11px]">
                    {itemsCount >= 4 ? '4+ active' : `${itemsCount}/4`}
                  </span>
                </div>
              ) : (
                <div className="flex items-center gap-1.5 text-emerald-700 font-semibold text-[11px] sm:text-xs font-label">
                  <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                  🎉 Best bulk pricing unlocked (7+ posters)!
                </div>
              )}
              <div className="mt-1.5 w-full bg-surface-container rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-amber-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, (itemsCount / 7) * 100)}%` }}
                />
              </div>
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3 sm:space-y-4">
            {items.length === 0 ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-surface-container flex items-center justify-center mx-auto text-on-surface-variant">
                  <ShoppingBag className="w-7 h-7 opacity-40" />
                </div>
                <div>
                  <h3 className="font-headline text-lg sm:text-xl text-on-surface">Your Cart is Empty</h3>
                  <p className="text-xs text-on-surface-variant mt-1 max-w-xs mx-auto">
                    Explore our Bengali detective poster collection — ব্যোমকেশ, ফেলুদা, জটায়ু and more.
                  </p>
                </div>
                <button
                  onClick={() => { closeCart(); navigate('/shop'); }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-on-primary text-xs font-label font-semibold tracking-wider hover:bg-primary-hover transition-colors"
                >
                  <span>Browse Posters</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <>
                {/* Mini Price Chart Toggle */}
                <button
                  onClick={() => setShowMiniChart(!showMiniChart)}
                  className="w-full flex items-center justify-between p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-xs font-label text-amber-900 hover:bg-amber-100 transition-colors"
                >
                  <span className="flex items-center gap-2 font-semibold">
                    <BarChart3 className="w-3.5 h-3.5" />
                    View Bulk Pricing Tiers
                  </span>
                  <span className="text-[10px] text-amber-700">{showMiniChart ? 'Hide' : 'Show'}</span>
                </button>

                {showMiniChart && (
                  <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 space-y-2 text-[11px] font-label">
                    {Object.entries(POSTER_PRICE_TIERS).map(([key, tier]) => (
                      <div key={key} className="flex items-center justify-between gap-2">
                        <span className="font-bold text-stone-900">{tier.name}</span>
                        <div className="flex gap-3 text-stone-600">
                          <span>1: ₹{tier.tiers[0].price}</span>
                          <span className="text-amber-800 font-semibold">4+: ₹{tier.tiers[1].price}</span>
                          <span className="text-emerald-800 font-semibold">7+: ₹{tier.tiers[2].price}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {items.map((item) => (
                  <div
                    key={item.cartItemId}
                    className="flex gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl bg-surface-container-lowest border border-surface-container shadow-sm hover:shadow transition-shadow"
                  >
                    {/* Thumbnail */}
                    <div className="w-16 h-20 sm:w-22 sm:h-26 rounded-lg bg-surface-container flex-shrink-0 overflow-hidden relative shadow-inner">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute bottom-1 left-1 bg-black/75 text-white text-[7px] sm:text-[8px] font-label px-1 py-0.2 rounded uppercase">
                        {item.selectedSize?.id || 'A4'}
                      </span>
                    </div>

                    {/* Details */}
                    <div className="flex-1 flex flex-col justify-between min-w-0">
                      <div>
                        <div className="flex items-start justify-between gap-1.5">
                          <h4 className="font-headline text-sm sm:text-base font-medium text-on-surface truncate leading-tight">
                            {item.title}
                          </h4>
                          <button
                            onClick={() => removeFromCart(item.cartItemId)}
                            className="text-on-surface-variant/60 hover:text-error transition-colors p-1 flex-shrink-0"
                            title="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          </button>
                        </div>

                        {/* Specs */}
                        <div className="mt-1 space-y-0.5 text-[10px] sm:text-[11px] font-label text-on-surface-variant">
                          <p className="truncate">
                            Size: <span className="text-on-surface font-medium">{item.selectedSize?.name} ({item.selectedSize?.dimensions})</span>
                          </p>
                          <p className="truncate text-amber-700 font-medium">
                            ₹{item.unitPrice}/poster {itemsCount >= 4 ? (itemsCount >= 7 ? '(7+ bulk rate)' : '(4+ bulk rate)') : ''}
                          </p>
                        </div>
                      </div>

                      {/* Quantity & Unit Price */}
                      <div className="flex items-center justify-between pt-1.5 sm:pt-2 mt-1.5 border-t border-surface-container">
                        <div className="flex items-center bg-surface-container rounded-lg p-0.5">
                          <button
                            onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                            className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center text-on-surface hover:bg-surface rounded transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                          </button>
                          <span className="w-6 text-center font-label text-xs font-bold text-on-surface">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                            className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center text-on-surface hover:bg-surface rounded transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                          </button>
                        </div>

                        <div className="text-right">
                          <span className="font-headline text-sm sm:text-base font-semibold text-on-surface">
                            ₹{item.unitPrice * item.quantity}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>

          {/* Bottom Checkout & Voucher Area */}
          {items.length > 0 && (
            <div className="p-4 sm:p-6 bg-surface-container-low border-t border-surface-container space-y-3 sm:space-y-4">
              {/* Voucher Code Box */}
              <div>
                {coupon ? (
                  <div className="flex items-center justify-between p-2 rounded-lg bg-primary/10 border border-primary/20 text-xs font-label">
                    <div className="flex items-center gap-1.5 text-primary font-semibold text-[11px] sm:text-xs truncate">
                      <Tag className="w-3.5 h-3.5 flex-shrink-0" />
                      <span className="truncate">{coupon} ({couponDiscountPercent}% OFF applied)</span>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-on-surface-variant hover:text-error text-xs underline font-medium ml-2 flex-shrink-0"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      value={inputCoupon}
                      onChange={(e) => setInputCoupon(e.target.value)}
                      placeholder="Promo code (e.g. PEEL10)"
                      className="flex-1 bg-surface text-on-surface text-xs px-3 py-2 rounded-lg border border-outline-variant outline-none focus:border-primary placeholder:text-outline uppercase"
                    />
                    <button
                      type="submit"
                      className="px-3.5 sm:px-4 py-2 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-on-surface text-xs font-label font-semibold transition-colors flex-shrink-0"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {couponError && (
                  <p className="text-[11px] text-error mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3 flex-shrink-0" />
                    <span>{couponError}</span>
                  </p>
                )}
              </div>

              {/* Price Calculations */}
              <div className="space-y-1 text-xs font-label text-on-surface-variant">
                <div className="flex justify-between">
                  <span>Subtotal ({itemsCount} posters)</span>
                  <span className="text-on-surface font-medium">₹{subtotal}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-tertiary">
                    <span>Promo Discount</span>
                    <span>-₹{discount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-on-surface font-medium">
                    {shipping === 0 ? <span className="text-secondary font-bold">FREE</span> : `₹${shipping}`}
                  </span>
                </div>
                <div className="pt-2 border-t border-surface-container flex justify-between items-baseline">
                  <span className="font-headline text-base sm:text-lg font-semibold text-on-surface">Total</span>
                  <span className="font-headline text-xl sm:text-2xl font-bold text-primary">₹{total}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleCheckoutClick}
                className="w-full py-3 sm:py-3.5 px-4 sm:px-6 rounded-xl bg-primary hover:bg-primary-hover text-on-primary font-label text-xs sm:text-sm font-semibold tracking-wider flex items-center justify-center gap-2 shadow-subtle transition-all active:scale-[0.98]"
              >
                {!isAuthenticated && <Lock className="w-3.5 h-3.5 opacity-80" />}
                <span>{isAuthenticated ? 'Proceed to Checkout' : 'Sign In & Proceed to Checkout'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[9px] sm:text-[10px] text-center font-label text-on-surface-variant flex items-center justify-center gap-1">
                <ShieldCheck className="w-3 h-3 text-primary flex-shrink-0" />
                <span>Safe & Secure Payment • Carefully Packed Delivery</span>
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
