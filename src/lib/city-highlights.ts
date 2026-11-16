import { cities, type CitySlug } from "./cities";

// Fichas editoriales de la etapa de diseño; no contienen datos meteorológicos.
const descriptions: Record<CitySlug, string> = {
  "san-salvador": "El pulso urbano de la capital, entre volcanes y vida cultural.",
  "santa-ana": "Arquitectura, plazas y paisajes del occidente salvadoreño.",
  "san-miguel": "Una ciudad llena de historia en el oriente del país.",
  "la-libertad": "Costa, mercados y encuentros junto al océano Pacífico.",
  suchitoto: "Calles empedradas, arte y vistas hacia el lago Suchitlán.",
};

export const cityHighlights = cities.map((city, index) => ({
  ...city,
  symbol: String(index + 1).padStart(2, "0"),
  detail: descriptions[city.slug],
}));
