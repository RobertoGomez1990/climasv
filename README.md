# ClimaSV

Aplicación web académica para consultar el **clima actual y el pronóstico de cinco días** de cinco ciudades de El Salvador. Permite elegir una ciudad, buscar en el catálogo y guardar favoritas en este navegador. Los datos meteorológicos vienen de [Open-Meteo](https://open-meteo.com/); no se muestran datos simulados como si fueran actuales. Si el proveedor falla, la interfaz informa del error y ofrece reintentar.

## Tecnologías y requisitos

- Next.js **16.4.6** con App Router (`src/app`), React **19.3.0** y TypeScript estricto.
- Tailwind CSS **4.3.3**, ESLint y npm.
- Node.js **20.9 o superior** (mínimo indicado por Next.js 16). Entorno local comprobado: Node.js **24.18.0**, npm **11.9.0**.
- Acceso a Internet para obtener el clima desde Open-Meteo. No hace falta una API key.

## Instalación y uso local

```bash
npm ci
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000). En `/ciudades`, busca por nombre o departamento, pulsa la estrella para guardar favoritas y elige **Ver clima**; esto abre `/clima?city=<slug>` con esa ciudad seleccionada. En `/clima`, cambia la ciudad en el selector para consultar datos actuales y cinco días de pronóstico. Si aparece un error, pulsa **Reintentar**. Los favoritos se almacenan en `localStorage` del navegador y no se comparten entre dispositivos.

Para usar otro proveedor compatible durante desarrollo, crea un archivo **local y no versionado** `.env.local` basado en `.env.example`, modifica `OPEN_METEO_BASE_URL` y reinicia el servidor. Este archivo **no es necesario** para el uso normal.

## Rutas

| Ruta | Función |
| --- | --- |
| `/` | Presentación, beneficios y ciudades destacadas. |
| `/clima` | Clima actual (temperatura, sensación térmica, humedad, viento) y pronóstico de cinco días; admite `?city=<slug>`. |
| `/ciudades` | Catálogo de cinco ciudades, filtro por nombre/departamento y favoritas locales. |
| `/acerca` | Propósito, tecnologías, autor por completar y atribución al proveedor. |

Ciudades admitidas: San Salvador (`san-salvador`), Santa Ana (`santa-ana`), San Miguel (`san-miguel`), La Libertad (`la-libertad`) y Suchitoto (`suchitoto`). Las coordenadas del catálogo son **puntos de referencia aproximados**, contrastados con el geocodificador de Open-Meteo; no son direcciones exactas.

## API interna

`GET /api/weather?city=<slug>` valida el slug contra el catálogo y consulta desde el servidor `https://api.open-meteo.com/v1/forecast`. Devuelve JSON normalizado con `city: { slug, name }`, `current: { temperature, feelsLike, humidity, windSpeed, weatherCode, time }` y `forecast`, una lista de cinco objetos `{ date, min, max, rainProbability, weatherCode }`. Temperaturas en **°C**, viento en **km/h**, probabilidad y humedad en **%**. Las fechas y la hora corresponden a la zona local de la ciudad informada por Open-Meteo.

Ejemplo de consulta (la respuesta cambia según el momento; aquí no se incluyen cifras inventadas):

```text
GET http://localhost:3000/api/weather?city=san-salvador
```

| Estado | Significado |
| --- | --- |
| `200` | Datos reales normalizados del proveedor. |
| `400` | Ciudad ausente o slug no incluido en el catálogo. |
| `502` | El proveedor respondió con error o datos incompletos/no válidos. |
| `503` | Proveedor no disponible, tiempo de espera agotado (8 s) o configuración incorrecta. |

La API no acepta URL del proveedor proporcionadas por el visitante ni requiere credenciales. El servidor pide solo los campos necesarios y no devuelve el JSON completo de Open-Meteo.

## Configuración

| Variable | Obligatoria | Valor por defecto | Uso |
| --- | --- | --- | --- |
| `OPEN_METEO_BASE_URL` | No | `https://api.open-meteo.com` | URL base del servicio meteorológico, solo del lado servidor. |

El ejemplo está en [`.env.example`](.env.example). `.gitignore` excluye `.env.local` y permite versionar `.env.example`. No incluyas tokens ni secretos en archivos versionados.

## Scripts y verificaciones

```bash
npm run dev        # desarrollo local
npm run lint       # ESLint
npx tsc --noEmit   # comprobación de tipos
npm run build      # compilación de producción
npm run start      # sirve la compilación tras build
```

**Evidencia registrada:** en las etapas 3–5 se obtuvieron respuestas HTTP 200 para rutas y una ciudad válida, 400 para slug inválido, y 502/503 con un proveedor local de prueba; se probaron búsqueda, favoritos tras recarga, estados de carga/error/reintento y cancelación de petición en el navegador integrado. El 16 de noviembre de 2026, `npm run lint`, `npx tsc --noEmit` y `npm run build` finalizaron correctamente; Lighthouse reportó 100/100 en accesibilidad para las cuatro rutas después de corregir contraste. Se midió el ancho y la navegación en iframes de 375, 768 y 1024 px. **No equivale a una revisión manual en teléfonos físicos ni garantiza accesibilidad completa.** Consulta [VIBE_CODING.md](VIBE_CODING.md) para los prompts, pruebas y errores reales.

**Capturas:** PENDIENTE. Se intentó tomar una captura en la Etapa 5, pero la herramienta indicó que la ventana del navegador no estaba visible; no se guardó ninguna captura en el repositorio.

## Estado de la entrega

| Elemento | Estado |
| --- | --- |
| Repositorio público de GitHub | [RobertoGomez1990/climasv](https://github.com/RobertoGomez1990/climasv) — `main` publicado; varios commits descriptivos. |
| URL pública de Vercel | **PENDIENTE**: no se ha desplegado ni probado una URL pública. |
| Autor | **PENDIENTE** de completar por el estudiante en `/acerca`. |
| Validación manual personal del estudiante | **PENDIENTE** de documentar por el estudiante. |

## Créditos

Datos meteorológicos y geocodificación: [Open-Meteo](https://open-meteo.com/), API pública utilizada sin clave para este proyecto académico. El contenido meteorológico pertenece al proveedor y puede cambiar o dejar de estar disponible. Consulta [AGENTS.md](AGENTS.md) para el alcance y criterios de la entrega.
