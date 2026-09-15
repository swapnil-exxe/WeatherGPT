import React from "react";
import { compareCityMetrics } from "../utils/comparison.js";

export interface CityMetric {
  city: string;
  temperature: number;
  humidity: number;
  windSpeed: number;
  aqi: number;
  condition: string;
}

interface CityComparisonProps {
  cities: CityMetric[];
}

export const CityComparisonView: React.FC<CityComparisonProps> = ({ cities }) => {
  if (!cities || cities.length === 0) {
    return <div className="p-4 text-gray-500">No city comparison data available.</div>;
  }

  const summary = compareCityMetrics(cities);

  return (
    <div className="p-6 bg-slate-900 text-white rounded-xl shadow-lg border border-slate-800">
      <h3 className="text-xl font-bold mb-4 text-sky-400">Multi-City Weather Comparison</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="p-3 bg-slate-800 rounded-lg">
          <span className="text-sm text-gray-400">Warmest Location:</span>
          <p className="text-lg font-semibold text-amber-400">{summary.warmest}</p>
        </div>
        <div className="p-3 bg-slate-800 rounded-lg">
          <span className="text-sm text-gray-400">Best Air Quality (Lowest AQI):</span>
          <p className="text-lg font-semibold text-emerald-400">{summary.cleanestAir}</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-700 text-slate-400 text-sm">
              <th className="py-2 px-3">City</th>
              <th className="py-2 px-3">Condition</th>
              <th className="py-2 px-3">Temp (°C)</th>
              <th className="py-2 px-3">Humidity (%)</th>
              <th className="py-2 px-3">Wind (km/h)</th>
              <th className="py-2 px-3">AQI</th>
            </tr>
          </thead>
          <tbody>
            {cities.map((c) => (
              <tr key={c.city} className="border-b border-slate-800 hover:bg-slate-800/50 transition">
                <td className="py-3 px-3 font-medium text-sky-300">{c.city}</td>
                <td className="py-3 px-3">{c.condition}</td>
                <td className="py-3 px-3 font-semibold">{c.temperature}°C</td>
                <td className="py-3 px-3">{c.humidity}%</td>
                <td className="py-3 px-3">{c.windSpeed} km/h</td>
                <td className="py-3 px-3">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${
                    c.aqi <= 50 ? "bg-emerald-500/20 text-emerald-400" :
                    c.aqi <= 100 ? "bg-amber-500/20 text-amber-400" : "bg-rose-500/20 text-rose-400"
                  }`}>
                    {c.aqi}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
