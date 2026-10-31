import React, { useState } from 'react';
import { InveroLogo, SearchIcon, PlusIcon, ChevronDownIcon, CloseIcon, SparklesIcon } from './Icons';
import { CATEGORIES, NAV_LINKS } from '../data/items';

export default function Navbar({
  selectedCategory,
  onSelectCategory,
  selectedNav,
  onSelectNav,
  searchQuery,
  onSearchChange,
  favouritesCount,
  onOpenSubmitModal
}) {
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [latestFilter, setLatestFilter] = useState('Latest');
  const [showLatestDropdown, setShowLatestDropdown] = useState(false);

  return (
    <header className="sticky top-0 z-40 glass-header border-b border-black/[0.06] transition-all duration-300">
      {/* Top Header Row */}
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 h-[60px] flex items-center justify-between border-b border-black/[0.04]">
        {/* Left: Invero Brand & Inspiration Badge */}
        <div className="flex items-center gap-3.5">
          <button 
            onClick={() => { onSelectCategory('Home'); onSelectNav('all'); }} 
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

      {/* Sub-bar: Category Pills & Sub-Nav Links */}
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Category Pills Bar (Left) */}
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

        {/* Sub-Nav Items & Search (Right) */}
        <div className="flex items-center gap-4 text-xs font-medium text-neutral-500 shrink-0 self-end md:self-center">
          {NAV_LINKS.map((link) => {
            if (link.id === 'search') {
              return (
                <div key={link.id} className="relative flex items-center">
                  {showSearchInput ? (
                    <div className="flex items-center bg-white/95 rounded-full px-3 py-1.5 gap-2 border border-neutral-300 shadow-sm transition-all duration-200 animate-in fade-in zoom-in-95">
                      <SearchIcon size={14} className="text-neutral-400" />
                      <input
                        type="text"
                        autoFocus
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                        placeholder="Search inspiration..."
                        className="bg-transparent border-none outline-none text-xs text-neutral-800 placeholder-neutral-400 w-32 sm:w-44 font-medium"
                      />
                      <button
                        onClick={() => {
                          setShowSearchInput(false);
                          onSearchChange('');
                        }}
                        className="text-neutral-400 hover:text-neutral-700 transition-colors"
                      >
                        <CloseIcon size={13} />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setShowSearchInput(true)}
                      className="flex items-center gap-1.5 text-neutral-600 hover:text-neutral-950 font-semibold transition-all duration-150 hover:scale-105 active:scale-95"
                    >
                      <SearchIcon size={14} />
                      <span>Search</span>
                    </button>
                  )}
                </div>
              );
            }

            const isActive = selectedNav === link.id;
            return (
              <button
                key={link.id}
                onClick={() => onSelectNav(link.id)}
                className={`transition-all duration-150 flex items-center gap-1.5 hover:text-neutral-900 font-semibold active:scale-95 ${
                  isActive ? 'text-blue-600' : 'text-neutral-600'
                }`}
              >
                <span>{link.label}</span>
                {link.id === 'favourites' && favouritesCount > 0 && (
                  <span className="w-4 h-4 rounded-full bg-blue-600 text-white text-[10px] flex items-center justify-center font-bold shadow-sm shadow-blue-500/30">
                    {favouritesCount}
                  </span>
                )}
              </button>
            );
          })}

          {/* Far Right Status Glow */}
          <div 
            className="w-5 h-5 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 shadow-md shadow-blue-500/25 flex items-center justify-center cursor-pointer transition-transform duration-200 hover:scale-110 active:scale-90"
            title="Invero Network: Active & Live"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          </div>
        </div>
      </div>
    </header>
  );
}
