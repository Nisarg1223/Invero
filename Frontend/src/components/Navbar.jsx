import React, { useState } from 'react';
import { InveroLogo, PlusIcon, ChevronDownIcon } from './Icons';
import { CATEGORIES } from '../data/items';

export default function Navbar({
  selectedCategory,
  onSelectCategory,
  onOpenSubmitModal
}) {
  const [latestFilter, setLatestFilter] = useState('Latest');
  const [showLatestDropdown, setShowLatestDropdown] = useState(false);

  return (
    <header className="sticky top-0 z-40 glass-header border-b border-black/[0.06] transition-all duration-300">
      {/* Top Header Row */}
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 h-[60px] flex items-center justify-between border-b border-black/[0.04]">
        {/* Left: Invero Brand & Inspiration Badge */}
        <div className="flex items-center gap-3.5">
          <button 
            onClick={() => onSelectCategory('Home')} 
            className="flex items-center gap-2.5 text-left group transition-transform active:scale-[0.98]"
          >
            <InveroLogo size={32} />
            <div className="flex items-baseline gap-1.5">
              <span className="font-extrabold text-[19px] tracking-tight text-neutral-900 group-hover:text-blue-600 transition-colors duration-200">
                Invero
              </span>
              <span className="hidden sm:inline-block text-[10px] uppercase font-bold tracking-widest text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">
                UI
              </span>
            </div>
          </button>

          <div className="hidden sm:flex items-center gap-2 pl-3.5 border-l border-neutral-200/80 text-xs font-medium text-neutral-400">
            <span className="text-neutral-300 select-none">✕</span>
            <span className="text-neutral-500 hover:text-neutral-900 transition-colors cursor-default font-medium">
              Daily inspiration
            </span>
          </div>
        </div>

        {/* Right Top Actions */}
        <div className="flex items-center gap-2.5">
          {/* Avatar Profile */}
          <div 
            className="w-8 h-8 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white flex items-center justify-center font-bold text-xs select-none shadow-sm transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
            title="User Profile"
          >
            A
          </div>

          {/* Plus / Submit Button */}
          <button
            onClick={onOpenSubmitModal}
            className="w-8 h-8 rounded-full border border-neutral-200/90 bg-white/80 hover:bg-white text-neutral-700 hover:text-neutral-950 hover:border-neutral-300 flex items-center justify-center shadow-sm transition-all duration-200 hover:scale-105 active:scale-95"
            title="Submit design inspiration"
          >
            <PlusIcon size={15} />
          </button>

          {/* Latest Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowLatestDropdown(!showLatestDropdown)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-neutral-100/90 hover:bg-neutral-200/70 text-xs font-semibold text-neutral-700 transition-all duration-200 active:scale-95"
            >
              <span>{latestFilter}</span>
              <ChevronDownIcon size={12} className={`transition-transform duration-200 ${showLatestDropdown ? 'rotate-180' : ''}`} />
            </button>

            {showLatestDropdown && (
              <div className="absolute right-0 mt-2 w-40 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-neutral-100 p-1.5 z-50 text-xs font-medium text-neutral-700 animate-in fade-in zoom-in-95 duration-150">
                {['Latest', 'Most Popular', 'Editor Picks', 'Trending'].map((opt) => (
                  <button
                    key={opt}
                    onClick={() => {
                      setLatestFilter(opt);
                      setShowLatestDropdown(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl transition-all duration-150 ${
                      latestFilter === opt 
                        ? 'bg-blue-50 text-blue-600 font-semibold' 
                        : 'hover:bg-neutral-50 text-neutral-700'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Sub-bar: Category Pills */}
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 py-2.5">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 -mx-1 px-1 scroll-smooth">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => onSelectCategory(cat)}
                className={`whitespace-nowrap rounded-full px-4 py-1.5 text-[13px] font-semibold transition-all duration-200 select-none active:scale-[0.96] ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-[0_2px_12px_rgba(37,99,235,0.35)] scale-[1.02]'
                    : 'bg-neutral-100/80 hover:bg-neutral-200/80 text-neutral-600 hover:text-neutral-900'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}
