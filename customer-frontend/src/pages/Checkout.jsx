import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Lock,
  Truck,
  CreditCard,
  QrCode,
  Building,
  Clock
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { ordersApi } from '../services/api';

export default function Checkout() {
  const navigate = useNavigate();
  const { items, subtotal, discount, shipping, total, coupon, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login?redirect=/checkout', { replace: true, state: { from: '/checkout' } });
    }
  }, [isAuthenticated, navigate]);

  // Form inputs
  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    addressLine: user?.shippingAddress?.addressLine || user?.shippingAddress?.street || '',
    city: user?.shippingAddress?.city || 'Kolkata',
    state: user?.shippingAddress?.state || 'West Bengal',
    pincode: user?.shippingAddress?.pincode || '700029',
    transitType: 'standard', // 'standard' or 'crate'
    paymentMethod: 'upi', // 'upi', 'card', 'netbanking', 'cod'
    upiId: user?.email ? `${user.email.split('@')[0]}@okhdfcbank` : 'patron@okhdfcbank',
    cardNumber: '•••• •••• •••• 4242',
    cardExp: '12/28',
    cardCvc: '•••',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15 * 60);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen py-24 flex items-center justify-center bg-surface">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="font-headline text-lg text-on-surface">Redirecting to Patron Login...</p>
          <p className="text-xs text-on-surface-variant font-label">Sign in required to maintain client session</p>
        </div>
      </div>
    );
  }

  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    if (items.length === 0) {
      alert('Your cart is empty. Please select an artwork before checking out.');
      navigate('/shop');
      return;
    }

    setIsSubmitting(true);

    const orderPayload = {
      collector: {
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        address: formData.addressLine,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
      },
      items,
      subtotal,
      discount,
      shipping: formData.transitType === 'crate' ? shipping + 150 : shipping,
      total: formData.transitType === 'crate' ? total + 150 : total,
      couponCode: coupon,
      paymentMethod: formData.paymentMethod.toUpperCase(),
      packaging: formData.transitType === 'crate' ? 'Museum Wooden Crate' : 'Archival Spiral Tube / Reinforced Flat Mailer',
    };

    try {
      const order = await ordersApi.create(orderPayload);
      clearCart();
      navigate(`/order-tracking?orderId=${order.orderId}`);
    } catch {
      alert('Unable to process order at this moment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen py-20 bg-surface flex items-center justify-center">
        <div className="text-center space-y-4 p-8 bg-surface-container-low rounded-2xl border border-surface-container max-w-md mx-4">
          <h2 className="font-headline text-2xl text-on-surface">Your Bag is Empty</h2>
          <p className="text-xs text-on-surface-variant">
            Please add a curated poster to your bag before proceeding with the acquisition protocol.
          </p>
          <Link
            to="/shop"
            className="inline-block px-6 py-2.5 rounded-xl bg-primary text-on-primary text-xs font-label font-semibold"
          >
            Explore Catalog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-16 sm:pb-20 bg-surface w-full max-w-full overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 w-full">
        
        {/* Curatorial Stage Tracker */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between py-4 sm:py-6 border-b border-surface-container gap-3">
          <div className="flex items-center gap-2 sm:gap-3 text-[11px] sm:text-xs font-label uppercase tracking-wider sm:tracking-widest text-on-surface-variant truncate">
            <span className="text-on-surface">01. Bag</span>
            <span>→</span>
            <span className="text-primary font-bold">02. Curatorial Checkout</span>
            <span>→</span>
            <span className="opacity-50 hidden xs:inline">03. Confirmation</span>
          </div>

          {/* Reservation Countdown Timer */}
          <div className="flex items-center gap-2 bg-surface-container px-3 py-1.5 rounded-full text-xs font-label self-start sm:self-auto">
            <Clock className="w-3.5 h-3.5 text-primary flex-shrink-0" />
            <span className="text-on-surface-variant">Reservation:</span>
            <span className="font-bold text-primary font-mono">{formatTimer(timeLeft)}</span>
          </div>
        </div>

        {/* Header Title */}
        <div className="py-4 sm:py-6">
          <span className="text-xs font-label uppercase tracking-widest text-primary font-bold">
            Acquisition Protocol Ref. #BC-ACQ-2026
          </span>
          <h1 className="font-headline text-2xl sm:text-4xl text-on-surface font-normal mt-1">
            Curatorial Checkout & Provenance Registry
          </h1>
        </div>

        <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* LEFT 7 COLS: Collector Info, Address, Delivery & Payment */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 w-full max-w-full">
            
            {/* Step 1: Collector Identity */}
            <div className="p-4 sm:p-6 rounded-2xl bg-surface-container-low border border-surface-container space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b border-surface-container">
                <span className="w-7 h-7 rounded-full bg-primary text-on-primary font-label text-xs font-bold flex items-center justify-center flex-shrink-0">
                  1
                </span>
                <div>
                  <h3 className="font-headline text-base sm:text-lg font-medium text-on-surface">Collector Information</h3>
                  <p className="text-[10px] sm:text-[11px] text-on-surface-variant font-label">
                    Certificate of provenance is registered under this identity.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-[10px] sm:text-[11px] uppercase font-label font-bold text-on-surface mb-1">
                    Legal Collector / Patron Name
                  </label>
                  <input
                    type="text"
                    required
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full bg-surface text-on-surface text-xs font-body px-3.5 py-2.5 rounded-xl border border-surface-container outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-[10px] sm:text-[11px] uppercase font-label font-bold text-on-surface mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-surface text-on-surface text-xs font-body px-3.5 py-2.5 rounded-xl border border-surface-container outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-[10px] sm:text-[11px] uppercase font-label font-bold text-on-surface mb-1">
                    Mobile Phone
                  </label>
                  <input
                    type="tel"
                    required
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full bg-surface text-on-surface text-xs font-body px-3.5 py-2.5 rounded-xl border border-surface-container outline-none focus:border-primary"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Shipping Destination */}
            <div className="p-4 sm:p-6 rounded-2xl bg-surface-container-low border border-surface-container space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b border-surface-container">
                <span className="w-7 h-7 rounded-full bg-primary text-on-primary font-label text-xs font-bold flex items-center justify-center flex-shrink-0">
                  2
                </span>
                <div>
                  <h3 className="font-headline text-base sm:text-lg font-medium text-on-surface">Gallery / Residence Address</h3>
                  <p className="text-[10px] sm:text-[11px] text-on-surface-variant font-label">
                    Dispatched in moisture-sealed archival containers across all Indian pin codes.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-[10px] sm:text-[11px] uppercase font-label font-bold text-on-surface mb-1">
                    Address Line (Street, Flat, Landmark)
                  </label>
                  <input
                    type="text"
                    required
                    name="addressLine"
                    value={formData.addressLine}
                    onChange={handleInputChange}
                    className="w-full bg-surface text-on-surface text-xs font-body px-3.5 py-2.5 rounded-xl border border-surface-container outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-[10px] sm:text-[11px] uppercase font-label font-bold text-on-surface mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    required
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full bg-surface text-on-surface text-xs font-body px-3.5 py-2.5 rounded-xl border border-surface-container outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-[10px] sm:text-[11px] uppercase font-label font-bold text-on-surface mb-1">
                    State
                  </label>
                  <input
                    type="text"
                    required
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="w-full bg-surface text-on-surface text-xs font-body px-3.5 py-2.5 rounded-xl border border-surface-container outline-none focus:border-primary"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[10px] sm:text-[11px] uppercase font-label font-bold text-on-surface mb-1">
                    Pincode
                  </label>
                  <input
                    type="text"
                    required
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    className="w-full sm:w-1/2 bg-surface text-on-surface text-xs font-body px-3.5 py-2.5 rounded-xl border border-surface-container outline-none focus:border-primary"
                  />
                </div>
              </div>

              {/* Transit Packaging Selection */}
              <div className="pt-3 border-t border-surface-container space-y-2">
                <label className="block text-[10px] sm:text-[11px] uppercase font-label font-bold text-on-surface mb-1.5">
                  Archival Packaging Preference
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <label
                    className={`p-3 rounded-xl border flex items-start gap-2.5 cursor-pointer transition-all ${
                      formData.transitType === 'standard'
                        ? 'bg-surface border-primary ring-1 ring-primary'
                        : 'bg-surface-container border-surface-container'
                    }`}
                  >
                    <input
                      type="radio"
                      name="transitType"
                      value="standard"
                      checked={formData.transitType === 'standard'}
                      onChange={handleInputChange}
                      className="mt-0.5 text-primary"
                    />
                    <div>
                      <span className="block text-xs font-label font-bold text-on-surface">Standard Insured Transit</span>
                      <span className="block text-[10px] text-on-surface-variant mt-0.5">Free • 3-Ply Kraft Tube</span>
                    </div>
                  </label>

                  <label
                    className={`p-3 rounded-xl border flex items-start gap-2.5 cursor-pointer transition-all ${
                      formData.transitType === 'crate'
                        ? 'bg-surface border-primary ring-1 ring-primary'
                        : 'bg-surface-container border-surface-container'
                    }`}
                  >
                    <input
                      type="radio"
                      name="transitType"
                      value="crate"
                      checked={formData.transitType === 'crate'}
                      onChange={handleInputChange}
                      className="mt-0.5 text-primary"
                    />
                    <div>
                      <span className="block text-xs font-label font-bold text-on-surface">Museum Crate Protection</span>
                      <span className="block text-[10px] text-on-surface-variant mt-0.5">+₹150 • Wooden crate for frames</span>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Step 3: Payment Protocol */}
            <div className="p-4 sm:p-6 rounded-2xl bg-surface-container-low border border-surface-container space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b border-surface-container">
                <span className="w-7 h-7 rounded-full bg-primary text-on-primary font-label text-xs font-bold flex items-center justify-center flex-shrink-0">
                  3
                </span>
                <div>
                  <h3 className="font-headline text-base sm:text-lg font-medium text-on-surface">Payment Protocol</h3>
                  <p className="text-[10px] sm:text-[11px] text-on-surface-variant font-label">
                    256-bit bank encrypted transaction.
                  </p>
                </div>
              </div>

              {/* Payment Tabs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'upi', label: 'Instant UPI', icon: QrCode },
                  { id: 'card', label: 'Cards', icon: CreditCard },
                  { id: 'netbanking', label: 'NetBanking', icon: Building },
                  { id: 'cod', label: 'Cash On Delivery', icon: Truck },
                ].map((m) => {
                  const Icon = m.icon;
                  const isSelected = formData.paymentMethod === m.id;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setFormData((p) => ({ ...p, paymentMethod: m.id }))}
                      className={`p-2.5 rounded-xl border text-center flex flex-col items-center gap-1 transition-all ${
                        isSelected
                          ? 'bg-surface border-primary text-primary font-bold shadow-xs'
                          : 'bg-surface-container border-surface-container text-on-surface-variant hover:text-on-surface'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-[11px] font-label truncate">{m.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Payment Details Form */}
              <div className="p-3.5 sm:p-4 rounded-xl bg-surface border border-surface-container">
                {formData.paymentMethod === 'upi' && (
                  <div className="space-y-2.5">
                    <p className="text-xs font-label text-on-surface">
                      Enter UPI ID or scan QR upon confirmation:
                    </p>
                    <input
                      type="text"
                      name="upiId"
                      value={formData.upiId}
                      onChange={handleInputChange}
                      placeholder="e.g. yourname@okhdfcbank"
                      className="w-full bg-surface-container-low text-on-surface text-xs font-body px-3.5 py-2.5 rounded-xl border border-surface-container outline-none focus:border-primary"
                    />
                    <div className="flex flex-wrap gap-1.5">
                      {['GPay', 'PhonePe', 'Paytm', 'BHIM'].map((app) => (
                        <span key={app} className="px-2 py-0.5 rounded bg-surface-container text-[10px] font-label font-bold text-on-surface-variant">
                          {app}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {formData.paymentMethod === 'card' && (
                  <div className="space-y-3">
                    <div>
                      <label className="block text-[10px] uppercase font-label font-bold text-on-surface mb-1">
                        Card Number
                      </label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        className="w-full bg-surface-container-low text-on-surface text-xs font-body px-3.5 py-2.5 rounded-xl border border-surface-container outline-none focus:border-primary"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2 sm:gap-3">
                      <div>
                        <label className="block text-[10px] uppercase font-label font-bold text-on-surface mb-1">
                          Expiry MM/YY
                        </label>
                        <input
                          type="text"
                          name="cardExp"
                          value={formData.cardExp}
                          onChange={handleInputChange}
                          className="w-full bg-surface-container-low text-on-surface text-xs font-body px-3.5 py-2.5 rounded-xl border border-surface-container outline-none focus:border-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase font-label font-bold text-on-surface mb-1">
                          CVV / CVC
                        </label>
                        <input
                          type="password"
                          name="cardCvc"
                          value={formData.cardCvc}
                          onChange={handleInputChange}
                          className="w-full bg-surface-container-low text-on-surface text-xs font-body px-3.5 py-2.5 rounded-xl border border-surface-container outline-none focus:border-primary"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {formData.paymentMethod === 'netbanking' && (
                  <div className="space-y-2">
                    <p className="text-xs font-label text-on-surface mb-2">Select Primary Bank:</p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {['HDFC Bank', 'State Bank of India', 'ICICI Bank', 'Axis Bank'].map((bank) => (
                        <button
                          key={bank}
                          type="button"
                          className="p-2 rounded-lg bg-surface-container hover:bg-surface-container-high text-xs font-label text-on-surface truncate"
                        >
                          {bank}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {formData.paymentMethod === 'cod' && (
                  <div className="space-y-1">
                    <p className="text-xs font-label text-on-surface font-semibold">
                      Cash on Delivery Available Pan-India
                    </p>
                    <p className="text-[11px] text-on-surface-variant font-body leading-relaxed">
                      Please have the cash ready upon arrival. The courier will hand over the sealed certificate envelope.
                    </p>
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* RIGHT 5 COLS: Order Dossier & Final Total */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-4 sm:space-y-6 w-full max-w-full">
            <div className="p-4 sm:p-6 rounded-2xl bg-surface-container-low border border-surface-container space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-surface-container">
                <h3 className="font-headline text-lg sm:text-xl text-on-surface font-medium">Acquisition Dossier</h3>
                <span className="text-xs font-label font-bold text-primary">
                  {items.length} {items.length === 1 ? 'Plate' : 'Plates'}
                </span>
              </div>

              {/* Items List */}
              <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                {items.map((item) => (
                  <div key={item.cartItemId} className="flex gap-3 py-2 border-b border-surface-container/60 last:border-none">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-12 h-16 object-cover rounded-md shadow-xs bg-surface-container flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-headline text-xs sm:text-sm font-medium text-on-surface truncate">
                        {item.title}
                      </h4>
                      <p className="text-[10px] font-label text-on-surface-variant truncate">
                        {item.selectedSize?.dimensions} • {item.selectedFrame?.name}
                      </p>
                      <div className="flex items-center justify-between mt-1 text-xs">
                        <span className="text-on-surface-variant font-label text-[11px]">Qty: {item.quantity}</span>
                        <span className="font-headline font-semibold text-on-surface">
                          ₹{item.unitPrice * item.quantity}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Financial Calculation */}
              <div className="space-y-1.5 pt-3 border-t border-surface-container text-xs font-label text-on-surface-variant">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-on-surface font-medium">₹{subtotal}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-tertiary">
                    <span>Voucher ({coupon})</span>
                    <span>-₹{discount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Insured Pan-India Express</span>
                  <span className="text-on-surface font-medium">
                    {shipping === 0 ? <strong className="text-secondary">FREE</strong> : `₹${shipping}`}
                  </span>
                </div>
                {formData.transitType === 'crate' && (
                  <div className="flex justify-between">
                    <span>Museum Wooden Crate</span>
                    <span className="text-on-surface font-medium">₹150</span>
                  </div>
                )}
                <div className="pt-2.5 border-t border-surface-container flex justify-between items-baseline">
                  <span className="font-headline text-lg sm:text-xl font-medium text-on-surface">Final Acquisition</span>
                  <span className="font-headline text-2xl sm:text-3xl font-bold text-primary">
                    ₹{formData.transitType === 'crate' ? total + 150 : total}
                  </span>
                </div>
              </div>

              {/* Confirm Acquisition Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 sm:py-4 rounded-xl bg-primary hover:bg-primary-hover text-on-primary font-label text-xs sm:text-sm font-bold tracking-wider flex items-center justify-center gap-2 shadow-subtle transition-all active:scale-[0.98] disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Registering Archival Provenance...</span>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Confirm Acquisition • ₹{formData.transitType === 'crate' ? total + 150 : total}</span>
                  </>
                )}
              </button>

              <div className="text-[10px] font-label text-on-surface-variant text-center space-y-0.5">
                <p>300 GSM Archival Certification Included with Order</p>
                <p>Estimated dispatch: 24 to 48 hours from Kolkata Studio</p>
              </div>

            </div>
          </div>

        </form>

      </div>
    </div>
  );
}
