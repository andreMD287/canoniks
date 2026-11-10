import { useState } from "react";
import TopBar from "../../components/TopBar";
import ScreenShell from "../../components/ScreenShell";
import ActionButton from "../../components/ActionButton";
import { NOMBRES, TITULO_EXPEDIENTE } from "../../data/reto2";

/**
 * Se marcan los nombres que figuran en la patente de 1928. No hay respuesta
 * correcta ni intentos: lo que se anota aquí se contrasta después con la
 * carta de 1927.
 */
export default function R2Identificar({ onHome, onBack, onGuardar }) {
  const [marcados, setMarcados] = useState([]);

  const alternar = (nombre) =>
    setMarcados((m) =>
      m.includes(nombre) ? m.filter((n) => n !== nombre) : [...m, nombre],
    );

  return (
    <ScreenShell
      footer={
        <>
          <ActionButton
            disabled={marcados.length === 0}
            onClick={() => onGuardar(marcados)}
          >
            Guardar identificación
          </ActionButton>
          {marcados.length === 0 && (
            <p className="absolute inset-x-0 top-full mt-2 text-center text-[11px] leading-[1.4] text-[var(--blanco-principal)]">
              Marca al menos un nombre.
            </p>
          )}
        </>
      }
    >
      <TopBar title={TITULO_EXPEDIENTE} onHome={onHome} onBack={onBack} />

      <div className="px-6 pt-[28px]">
        <p className="text-[11px] font-semibold leading-[1.4] text-[var(--verde-principal)]">
          02 / IDENTIFICAR · REGISTRO 2 DE 3
        </p>

        <h1 className="font-display mt-[21px] text-[30px] font-extrabold leading-[1.12] text-[var(--verde-principal)]">
          ¿Quién aparece
          <br />
          en el registro?
        </h1>

        {/* Los tres registros del expediente; el de 1928 es el que se consulta */}
        <div className="mt-[28px] flex gap-[8px]" role="list">
          {[
            { año: "1927", activo: false },
            { año: "1928", activo: true },
            { año: "1929", activo: false },
          ].map(({ año, activo }) => (
            <span
              key={año}
              role="listitem"
              aria-current={activo}
              className={`flex h-[40px] w-[116px] items-center justify-center rounded-[20px] text-[13px] font-semibold leading-[1.4] text-[var(--negro-principal)] ${
                activo ? "bg-[var(--verde-principal)]" : "bg-[var(--blanco-principal)]"
              }`}
            >
              {año}
            </span>
          ))}
        </div>

        <div className="mt-[21px] h-[111px] w-full overflow-hidden rounded-[12px] bg-[var(--blanco-principal)] px-[18px] pt-[14px] text-[var(--negro-principal)]">
          <p className="text-[11px] font-semibold leading-[1.4]">
            PATENTE FRANCESA · 1928
          </p>
          <p className="font-display mt-[14px] text-[24px] font-extrabold leading-[1.12]">
            N.º 672.820
          </p>
          <p className="mt-[12px] text-[12px] leading-[1.4]">
            ¿Quién figura como inventor?
          </p>
        </div>

        <p className="mt-[21px] text-[14px] leading-[1.4] text-[var(--blanco-principal)]">
          Marca los nombres que encuentres.
        </p>

        <div className="mt-[17px] flex flex-col gap-[10px]">
          {NOMBRES.map((nombre) => {
            const marcado = marcados.includes(nombre);
            return (
              <button
                key={nombre}
                type="button"
                role="checkbox"
                aria-checked={marcado}
                onClick={() => alternar(nombre)}
                className="relative flex h-[54px] w-full items-center overflow-hidden rounded-[10px] bg-[var(--blanco-principal)] text-left"
              >
                <span
                  className={`ml-[16px] flex size-[22px] shrink-0 items-center justify-center rounded-[4px] border-[1.5px] border-solid border-[var(--negro-principal)] transition-colors duration-200 ${
                    marcado ? "bg-[var(--verde-principal)]" : "bg-[var(--blanco-principal)]"
                  }`}
                >
                  {marcado && (
                    <span className="text-[14px] font-bold leading-none text-[var(--negro-principal)]">
                      ✓
                    </span>
                  )}
                </span>
                <span className="ml-[15px] text-[15px] font-semibold leading-[1.4] text-[var(--negro-principal)]">
                  {nombre}
                </span>
              </button>
            );
          })}
        </div>

        <p className="mt-[20px] text-[12px] leading-[1.4] text-[var(--blanco-principal)]">
          Puedes seleccionar más de un nombre.
          <br />
          Vuelve a la fuente antes de confirmar.
        </p>
      </div>
    </ScreenShell>
  );
}
