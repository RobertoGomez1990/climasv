# AGENTS.md — Reglas para OpenCode: ClimaSV

> Archivo de instrucciones del agente. OpenCode debe leerlo y respetarlo durante el desarrollo.
> Proyecto académico: **Implementación de Aplicación Next.js mediante Vibe Coding**.

## 1. Misión

Construir **ClimaSV**, una aplicación web funcional y profesional para consultar el clima actual y el pronóstico de cinco días de ciudades de El Salvador. El estudiante dirige el desarrollo mediante prompts y valida los resultados en cada fase. El objetivo es cumplir **todos** los criterios de la rúbrica sin agregar complejidad innecesaria.

**Idioma:** interfaz, errores, documentación, commits explicativos y respuestas de OpenCode en español. Código TypeScript con identificadores claros, preferentemente en inglés.

## 2. Stack obligatorio

- Next.js **16 o superior**, **App Router** (`src/app`). No utilizar Pages Router.
- React + **TypeScript estricto**; evitar `any` y código duplicado.
- Tailwind CSS para estilos, diseño responsive.
- Node.js compatible con la versión instalada de Next.js; gestor **npm**.
- API pública **Open-Meteo** (uso no comercial sin clave API) consumida desde **un Route Handler interno**.
- Server Components para rutas y contenido estático. Client Components únicamente para interactividad con `"use client"`.
- Hooks `useState` y `useEffect` usados realmente (no de adorno).
- `loading.tsx`, `error.tsx` y estados de carga/error dentro de componentes que hacen fetch en cliente.
- Control de versiones Git + GitHub y despliegue público en Vercel.

## 3. Alcance y páginas (4 rutas reales)

1. `/` — **Inicio**: presentación, beneficios, navegación y acceso a ciudades destacadas. Preferir Server Component.
2. `/clima` — **Clima**: selector de ciudad, temperatura, sensación térmica, humedad, viento y pronóstico de 5 días. Componente cliente que consulta `/api/weather?city=<slug>`. Debe ofrecer botón "Reintentar" y estados de carga, error y ausencia de datos.
3. `/ciudades` — **Ciudades**: catálogo de al menos 5 ciudades salvadoreñas, buscador/filtro en cliente, favoritos persistidos en `localStorage` y botón "Ver clima" para cada ciudad. Los favoritos son una funcionalidad del navegador, no requieren base de datos.
4. `/acerca` — **Acerca de**: propósito, tecnologías, autor editable y créditos visibles a Open-Meteo.

No crear rutas ficticias que conduzcan a 404. La navegación principal debe funcionar tanto en móvil como en escritorio.

## 4. Datos y API

Crear en `src/lib/cities.ts` un catálogo tipado de ciudades con `slug`, `name`, `department`, `latitude`, `longitude`. Sugeridas: San Salvador, Santa Ana, San Miguel, La Libertad y Suchitoto. Verificar coordenadas antes de fijarlas; documentar que son puntos de referencia aproximados, no direcciones exactas.

Crear el endpoint `GET /api/weather?city=<slug>` en `src/app/api/weather/route.ts`:

- Validar el `slug` contra la lista permitida. Responder **400** con JSON claro cuando la ciudad sea inválida; no permitir URL arbitraria.
- Consultar Open-Meteo desde el servidor: `https://api.open-meteo.com/v1/forecast`.
- Pedir `current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m` y `daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max,weather_code`, con `timezone=auto&forecast_days=5`.
- Manejar HTTP no exitoso, tiempo de espera razonable y datos incompletos. Responder **502/503** con mensaje legible cuando falle el servicio externo.
- Normalizar el JSON a un tipo de dominio en `src/types/weather.ts`. No filtrar al navegador respuestas crudas innecesariamente grandes.
- Usar una variable de configuración opcional `OPEN_METEO_BASE_URL` con valor por defecto seguro. No exigir credenciales ni inventar una API key.
- Incluir un enlace visible a `https://open-meteo.com/` y atribución a la fuente de datos.

Ejemplo de salida interna esperada (ajustar los campos a los tipos reales):

```json
{
  "city": "San Salvador",
  "current": { "temperature": 27, "feelsLike": 29, "humidity": 60, "windSpeed": 9, "weatherCode": 2, "time": "..." },
  "forecast": [
    { "date": "2026-11-15", "min": 22, "max": 30, "rainProbability": 25, "weatherCode": 2 }
  ]
}
```

