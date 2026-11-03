import React, { useState } from 'react';
import { HeartIcon, BookmarkIcon, CheckIcon, CopyIcon } from './Icons';

export default function CardItem({
  item,
  isHighlighted,
  onOpenModal,
  isLiked,
  onToggleLike,
  isSaved,
  onToggleSave
}) {
  const [copied, setCopied] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [activeImgIndex, setActiveImgIndex] = useState(0);

  const images = item.images && item.images.length > 0 ? item.images : [item.image];
  const currentImage = images[activeImgIndex] || item.image;

  const handleCopyLink = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(window.location.origin + '#' + item.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleNextImage = (e) => {
    e.stopPropagation();
    setActiveImgIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrevImage = (e) => {
    e.stopPropagation();
    setActiveImgIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div
      id={item.id}
      onClick={() => onOpenModal(item)}
      className={`group relative bg-white rounded-[22px] overflow-hidden border smooth-card smooth-gpu cursor-pointer flex flex-col ${
        isHighlighted
          ? 'invero-highlight-pulse ring-4 ring-blue-500/50 border-blue-500 shadow-xl shadow-blue-500/15 scale-[1.01]'
          : 'border-neutral-200/80 hover:border-neutral-300 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.04)] hover:shadow-[0_18px_36px_-8px_rgba(0,0,0,0.09)]'
      }`}
    >
      {/* Image Container with Natural Uncropped Aspect Ratio */}
      <div className="relative w-full bg-neutral-100/80 overflow-hidden flex items-center justify-center select-none">
        {/* Skeleton while loading */}
        {!imgLoaded && (
          <div className="w-full aspect-[16/9] bg-neutral-200/70 animate-pulse" />
        )}

        <img
          key={currentImage}
          src={currentImage}
          alt={item.title}
          onLoad={() => setImgLoaded(true)}
          onError={() => setImgLoaded(true)}
          className={`w-full h-auto block object-contain transition-transform duration-500 cubic-bezier(0.16, 1, 0.3, 1) group-hover:scale-[1.02] ${
            imgLoaded ? 'opacity-100' : 'opacity-0 absolute inset-0'
          }`}
        />

        {/* Multi-image indicators if multiple images */}
        {images.length > 1 && (
          <>
            {/* Top Left Slide Indicator */}
            <div className="absolute top-3.5 left-3.5 z-10">
              <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[11px] font-semibold text-white shadow-xs border border-white/10 flex items-center gap-1">
                <span>Slide</span>
                <span className="text-blue-400 font-bold">{activeImgIndex + 1}</span>
                <span className="text-white/40">/</span>
                <span>{images.length}</span>
              </span>
            </div>

            {/* Bottom Dots Indicator */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 opacity-80 group-hover:opacity-100 transition-opacity">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveImgIndex(i);
                  }}
                  className={`transition-all duration-200 rounded-full ${
                    activeImgIndex === i 
                      ? 'w-4 h-1.5 bg-white' 
                      : 'w-1.5 h-1.5 bg-white/40 hover:bg-white/80'
                  }`}
                  title={`View slide ${i + 1}`}
                />
              ))}
            </div>

            {/* Prev/Next Quick Navigation Buttons (Appears on Hover) */}
            <div className="absolute inset-y-0 left-2 right-2 flex items-center justify-between pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity z-10">
              <button
                onClick={handlePrevImage}
                className="pointer-events-auto w-7 h-7 rounded-full bg-black/50 hover:bg-black/75 text-white flex items-center justify-center backdrop-blur-md transition-all active:scale-90"
                title="Previous slide"
              >
                ‹
              </button>
              <button
                onClick={handleNextImage}
                className="pointer-events-auto w-7 h-7 rounded-full bg-black/50 hover:bg-black/75 text-white flex items-center justify-center backdrop-blur-md transition-all active:scale-90"
                title="Next slide"
              >
                ›
              </button>
            </div>
          </>
        )}

        {/* Top Badges (e.g. Sponsored if applicable) */}
        {item.sponsored && (
          <div className="absolute top-3.5 left-3.5 flex items-center gap-1.5 z-10">
            <span className="px-2 py-0.5 rounded-full bg-neutral-900/85 backdrop-blur-md text-[10px] font-medium text-white shadow-xs">
              Sponsored
            </span>
          </div>
        )}

        {/* Floating Quick Action Overlay (Smooth Fade on Hover) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 z-10 pointer-events-none group-hover:pointer-events-auto">
          {/* Top Right Floating Actions */}
          <div className="flex items-center justify-end gap-1.5 self-end">
            {/* Copy Link */}
            <button
              onClick={handleCopyLink}
              title="Copy share link"
              className="w-8 h-8 rounded-full bg-white/90 hover:bg-white text-neutral-700 flex items-center justify-center backdrop-blur-md transition-all duration-200 hover:scale-110 active:scale-90 shadow-sm"
            >
              {copied ? <CheckIcon size={14} className="text-green-600" /> : <CopyIcon size={14} />}
            </button>

            {/* Bookmark / Save */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleSave(item.id);
              }}
              title={isSaved ? "Saved in Invero" : "Save to Favourites"}
              className={`w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-200 hover:scale-110 active:scale-90 shadow-sm ${
                isSaved ? 'bg-blue-600 text-white' : 'bg-white/90 hover:bg-white text-neutral-700'
              }`}
            >
              <BookmarkIcon size={14} filled={isSaved} />
            </button>

            {/* Like */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleLike(item.id);
              }}
              title="Like"
              className={`w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-200 hover:scale-110 active:scale-90 shadow-sm ${
                isLiked ? 'bg-red-50 text-red-500' : 'bg-white/90 hover:bg-white text-neutral-700'
              }`}
            >
              <HeartIcon size={14} filled={isLiked} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
