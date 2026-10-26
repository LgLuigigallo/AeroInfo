'use client';

import React from 'react';

export function AirplaneSkyAnimation() {
  return (
    <div 
      className="w-full h-full relative overflow-hidden pointer-events-none select-none"
      aria-hidden="true"
    >
      {/* SVG Canvas for Flight Path & Animated Airplane */}
      <svg
        className="w-full h-full min-w-[640px] max-w-4xl mx-auto"
        viewBox="0 0 1000 150"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {/* Linear gradient for stylized flight arc */}
          <linearGradient id="flightPathGrad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#5EAAA8" stopOpacity="0.1" />
            <stop offset="25%" stopColor="#5EAAA8" stopOpacity="0.45" />
            <stop offset="55%" stopColor="#05668D" stopOpacity="0.4" />
            <stop offset="85%" stopColor="#5EAAA8" stopOpacity="0.45" />
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
          d="M 50 110 Q 180 110 260 70 T 480 25 T 720 25 Q 830 55 940 110"
          stroke="url(#flightPathGrad)"
          strokeWidth="1.5"
          strokeDasharray="4 6"
          strokeLinecap="round"
          className="opacity-60 dark:opacity-40"
        />

        {/* Runway Baseline */}
        <line
          x1="30"
          y1="110"
          x2="970"
          y2="110"
          stroke="#05668D"
          strokeOpacity="0.15"
          strokeWidth="1.5"
        />
        {/* Runway Markings Left */}
        <line
          x1="40"
          y1="110"
          x2="200"
          y2="110"
          stroke="#5EAAA8"
          strokeOpacity="0.4"
          strokeWidth="2"
          strokeDasharray="14 10"
        />
        {/* Runway Markings Right */}
        <line
          x1="800"
          y1="110"
          x2="960"
          y2="110"
          stroke="#5EAAA8"
          strokeOpacity="0.4"
          strokeWidth="2"
          strokeDasharray="14 10"
        />

        {/* Subtle stylized cloud in background */}
        <g className="animate-cloud-drift opacity-30 dark:opacity-20">
          <path
            d="M 320 50 Q 335 35 360 40 Q 380 30 400 45 Q 415 45 425 55 Q 430 65 415 70 L 330 70 Q 315 65 320 50 Z"
            fill="#B3E5E0"
          />
          <path
            d="M 640 40 Q 655 25 680 30 Q 700 20 720 35 Q 735 35 745 45 Q 750 55 735 60 L 650 60 Q 635 55 640 40 Z"
            fill="#E8F1F2"
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
