'use client';

import React from 'react';

export function AirplaneSkyAnimation() {
  return (
    <div 
      className="w-full h-full relative overflow-hidden pointer-events-none select-none bg-transparent"
      aria-hidden="true"
    >
      {/* SVG Canvas for Full-Width Flight Horizon & Aircraft */}
      <svg
        className="w-full h-full"
        viewBox="0 0 1600 130"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {/* Linear gradient for stylized flight arc */}
          <linearGradient id="flightPathGrad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#5EAAA8" stopOpacity="0.05" />
            <stop offset="20%" stopColor="#5EAAA8" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#05668D" stopOpacity="0.5" />
            <stop offset="80%" stopColor="#5EAAA8" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#5EAAA8" stopOpacity="0.05" />
          </linearGradient>

          {/* Beacon Glow */}
          <radialGradient id="beaconGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#F4D35E" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#F4D35E" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ambient Flight Glide Trajectory (Dashed Guide Arc spanning full screen) */}
        <path
          d="M 60 105 Q 260 105 400 65 T 800 30 T 1200 30 Q 1380 65 1540 105"
          stroke="url(#flightPathGrad)"
          strokeWidth="1.5"
          strokeDasharray="4 6"
          strokeLinecap="round"
          className="opacity-60 dark:opacity-40"
        />

        {/* Continuous Runway Baseline spanning full width and beyond */}
        <line
          x1="-200"
          y1="105"
          x2="1800"
          y2="105"
          stroke="#05668D"
          strokeOpacity="0.15"
          strokeWidth="1.5"
        />

        {/* Runway Markings Left */}
        <line
          x1="60"
          y1="105"
          x2="300"
          y2="105"
          stroke="#5EAAA8"
          strokeOpacity="0.4"
          strokeWidth="2"
          strokeDasharray="16 12"
        />
        {/* Runway Markings Right */}
        <line
          x1="1300"
          y1="105"
          x2="1540"
          y2="105"
          stroke="#5EAAA8"
          strokeOpacity="0.4"
          strokeWidth="2"
          strokeDasharray="16 12"
        />

        {/* Subtle stylized clouds in background */}
        <g className="animate-cloud-drift opacity-30 dark:opacity-20">
          <path
            d="M 360 48 Q 375 33 400 38 Q 420 28 440 43 Q 455 43 465 53 Q 470 63 455 68 L 370 68 Q 355 63 360 48 Z"
            fill="#B3E5E0"
          />
          <path
            d="M 760 38 Q 775 23 800 28 Q 820 18 840 33 Q 855 33 865 43 Q 870 53 855 58 L 770 58 Q 755 53 760 38 Z"
            fill="#E8F1F2"
          />
          <path
            d="M 1160 44 Q 1175 29 1200 34 Q 1220 24 1240 39 Q 1255 39 1265 49 Q 1270 59 1255 64 L 1170 64 Q 1155 59 1160 44 Z"
            fill="#B3E5E0"
          />
        </g>

        {/* The Animated Stylized Aircraft */}
        <g className="animate-flight-loop">
          {/* Engine Contrail */}
          <line
            x1="-30"
            y1="0"
            x2="-5"
            y2="0"
            stroke="#B3E5E0"
            strokeWidth="2"
            strokeOpacity="0.8"
            strokeLinecap="round"
          />

          {/* Modern Stylized Jet Aircraft Vector */}
          <g transform="translate(0, 0)">
            {/* Main Fuselage */}
            <path
              d="M 24 0 
                 C 20 -2, 8 -2.5, -10 -2.5 
                 C -15 -2.5, -20 -1.8, -22 0 
                 C -20 1.8, -15 2.5, -10 2.5 
                 C 8 2.5, 20 2, 24 0 Z"
              fill="#05668D"
              className="dark:fill-[#B3E5E0]"
            />

            {/* Nose Cone */}
            <path
              d="M 24 0 C 21 -1, 18 -1.2, 15 -1.2 L 15 1.2 C 18 1.2, 21 1, 24 0 Z"
              fill="#5EAAA8"
            />

            {/* Main Wings */}
            <path
              d="M 5 -1.2 L -9 -18 C -10.5 -19.5, -12 -19.5, -11.5 -17 L -4 -1.2 Z"
              fill="#05668D"
              className="dark:fill-[#5EAAA8]"
            />
            <path
              d="M 5 1.2 L -9 18 C -10.5 19.5, -12 19.5, -11.5 17 L -4 1.2 Z"
              fill="#5EAAA8"
              className="dark:fill-[#05668D]"
            />

            {/* Vertical Tail Fin */}
            <path
              d="M -15 -0.8 L -23 -10 C -24 -11, -25 -11, -24.5 -9.5 L -20 -0.8 Z"
              fill="#5EAAA8"
            />
            <path
              d="M -16 0.8 L -22 7 C -23 8, -24 8, -23.5 7 L -20 0.8 Z"
              fill="#05668D"
            />

            {/* Golden Beacon Strobe */}
            <circle cx="-1" cy="0" r="1.5" fill="#F4D35E" />
            <circle cx="-1" cy="0" r="4" fill="url(#beaconGlow)" />
          </g>
        </g>
      </svg>
    </div>
  );
}
