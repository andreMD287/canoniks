import TopBar from "../../components/TopBar";
import ScreenShell from "../../components/ScreenShell";
import FolderCard from "../../components/FolderCard";
import ActionButton from "../../components/ActionButton";
import folderMision from "../../assets/folder-mision.svg";
import { TITULO_EXPEDIENTE } from "../../data/reto2";

export default function R2Mision({ onHome, onBack, onAbrir }) {
  return (
    <ScreenShell
      footer={<ActionButton onClick={onAbrir}>Abrir el expediente&nbsp; →</ActionButton>}
    >
      <TopBar title={TITULO_EXPEDIENTE} onHome={onHome} onBack={onBack} />

      <div className="px-6 pt-[28px]">
        <p className="text-[11px] font-semibold leading-[1.4] text-[var(--verde-principal)]">
          SALA 2 / MISIÓN
        </p>

        <h1 className="font-display mt-[21px] text-[30px] font-extrabold leading-[1.12] text-[var(--verde-principal)]">
          Cuando saber no
          <br />
          significa ser
          <br />
          escuchada
        </h1>

        <FolderCard asset={folderMision} className="mt-[34px] min-h-[474px]">
          <p className="text-[11px] font-semibold leading-[1.4] text-[var(--negro-principal)]">
            UN NUEVO ARCHIVO HA LLEGADO
          </p>

          <h2 className="font-display mt-[19px] text-[36px] font-extrabold leading-[1.12] text-[var(--negro-principal)]">
            El caso
            <br />
            Perriand
          </h2>

          <p className="mt-[19px] text-[16px] leading-[1.4] text-[var(--negro-principal)]">
            Una carta. Una patente. Un catálogo.
            <br />
            Investiga qué dice cada registro sobre su participación y
            reconocimiento.
          </p>

          <p className="mt-[29px] text-[11px] font-semibold leading-[1.4] text-[var(--negro-principal)]">
            TU RECORRIDO
          </p>
          <ol className="mt-[15px] space-y-0 text-[14px] leading-[1.4] text-[var(--negro-principal)]">
            <li>01&nbsp; Examina los documentos</li>
            <li>02&nbsp; Identifica y contrasta</li>
            <li>03&nbsp; Reconstruye el reconocimiento</li>
          </ol>
        </FolderCard>
      </div>
    </ScreenShell>
  );
}
