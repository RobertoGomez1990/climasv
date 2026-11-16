import type { ForecastDay } from "@/types/weather";
import { formatDay, formatValue, weatherLabel } from "@/lib/weather-display";

export default function ForecastList({ days }: { days: ForecastDay[] }) {
  return (
    <section className="mt-12" aria-labelledby="pronostico">
      <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#076975]">Mirada a futuro</p>
      <h2 id="pronostico" className="mt-3 text-2xl font-bold tracking-[-0.04em] text-[#173849] sm:text-3xl">Pronóstico de cinco días</h2>
      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {days.map((day) => (
          <article key={day.date} className="rounded-2xl border border-[#dfebed] bg-white p-5 shadow-[0_14px_35px_-32px_#163b4c]">
            <h3 className="font-bold capitalize text-[#183b4b]">{formatDay(day.date)}</h3>
            <p className="mt-3 text-sm text-[#56707a]">{weatherLabel(day.weatherCode)}</p>
            <p className="mt-5 text-xl font-bold text-[#173849]">{formatValue(day.max)} °C <span className="text-base font-medium text-[#4d626d]">/ {formatValue(day.min)} °C</span></p>
            <p className="mt-3 text-sm text-[#55717d]">Prob. de lluvia: <strong className="text-[#0b7787]">{formatValue(day.rainProbability)} %</strong></p>
          </article>
        ))}
      </div>
    </section>
  );
}
