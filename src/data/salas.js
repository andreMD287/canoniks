import fondoSala1 from "../assets/menu-fondo-sala1.png";
import fondoSala2 from "../assets/menu-fondo-sala2.png";
import fondoPaneles from "../assets/menu-fondo-paneles.png";
import fondoVitrinas from "../assets/menu-fondo-vitrinas.png";

const DESCRIPCION_SALA_1 =
  "Que una decisión de diseño aparentemente neutral puede reproducir una " +
  "perspectiva particular cuando se convierte en estándar para todas las personas.";

const DESCRIPCION_BARRERAS =
  "Las expectativas de género se traducen en barreras concretas de acceso a " +
  "áreas, oportunidades, cargos y espacios de decisión.";

/*
 * Las diez salas del archivo, en el orden del menú. `fondo` es la foto de la
 * pantalla (posición y ancho tal como los coloca el diseño). `reto` es la
 * pantalla donde empieza el reto de la sala; las salas sin reto todavía no
 * se pueden abrir.
 */
export const SALAS = [
  {
    sala: "Sala 1",
    titulo: "El conocimiento desde una sola mirada",
    descripcion: DESCRIPCION_SALA_1,
    fondo: { src: fondoSala1, left: -161, ancho: 734 },
    reto: "mision",
  },
  {
    sala: "Sala 2",
    titulo: "Cuando saber no significa, ser escuchada",
    descripcion: DESCRIPCION_SALA_1,
    fondo: { src: fondoSala2, left: -161, ancho: 734 },
    reto: "r2Mision",
  },
  {
    sala: "Sala 3",
    titulo: "El trabajo que tenía género",
    descripcion:
      "Las actividades y responsabilidades se distribuyeron según roles de " +
      "género, creando jerarquías entre el trabajo productivo, técnico y " +
      "público y el trabajo doméstico, textil y artesanal.",
    // pendiente: el fondo de esta sala no se pudo descargar del Figma
    fondo: null,
    descripcionAncho: 319,
    descripcionTop: 611,
    reto: "r3Examinar",
  },
  {
    sala: "Sala 4",
    titulo: "El lugar que no estaba destinado para ella",
    descripcion: DESCRIPCION_BARRERAS,
    fondo: { src: fondoPaneles, left: -52, ancho: 516 },
    descripcionAncho: 287,
    descripcionTop: 611,
    reto: "r4Intro",
  },
  {
    sala: "Sala 5",
    titulo: "Lo que llamaron manualidad",
    descripcion: DESCRIPCION_BARRERAS,
    fondo: { src: fondoVitrinas, left: -109, ancho: 656 },
    descripcionAncho: 287,
    descripcionTop: 611,
    reto: "r5Juego",
  },
  {
    sala: "Sala 6",
    titulo: "¿De quién es la idea?",
    descripcion: DESCRIPCION_BARRERAS,
    fondo: { src: fondoPaneles, left: -52, ancho: 516 },
    descripcionAncho: 287,
    descripcionTop: 611,
    reto: "r6Juego",
  },
  {
    sala: "Sala 7",
    titulo: "El mérito que cambió de nombre",
    descripcion: DESCRIPCION_BARRERAS,
    fondo: { src: fondoPaneles, left: -52, ancho: 516 },
    descripcionAncho: 287,
    descripcionTop: 611,
    reto: "r7Juego",
  },
  {
    sala: "Sala 8",
    titulo: "La puerta del reconocimiento",
    descripcion: DESCRIPCION_BARRERAS,
    fondo: { src: fondoPaneles, left: -52, ancho: 516 },
    descripcionAncho: 287,
    descripcionTop: 611,
    reto: "r8Juego",
  },
  {
    sala: "Sala 9",
    titulo: "La historia que fue seleccionada",
    descripcion: DESCRIPCION_BARRERAS,
    fondo: { src: fondoPaneles, left: -52, ancho: 516 },
    descripcionAncho: 287,
    descripcionTop: 611,
    reto: "r9Juego",
  },
  {
    sala: "Sala 10",
    titulo: "Las ausencias que se cruzan",
    descripcion: DESCRIPCION_BARRERAS,
    fondo: { src: fondoPaneles, left: -52, ancho: 516 },
    descripcionAncho: 287,
    descripcionTop: 611,
    reto: "r10Juego",
  },
];
