/**
 * Utility functions for comparing weather metrics across multiple cities.
 */

export function compareCityMetrics(cities = []) {
  if (!cities || cities.length === 0) {
    return { warmest: "N/A", cleanestAir: "N/A" };
  }

  const warmestCity = [...cities].sort((a, b) => b.temperature - a.temperature)[0];
  const cleanestAirCity = [...cities].sort((a, b) => a.aqi - b.aqi)[0];

  return {
    warmest: warmestCity.city,
    cleanestAir: cleanestAirCity.city
  };
}
