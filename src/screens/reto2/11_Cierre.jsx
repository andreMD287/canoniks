import TopBar from "../../components/TopBar";
import ScreenShell from "../../components/ScreenShell";
import FolderCard from "../../components/FolderCard";
import ActionButton from "../../components/ActionButton";
import folderMision from "../../assets/folder-mision.svg";
import { NOMBRE_RESTITUIDO, TITULO_EXPEDIENTE } from "../../data/reto2";

export default function R2Cierre({ onHome, onBack, onVolver }) {
  return (
    <ScreenShell
      footer={<ActionButton onClick={onVolver}>Volver al archivo&nbsp; →</ActionButton>}
    >
      <TopBar title={TITULO_EXPEDIENTE} onHome={onHome} onBack={onBack} />

      <div className="px-6 pt-[28px]">
        <p className="text-[11px] font-semibold leading-[1.4] text-[var(--verde-principal)]">
          05 / COMPLETAR · CASO RESUELTO
        </p>

        <h1 className="font-display mt-[21px] text-[38px] font-extrabold leading-[1.12] text-[var(--verde-principal)]">
          Una ausencia
          <br />
          menos.
        </h1>

        <FolderCard asset={folderMision} className="mt-[32px] min-h-[474px]">
          <p className="text-[11px] font-semibold leading-[1.4] text-[var(--negro-principal)]">
            RETO 02 / COMPLETADO
          </p>

          <p className="font-display mt-[12px] text-[54px] font-extrabold leading-[1.12] text-[var(--negro-principal)]">
            03 / 03
          </p>

          <h2 className="font-display mt-[11px] text-[20px] font-extrabold leading-[1.12] text-[var(--negro-principal)]">
            Evidencias contrastadas
          </h2>

          <p className="mt-[23px] text-[15px] leading-[1.4] text-[var(--negro-principal)]">
            Has distinguido entre participación, registro de invención y
            reconocimiento profesional.
          </p>

          <div className="mt-[26px] h-[64px] w-full overflow-hidden rounded-[10px] bg-[var(--blanco-principal)] px-[14px] pt-[10px] text-[var(--negro-principal)]">
            <p className="text-[10px] font-semibold leading-[1.4]">
              NOMBRE INCORPORADO
            </p>
            <p className="mt-[6px] text-[17px] font-semibold leading-[1.4]">
              {NOMBRE_RESTITUIDO}
            </p>
          </div>

          <div className="mt-[22px] h-[72px] w-full overflow-hidden rounded-[10px] bg-[var(--negro-principal)] px-[14px] pt-[10px]">
            <p className="text-[10px] font-semibold leading-[1.4] text-[var(--verde-principal)]">
              NOS VEMOS EN EL DEBATE
            </p>
            <p className="mt-[10px] text-[12px] leading-[1.4] text-[var(--blanco-principal)]">
              ¿Quién más quedó fuera del archivo?
            </p>
          </div>
        </FolderCard>
      </div>
    </ScreenShell>
  );
}
