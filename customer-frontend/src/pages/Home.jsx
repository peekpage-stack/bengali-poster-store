import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ShieldCheck,
  Award,
  Truck,
  Sparkles,
  Layers,
  ChevronRight,
  Palette,
  CheckCircle2,
  Star
} from 'lucide-react';
import ProductCard from '../components/ProductCard';
import FrameVisualizer from '../components/FrameVisualizer';
import {
  MOCK_PRODUCTS,
  MOCK_COLLECTIONS,
  PRODUCT_SIZES,
  FRAME_FINISHES,
  MAT_OPTIONS
} from '../services/api';

export default function Home() {
  const [selectedFilter, setSelectedFilter] = useState('All');

  // Interactive Frame Visualizer preview on homepage
  const [demoSize, setDemoSize] = useState(PRODUCT_SIZES[1]);
  const [demoFrame, setDemoFrame] = useState(FRAME_FINISHES[1]);
  const [demoMat, setDemoMat] = useState(MAT_OPTIONS[1]);

  const categories = ['All', 'Cinema', 'Heritage', 'Literature', 'Folk Art'];

  const filteredArtworks = selectedFilter === 'All'
    ? MOCK_PRODUCTS
    : MOCK_PRODUCTS.filter((item) => item.category === selectedFilter);

  return (
    <div className="flex flex-col min-h-screen w-full max-w-full overflow-x-hidden">
      
      {/* 1. HERO SECTION: Curatorial Asymmetric Layered Framing Triptych */}
      <section className="relative overflow-hidden bg-gradient-to-b from-surface via-surface-container-low to-surface py-8 sm:py-12 lg:py-20 border-b border-surface-container w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-8 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-6 space-y-4 sm:space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-container/70 text-on-surface text-[11px] sm:text-xs font-label font-medium tracking-wide">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span>ARCHIVAL ATELIER • CALCUTTA</span>
              </div>

              <div className="space-y-2 sm:space-y-3">
                <span className="font-bengali text-base sm:text-xl text-primary font-medium block">
                  বাংলার সাহিত্য, চলচ্চিত্র ও ঐতিহ্যের দুর্লভ চারুলিপি
                </span>
                <h1 className="font-headline text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-on-surface leading-[1.15]">
                  Bengal’s Poetics, Cinema & Heritage on Your Walls
                </h1>
              </div>

              <p className="text-xs sm:text-sm md:text-base font-body text-on-surface-variant max-w-xl leading-relaxed">
                Remastered archival serigraphs, Satyajit Ray cinema classics, and Tagore manuscripts.
                Hand-printed on museum-grade <strong className="text-on-surface">300 GSM cotton rag</strong> with bespoke plantation teak frames.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-1 sm:pt-2">
                <Link
                  to="/shop"
                  className="w-full sm:w-auto text-center px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl bg-primary hover:bg-primary-hover text-on-primary font-label text-xs sm:text-sm font-semibold tracking-wider flex items-center justify-center gap-2 shadow-subtle transition-all active:scale-95"
                >
                  <span>Explore Exhibition</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/collections"
                  className="w-full sm:w-auto text-center px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-label text-xs sm:text-sm font-medium tracking-wide transition-colors border border-outline-variant/40"
                >
                  Curated Collections
                </Link>
              </div>

              {/* Atelier Trust Badges */}
              <div className="pt-4 sm:pt-6 border-t border-surface-container grid grid-cols-3 gap-2 sm:gap-4 text-xs font-label text-on-surface-variant">
                <div>
                  <span className="block font-bold text-on-surface text-[11px] sm:text-xs">300 GSM</span>
                  <span className="text-[10px] sm:text-[11px]">Cotton Rag Paper</span>
                </div>
                <div>
                  <span className="block font-bold text-on-surface text-[11px] sm:text-xs">100+ Years</span>
                  <span className="text-[10px] sm:text-[11px]">Archival Lucia Inks</span>
                </div>
                <div>
                  <span className="block font-bold text-on-surface text-[11px] sm:text-xs">Solid Teak</span>
                  <span className="text-[10px] sm:text-[11px]">Hand-Waxed Timber</span>
                </div>
              </div>
            </div>

            {/* Right Asymmetrical Layered Triptych (Responsive without horizontal overflow) */}
            <div className="lg:col-span-6 flex items-center justify-center relative min-h-[360px] sm:min-h-[460px] lg:min-h-[500px] w-full max-w-[440px] sm:max-w-none mx-auto overflow-hidden sm:overflow-visible py-4">
              
              {/* Left Angle: Satyer Sandhane */}
              <Link
                to="/product/satyer-sandhane"
                className="group absolute left-0 sm:left-4 top-2 sm:top-8 w-36 sm:w-48 lg:w-56 bg-surface-container-lowest p-2 sm:p-3 rounded-xl shadow-xl -rotate-6 transition-all duration-500 hover:rotate-0 hover:z-30 hover:scale-105 border border-surface-container block"
              >
                <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-surface-container">
                  <img
                    src="/posters/satyer-sandhane.jpg"
                    alt="সত্যের সন্ধানে (Satyer Sandhane)"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute bottom-1.5 left-1.5 px-1.5 py-0.5 bg-primary/90 text-white rounded font-label text-[8px] uppercase font-bold">
                    Byomkesh
                  </div>
                </div>
                <div className="pt-1.5 text-center">
                  <p className="font-headline text-xs sm:text-sm font-medium text-on-surface line-clamp-1">সত্যের সন্ধানে</p>
                  <p className="font-label text-[9px] sm:text-[10px] text-on-surface-variant uppercase line-clamp-1">Satyer Sandhane</p>
                </div>
              </Link>

              {/* Right Angle: Ek Minute - Jatayu */}
              <Link
                to="/product/ek-minute"
                className="group absolute right-0 sm:right-4 bottom-2 sm:bottom-8 w-36 sm:w-48 lg:w-56 bg-surface-container-lowest p-2 sm:p-3 rounded-xl shadow-xl rotate-6 transition-all duration-500 hover:rotate-0 hover:z-30 hover:scale-105 border border-surface-container block"
              >
                <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-surface-container">
                  <img
                    src="/posters/ek-minute.jpg"
                    alt="এক মিনিট (Ek Minute - Jatayu)"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute bottom-1.5 right-1.5 px-1.5 py-0.5 bg-primary/90 text-white rounded font-label text-[8px] uppercase font-bold">
                    Jatayu
                  </div>
                </div>
                <div className="pt-1.5 text-center">
                  <p className="font-headline text-xs sm:text-sm font-medium text-on-surface line-clamp-1">এক মিনিট (জটায়ু)</p>
                  <p className="font-label text-[9px] sm:text-[10px] text-on-surface-variant uppercase line-clamp-1">Ek Minute • Ray Series</p>
                </div>
              </Link>

              {/* Centerpiece: Feluda Masterpiece */}
              <Link
                to="/product/feluda"
                className="group relative z-20 w-44 sm:w-56 lg:w-64 bg-surface-container-lowest p-2.5 sm:p-3.5 rounded-xl shadow-2xl transition-all duration-500 hover:scale-105 border border-surface-container block"
              >
                <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-surface-container">
                  <img
                    src="/posters/feluda.jpg"
                    alt="ফেলুদা (Feluda) Masterpiece"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-2 right-2 flex items-center gap-1 bg-surface-container-lowest/90 px-2 py-0.5 rounded text-tertiary font-label text-[9px] font-bold uppercase shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-tertiary" /> Masterpiece
                  </div>
                </div>
                <div className="pt-2 sm:pt-3 text-center">
                  <h3 className="font-headline text-sm sm:text-base font-semibold text-on-surface line-clamp-1">ফেলুদা (Feluda)</h3>
                  <p className="font-label text-[9px] sm:text-[10px] text-on-surface-variant uppercase tracking-wider line-clamp-1">
                    Satyajit Ray Canon • 300 GSM
                  </p>
                </div>
              </Link>

            </div>
          </div>
        </div>
      </section>

      {/* 2. CURATED COLLECTIONS ARCHIVES */}
      <section className="py-12 sm:py-20 bg-surface w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 w-full">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12 gap-3">
            <div>
              <span className="font-label text-xs uppercase tracking-widest text-primary font-bold">
                Archival Folios
              </span>
              <h2 className="font-headline text-2xl sm:text-4xl text-on-surface font-normal mt-1">
                Curated Collections
              </h2>
            </div>
            <Link
              to="/collections"
              className="text-xs font-label uppercase tracking-wider font-semibold text-primary hover:underline flex items-center gap-1"
            >
              <span>Explore All 4 Archives</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {MOCK_COLLECTIONS.map((col) => (
              <Link
                key={col.id}
                to={`/collections/${col.id}`}
                className="group rounded-2xl overflow-hidden bg-surface-container-low shadow-subtle border border-surface-container hover:shadow-atelier transition-all duration-300 flex flex-col justify-between"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-surface-container">
                  <img
                    src={col.heroImage}
                    alt={col.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4 text-white">
                    <span className="font-bengali text-xs text-white/90 block">
                      {col.bengaliName}
                    </span>
                    <h3 className="font-headline text-lg sm:text-xl font-medium leading-tight">
                      {col.name}
                    </h3>
                  </div>
                </div>

                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                  <p className="text-xs text-on-surface-variant line-clamp-2 leading-relaxed">
                    {col.description}
                  </p>
                  <div className="mt-4 pt-3 border-t border-surface-container flex items-center justify-between text-xs font-label">
                    <span className="text-on-surface-variant font-medium">
                      {col.count} Archival Plates
                    </span>
                    <span className="text-primary font-semibold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                      View Folio →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. FEATURED ARTWORKS WITH FILTER TABS */}
      <section className="py-12 sm:py-20 bg-surface-container-low/50 border-y border-surface-container w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 w-full">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <span className="font-label text-xs uppercase tracking-widest text-primary font-bold">
                Bengal Canvas Exhibition
              </span>
              <h2 className="font-headline text-2xl sm:text-4xl text-on-surface font-normal mt-1">
                Featured Art Plates
              </h2>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedFilter(cat)}
                  className={`px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-label transition-all ${
                    selectedFilter === cat
                      ? 'bg-primary text-on-primary font-semibold shadow-xs'
                      : 'bg-surface text-on-surface hover:bg-surface-container border border-surface-container'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Artwork Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {filteredArtworks.slice(0, 8).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-10 sm:mt-12 text-center">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl bg-surface-container-highest hover:bg-surface-container text-on-surface font-label text-xs sm:text-sm font-semibold tracking-wider transition-colors border border-outline-variant/60"
            >
              <span>Explore All Bengal Art Posters</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. INTERACTIVE FRAME VISUALIZER SPOTLIGHT */}
      <section className="py-12 sm:py-20 bg-surface w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            <div className="lg:col-span-5 space-y-4 sm:space-y-5">
              <span className="font-label text-xs uppercase tracking-widest text-primary font-bold">
                Architectural In-Situ Visualizer
              </span>
              <h2 className="font-headline text-2xl sm:text-4xl text-on-surface font-normal leading-tight">
                Preview Real Plantation Teak & Room Scales Before Acquiring
              </h2>
              <p className="text-xs sm:text-sm font-body text-on-surface-variant leading-relaxed">
                Every home has its own atmospheric light. Test how our museum-grade archival plates look inside a Calcutta study with warm brass, a sunlit Scandinavian lounge, or a clean white gallery wall.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-primary mt-0.5 flex-shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-label font-bold text-on-surface">Precision Mitered Corner Joints</h4>
                    <p className="text-[11px] text-on-surface-variant">Hand-waxed solid teakwood that matures with a natural deep luster.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-primary mt-0.5 flex-shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-label font-bold text-on-surface">Acid-Free Bevel Cut Passe-Partout</h4>
                    <p className="text-[11px] text-on-surface-variant">Prevents pigment contact with glass, ensuring 100+ year conservation.</p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to={`/product/${MOCK_PRODUCTS[0].id}`}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-on-primary font-label text-xs font-semibold hover:bg-primary-hover transition-colors"
                >
                  <span>Customize This Byomkesh Print</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7 w-full max-w-full">
              <FrameVisualizer
                product={MOCK_PRODUCTS[0]}
                selectedSize={demoSize}
                setSelectedSize={setDemoSize}
                selectedFrame={demoFrame}
                setSelectedFrame={setDemoFrame}
                selectedMat={demoMat}
                setSelectedMat={setDemoMat}
              />
            </div>

          </div>
        </div>
      </section>

      {/* 5. THE ATELIER STANDARD */}
      <section className="py-12 sm:py-20 bg-surface-container text-on-surface border-t border-surface-container-high w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 text-center w-full">
          <span className="font-label text-xs uppercase tracking-widest text-primary font-bold">
            Curatorial Manifesto
          </span>
          <h2 className="font-headline text-2xl sm:text-4xl font-normal mt-1 mb-3">
            The Archival Atelier Standard
          </h2>
          <p className="text-xs sm:text-sm font-body text-on-surface-variant max-w-2xl mx-auto mb-10 sm:mb-14">
            We don't print on commercial poster gloss or synthetic banner vinyl. Every plate leaving our Calcutta workshop honors museum conservation criteria.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            <div className="p-5 sm:p-6 rounded-2xl bg-surface shadow-subtle border border-surface-container">
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                <Palette className="w-5 h-5" />
              </div>
              <h3 className="font-headline text-lg font-semibold text-on-surface">
                300 GSM Heavy Rag
              </h3>
              <p className="text-xs font-body text-on-surface-variant mt-2 leading-relaxed">
                100% long-staple cotton fiber, acid-free and optical-brightener-free (OBA-free) for authentic natural warm cream texture.
              </p>
            </div>

            <div className="p-5 sm:p-6 rounded-2xl bg-surface shadow-subtle border border-surface-container">
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-headline text-lg font-semibold text-on-surface">
                12-Color Giclée
              </h3>
              <p className="text-xs font-body text-on-surface-variant mt-2 leading-relaxed">
                Ultra-high-definition micro-pigment droplets capture vintage letterpress ink variations and deep velvety monochrome blacks.
              </p>
            </div>

            <div className="p-5 sm:p-6 rounded-2xl bg-surface shadow-subtle border border-surface-container">
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="font-headline text-lg font-semibold text-on-surface">
                Plantation Teak Timber
              </h3>
              <p className="text-xs font-body text-on-surface-variant mt-2 leading-relaxed">
                Sustainably harvested Bengal teak wood, kiln-dried and polished by hereditary woodworkers in north Kolkata workshops.
              </p>
            </div>

            <div className="p-5 sm:p-6 rounded-2xl bg-surface shadow-subtle border border-surface-container">
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="font-headline text-lg font-semibold text-on-surface">
                Embossed Proof Seal
              </h3>
              <p className="text-xs font-body text-on-surface-variant mt-2 leading-relaxed">
                Each print run is individually inspected and stamped with the PeekPage archival wax/metallic seal certifying authenticity.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
