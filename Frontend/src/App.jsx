import React, { useState, useMemo } from 'react';
import Navbar from './components/Navbar';
import HeroIntroCard from './components/HeroIntroCard';
import CardItem from './components/CardItem';
import DetailModal from './components/DetailModal';
import SubmitModal from './components/SubmitModal';
import { INITIAL_ITEMS } from './data/items';
import { SparklesIcon, GlobeGrid } from './components/Icons';

export default function App() {
  const [items, setItems] = useState(INITIAL_ITEMS);
  const [selectedCategory, setSelectedCategory] = useState('Home');
  const [selectedNav, setSelectedNav] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modals & Active state
  const [activeModalItem, setActiveModalItem] = useState(null);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  
  // Likes & Saves
  const [likedIds, setLikedIds] = useState(new Set());
  const [savedIds, setSavedIds] = useState(new Set());
  
  // Highlighted item (for Surprise me)
  const [highlightedId, setHighlightedId] = useState(null);
  const [isMoodboardMode, setIsMoodboardMode] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const toggleLike = (id) => {
    setLikedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
        showToast('Liked inspiration shot!');
      }
      return next;
    });
  };

  const toggleSave = (id) => {
    setSavedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        showToast('Removed from Invero Favourites');
      } else {
        next.add(id);
        showToast('Saved to Invero Favourites');
      }
      return next;
    });
  };

  // Filter items based on Category, Nav (e.g. Favourites), and Search Query
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      // Nav filter (e.g. Favourites)
      if (selectedNav === 'favourites' && !savedIds.has(item.id)) {
        return false;
      }
      if (selectedNav === 'websites' && !item.tags.includes('Websites')) {
        return false;
      }

      // Category filter
      if (selectedCategory === 'Home') {
        if (item.category !== 'Home' && !item.tags.includes('Home')) {
          return false;
        }
      } else {
        const matchesCat = 
          item.category.toLowerCase() === selectedCategory.toLowerCase() ||
          item.tags.some(t => t.toLowerCase() === selectedCategory.toLowerCase());
        if (!matchesCat) return false;
      }

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(q);
        const matchesSubtitle = (item.subtitle || '').toLowerCase().includes(q);
        const matchesTags = item.tags.some(t => t.toLowerCase().includes(q));
        const matchesAuthor = item.author.name.toLowerCase().includes(q);
        if (!matchesTitle && !matchesSubtitle && !matchesTags && !matchesAuthor) {
          return false;
        }
      }

      return true;
    });
  }, [items, selectedCategory, selectedNav, searchQuery, savedIds]);

  // Handle Surprise Me action
  const handleSurpriseMe = () => {
    if (items.length === 0) return;
    const randomIndex = Math.floor(Math.random() * items.length);
    const chosen = items[randomIndex];

    setHighlightedId(chosen.id);
    showToast(`Invero Spotlight: ${chosen.title}!`);

    // Smooth scroll to card
    const el = document.getElementById(chosen.id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    // Auto open modal after smooth scroll
    setTimeout(() => {
      setActiveModalItem(chosen);
    }, 650);

    // Clear highlight ring after 4.5s
    setTimeout(() => {
      setHighlightedId(null);
    }, 4500);
  };

  // Navigate Modal Next/Prev
  const handleModalPrev = () => {
    if (!activeModalItem) return;
    const currentIndex = filteredItems.findIndex(i => i.id === activeModalItem.id);
    const prevIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
    setActiveModalItem(filteredItems[prevIndex]);
  };

  const handleModalNext = () => {
    if (!activeModalItem) return;
    const currentIndex = filteredItems.findIndex(i => i.id === activeModalItem.id);
    const nextIndex = (currentIndex + 1) % filteredItems.length;
    setActiveModalItem(filteredItems[nextIndex]);
  };

  const handleAddItem = (newItem) => {
    setItems((prev) => [newItem, ...prev]);
    showToast(`Added "${newItem.title}" to Invero!`);
  };

  return (
    <div className="min-h-screen invero-mesh-bg flex flex-col selection:bg-blue-600 selection:text-white transition-colors duration-300">
      {/* Toast Notification with smooth enter */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-neutral-900/95 text-white text-xs font-semibold px-4 py-2.5 rounded-full shadow-2xl flex items-center gap-2.5 border border-neutral-700/80 backdrop-blur-md animate-in fade-in slide-in-from-bottom-3 duration-200">
          <SparklesIcon size={14} className="text-blue-400 animate-pulse" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Navigation matching Image 1 with Invero branding */}
      <Navbar
        selectedCategory={selectedCategory}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          if (selectedNav === 'favourites') setSelectedNav('all');
        }}
        selectedNav={selectedNav}
        onSelectNav={(navId) => setSelectedNav(navId)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        favouritesCount={savedIds.size}
        onOpenSubmitModal={() => setIsSubmitModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-[1720px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-7">
        {/* Active Filter Indicator */}
        {(selectedCategory !== 'Home' || selectedNav !== 'all' || searchQuery) && (
          <div className="mb-6 flex items-center justify-between bg-white/90 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-neutral-200/80 shadow-xs animate-in fade-in duration-200">
            <div className="flex items-center gap-2 text-xs text-neutral-600">
              <span className="font-bold text-neutral-900">Invero Filter:</span>
              {selectedCategory !== 'Home' && (
                <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 font-semibold border border-blue-100">
                  Category: {selectedCategory}
                </span>
              )}
              {selectedNav !== 'all' && (
                <span className="px-2.5 py-0.5 rounded-full bg-neutral-100 text-neutral-700 font-semibold">
                  Section: {selectedNav}
                </span>
              )}
              {searchQuery && (
                <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 font-semibold border border-amber-100">
                  Search: "{searchQuery}"
                </span>
              )}
              <span className="text-neutral-400 font-medium">({filteredItems.length} shots)</span>
            </div>

            <button
              onClick={() => {
                setSelectedCategory('Home');
                setSelectedNav('all');
                setSearchQuery('');
              }}
              className="text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Dynamic Multi-column Masonry Grid */}
        {!isMoodboardMode ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 items-start">
            {/* Column 1: Hero Intro Card */}
            <div className="w-full flex flex-col gap-6">
              <HeroIntroCard
                onSurpriseMe={handleSurpriseMe}
                onExploreMoodboards={() => setIsMoodboardMode(!isMoodboardMode)}
                isMoodboardMode={isMoodboardMode}
              />
            </div>

            {/* If 1 item in a specific category (like Components or Hero), let it span xl:col-span-2 for wide presentation */}
            {filteredItems.length === 1 && selectedCategory !== 'Home' ? (
              <div className="w-full md:col-span-1 xl:col-span-2">
                {filteredItems.map((item) => (
                  <CardItem
                    key={item.id}
                    item={item}
                    isHighlighted={highlightedId === item.id}
                    onOpenModal={(it) => setActiveModalItem(it)}
                    isLiked={likedIds.has(item.id)}
                    onToggleLike={toggleLike}
                    isSaved={savedIds.has(item.id)}
                    onToggleSave={toggleSave}
                  />
                ))}
              </div>
            ) : (
              <>
                {/* Column 2: 1st Card (Buddy24) and 4th Card (Wikala) placed under it */}
                <div className="w-full flex flex-col gap-6">
                  {filteredItems.filter((_, idx) => idx % 3 === 0).map((item) => (
                    <CardItem
                      key={item.id}
                      item={item}
                      isHighlighted={highlightedId === item.id}
                      onOpenModal={(it) => setActiveModalItem(it)}
                      isLiked={likedIds.has(item.id)}
                      onToggleLike={toggleLike}
                      isSaved={savedIds.has(item.id)}
                      onToggleSave={toggleSave}
                    />
                  ))}
                </div>

                {/* Column 3: 2nd Card (UPI) */}
                <div className="w-full flex flex-col gap-6">
                  {filteredItems.filter((_, idx) => idx % 3 === 1).map((item) => (
                    <CardItem
                      key={item.id}
                      item={item}
                      isHighlighted={highlightedId === item.id}
                      onOpenModal={(it) => setActiveModalItem(it)}
                      isLiked={likedIds.has(item.id)}
                      onToggleLike={toggleLike}
                      isSaved={savedIds.has(item.id)}
                      onToggleSave={toggleSave}
                    />
                  ))}
                </div>

                {/* Column 4: 3rd Card (Robotics) */}
                <div className="w-full flex flex-col gap-6">
                  {filteredItems.filter((_, idx) => idx % 3 === 2).map((item) => (
                    <CardItem
                      key={item.id}
                      item={item}
                      isHighlighted={highlightedId === item.id}
                      onOpenModal={(it) => setActiveModalItem(it)}
                      isLiked={likedIds.has(item.id)}
                      onToggleLike={toggleLike}
                      isSaved={savedIds.has(item.id)}
                      onToggleSave={toggleSave}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        ) : (
          /* Moodboard Collage View */
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-neutral-900 tracking-tight">Invero Moodboard Collage</h2>
                <p className="text-xs text-neutral-500 font-medium">Curated visual atmosphere of featured hero designs</p>
              </div>
              <button
                onClick={() => setIsMoodboardMode(false)}
                className="px-4 py-2 rounded-full border border-neutral-300 bg-white hover:bg-neutral-50 text-xs font-semibold shadow-xs transition-all duration-150 hover:scale-105 active:scale-95"
              >
                Back to Standard Grid
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredItems.map((item, index) => (
                <div
                  key={item.id}
                  onClick={() => setActiveModalItem(item)}
                  className="group relative rounded-[22px] overflow-hidden shadow-smooth-md border border-neutral-200/80 cursor-pointer bg-white smooth-card smooth-gpu hover:shadow-smooth-xl"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-auto block object-contain transition-transform duration-500 cubic-bezier(0.16, 1, 0.3, 1) group-hover:scale-[1.02]"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State when no results match */}
        {filteredItems.length === 0 && (
          <div className="bg-white/90 backdrop-blur-md rounded-[22px] border border-neutral-200 p-12 text-center max-w-md mx-auto my-12 shadow-smooth-sm animate-in zoom-in-95 duration-200">
            <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-3 shadow-xs">
              <GlobeGrid size={22} />
            </div>
            <h3 className="font-bold text-sm text-neutral-900 mb-1">No designs found</h3>
            <p className="text-xs text-neutral-500 mb-5 font-normal">
              Try adjusting your category or search query to explore the Invero collection.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('Home');
                setSelectedNav('all');
                setSearchQuery('');
              }}
              className="px-5 py-2.5 rounded-full bg-neutral-900 text-white text-xs font-semibold hover:bg-black transition-all duration-150 hover:scale-105 active:scale-95 shadow-sm"
            >
              View All Showcase Items
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-20 border-t border-neutral-200/80 bg-white/70 backdrop-blur-md py-7 text-xs text-neutral-500">
        <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <span className="font-extrabold text-neutral-900 text-sm tracking-tight">Invero</span>
            <span className="text-neutral-300">|</span>
            <span className="font-medium text-neutral-500">Curated UI Library & Design Inspiration Platform</span>
          </div>

          <div className="flex items-center gap-6 font-medium">
            <a href="#" className="hover:text-neutral-900 transition-colors">Privacy</a>
            <a href="#" className="hover:text-neutral-900 transition-colors">Terms</a>
            <a href="#" className="hover:text-neutral-900 transition-colors">Submit Design</a>
            <span className="text-neutral-300">|</span>
            <span className="text-neutral-400">Featuring {items.length} Curated Inspirations</span>
          </div>
        </div>
      </footer>

      {/* Full Detail Modal */}
      {activeModalItem && (
        <DetailModal
          item={activeModalItem}
          onClose={() => setActiveModalItem(null)}
          isLiked={likedIds.has(activeModalItem.id)}
          onToggleLike={toggleLike}
          isSaved={savedIds.has(activeModalItem.id)}
          onToggleSave={toggleSave}
          onPrev={handleModalPrev}
          onNext={handleModalNext}
          allItems={items}
          onSelectSimilar={(sim) => setActiveModalItem(sim)}
        />
      )}

      {/* Submit / Add Modal */}
      <SubmitModal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
        onAddItem={handleAddItem}
      />
    </div>
  );
}
