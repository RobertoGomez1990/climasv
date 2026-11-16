"use client";

import { useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { getCityBySlug, type CitySlug } from "@/lib/cities";
import type { cityHighlights } from "@/lib/city-highlights";

type Highlight = (typeof cityHighlights)[number];
const STORAGE_KEY = "climasv:favorites";
const CHANGE_EVENT = "climasv:favorites-change";
const UNAVAILABLE = "__storage_unavailable__";

function subscribeToFavorites(onChange: () => void): () => void {
  window.addEventListener("storage", onChange);
  window.addEventListener(CHANGE_EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(CHANGE_EVENT, onChange);
  };
}

function getFavoritesSnapshot(): string {
  try {
    return localStorage.getItem(STORAGE_KEY) ?? "[]";
  } catch {
    return UNAVAILABLE;
  }
}

function getServerSnapshot(): string {
  return "[]";
}

function parseFavorites(raw: string): { slugs: CitySlug[]; invalid: boolean } {
  try {
    const stored: unknown = JSON.parse(raw);
    if (!Array.isArray(stored)) return { slugs: [], invalid: true };
    return { slugs: stored.filter((slug): slug is CitySlug => typeof slug === "string" && !!getCityBySlug(slug)), invalid: false };
  } catch {
    return { slugs: [], invalid: true };
  }
}

function normalize(text: string): string {
  return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("es-SV");
}

export default function CityExplorer({ cities }: { cities: Highlight[] }) {
  const [query, setQuery] = useState("");
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  const [writeError, setWriteError] = useState(false);
  const snapshot = useSyncExternalStore(subscribeToFavorites, getFavoritesSnapshot, getServerSnapshot);
  const { slugs: favorites, invalid } = parseFavorites(snapshot);

  function toggleFavorite(slug: CitySlug) {
    const next = favorites.includes(slug) ? favorites.filter((favorite) => favorite !== slug) : [...favorites, slug];
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      window.dispatchEvent(new Event(CHANGE_EVENT));
      setWriteError(false);
    } catch {
      setWriteError(true);
    }
  }

  const term = normalize(query.trim());
  const visibleCities = cities.filter((city) =>
    (!onlyFavorites || favorites.includes(city.slug)) &&
    (!term || normalize(`${city.name} ${city.department}`).includes(term)),
  );

  return (
    <div className="mt-9">
      <div className="flex flex-col gap-4 rounded-2xl border border-[#dbe7e9] bg-white p-5 sm:flex-row sm:items-end sm:justify-between sm:p-6">
        <div className="w-full sm:max-w-sm">
          <label htmlFor="city-search" className="mb-2 block text-sm font-bold text-[#173849]">Buscar ciudad o departamento</label>
          <input id="city-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Ej. Santa Ana" className="min-h-12 w-full rounded-xl border border-[#b7d3da] bg-white px-4 text-[#173849] placeholder:text-[#7a8f98]" />
        </div>
        <label className="flex min-h-12 cursor-pointer items-center gap-3 text-sm font-semibold text-[#244c5b]">
          <input type="checkbox" checked={onlyFavorites} onChange={(event) => setOnlyFavorites(event.target.checked)} className="size-5 accent-[#0b8793]" />
          Solo favoritas {favorites.length > 0 ? `(${favorites.length})` : ""}
        </label>
      </div>

      {(invalid || snapshot === UNAVAILABLE || writeError) && <p role="status" className="mt-4 rounded-xl bg-[#fff3e9] px-4 py-3 text-sm text-[#754a2e]">No se pudieron guardar o recuperar tus favoritos en este navegador. Puedes seguir explorando las ciudades.</p>}
      <p role="status" className="mt-6 text-sm text-[#5d747e]">{visibleCities.length} {visibleCities.length === 1 ? "ciudad encontrada" : "ciudades encontradas"}</p>

      {visibleCities.length === 0 ? (
        <div className="mt-5 rounded-2xl border border-[#dbe7e9] bg-white p-8 text-center text-[#526c79]">
          <p className="text-lg font-bold text-[#173849]">No encontramos ciudades</p>
          <p className="mt-2 text-sm">Prueba otro término o desactiva el filtro de favoritas.</p>
        </div>
      ) : (
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visibleCities.map((city) => {
            const favorite = favorites.includes(city.slug);
            return (
              <article key={city.slug} className="flex min-h-72 flex-col rounded-[1.5rem] border border-[#e1e9ec] bg-white p-7 shadow-[0_14px_35px_-32px_#163b4c]">
                <div className="flex items-start justify-between gap-2">
                  <span className="pt-3 text-xs font-bold uppercase tracking-[0.18em] text-[#076975]">Destino {city.symbol}</span>
                  <button type="button" onClick={() => toggleFavorite(city.slug)} aria-pressed={favorite} aria-label={`${favorite ? "Quitar" : "Guardar"} ${city.name} ${favorite ? "de" : "en"} favoritos`} className={`flex size-11 shrink-0 items-center justify-center rounded-full border text-xl transition-colors ${favorite ? "border-[#0b8793] bg-[#e5f5f3] text-[#087383]" : "border-[#dbe7e9] text-[#607782] hover:bg-[#e5f5f3]"}`}>
                    <span aria-hidden="true">{favorite ? "★" : "☆"}</span>
                  </button>
                </div>
                <h3 className="mt-6 text-2xl font-bold tracking-[-0.05em] text-[#183b4b]">{city.name}</h3>
                <p className="mt-1 text-xs font-bold uppercase tracking-widest text-[#4d626d]">{city.department}</p>
                <p className="mt-4 text-sm leading-6 text-[#596f7b]">{city.detail}</p>
                <Link href={`/clima?city=${city.slug}`} className="mt-auto inline-flex w-fit items-center pt-7 text-sm font-bold text-[#087383] underline decoration-[#8ad0d2] underline-offset-6 hover:text-[#114c5c]">Ver clima <span className="ml-2" aria-hidden="true">↗</span></Link>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
