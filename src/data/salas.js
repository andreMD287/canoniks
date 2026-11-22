import fondoSala1 from "../assets/menu-fondo-sala1.png";
import fondoSala2 from "../assets/menu-fondo-sala2.png";
import fondoPaneles from "../assets/menu-fondo-paneles.png";
import fondoVitrinas from "../assets/menu-fondo-vitrinas.png";
import menuSala4 from "../assets/menu-sala4.jpg";
import menuSala5 from "../assets/menu-sala5.jpg";
import menuSala6 from "../assets/menu-sala6.jpg";
import menuSala7 from "../assets/menu-sala7.jpg";
import menuSala8 from "../assets/menu-sala8.jpg";
import menuSala9 from "../assets/menu-sala9.jpg";
import menuSala10 from "../assets/menu-sala10.jpg";
import menuDeliberacion from "../assets/menu-deliberacion.png";
import menuSala3 from "../assets/menu-sala3-completo.png";

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
    // la imagen del diseño ya trae los textos: se muestra completa
    imagenCompleta: menuSala3,
    fondo: null,
    descripcionAncho: 319,
    descripcionTop: 611,
    reto: "r3Examinar",
  },
  {
    sala: "Sala 4",
    titulo: "El lugar que no estaba destinado para ella",
    descripcion: DESCRIPCION_BARRERAS,
    imagenCompleta: menuSala4,
    fondo: { src: fondoPaneles, left: -52, ancho: 516 },
    descripcionAncho: 287,
    descripcionTop: 611,
    reto: "r4Intro",
  },
  {
    sala: "Sala 5",
    titulo: "Lo que llamaron manualidad",
    descripcion: DESCRIPCION_BARRERAS,
    imagenCompleta: menuSala5,
    fondo: { src: fondoVitrinas, left: -109, ancho: 656 },
    descripcionAncho: 287,
    descripcionTop: 611,
    reto: "r5Juego",
  },
  {
    sala: "Sala 6",
    titulo: "¿De quién es la idea?",
    descripcion: DESCRIPCION_BARRERAS,
    imagenCompleta: menuSala6,
    fondo: { src: fondoPaneles, left: -52, ancho: 516 },
    descripcionAncho: 287,
    descripcionTop: 611,
    reto: "r6Juego",
  },
  {
    sala: "Sala 7",
    titulo: "El mérito que cambió de nombre",
    descripcion: DESCRIPCION_BARRERAS,
    imagenCompleta: menuSala7,
    fondo: { src: fondoPaneles, left: -52, ancho: 516 },
    descripcionAncho: 287,
    descripcionTop: 611,
    reto: "r7Juego",
  },
  {
    sala: "Sala 8",
    titulo: "La puerta del reconocimiento",
    descripcion: DESCRIPCION_BARRERAS,
    imagenCompleta: menuSala8,
    fondo: { src: fondoPaneles, left: -52, ancho: 516 },
    descripcionAncho: 287,
    descripcionTop: 611,
    reto: "r8Juego",
  },
  {
    sala: "Sala 9",
    titulo: "La historia que fue seleccionada",
    descripcion: DESCRIPCION_BARRERAS,
    imagenCompleta: menuSala9,
    fondo: { src: fondoPaneles, left: -52, ancho: 516 },
    descripcionAncho: 287,
    descripcionTop: 611,
    reto: "r9Juego",
  },
  {
    sala: "Sala 10",
    titulo: "Las ausencias que se cruzan",
    descripcion: DESCRIPCION_BARRERAS,
    imagenCompleta: menuSala10,
    fondo: { src: fondoPaneles, left: -52, ancho: 516 },
    descripcionAncho: 287,
    descripcionTop: 611,
    reto: "r10Juego",
  },
  {
    // Última pantalla: lleva al debate en clase (se hace en persona con las
    // cartas). No tiene reto en la aplicación ni sala siguiente.
    sala: "Sala de deliberación",
    titulo: "Debate",
    descripcion:
      "Prepárate para debatir, ve a la sala de deliberación y toma un rol con las cartas dadas físicamente, y expresa tus pensamientos a través de estos.",
    imagenCompleta: menuDeliberacion,
    sinSiguiente: true,
    sinEntrada: true,
    reto: null,
  },
];
