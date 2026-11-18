// Datos del Reto 2 · El caso Perriand.

export const TITULO_EXPEDIENTE = "EXPEDIENTE 02";

/**
 * Pregunta de la patente de 1928 (respuesta única, 3 intentos como en el
 * Reto 1). La patente nombra a Charles-Édouard Jeanneret (Le Corbusier) y a
 * Pierre Jeanneret: como sólo una opción puede ser correcta, se pregunta por
 * el compañero de Pierre y no por "los inventores".
 */
export const PREGUNTA_PATENTE = "¿Quién figura como inventor junto a Pierre Jeanneret?";

export const OPCIONES = [
  { id: "A", texto: "Charlotte Perriand" },
  { id: "B", texto: "Le Corbusier" },
  { id: "C", texto: "Camilo Gutierrez" },
  { id: "D", texto: "Marianne Brandt" },
];

export const OPCION_CORRECTA = "B";

/** La firma que se restituye en la patente. */
export const NOMBRE_RESTITUIDO = "Charlotte Perriand";
