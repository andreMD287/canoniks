import TopBar from "./TopBar";
import ScreenShell from "./ScreenShell";
import ActionButton from "./ActionButton";

/**
 * Piezas comunes de los retos de las Salas 05 a 10: una pantalla con el
 * encabezado de siempre (etapa en verde, título, contenido y botón de avance)
 * y unos pocos bloques reutilizables.
 */

/** Pantalla estándar: barra superior, etapa, título, contenido y botón. */
export function Pantalla({
  reto,
  etapa,
  titulo,
  onHome,
  onBack,
  boton,
  onBoton,
  botonDeshabilitado = false,
  nota,
  overlay,
  children,
}) {
  const pie = boton ? (
    <>
      <ActionButton compact disabled={botonDeshabilitado} onClick={onBoton}>
        {boton}&nbsp; →
      </ActionButton>
      {nota && (
        <p className="absolute inset-x-0 top-full mt-2 text-center text-[11px] leading-[1.4] text-[var(--blanco-principal)]">
          {nota}
        </p>
      )}
    </>
  ) : undefined;

  return (
    <ScreenShell footer={pie} overlay={overlay}>
      <TopBar title={`RETO ${reto} · CANONIKAS`} onHome={onHome} onBack={onBack} />
      <div className="flex flex-col gap-[14px] px-6 pt-[22px]">
        {etapa && (
          <p className="text-[11px] font-semibold leading-[1.4] text-[var(--verde-principal)]">
            {etapa}
          </p>
        )}
        {titulo && (
          <h1 className="font-display text-[26px] font-extrabold leading-[1.12] text-[var(--verde-principal)]">
            {titulo}
          </h1>
        )}
        {children}
      </div>
    </ScreenShell>
  );
}

/** Texto de cuerpo. */
export const Texto = ({ children, className = "" }) => (
  <p className={`text-[14px] leading-[1.4] text-[var(--blanco-principal)] ${className}`}>
    {children}
  </p>
);

/** Recuadro negro con la pregunta o la frase que se quiere destacar. */
export const Destacado = ({ etiqueta, children }) => (
  <div className="rounded-[15px] bg-[var(--negro-principal)] px-[16px] py-[14px] text-[13px] leading-[1.4]">
    {etiqueta && (
      <p className="mb-[6px] text-[12px] font-semibold text-[var(--verde-principal)]">
        {etiqueta}
      </p>
    )}
    <div className="text-[var(--blanco-principal)]">{children}</div>
  </div>
);

/**
 * Marcador de imagen documental. No se inventan imágenes de piezas ni de
 * personas reales: cada marcador dice qué falta y dónde buscarlo.
 */
export const Imagen = ({ rotulo, fuente, alto = 150, className = "" }) => (
  <div
    role="img"
    aria-label={`Imagen pendiente: ${rotulo}`}
    style={{ height: alto }}
    className={`flex w-full flex-col items-center justify-center gap-[4px] rounded-[12px] border border-dashed border-[var(--blanco-principal)]/50 bg-[var(--blanco-principal)]/5 px-[12px] text-center ${className}`}
  >
    <span className="text-[10px] font-semibold leading-[1.3] text-[var(--verde-principal)]">
      IMAGEN PENDIENTE
    </span>
    <span className="text-[11px] leading-[1.3] text-[var(--blanco-principal)]">{rotulo}</span>
    {fuente && (
      <span className="text-[9px] leading-[1.3] text-[var(--blanco-principal)]/60">
        Fuente sugerida: {fuente}
      </span>
    )}
  </div>
);

/** Tarjeta seleccionable: blanca, verde al activarla, morada si se marca como no válida. */
export function Tarjeta({ activa, tono, onClick, deshabilitada, className = "", children, ...resto }) {
  const color =
    tono === "mal"
      ? "bg-[var(--morado-principal)] text-[var(--blanco-principal)]"
      : activa
        ? "bg-[var(--verde-principal)] text-[var(--negro-principal)]"
        : "bg-[var(--blanco-principal)] text-[var(--negro-principal)]";
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={deshabilitada}
      aria-pressed={!!activa}
      className={`rounded-[13px] px-[14px] py-[12px] text-left transition-colors duration-200 ${color} ${className}`}
      {...resto}
    >
      {children}
    </button>
  );
}

/** Campo de texto para la reflexión final. */
export function Campo({ valor, onCambio, placeholder = "Escribe tu reflexión…" }) {
  return (
    <div>
      <textarea
        value={valor}
        onChange={(e) => onCambio(e.target.value)}
        rows={4}
        maxLength={400}
        placeholder={placeholder}
        className="w-full resize-none rounded-[13px] border-2 border-solid border-[var(--verde-principal)] bg-[var(--blanco-principal)] px-[14px] py-[12px] text-[14px] leading-[1.4] text-[var(--negro-principal)] outline-none placeholder:text-[var(--negro-principal)]/50"
      />
      <p className="mt-[4px] flex justify-between gap-[8px] text-[10px] text-[var(--blanco-principal)]/60">
        <span>Tu respuesta se guarda de forma anónima para el análisis del curso.</span>
        <span className="shrink-0">{valor.length}/400</span>
      </p>
    </div>
  );
}

/** Indicador "X / N" con barra. */
export const Progreso = ({ valor, total, etiqueta }) => (
  <div>
    <div className="flex justify-between text-[11px] font-semibold text-[var(--blanco-principal)]">
      <span>{etiqueta}</span>
      <span className="text-[var(--verde-principal)]">
        {valor}/{total}
      </span>
    </div>
    <div className="mt-[6px] h-[4px] w-full rounded-[2px] bg-[var(--blanco-principal)]/20">
      <div
        className="h-full rounded-[2px] bg-[var(--verde-principal)] transition-[width] duration-300"
        style={{ width: `${(valor / total) * 100}%` }}
      />
    </div>
  </div>
);

/** Ventana superpuesta con botón para volver. */
export function Ventana({ onCerrar, cerrar = "Volver", children }) {
  return (
    <div role="dialog" aria-modal="true" className="absolute inset-0 z-20 overflow-y-auto">
      <div className="absolute inset-0 bg-[var(--negro-principal)]/85" />
      <div className="relative mx-6 mt-[90px] flex flex-col gap-[12px] rounded-[16px] bg-[var(--azul-oscuro)] p-[18px]">
        {children}
        <ActionButton compact variant="primario" onClick={onCerrar}>
          {cerrar}
        </ActionButton>
      </div>
    </div>
  );
}
