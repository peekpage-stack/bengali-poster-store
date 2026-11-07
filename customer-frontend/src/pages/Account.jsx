import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Award,
  Package,
  MapPin,
  LogOut,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';

export default function Account() {
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();
  const { count: wishlistCount } = useWishlist();

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen py-20 bg-surface flex items-center justify-center">
        <div className="text-center space-y-4 p-8 bg-surface-container-low rounded-2xl border border-surface-container max-w-md mx-4">
          <h2 className="font-headline text-2xl text-on-surface">Patron Authentication Required</h2>
          <p className="text-xs text-on-surface-variant">
            Please log in with your patron credentials to access your curatorial dossier.
          </p>
          <Link
            to="/login"
            className="inline-block px-6 py-2.5 rounded-xl bg-primary text-on-primary text-xs font-label font-semibold"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const sampleAcquisitions = [
    {
      id: 'BC-2026-8412',
      date: 'Nov 05, 2026',
      title: 'Pather Panchali Legacy Folio (A2) + Charulata (A3)',
      status: 'In Transit — Temperature Controlled',
      amount: '₹2,069',
      platesCount: 2,
    },
    {
      id: 'BC-2025-4190',
      date: 'Aug 18, 2025',
      title: 'Kolkata Tramway Route 36 (Solid Teak Framed)',
      status: 'Delivered & Certified',
      amount: '₹1,299',
      platesCount: 1,
    },
    {
      id: 'BC-2025-1022',
      date: 'May 02, 2025',
      title: 'Rabindranath Tagore Gitanjali Calligraphy (A1 Grand)',
      status: 'Delivered & Certified',
      amount: '₹1,849',
      platesCount: 1,
    },
  ];

  return (
    <div className="min-h-screen pb-16 sm:pb-20 bg-surface w-full max-w-full overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 w-full">
        
        {/* Top Greeting & Key Metrics */}
        <div className="py-4 sm:py-6 border-b border-surface-container flex flex-col lg:flex-row lg:items-end justify-between gap-4 sm:gap-6">
          <div className="space-y-1.5 sm:space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-container/70 text-on-surface text-[11px] sm:text-xs font-label uppercase tracking-widest font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span>Patronage Docket • Ref. #BC-45092</span>
            </div>
            <h1 className="font-headline text-2xl sm:text-4xl lg:text-5xl text-on-surface font-normal">
              Welcome Back, <span className="italic text-primary font-serif">{user.name}</span>
            </h1>
            <p className="font-bengali text-xs sm:text-sm text-primary font-medium">
              বাংলার সিনেমা, সাহিত্য ও স্থাপত্যের ব্যক্তিগত শিল্প সংগ্রহশালা
            </p>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              to="/order-tracking"
              className="px-4 sm:px-5 py-2.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface text-xs font-label font-medium tracking-wide flex items-center gap-2 transition-colors border border-surface-container"
            >
              <Package className="w-4 h-4 text-primary" />
              <span>Track Transit</span>
            </Link>
            <button
              onClick={handleLogout}
              className="px-3.5 sm:px-4 py-2.5 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface-variant hover:text-error text-xs font-label flex items-center gap-1.5 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* 4-Stat Strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 my-6 sm:my-8">
          <div className="p-4 sm:p-5 rounded-2xl bg-surface-container-low border border-surface-container flex flex-col justify-between">
            <span className="text-[10px] uppercase font-label tracking-widest text-on-surface-variant">
              Archival Acquisitions
            </span>
            <div className="mt-2 sm:mt-3 flex items-baseline gap-2">
              <span className="font-headline text-2xl sm:text-3xl font-semibold text-on-surface">3</span>
              <span className="text-xs font-label text-on-surface-variant">• 4 Plates</span>
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-surface-container-low border border-surface-container flex flex-col justify-between">
            <span className="text-[10px] uppercase font-label tracking-widest text-on-surface-variant">
              Saved in Folio
            </span>
            <div className="mt-2 sm:mt-3 flex items-baseline gap-2">
              <span className="font-headline text-2xl sm:text-3xl font-semibold text-on-surface">{wishlistCount}</span>
              <span className="text-xs font-label text-on-surface-variant">Plates</span>
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-surface-container-low border border-surface-container flex flex-col justify-between">
            <span className="text-[10px] uppercase font-label tracking-widest text-on-surface-variant">
              Patron Guild Tier
            </span>
            <div className="mt-2 sm:mt-3 flex items-baseline gap-1.5">
              <span className="font-headline text-lg sm:text-xl font-bold text-primary">Gold Guild</span>
              <Award className="w-4 h-4 text-primary" />
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-primary/10 border border-primary/20 flex flex-col justify-between">
            <span className="text-[10px] uppercase font-label tracking-widest text-primary font-bold">
              Centenary Drops
            </span>
            <div className="mt-2 sm:mt-3 flex items-baseline gap-1.5">
              <span className="font-headline text-base sm:text-xl font-semibold text-on-surface">48h Early Access</span>
            </div>
          </div>
        </div>

        {/* 2-Column Section: Left Order History, Right Delivery Dossier */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* Order History */}
          <div className="lg:col-span-8 space-y-4 w-full max-w-full">
            <div className="flex items-center justify-between pb-2 border-b border-surface-container">
              <h3 className="font-headline text-lg sm:text-xl text-on-surface font-medium">
                Archival Acquisition Ledger
              </h3>
              <span className="text-xs font-label text-on-surface-variant">
                Permanent Record
              </span>
            </div>

            <div className="space-y-3">
              {sampleAcquisitions.map((order) => (
                <div
                  key={order.id}
                  className="p-4 sm:p-5 rounded-2xl bg-surface-container-lowest border border-surface-container shadow-subtle hover:shadow transition-shadow flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4"
                >
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-primary">
                        {order.id}
                      </span>
                      <span className="text-on-surface-variant text-xs">•</span>
                      <span className="text-[11px] sm:text-xs font-label text-on-surface-variant">
                        {order.date}
                      </span>
                    </div>
                    <h4 className="font-headline text-sm sm:text-base font-medium text-on-surface truncate">
                      {order.title}
                    </h4>
                    <p className="text-[11px] sm:text-xs font-label text-secondary font-medium">
                      Status: {order.status}
                    </p>
                  </div>

                  <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-surface-container/60">
                    <span className="font-headline text-base sm:text-lg font-bold text-on-surface">
                      {order.amount}
                    </span>
                    <Link
                      to={`/order-tracking?orderId=${order.id}`}
                      className="px-3 py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-xs font-label font-semibold text-primary transition-colors flex items-center gap-1"
                    >
                      <span>View Docket</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery & Curator Liaison */}
          <div className="lg:col-span-4 space-y-6 w-full max-w-full">
            {/* Registered Address */}
            <div className="p-5 sm:p-6 rounded-3xl bg-surface-container-low border border-surface-container space-y-2.5">
              <div className="flex items-center gap-2 text-on-surface font-headline text-base sm:text-lg">
                <MapPin className="w-4 h-4 text-primary" />
                <span>Primary Gallery Address</span>
              </div>
              <div className="text-xs font-body text-on-surface-variant space-y-1">
                <p className="font-semibold text-on-surface">{user.name}</p>
                <p>{user.shippingAddress?.addressLine}</p>
                <p>
                  {user.shippingAddress?.city}, {user.shippingAddress?.state} — {user.shippingAddress?.pincode}
                </p>
                <p>Phone: {user.phone}</p>
              </div>
            </div>

            {/* Curatorial Liaison Card */}
            <div className="p-5 sm:p-6 rounded-3xl bg-secondary-container/60 border border-surface-container space-y-2.5">
              <div className="flex items-center gap-2 text-primary font-semibold text-xs font-label uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                <span>Private Curator Liaison</span>
              </div>
              <p className="text-xs font-body text-on-surface-variant leading-relaxed">
                Need bespoke sizes, custom museum gold leaf framing, or archival curation for an entire residence?
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 text-xs font-label font-bold text-primary hover:underline"
              >
                <span>Schedule Salon Consultation →</span>
              </Link>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
