import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';
import {
  ShoppingBag,
  Heart,
  User,
  Search,
  Menu,
  X,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';
import { MOCK_PRODUCTS } from '../services/api';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { openCart, itemsCount } = useCart();
  const { user, isAuthenticated } = useAuth();
  const { count: wishlistCount } = useWishlist();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop Catalog', path: '/shop' },
    { name: 'Collections', path: '/collections' },
    { name: 'Our Story', path: '/about' },
    { name: 'Archival FAQs', path: '/faqs' },
    { name: 'Concierge', path: '/contact' },
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchOpen(false);
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const handleQuickSelect = (productId) => {
    setSearchOpen(false);
    navigate(`/product/${productId}`);
  };

  const filteredPreview = searchQuery.trim()
    ? MOCK_PRODUCTS.filter(
        (p) =>
          p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.bengaliTitle.includes(searchQuery) ||
          p.collection.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 4)
    : [];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 shadow-nav w-full max-w-full">
        {/* Top Announcement Bar */}
        <div className="bg-primary text-on-primary py-1.5 sm:py-2 px-3 sm:px-4 text-center select-none text-[10px] sm:text-[11px] font-label font-medium tracking-wider sm:tracking-widest uppercase overflow-hidden">
          <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 sm:gap-3 truncate">
            <span className="hidden md:inline">PAN-INDIA FREE EXPRESS DELIVERY OVER ₹999</span>
            <span className="hidden md:inline opacity-60">•</span>
            <span>MUSEUM-GRADE 300 GSM COTTON RAG</span>
            <span className="opacity-60">•</span>
            <span className="font-bold underline tracking-wider cursor-pointer hover:opacity-90">
              USE CODE: BENGAL10
            </span>
          </div>
        </div>

        {/* Main Header */}
        <div className="glass-nav border-b border-surface-container px-3 sm:px-8 lg:px-12 h-16 sm:h-20 transition-all duration-300">
          <div className="max-w-7xl mx-auto h-full flex items-center justify-between gap-2 sm:gap-6">
            
            {/* Left: Mobile Hamburger & Brand */}
            <div className="flex items-center gap-2 sm:gap-4">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-1.5 -ml-1 text-on-surface hover:text-primary transition-colors focus:outline-none"
                aria-label="Open Navigation Menu"
              >
                <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              <Link to="/" className="flex items-center gap-2 group py-1">
                <img
                  src="/logo.png"
                  alt="Peel page Customised Gift Store"
                  className="h-8 sm:h-10 w-auto object-contain transition-transform group-hover:scale-105"
                  onError={(e) => {
                    // Fallback to logo-badge if needed
                    e.currentTarget.src = '/logo-badge.png';
                  }}
                />
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-[13px] font-label tracking-wide">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`transition-colors relative py-1 ${
                      isActive
                        ? 'text-primary font-semibold'
                        : 'text-on-surface-variant hover:text-on-surface'
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary rounded-full" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right Action Icons */}
            <div className="flex items-center gap-1.5 sm:gap-3">
              {/* Search Icon */}
              <button
                onClick={() => setSearchOpen(true)}
                className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full hover:bg-surface-container transition-colors text-on-surface-variant hover:text-on-surface"
                aria-label="Search Catalog"
              >
                <Search className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              {/* Wishlist Icon */}
              <Link
                to="/wishlist"
                className="relative w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full hover:bg-surface-container transition-colors text-on-surface-variant hover:text-on-surface"
                aria-label="Wishlist"
              >
                <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute top-0.5 right-0.5 sm:top-1 sm:right-1 w-4 h-4 rounded-full bg-tertiary text-white text-[9px] sm:text-[10px] font-bold flex items-center justify-center leading-none">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Account Link */}
              <Link
                to={isAuthenticated ? "/account" : "/login"}
                className="hidden sm:flex items-center gap-2 p-1.5 px-3 rounded-full hover:bg-surface-container transition-colors text-on-surface-variant hover:text-on-surface text-xs font-label"
              >
                <div className="w-7 h-7 rounded-full bg-surface-container-high flex items-center justify-center text-primary">
                  <User className="w-4 h-4" />
                </div>
                <span className="hidden xl:inline font-medium">
                  {isAuthenticated ? user?.name?.split(' ')[0] : 'Sign In'}
                </span>
              </Link>

              {/* Cart Drawer Trigger */}
              <button
                onClick={openCart}
                className="relative flex items-center gap-1.5 sm:gap-2.5 py-1.5 sm:py-2 px-2.5 sm:px-3.5 rounded-full bg-primary text-on-primary hover:bg-primary-hover shadow-subtle transition-all transform active:scale-95"
                aria-label="Open Shopping Bag"
              >
                <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="font-label text-[11px] sm:text-xs font-bold tracking-wider">
                  <span className="hidden xs:inline">BAG </span>({itemsCount})
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Slide-Out Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed top-0 left-0 bottom-0 w-[85%] max-w-xs bg-surface p-6 shadow-2xl flex flex-col justify-between z-10 animate-in slide-in-from-left duration-300">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-surface-container">
                <Link to="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center">
                  <img
                    src="/logo.png"
                    alt="Peel page Customised Gift Store"
                    className="h-8 w-auto object-contain"
                  />
                </Link>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 rounded text-on-surface-variant hover:text-on-surface"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <nav className="mt-6 flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-sm font-label font-medium text-on-surface hover:text-primary transition-colors py-2.5 border-b border-surface-container/50 flex items-center justify-between"
                  >
                    <span>{link.name}</span>
                    <ArrowRight className="w-3.5 h-3.5 opacity-40" />
                  </Link>
                ))}
                <Link
                  to={isAuthenticated ? "/account" : "/login"}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-label font-medium text-primary py-3 flex items-center gap-2 mt-2"
                >
                  <User className="w-4 h-4" />
                  <span>{isAuthenticated ? 'Collector Dossier' : 'Sign In as Patron'}</span>
                </Link>
              </nav>
            </div>

            <div className="p-4 rounded-xl bg-surface-container text-xs font-label space-y-1.5">
              <div className="flex items-center gap-2 text-primary font-semibold">
                <ShieldCheck className="w-4 h-4" />
                <span>300 GSM Cotton Archival Inking</span>
              </div>
              <p className="text-on-surface-variant leading-relaxed text-[10px]">
                Authentic Bengal art lithographs and posters hand-assembled in Kolkata.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Search Overlay Modal */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-3 sm:px-4">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-md"
            onClick={() => setSearchOpen(false)}
          />
          <div className="relative w-full max-w-2xl bg-surface rounded-2xl shadow-2xl p-4 sm:p-6 border border-surface-container z-10 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-surface-container">
              <div className="flex items-center gap-2 sm:gap-3 flex-1">
                <Search className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
                <form onSubmit={handleSearchSubmit} className="flex-1">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search Ray, Tagore, Tramway, Jamini..."
                    className="w-full bg-transparent text-on-surface font-body text-sm sm:text-base outline-none placeholder:text-outline"
                    autoFocus
                  />
                </form>
              </div>
              <button
                onClick={() => setSearchOpen(false)}
                className="p-1 rounded-full text-on-surface-variant hover:text-on-surface"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Live Search Suggestions */}
            {searchQuery.trim() ? (
              <div className="mt-4">
                <p className="text-[10px] sm:text-xs font-label uppercase tracking-widest text-on-surface-variant mb-2">
                  Matching Artworks ({filteredPreview.length})
                </p>
                {filteredPreview.length > 0 ? (
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {filteredPreview.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => handleQuickSelect(item.id)}
                        className="flex items-center gap-3 sm:gap-4 p-2 rounded-xl hover:bg-surface-container cursor-pointer transition-colors"
                      >
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-10 h-12 sm:w-12 sm:h-14 object-cover rounded shadow-sm flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-headline text-sm sm:text-base text-on-surface truncate">
                            {item.title}
                          </h4>
                          <p className="text-[11px] text-on-surface-variant truncate">
                            {item.bengaliTitle} • {item.collection}
                          </p>
                        </div>
                        <span className="font-headline text-sm sm:text-base font-semibold text-primary">
                          ₹{item.price}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs sm:text-sm text-on-surface-variant py-4 text-center">
                    No artworks found matching "{searchQuery}". Try searching "Ray", "Tram", or "Tagore".
                  </p>
                )}
              </div>
            ) : (
              <div className="mt-4">
                <p className="text-[10px] sm:text-xs font-label uppercase tracking-widest text-on-surface-variant mb-2">
                  Curator Recommendations
                </p>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {['Satyajit Ray', 'Charulata', 'Kolkata Tramway', 'Gitanjali', 'Jamini Roy', 'Apu Trilogy'].map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setSearchQuery(tag)}
                      className="px-2.5 py-1 rounded-full bg-surface-container text-xs font-label text-on-surface hover:bg-surface-container-high transition-colors"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
