import TopBar from "../components/TopBar";
import ScreenShell from "../components/ScreenShell";
import FolderCard from "../components/FolderCard";
import ActionButton from "../components/ActionButton";
import folderA from "../assets/folder-comparar-a.svg";
import folderB from "../assets/folder-comparar-b.svg";

export default function Comparar({ onHome, onBack, onIrALaPregunta }) {
  return (
    <ScreenShell
      footer={<ActionButton onClick={onIrALaPregunta}>Ir a la pregunta&nbsp; →</ActionButton>}
    >
      <TopBar onHome={onHome} onBack={onBack} />

      <div className="px-6 pt-[28px]">
        <p className="text-[11px] font-semibold leading-[1.4] text-[var(--verde-principal)]">
          02 / COMPARAR
        </p>

        <h1 className="font-display mt-[23px] text-[32px] font-extrabold leading-[1.12] text-[var(--verde-principal)]">
          Mismo producto.
          <br />
          Distintas miradas.
        </h1>

        <p className="mt-[18px] text-[15px] leading-[1.4] text-[var(--blanco-principal)]">
          Analiza y compara estos dos escenarios.
        </p>

        <FolderCard
          asset={folderA}
          bleed
          className="mt-[24px] min-h-[214px]"
          contentClassName="pt-[59px] pb-3"
        >
          <p className="text-[12px] font-semibold leading-[1.4] text-[var(--negro-principal)]">
            A / EL ESTÁNDAR
          </p>
          <h2 className="font-display mt-[22px] text-[23px] font-extrabold leading-[1.12] text-[var(--negro-principal)]">
            El cuerpo como problema
          </h2>
          <p className="mt-[18px] text-[14px] leading-[1.4] text-[var(--negro-principal)]">
            La muestra masculina se toma como norma. Las experiencias de otras
            personas se interpretan como una limitación del cuerpo.
          </p>
        </FolderCard>

        <FolderCard
          asset={folderB}
          bleed
          className="mt-[20px] min-h-[226px]"
          contentClassName="pt-[59px] pb-3"
        >
          <p className="text-[12px] font-semibold leading-[1.4] text-[var(--blanco-principal)]">
            B / LOS CUERPOS OMITIDOS
          </p>
          <h2 className="font-display mt-[23px] text-[23px] font-extrabold leading-[1.12] text-[var(--blanco-principal)]">
            El diseño como problema
          </h2>
          <p className="mt-[18px] text-[14px] leading-[1.4] text-[var(--blanco-principal)]">
            Se revisan los parámetros y a quiénes representan. El fallo se
            reconoce en las decisiones de diseño, no en las personas.
          </p>
        </FolderCard>

        <p className="mt-[23px] text-[14px] font-semibold leading-[1.4] text-[var(--blanco-principal)]">
          ¿Qué cambió al ampliar la mirada?
        </p>
      </div>
    </ScreenShell>
  );
}
