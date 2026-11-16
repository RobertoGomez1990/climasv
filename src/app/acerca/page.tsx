import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Acerca de | ClimaSV",
  description: "Conoce el propósito y las tecnologías detrás de ClimaSV.",
};

export default function AboutPage() {
  return (
    <main className="flex-1">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#076975]">Sobre este proyecto</p>
            <h1 className="mt-5 max-w-xl text-4xl font-bold leading-[1.1] tracking-[-0.06em] text-[#173849] sm:text-6xl">Una forma más cercana de mirar el cielo.</h1>
            <p className="mt-7 max-w-xl text-base leading-8 text-[#526c79]">ClimaSV nace como proyecto académico para acercar la información meteorológica de ciudades salvadoreñas a una experiencia sencilla, útil y agradable de recorrer.</p>
            <Link href="/ciudades" className="mt-8 inline-flex min-h-12 items-center rounded-full bg-[#12465a] px-6 text-sm font-bold text-white transition-colors hover:bg-[#0b7585]">Descubrir ciudades <span className="ml-3" aria-hidden="true">↗</span></Link>
          </div>
          <div className="relative overflow-hidden rounded-[2rem] bg-[#123e51] p-9 text-white sm:p-12">
            <div className="absolute -right-16 -top-16 size-64 rounded-full border-[45px] border-[#226d7a]/60" aria-hidden="true" />
            <p className="relative text-xs font-bold uppercase tracking-[0.2em] text-[#a9e9e4]">La idea</p>
            <p className="relative mt-20 max-w-sm text-2xl font-semibold leading-snug tracking-[-0.04em] sm:text-3xl">La información importa más cuando se entiende de un vistazo.</p>
            <div className="relative mt-10 h-px bg-white/25" />
            <p className="relative mt-5 text-sm text-[#d3e5e7]">Diseñado pensando en El Salvador.</p>
          </div>
        </div>

        <section className="mt-20 border-t border-[#d7e4e7] pt-12 lg:mt-28" aria-labelledby="como-se-construye">
          <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#076975]">Detrás de la experiencia</p>
          <h2 id="como-se-construye" className="mt-3 text-3xl font-bold tracking-[-0.05em] text-[#173849]">Tecnología y transparencia</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <article className="rounded-2xl border border-[#e0eaed] bg-white p-7"><h3 className="text-lg font-bold text-[#173849]">Next.js + TypeScript</h3><p className="mt-3 text-sm leading-6 text-[#5e7480]">Una base moderna para construir rutas claras y componentes mantenibles.</p></article>
            <article className="rounded-2xl border border-[#e0eaed] bg-white p-7"><h3 className="text-lg font-bold text-[#173849]">Tailwind CSS</h3><p className="mt-3 text-sm leading-6 text-[#5e7480]">Diseño adaptable para disfrutar la experiencia en móvil y escritorio.</p></article>
            <article className="rounded-2xl border border-[#e0eaed] bg-white p-7"><h3 className="text-lg font-bold text-[#173849]">Open-Meteo</h3><p className="mt-3 text-sm leading-6 text-[#5e7480]">Fuente de datos actuales y pronósticos consultados desde nuestra API interna. <a href="https://open-meteo.com/" target="_blank" rel="noopener noreferrer" className="font-semibold text-[#087383] underline underline-offset-4">Conoce Open-Meteo</a>.</p></article>
          </div>
          <p className="mt-8 text-sm text-[#5d7480]">Autor: <span className="font-semibold text-[#173849]">Pendiente de completar por el estudiante</span>.</p>
        </section>
      </div>
    </main>
  );
}
