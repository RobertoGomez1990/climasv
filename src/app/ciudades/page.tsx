import type { Metadata } from "next";
import CityExplorer from "@/components/CityExplorer";
import { cityHighlights } from "@/lib/city-highlights";

export const metadata: Metadata = {
  title: "Ciudades | ClimaSV",
  description: "Busca ciudades de El Salvador y guarda tus favoritas para consultarlas después.",
};

export default function CitiesPage() {
  return (
    <main className="flex-1">
      <section className="bg-[#123e51] text-white">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
          <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#a1e9e4]">Un país para explorar</p>
          <h1 className="mt-5 max-w-2xl text-4xl font-bold leading-tight tracking-[-0.06em] sm:text-6xl">Cada ciudad tiene<br /><span className="text-[#9ce2df]">su propio horizonte.</span></h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-[#cee3e7]">Encuentra tus ciudades, guárdalas como favoritas y descubre qué tiempo hace en cada una.</p>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-12 lg:py-24" aria-labelledby="lista-ciudades">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#076975]">Nuestro recorrido</p>
          <h2 id="lista-ciudades" className="mt-3 text-3xl font-bold tracking-[-0.05em] text-[#173849] sm:text-4xl">Conoce las ciudades</h2>
        </div>
        <CityExplorer cities={cityHighlights} />
        <p className="mt-8 text-sm leading-6 text-[#4d626d]">Los favoritos se guardan solo en este navegador. Las coordenadas usadas para consultar el clima son puntos aproximados de referencia.</p>
      </section>
    </main>
  );
}
