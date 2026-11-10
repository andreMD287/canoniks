// Reglas de la pregunta del Expediente 01 (pantallas 06 a 12).

export const MAX_INTENTOS = 3;

export const OPCION_CORRECTA = "A";

export const OPCIONES = [
  { id: "A", texto: "Hombre y mujer" },
  { id: "B", texto: "Hombre" },
  { id: "C", texto: "Hombre luchador" },
  { id: "D", texto: "Gato" },
];

// "1 intento" / "2 intentos"
export const textoIntentos = (n) => `${n} ${n === 1 ? "intento" : "intentos"}`;
