import { useState } from "react";
import TopBar from "../../components/TopBar";
import ScreenShell from "../../components/ScreenShell";
import ActionButton from "../../components/ActionButton";
import patente from "../../assets/r2-patente.png";
import { NOMBRE_RESTITUIDO, TITULO_EXPEDIENTE } from "../../data/reto2";

const FIRMA = NOMBRE_RESTITUIDO.toUpperCase();

/**
 * Se arrastra (o se toca) el nombre de Charlotte Perriand hasta el hueco de
 * la patente. Hasta que no está colocado, no se puede restituir la firma.
 */
export default function R2Restituir({ onHome, onBack, onRestituir }) {
  const [colocada, setColocada] = useState(false);
  const [encima, setEncima] = useState(false);

  const colocar = () => {
    setColocada(true);
    setEncima(false);
  };

  return (
    <ScreenShell
      footer={
        <>
          <ActionButton compact disabled={!colocada} onClick={onRestituir}>
            Restituir la firma&nbsp; →
          </ActionButton>
          {!colocada && (
            <p className="absolute inset-x-0 top-full mt-2 text-center text-[11px] leading-[1.4] text-[var(--blanco-principal)]">
              Coloca el nombre en el hueco para continuar.
            </p>
          )}
        </>
      }
    >
      <TopBar title={TITULO_EXPEDIENTE} onHome={onHome} onBack={onBack} />

      <div className="flex flex-col gap-[14px] px-6 pt-[28px]">
        <p className="text-[11px] leading-[1.4] text-[var(--verde-principal)]">
          04 / RESTITUIR · LA FIRMA QUE FALTA
        </p>

        <h1 className="font-display text-[30px] font-extrabold leading-[1.12] text-[var(--blanco-principal)]">
          Devuélvele
          <br />
          su nombre.
        </h1>

        <p className="text-[14px] leading-[1.4] text-[var(--blanco-principal)]">
          Acabas de descubrir cómo Charlotte Perriand fue invisibilizada en
          1927.
        </p>

        <div className="flex min-h-[378px] w-full flex-col gap-[12px] overflow-hidden rounded-[13px] bg-[var(--blanco-principal)] p-[16px]">
          <p className="w-full text-[13px] leading-[1.4] text-[var(--negro-principal)]">
            Coge la pluma. Haz de conservador/a-restaurador/a de documento
            gráfico y pon la firma que falta en la patente para darle a
            Charlotte el reconocimiento que le quitaron.
          </p>

          <div className="h-[78px] w-full shrink-0 overflow-hidden">
            <img
              src={patente}
              alt="Fragmento de la patente francesa donde falta la firma."
              className="size-full max-w-none object-cover"
            />
          </div>

          {/* El nombre que se arrastra; al colocarlo desaparece de aquí */}
          <div className="h-[56px] w-full shrink-0">
            {!colocada && (
              <button
                type="button"
                draggable
                onDragStart={(e) => e.dataTransfer.setData("text/plain", FIRMA)}
                onClick={colocar}
                aria-label={`Colocar el nombre de ${NOMBRE_RESTITUIDO} en la patente`}
                className="flex size-full cursor-grab items-center justify-center rounded-[13px] bg-[var(--verde-principal)] active:cursor-grabbing"
              >
                <span className="font-display w-full text-center text-[15px] font-extrabold leading-[1.12] text-[var(--negro-principal)]">
                  {FIRMA}&nbsp; ↓
                </span>
              </button>
            )}
          </div>

          {/* Hueco de destino */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setEncima(true);
            }}
            onDragLeave={() => setEncima(false)}
            onDrop={(e) => {
              e.preventDefault();
              colocar();
            }}
            className={`flex h-[62px] w-full shrink-0 items-center justify-center overflow-hidden rounded-[13px] px-[12px] transition-colors duration-200 ${
              colocada
                ? "border-2 border-solid border-[var(--verde-principal)] bg-[var(--verde-principal)]"
                : `border-2 border-dashed border-[var(--verde-principal)] ${
                    encima ? "bg-[var(--verde-principal)]/20" : ""
                  }`
            }`}
          >
            <p className="font-display w-full text-center text-[12px] font-extrabold leading-[1.12] text-[var(--negro-principal)]">
              {colocada ? (
                FIRMA
              ) : (
                <>
                  ARRASTRA EL NOMBRE
                  <br />
                  DE CHARLOTTE AQUÍ
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    </ScreenShell>
  );
}
