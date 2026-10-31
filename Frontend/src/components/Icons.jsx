import React from 'react';

export const InveroLogo = ({ className = "w-7 h-7", size = 28 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="invero-base" x1="2" y1="2" x2="30" y2="30" gradientUnits="userSpaceOnUse">
        <stop stopColor="#2563EB" />
        <stop offset="0.5" stopColor="#1D4ED8" />
        <stop offset="1" stopColor="#0F172A" />
      </linearGradient>
      <linearGradient id="invero-accent" x1="8" y1="6" x2="24" y2="26" gradientUnits="userSpaceOnUse">
        <stop stopColor="#60A5FA" />
        <stop offset="1" stopColor="#38BDF8" />
      </linearGradient>
      <filter id="invero-glow" x="2" y="2" width="28" height="28" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feGaussianBlur stdDeviation="1.5" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>
    {/* Squircle container with subtle inner shadow */}
    <rect width="32" height="32" rx="9" fill="url(#invero-base)" />
    <rect x="0.5" y="0.5" width="31" height="31" rx="8.5" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
    
    {/* Stylized Modern 'I' / Invero Dynamic Wave Ribbon */}
    <path
      d="M11 9C11 7.89543 11.8954 7 13 7H19C20.1046 7 21 7.89543 21 9C21 10.1046 20.1046 11 19 11H17.5V21H19C20.1046 21 21 21.8954 21 23C21 24.1046 20.1046 25 19 25H13C11.8954 25 11 24.1046 11 23C11 21.8954 11.8954 21 13 21H14.5V11H13C11.8954 11 11 10.1046 11 9Z"
      fill="white"
    />
    <circle cx="16" cy="16" r="2.8" fill="url(#invero-accent)" />
  </svg>
);

export const SurpriseDice = ({ className = "w-4 h-4", size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="18" height="18" x="3" y="3" rx="4" ry="4"/>
    <path d="M16 8h.01"/>
    <path d="M8 8h.01"/>
    <path d="M8 16h.01"/>
    <path d="M16 16h.01"/>
    <path d="M12 12h.01"/>
  </svg>
);

export const GlobeGrid = ({ className = "w-4 h-4", size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10"/>
    <line x1="2" x2="22" y1="12" y2="12"/>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
);

export const SearchIcon = ({ className = "w-4 h-4", size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="11" cy="11" r="7.5"/>
    <line x1="21" x2="16.65" y1="21" y2="16.65"/>
  </svg>
);

export const HeartIcon = ({ className = "w-4 h-4", size = 16, filled = false }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={filled ? "#EF4444" : "none"}
    stroke={filled ? "#EF4444" : "currentColor"}
    strokeWidth="1.9"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
  </svg>
);

export const BookmarkIcon = ({ className = "w-4 h-4", size = 16, filled = false }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={filled ? "#2563EB" : "none"}
    stroke={filled ? "#2563EB" : "currentColor"}
    strokeWidth="1.9"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/>
  </svg>
);

export const ExternalLinkIcon = ({ className = "w-4 h-4", size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
    <polyline points="15 3 21 3 21 9"/>
    <line x1="10" x2="21" y1="14" y2="3"/>
  </svg>
);

export const PlusIcon = ({ className = "w-4 h-4", size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="12" x2="12" y1="5" y2="19"/>
    <line x1="5" x2="19" y1="12" y2="12"/>
  </svg>
);

export const ChevronDownIcon = ({ className = "w-4 h-4", size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);

export const CloseIcon = ({ className = "w-4 h-4", size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="18" x2="6" y1="6" y2="18"/>
    <line x1="6" x2="18" y1="6" y2="18"/>
  </svg>
);

export const CopyIcon = ({ className = "w-4 h-4", size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
  </svg>
);

export const CheckIcon = ({ className = "w-4 h-4", size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

export const EyeIcon = ({ className = "w-4 h-4", size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);

export const SparklesIcon = ({ className = "w-4 h-4", size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3L12 3Z"/>
  </svg>
);

export const ShareIcon = ({ className = "w-4 h-4", size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="18" cy="5" r="3"/>
    <circle cx="6" cy="12" r="3"/>
    <circle cx="18" cy="19" r="3"/>
    <line x1="8.59" x2="15.42" y1="13.51" y2="17.49"/>
    <line x1="15.41" x2="8.59" y1="6.51" y2="10.49"/>
  </svg>
);
