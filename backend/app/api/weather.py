from fastapi import APIRouter, Query
from app.core.open_meteo import get_current_weather, get_forecast, get_historical_weather, geocode_location

router = APIRouter(prefix="/api/v1/weather", tags=["weather"])

@router.get("/current")
def current_weather(
    lat: float = Query(19.0760, description="Latitude"),
    lon: float = Query(72.8777, description="Longitude"),
    location_name: str = Query("Mumbai", description="Location name")
):
    weather = get_current_weather(lat, lon)
    weather["location_name"] = location_name
    return weather

@router.get("/forecast")
def forecast_weather(
    lat: float = Query(19.0760, description="Latitude"),
    lon: float = Query(72.8777, description="Longitude"),
    days: int = Query(7, ge=1, le=16, description="Days forecast (1-16)")
):
    return get_forecast(lat, lon, days=days)

@router.get("/history")
def history_weather(
    lat: float = Query(19.0760, description="Latitude"),
    lon: float = Query(72.8777, description="Longitude"),
    start_date: str = Query("2025-08-01"),
    end_date: str = Query("2025-08-15")
):
    return get_historical_weather(lat, lon, start_date, end_date)

@router.get("/geocode")
def geocode(query: str = Query(..., description="Location search query")):
    return geocode_location(query)

def calculate_aqi_category(pm25: float, pm10: float) -> dict:
    """Calculates Air Quality Index category and health advisory based on PM2.5 and PM10."""
    score = max(pm25 * 4.0, pm10 * 2.0)
    if score <= 50:
        return {"aqi": int(score), "category": "Good", "color": "emerald", "advisory": "Air quality is satisfactory. Enjoy outdoor activities."}
    elif score <= 100:
        return {"aqi": int(score), "category": "Moderate", "color": "yellow", "advisory": "Acceptable air quality. Sensitive individuals should reduce intense outdoor activities."}
    elif score <= 200:
        return {"aqi": int(score), "category": "Unhealthy", "color": "orange", "advisory": "Unhealthy for sensitive groups. Wear N95 mask outdoors."}
    else:
        return {"aqi": int(score), "category": "Hazardous", "color": "rose", "advisory": "Hazardous air pollution level. Avoid all outdoor physical activities."}

@router.get("/air-quality")
def air_quality(
    lat: float = Query(19.0760, description="Latitude"),
    lon: float = Query(72.8777, description="Longitude"),
    pm25: float = Query(12.5, ge=0.0, description="PM2.5 concentration in ug/m3"),
    pm10: float = Query(25.0, ge=0.0, description="PM10 concentration in ug/m3")
):
    result = calculate_aqi_category(pm25, pm10)
    result.update({
        "latitude": lat,
        "longitude": lon,
        "pollutants": {"pm25": pm25, "pm10": pm10}
    })
    return result

