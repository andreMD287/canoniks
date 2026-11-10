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
        │ Sala 2 · El caso Perriand
        │   Misión → Documentos → Patente (zoom) → Identificar
        │   → Carta (zoom) → Contrastar → Restituir la firma
        │   → Patente restaurada → Ojo al dato → Sala 2 → Cierre
        │
        │ Sala 3 · El trabajo que tenía género (CANONIKAS)
        │   Examinar → Clasificar → Contrastar → Contextualizar
        │   → Reparto de talleres → Sala 3
        │
        └ Sala 4 · El lugar que no estaba destinado para ella
            Introducción → Juego (corredor) → Victoria o Derrota
```

Las cuatro salas del menú están en círculo: las flechas de los lados van de la
Sala 1 a la 2, de la 2 a la 3, de la 3 a la 4 y de la 4 a la 1.

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

### Sala 3

- **Examinar:** la miniatura que se toca se ve en grande.
- **Clasificar:** la pregunta ("¿cuál fue creada por un hombre?") es una
  trampa: las cuatro piezas son de mujeres, y la pantalla siguiente lo revela.
  Cualquier elección vale; sólo hay que elegir una.
- **El reparto de talleres** es la actividad central. Cada taller sólo admite
  un género, como hacía Gropius:
  - **Tejido y cerámica** sólo admite mujeres.
  - **Metal y madera** sólo admite hombres.

  Si se intenta llevar a un hombre a tejido y cerámica —o a una mujer a metal
  y madera— la ficha **se devuelve**: se sacude, se pinta de morado y aparece
  el motivo. La regla se descubre chocando con ella, y el único reparto
  posible acaba siendo el segregado.

  Se puede arrastrar la ficha o tocarla y después tocar el taller; tocar una
  ficha ya repartida la devuelve a la lista. El botón de salida no se activa
  hasta repartir las ocho.
- Nombres, géneros y regla: `src/data/reto3.js`.

### Sala 4 · el juego

Un corredor: Marianne Brandt corre sola hacia el taller de metal y el jugador
sólo salta o se agacha.

- **Motor:** `src/juego/corredor.js`, sobre un `<canvas>` de 412 × 492 con su
  propio bucle de `requestAnimationFrame`. No sabe nada de React: la pantalla
  le pasa los sprites cargados y recibe el marcador y el final por callback.
- **Controles:** los dos botones de la pantalla (mantener pulsado ESQUIVAR
  para seguir agachada) y, en escritorio, Espacio o ↑ para saltar y ↓ para
  agacharse.
- **Las seis barreras** son las de Brandt. Las verdes se saltan (el telar, la
  puerta del taller, el muro de escepticismo, las cerámicas en el piso) y las
  moradas se esquivan agachándose (el círculo de chispas, el bloqueo de los
  compañeros). Al chocar, la pantalla de derrota dice qué barrera la detuvo y
  qué costaba esa exclusión en su carrera.
- **Duración:** el recorrido son 9 000 px, unos 25 segundos de juego limpio.
  Se pierde al primer choque, así que un recorrido más largo lo hacía casi
  imposible de terminar.
- Barreras, consecuencias y meta: `src/data/reto4.js`.
- En desarrollo el motor se expone como `window.__corredor` (con
  `leerEstado()`) para poder probarlo; en producción no se expone.

#### Los sprites

Salen de los GIF y las hojas originales, normalizados con
`herramientas/hacer_sprites.py` (necesita Pillow y los archivos de origen):
todas las animaciones acaban en celdas de
133 × 240 con los pies en el borde inferior, así que el juego sólo cambia de
hoja. `n4-correr` (8 fotogramas) sale del GIF de correr; `n4-saltar` (8) y
`n4-agachar` (2) salen de la hoja del salto, a la que hubo que quitarle el
fondo negro. La hoja del gateo no se usó: sus figuras se solapan y no se
podían separar en fotogramas limpios.

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
  data/          pregunta.js, reto2.js, reto3.js, reto4.js (una por sala)
  juego/         corredor.js (el motor del juego de la Sala 4)
  screens/       00 carrusel/intro/start/menu, 01-05, 06 pregunta, 11-15
    reto2/       01-11 del caso Perriand
    reto3/       01-06 de CANONIKAS
    reto4/       01-04 del corredor de Brandt
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
  app; los Retos 2 y 3 lo mantienen en Figma, pero se dejó fuera por
  coherencia.
- **Botón del reparto renombrado:** en Figma dice "Ver la sala 1", que es un
  resto del Reto 1; aquí dice "Ver la sala 3", que es a donde lleva.
- **El catálogo de las piezas del Reto 3** no define qué pasa al confirmar una
  elección equivocada: como todas son de mujeres, cualquier elección lleva a
  la revelación.
- **El Reto 4 dejaba el área de juego como espacio reservado** ("ÁREA DE JUEGO ·
  Personaje · obstáculos · escenario"), así que el juego, las barreras y el
  escenario están dibujados sobre canvas en la paleta del proyecto.
- **Un segundo control:** el diseño muestra sólo el botón SALTAR, pero el
  componente admite etiqueta y la introducción dice "salta o esquiva", así que
  hay dos botones, SALTAR y ESQUIVAR.

## Notas

- Usa Tailwind CSS v4 (vía `@tailwindcss/vite`).
- Tipografías: Sora (títulos), Alexandria (texto) y **Anton** en lugar de
  **Coolvetica** para los titulares del carrusel. Coolvetica no está en Google
  Fonts: la regla es `font-family: "Coolvetica", "Anton", sans-serif`, así que
  si Coolvetica está instalada en el equipo se usa esa. `TextoAjustado` escala
  los titulares en horizontal para que ocupen el ancho del diseño.
- La pantalla 06 agrupa los estados 06-10 del Figma (elegir, seleccionada,
  error con 2 intentos, error en el último intento y diálogo de salida).
