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
          d="M 160 100 C 300 100, 420 28, 580 28 L 1020 28 C 1180 28, 1300 100, 1440 100"
          stroke="url(#flightPathGrad)"
          strokeWidth="1.5"
          strokeDasharray="4 6"
          strokeLinecap="round"
          className="opacity-60 dark:opacity-40"
        />

        {/* Continuous Runway Baseline spanning full width and beyond */}
        <line
          x1="-200"
          y1="100"
          x2="1800"
          y2="100"
          stroke="#05668D"
          strokeOpacity="0.15"
          strokeWidth="1.5"
        />

        {/* Runway Markings Left */}
        <line
          x1="40"
          y1="100"
          x2="240"
          y2="100"
          stroke="#5EAAA8"
          strokeOpacity="0.4"
          strokeWidth="2"
          strokeDasharray="16 12"
        />
        {/* Runway Markings Right */}
        <line
          x1="1360"
          y1="100"
          x2="1560"
          y2="100"
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

        {/* The Animated Stylized Aircraft - Mathematically locked onto the flight trajectory */}
        <g>
          <animateMotion
            path="M -80 100 L 160 100 C 300 100, 420 28, 580 28 L 1020 28 C 1180 28, 1300 100, 1440 100 L 1680 100"
            dur="13s"
            repeatCount="indefinite"
            rotate="auto"
          />
          <animate
            attributeName="opacity"
            values="0; 1; 1; 1; 0"
            keyTimes="0; 0.08; 0.88; 0.96; 1"
            dur="13s"
            repeatCount="indefinite"
          />

          {/* Engine Contrail */}
          <line
            x1="-32"
            y1="0"
            x2="-6"
            y2="0"
            stroke="#B3E5E0"
            strokeWidth="2.5"
            strokeOpacity="0.75"
            strokeLinecap="round"
          />

          {/* Modern Stylized Jet Aircraft Vector */}
          <g>
            {/* Main Fuselage */}
            <path
              d="M 24 0 
                 C 20 -2.5, 8 -3, -10 -3 
                 C -15 -3, -20 -2, -22 0 
                 C -20 2, -15 3, -10 3 
                 C 8 3, 20 2.5, 24 0 Z"
              fill="#05668D"
              className="dark:fill-[#B3E5E0]"
            />

            {/* Nose Cone */}
            <path
              d="M 24 0 C 21 -1.2, 18 -1.5, 15 -1.5 L 15 1.5 C 18 1.5, 21 1.2, 24 0 Z"
              fill="#5EAAA8"
            />

            {/* Main Wings */}
            <path
              d="M 6 -1.5 L -8 -19 C -9.5 -20.5, -11.5 -20.5, -11 -18 L -3 -1.5 Z"
              fill="#05668D"
              className="dark:fill-[#5EAAA8]"
            />
            <path
              d="M 6 1.5 L -8 19 C -9.5 20.5, -11.5 20.5, -11 18 L -3 1.5 Z"
              fill="#5EAAA8"
              className="dark:fill-[#05668D]"
            />

            {/* Vertical Tail Fin */}
            <path
              d="M -14 -1 L -22 -11 C -23 -12, -24.5 -12, -24 -10 L -19 -1 Z"
              fill="#5EAAA8"
            />
            <path
              d="M -15 1 L -21 8 C -22 9, -23.5 9, -23 8 L -19 1 Z"
              fill="#05668D"
            />

            {/* Golden Beacon Strobe */}
            <circle cx="-1" cy="0" r="1.5" fill="#F4D35E" />
            <circle cx="-1" cy="0" r="4.5" fill="url(#beaconGlow)" />
          </g>
        </g>
      </svg>
    </div>
  );
}
