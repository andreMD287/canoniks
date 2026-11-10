import TopBar from "../components/TopBar";
import ScreenShell from "../components/ScreenShell";
import FolderCard from "../components/FolderCard";
import ActionButton from "../components/ActionButton";
import folderMision from "../assets/folder-mision.svg";

export default function MisionDelReto({ onHome, onBack, onOpenExpediente }) {
  return (
    <ScreenShell>
      <TopBar onHome={onHome} onBack={onBack} />

      <div className="px-6 pt-[28px]">
        <p className="text-[11px] font-semibold leading-[1.4] text-[var(--verde-principal)]">
          SALA 1 / MISIÓN
        </p>

        <h1 className="font-display mt-[22px] text-[32px] font-extrabold leading-[1.12] text-[var(--verde-principal)]">
          El cuerpo que no
          <br />
          estaba en el modelo
        </h1>

        <p className="mt-[19px] text-[17px] font-semibold leading-[1.4] text-[var(--blanco-principal)]">
          ¿Quién definió la medida?
        </p>

        <FolderCard asset={folderMision} className="mt-[30px] min-h-[474px]">
          <p className="ml-px text-[12px] font-semibold leading-[1.4] text-[var(--negro-principal)]">
            MISIÓN DE INVESTIGACIÓN
          </p>

          <h2 className="font-display mt-[18px] text-[36px] font-extrabold leading-[1.12] text-[var(--negro-principal)]">
            Investiga.
            <br />
            Compara.
            <br />
            Cuestiona.
          </h2>

          <p className="mt-[17px] text-[16px] leading-[1.4] text-[var(--negro-principal)]">
            Examina dos expedientes, identifica qué cuerpos fueron
            considerados y descubre qué perspectiva se convirtió en
            estándar.
          </p>

          <p className="mt-[27px] text-[12px] font-semibold leading-[1.4] text-[var(--negro-principal)]">
            3 INTENTOS POR PREGUNTA
          </p>
          <p className="mt-[13px] text-[13px] leading-[1.4] text-[var(--negro-principal)]">
            Solo avanzas al acertar. Si agotas los intentos, puedes salir
            sin completar el reto.
          </p>
        </FolderCard>

        <ActionButton className="mt-[37px]" onClick={onOpenExpediente}>
          Abrir el expediente&nbsp; →
        </ActionButton>
      </div>
    </ScreenShell>
  );
}
