import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Heart,
  ShoppingBag,
  ShieldCheck,
  Award,
  Truck,
  RotateCcw,
  Share2,
  Star,
  ChevronRight
} from 'lucide-react';
import FrameVisualizer from '../components/FrameVisualizer';
import ProductCard from '../components/ProductCard';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import {
  productsApi,
  PRODUCT_SIZES,
  FRAME_FINISHES,
  MAT_OPTIONS,
  MOCK_PRODUCTS
} from '../services/api';

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart, calculateUnitPrice } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // Customization state
  const [selectedSize, setSelectedSize] = useState(PRODUCT_SIZES[1]); // Default A2
  const [selectedFrame, setSelectedFrame] = useState(FRAME_FINISHES[0]); // Default unframed
  const [selectedMat, setSelectedMat] = useState(MAT_OPTIONS[0]); // Default flush
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('provenance');
  const [copiedNotice, setCopiedNotice] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    productsApi.getById(id).then((data) => {
      setProduct(data);
      setLoading(false);
    });
  }, [id]);

  if (loading || !product) {
    return (
      <div className="min-h-screen py-20 flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="font-headline text-lg text-on-surface">Consulting Archival Folio...</p>
        </div>
      </div>
    );
  }

  const isFavorited = isInWishlist(product.id);
  const currentPrice = calculateUnitPrice
    ? calculateUnitPrice(product.price || 69, selectedSize, selectedFrame, selectedMat)
    : (selectedSize?.id ? getPosterBasePrice(selectedSize.id) : 69);
  const currentOriginalPrice = Math.round(
    (product.originalPrice || 99) * (selectedSize?.priceMultiplier || 1) + (selectedFrame?.price || 0) + (selectedMat?.price || 0)
  );

  const handleAddToCart = () => {
    addToCart(product, {
      size: selectedSize,
      frame: selectedFrame,
      mat: selectedMat,
      quantity,
    });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedNotice(true);
    setTimeout(() => setCopiedNotice(false), 2500);
  };

  const relatedProducts = MOCK_PRODUCTS.filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <div className="min-h-screen pb-16 sm:pb-20 bg-surface w-full max-w-full overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 w-full">
        
        {/* Curatorial Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs font-label text-on-surface-variant uppercase tracking-wider my-4 sm:my-6 truncate">
          <Link to="/" className="hover:text-primary transition-colors flex-shrink-0">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-primary transition-colors flex-shrink-0">Catalog</Link>
          <span>/</span>
          <span className="text-primary font-semibold truncate max-w-[150px] sm:max-w-xs">{product.title}</span>
        </nav>

        {/* 2-Column Art Layout: Left Visualizer & Right Purchase Architecture */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start w-full">
          
          {/* Left Column: Interactive Frame Visualizer */}
          <div className="lg:col-span-7 w-full max-w-full">
            <FrameVisualizer
              product={product}
              selectedSize={selectedSize}
              setSelectedSize={setSelectedSize}
              selectedFrame={selectedFrame}
              setSelectedFrame={setSelectedFrame}
              selectedMat={selectedMat}
              setSelectedMat={setSelectedMat}
            />
          </div>

          {/* Right Column: Title, Provenance, Specs, Pricing & Add to Bag */}
          <div className="lg:col-span-5 flex flex-col gap-5 sm:gap-6 w-full max-w-full">
            
            {/* Header / Badges */}
            <div className="space-y-2.5 pb-5 sm:pb-6 border-b border-surface-container">
              <div className="flex items-center justify-between gap-2">
                <span className="px-2.5 sm:px-3 py-1 rounded-full bg-secondary-container text-on-surface text-[10px] sm:text-xs font-label uppercase font-bold tracking-widest truncate">
                  {product.collection}
                </span>
                <span className="text-[10px] sm:text-[11px] font-label uppercase tracking-widest text-primary font-semibold flex-shrink-0">
                  {product.edition || 'Curatorial Proof'}
                </span>
              </div>

              <h1 className="font-headline text-2xl sm:text-4xl text-on-surface font-normal leading-tight">
                {product.title}
              </h1>

              <p className="font-bengali text-sm sm:text-lg text-primary font-medium">
                {product.bengaliTitle}
              </p>

              {/* Rating & Reviews */}
              <div className="flex items-center gap-2 sm:gap-3 pt-1">
                <div className="flex items-center text-amber-600">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span className="text-xs font-label font-bold text-on-surface">{product.rating}</span>
                <span className="text-xs font-label text-on-surface-variant">
                  ({product.reviewsCount} Patron Reviews)
                </span>
              </div>
            </div>

            {/* Pricing Summary */}
            <div className="p-4 sm:p-5 rounded-2xl bg-surface-container-low border border-surface-container flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-label tracking-widest text-on-surface-variant block">
                  Current Acquisition Value
                </span>
                <div className="flex items-baseline gap-2 sm:gap-3 mt-1">
                  <span className="font-headline text-2xl sm:text-3xl font-semibold text-on-surface">
                    ₹{currentPrice * quantity}
                  </span>
                  <span className="text-xs sm:text-sm font-label text-on-surface-variant/60 line-through">
                    ₹{currentOriginalPrice * quantity}
                  </span>
                </div>
              </div>

              <div className="text-right">
                <span className="inline-block px-2 sm:px-2.5 py-1 rounded-md bg-tertiary/10 text-tertiary font-label text-[10px] sm:text-xs font-bold uppercase tracking-wider">
                  Heritage Offer
                </span>
                <p className="text-[10px] text-on-surface-variant mt-0.5">Free Express Dispatch</p>
              </div>
            </div>

            {/* Synopsis Brief */}
            <p className="text-xs sm:text-sm font-body text-on-surface-variant leading-relaxed">
              {product.synopsis}
            </p>

            {/* Quantity Stepper & Add to Bag CTA */}
            <div className="space-y-3 pt-1 sm:pt-2">
              <div className="flex flex-wrap xs:flex-nowrap items-center gap-2 sm:gap-3">
                {/* Quantity */}
                <div className="flex items-center bg-surface-container-low border border-surface-container rounded-xl p-1 flex-shrink-0">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center text-on-surface hover:bg-surface transition-colors font-bold text-base sm:text-lg"
                    aria-label="Decrease"
                  >
                    -
                  </button>
                  <span className="w-8 sm:w-10 text-center font-label text-xs sm:text-sm font-bold text-on-surface">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center text-on-surface hover:bg-surface transition-colors font-bold text-base sm:text-lg"
                    aria-label="Increase"
                  >
                    +
                  </button>
                </div>

                {/* Add to Bag Button */}
                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-3 sm:py-3.5 px-4 sm:px-6 rounded-xl bg-primary hover:bg-primary-hover text-on-primary font-label text-xs sm:text-sm font-semibold tracking-wider flex items-center justify-center gap-1.5 sm:gap-2 shadow-subtle transition-all active:scale-95 whitespace-nowrap min-w-[140px]"
                >
                  <ShoppingBag className="w-4 h-4 flex-shrink-0" />
                  <span>Add to Bag • ₹{currentPrice * quantity}</span>
                </button>

                {/* Wishlist Button */}
                <button
                  onClick={() => toggleWishlist(product)}
                  className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl border flex items-center justify-center transition-all flex-shrink-0 ${
                    isFavorited
                      ? 'bg-tertiary text-white border-tertiary'
                      : 'bg-surface border-surface-container text-on-surface hover:text-tertiary'
                  }`}
                  aria-label="Add to Wishlist"
                  title="Save to Personal Folio"
                >
                  <Heart className={`w-4 h-4 sm:w-5 sm:h-5 ${isFavorited ? 'fill-current' : ''}`} />
                </button>

                {/* Share Button */}
                <button
                  onClick={handleShare}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-surface border border-surface-container flex items-center justify-center text-on-surface hover:text-primary transition-colors flex-shrink-0"
                  title="Share Artwork Link"
                >
                  <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>

              {copiedNotice && (
                <p className="text-xs text-secondary font-label text-center">
                  Artwork link copied to clipboard!
                </p>
              )}
            </div>

            {/* Atelier Guarantees Strip */}
            <div className="grid grid-cols-2 gap-2 sm:gap-3 pt-3 sm:pt-4 border-t border-surface-container text-[11px] sm:text-xs font-label text-on-surface-variant">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="truncate">Provenance Wax Seal</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="truncate">Archival Packaging</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="truncate">300 GSM Cotton Rag</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="truncate">Transit Guarantee</span>
              </div>
            </div>

            {/* Curatorial Tabs */}
            <div className="mt-2 pt-4 border-t border-surface-container">
              <div className="flex border-b border-surface-container text-xs font-label overflow-x-auto scrollbar-none">
                <button
                  onClick={() => setActiveTab('provenance')}
                  className={`pb-2.5 px-3 sm:px-4 font-semibold whitespace-nowrap transition-colors relative ${
                    activeTab === 'provenance'
                      ? 'text-primary'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  Provenance & Heritage
                  {activeTab === 'provenance' && (
                    <span className="absolute bottom-0 inset-x-0 h-0.5 bg-primary" />
                  )}
                </button>
                <button
                  onClick={() => setActiveTab('specs')}
                  className={`pb-2.5 px-3 sm:px-4 font-semibold whitespace-nowrap transition-colors relative ${
                    activeTab === 'specs'
                      ? 'text-primary'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  Material Specs
                  {activeTab === 'specs' && (
                    <span className="absolute bottom-0 inset-x-0 h-0.5 bg-primary" />
                  )}
                </button>
                <button
                  onClick={() => setActiveTab('transit')}
                  className={`pb-2.5 px-3 sm:px-4 font-semibold whitespace-nowrap transition-colors relative ${
                    activeTab === 'transit'
                      ? 'text-primary'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  Transit & Dispatch
                  {activeTab === 'transit' && (
                    <span className="absolute bottom-0 inset-x-0 h-0.5 bg-primary" />
                  )}
                </button>
              </div>

              <div className="py-4 text-xs font-body text-on-surface-variant leading-relaxed space-y-2">
                {activeTab === 'provenance' && (
                  <div>
                    <p>{product.curatorNotes}</p>
                    <p className="mt-2 text-on-surface font-medium">
                      Archival Catalog SKU: {product.sku}
                    </p>
                  </div>
                )}
                {activeTab === 'specs' && (
                  <ul className="space-y-1.5">
                    <li>• Paper: {product.paperSpec || '300 GSM Archival Heavyweight Matte Paper'}</li>
                    <li>• Print Method: 12-color archival Lucia Pro pigment inking</li>
                    <li>• Lightfastness: Rated 100+ years in typical interior ambient light</li>
                    <li>• Glass: 2mm optical float glass on framed editions</li>
                    <li>• Backing: 100% acid-free barrier board with moisture seal</li>
                  </ul>
                )}
                {activeTab === 'transit' && (
                  <div>
                    <p>
                      Each unframed print is rolled between layers of acid-free glassine paper inside a 3-ply heavy spiral wound kraft tube. Framed orders ship within bespoke padded wooden corner crates with shatter-proof bubble wrapping.
                    </p>
                    <p className="mt-2 text-primary font-semibold">
                      Estimated dispatch: 24 to 48 hours from our Kolkata atelier.
                    </p>
                  </div>
                )}
              </div>
            </div>

          </div>

        </div>

        {/* Related Curated Artworks */}
        <div className="mt-16 sm:mt-24 pt-8 sm:pt-12 border-t border-surface-container">
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <div>
              <span className="font-label text-xs uppercase tracking-widest text-primary font-bold">
                From The Same Archival Vault
              </span>
              <h2 className="font-headline text-xl sm:text-3xl text-on-surface font-normal mt-1">
                You May Also Appraise
              </h2>
            </div>
            <Link
              to="/shop"
              className="text-xs font-label uppercase tracking-wider font-semibold text-primary hover:underline flex items-center gap-1"
            >
              <span>Catalog</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
