'use client';

import React from 'react';

export function AirplaneSkyAnimation() {
  return (
    <div 
      className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0"
      aria-hidden="true"
    >
      {/* Subtle Sky Radial Gradients matching palette */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] h-full opacity-60 dark:opacity-20"
        style={{
          background: 'radial-gradient(ellipse 65% 55% at 50% 20%, #e8f1f2 0%, #b3e5e0/25 45%, transparent 75%)'
        }}
      />

      {/* SVG Canvas for Flight Path & Animated Airplane */}
      <svg
        className="w-full h-full min-w-[700px] max-w-6xl mx-auto"
        viewBox="0 0 1200 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Linear gradient for stylized flight arc */}
          <linearGradient id="flightPathGrad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#5EAAA8" stopOpacity="0.1" />
            <stop offset="25%" stopColor="#5EAAA8" stopOpacity="0.45" />
            <stop offset="55%" stopColor="#05668D" stopOpacity="0.35" />
            <stop offset="85%" stopColor="#5EAAA8" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#5EAAA8" stopOpacity="0.1" />
          </linearGradient>

          {/* Beacon Glow */}
          <radialGradient id="beaconGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#F4D35E" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#F4D35E" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ambient Flight Glide Trajectory (Dashed Guide Arc) */}
        <path
          d="M 60 190 Q 200 190 280 140 T 560 50 T 840 50 Q 980 90 1140 190"
          stroke="url(#flightPathGrad)"
          strokeWidth="1.75"
          strokeDasharray="5 7"
          strokeLinecap="round"
          className="opacity-60 dark:opacity-40"
        />

        {/* Runway Baseline */}
        <line
          x1="40"
          y1="190"
          x2="1160"
          y2="190"
          stroke="#05668D"
          strokeOpacity="0.12"
          strokeWidth="1.5"
        />
        {/* Runway Center Markings */}
        <line
          x1="50"
          y1="190"
          x2="240"
          y2="190"
          stroke="#5EAAA8"
          strokeOpacity="0.4"
          strokeWidth="2"
          strokeDasharray="16 12"
        />
        <line
          x1="960"
          y1="190"
          x2="1150"
          y2="190"
          stroke="#5EAAA8"
          strokeOpacity="0.4"
          strokeWidth="2"
          strokeDasharray="16 12"
        />

        {/* Drifting stylized clouds in background */}
        <g className="animate-cloud-drift opacity-30 dark:opacity-15">
          <path
            d="M 380 90 Q 400 70 430 75 Q 460 65 480 85 Q 500 85 510 95 Q 515 105 500 110 L 390 110 Q 375 105 380 90 Z"
            fill="#B3E5E0"
          />
          <path
            d="M 720 70 Q 735 55 760 60 Q 780 50 800 65 Q 815 65 825 75 Q 830 85 815 90 L 730 90 Q 715 85 720 70 Z"
            fill="#E8F1F2"
          />
        </g>

        {/* The Animated Stylized Aircraft */}
        <g className="animate-flight-loop">
          {/* Engine Contrail / Vapor Trail */}
          <line
            x1="-35"
            y1="0"
            x2="-6"
            y2="0"
            stroke="#B3E5E0"
            strokeWidth="2.5"
            strokeOpacity="0.75"
            strokeLinecap="round"
          />

          {/* Modern Stylized Jet Aircraft Vector */}
          <g transform="translate(0, 0)">
            {/* Main Fuselage */}
            <path
              d="M 28 0 
                 C 23 -2.2, 10 -3, -12 -3 
                 C -18 -3, -24 -2, -26 0 
                 C -24 2, -18 3, -12 3 
                 C 10 3, 23 2.2, 28 0 Z"
              fill="#05668D"
              className="dark:fill-[#B3E5E0]"
            />

            {/* Nose Cone Accent */}
            <path
              d="M 28 0 C 25 -1.2, 22 -1.5, 18 -1.5 L 18 1.5 C 22 1.5, 25 1.2, 28 0 Z"
              fill="#5EAAA8"
            />

            {/* Swept Main Wings */}
            <path
              d="M 6 -1.5 L -10 -22 C -11.5 -24, -14 -24, -13 -21 L -4 -1.5 Z"
              fill="#05668D"
              className="dark:fill-[#5EAAA8]"
            />
            <path
              d="M 6 1.5 L -10 22 C -11.5 24, -14 24, -13 21 L -4 1.5 Z"
              fill="#5EAAA8"
              className="dark:fill-[#05668D]"
            />

            {/* Vertical Tail Fin & Stabilizers */}
            <path
              d="M -18 -1 L -27 -13 C -28 -14.5, -29.5 -14.5, -29 -12.5 L -24 -1 Z"
              fill="#5EAAA8"
            />
            <path
              d="M -20 1 L -26 9 C -27 10.2, -28 10.2, -27.5 9 L -24 1 Z"
              fill="#05668D"
            />

            {/* Golden Beacon Strobe Light */}
            <circle cx="-1" cy="0" r="2" fill="#F4D35E" />
            <circle cx="-1" cy="0" r="5" fill="url(#beaconGlow)" />
          </g>
        </g>
      </svg>
    </div>
  );
}
