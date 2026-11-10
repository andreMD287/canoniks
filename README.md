# Expediente 01 — Prototipo React

Prototipo navegable del flujo completo "Expediente 01" (las 17 pantallas del
diseño de Figma), con la lógica de intentos de la pregunta.

## Flujo

```
intro → start → 01 Misión → 02 Expedientes → 03 Evidencia A ⇄ 04 Evidencia B
      → 05 Comparar → 06-10 Pregunta (3 intentos)
            ├─ acierta (opción A) → 12 Respuesta correcta
            │     → 13 Encuentra la escultura → 13 Bodega (se toca la foto)
            │     → 14 Reto completado → 15 Sala 1
            └─ 3 fallos → 11 Sin intentos → Salir al archivo (no se completa)
```

Reglas:

- **Intro y start:** la portada del museo avanza tocando cualquier parte. En el
  start, "Explora el caso" aparece desenfocado y se vuelve nítido al pasar el
  cursor o al enfocarlo; en pantalla táctil el primer toque lo enfoca y el
  segundo entra al expediente.
- **Leer antes de comparar:** "Comparar las evidencias" (pantallas 02 y 04) solo
  se activa cuando se abrieron los expedientes A y B.
- **3 intentos por pregunta:** cada fallo gasta un intento (círculos negros),
  muestra una pista y cuántos quedan. Solo se avanza acertando.
- **Salida bloqueada:** la "×" de la pregunta abre un diálogo que recuerda los
  intentos restantes; solo se puede salir al agotarlos (pantalla 11).
- **Bodega:** se desbloquea al acertar. "Confirmar hallazgo" entra a la bodega,
  que no tiene botón: se cierra el expediente tocando la foto (la imagen se
  acerca al pasar el cursor y da un destello al tocarla).
- **"Salir al archivo" / "Volver al archivo"** reinician el recorrido en la intro.
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

## Estructura

```
src/
  assets/        SVGs/PNG exportados de Figma
  components/    TopBar, ScreenShell, FolderCard, ActionButton, DatoCard,
                 TextoAjustado
  data/          Reglas de la pregunta (intentos, opciones, respuesta correcta)
  screens/       Las pantallas (00 intro/start, 01-05, 06 pregunta, 11-15)
  App.jsx        Flujo por estado (sin react-router)
```

## Notas

- Usa Tailwind CSS v4 (vía `@tailwindcss/vite`).
- Tipografías: Sora (títulos), Alexandria (texto) y **Anton** en lugar de
  **Coolvetica** para los titulares de la intro y el start. Coolvetica no está
  en Google Fonts: la regla es
  `font-family: "Coolvetica", "Anton", sans-serif`, así que si Coolvetica está
  instalada en el equipo se usa esa. `TextoAjustado` escala los titulares en
  horizontal para que ocupen el ancho del diseño con cualquiera de las dos.
- La pantalla 06 agrupa los estados 06-10 del Figma (elegir, seleccionada,
  error con 2 intentos, error en el último intento y diálogo de salida).
- El indicador de inicio (la barrita blanca inferior) se quitó, siguiendo la
  última versión del diseño.