**Importante:** este ejemplo es solo de esquema. Nunca presentar sus números como datos meteorológicos reales.

## 5. Arquitectura esperada

```text
climasv/
├── AGENTS.md
├── README.md
├── VIBE_CODING.md
├── .env.example
├── .gitignore
├── package.json
├── public/
└── src/
    ├── app/
    │   ├── layout.tsx
    │   ├── page.tsx
    │   ├── clima/page.tsx
    │   ├── clima/loading.tsx
    │   ├── clima/error.tsx
    │   ├── ciudades/page.tsx
    │   ├── acerca/page.tsx
    │   ├── api/weather/route.ts
    │   ├── globals.css
    │   ├── loading.tsx
    │   └── error.tsx
    ├── components/
    │   ├── Header.tsx
    │   ├── Footer.tsx
    │   ├── WeatherDashboard.tsx
    │   ├── WeatherCard.tsx
    │   ├── ForecastList.tsx
    │   └── CityExplorer.tsx
    ├── lib/
    │   ├── cities.ts
    │   └── weather.ts
    └── types/weather.ts
```

Esta estructura es guía, no justificación para crear archivos vacíos. Organizar CSS y componentes de forma consistente y reutilizable.

## 6. Estética y experiencia de usuario

- Identidad visual coherente: estilo moderno de tablero meteorológico, colores sobrios con acentos azul/cian y buena legibilidad.
- Diseño mobile-first; revisar 375 px, tablet y escritorio.
- Header, navegación clara, tarjetas, contraste adecuado, etiquetas, estados `hover`/`focus` y `aria-label` en controles importantes.
- Evitar dependencias pesadas y librerías de UI innecesarias.
- Siempre mostrar unidades correctas (°C, %, km/h), fecha interpretable y mensaje cuando la API esté indisponible.
- No usar datos simulados como si fueran clima actual. Si hay error, mostrar un estado de error auténtico.

## 7. Reglas de trabajo Vibe Coding

1. **Trabaja por fases**, no implementes toda la aplicación en una respuesta si el estudiante está usando prompts secuenciales.
2. Antes de cada fase, explicar qué se realizará, archivos que se crearán/modificarán y un criterio concreto de finalización.
3. Después de cada fase, resumir cambios, informar archivos alterados, comandos ejecutados y errores pendientes.
4. Si algo falla, identificar causa raíz y reparar; **nunca ocultar** errores de TypeScript, ESLint o build.
5. Ejecutar verificaciones cuando corresponda: `npm run lint`, `npx tsc --noEmit` y `npm run build`; resolver fallos antes de considerar terminada la fase final.
6. No borrar código del estudiante ni sobrescribir trabajo manual sin justificarlo.
7. Si un comando requiere credenciales o permiso externo (GitHub/Vercel), preparar instrucciones pero **no inventar cuentas, URLs, resultados ni despliegues exitosos**.
8. Proponer commits cortos y descriptivos por iteración, pero el estudiante decide cuándo confirmarlos.
9. No almacenar tokens ni secretos en archivos versionados. `.env.local` debe estar ignorado; `.env.example` sí debe versionarse.
10. No afirmar que un control funciona sin validarlo. Documentar qué pruebas fueron manuales y cuáles automáticas.

## 8. Etapas de implementación que debes seguir cuando el estudiante lo solicite

### Etapa 1. Inicialización

- Verificar `node --version` y `npm --version`.
- Crear el proyecto Next.js 16+ con TypeScript, App Router, Tailwind y ESLint. Si ya existe, no reinicializar ni destruir carpetas.
- Inspeccionar `package.json` para confirmar que `next` cumple la versión.
- Conservar este `AGENTS.md` en la raíz. Preparar `git init` si es necesario.
- Verificar `npm run dev` y la página inicial.
- Commit sugerido: `chore: inicializar Next.js con TypeScript y Tailwind`.

### Etapa 2. Diseño y cuatro rutas

- Implementar diseño global con Header/Footer y rutas `/`, `/clima`, `/ciudades`, `/acerca`.
- Mantener las páginas predominantemente como Server Components.
- Mostrar datos de ejemplo solo como estructura visual y etiquetarlos inequívocamente como ejemplo; preferir estados vacíos en la ruta de clima hasta que la API esté lista.
- Verificar navegación responsive y que las rutas respondan.
- Commit sugerido: `feat: crear cuatro rutas y diseño responsive`.

