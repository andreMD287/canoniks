import { useState } from "react";
import TopBar from "../components/TopBar";
import ScreenShell from "../components/ScreenShell";
import bodegaVista from "../assets/bodega-vista.png";

/**
 * La bodega. No hay botón: se cierra el expediente tocando la foto, que es
 * donde está la pieza. Al pasar el cursor la imagen se acerca un poco y al
 * tocarla da un destello antes de pasar al reto completado.
 */
export default function BodegaVista({ onHome, onBack, onEncontrar }) {
  const [encontrada, setEncontrada] = useState(false);

  const confirmar = () => {
    if (encontrada) return;
    setEncontrada(true);
    // deja ver el destello antes de cambiar de pantalla
    setTimeout(onEncontrar, 450);
  };

  return (
    <ScreenShell background="bg-[var(--negro-bodega)]" scroll={false}>
      <div className="absolute inset-x-0 top-0 z-10">
        <TopBar onHome={onHome} onBack={onBack} />
      </div>

      <button
        type="button"
        onClick={confirmar}
        aria-label="Confirmar el hallazgo de la escultura en la bodega"
        className="group absolute left-[-5px] top-[85px] block h-[747px] w-[421px] cursor-pointer overflow-hidden"
      >
        <img
          alt="Bodega con estantes, un escritorio y fotografías antiguas"
          src={bodegaVista}
          className={`absolute inset-0 size-full max-w-none object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] ${
            encontrada ? "scale-[1.08]" : ""
          }`}
        />
        <span className="pointer-events-none absolute inset-0 shadow-[inset_0px_4px_6.1px_11px_rgba(0,0,0,0.45)]" />
        <span
          className={`pointer-events-none absolute inset-0 bg-[var(--verde-principal)] transition-opacity duration-300 ${
            encontrada ? "opacity-35" : "opacity-0"
          }`}
        />
      </button>

      <p
        className={`pointer-events-none absolute inset-x-6 bottom-[42px] z-10 text-center text-[12px] font-semibold leading-[1.4] text-[var(--verde-principal)] transition-opacity duration-500 ${
          encontrada ? "opacity-0" : "opacity-75"
        }`}
      >
        Toca la bodega cuando la encuentres.
      </p>
    </ScreenShell>
  );
}
