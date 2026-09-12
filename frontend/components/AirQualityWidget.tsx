'use client';

import React from 'react';
import { Wind, AlertTriangle, CheckCircle } from 'lucide-react';

interface AQIProps {
  aqi: number;
  category: string;
  color: string;
  advisory: string;
  pm25: number;
  pm10: number;
}

export const AirQualityWidget: React.FC<AQIProps> = ({
  aqi,
  category,
  color,
  advisory,
  pm25,
  pm10,
}) => {
  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 shadow-lg backdrop-blur-md">
      <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
        <div className="flex items-center gap-2">
          <Wind className="w-5 h-5 text-emerald-400" />
          <h3 className="text-sm font-semibold text-white">Air Quality Index (AQI)</h3>
        </div>
        <span className={`px-2.5 py-0.5 text-xs font-semibold rounded-full bg-${color}-500/20 text-${color}-400 border border-${color}-500/30`}>
          {category}
        </span>
      </div>

      <div className="flex items-center justify-between mb-3">
        <div>
          <div className="text-3xl font-bold text-white">{aqi}</div>
          <div className="text-xs text-slate-400">AQI Score</div>
        </div>
        <div className="text-right text-xs text-slate-300 space-y-1">
          <div>PM2.5: <span className="font-semibold text-white">{pm25} µg/m³</span></div>
          <div>PM10: <span className="font-semibold text-white">{pm10} µg/m³</span></div>
        </div>
      </div>

      <div className="flex items-start gap-2 bg-slate-800/40 border border-slate-700/30 p-2.5 rounded-lg text-xs text-slate-300">
        {category === 'Good' ? (
          <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
        ) : (
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        )}
        <span>{advisory}</span>
      </div>
    </div>
  );
};
