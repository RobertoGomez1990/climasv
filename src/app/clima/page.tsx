import type { Metadata } from "next";
import WeatherDashboard from "@/components/WeatherDashboard";
import { cities, getCityBySlug } from "@/lib/cities";

export const metadata: Metadata = {
  title: "Clima | ClimaSV",
  description: "Consulta las condiciones actuales y el pronóstico de cinco días en ciudades de El Salvador.",
};

export default async function ClimatePage({
  searchParams,
}: {
  searchParams: Promise<{ city?: string | string[] }>;
}) {
  const cityParam = (await searchParams).city;
  const initialSlug = getCityBySlug(typeof cityParam === "string" ? cityParam : null)?.slug ?? cities[0].slug;

  return (
    <main className="flex-1">
      <div className="mx-auto max-w-7xl px-5 pb-20 pt-14 sm:px-8 lg:px-12 lg:pb-28 lg:pt-20">
        <div className="max-w-3xl">
          <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#076975]">Condiciones en vivo</p>
          <h1 className="mt-4 text-4xl font-bold tracking-[-0.06em] text-[#173849] sm:text-6xl">Clima, sin rodeos.</h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-[#5c7380] sm:text-lg">El tiempo de nuestras ciudades, con datos actuales y un pronóstico de cinco días. Fuente: <a href="https://open-meteo.com/" target="_blank" rel="noopener noreferrer" className="font-semibold text-[#087383] underline underline-offset-4">Open-Meteo</a>.</p>
        </div>
        <WeatherDashboard key={initialSlug} initialSlug={initialSlug} />
      </div>
    </main>
  );
}
