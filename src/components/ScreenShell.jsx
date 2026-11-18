import { useContext } from "react";
import Escenario, { Anidado } from "./Escenario";

/**
 * Envoltorio común: pantalla de "teléfono" de 412 px de ancho (el del diseño),
 * zona con scroll, pie fijo opcional (botón principal + nota) y capa
 * superpuesta opcional (diálogos).
 *
 * En un móvil, las pantallas con scroll ocupan todo el ancho y el alto de la
 * ventana; el resto (`scroll={false}`, o `ajustar`) se escalan enteras (412 ×
 * 917) para caber. Ver Escenario.
 *
 * `scroll={false}` es para las pantallas a sangre (intro, start, menús...),
 * cuyo contenido va posicionado en absoluto y no necesita desplazamiento.
 * `ajustar` obliga a escalar el diseño completo aunque la pantalla tenga
 * scroll (cuando mezcla elementos en posición fija con el pie).
 */
export default function ScreenShell({
  children,
  footer,
  footerClassName = "bottom-[59px]",
  overlay,
  background = "bg-[var(--azul-oscuro)]",
  scroll = true,
  ajustar = false,
  className = "",
}) {
  const anidado = useContext(Anidado);

  const contenido = (
    <>
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
    </>
  );

  // Dentro de otro escenario (carrusel): una caja de 412 × 917 sin escalar.
  if (anidado) {
    return (
      <div className={`relative h-[917px] w-[412px] overflow-hidden ${background} ${className}`}>
        {contenido}
      </div>
    );
  }

  return (
    <Escenario background={background} llena={scroll && !ajustar}>
      <div
        className={`animar-entrada relative size-full overflow-hidden ${background} ${className}`}
      >
        {contenido}
      </div>
    </Escenario>
  );
}
