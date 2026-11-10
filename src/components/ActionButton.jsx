const VARIANTES = {
  primario: "bg-[var(--verde-principal)] text-[var(--negro-principal)]",
  oscuro: "bg-[var(--negro-principal)] text-[var(--verde-principal)]",
};

/**
 * Botón de acción principal (píldora de 58 px).
 * `disabled` usa el aspecto "blanco" del diseño (p. ej. "Comprobar respuesta"
 * antes de elegir una opción).
 */
export default function ActionButton({
  children,
  onClick,
  disabled = false,
  variant = "primario",
  compact = false,
  className = "",
}) {
  const estilo = disabled
    ? "cursor-not-allowed bg-[var(--blanco-principal)] text-[var(--negro-principal)]"
    : VARIANTES[variant];

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`w-full rounded-[29px] py-[17px] font-semibold ${
        compact ? "text-[15px]" : "text-[16px]"
      } ${estilo} ${className}`}
    >
      {children}
    </button>
  );
}
