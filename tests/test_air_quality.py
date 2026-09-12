import unittest
from app.api.weather import calculate_aqi_category

class TestAirQualityCalculation(unittest.TestCase):
    def test_good_air_quality(self):
        result = calculate_aqi_category(pm25=10.0, pm10=20.0)
        self.assertEqual(result["category"], "Good")
        self.assertEqual(result["color"], "emerald")

    def test_moderate_air_quality(self):
        result = calculate_aqi_category(pm25=20.0, pm10=40.0)
        self.assertEqual(result["category"], "Moderate")
        self.assertEqual(result["color"], "yellow")

    def test_hazardous_air_quality(self):
        result = calculate_aqi_category(pm25=60.0, pm10=120.0)
        self.assertEqual(result["category"], "Hazardous")
        self.assertEqual(result["color"], "rose")

if __name__ == "__main__":
    unittest.main()
