/**
 * Envoltorio común: tamaño de "pantalla de teléfono" (412 × 917, el del
 * diseño), zona con scroll, pie fijo opcional (botón principal + nota) y
 * capa superpuesta opcional (diálogos).
 *
 * `scroll={false}` es para las pantallas a sangre (intro y start), cuyo
 * contenido va posicionado en absoluto y no necesita desplazamiento.
 */
export default function ScreenShell({
  children,
  footer,
  footerClassName = "bottom-[59px]",
  overlay,
  background = "bg-[var(--azul-oscuro)]",
  scroll = true,
  className = "",
}) {
  return (
    <div
      className={`relative mx-auto h-[917px] w-[412px] overflow-hidden ${background} ${className}`}
    >
      {scroll ? (
        <div
          className={`h-full overflow-y-auto overflow-x-hidden ${footer ? "pb-[117px]" : "pb-10"}`}
        >
          {children}
        </div>
      ) : (
        children
      )}

      {footer && (
        <div className={`absolute inset-x-6 z-10 ${footerClassName}`}>{footer}</div>
      )}

      {overlay}
    </div>
  );
}
