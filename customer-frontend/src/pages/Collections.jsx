import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';
import { MOCK_COLLECTIONS } from '../services/api';

export default function Collections() {
  return (
    <div className="min-h-screen pb-16 sm:pb-20 bg-surface w-full max-w-full overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 w-full">
        
        {/* Header */}
        <div className="py-6 sm:py-8 border-b border-surface-container max-w-3xl">
          <div className="inline-flex items-center gap-2 text-xs font-label uppercase tracking-widest text-primary font-bold">
            <Sparkles className="w-4 h-4" />
            <span>Permanent Archival Archives</span>
          </div>
          <h1 className="font-headline text-3xl sm:text-5xl text-on-surface font-normal mt-2">
            Curated Bengali Art Collections
          </h1>
          <p className="text-xs sm:text-sm font-body text-on-surface-variant mt-2 sm:mt-3 leading-relaxed">
            Each collection represents months of historical research, scanning original lithographs from Bengal’s vintage press archives, and color-calibrating pigment inking on 300 GSM cotton rag.
          </p>
        </div>

        {/* Collections Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 my-8 sm:my-12">
          {MOCK_COLLECTIONS.map((col) => (
            <Link
              key={col.id}
              to={`/collections/${col.id}`}
              className="group rounded-3xl overflow-hidden bg-surface-container-low border border-surface-container shadow-subtle hover:shadow-atelier transition-all duration-500 flex flex-col justify-between"
            >
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-surface-container">
                <img
                  src={col.heroImage}
                  alt={col.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 text-white space-y-1">
                  <span className="font-bengali text-xs sm:text-sm text-primary-fixed block">
                    {col.bengaliName}
                  </span>
                  <h3 className="font-headline text-xl sm:text-3xl font-medium leading-tight">
                    {col.name}
                  </h3>
                  <p className="text-[11px] sm:text-xs font-label text-white/80 uppercase tracking-wider">
                    {col.tagline}
                  </p>
                </div>
              </div>

              <div className="p-5 sm:p-8 flex-1 flex flex-col justify-between space-y-4">
                <p className="text-xs sm:text-sm font-body text-on-surface-variant leading-relaxed">
                  {col.description}
                </p>

                <div className="pt-3 sm:pt-4 border-t border-surface-container flex items-center justify-between">
                  <span className="text-xs font-label text-on-surface-variant font-medium">
                    {col.count} Archival Plates
                  </span>
                  <span className="text-xs font-label font-bold text-primary group-hover:translate-x-1.5 transition-transform flex items-center gap-1">
                    <span>Explore Exhibition</span>
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}
