import React, { useState } from 'react';
import { CloseIcon, PlusIcon, CheckIcon } from './Icons';

export default function SubmitModal({ isOpen, onClose, onAddItem }) {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [category, setCategory] = useState('Hero');
  const [imageUrl, setImageUrl] = useState('');
  const [tags, setTags] = useState('');
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !imageUrl.trim()) return;

    const newItem = {
      id: 'custom-' + Date.now(),
      title: title.trim(),
      subtitle: subtitle.trim() || 'Community Inspiration',
      category: category,
      image: imageUrl.trim(),
      author: {
        name: 'Invero Curator',
        avatar: '',
        handle: '@invero'
      },
      likes: 1,
      saves: 1,
      views: '1',
      sponsored: false,
      tags: tags ? tags.split(',').map((t) => t.trim()).filter(Boolean) : [category, 'Websites'],
      palette: ['#2563EB', '#3B82F6', '#60A5FA', '#DBEAFE', '#1E3A8A'],
      description: 'Submitted design inspiration showcasing modern web UI patterns on Invero.',
      specs: {
        'Category': category,
        'Source': 'Invero Community',
        'Status': 'Featured'
      },
      externalUrl: '#'
    };

    onAddItem(newItem);
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 animate-backdrop"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white rounded-[24px] w-full max-w-md p-6 sm:p-7 shadow-2xl border border-neutral-100 animate-smooth-modal"
      >
        <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold shadow-xs">
              <PlusIcon size={16} />
            </div>
            <div>
              <h3 className="font-bold text-sm text-neutral-900">Submit to Invero</h3>
              <p className="text-xs text-neutral-400 font-medium">Add a showcase item to the curated library</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-neutral-100 text-neutral-400 hover:text-neutral-700 transition-colors"
          >
            <CloseIcon size={18} />
          </button>
        </div>

        {success ? (
          <div className="py-12 flex flex-col items-center justify-center text-center space-y-2 animate-in zoom-in-95 duration-200">
            <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center shadow-xs">
              <CheckIcon size={24} />
            </div>
            <h4 className="text-sm font-bold text-neutral-900">Successfully Added to Invero!</h4>
            <p className="text-xs text-neutral-500 font-medium">Your design is now live in the showcase.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 pt-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">
                Design Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Minimalist SaaS Hero"
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-neutral-200 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">
                Image URL or Path *
              </label>
              <input
                type="text"
                required
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://... or /images/..."
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-neutral-200 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all font-medium"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2.5 text-xs rounded-xl border border-neutral-200 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all bg-white font-medium"
                >
                  <option value="Hero">Hero</option>
                  <option value="Features">Features</option>
                  <option value="Bento">Bento</option>
                  <option value="Pricing">Pricing</option>
                  <option value="CTA">CTA</option>
                  <option value="Websites">Websites</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Subtitle
                </label>
                <input
                  type="text"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  placeholder="e.g. 3D & Clean"
                  className="w-full px-3 py-2.5 text-xs rounded-xl border border-neutral-200 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">
                Tags (comma separated)
              </label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="Hero, 3D, Minimal, Tech"
                className="w-full px-3 py-2.5 text-xs rounded-xl border border-neutral-200 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all font-medium"
              />
            </div>

            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-neutral-600 hover:bg-neutral-100 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white transition-all duration-150 hover:scale-[1.02] active:scale-[0.98] shadow-sm shadow-blue-500/20"
              >
                Publish to Invero
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
