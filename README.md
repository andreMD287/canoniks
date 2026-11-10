# Expediente 01 — Prototipo React

Prototipo navegable del archivo del Museo de las Ausencias, convertido desde
el diseño de Figma. Publicado en
**https://andremd287.github.io/canoniks/**

## Flujo

```
carrusel (fachada + "aquí podrás")
   → menu · ARCHIVO   ⇄   menu · Sala 2
        │                      │
        │ Sala 1 · El cuerpo que no estaba en el modelo
        │   01 Misión → 02 Expedientes → 03 Evidencia A ⇄ 04 Evidencia B
        │   → 05 Comparar → 06-10 Pregunta (3 intentos)
        │         ├─ acierta (opción A) → 12 Respuesta correcta
        │         │     → 13 Encuentra la escultura → 13 Bodega (toca la foto)
        │         │     → 14 Reto completado → 15 Sala 1
        │         └─ 3 fallos → 11 Sin intentos → Salir al archivo
        │
        └ Sala 2 · El caso Perriand
            Misión → Documentos → Patente (zoom) → Identificar
            → Carta (zoom) → Contrastar → Restituir la firma
            → Patente restaurada → Ojo al dato → Sala 2 → Cierre
```

Reglas:

- **Carrusel de apertura:** las dos láminas son un solo carrusel: se pasa
  deslizando, tocando o con los puntos. "Explora el caso" aparece desenfocado
  y se vuelve nítido al pasar el cursor o al enfocarlo.
- **El menú es el home.** Una sala por pantalla; las alas verdes de los lados
  cambian de sala y el indicador de abajo entra al expediente.
- **El ojo de la barra superior vuelve al archivo** desde cualquier pantalla.

### Sala 1

- **Leer antes de comparar:** "Comparar las evidencias" sólo se activa cuando
  se abrieron los expedientes A y B. La carpeta entera es el botón.
- **3 intentos por pregunta:** cada fallo gasta un intento, muestra una pista
  y cuántos quedan. Sólo se avanza acertando (la opción A).
- **Salida bloqueada:** la "×" abre un diálogo que recuerda los intentos
  restantes; sólo se puede salir al agotarlos.
- **Bodega:** se desbloquea al acertar y se cierra tocando la foto.
- Reglas y respuesta correcta: `src/data/pregunta.js`.

### Sala 2

- **Visor de documentos** (`VisorDocumento`): la patente y la carta se amplían
  al 100, 150, 200 y 300 % y se desplazan dentro de la caja. A partir del
  200 % se leen los inventores de la patente.
- **Identificar:** se marcan los nombres que figuran en la patente de 1928; no
  hay respuesta correcta ni intentos, pero hay que marcar al menos uno. Lo
  marcado se recuerda y se muestra en la pantalla de contrastar.
- **Restituir:** el nombre de Charlotte Perriand se arrastra (o se toca) hasta
  el hueco de la patente. Hasta colocarlo no se puede continuar.
- Datos del reto: `src/data/reto2.js`.

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
                 TextoAjustado, VisorDocumento
  data/          pregunta.js (Sala 1), reto2.js (Sala 2)
  screens/       00 carrusel/intro/start/menu, 01-05, 06 pregunta, 11-15
    reto2/       01-11 del caso Perriand
  App.jsx        Flujo por estado (sin react-router)
```

## Diferencias con el Figma

- **El catálogo del Salon d’Automne no tiene pantalla** en el diseño, así que
  en el índice de documentos aparece como "Sin digitalizar", sin enlace.
- **Años corregidos en el índice:** el diseño etiqueta la patente como
  "01 / 1927" y la correspondencia como "02 / 1928"; el resto del expediente
  (y los propios documentos) dicen lo contrario, así que aquí la patente es de
  1928 y la carta de 1927.
- **Dos botones renombrados** para que coincidan con el recorrido: "Empezar
  por la carta" → "Empezar por la patente", y en la galería "Volver al
  archivo" → "Cerrar el expediente".
- **Los años 1927/1928/1929 de la pantalla de identificar** son un indicador,
  no un selector: el diseño sólo define la ficha de 1928.
- El indicador de inicio (la barrita blanca inferior) está quitado en toda la
  app; el Reto 2 lo mantiene en Figma, pero se dejó fuera por coherencia.

## Notas

- Usa Tailwind CSS v4 (vía `@tailwindcss/vite`).
- Tipografías: Sora (títulos), Alexandria (texto) y **Anton** en lugar de
  **Coolvetica** para los titulares del carrusel. Coolvetica no está en Google
  Fonts: la regla es `font-family: "Coolvetica", "Anton", sans-serif`, así que
  si Coolvetica está instalada en el equipo se usa esa. `TextoAjustado` escala
  los titulares en horizontal para que ocupen el ancho del diseño.
- La pantalla 06 agrupa los estados 06-10 del Figma (elegir, seleccionada,
  error con 2 intentos, error en el último intento y diálogo de salida).
