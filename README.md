# Expediente 01 — Prototipo React

Prototipo navegable del archivo del Museo de las Ausencias, convertido desde
el diseño de Figma. Publicado en
**https://andremd287.github.io/canoniks/**

## Flujo

```
carrusel (fachada + "aquí podrás")
   → menu · ARCHIVO   ⇄ menu · Sala 2 (portada lista, reto por implementar)
        → 01 Misión → 02 Expedientes → 03 Evidencia A ⇄ 04 Evidencia B
        → 05 Comparar → 06-10 Pregunta (3 intentos)
              ├─ acierta (opción A) → 12 Respuesta correcta
              │     → 13 Encuentra la escultura → 13 Bodega (se toca la foto)
              │     → 14 Reto completado → 15 Sala 1
              └─ 3 fallos → 11 Sin intentos → Salir al archivo (no se completa)
```

Reglas:

- **Carrusel de apertura:** las dos láminas (la fachada del museo y "aquí
  podrás") son un solo carrusel: se pasa deslizando, tocando o con los puntos.
  En el start, "Explora el caso" aparece desenfocado y se vuelve nítido al
  pasar el cursor o al enfocarlo.
- **El menú es el home.** Una sala por pantalla; las alas verdes de los lados
  cambian de sala y el indicador de abajo entra al expediente.
- **El ojo de la barra superior vuelve al archivo** desde cualquier pantalla.
- **Leer antes de comparar:** "Comparar las evidencias" (pantallas 02 y 04)
  sólo se activa cuando se abrieron los expedientes A y B. En la pantalla 02
  la carpeta entera es el botón que abre su evidencia.
- **3 intentos por pregunta:** cada fallo gasta un intento (círculos negros),
  muestra una pista y cuántos quedan. Sólo se avanza acertando.
- **Salida bloqueada:** la "×" de la pregunta abre un diálogo que recuerda los
  intentos restantes; sólo se puede salir al agotarlos (pantalla 11).
- **Bodega:** se desbloquea al acertar. "Confirmar hallazgo" entra a la bodega,
  que no tiene botón: se cierra el expediente tocando la foto.
- **"Salir al archivo" / "Volver al archivo"** dejan el reto como nuevo y
  vuelven al menú.
- Respuesta correcta y reglas: `src/data/pregunta.js`.

## Cómo correrlo

```bash
npm install
npm run dev
```

Abre la URL que imprime Vite (normalmente http://localhost:5173).

## Build de producción

```bash
npm run build
npm run preview
```

## Despliegue

Cada push a `main` lo publica en GitHub Pages con el flujo
`.github/workflows/deploy.yml`. La ruta base `/canoniks/` sólo se aplica al
compilar, así que en desarrollo el sitio se sirve desde la raíz.

## Estructura

```
src/
  assets/        SVGs/PNG exportados de Figma
  components/    TopBar, ScreenShell, FolderCard, ActionButton, DatoCard,
                 TextoAjustado
  data/          Reglas de la pregunta (intentos, opciones, respuesta correcta)
  screens/       00 carrusel/intro/start/menu, 01-05, 06 pregunta, 11-15
  App.jsx        Flujo por estado (sin react-router)
```

## Pendiente

El **Reto 2** (Sala 2) ya tiene su portada en el menú, pero sus pantallas
(`01 · Reto 2 · Misión` y siguientes en Figma) están sin implementar: al
intentar entrar se avisa de que todavía no está disponible.

## Notas

- Usa Tailwind CSS v4 (vía `@tailwindcss/vite`).
- Tipografías: Sora (títulos), Alexandria (texto) y **Anton** en lugar de
  **Coolvetica** para los titulares del carrusel. Coolvetica no está en Google
  Fonts: la regla es `font-family: "Coolvetica", "Anton", sans-serif`, así que
  si Coolvetica está instalada en el equipo se usa esa. `TextoAjustado` escala
  los titulares en horizontal para que ocupen el ancho del diseño con
  cualquiera de las dos.
- La pantalla 06 agrupa los estados 06-10 del Figma (elegir, seleccionada,
  error con 2 intentos, error en el último intento y diálogo de salida).
- El indicador de inicio (la barrita blanca inferior) se quitó, siguiendo la
  última versión del diseño.
