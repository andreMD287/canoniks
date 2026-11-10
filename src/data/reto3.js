// Datos del Reto 3 · CANONIKAS — El trabajo que tenía género.
import textilA from "../assets/r3-textil-a.png";
import textilB from "../assets/r3-textil-b.png";
import textilC from "../assets/r3-textil-c.png";
import textilD from "../assets/r3-textil-d.png";
import guntaStolzl from "../assets/r3-gunta-stolzl.png";
import anniAlbers from "../assets/r3-anni-albers.png";
import ottiBerger from "../assets/r3-otti-berger.png";

export const TITULO_EXPEDIENTE = "RETO 03 · CANONIKAS";

export const PIEZAS = [
  { id: "A", imagen: textilA, alt: "Pieza textil A de la colección Bauhaus." },
  { id: "B", imagen: textilB, alt: "Pieza textil B de la colección Bauhaus." },
  { id: "C", imagen: textilC, alt: "Pieza textil C de la colección Bauhaus." },
  { id: "D", imagen: textilD, alt: "Pieza textil D de la colección Bauhaus." },
];

export const AUTORAS = [
  { nombre: "Gunta Stölzl", perfil: "Diseñadora textil · Bauhaus", foto: guntaStolzl },
  { nombre: "Anni Albers", perfil: "Diseñadora textil · Bauhaus", foto: anniAlbers },
  { nombre: "Otti Berger", perfil: "Diseñadora textil · Bauhaus", foto: ottiBerger },
];

/**
 * Los dos talleres del reparto. `admite` es la regla de Gropius: cada taller
 * sólo aceptaba a un género, y es justo lo que la actividad deja ver.
 */
export const TALLERES = [
  {
    id: "tejido",
    titulo: ["Tejido y", "cerámica"],
    jerarquia: "MENOR JERARQUÍA",
    admite: "mujer",
    rechazo: "Gropius no admitía hombres en el taller de tejido y cerámica.",
  },
  {
    id: "metal",
    titulo: ["Metal y", "madera"],
    jerarquia: "MAYOR JERARQUÍA",
    admite: "hombre",
    rechazo: "Gropius no admitía mujeres en el taller de metal y madera.",
  },
];

export const PERSONAS = [
  { nombre: "Sofía Cárdenas", genero: "mujer" },
  { nombre: "Samuel Quintero", genero: "hombre" },
  { nombre: "Paula Balderrama", genero: "mujer" },
  { nombre: "Sara Benavides", genero: "mujer" },
  { nombre: "Santiago Puertas", genero: "hombre" },
  { nombre: "Cristian Bolívar", genero: "hombre" },
  { nombre: "Leonardo Clavijo", genero: "hombre" },
  { nombre: "Nicole Rodríguez", genero: "mujer" },
];

export const taller = (id) => TALLERES.find((t) => t.id === id);
export const persona = (nombre) => PERSONAS.find((p) => p.nombre === nombre);

/** ¿Deja Gropius entrar a esta persona en este taller? */
export const admite = (idTaller, nombre) =>
  taller(idTaller).admite === persona(nombre).genero;
