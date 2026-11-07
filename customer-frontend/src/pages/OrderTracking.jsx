import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Award,
  Truck,
  MapPin,
  Download,
  ArrowRight,
  Search,
  Sparkles
} from 'lucide-react';
import { ordersApi } from '../services/api';

export default function OrderTracking() {
  const [searchParams] = useSearchParams();
  const orderIdParam = searchParams.get('orderId') || 'BC-2026-8412';

  const [searchQuery, setSearchQuery] = useState(orderIdParam);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrder(orderIdParam);
  }, [orderIdParam]);

  const loadOrder = async (ref) => {
    setLoading(true);
    try {
      const data = await ordersApi.getById(ref);
      setOrder(data);
    } catch {
      // fallback
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      loadOrder(searchQuery.trim());
    }
  };

  const handlePrintCertificate = () => {
    window.print();
  };

  if (loading || !order) {
    return (
      <div className="min-h-screen py-20 bg-surface flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="font-headline text-lg text-on-surface">Retrieving Archival Docket...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-16 sm:pb-20 bg-surface w-full max-w-full overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 w-full">
        
        {/* Top Search / Lookup Bar for any Order */}
        <div className="mb-6 sm:mb-10 flex flex-col sm:flex-row sm:items-center justify-between pb-4 sm:pb-6 border-b border-surface-container gap-4 pt-2">
          <div>
            <span className="font-label text-xs uppercase tracking-widest text-primary font-bold">
              Archival Registry Docket
            </span>
            <h1 className="font-headline text-xl sm:text-3xl text-on-surface font-normal mt-0.5">
              Acquisition Status & Transit Protocol
            </h1>
          </div>

          <form onSubmit={handleSearchSubmit} className="flex gap-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Track Order #BC-..."
              className="bg-surface-container-low text-on-surface text-xs font-label px-3.5 py-2 rounded-xl border border-surface-container outline-none focus:border-primary uppercase placeholder:text-outline flex-1 sm:flex-initial"
            />
            <button
              type="submit"
              className="p-2.5 rounded-xl bg-primary text-on-primary hover:bg-primary-hover transition-colors flex-shrink-0"
              title="Track Order Reference"
            >
              <Search className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Success Confirmation Banner */}
        <div className="p-5 sm:p-8 rounded-3xl bg-surface-container-low border border-surface-container shadow-subtle mb-8 sm:mb-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-secondary-container text-primary flex items-center justify-center flex-shrink-0">
              <Award className="w-7 h-7 sm:w-8 sm:h-8 text-primary" />
            </div>
            <div>
              <span className="inline-block px-2.5 py-0.5 rounded-full bg-primary/10 text-primary font-label text-[10px] font-bold uppercase tracking-wider mb-1">
                Archival Folio Allocated
              </span>
              <h2 className="font-headline text-xl sm:text-3xl text-on-surface font-medium">
                Acquisition Confirmed: {order.orderId}
              </h2>
              <p className="text-xs sm:text-sm font-body text-on-surface-variant mt-1">
                Your archival print run has been scheduled at our Kolkata studio. Official provenance certificate registered to <strong>{order.collector?.name}</strong>.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 w-full md:w-auto">
            <button
              onClick={handlePrintCertificate}
              className="flex-1 md:flex-initial px-4 sm:px-5 py-2.5 rounded-xl bg-surface hover:bg-surface-container text-on-surface font-label text-xs font-semibold flex items-center justify-center gap-2 border border-surface-container transition-colors shadow-xs"
            >
              <Download className="w-4 h-4 text-primary" />
              <span>Print Certificate</span>
            </button>
            <Link
              to="/shop"
              className="flex-1 md:flex-initial px-4 sm:px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-on-primary font-label text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-subtle"
            >
              <span>Explore More Art</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* Left Column: Transit Timeline */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 w-full max-w-full">
            
            <div className="p-5 sm:p-8 rounded-3xl bg-surface-container-lowest border border-surface-container shadow-subtle space-y-5 sm:space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 sm:pb-4 border-b border-surface-container gap-1">
                <div className="flex items-center gap-2">
                  <Truck className="w-5 h-5 text-primary" />
                  <h3 className="font-headline text-lg sm:text-xl text-on-surface font-semibold">
                    Curatorial Production & Transit
                  </h3>
                </div>
                <span className="font-label text-[11px] sm:text-xs text-primary font-bold uppercase tracking-wider">
                  AWB: {order.trackingNumber || 'ECOM-84029144'}
                </span>
              </div>

              {/* Estimated Delivery Banner */}
              <div className="p-3.5 sm:p-4 rounded-2xl bg-surface-container-low flex items-center justify-between">
                <div>
                  <span className="text-[9px] sm:text-[10px] uppercase font-label tracking-widest text-on-surface-variant block">
                    Estimated Patron Handover
                  </span>
                  <span className="font-headline text-base sm:text-xl font-medium text-on-surface">
                    {order.estimatedDelivery || 'Wednesday, Nov 12, 2026'}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[9px] sm:text-[10px] uppercase font-label tracking-widest text-secondary block">
                    Status
                  </span>
                  <span className="text-[11px] sm:text-xs font-label font-bold text-primary">
                    {order.status || 'Archival Preparation'}
                  </span>
                </div>
              </div>

              {/* Step Sequence */}
              <div className="relative pl-5 sm:pl-6 space-y-6 sm:space-y-8 border-l-2 border-primary/20 ml-2 sm:ml-3">
                {[
                  {
                    title: 'Patron Acquisition Recorded & Verified',
                    desc: 'Order received and slotted into museum pigment printing queue.',
                    time: 'Nov 05, 10:30 AM',
                    completed: true,
                  },
                  {
                    title: '12-Color Lucia Pro Giclée Inking (300 GSM Cotton)',
                    desc: 'Calibrated color management applied on German deckled cotton rag.',
                    time: 'Nov 05, 03:15 PM',
                    completed: true,
                  },
                  {
                    title: 'Bengal Teak Wood Custom Mitered Mount & Matting',
                    desc: 'Hand-waxed solid timber assembly with acid-free barrier board.',
                    time: 'Nov 06, 11:45 AM',
                    completed: true,
                  },
                  {
                    title: 'Archival Provenance Wax Seal Attached',
                    desc: 'Numbered and stamped with the PeekPage studio seal.',
                    time: 'Nov 06, 05:20 PM',
                    completed: true,
                  },
                  {
                    title: 'Dispatched via Temperature-Controlled Insured Express',
                    desc: 'In transit to distribution hub with BlueDart Archival Special.',
                    time: 'Nov 07, 09:00 AM',
                    completed: true,
                    current: true,
                  },
                  {
                    title: 'Handover to Collector Residence',
                    desc: 'White-glove delivery in protective waterproof wooden-edge casing.',
                    time: 'Est. Nov 10, by 5:00 PM',
                    completed: false,
                  },
                ].map((step, idx) => (
                  <div key={idx} className="relative group">
                    <div
                      className={`absolute -left-[27px] sm:-left-[31px] top-0 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full border-2 ${
                        step.completed
                          ? 'bg-primary border-primary'
                          : 'bg-surface border-surface-container'
                      } ${step.current ? 'ring-4 ring-primary/20' : ''}`}
                    />
                    <div className="space-y-0.5">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-0.5">
                        <h4 className="font-headline text-sm sm:text-base text-on-surface font-medium">
                          {step.title}
                        </h4>
                        <span className="text-[10px] font-label text-on-surface-variant font-mono">
                          {step.time}
                        </span>
                      </div>
                      <p className="text-[11px] sm:text-xs text-on-surface-variant font-body">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Destination Address Card */}
            <div className="p-5 sm:p-6 rounded-3xl bg-surface-container-lowest border border-surface-container shadow-subtle space-y-2.5">
              <div className="flex items-center gap-2 text-on-surface font-medium font-headline text-base sm:text-lg">
                <MapPin className="w-4 h-4 text-primary" />
                <span>Delivery Destination</span>
              </div>
              <div className="text-xs font-body text-on-surface-variant space-y-1">
                <p className="font-semibold text-on-surface">{order.collector?.name}</p>
                <p>{order.collector?.address}</p>
                <p>
                  {order.collector?.city}, {order.collector?.state} — {order.collector?.pincode}
                </p>
                <p>Phone: {order.collector?.phone}</p>
              </div>
            </div>

          </div>

          {/* Right Column: Certificate & Order Items */}
          <div className="lg:col-span-5 space-y-6 w-full max-w-full">
            
            {/* Authenticity Certificate Card */}
            <div className="p-5 sm:p-6 rounded-3xl bg-surface-container-low border-2 border-gold/40 shadow-atelier space-y-3.5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gold/10 rounded-bl-full pointer-events-none" />
              
              <div className="flex items-center justify-between pb-3 border-b border-surface-container">
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-gold-dark" />
                  <span className="font-label text-xs uppercase tracking-widest text-gold-dark font-bold">
                    Official Certificate
                  </span>
                </div>
                <span className="text-[9px] font-mono uppercase text-on-surface-variant">
                  ID: BC-CERT-{order.orderId}
                </span>
              </div>

              <div className="space-y-1.5 text-center py-2">
                <p className="font-bengali text-xs sm:text-sm text-primary">
                  কলকাতা আর্ট অ্যাটেলিয়ার প্রমাণীকরণ পত্র
                </p>
                <h4 className="font-headline text-xl sm:text-2xl font-normal text-on-surface">
                  Certificate of Archival Provenance
                </h4>
                <p className="text-[10px] sm:text-[11px] font-body text-on-surface-variant max-w-xs mx-auto leading-relaxed">
                  This document certifies that the acquired plates conform strictly to 300 GSM cotton rag printing standards with 12-color archival Lucia Pro pigment formulation.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[10px] font-label text-on-surface-variant pt-2 border-t border-surface-container">
                <div>
                  <span className="block font-bold text-on-surface">Registered Patron</span>
                  <span className="truncate block">{order.collector?.name}</span>
                </div>
                <div>
                  <span className="block font-bold text-on-surface">Curatorial Seal</span>
                  <span>Red Wax & Foil</span>
                </div>
              </div>
            </div>

            {/* Ordered Artwork Plates Recap */}
            <div className="p-5 sm:p-6 rounded-3xl bg-surface-container-lowest border border-surface-container shadow-subtle space-y-4">
              <h3 className="font-headline text-base sm:text-lg font-medium text-on-surface pb-2 border-b border-surface-container">
                Acquired Plates ({order.items?.length || 0})
              </h3>

              <div className="space-y-3.5">
                {(order.items || []).map((item, idx) => (
                  <div key={idx} className="flex gap-3 items-center">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-12 h-16 object-cover rounded-md shadow-xs bg-surface-container flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h5 className="font-headline text-xs sm:text-sm font-medium text-on-surface truncate">
                        {item.title}
                      </h5>
                      <p className="text-[10px] font-label text-on-surface-variant truncate">
                        {item.selectedSize?.dimensions || 'A2 Standard'} • {item.selectedFrame?.name || 'Unframed'}
                      </p>
                      <div className="flex items-center justify-between text-xs mt-1">
                        <span className="text-on-surface-variant text-[11px]">Qty: {item.quantity || 1}</span>
                        <span className="font-headline font-semibold text-primary">
                          ₹{(item.unitPrice || 699) * (item.quantity || 1)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Total Breakdown */}
              <div className="pt-3 border-t border-surface-container text-xs font-label text-on-surface-variant space-y-1">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-on-surface font-medium">₹{order.subtotal || 2298}</span>
                </div>
                {order.discount > 0 && (
                  <div className="flex justify-between text-tertiary">
                    <span>Discount</span>
                    <span>-₹{order.discount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Insured Pan-India Express</span>
                  <span className="text-secondary font-bold">FREE</span>
                </div>
                <div className="pt-2 border-t border-surface-container flex justify-between items-baseline">
                  <span className="font-headline text-base font-bold text-on-surface">Total Paid</span>
                  <span className="font-headline text-xl sm:text-2xl font-bold text-primary">
                    ₹{order.total || 2069}
                  </span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
