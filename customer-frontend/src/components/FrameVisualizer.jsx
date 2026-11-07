import React, { useState } from 'react';
import {
  ZoomIn,
  Check,
  Sparkles,
  Layers,
  BookOpen,
  Armchair,
  Grid
} from 'lucide-react';
import { PRODUCT_SIZES } from '../services/api';

const ROOM_PREVIEWS = [
  {
    id: 'gallery',
    name: 'Clean Wall',
    icon: Grid,
    bgClass: 'bg-[#ede8df]',
    description: 'Clean wall with warm natural light',
  },
  {
    id: 'living',
    name: 'Living Room',
    icon: Armchair,
    bgClass: 'bg-[#e4ded5]',
    description: 'Above a living room sofa',
  },
  {
    id: 'study',
    name: 'Study Room',
    icon: BookOpen,
    bgClass: 'bg-[#d8d0c3]',
    description: 'Study with warm wood elements',
  },
];

export default function FrameVisualizer({
  product,
  selectedSize,
  setSelectedSize,
}) {
  const [activeRoom, setActiveRoom] = useState(ROOM_PREVIEWS[0]);
  const [zoomModalOpen, setZoomModalOpen] = useState(false);

  // Scale simulation based on poster size
  const getSizeScaleStyle = () => {
    switch (selectedSize.id) {
      case 'A5':
        return 'max-w-[180px] xs:max-w-[210px] sm:max-w-[260px]';
      case 'A4':
        return 'max-w-[220px] xs:max-w-[260px] sm:max-w-[340px]';
      case 'A3':
        return 'max-w-[270px] xs:max-w-[320px] sm:max-w-[420px]';
      default:
        return 'max-w-[220px] xs:max-w-[260px] sm:max-w-[340px]';
    }
  };

  return (
    <div className="flex flex-col gap-4 sm:gap-6 w-full max-w-full">
      {/* Visualizer Display Canvas */}
      <div
        className={`relative w-full aspect-[4/5] sm:aspect-square lg:aspect-[4/4.5] rounded-2xl overflow-hidden transition-all duration-700 flex flex-col items-center justify-center p-4 sm:p-8 lg:p-10 ${activeRoom.bgClass} shadow-subtle border border-surface-container`}
      >
        {/* Ambient Room Furniture */}
        {activeRoom.id === 'living' && (
          <div className="absolute bottom-0 inset-x-4 sm:inset-x-16 h-10 sm:h-14 bg-surface-container-high/80 rounded-t-3xl shadow-md border-t border-white/30 backdrop-blur-sm pointer-events-none flex items-center justify-center">
            <span className="text-[9px] sm:text-[10px] uppercase font-label tracking-widest text-on-surface-variant/70 truncate px-2">
              Sofa Reference Line
            </span>
          </div>
        )}

        {activeRoom.id === 'study' && (
          <div className="absolute bottom-0 inset-x-0 h-8 sm:h-10 bg-[#543b27]/80 backdrop-blur-sm border-t-2 border-[#7a5839] pointer-events-none flex items-center justify-center">
            <span className="text-[8px] sm:text-[9px] uppercase font-label tracking-widest text-white/70 truncate px-2">
              Study Desk
            </span>
          </div>
        )}

        {/* Ambient Overhead Light */}
        <div className="absolute top-0 inset-x-1/4 h-24 bg-gradient-to-b from-white/40 to-transparent blur-xl pointer-events-none" />

        {/* Poster Display */}
        <div
          className={`relative z-10 w-full ${getSizeScaleStyle()} transition-all duration-500 ease-out`}
        >
          <div className="transition-all duration-300 rounded-sm overflow-hidden shadow-xl border-2 border-stone-800/20">
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-surface-container group">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Size Tag */}
              <div className="absolute top-2 right-2 bg-primary/90 text-white text-[7px] sm:text-[8px] font-label font-bold uppercase tracking-wider px-1.5 sm:px-2 py-0.5 rounded shadow-sm backdrop-blur-xs">
                {selectedSize.id} Poster
              </div>

              {/* Zoom Button */}
              <button
                onClick={() => setZoomModalOpen(true)}
                className="absolute bottom-2 left-2 flex items-center gap-1 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded bg-black/75 hover:bg-black text-white text-[9px] sm:text-[10px] font-label font-medium backdrop-blur-sm transition-all"
              >
                <ZoomIn className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-primary-fixed" />
                <span className="hidden xs:inline">Zoom In</span>
              </button>
            </div>
          </div>
        </div>

        {/* Room Selector */}
        <div className="absolute top-2 right-2 sm:top-4 sm:right-4 flex items-center gap-1 bg-surface-container-lowest/90 backdrop-blur-md p-1 rounded-xl shadow-sm border border-surface-container z-20">
          {ROOM_PREVIEWS.map((room) => {
            const Icon = room.icon;
            const isActive = activeRoom.id === room.id;
            return (
              <button
                key={room.id}
                onClick={() => setActiveRoom(room)}
                className={`p-1.5 sm:p-2 rounded-lg text-xs font-label flex items-center gap-1.5 transition-all ${
                  isActive
                    ? 'bg-primary text-on-primary shadow-xs'
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
                }`}
                title={room.description}
              >
                <Icon className="w-3.5 h-3.5" />
                <span className="hidden md:inline">{room.name}</span>
              </button>
            );
          })}
        </div>

        {/* Dimension Indicator */}
        <div className="absolute bottom-2 left-2 sm:bottom-4 sm:left-4 bg-surface-container-lowest/90 backdrop-blur-md px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg text-[10px] sm:text-xs font-label text-on-surface shadow-sm border border-surface-container flex items-center gap-1.5 sm:gap-2 z-20">
          <Layers className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-primary flex-shrink-0" />
          <span className="truncate max-w-[120px] sm:max-w-none">{selectedSize.dimensions}</span>
        </div>
      </div>

      {/* Size Selection */}
      <div className="bg-surface-container-low p-3.5 sm:p-5 rounded-2xl border border-surface-container space-y-2.5 sm:space-y-3">
        <label className="text-[11px] sm:text-xs uppercase font-label font-bold tracking-wider text-on-surface block">
          Choose Poster Size
        </label>
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          {PRODUCT_SIZES.map((size) => {
            const isSelected = selectedSize.id === size.id;
            return (
              <button
                key={size.id}
                onClick={() => setSelectedSize(size)}
                className={`p-3 sm:p-4 rounded-xl border text-center transition-all ${
                  isSelected
                    ? 'bg-surface-container-lowest border-primary ring-1 ring-primary shadow-sm'
                    : 'bg-surface border-surface-container hover:bg-surface-container'
                }`}
              >
                <div className="flex items-center justify-center gap-1.5">
                  <span className="text-sm sm:text-base font-headline font-bold text-on-surface">
                    {size.name}
                  </span>
                  {size.isPopular && (
                    <span className="text-[7px] sm:text-[8px] bg-primary/10 text-primary font-bold px-1.5 py-0.2 rounded uppercase">
                      Popular
                    </span>
                  )}
                </div>
                <span className="text-[9px] sm:text-[10px] text-on-surface-variant block mt-0.5">
                  {size.dimensions}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Zoom Modal */}
      {zoomModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-md"
            onClick={() => setZoomModalOpen(false)}
          />
          <div className="relative w-full max-w-xl bg-surface rounded-2xl shadow-2xl p-4 sm:p-6 border border-surface-container z-10 space-y-3 sm:space-y-4 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-surface-container pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                <h3 className="font-headline text-lg sm:text-xl text-on-surface font-semibold">
                  Poster Close-Up
                </h3>
              </div>
              <button
                onClick={() => setZoomModalOpen(false)}
                className="text-on-surface-variant hover:text-on-surface text-xs font-label font-bold px-2 py-1 rounded"
              >
                ✕ Close
              </button>
            </div>

            <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden shadow-inner border border-surface-container">
              <img
                src={product.image}
                alt="Poster Close-Up"
                className="w-full h-full object-cover scale-125 transform origin-center transition-transform hover:scale-150 cursor-crosshair"
              />
              <div className="absolute bottom-2 right-2 bg-black/80 text-white text-[8px] sm:text-[9px] font-label px-2 py-1 rounded">
                Hover to magnify
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 text-xs font-label text-on-surface-variant pt-2">
              <div className="p-2.5 sm:p-3 rounded-lg bg-surface-container">
                <span className="block font-bold text-on-surface">Paper</span>
                <span>Premium quality thick & durable paper</span>
              </div>
              <div className="p-2.5 sm:p-3 rounded-lg bg-surface-container">
                <span className="block font-bold text-on-surface">Print</span>
                <span>Vibrant long lasting colors</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
