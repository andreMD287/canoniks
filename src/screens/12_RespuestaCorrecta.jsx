import TopBar from "../components/TopBar";
import ScreenShell from "../components/ScreenShell";
import FolderCard from "../components/FolderCard";
import ActionButton from "../components/ActionButton";
import folderCorrecta from "../assets/folder-respuesta-correcta.svg";
import { OPCIONES, OPCION_CORRECTA } from "../data/pregunta";

export default function RespuestaCorrecta({ onHome, onBack, onIrALaBodega }) {
  const correcta = OPCIONES.find((o) => o.id === OPCION_CORRECTA);

  return (
    <ScreenShell
      footer={
        <>
          <ActionButton onClick={onIrALaBodega}>Ir a la bodega&nbsp; →</ActionButton>
          <p className="absolute inset-x-0 top-full mt-2 text-center text-[11px] leading-[1.4] text-[var(--blanco-principal)]">
            Pregunta resuelta · Bodega desbloqueada
          </p>
        </>
      }
    >
      <TopBar onHome={onHome} onBack={onBack} />

      <div className="px-6 pt-[28px]">
        <p className="text-[11px] font-semibold leading-[1.4] text-[var(--verde-principal)]">
          03 / RESOLVER · RESPUESTA CORRECTA
        </p>

        <h1 className="font-display mt-[29px] text-[42px] font-extrabold leading-[1.12] text-[var(--verde-principal)]">
          ¡Cambiaste
          <br />
          la mirada!
        </h1>

        <FolderCard
          asset={folderCorrecta}
          bleed
          className="mt-[35px] min-h-[471px]"
          contentClassName="pt-[59px] pb-8"
        >
          <p className="text-[12px] font-semibold leading-[1.4] text-[var(--negro-principal)]">
            RESPUESTA CORRECTA / {correcta.id}
          </p>

          <h2 className="font-display mt-[34px] text-[28px] font-extrabold leading-[1.12] text-[var(--negro-principal)]">
            {correcta.texto}
          </h2>

          <p className="mt-[25px] text-[16px] leading-[1.4] text-[var(--negro-principal)]">
            Entre estas cuatro opciones, este modelo amplía la muestra frente a
            tomar solo el cuerpo masculino como referencia.
          </p>

          <div className="mt-[31px] min-h-[144px] rounded-[13px] bg-[var(--blanco-principal)] p-[16px] text-[var(--negro-principal)]">
            <p className="text-[11px] font-semibold leading-[1.4]">
              NINGÚN MODELO REPRESENTA A TODOS
            </p>
            <p className="mt-[20px] text-[14px] leading-[1.4]">
              El problema no está en el cuerpo de quien utiliza el producto,
              sino en las decisiones con las que fue diseñado.
            </p>
          </div>
        </FolderCard>
      </div>
    </ScreenShell>
  );
}
