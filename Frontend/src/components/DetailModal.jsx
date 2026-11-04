import React, { useState, useEffect } from 'react';
import { CloseIcon, ExternalLinkIcon, CheckIcon, CopyIcon, ZapIcon, LayersIcon } from './Icons';

export default function DetailModal({
  item,
  onClose,
  isSaved,
  onToggleSave,
  allItems = [],
  onSelectSimilar
}) {
  const [copiedColor, setCopiedColor] = useState(null);
  const [copiedCli, setCopiedCli] = useState(false);
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [activeImgIndex, setActiveImgIndex] = useState(0);

  useEffect(() => {
    setActiveImgIndex(0);
    setCopiedCli(false);
    setCopiedPrompt(false);
  }, [item]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!item) return null;

  const images = item.images && item.images.length > 0 ? item.images : [item.image];
  const currentImage = images[activeImgIndex] || item.image;

  // Filter other items for "Similar designs" section
  const similarDesigns = (allItems || []).filter(i => i.id !== item.id).slice(0, 3);

  const handleCopyColor = (color) => {
    navigator.clipboard.writeText(color);
    setCopiedColor(color);
    setTimeout(() => setCopiedColor(null), 1800);
  };

  const handleCopyCli = () => {
    if (!item.cliCommand) return;
    navigator.clipboard.writeText(item.cliCommand);
    setCopiedCli(true);
    setTimeout(() => setCopiedCli(false), 2200);
  };

  const handleCopyPrompt = () => {
    const promptText = `Design inspiration: ${item.title}. Style: ${item.specs ? Object.values(item.specs).join(', ') : item.category}. Description: ${item.description}`;
    navigator.clipboard.writeText(promptText);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-md flex items-center justify-center p-2.5 sm:p-5 lg:p-8 overflow-y-auto animate-backdrop"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white rounded-[24px] sm:rounded-[28px] w-full max-w-[1440px] max-h-[92vh] lg:h-[92vh] lg:max-h-[920px] overflow-y-auto lg:overflow-hidden shadow-2xl border border-black/5 flex flex-col lg:flex-row my-auto animate-smooth-modal"
      >
        {/* Mobile Floating Close Button */}
        <button
          onClick={onClose}
          className="lg:hidden absolute top-3.5 right-3.5 z-30 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md shadow-md transition-all active:scale-95"
          title="Close modal"
        >
          <CloseIcon size={16} />
        </button>

        {/* Left / Center Section: Design Showcase Canvas */}
        <div className="w-full lg:flex-1 bg-[#f8f8fa] p-4 sm:p-6 lg:p-10 flex flex-col justify-center items-center shrink-0 lg:shrink lg:overflow-y-auto relative border-b lg:border-b-0 lg:border-r border-neutral-200/70 select-none">
          {/* Top Multi-image Tabs (e.g. Slide 01 / Slide 04 for DGREES) */}
          {images.length > 1 ? (
            <div className="flex items-center gap-2 mb-3 lg:mb-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-neutral-200/80 shadow-xs z-10">
              <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider pl-1">
                Screens:
              </span>
              <div className="flex items-center gap-1.5">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImgIndex(i)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold transition-all duration-150 ${
                      activeImgIndex === i
                        ? 'bg-neutral-900 text-white shadow-xs'
                        : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-600'
                    }`}
                  >
                    {item.imageLabels?.[i] || (item.id === 'dgrees-studio' ? (i === 0 ? '01 Giving Our Best' : '04 Connecting Brands') : `Slide 0${i + 1}`)}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="h-1 lg:h-2" />
          )}

          {/* Main Visual Preview Window - Fully visible & uncropped */}
          <div className="w-full flex items-center justify-center py-2 sm:py-3 lg:my-auto">
            <div className="relative w-full max-w-full rounded-2xl overflow-hidden shadow-[0_12px_36px_-10px_rgba(0,0,0,0.1)] border border-neutral-200/90 bg-white transition-all duration-300">
              <img
                src={currentImage}
                alt={item.title}
                className="w-full h-auto max-h-[50vh] sm:max-h-[58vh] lg:max-h-[620px] object-contain block mx-auto transition-transform duration-300"
              />
            </div>
          </div>

          {/* Bottom Slide Indicators if multiple images */}
          {images.length > 1 ? (
            <div className="flex items-center gap-2 mt-3 lg:mt-4 text-xs text-neutral-400">
              <button
                onClick={() => setActiveImgIndex((prev) => (prev - 1 + images.length) % images.length)}
                className="px-2.5 py-1 rounded-full bg-white hover:bg-neutral-100 text-neutral-700 border border-neutral-200 font-semibold transition-all active:scale-95"
              >
                ‹ Prev
              </button>
              <span className="font-mono text-[11px]">
                {activeImgIndex + 1} / {images.length}
              </span>
              <button
                onClick={() => setActiveImgIndex((prev) => (prev + 1) % images.length)}
                className="px-2.5 py-1 rounded-full bg-white hover:bg-neutral-100 text-neutral-700 border border-neutral-200 font-semibold transition-all active:scale-95"
              >
                Next ›
              </button>
            </div>
          ) : (
            <div className="h-1 lg:h-2" />
          )}
        </div>

        {/* Right Sidebar Section */}
        <div className="w-full lg:w-[420px] xl:w-[440px] bg-white p-5 sm:p-7 lg:p-8 flex flex-col justify-between lg:overflow-y-auto shrink-0 space-y-6">
          <div className="space-y-5">
            {/* Top Bar with Title & Close Button */}
            <div className="flex items-start justify-between gap-4">
              <h2 className="text-xl sm:text-2xl font-extrabold text-neutral-900 tracking-tight leading-tight">
                {item.title}
              </h2>
              <button
                onClick={onClose}
                className="p-1.5 rounded-full hover:bg-neutral-100 text-neutral-400 hover:text-neutral-800 transition-colors shrink-0"
                title="Close modal (Esc)"
              >
                <CloseIcon size={20} />
              </button>
            </div>

            {/* Description Paragraph */}
            <p className="text-xs sm:text-[13.5px] text-neutral-600 leading-relaxed font-normal">
              {item.description}
            </p>

            {/* Author Box */}
            <div className="rounded-2xl border border-neutral-200/80 p-3 flex items-center justify-between hover:border-neutral-300 transition-colors bg-white">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-full bg-neutral-900 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                  {item.author.avatar ? (
                    <img src={item.author.avatar} alt={item.author.name} className="w-full h-full object-cover rounded-full" />
                  ) : (
                    item.author.name.charAt(0)
                  )}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-xs text-neutral-900 truncate">
                      {item.author.name}
                    </span>
                    <span className="w-3.5 h-3.5 rounded-full bg-blue-500 text-white flex items-center justify-center text-[9px] font-bold">
                      ✓
                    </span>
                  </div>
                  <span className="text-[11px] text-neutral-400 block truncate font-medium">
                    {item.author.handle || '@invero'}
                  </span>
                </div>
              </div>

              {item.externalUrl && item.externalUrl !== '#' ? (
                <a
                  href={item.externalUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-semibold text-neutral-700 hover:text-blue-600 flex items-center gap-1 transition-colors shrink-0 px-2 py-1"
                >
                  <span>Open on X</span>
                  <ExternalLinkIcon size={12} />
                </a>
              ) : (
                <button
                  onClick={onClose}
                  className="text-neutral-400 hover:text-neutral-600 p-1"
                >
                  <CloseIcon size={14} />
                </button>
              )}
            </div>

            {/* Action Buttons */}
            <div className="space-y-2.5 pt-1">
              {/* Primary Blue Button: CLI Command (if available) OR Generate Prompt */}
              {item.cliCommand ? (
                <button
                  onClick={handleCopyCli}
                  className={`w-full py-3.5 px-5 rounded-full font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.98] shadow-sm ${
                    copiedCli
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  {copiedCli ? (
                    <>
                      <CheckIcon size={16} className="text-white" />
                      <span>Copied: {item.cliCommand}</span>
                    </>
                  ) : (
                    <>
                      <CopyIcon size={16} />
                      <span className="truncate">CLI: {item.cliCommand}</span>
                    </>
                  )}
                </button>
              ) : (
                <button
                  onClick={handleCopyPrompt}
                  className="w-full py-3.5 px-5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.98] shadow-sm"
                >
                  <ZapIcon size={16} />
                  <span>{copiedPrompt ? 'Prompt Copied!' : 'Generate & copy prompt'}</span>
                </button>
              )}

              {/* Secondary Button: Add to moodboard / Save */}
              <button
                onClick={() => onToggleSave(item.id)}
                className={`w-full py-3 px-5 rounded-full border text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.98] ${
                  isSaved
                    ? 'border-blue-600 bg-blue-50/80 text-blue-700 font-bold'
                    : 'border-neutral-200 hover:bg-neutral-50 text-neutral-800'
                }`}
              >
                <LayersIcon size={15} />
                <span>{isSaved ? 'Added to moodboard ✓' : 'Add to moodboard'}</span>
              </button>
            </div>

            {/* Metadata Rows (Category, Type, Technologies, Palette) */}
            <div className="pt-3 border-t border-neutral-100 space-y-3 text-xs">
              {/* Category */}
              <div className="flex items-center justify-between">
                <span className="text-neutral-400 font-medium">Category</span>
                <span className="font-semibold text-neutral-900">{item.category}</span>
              </div>

              {/* Technologies (React, CSS, Lenis, GSAP) */}
              {item.technologies && item.technologies.length > 0 && (
                <div className="flex items-start justify-between gap-2">
                  <span className="text-neutral-400 font-medium pt-0.5">Technologies</span>
                  <div className="flex flex-wrap items-center justify-end gap-1.5">
                    {item.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded-md bg-neutral-100 text-neutral-800 text-[11px] font-bold"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Type / Tags */}
              <div className="flex items-start justify-between gap-2">
                <span className="text-neutral-400 font-medium pt-0.5">Type</span>
                <div className="text-right">
                  <span className="font-semibold text-neutral-900">
                    {item.tags.slice(0, 2).join(' · ')}
                  </span>
                  {item.tags.length > 2 && (
                    <span className="text-neutral-400 font-normal block text-[11px]">
                      ...{item.tags.length - 2} more
                    </span>
                  )}
                </div>
              </div>

              {/* Color Palette */}
              {item.palette && (
                <div className="flex items-center justify-between pt-1">
                  <span className="text-neutral-400 font-medium">Palette</span>
                  <div className="flex items-center gap-1.5">
                    {item.palette.map((color) => (
                      <button
                        key={color}
                        onClick={() => handleCopyColor(color)}
                        className="w-4 h-4 rounded-full border border-black/10 transition-transform hover:scale-125"
                        style={{ backgroundColor: color }}
                        title={`Copy ${color}`}
                      />
                    ))}
                    {copiedColor && (
                      <span className="text-[10px] text-blue-600 font-bold ml-1 animate-pulse">
                        Copied!
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Bottom Section: Similar designs */}
          {similarDesigns.length > 0 && (
            <div className="pt-4 border-t border-neutral-100">
              <h4 className="text-xs font-bold text-neutral-900 mb-2.5">
                Similar designs
              </h4>
              <div className="grid grid-cols-3 gap-2.5">
                {similarDesigns.map((sim) => (
                  <div
                    key={sim.id}
                    onClick={() => onSelectSimilar && onSelectSimilar(sim)}
                    className="group relative rounded-xl overflow-hidden border border-neutral-200/90 aspect-[16/10] bg-neutral-100 cursor-pointer transition-all hover:scale-105 hover:border-neutral-400 shadow-xs"
                    title={sim.title}
                  >
                    <img
                      src={sim.image}
                      alt={sim.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
