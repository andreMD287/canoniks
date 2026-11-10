import { useLayoutEffect, useRef, useState } from "react";

/**
 * Escala el texto en horizontal para que ocupe exactamente el ancho que tiene
 * en el diseño. El diseño usa Coolvetica, que no está en Google Fonts: así el
 * titular calza igual tanto si esa tipografía está instalada en el equipo como
 * si se usa la Anton de reserva, que es más ancha.
 *
 * El span interior es `inline-block`, así que su `offsetWidth` es el ancho real
 * del texto (y no el de la caja). `offsetWidth` no cuenta el `transform`, de
 * modo que volver a medir siempre da el mismo valor.
 */
export default function TextoAjustado({ children, ancho, className = "" }) {
  const ref = useRef(null);
  const [escala, setEscala] = useState(1);

  useLayoutEffect(() => {
    let vigente = true;

    const medir = () => {
      const el = ref.current;
      if (!vigente || !el) return;
      const real = el.offsetWidth;
      if (real > 0) setEscala(ancho / real);
    };

    medir();
    // las tipografías web cargan después, así que hay que volver a medir
    document.fonts?.ready.then(medir);

    return () => {
      vigente = false;
    };
  }, [children, ancho]);

  return (
    <span className={`block ${className}`}>
      <span
        ref={ref}
        className="inline-block origin-left whitespace-nowrap"
        style={{ transform: `scaleX(${escala})` }}
      >
        {children}
      </span>
    </span>
  );
}
