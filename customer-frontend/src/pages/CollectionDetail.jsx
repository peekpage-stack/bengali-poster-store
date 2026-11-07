import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, BookOpen } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { productsApi } from '../services/api';

export default function CollectionDetail() {
  const { id } = useParams();
  const [collection, setCollection] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    productsApi.getCollectionById(id).then((data) => {
      setCollection(data);
      setLoading(false);
    });
  }, [id]);

  if (loading || !collection) {
    return (
      <div className="min-h-screen py-20 bg-surface flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="font-headline text-lg text-on-surface">Curating Exhibition Folio...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-16 sm:pb-20 bg-surface w-full max-w-full overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 w-full">
        
        {/* Breadcrumb */}
        <Link
          to="/collections"
          className="inline-flex items-center gap-2 text-xs font-label uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors my-4 sm:my-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>All Archival Archives</span>
        </Link>

        {/* Hero Exhibition Banner */}
        <div className="relative rounded-3xl overflow-hidden shadow-atelier mb-8 sm:mb-12 border border-surface-container">
          <div className="relative aspect-[21/9] min-h-[240px] sm:min-h-[300px] w-full bg-surface-container">
            <img
              src={collection.heroImage}
              alt={collection.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20" />
            
            <div className="absolute bottom-6 sm:bottom-8 left-5 sm:left-10 right-5 sm:right-10 text-white space-y-1.5 sm:space-y-2 max-w-3xl">
              <span className="font-bengali text-sm sm:text-lg text-primary-fixed block">
                {collection.bengaliName}
              </span>
              <h1 className="font-headline text-2xl sm:text-4xl lg:text-5xl font-medium leading-tight">
                {collection.name}
              </h1>
              <p className="text-xs sm:text-sm font-label text-white/90 tracking-wide">
                {collection.tagline}
              </p>
            </div>
          </div>
        </div>

        {/* Curatorial Essay */}
        <div className="p-6 sm:p-8 rounded-3xl bg-surface-container-low border border-surface-container mb-8 sm:mb-12 max-w-4xl">
          <div className="flex items-center gap-2 text-xs font-label uppercase tracking-widest text-primary font-bold mb-2">
            <BookOpen className="w-4 h-4" />
            <span>Curatorial Essay & Provenance</span>
          </div>
          <p className="font-body text-xs sm:text-sm text-on-surface leading-relaxed">
            {collection.description}
          </p>
        </div>

        {/* Artworks In This Collection */}
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-surface-container">
            <h2 className="font-headline text-xl sm:text-3xl text-on-surface font-normal">
              Archival Plates in Exhibition ({collection.items?.length || 0})
            </h2>
            <span className="text-xs font-label uppercase tracking-wider text-primary font-bold">
              300 GSM Cotton Rag
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {(collection.items || []).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
