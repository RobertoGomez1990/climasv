import type { CatalogCity } from "./cities";
import type { ForecastDay, WeatherData } from "@/types/weather";

const DEFAULT_BASE_URL = "https://api.open-meteo.com";
const TIMEOUT_MS = 8000;
const FORECAST_DAYS = 5;

export class WeatherServiceError extends Error {
  constructor(message: string, public readonly status: 502 | 503) {
    super(message);
    this.name = "WeatherServiceError";
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value);
}

function hasFiveNumbers(value: unknown): value is number[] {
  return Array.isArray(value) && value.length >= FORECAST_DAYS && value.slice(0, FORECAST_DAYS).every(isNumber);
}

function hasFiveDates(value: unknown): value is string[] {
  return Array.isArray(value) && value.length >= FORECAST_DAYS && value.slice(0, FORECAST_DAYS).every((date: unknown) => typeof date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(date));
}

function normalizeWeather(payload: unknown, city: CatalogCity): WeatherData {
  if (!isRecord(payload) || !isRecord(payload.current) || !isRecord(payload.daily)) {
    throw new WeatherServiceError("El servicio meteorológico devolvió datos incompletos.", 502);
  }

  const { current, daily } = payload;
  if (
    !isNumber(current.temperature_2m) || !isNumber(current.apparent_temperature) ||
    !isNumber(current.relative_humidity_2m) || !isNumber(current.wind_speed_10m) ||
    !isNumber(current.weather_code) || typeof current.time !== "string" || !current.time.trim() ||
    !hasFiveDates(daily.time) || !hasFiveNumbers(daily.temperature_2m_max) ||
    !hasFiveNumbers(daily.temperature_2m_min) ||
    !hasFiveNumbers(daily.precipitation_probability_max) || !hasFiveNumbers(daily.weather_code)
  ) {
    throw new WeatherServiceError("El servicio meteorológico devolvió datos incompletos.", 502);
  }

  const dates = daily.time;
  const minimums = daily.temperature_2m_min;
  const maximums = daily.temperature_2m_max;
  const rainProbabilities = daily.precipitation_probability_max;
  const weatherCodes = daily.weather_code;

  const forecast: ForecastDay[] = dates.slice(0, FORECAST_DAYS).map((date, index) => ({
    date,
    min: minimums[index],
    max: maximums[index],
    rainProbability: rainProbabilities[index],
    weatherCode: weatherCodes[index],
  }));

  return {
    city: { slug: city.slug, name: city.name },
    current: {
      temperature: current.temperature_2m,
      feelsLike: current.apparent_temperature,
      humidity: current.relative_humidity_2m,
      windSpeed: current.wind_speed_10m,
      weatherCode: current.weather_code,
      time: current.time,
    },
    forecast,
  };
}

export async function getWeather(city: CatalogCity): Promise<WeatherData> {
  const baseUrl = process.env.OPEN_METEO_BASE_URL?.trim() || DEFAULT_BASE_URL;
  let url: URL;

  try {
    url = new URL(`${baseUrl.replace(/\/+$/, "")}/v1/forecast`);
    if (!(["https:", "http:"].includes(url.protocol))) throw new Error("Protocolo no admitido");
  } catch {
    throw new WeatherServiceError("La configuración del servicio meteorológico no es válida.", 503);
  }

  url.searchParams.set("latitude", String(city.latitude));
  url.searchParams.set("longitude", String(city.longitude));
  url.searchParams.set("current", "temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m");
  url.searchParams.set("daily", "temperature_2m_max,temperature_2m_min,precipitation_probability_max,weather_code");
  url.searchParams.set("timezone", "auto");
  url.searchParams.set("forecast_days", String(FORECAST_DAYS));
  url.searchParams.set("temperature_unit", "celsius");
  url.searchParams.set("wind_speed_unit", "kmh");

  const signal = AbortSignal.timeout(TIMEOUT_MS);
  let response: Response;
  try {
    response = await fetch(url, { cache: "no-store", signal, headers: { Accept: "application/json" } });
  } catch {
    throw new WeatherServiceError(
      signal.aborted ? "El servicio meteorológico tardó demasiado en responder." : "El servicio meteorológico no está disponible.",
      503,
    );
  }

  if (!response.ok) {
    throw new WeatherServiceError("El servicio meteorológico no pudo completar la consulta.", 502);
  }

  let payload: unknown;
  try {
    payload = await response.json();
  } catch {
    if (signal.aborted) {
      throw new WeatherServiceError("El servicio meteorológico tardó demasiado en responder.", 503);
    }
    throw new WeatherServiceError("El servicio meteorológico devolvió una respuesta no válida.", 502);
  }

  return normalizeWeather(payload, city);
}
