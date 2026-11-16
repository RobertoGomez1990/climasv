"use client";

import { useEffect, useState } from "react";
import ForecastList from "./ForecastList";
import WeatherCard from "./WeatherCard";
import { cities, getCityBySlug, type CitySlug } from "@/lib/cities";
import type { WeatherData } from "@/types/weather";

type WeatherState =
  | { status: "loading" }
  | { status: "empty" }
  | { status: "error"; message: string }
  | { status: "success"; data: WeatherData };

function isWeatherData(value: unknown): value is WeatherData {
  if (typeof value !== "object" || value === null) return false;
  const data = value as Partial<WeatherData>;
  return !!data.city && typeof data.city.name === "string" && !!data.current &&
    typeof data.current.temperature === "number" && typeof data.current.feelsLike === "number" &&
    typeof data.current.humidity === "number" && typeof data.current.windSpeed === "number" &&
    typeof data.current.weatherCode === "number" && typeof data.current.time === "string" &&
    Array.isArray(data.forecast);
}

export default function WeatherDashboard({ initialSlug }: { initialSlug: CitySlug }) {
  const [selectedSlug, setSelectedSlug] = useState<CitySlug>(initialSlug);
  const [attempt, setAttempt] = useState(0);
  const [state, setState] = useState<WeatherState>({ status: "loading" });

  useEffect(() => {
    const controller = new AbortController();

    async function loadWeather() {
      try {
        const response = await fetch(`/api/weather?city=${encodeURIComponent(selectedSlug)}`, {
          signal: controller.signal,
          cache: "no-store",
        });
        const payload: unknown = await response.json();
        if (controller.signal.aborted) return;

        if (!response.ok) {
          const message = typeof payload === "object" && payload !== null && "error" in payload &&
            typeof payload.error === "string" ? payload.error : "No fue posible consultar el clima.";
          setState({ status: "error", message });
          return;
        }

        if (payload === null || (isWeatherData(payload) && payload.forecast.length === 0)) {
          setState({ status: "empty" });
        } else if (isWeatherData(payload)) {
          setState({ status: "success", data: payload });
        } else {
          setState({ status: "error", message: "La respuesta meteorológica no tiene el formato esperado." });
        }
      } catch {
        if (!controller.signal.aborted) {
          setState({ status: "error", message: "No se pudo conectar con el servicio meteorológico. Inténtalo de nuevo." });
        }
      }
    }

    void loadWeather();
    return () => controller.abort();
  }, [selectedSlug, attempt]);

  function changeCity(value: string) {
    const city = getCityBySlug(value);
    if (!city || city.slug === selectedSlug) return;
    setState({ status: "loading" });
    setSelectedSlug(city.slug);
  }

  function retry() {
    setState({ status: "loading" });
    setAttempt((previous) => previous + 1);
  }

  return (
    <section className="mt-10" aria-label="Panel meteorológico">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4 rounded-2xl border border-[#dbe7e9] bg-white p-5 sm:p-6">
        <div className="w-full sm:w-auto">
          <label htmlFor="weather-city" className="mb-2 block text-sm font-bold text-[#173849]">Selecciona una ciudad</label>
          <select id="weather-city" value={selectedSlug} onChange={(event) => changeCity(event.target.value)} className="min-h-12 w-full min-w-60 rounded-xl border border-[#b7d3da] bg-white px-4 text-[#173849] focus-visible:border-[#0b8793] sm:w-auto">
            {cities.map((city) => <option key={city.slug} value={city.slug}>{city.name}</option>)}
          </select>
        </div>
        <p className="text-sm text-[#4d626d]">Datos reales de <a href="https://open-meteo.com/" target="_blank" rel="noopener noreferrer" className="font-semibold text-[#087383] underline underline-offset-4">Open-Meteo</a> · Temperaturas en °C</p>
      </div>

      <div aria-live="polite" aria-atomic="true">
        {state.status === "loading" && (
          <div role="status" className="rounded-[1.7rem] border border-[#dbe7e9] bg-white px-7 py-20 text-center sm:px-12">
            <span className="mx-auto block size-11 animate-pulse rounded-full bg-[#b8e7e4]" aria-hidden="true" />
            <p className="mt-6 text-lg font-semibold text-[#173849]">Consultando el clima de {getCityBySlug(selectedSlug)?.name}…</p>
          </div>
        )}
        {state.status === "error" && (
          <div role="alert" className="rounded-[1.7rem] border border-[#eacdc9] bg-[#fff9f7] p-8 sm:p-12">
            <h2 className="text-2xl font-bold text-[#763d35]">No pudimos cargar el clima</h2>
            <p className="mt-3 max-w-xl text-sm leading-7 text-[#664d49]">{state.message}</p>
            <button type="button" onClick={retry} className="mt-7 min-h-12 rounded-full bg-[#12465a] px-6 text-sm font-bold text-white hover:bg-[#0b7585]">Reintentar</button>
          </div>
        )}
        {state.status === "empty" && (
          <div className="rounded-[1.7rem] border border-[#dbe7e9] bg-white p-8 sm:p-12">
            <h2 className="text-2xl font-bold text-[#173849]">No hay datos disponibles</h2>
            <p className="mt-3 text-sm text-[#4d626d]">Prueba otra ciudad o vuelve a consultar más tarde.</p>
            <button type="button" onClick={retry} className="mt-7 min-h-12 rounded-full bg-[#12465a] px-6 text-sm font-bold text-white hover:bg-[#0b7585]">Reintentar</button>
          </div>
        )}
        {state.status === "success" && (
          <>
            <WeatherCard weather={state.data} />
            <ForecastList days={state.data.forecast} />
          </>
        )}
      </div>
    </section>
  );
}
