import React from 'react';
import { Link } from 'react-router-dom';
import { Award, ShieldCheck, Truck, RefreshCw, Send } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-surface-container text-on-surface pt-16 pb-12 border-t border-surface-container-high mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        {/* Top Heritage Callout */}
        <div className="pb-12 border-b border-outline-variant/40 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <span className="font-bengali text-lg text-primary font-medium block">
              "শিল্প ও সংস্কৃতি যখন ঘরের দেওয়ালে জীবন্ত হয়ে ওঠে"
            </span>
            <p className="text-xs sm:text-sm font-body text-on-surface-variant leading-relaxed">
              PeekPage is an independent art atelier based in Kolkata, dedicated to preserving, remastering, and printing Bengal's cinematic, literary, and folk visual heritage on 300 GSM archival cotton rag.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2.5">
              <Award className="w-5 h-5 text-primary" />
              <div className="text-left font-label">
                <span className="block text-xs font-semibold">12-Color Pigment</span>
                <span className="block text-[10px] text-on-surface-variant">Archival Giclée Inking</span>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-5 h-5 text-primary" />
              <div className="text-left font-label">
                <span className="block text-xs font-semibold">100+ Years Life</span>
                <span className="block text-[10px] text-on-surface-variant">Acid-Free Cotton Rag</span>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <Truck className="w-5 h-5 text-primary" />
              <div className="text-left font-label">
                <span className="block text-xs font-semibold">Pan-India Express</span>
                <span className="block text-[10px] text-on-surface-variant">Insured Packaging</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Column Navigation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 py-12 border-b border-outline-variant/40">
          
          {/* Col 1 & 2: Brand Story & Newsletter */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-block group">
              <img
                src="/logo.png"
                alt="Peel page Customised Gift Store"
                className="h-10 w-auto object-contain transition-transform group-hover:scale-105"
              />
            </Link>
            <p className="text-xs text-on-surface-variant leading-relaxed max-w-sm">
              Receive limited folio announcements, centenary art drops, and curatorial essays directly to your inbox.
            </p>
            <form onSubmit={(e) => { e.preventDefault(); alert('Thank you for subscribing to the Bengal Art Patron Folio!'); }} className="flex max-w-sm">
              <input
                type="email"
                required
                placeholder="patron@banglacanvas.art"
                className="bg-surface text-on-surface text-xs px-3.5 py-2.5 rounded-l-lg border border-outline-variant outline-none focus:border-primary flex-1 placeholder:text-outline"
              />
              <button
                type="submit"
                className="bg-primary hover:bg-primary-hover text-on-primary px-4 rounded-r-lg font-label text-xs font-semibold tracking-wider flex items-center justify-center transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* Col 3: Curated Collections */}
          <div className="space-y-3">
            <h4 className="font-label text-xs uppercase tracking-widest text-on-surface font-bold">
              Collections
            </h4>
            <ul className="space-y-2 text-xs font-label text-on-surface-variant">
              <li>
                <Link to="/collections/ray-canon" className="hover:text-primary transition-colors">
                  Satyajit Ray Canon
                </Link>
              </li>
              <li>
                <Link to="/collections/calcutta-tramways" className="hover:text-primary transition-colors">
                  Vintage Calcutta Streetscapes
                </Link>
              </li>
              <li>
                <Link to="/collections/tagore-literature" className="hover:text-primary transition-colors">
                  Tagore & Literary Folios
                </Link>
              </li>
              <li>
                <Link to="/collections/folk-modernism" className="hover:text-primary transition-colors">
                  Jamini Roy & Folk Art
                </Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-primary transition-colors font-medium text-primary">
                  View Full Catalog →
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Archival Specifications */}
          <div className="space-y-3">
            <h4 className="font-label text-xs uppercase tracking-widest text-on-surface font-bold">
              Archival Standards
            </h4>
            <ul className="space-y-2 text-xs font-label text-on-surface-variant">
              <li>
                <span className="text-on-surface font-medium">300 GSM Cotton:</span> Heavy etched matte
              </li>
              <li>
                <span className="text-on-surface font-medium">Pigment Inks:</span> 12-color archival ink
              </li>
              <li>
                <span className="text-on-surface font-medium">Plantation Teak:</span> Hand-waxed frames
              </li>
              <li>
                <span className="text-on-surface font-medium">Mats:</span> Acid-free bevel cut mounts
              </li>
              <li>
                <span className="text-on-surface font-medium">Sealed Proof:</span> Embossed atelier seal
              </li>
            </ul>
          </div>

          {/* Col 5: Patron Services */}
          <div className="space-y-3">
            <h4 className="font-label text-xs uppercase tracking-widest text-on-surface font-bold">
              Patron Services
            </h4>
            <ul className="space-y-2 text-xs font-label text-on-surface-variant">
              <li>
                <Link to="/order-tracking" className="hover:text-primary transition-colors">
                  Track Archival Transit
                </Link>
              </li>
              <li>
                <Link to="/account" className="hover:text-primary transition-colors">
                  Collector Dossier
                </Link>
              </li>
              <li>
                <Link to="/faqs" className="hover:text-primary transition-colors">
                  Archival FAQs & Care
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-primary transition-colors">
                  Curatorial Manifesto
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-primary transition-colors">
                  Atelier Concierge
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Rights & Calcutta Atelier Emblem */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs font-label text-on-surface-variant gap-4">
          <p>© {new Date().getFullYear()} PeekPage Art Atelier Pvt. Ltd. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Crafted with pride in Kolkata, India</span>
            <span className="text-outline-variant">•</span>
            <Link to="/about" className="hover:text-primary transition-colors">Provenance Terms</Link>
            <span className="text-outline-variant">•</span>
            <Link to="/faqs" className="hover:text-primary transition-colors">Shipping & Returns</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
