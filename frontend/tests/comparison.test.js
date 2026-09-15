import assert from "node:assert";
import test from "node:test";
import { compareCityMetrics } from "../utils/comparison.js";

test("compareCityMetrics correctly identifies warmest city and cleanest air city", () => {
  const cities = [
    { city: "Mumbai", temperature: 32, humidity: 80, windSpeed: 12, aqi: 110, condition: "Humid" },
    { city: "London", temperature: 18, humidity: 65, windSpeed: 15, aqi: 35, condition: "Cloudy" },
    { city: "Tokyo", temperature: 26, humidity: 55, windSpeed: 8, aqi: 45, condition: "Clear" }
  ];

  const summary = compareCityMetrics(cities);
  assert.strictEqual(summary.warmest, "Mumbai");
  assert.strictEqual(summary.cleanestAir, "London");
});

test("compareCityMetrics handles empty city list gracefully", () => {
  const summary = compareCityMetrics([]);
  assert.strictEqual(summary.warmest, "N/A");
  assert.strictEqual(summary.cleanestAir, "N/A");
});
