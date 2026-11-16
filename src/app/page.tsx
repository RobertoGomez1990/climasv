import Link from "next/link";
import { cityHighlights } from "@/lib/city-highlights";

export default function Home() {
  return (
    <main className="flex-1">
      <section className="mx-auto max-w-7xl px-3 pt-3 sm:px-6 sm:pt-6 lg:px-10">
        <div className="hero-sky relative isolate overflow-hidden rounded-[1.6rem] px-6 py-16 text-white sm:rounded-[2.5rem] sm:px-12 sm:py-24 lg:min-h-[610px] lg:px-20 lg:py-28">
          <div className="sky-orb pointer-events-none absolute -right-10 top-14 size-48 rounded-full sm:right-[9%] sm:top-12 sm:size-72 lg:right-[14%] lg:top-16 lg:size-[340px]" aria-hidden="true" />
          <div className="sky-cloud pointer-events-none absolute right-[3%] top-[43%] h-8 w-44 rotate-[-6deg] sm:right-[8%] sm:w-72" aria-hidden="true" />
          <div className="sky-cloud pointer-events-none absolute right-[28%] top-[26%] h-5 w-24 sm:w-44" aria-hidden="true" />
          <div className="sky-line pointer-events-none absolute inset-x-0 bottom-0 h-[42%]" aria-hidden="true" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0c3041] to-transparent" aria-hidden="true" />
          <div className="relative z-10 max-w-2xl">
            <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.17em] text-[#d5fbf8] backdrop-blur-sm">
              <span className="size-2 rounded-full bg-[#93ede1]" aria-hidden="true" /> El Salvador, a tu ritmo
            </p>
            <h1 className="text-[clamp(2.8rem,7vw,5.8rem)] font-bold leading-[1.04] tracking-[-0.07em]">
              Cada día trae<br /><span className="text-[#a1e8e5]">un nuevo cielo.</span>
            </h1>
            <p className="mt-7 max-w-lg text-base leading-7 text-[#def0f1] sm:text-lg sm:leading-8">Descubre las ciudades de nuestro país en un espacio pensado para consultar su clima de forma sencilla, clara y cercana.</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/clima" className="inline-flex min-h-12 items-center gap-3 rounded-full bg-[#b9f1eb] px-6 text-sm font-bold text-[#103b47] transition-transform hover:-translate-y-0.5 hover:bg-white">
                Explorar el clima <span aria-hidden="true">↗</span>
              </Link>
              <Link href="/ciudades" className="inline-flex min-h-12 items-center rounded-full border border-white/40 px-6 text-sm font-bold text-white transition-colors hover:bg-white/15">Conocer ciudades</Link>
            </div>
          </div>
          <div className="relative z-10 mt-16 flex flex-wrap items-center gap-3 text-xs font-medium text-[#d4f4f5] lg:absolute lg:bottom-9 lg:left-20 lg:mt-0">
            <span className="h-px w-9 bg-[#a1e8e5]" aria-hidden="true" /> Diseñado para explorar, sin prisas.
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-12 lg:py-28" aria-labelledby="por-que">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#076975]">El cielo en perspectiva</p>
            <h2 id="por-que" className="mt-4 max-w-md text-3xl font-bold leading-tight tracking-[-0.05em] text-[#173849] sm:text-4xl">Tu país, ciudad por ciudad.</h2>
          </div>
          <p className="max-w-xl text-base leading-7 text-[#536c79] lg:justify-self-end">Una experiencia limpia y accesible para encontrar tu lugar y comprender qué tiempo te espera con datos de Open-Meteo.</p>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {[
            { icon: "⌖", title: "Cerca de ti", text: "Descubre ciudades de distintas regiones de El Salvador en un mismo lugar." },
            { icon: "◷", title: "Sin complicaciones", text: "Navega entre lugares con información ordenada y fácil de encontrar." },
            { icon: "✳", title: "Con claridad", text: "Consulta datos reales; si el servicio falla, te lo diremos sin mostrar cifras inventadas." },
          ].map((benefit) => (
            <article key={benefit.title} className="rounded-[1.5rem] border border-[#e0eaed] bg-white p-7 shadow-[0_14px_35px_-32px_#163b4c]">
              <span className="flex size-12 items-center justify-center rounded-2xl bg-[#e6f5f4] text-2xl text-[#0b8291]" aria-hidden="true">{benefit.icon}</span>
              <h3 className="mt-6 text-lg font-bold tracking-tight text-[#193c4e]">{benefit.title}</h3>
              <p className="mt-2 text-sm leading-6 text-[#637680]">{benefit.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#eaf2f3] py-20 lg:py-24" aria-labelledby="destacadas">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#076975]">Explora más cerca</p>
              <h2 id="destacadas" className="mt-4 text-3xl font-bold tracking-[-0.05em] text-[#173849] sm:text-4xl">Ciudades destacadas</h2>
            </div>
            <Link href="/ciudades" className="text-sm font-bold text-[#076b79] underline decoration-[#65bdc5] underline-offset-8 hover:text-[#104755]">Ver todas las ciudades ↗</Link>
          </div>
          <div className="mt-9 grid gap-4 md:grid-cols-3">
            {cityHighlights.slice(0, 3).map((city) => (
              <Link href="/ciudades" key={city.slug} className="group flex min-h-52 flex-col justify-between rounded-[1.5rem] border border-[#d5e4e7] bg-white p-7 transition-transform hover:-translate-y-1 hover:shadow-lg">
                <span className="flex items-start justify-between text-xs font-bold uppercase tracking-widest text-[#076975]"><span>El Salvador / {city.symbol}</span><span aria-hidden="true" className="text-xl transition-transform group-hover:translate-x-1">↗</span></span>
                <span><span className="block text-2xl font-bold tracking-[-0.04em] text-[#193b4c]">{city.name}</span><span className="mt-1 block text-sm text-[#4d626d]">{city.department}</span></span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
