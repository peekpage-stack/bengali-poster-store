import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck } from 'lucide-react';

export default function OurStory() {
  return (
    <div className="min-h-screen pb-16 sm:pb-20 bg-surface w-full max-w-full overflow-x-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-8 w-full">
        
        {/* Curatorial Manifesto Header */}
        <div className="text-center space-y-3 sm:space-y-4 py-6 sm:py-8 border-b border-surface-container">
          <span className="font-bengali text-sm sm:text-base text-primary block">
            আমাদের দর্শন ও সংকল্প
          </span>
          <h1 className="font-headline text-3xl sm:text-5xl lg:text-6xl text-on-surface font-normal tracking-tight">
            The PeekPage Curatorial Manifesto
          </h1>
          <p className="font-label text-[11px] sm:text-xs uppercase tracking-widest text-on-surface-variant max-w-xl mx-auto">
            Honoring Bengal's Print Culture • 19th Century Battala to Satyajit Ray’s Centenary
          </p>
        </div>

        {/* Narrative Article */}
        <article className="prose prose-stone max-w-none py-8 sm:py-12 space-y-6 sm:space-y-8 text-on-surface font-body text-xs sm:text-base leading-relaxed">
          <p className="font-headline text-lg sm:text-2xl italic text-on-surface leading-snug">
            "We believe Bengal’s intellectual grandeur was never meant to remain locked in archival vaults or academic libraries. It belongs on the living room walls of people who love stories, literature, and cinema."
          </p>

          <p>
            From the 1820s Battala woodcut printers along the Hooghly river to Satyajit Ray hand-lettering typography for <em>Sandesh</em> and his landmark film title cards, Bengal has possessed one of the world's most distinctive graphic design traditions. It married Victorian typography with terracotta relief geometry, calligraphic brushstrokes, and literary modernism.
          </p>

          {/* Highlight Image Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 my-6 sm:my-10 not-prose">
            <div className="rounded-2xl overflow-hidden bg-surface-container shadow-subtle border border-surface-container">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDBC73v1QzaVohJigazmPT7vbP8d7TrsyJTqngqrG8ifEsDcWJQ_xXDyB9272x63EuOxW79qsVgqRczJjkUKTLtvYDeCC40LmwwJ2iGly1cdLVtx2DNduOVC7-JfTCUztOfNMOyQf3ikC7ftPopduZIxjfNfmtPz8IwEnfyMpcSXTTCdcD15UkaIsWEkdkuu3JQMc2sggrBe8YOUoW5-MNZKjcdW-gF87QqHvyHmQU"
                alt="Vintage College Street Tramway"
                className="w-full aspect-[4/3] object-cover"
              />
              <div className="p-3 sm:p-4 bg-surface-container-low text-xs font-label">
                <span className="font-bold block text-on-surface">Calcutta Press Heritage</span>
                <span className="text-on-surface-variant text-[11px]">Digitally restored from vintage lithographic plates.</span>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden bg-surface-container shadow-subtle border border-surface-container">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDTydFxzoJAjMl6RkBM749Qt21x5SNVU5p_dQXdNRbsm8ddwP0vjZ-pF93XYYSwJNSn6nyVyG4kwp7Uqc1aaBA7AW0sOZXMiTQB_bsUYynl5ShIFw1P4njPuUXZVQNXc9Uw0FrDkaDGoCHu1iyLHc3KzSZMdwZTKeJGrTYM9gSgZjDtwqMBknpVuq8SIiAuG73kpxKVk__tP-NVHcTOW9TGt_9M7ye5oViWxl49f9w"
                alt="Charulata 1964 Masterpiece Serigraph"
                className="w-full aspect-[4/3] object-cover"
              />
              <div className="p-3 sm:p-4 bg-surface-container-low text-xs font-label">
                <span className="font-bold block text-on-surface">Cinematic Poetics</span>
                <span className="text-on-surface-variant text-[11px]">Satyajit Ray centenary serigraph edition.</span>
              </div>
            </div>
          </div>

          <h2 className="font-headline text-xl sm:text-3xl text-on-surface font-normal pt-2">
            Why 300 GSM Cotton Rag Matters
          </h2>
          <p>
            Standard commercial posters are printed on cheap 150 GSM glossy plastic paper that wrinkles with humidity and fades within a few years. PeekPage uses 100% cotton fiber archival rag milled specifically for museum reproduction.
          </p>

          <p>
            It is acid-free, lignin-free, and optical brightener agent (OBA) free. This gives it a warm, tactile cream tone that mimics unbleached handmade paper. Combined with 12-color archival Lucia pigment inks, our prints carry a laboratory-certified life expectancy exceeding 100 years.
          </p>

          <div className="p-5 sm:p-8 rounded-3xl bg-surface-container-low border border-surface-container not-prose my-6 sm:my-10 space-y-3 sm:space-y-4">
            <h3 className="font-headline text-xl sm:text-2xl text-on-surface font-normal">
              Solid Plantation Teak Framing
            </h3>
            <p className="text-xs sm:text-sm font-body text-on-surface-variant leading-relaxed">
              Every wooden frame is custom milled by multi-generational carpenters in north Kolkata. Sourced from sustainable Indian teak plantations, the wood is hand-sanded, stained with natural linseed oil, and joined with traditional mitered corner splines.
            </p>
            <div className="flex items-center gap-2.5 text-xs font-label text-primary font-bold">
              <ShieldCheck className="w-4 h-4 flex-shrink-0" />
              <span>Certified 100% Sustainable Plantation Teak</span>
            </div>
          </div>
        </article>

        {/* Footer CTA */}
        <div className="text-center pt-6 sm:pt-8 border-t border-surface-container">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl bg-primary text-on-primary font-label text-xs sm:text-sm font-semibold hover:bg-primary-hover transition-colors shadow-subtle"
          >
            <span>Explore The Collection</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
}
