import { useState } from "react";
import ScreenShell from "../components/ScreenShell";
import fondo from "../assets/start-fondo.svg";
import ojo from "../assets/start-ojo.svg";
import elipseMedia from "../assets/start-elipse-10.svg";
import elipseBoton from "../assets/start-elipse-11.svg";

/**
 * Qué se puede hacer en el archivo. El botón "Explora el caso" aparece
 * desenfocado y se vuelve nítido al pasar el cursor, al enfocarlo con el
 * teclado o al tocarlo; el primer toque en pantalla táctil lo enfoca y el
 * segundo entra al expediente.
 */
export default function Start({ onExplorar }) {
  const [nitido, setNitido] = useState(false);

  return (
    <ScreenShell background="bg-[var(--morado-principal)]" scroll={false}>
      <img
        alt=""
        src={fondo}
        className="pointer-events-none absolute left-[-41px] top-0 block h-[917px] w-[496px] max-w-none"
      />

      <img
        alt=""
        src={ojo}
        className="pointer-events-none absolute left-[170px] top-[40px] block h-[60.5px] w-[72px] max-w-none"
      />

      <p className="font-display absolute left-[59px] top-[190px] h-[105px] w-[316px] text-right text-[60px] font-extrabold leading-[1.02] tracking-[-3.6px] text-[var(--verde-principal)]">
        AQUÍ PODRÁS
      </p>

      <img
        alt=""
        src={elipseMedia}
        className="pointer-events-none absolute left-0 top-[626px] block h-[206px] w-[412px] max-w-none"
      />

      <p className="font-titular absolute left-[49px] top-[358px] h-[371px] w-[316px] text-[60px] leading-[0.84] text-[var(--verde-principal)]">
        <span className="underline decoration-solid decoration-[4px] underline-offset-[2px]">
          investigar
        </span>{" "}
        el caso{" "}
        <span className="underline decoration-solid decoration-[3px] underline-offset-[2px]">
          consultar
        </span>{" "}
        la evidencia y{" "}
        <span className="underline decoration-solid decoration-[4px] underline-offset-[2px]">
          verificar
        </span>{" "}
        los expedientes
      </p>

      <button
        type="button"
        onClick={() => (nitido ? onExplorar() : setNitido(true))}
        onMouseEnter={() => setNitido(true)}
        onMouseLeave={() => setNitido(false)}
        onFocus={() => setNitido(true)}
        onBlur={() => setNitido(false)}
        className="absolute inset-x-0 bottom-0 top-[758px] block"
      >
        <img
          alt=""
          src={elipseBoton}
          className="pointer-events-none absolute left-0 top-0 block h-[159px] w-[412px] max-w-none"
        />
        <span
          className={`font-display absolute left-1/2 top-[80px] block w-[220px] -translate-x-1/2 text-center text-[28px] font-extrabold leading-[1.02] tracking-[-1.68px] text-[var(--verde-principal)] transition-all duration-500 ease-out ${
            nitido
              ? "scale-105 opacity-100 blur-0 drop-shadow-[0_0_14px_rgba(174,242,0,0.55)]"
              : "scale-100 opacity-70 blur-[5px]"
          }`}
        >
          Explora el caso
        </span>
      </button>
    </ScreenShell>
  );
}
