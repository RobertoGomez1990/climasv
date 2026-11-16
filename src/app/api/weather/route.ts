import { getCityBySlug } from "@/lib/cities";
import { getWeather, WeatherServiceError } from "@/lib/weather";
import type { WeatherError } from "@/types/weather";

export async function GET(request: Request) {
  const slug = new URL(request.url).searchParams.get("city");
  const city = getCityBySlug(slug);

  if (!city) {
    return Response.json({ error: "Ciudad no válida. Elige una ciudad del catálogo." } satisfies WeatherError, { status: 400 });
  }

  try {
    return Response.json(await getWeather(city), { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    if (error instanceof WeatherServiceError) {
      return Response.json({ error: error.message } satisfies WeatherError, { status: error.status });
    }
    console.error("Fallo inesperado al consultar Open-Meteo:", error);
    return Response.json({ error: "No fue posible consultar el clima en este momento." } satisfies WeatherError, { status: 503 });
  }
}
