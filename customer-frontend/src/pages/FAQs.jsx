import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Search } from 'lucide-react';

const FAQ_ITEMS = [
  {
    category: 'Paper & Printing Standards',
    q: 'What is 300 GSM Archival Cotton Rag, and why is it superior to poster paper?',
    a: 'Unlike mass-market posters printed on thin 150 GSM chemically bleached wood-pulp paper with plastic gloss coatings, our paper is crafted from 100% natural cotton fibers. It is completely acid-free and lignin-free with a tactile velvet matte texture. It never yellows, cracks, or curls in humid weather.',
  },
  {
    category: 'Paper & Printing Standards',
    q: 'How long will the colors and pigments last without fading?',
    a: 'We exclusively use 12-color archival pigment inks (Giclée technology) with micro-encapsulated Lucia Pro formulation. When framed behind glass and kept away from direct continuous midday sunlight, laboratory accelerated weathering tests certify color stability exceeding 100+ years.',
  },
  {
    category: 'Framing & Timber Origin',
    q: 'Where is the teak timber sourced, and how are the frames constructed?',
    a: 'Our solid wood frames are hand-assembled in north Kolkata using sustainably harvested Indian plantation teak. Each frame features precision mitered 45-degree corner splines, sanded smooth and finished with natural beeswax and linseed oil without noxious synthetic varnishes.',
  },
  {
    category: 'Framing & Timber Origin',
    q: 'What is a Passe-Partout / Mat Board, and is it necessary?',
    a: 'A mat board (passe-partout) is an acid-free conservation border that sits between the print and the glass. It creates visual breathing room around the artwork and physically prevents the ink from sticking to the glass over decades of temperature shifts.',
  },
  {
    category: 'Packaging & Transit Safety',
    q: 'How do you ensure safe, damage-free delivery across India?',
    a: 'Unframed posters are rolled between sheets of acid-free glassine paper and shipped inside 3-ply heavy spiral kraft tubes that can withstand up to 40 kg of external pressure. Framed orders are packed with dense foam corner guards inside reinforced wooden-edge crates with complete transit insurance.',
  },
  {
    category: 'Ordering & Authenticity',
    q: 'What is the Certificate of Archival Provenance?',
    a: 'Every poster dispatched from our studio includes a serialized and stamped Certificate of Provenance bearing the order reference number, print edition specifications, paper batch details, and the embossed PeekPage studio seal.',
  },
];

export default function FAQs() {
  const [openIndex, setOpenIndex] = useState(0);
  const [search, setSearch] = useState('');

  const filteredFaqs = search.trim()
    ? FAQ_ITEMS.filter(
        (f) =>
          f.q.toLowerCase().includes(search.toLowerCase()) ||
          f.a.toLowerCase().includes(search.toLowerCase())
      )
    : FAQ_ITEMS;

  return (
    <div className="min-h-screen pb-16 sm:pb-20 bg-surface w-full max-w-full overflow-x-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-8 w-full">
        
        {/* Header */}
        <div className="text-center space-y-2.5 sm:space-y-3 py-6 sm:py-8 border-b border-surface-container">
          <div className="inline-flex items-center gap-2 text-xs font-label uppercase tracking-widest text-primary font-bold">
            <HelpCircle className="w-4 h-4" />
            <span>Curatorial Knowledge Base</span>
          </div>
          <h1 className="font-headline text-2xl sm:text-4xl lg:text-5xl text-on-surface font-normal">
            Archival Specifications & Patron FAQs
          </h1>
          <p className="text-xs sm:text-sm font-body text-on-surface-variant max-w-xl mx-auto">
            Everything you need to know about our museum-grade substrates, framing craftsmanship, and pan-India transit protocols.
          </p>

          {/* Search Box */}
          <div className="relative max-w-md mx-auto mt-4 sm:mt-6">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search paper specs, framing, transit..."
              className="w-full bg-surface-container-low text-on-surface text-xs font-label pl-10 pr-4 py-2.5 sm:py-3 rounded-2xl border border-surface-container outline-none focus:border-primary placeholder:text-outline"
            />
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div className="my-8 sm:my-10 space-y-3 sm:space-y-4">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-surface-container-low border border-surface-container overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                  className="w-full p-4 sm:p-6 text-left flex items-start justify-between gap-3 sm:gap-4 focus:outline-none"
                >
                  <div className="space-y-1 min-w-0">
                    <span className="text-[10px] uppercase font-label tracking-widest text-primary font-bold block">
                      {faq.category}
                    </span>
                    <h3 className="font-headline text-base sm:text-xl font-medium text-on-surface">
                      {faq.q}
                    </h3>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 sm:w-5 sm:h-5 text-on-surface-variant transition-transform duration-300 mt-1 flex-shrink-0 ${
                      isOpen ? 'rotate-180 text-primary' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-4 sm:px-6 pb-5 sm:pb-6 pt-1 text-xs sm:text-sm font-body text-on-surface-variant leading-relaxed border-t border-surface-container/60 animate-in fade-in duration-200">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
