import React from "react";

export function Logo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Emerald green gradient for recycling and sustainability */}
        <linearGradient id="logo-grad-primary" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#10b981" /> {/* emerald-500 */}
          <stop offset="100%" stopColor="#059669" /> {/* emerald-600 */}
        </linearGradient>
        {/* Metallic steel gradient for steel and scrap */}
        <linearGradient id="logo-grad-steel" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#71717a" /> {/* zinc-500 */}
          <stop offset="50%" stopColor="#a1a1aa" /> {/* zinc-400 */}
          <stop offset="100%" stopColor="#3f3f46" /> {/* zinc-700 */}
        </linearGradient>
      </defs>
      
      {/* 1. Industrial Hexagonal boundary */}
      <polygon 
        points="50,4 90,26 90,74 50,96 10,74 10,26" 
        stroke="url(#logo-grad-primary)" 
        strokeWidth="3.5" 
        strokeLinejoin="round"
        className="opacity-30"
      />
      
      {/* 2. Steel-Girder geometric 'M' shape built with polygon segments */}
      {/* Left Pillar */}
      <path 
        d="M 26 70 L 26 32 C 26 30, 28 28, 30 28 L 36 28 L 36 70 Z" 
        fill="url(#logo-grad-steel)"
      />
      {/* Right Pillar */}
      <path 
        d="M 64 70 L 64 28 L 70 28 C 72 28, 74 30, 74 32 L 74 70 Z" 
        fill="url(#logo-grad-steel)"
      />
      {/* Center V-connector */}
      <path 
        d="M 36 28 L 50 50 L 64 28 L 56 28 L 50 38 L 44 28 Z" 
        fill="url(#logo-grad-steel)"
      />
      
      {/* 3. Sweeping Emerald 'S' Recycle Ribbon looping behind and around the pillars */}
      <path 
        d="M 20 62 C 20 72, 80 72, 80 54 C 80 40, 20 44, 20 30 C 20 18, 80 18, 80 28" 
        stroke="url(#logo-grad-primary)" 
        strokeWidth="8" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className="opacity-95"
      />
    </svg>
  );
}
