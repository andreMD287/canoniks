import { useState } from "react";
import TopBar from "../../components/TopBar";
import ScreenShell from "../../components/ScreenShell";
import ActionButton from "../../components/ActionButton";
import { PIEZAS, TITULO_EXPEDIENTE } from "../../data/reto3";

/** Galería de las cuatro piezas: la miniatura que tocas se ve en grande. */
export default function R3Examinar({ onHome, onBack, onSeguir }) {
  const [activa, setActiva] = useState(PIEZAS[0].id);
  const pieza = PIEZAS.find((p) => p.id === activa);

  return (
    <ScreenShell
      footer={
        <ActionButton compact onClick={onSeguir}>
          Continuar a clasificar&nbsp; →
        </ActionButton>
      }
    >
      <TopBar title={TITULO_EXPEDIENTE} onHome={onHome} onBack={onBack} />

      <div className="px-6 pt-[28px]">
        <p className="text-[11px] leading-[1.4] text-[var(--verde-principal)]">
          01 / EXAMINAR · BAUHAUS
        </p>

        <h1 className="font-display mt-[21px] text-[30px] font-extrabold leading-[1.12] text-[var(--verde-principal)]">
          El trabajo que
          <br />
          tenía género.
        </h1>

        <p className="mt-[24px] text-[15px] leading-[1.4] text-[var(--blanco-principal)]">
          Examina las siguientes piezas de diseño de la Bauhaus que llegaron al
          museo.
        </p>

        <div className="mt-[38px] h-[304px] w-full overflow-hidden rounded-[12px] bg-[var(--blanco-principal)]">
          <div className="mx-[16px] mt-[12px] h-[252px]">
            <img
              src={pieza.imagen}
              alt={pieza.alt}
              className="size-full max-w-none object-contain"
            />
          </div>
          <p className="ml-[18px] mt-[14px] text-[10px] leading-[1.4] text-[var(--negro-principal)]">
            PIEZA {pieza.id}&nbsp; /&nbsp; COLECCIÓN BAUHAUS
          </p>
        </div>

        <div className="mt-[16px] flex gap-[12px]">
          {PIEZAS.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setActiva(p.id)}
              aria-pressed={p.id === activa}
              aria-label={`Examinar la pieza ${p.id}`}
              className={`h-[88px] w-[82px] shrink-0 overflow-hidden rounded-[8px] transition-colors duration-200 ${
                p.id === activa
                  ? "bg-[var(--verde-principal)]"
                  : "bg-[var(--blanco-principal)]"
              }`}
            >
              <span className="mx-[6px] mt-[6px] block h-[62px] w-[70px]">
                <img src={p.imagen} alt="" className="size-full object-contain" />
              </span>
              <span className="mt-[2px] block text-center text-[10px] leading-[1.4] text-[var(--negro-principal)]">
                {p.id}
              </span>
            </button>
          ))}
        </div>

        <p className="mt-[20px] text-[12px] leading-[1.4] text-[var(--blanco-principal)]">
          Toca una miniatura para observar cada pieza.
        </p>
      </div>
    </ScreenShell>
  );
}
