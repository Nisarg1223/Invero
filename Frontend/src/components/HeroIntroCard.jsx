import React from 'react';
import { SurpriseDice, GlobeGrid, SparklesIcon } from './Icons';

export default function HeroIntroCard({ onSurpriseMe, onExploreMoodboards, isMoodboardMode }) {
  return (
    <div className="relative bg-white/90 backdrop-blur-sm rounded-[22px] p-7 sm:p-8 border border-neutral-200/80 shadow-[0_4px_24px_-6px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_32px_-8px_rgba(0,0,0,0.08)] flex flex-col justify-between hover:border-neutral-300 transition-all duration-300 h-full min-h-[260px] overflow-hidden group">
      {/* Subtle top ambient sheen */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500/0 via-blue-500/30 to-indigo-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50/80 border border-blue-100 text-blue-700 text-xs font-semibold mb-5 shadow-xs">
          <SparklesIcon size={13} className="text-blue-600 animate-pulse" />
          <span>Curated Invero Collection</span>
        </div>

        <h1 className="text-2xl sm:text-[32px] font-extrabold text-neutral-900 leading-[1.18] tracking-tight mb-3">
          Design inspiration from <br className="hidden sm:inline" />
          the best of the internet
        </h1>

        <p className="text-neutral-500 text-[13.5px] leading-relaxed max-w-sm mb-6 font-normal">
          Curated websites, sections, launch videos and UI shots.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3 pt-2">
        {/* Surprise me Button */}
        <button
          onClick={onSurpriseMe}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-neutral-200/90 bg-white hover:bg-neutral-50 hover:border-neutral-300 text-neutral-800 text-xs sm:text-sm font-semibold transition-all duration-200 hover:scale-[1.03] active:scale-[0.96] shadow-sm shadow-black/[0.03]"
        >
          <SurpriseDice size={15} className="text-neutral-600" />
          <span>Surprise me</span>
        </button>

        {/* Explore Moodboards Button */}
        <button
          onClick={onExploreMoodboards}
          className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 hover:scale-[1.03] active:scale-[0.96] shadow-sm ${
            isMoodboardMode
              ? 'bg-neutral-900 text-white hover:bg-black shadow-neutral-900/20'
              : 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-500/25'
          }`}
        >
          <GlobeGrid size={15} />
          <span>{isMoodboardMode ? 'Grid Layout' : 'Explore Moodboards'}</span>
        </button>
      </div>
    </div>
  );
}
