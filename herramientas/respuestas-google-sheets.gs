/**
 * Recibe las respuestas de CANONIKAS y las anota en la hoja de cálculo.
 *
 * Cómo usarlo (una sola vez):
 *  1. Crea una hoja de Google y ábrela: Extensiones → Apps Script.
 *  2. Borra lo que haya y pega este archivo. Guarda.
 *  3. Implementar → Nueva implementación → tipo "Aplicación web".
 *       Ejecutar como: yo
 *       Quién tiene acceso: cualquier persona
 *  4. Autoriza los permisos y copia la URL que termina en /exec.
 *  5. Pégala en src/data/respuestas.js (constante URL_HOJA) y sube el cambio.
 *
 * Si cambias este script después, hay que crear una nueva versión en
 * Implementar → Administrar implementaciones.
 */

const NOMBRE_HOJA = "Respuestas";
const COLUMNAS = ["Fecha", "Sesión", "Sala", "Reflexión", "Datos del juego (JSON)"];

function doPost(e) {
  try {
    const r = JSON.parse(e.postData.contents);
    const libro = SpreadsheetApp.getActiveSpreadsheet();
    let hoja = libro.getSheetByName(NOMBRE_HOJA);
    if (!hoja) {
      hoja = libro.insertSheet(NOMBRE_HOJA);
      hoja.appendRow(COLUMNAS);
      hoja.setFrozenRows(1);
    }
    hoja.appendRow([
      r.fecha || new Date().toISOString(),
      r.sesion || "",
      r.sala || "",
      r.reflexion || "",
      JSON.stringify(r.datos || {}),
    ]);
    return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(
      ContentService.MimeType.JSON,
    );
  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ ok: false, error: String(err) }),
    ).setMimeType(ContentService.MimeType.JSON);
  }
}
