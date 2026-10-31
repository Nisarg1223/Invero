import React, { useState, useEffect } from 'react';
import { CloseIcon, ExternalLinkIcon, HeartIcon, BookmarkIcon, CheckIcon, ShareIcon } from './Icons';

export default function DetailModal({
  item,
  onClose,
  isLiked,
  onToggleLike,
  isSaved,
  onToggleSave,
  onPrev,
  onNext
}) {
  const [copiedColor, setCopiedColor] = useState(null);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && onNext) onNext();
      if (e.key === 'ArrowLeft' && onPrev) onPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onNext, onPrev]);

  if (!item) return null;

  const handleCopyColor = (color) => {
    navigator.clipboard.writeText(color);
    setCopiedColor(color);
    setTimeout(() => setCopiedColor(null), 1800);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.origin + '#' + item.id);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-backdrop"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white rounded-[24px] w-full max-w-5xl max-h-[92vh] overflow-hidden shadow-2xl border border-neutral-100 flex flex-col my-auto animate-smooth-modal"
      >
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-neutral-100 flex items-center justify-between bg-white/95 backdrop-blur-md sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full overflow-hidden bg-neutral-200 border border-neutral-200 flex items-center justify-center text-xs font-bold text-neutral-600 shadow-xs">
              {item.author.avatar ? (
                <img src={item.author.avatar} alt={item.author.name} className="w-full h-full object-cover" />
              ) : (
                item.author.name.charAt(0)
              )}
            </div>
            <div>
              <h2 className="font-bold text-sm text-neutral-900 flex items-center gap-2">
                <span>{item.title}</span>
                <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-[11px] font-semibold text-blue-700">
                  {item.category}
                </span>
              </h2>
              <p className="text-xs text-neutral-400 font-medium">Curated on Invero by {item.author.name}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Bookmark button */}
            <button
              onClick={() => onToggleSave(item.id)}
              className={`p-2 rounded-full border transition-all duration-200 hover:scale-105 active:scale-95 ${
                isSaved
                  ? 'border-blue-600 bg-blue-50 text-blue-600'
                  : 'border-neutral-200/90 hover:bg-neutral-50 text-neutral-600'
              }`}
              title={isSaved ? "Saved" : "Save to Invero Favourites"}
            >
              <BookmarkIcon size={16} filled={isSaved} />
            </button>

            {/* Like button */}
            <button
              onClick={() => onToggleLike(item.id)}
              className={`p-2 rounded-full border transition-all duration-200 hover:scale-105 active:scale-95 ${
                isLiked
                  ? 'border-red-500 bg-red-50 text-red-500'
                  : 'border-neutral-200/90 hover:bg-neutral-50 text-neutral-600'
              }`}
              title="Like"
            >
              <HeartIcon size={16} filled={isLiked} />
            </button>

            {/* Visit Site */}
            <a
              href={item.externalUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm transition-all duration-200 hover:scale-105 active:scale-95"
            >
              <span>Visit Site</span>
              <ExternalLinkIcon size={13} />
            </a>

            {/* Close */}
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-neutral-100 text-neutral-400 hover:text-neutral-800 transition-colors ml-1"
            >
              <CloseIcon size={18} />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-6 space-y-6">
          {/* Main Hero Shot Container */}
          <div className="relative rounded-2xl overflow-hidden bg-neutral-950 border border-neutral-200/40 shadow-inner flex items-center justify-center">
            <img
              src={item.image}
              alt={item.title}
              className="w-full max-h-[580px] object-contain mx-auto"
            />
          </div>

          {/* Details & Metadata Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            {/* Description & Overview */}
            <div className="md:col-span-2 space-y-4">
              <div>
                <h3 className="text-base font-bold text-neutral-900 mb-1.5">Design Overview</h3>
                <p className="text-sm text-neutral-600 leading-relaxed font-normal">
                  {item.description}
                </p>
              </div>

              {/* Specifications */}
              {item.specs && (
                <div className="bg-neutral-50/80 rounded-2xl p-4 border border-neutral-100 grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {Object.entries(item.specs).map(([key, val]) => (
                    <div key={key}>
                      <span className="block text-[10.5px] font-bold text-neutral-400 uppercase tracking-wider mb-0.5">
                        {key}
                      </span>
                      <span className="text-xs font-semibold text-neutral-800">
                        {val}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Tags */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full bg-neutral-100/80 hover:bg-neutral-200/80 text-xs font-medium text-neutral-700 transition-colors cursor-default"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Sidebar: Color Palette & Copy */}
            <div className="space-y-4 bg-neutral-50/80 rounded-2xl p-4 border border-neutral-100/80">
              {/* Palette */}
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <h4 className="text-xs font-bold text-neutral-800 uppercase tracking-wider">
                    Extracted Palette
                  </h4>
                  {copiedColor && (
                    <span className="text-[11px] font-semibold text-blue-600 animate-pulse">
                      Copied {copiedColor}!
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-5 gap-2">
                  {item.palette.map((color) => (
                    <button
                      key={color}
                      onClick={() => handleCopyColor(color)}
                      className="group relative flex flex-col items-center transition-transform hover:scale-105 active:scale-95"
                      title={`Click to copy ${color}`}
                    >
                      <div
                        className="w-full aspect-square rounded-xl shadow-xs border border-black/10 group-hover:shadow-md transition-shadow"
                        style={{ backgroundColor: color }}
                      />
                      <span className="text-[10px] font-mono text-neutral-500 mt-1 uppercase font-semibold">
                        {color.replace('#', '')}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Share & Copy Link */}
              <div className="pt-2 border-t border-neutral-200/60">
                <button
                  onClick={handleCopyLink}
                  className="w-full py-2.5 px-3 rounded-xl border border-neutral-200 bg-white hover:bg-neutral-50 text-xs font-semibold text-neutral-700 flex items-center justify-center gap-2 transition-all duration-200 hover:scale-[1.01] active:scale-[0.98] shadow-xs"
                >
                  {copiedLink ? <CheckIcon size={14} className="text-green-600" /> : <ShareIcon size={14} />}
                  <span>{copiedLink ? 'Link Copied to Clipboard!' : 'Share Design'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer with Smooth Next / Prev */}
        <div className="px-6 py-3.5 border-t border-neutral-100 bg-neutral-50/90 flex items-center justify-between text-xs text-neutral-500">
          <div className="flex items-center gap-3">
            <span className="font-medium text-neutral-700">{item.views} Views</span>
            <span>•</span>
            <span className="font-medium text-neutral-700">{item.likes + (isLiked ? 1 : 0)} Likes</span>
            <span>•</span>
            <span className="font-medium text-neutral-700">{item.saves + (isSaved ? 1 : 0)} Saves</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onPrev}
              className="px-3.5 py-1.5 rounded-full border border-neutral-200 bg-white hover:bg-neutral-100 text-neutral-700 font-semibold transition-all duration-150 hover:scale-105 active:scale-95"
            >
              ← Previous
            </button>
            <button
              onClick={onNext}
              className="px-3.5 py-1.5 rounded-full border border-neutral-200 bg-white hover:bg-neutral-100 text-neutral-700 font-semibold transition-all duration-150 hover:scale-105 active:scale-95"
            >
              Next →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
