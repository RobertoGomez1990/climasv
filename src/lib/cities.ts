export interface City {
  slug: string;
  name: string;
  department: string;
  latitude: number;
  longitude: number;
}

// Puntos de referencia aproximados, no direcciones exactas. Coordenadas contrastadas
// con https://geocoding-api.open-meteo.com/v1/search (El Salvador, nombre y departamento).
export const cities = [
  { slug: "san-salvador", name: "San Salvador", department: "San Salvador", latitude: 13.68935, longitude: -89.18718 },
  { slug: "santa-ana", name: "Santa Ana", department: "Santa Ana", latitude: 13.98827, longitude: -89.55685 },
  { slug: "san-miguel", name: "San Miguel", department: "San Miguel", latitude: 13.48261, longitude: -88.18211 },
  { slug: "la-libertad", name: "La Libertad", department: "La Libertad", latitude: 13.48833, longitude: -89.32222 },
  { slug: "suchitoto", name: "Suchitoto", department: "Cuscatlán", latitude: 13.93806, longitude: -89.02778 },
] as const satisfies readonly City[];

export type CitySlug = (typeof cities)[number]["slug"];
export type CatalogCity = (typeof cities)[number];

export function getCityBySlug(slug: string | null): CatalogCity | undefined {
  return cities.find((city) => city.slug === slug);
}
