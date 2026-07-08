function LoadingScreen() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center">
      <div className="relative flex items-center justify-center mb-6">
        {/* Ripple rings */}
        <span className="absolute w-40 h-40 rounded-full border border-red-900 animate-ping opacity-20"></span>
        <span className="absolute w-28 h-28 rounded-full border border-red-800 animate-ping opacity-30 [animation-delay:0.2s]"></span>

        <svg width="120" height="150" viewBox="0 0 120 150">
          <defs>
            {/* Teardrop shape used to clip the wavy liquid so it only shows inside the drop */}
            <clipPath id="dropClip">
              <path d="M60 5 C60 5 15 70 15 100 A45 45 0 1 0 105 100 C105 70 60 5 60 5 Z" />
            </clipPath>
          </defs>

          {/* Outline of the drop */}
          <path
            d="M60 5 C60 5 15 70 15 100 A45 45 0 1 0 105 100 C105 70 60 5 60 5 Z"
            fill="none"
            stroke="#7f1d1d"
            strokeWidth="2"
          />

          <g clipPath="url(#dropClip)">
            {/* This group rises from near the bottom (empty) up toward the top (full), then resets */}
            <g>
              <animateTransform
                attributeName="transform"
                type="translate"
                values="0 115; 0 15; 0 115"
                keyTimes="0; 0.7; 1"
                dur="3.5s"
                repeatCount="indefinite"
              />

              {/* Wavy surface, wide enough to slide horizontally without showing an edge */}
              <path
                d="M0,20 
                   C15,10 30,30 45,20 
                   C60,10 75,30 90,20 
                   C105,10 120,30 135,20
                   C150,10 165,30 180,20
                   C195,10 210,30 225,20
                   C240,10 255,30 240,20
                   L240,150 L0,150 Z"
                fill="#dc2626"
              >
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 0; -120 0; 0 0"
                  dur="2.5s"
                  repeatCount="indefinite"
                />
              </path>
            </g>
          </g>
        </svg>
      </div>

      <p className="text-white font-medium mb-2">Saving Lives, One Drop at a Time</p>
      <p className="text-red-500 text-sm">Loading...</p>
    </div>
  );
}

export default LoadingScreen;