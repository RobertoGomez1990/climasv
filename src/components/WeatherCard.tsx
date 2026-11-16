import type { WeatherData } from "@/types/weather";
import { formatLocalTime, formatValue, weatherLabel } from "@/lib/weather-display";

export default function WeatherCard({ weather }: { weather: WeatherData }) {
  const { current } = weather;

  return (
    <article className="hero-sky relative overflow-hidden rounded-[1.7rem] p-7 text-white sm:p-10 lg:p-12" aria-labelledby="clima-actual">
      <div className="sky-orb pointer-events-none absolute -right-12 top-8 size-44 rounded-full opacity-75 sm:right-12 sm:size-56" aria-hidden="true" />
      <div className="relative">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#b6eae7]">Condiciones actuales</p>
        <h2 id="clima-actual" className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">{weather.city.name}</h2>
        <p className="mt-2 text-sm text-[#e1f3f3]">Actualizado: {formatLocalTime(current.time)} (hora local)</p>
        <div className="mt-10 flex flex-wrap items-end gap-x-8 gap-y-3">
          <p className="text-7xl font-semibold tracking-[-0.08em] sm:text-8xl">{formatValue(current.temperature)}<span className="ml-1 align-top text-3xl tracking-normal sm:text-4xl">°C</span></p>
          <p className="pb-3 text-lg font-medium text-[#def5f3]">{weatherLabel(current.weatherCode)}</p>
        </div>
        <dl className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {[
            { label: "Sensación térmica", value: `${formatValue(current.feelsLike)} °C` },
            { label: "Humedad", value: `${formatValue(current.humidity)} %` },
            { label: "Viento", value: `${formatValue(current.windSpeed)} km/h` },
          ].map((item) => (
            <div key={item.label} className="rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-sm">
              <dt className="text-xs font-medium text-[#cfe9eb]">{item.label}</dt>
              <dd className="mt-2 text-xl font-bold">{item.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </article>
  );
}