### Etapa 3. API y modelos

- Agregar catálogo de ciudades, tipos, cliente servidor para Open-Meteo y `/api/weather`.
- Validar los casos: ciudad existente (200), slug no válido (400), fallo de Open-Meteo (502/503).
- No exponer ni requerir claves para Open-Meteo.
- Commit sugerido: `feat: integrar API interna con Open-Meteo`.

### Etapa 4. Interacción y estados

- Crear `WeatherDashboard` con `useState` y `useEffect`, `AbortController`, selección de ciudad, loading, error, Reintentar y pronóstico.
- Crear `CityExplorer` con filtro y favoritos en `localStorage`; evitar problemas de hidratación. Proteger acceso a `window`/`localStorage` fuera del ciclo cliente.
- Añadir `loading.tsx` y `error.tsx` en los segmentos correspondientes.
- Commit sugerido: `feat: añadir búsqueda, favoritos y estados de carga`.

### Etapa 5. Calidad

- Verificar visualmente las 4 rutas, endpoint y UX responsive; revisar accesibilidad básica.
- Ejecutar `npm run lint`, `npx tsc --noEmit` y `npm run build`.
- Corregir errores reales y repetir pruebas. No modificar las versiones arbitrariamente.
- Commit sugerido: `fix: corregir validaciones y mejorar experiencia móvil`.

### Etapa 6. Evidencia y documentación

- Crear `README.md` con descripción, stack, rutas, API, requisitos, instalación, variables, uso, comandos, capturas si existen, GitHub y URL de Vercel (solo reales; usar `PENDIENTE` mientras no existan).
- Crear `.env.example`:

```dotenv
# Opcional. La aplicación utiliza este proveedor por defecto si la variable no existe.
OPEN_METEO_BASE_URL=https://api.open-meteo.com
```

- Crear `VIBE_CODING.md` con los prompts **realmente utilizados**, iteraciones, decisiones, errores reales y soluciones verificadas. No inventar pruebas, capturas, links ni cambios.
- Usar una tabla de seguimiento: fecha/hora, fase, prompt, resultado observado, corrección, commit.
- Agregar apartado «Participación del estudiante»: qué decisiones y validaciones realizó personalmente.
- Commit sugerido: `docs: documentar instalación y proceso de Vibe Coding`.

### Etapa 7. Entrega

- Preparar repositorio público GitHub, comprobar varias confirmaciones (`git log --oneline`) y que `.env.local` no esté rastreado.
- Desplegar con Vercel importando el repositorio, revisando la configuración de build y variables si corresponden.
- Abrir las 4 rutas en la URL pública y probar la API; revisar logs si alguna ruta falla.
- Actualizar README/VIBE_CODING con **URLs reales** y evidencia final. No dar el despliegue por realizado sin comprobarlo.
- Commit sugerido: `docs: agregar enlaces de GitHub y despliegue verificado`.

## 9. Lista de aceptación (verificar explícitamente)

- [ ] Next.js >= 16 + App Router + TypeScript.
- [ ] Cuatro rutas operativas: `/`, `/clima`, `/ciudades`, `/acerca`.
- [ ] API interna `/api/weather` que obtiene información real de Open-Meteo.
- [ ] Uso correcto de Server Components y Client Components.
- [ ] `useState` y `useEffect` implementados.
- [ ] Carga, error, datos vacíos y reintento funcionando.
- [ ] Diseño responsive comprobado en móvil y escritorio.
- [ ] `npm run lint`, `npx tsc --noEmit`, `npm run build` exitosos.
- [ ] `README.md`, `VIBE_CODING.md`, `.env.example` completos.
- [ ] `.env.local` ignorado en Git y sin secretos expuestos.
- [ ] Varios commits descriptivos en un repositorio público de GitHub.
- [ ] Aplicación accesible por URL pública de Vercel y recorrida manualmente.

## 10. Indicaciones para el agente al empezar

Cuando el estudiante envíe un prompt, **lee este archivo y trabaja únicamente en la fase solicitada**. Si el estudiante pide iniciar por la Etapa 1, verifica el estado del directorio y crea el esqueleto. No avances a producción antes de pasar por pruebas y documentación. Al terminar cada fase, responde en español con: cambios realizados, validación, errores pendientes y próximo prompt recomendado.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
