import { useEffect, useRef, useState } from "react";
import TopBar from "../components/TopBar";
import ScreenShell from "../components/ScreenShell";
import bodegaVista from "../assets/bodega-vista.png";

/**
 * Zona de las gafas de realidad virtual dentro de la foto (en % de la
 * imagen). Sólo tocar esta zona cuenta como hallazgo.
 */
const GAFAS = { left: 83, top: 18.9, width: 17, height: 8.4 };
const ORIGEN_ZOOM = `${GAFAS.left + GAFAS.width / 2}% ${GAFAS.top + GAFAS.height / 2}%`;

const DURACION_TRANSICION = 1100;

/**
 * La bodega. Hay que tocar las gafas de realidad virtual (en el estante de
 * arriba a la derecha). Un toque en cualquier otro sitio no cuenta. Al
 * encontrarlas la cámara se acerca a las gafas, la pantalla se tiñe de verde
 * y se pasa al reto completado.
 */
export default function BodegaVista({ onHome, onBack, onEncontrar }) {
  const [encontrada, setEncontrada] = useState(false);
  const [fallos, setFallos] = useState(0);
  const temporizador = useRef(null);

  useEffect(() => () => clearTimeout(temporizador.current), []);

  const confirmar = (e) => {
    e.stopPropagation();
    if (encontrada) return;
    setEncontrada(true);
    temporizador.current = setTimeout(onEncontrar, DURACION_TRANSICION);
  };

  const fallar = () => {
    if (encontrada) return;
    setFallos((n) => n + 1);
  };

  return (
    <ScreenShell background="bg-[var(--negro-bodega)]" scroll={false}>
      <div className="absolute inset-x-0 top-0 z-10">
        <TopBar onHome={onHome} onBack={onBack} />
      </div>

      <div
        onClick={fallar}
        className="absolute left-[-5px] top-[85px] block h-[747px] w-[421px] cursor-crosshair overflow-hidden"
      >
        <div
          className="absolute inset-0 transition-transform duration-[1100ms] ease-in-out"
          style={{
            transformOrigin: ORIGEN_ZOOM,
            transform: encontrada ? "scale(4)" : "scale(1)",
          }}
        >
          <img
            alt="Bodega con estantes, un escritorio y fotografías antiguas"
            src={bodegaVista}
            draggable={false}
            className="absolute inset-0 size-full max-w-none select-none object-cover"
          />

          <button
            type="button"
            onClick={confirmar}
            aria-label="Gafas de realidad virtual en el estante"
            className="absolute cursor-pointer rounded-[10px] outline-none"
            style={{
              left: `${GAFAS.left}%`,
              top: `${GAFAS.top}%`,
              width: `${GAFAS.width}%`,
              height: `${GAFAS.height}%`,
            }}
          >
            <span
              className={`pointer-events-none absolute inset-0 rounded-[10px] border-2 border-[var(--verde-principal)] transition-opacity duration-300 ${
                encontrada ? "opacity-100" : "opacity-0"
              }`}
            />
          </button>
        </div>

        <span className="pointer-events-none absolute inset-0 shadow-[inset_0px_4px_6.1px_11px_rgba(0,0,0,0.45)]" />
        <span
          className={`pointer-events-none absolute inset-0 bg-[var(--verde-principal)] transition-opacity duration-[600ms] ${
            encontrada ? "opacity-100 delay-[500ms]" : "opacity-0"
          }`}
        />
      </div>

      <p
        key={fallos}
        className={`pointer-events-none absolute inset-x-6 bottom-[42px] z-10 text-center text-[12px] font-semibold leading-[1.4] text-[var(--verde-principal)] transition-opacity duration-500 ${
          encontrada ? "opacity-0" : "opacity-75"
        } ${fallos > 0 && !encontrada ? "animar-rechazo" : ""}`}
      >
        {fallos > 0
          ? "Ahí no. Sigue buscando las gafas."
          : "Toca las gafas cuando las encuentres."}
      </p>
    </ScreenShell>
  );
}
