import { useState } from "react";
import TopBar from "../../components/TopBar";
import ScreenShell from "../../components/ScreenShell";
import ActionButton from "../../components/ActionButton";
import { PIEZAS, TITULO_EXPEDIENTE } from "../../data/reto3";

/**
 * La pregunta trampa: todas las piezas son de mujeres, así que ninguna
 * elección es "correcta". Se elige una y la siguiente pantalla lo revela.
 */
export default function R3Clasificar({ onHome, onBack, onConfirmar }) {
  const [elegida, setElegida] = useState(null);

  return (
    <ScreenShell
      footer={
        <ActionButton compact disabled={!elegida} onClick={() => onConfirmar(elegida)}>
          {elegida ? `Confirmar la pieza ${elegida}` : "Elige una pieza para confirmar"}
        </ActionButton>
      }
    >
      <TopBar title={TITULO_EXPEDIENTE} onHome={onHome} onBack={onBack} />

      <div className="px-6 pt-[28px]">
        <p className="text-[11px] leading-[1.4] text-[var(--verde-principal)]">
          02 / CLASIFICAR · ELIGE UNA PIEZA
        </p>

        <h1 className="font-display mt-[21px] text-[28px] font-extrabold leading-[1.12] text-[var(--verde-principal)]">
          ¿Cuál de estas piezas
          <br />
          fue creada por
          <br />
          un hombre?
        </h1>

        <p className="mt-[12px] text-[14px] leading-[1.4] text-[var(--blanco-principal)]">
          Elige una pieza y confirma tu elección.
        </p>

        <div className="mt-[24px] grid grid-cols-2 gap-x-[12px] gap-y-[14px]">
          {PIEZAS.map((p) => {
            const activa = p.id === elegida;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => setElegida(p.id)}
                aria-pressed={activa}
                className={`h-[200px] w-[176px] overflow-hidden rounded-[12px] text-left transition-colors duration-200 ${
                  activa
                    ? "bg-[var(--verde-principal)]"
                    : "bg-[var(--blanco-principal)]"
                }`}
              >
                <span className="mx-[8px] mt-[8px] block h-[154px] w-[160px]">
                  <img src={p.imagen} alt={p.alt} className="size-full object-contain" />
                </span>
                <span className="ml-[14px] mt-[6px] block text-[11px] leading-[1.4] text-[var(--negro-principal)]">
                  PIEZA {p.id}
                </span>
              </button>
            );
          })}
        </div>

        <p className="mt-[28px] text-[12px] leading-[1.4] text-[var(--blanco-principal)]">
          Puedes cambiar tu elección antes de confirmar.
        </p>
      </div>
    </ScreenShell>
  );
}
