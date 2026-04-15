import React from "react";

/**
 * LoadingSpinner
 * A custom "Live Painting" animation of a little girl creating art.
 * Colorful, cartoonish style.
 */
const LoadingSpinner = () => {
    return (
        <div className="fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center animate-fade-in">
            <style>
                {`
                @keyframes painting-arm {
                    0%, 100% { transform: rotate(-8deg); }
                    50% { transform: rotate(18deg); }
                }
                @keyframes draw-stroke {
                    0% { stroke-dashoffset: 300; opacity: 0; }
                    10% { opacity: 1; }
                    90% { stroke-dashoffset: 0; opacity: 1; }
                    100% { stroke-dashoffset: 0; opacity: 0; }
                }
                @keyframes sparkle {
                    0%, 100% { transform: scale(0) rotate(0deg); opacity: 0; }
                    50% { transform: scale(1.4) rotate(180deg); opacity: 0.9; }
                }
                @keyframes bounce-gentle {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-5px); }
                }
                
                .animate-painting-arm {
                    animation: painting-arm 2s ease-in-out infinite;
                    transform-origin: 65px 95px;
                }
                .animate-draw-stroke {
                    stroke-dasharray: 300;
                    animation: draw-stroke 6s linear infinite;
                }
                .sparkle { animation: sparkle 2s ease-in-out infinite; }
                .girl-head { animation: bounce-gentle 4s ease-in-out infinite; }
                `}
            </style>

            <div className="relative w-72 h-72 sm:w-96 sm:h-96">
                <svg
                    viewBox="0 0 200 200"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full drop-shadow-xl"
                >
                    {/* Definitions */}
                    <defs>
                        <radialGradient id="sunGlow" cx="130" cy="70" r="60" gradientUnits="userSpaceOnUse">
                            <stop offset="0%" stopColor="#fff9c4" stopOpacity="0.4" />
                            <stop offset="100%" stopColor="#fff9c4" stopOpacity="0" />
                        </radialGradient>
                    </defs>

                    {/* Background Glow */}
                    <circle cx="130" cy="70" r="50" fill="url(#sunGlow)" />

                    {/* Simple Easel */}
                    <path d="M105 160 L140 40 L175 160" stroke="#8d6e63" strokeWidth="4" strokeLinecap="round" />
                    <rect x="110" y="60" width="60" height="80" rx="2" fill="white" stroke="#5d4037" strokeWidth="3" />
                    
                    {/* The "Art" being painted (Colorful) */}
                    <path
                        d="M125 90 Q 140 70, 155 90 T 140 120 T 125 100"
                        stroke="#f43f5e"
                        strokeWidth="5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="animate-draw-stroke"
                    />
                    <path
                        d="M130 80 Q 145 100, 130 115"
                        stroke="#0ea5e9"
                        strokeWidth="4"
                        strokeLinecap="round"
                        className="animate-draw-stroke"
                        style={{ animationDelay: '1s' }}
                    />
                    <path
                        d="M150 75 Q 160 90, 150 105"
                        stroke="#f59e0b"
                        strokeWidth="4"
                        strokeLinecap="round"
                        className="animate-draw-stroke"
                        style={{ animationDelay: '2s' }}
                    />
                    
                    {/* Magical Bits */}
                    <path d="M120 70 L122 74 L126 75 L122 76 L120 80 L118 76 L114 75 L118 74 Z" fill="#fbbf24" className="sparkle" style={{ animationDelay: '0.5s' }} />
                    <circle cx="160" cy="120" r="3" fill="#818cf8" className="sparkle" />

                    {/* Cartoon Girl FIG */}
                    <g transform="translate(0, 5)">
                        {/* Dress (Pink) */}
                        <path d="M65 110 Q 55 110, 45 160 H85 Q 75 110, 65 110 Z" fill="#ec4899" stroke="#9d174d" strokeWidth="2" />
                        
                        {/* Head & Face */}
                        <g className="girl-head">
                            <circle cx="65" cy="85" r="16" fill="#ffdbac" stroke="#ca8a04" strokeWidth="1.5" />
                            {/* Hair (Yellow/Blonde) */}
                            <path d="M50 85 Q 50 65, 65 65 Q 80 65, 80 85 Q 80 95, 75 90 Q 65 100, 55 90 Q 50 95, 50 85" fill="#facc15" stroke="#ca8a04" strokeWidth="1.5" />
                            {/* Eyes */}
                            <circle cx="60" cy="85" r="1.5" fill="#334155" />
                            <circle cx="70" cy="85" r="1.5" fill="#334155" />
                            {/* Smile */}
                            <path d="M62 92 Q 65 95, 68 92" stroke="#9d174d" strokeWidth="1" fill="none" />
                        </g>
                        
                        {/* Painting Arm */}
                        <g className="animate-painting-arm">
                            <path d="M65 100 Q 85 95, 105 100" stroke="#ffdbac" strokeWidth="6" strokeLinecap="round" />
                            <g transform="translate(105, 100)">
                                {/* Brush handle */}
                                <rect x="0" y="-2" width="15" height="4" rx="1" fill="#78350f" />
                                {/* Brush tip */}
                                <path d="M15 -2 L22 0 L15 2 Z" fill="#f43f5e" />
                            </g>
                        </g>

                        {/* Other Arm holding Palette */}
                        <path d="M65 100 Q 50 110, 45 100" stroke="#ffdbac" strokeWidth="5" strokeLinecap="round" />
                        <ellipse cx="40" cy="100" rx="8" ry="6" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
                        <circle cx="38" cy="98" r="1.5" fill="#f43f5e" />
                        <circle cx="42" cy="100" r="1.5" fill="#0ea5e9" />
                        <circle cx="39" cy="102" r="1.5" fill="#f59e0b" />
                    </g>
                </svg>
            </div>

            {/* Playful Text */}
            <div className="mt-4 text-center">
                <p className="text-brand-primary font-black tracking-wider text-lg italic animate-bounce">
                    Dreaming up your art...
                </p>
                <p className="text-slate-400 text-sm font-medium">Just a few magic strokes left!</p>
            </div>
        </div>
    );
};

export default LoadingSpinner;
