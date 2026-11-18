/**
 * Guarda las respuestas de los retos para el análisis del curso.
 *
 * Cada respuesta se anota siempre en el navegador (localStorage, por si falla
 * la red) y, si hay una dirección configurada, se envía a una hoja de Google
 * mediante un Apps Script (ver herramientas/respuestas-google-sheets.gs).
 *
 * No se recoge ningún dato personal: cada persona recibe un identificador
 * aleatorio de sesión que solo sirve para agrupar sus respuestas.
 */

// Pega aquí la URL de la aplicación web de Apps Script (termina en /exec).
// Mientras esté vacía, las respuestas solo se guardan en el navegador.
export const URL_HOJA = "";

const CLAVE_SESION = "canoniks_sesion";
const CLAVE_RESPUESTAS = "canoniks_respuestas";

function leer(clave) {
  try {
    return window.localStorage.getItem(clave);
  } catch {
    return null;
  }
}

function escribir(clave, valor) {
  try {
    window.localStorage.setItem(clave, valor);
  } catch {
    /* navegación privada o almacenamiento lleno: se sigue sin guardar local */
  }
}

/** Identificador anónimo de la sesión (se crea la primera vez). */
function idSesion() {
  let id = leer(CLAVE_SESION);
  if (!id) {
    id = crypto.randomUUID?.() ?? `s-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
    escribir(CLAVE_SESION, id);
  }
  return id;
}

/**
 * Registra la respuesta de una sala.
 * @param {string} sala     "Sala 05", "Sala 06"…
 * @param {string} reflexion texto escrito por la persona (puede ir vacío)
 * @param {object} datos    el resto de lo que respondió en el juego
 */
export function guardarRespuesta(sala, reflexion, datos = {}) {
  const registro = {
    fecha: new Date().toISOString(),
    sesion: idSesion(),
    sala,
    reflexion: reflexion.trim(),
    datos,
  };

  try {
    const previas = JSON.parse(leer(CLAVE_RESPUESTAS) || "[]");
    escribir(CLAVE_RESPUESTAS, JSON.stringify([...previas, registro]));
  } catch {
    /* si el almacenamiento local está dañado, se ignora */
  }

  if (!URL_HOJA) return;
  // text/plain evita la comprobación previa (CORS) que Apps Script no admite
  fetch(URL_HOJA, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(registro),
    keepalive: true,
  }).catch(() => {});
}
