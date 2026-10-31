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

  const handleCopyLink = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(window.location.origin + '#' + item.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
          src={item.image}
          alt={item.title}
          onLoad={() => setImgLoaded(true)}
          className={`w-full h-auto block object-contain transition-transform duration-500 cubic-bezier(0.16, 1, 0.3, 1) group-hover:scale-[1.02] ${
            imgLoaded ? 'opacity-100' : 'opacity-0 absolute inset-0'
          }`}
          loading="lazy"
        />

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
