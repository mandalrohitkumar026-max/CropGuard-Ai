import React from 'react';

interface ConfidenceGaugeProps {
  score: number; // e.g. 96.4
  size?: number; // size in px
}

export const ConfidenceGauge: React.FC<ConfidenceGaugeProps> = ({ score, size = 100 }) => {
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  let strokeColor = '#16a34a'; // forest-600
  if (score < 70) strokeColor = '#f59e0b';
  if (score < 50) strokeColor = '#ef4444';

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg className="transform -rotate-90" width={size} height={size}>
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#e2e8f0"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="transparent"
          style={{ transition: 'stroke-dashoffset 1.2s ease-in-out' }}
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center">
        <span className="text-xl font-bold font-display text-slate-800 tracking-tight">
          {score}%
        </span>
        <span className="text-[10px] font-medium uppercase text-slate-500 tracking-wider">
          Confidence
        </span>
      </div>
    </div>
  );
};
