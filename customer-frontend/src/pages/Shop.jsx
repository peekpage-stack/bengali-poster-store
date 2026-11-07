import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Search,
  X,
  ChevronDown,
  Sparkles,
  ArrowUpDown
} from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { MOCK_PRODUCTS, MOCK_COLLECTIONS } from '../services/api';

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialSearch = searchParams.get('search') || '';
  const initialCategory = searchParams.get('category') || 'All';
  const initialCollection = searchParams.get('collection') || 'All';

  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedCollection, setSelectedCollection] = useState(initialCollection);
  const [selectedSort, setSelectedSort] = useState('featured');

  useEffect(() => {
    if (searchParams.get('search')) {
      setSearchQuery(searchParams.get('search'));
    }
  }, [searchParams]);

  const categories = ['All', 'Cinema', 'Heritage', 'Literature', 'Folk Art'];

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...MOCK_PRODUCTS];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.bengaliTitle.includes(q) ||
          p.collection.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    if (selectedCategory !== 'All') {
      result = result.filter(
        (p) => p.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    if (selectedCollection !== 'All') {
      result = result.filter((p) => p.collection === selectedCollection);
    }

    if (selectedSort === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (selectedSort === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (selectedSort === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [searchQuery, selectedCategory, selectedCollection, selectedSort]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedCollection('All');
    setSelectedSort('featured');
    setSearchParams({});
  };

  return (
    <div className="min-h-screen pb-16 sm:pb-20 bg-surface w-full max-w-full overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 w-full">
        
        {/* Curatorial Header */}
        <div className="py-6 sm:py-8 border-b border-surface-container flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-label uppercase tracking-widest text-primary font-bold">
              <Sparkles className="w-4 h-4" />
              <span>Kolkata Atelier Exhibition</span>
            </div>
            <h1 className="font-headline text-3xl sm:text-4xl lg:text-5xl text-on-surface font-normal mt-1">
              Curated Bengal Art Catalog
            </h1>
            <p className="text-xs sm:text-sm font-body text-on-surface-variant mt-2 max-w-2xl leading-relaxed">
              Explore our permanent catalog of Bengali cinema serigraphs, colonial lithographs, and literary typography on 300 GSM cotton rag.
            </p>
          </div>

          <div className="text-left md:text-right">
            <span className="font-label text-xs uppercase tracking-wider text-on-surface-variant block">
              Permanent Vault
            </span>
            <span className="font-headline text-xl sm:text-2xl font-semibold text-primary">
              {filteredProducts.length} Artworks
            </span>
          </div>
        </div>

        {/* Sticky Filter & Search Control Bar */}
        <div className="sticky top-16 sm:top-20 z-30 py-3 sm:py-4 bg-surface/95 backdrop-blur-md border-b border-surface-container my-4 sm:my-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-3 sm:gap-4">
            
            {/* Search Input Box */}
            <div className="relative w-full lg:w-96">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Ray, Charulata, Tramway..."
                className="w-full bg-surface-container-low text-on-surface text-xs font-label pl-10 pr-9 py-2.5 rounded-xl border border-surface-container outline-none focus:border-primary focus:bg-surface placeholder:text-outline transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Category Filter Chips */}
            <div className="w-full lg:w-auto flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-full text-xs font-label whitespace-nowrap transition-all ${
                    selectedCategory === cat
                      ? 'bg-primary text-on-primary font-semibold shadow-xs'
                      : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Sort & Filter Controls */}
            <div className="w-full lg:w-auto flex items-center justify-between lg:justify-end gap-2 sm:gap-3">
              {/* Collection Dropdown */}
              <div className="relative flex-1 sm:flex-initial">
                <select
                  value={selectedCollection}
                  onChange={(e) => setSelectedCollection(e.target.value)}
                  className="w-full sm:w-auto appearance-none bg-surface-container-low text-on-surface text-xs font-label pl-3 pr-8 py-2.5 rounded-xl border border-surface-container outline-none focus:border-primary cursor-pointer truncate"
                >
                  <option value="All">All Collections</option>
                  {MOCK_COLLECTIONS.map((c) => (
                    <option key={c.id} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none" />
              </div>

              {/* Sort Dropdown */}
              <div className="relative flex-1 sm:flex-initial">
                <select
                  value={selectedSort}
                  onChange={(e) => setSelectedSort(e.target.value)}
                  className="w-full sm:w-auto appearance-none bg-surface-container-low text-on-surface text-xs font-label pl-3 pr-8 py-2.5 rounded-xl border border-surface-container outline-none focus:border-primary cursor-pointer truncate"
                >
                  <option value="featured">Curatorial Choice</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Patron Rating</option>
                </select>
                <ArrowUpDown className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none" />
              </div>
            </div>

          </div>
        </div>

        {/* Artwork Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="py-16 sm:py-20 text-center space-y-4 bg-surface-container-low rounded-2xl border border-surface-container p-6 sm:p-8">
            <h3 className="font-headline text-xl sm:text-2xl text-on-surface">No Artworks Found</h3>
            <p className="text-xs font-body text-on-surface-variant max-w-md mx-auto">
              We couldn't find any artwork matching your query "{searchQuery}". Try exploring our classic collections or clearing active filters.
            </p>
            <button
              onClick={resetFilters}
              className="px-6 py-2.5 rounded-xl bg-primary text-on-primary font-label text-xs font-semibold hover:bg-primary-hover transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
