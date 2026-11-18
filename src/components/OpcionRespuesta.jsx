const ESTILO_OPCION = {
  normal: "bg-[var(--blanco-principal)] text-[var(--negro-principal)]",
  seleccionada: "bg-[var(--verde-principal)] text-[var(--negro-principal)]",
  correcta: "bg-[var(--verde-principal)] text-[var(--negro-principal)]",
  incorrecta: "bg-[var(--morado-principal)] text-[var(--blanco-principal)]",
};

const MARCA = { seleccionada: "●", correcta: "✓", incorrecta: "×" };

/**
 * Opción de una pregunta de respuesta única (A, B, C, D). `estado` es
 * "normal", "seleccionada", "correcta" o "incorrecta".
 */
export default function OpcionRespuesta({
  id,
  texto,
  estado,
  deshabilitada,
  onClick,
  multilinea = false,
}) {
  if (multilinea) {
    // texto largo: la fila crece en vez de usar posiciones fijas
    return (
      <button
        type="button"
        role="radio"
        aria-checked={estado !== "normal"}
        disabled={deshabilitada}
        onClick={onClick}
        className={`flex min-h-[60px] w-full items-center gap-[14px] rounded-[13px] px-[16px] py-[10px] text-left ${ESTILO_OPCION[estado]}`}
      >
        <span className="font-display text-[18px] font-extrabold leading-[1.12]">{id}</span>
        <span className="flex-1 text-[14px] font-semibold leading-[1.35]">{texto}</span>
        {MARCA[estado] && (
          <span aria-hidden="true" className="text-[20px] font-semibold leading-none">
            {MARCA[estado]}
          </span>
        )}
      </button>
    );
  }
  return (
    <button
      type="button"
      role="radio"
      aria-checked={estado !== "normal"}
      disabled={deshabilitada}
      onClick={onClick}
      className={`relative h-[60px] w-full rounded-[13px] text-left ${ESTILO_OPCION[estado]}`}
    >
      <span className="font-display absolute left-[16px] top-[16px] text-[18px] font-extrabold leading-[1.12]">
        {id}
      </span>
      <span className="absolute left-[60px] top-[20px] text-[15px] font-semibold leading-[1.4]">
        {texto}
      </span>
      {MARCA[estado] && (
        <span
          aria-hidden="true"
          className="absolute left-[324px] top-[15px] text-[20px] font-semibold leading-[1.4]"
        >
          {MARCA[estado]}
        </span>
      )}
    </button>
  );
}
