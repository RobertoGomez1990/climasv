import type { CitySlug } from "@/lib/cities";

export interface CurrentWeather {
  temperature: number; // °C
  feelsLike: number; // °C
  humidity: number; // %
  windSpeed: number; // km/h
  weatherCode: number;
  time: string; // Hora local de la ciudad, tal como la entrega Open-Meteo.
}

export interface ForecastDay {
  date: string; // AAAA-MM-DD, hora local de la ciudad.
  min: number; // °C
  max: number; // °C
  rainProbability: number; // %
  weatherCode: number;
}

export interface WeatherData {
  city: { slug: CitySlug; name: string };
  current: CurrentWeather;
  forecast: ForecastDay[];
}

export interface WeatherError {
  error: string;
}
