import React from "react";

type CircleProgressProps = {
  progress: number; // 0 - 100
  size?: number; // diameter in px
};

export default function CircleProgress({ progress, size = 100 }: CircleProgressProps) {
  const stroke = size >= 40? 8:5;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const adjustedProgress = progress === 0 ? 0 : 20 + (progress * 80) / 100;
  const offset = circumference - (adjustedProgress / 100) * circumference;

  const startOpacity = progress === 0 ? 0.6 : 0.7 + progress / 200;
  const endOpacity = progress === 0 ? 0.6 : 0.7 + progress / 200;

  return (
    <div className="flex flex-col items-center justify-center">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className={progress === 100 ? "" : "transform animate-spin-fast"}
      >
        {progress === 100 ? (
          <g transform={`translate(${size / 2}, ${size / 2})`}>
            {/* Circle background when finished */}
            <circle
              r={radius}
              fill="rgb(34,197,94)" // Tailwind green-500
            />
            {/* Animated checkmark */}
            <path
              d={`M ${-radius / 2} 0 L ${-radius / 8} ${radius / 3} L ${radius / 2} ${-radius / 3}`}
              stroke="white"
              strokeWidth={stroke / 1.5}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="checkmark-path"
            />
          </g>
        ) : (
          <>
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke="currentColor"
              strokeWidth={stroke}
              className="text-gray-200"
              fill="transparent"
            />
            {progress === 0 && (
              <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke="url(#initial-gradient)"
                strokeWidth={stroke}
                fill="transparent"
                className="animate-pulse"
              />
            )}
            {progress > 0 && (
              <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke="url(#gradient)"
                strokeWidth={stroke}
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                fill="transparent"
                className="transition-all duration-300"
              />
            )}
            <defs>
              <linearGradient id="initial-gradient" x1="1" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(255, 255, 255, 0.6)" />
                <stop offset="100%" stopColor="rgba(59, 130, 246, 0.6)" />
              </linearGradient>
              <linearGradient id="gradient" x1="1" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={`rgba(255, 255, 255, ${startOpacity})`} />
                <stop offset="100%" stopColor={`rgba(59, 130, 246, ${endOpacity})`} />
              </linearGradient>
            </defs>
          </>
        )}
      </svg>

      <style>{`
        @keyframes spin-fast {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-fast {
          animation: spin-fast 1.5s linear infinite;
        }
        .animate-pulse {
          animation: pulse 1.5s ease-in-out infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1.0; }
        }
        /* Checkmark draw animation */
        .checkmark-path {
          stroke-dasharray: 100;
          stroke-dashoffset: 100;
          animation: draw-check 0.6s ease forwards;
        }
        @keyframes draw-check {
          to { stroke-dashoffset: 0; }
        }
      `}</style>
    </div>
  );
}
