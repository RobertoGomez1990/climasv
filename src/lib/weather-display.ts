export function weatherLabel(code: number): string {
  if (code === 0) return "Cielo despejado";
  if (code === 1 || code === 2) return "Parcialmente nublado";
  if (code === 3) return "Nublado";
  if (code === 45 || code === 48) return "Niebla";
  if ([51, 53, 55, 56, 57].includes(code)) return "Llovizna";
  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return "Lluvia";
  if ([71, 73, 75, 77, 85, 86].includes(code)) return "Nieve";
  if ([95, 96, 99].includes(code)) return "Tormenta";
  return "Condición variable";
}

export function formatDay(date: string): string {
  return new Intl.DateTimeFormat("es-SV", { weekday: "long", day: "numeric", month: "short", timeZone: "UTC" })
    .format(new Date(`${date}T12:00:00Z`));
}

export function formatLocalTime(time: string): string {
  // Open-Meteo envía la hora local sin desplazamiento UTC; no convertirla a la zona del visitante.
  const date = new Date(`${time}Z`);
  if (Number.isNaN(date.getTime())) return time.replace("T", " · ");
  return new Intl.DateTimeFormat("es-SV", {
    day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit", hourCycle: "h23", timeZone: "UTC",
  }).format(date);
}

export function formatValue(value: number): string {
  return new Intl.NumberFormat("es-SV", { maximumFractionDigits: 1 }).format(value);
}
