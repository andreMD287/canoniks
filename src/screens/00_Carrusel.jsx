import { useRef, useState } from "react";
import Intro from "./00_Intro";
import Start from "./00_Start";

const TOTAL = 2;
const UMBRAL = 50; // px que hay que arrastrar para cambiar de lámina

/**
 * Las dos láminas de apertura (la fachada del museo y lo que se puede hacer)
 * son un carrusel, no dos pantallas: se pasa deslizando, tocando o con los
 * puntos de abajo.
 */
export default function Carrusel({ onExplorar }) {
  const [lamina, setLamina] = useState(0);
  const inicio = useRef(null);

  const ir = (i) => setLamina(Math.max(0, Math.min(TOTAL - 1, i)));

  const soltar = (x) => {
    if (inicio.current === null) return;
    const avance = inicio.current - x;
    inicio.current = null;
    if (Math.abs(avance) > UMBRAL) ir(lamina + (avance > 0 ? 1 : -1));
  };

  return (
    <div
      className="relative mx-auto h-[917px] w-[412px] touch-pan-y overflow-hidden bg-[var(--azul-oscuro)]"
      onTouchStart={(e) => {
        inicio.current = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => soltar(e.changedTouches[0].clientX)}
      onPointerDown={(e) => {
        if (e.pointerType === "mouse") inicio.current = e.clientX;
      }}
      onPointerUp={(e) => {
        if (e.pointerType === "mouse") soltar(e.clientX);
      }}
    >
      <div
        className="flex h-full w-[824px] transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${lamina * 412}px)` }}
      >
        <div className="h-full w-[412px] shrink-0">
          <Intro onContinuar={() => ir(1)} />
        </div>
        <div className="h-full w-[412px] shrink-0">
          <Start onExplorar={onExplorar} />
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-[14px] z-20 flex justify-center gap-[10px]">
        {Array.from({ length: TOTAL }, (_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => ir(i)}
            aria-label={`Ir a la lámina ${i + 1} de ${TOTAL}`}
            aria-current={i === lamina}
            className={`h-[8px] rounded-full transition-all duration-300 ${
              i === lamina
                ? "w-[26px] bg-[var(--verde-principal)]"
                : "w-[8px] bg-[var(--blanco-principal)]/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
