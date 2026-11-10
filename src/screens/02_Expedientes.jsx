import TopBar from "../components/TopBar";
import ScreenShell from "../components/ScreenShell";
import FolderCard from "../components/FolderCard";
import ActionButton from "../components/ActionButton";
import folderA from "../assets/folder-expediente-a.svg";
import folderB from "../assets/folder-expediente-b.svg";

/**
 * "Lee ambas evidencias antes de responder": el botón de comparar sólo se
 * activa cuando se abrieron los dos expedientes. Cada carpeta entera es el
 * botón que abre su evidencia.
 */
export default function Expedientes({
  onBack,
  onHome,
  onOpenA,
  onOpenB,
  onComparar,
  leidoA,
  leidoB,
}) {
  const puedeComparar = leidoA && leidoB;

  let pendiente = null;
  if (!leidoA && !leidoB) pendiente = "Abre ambos expedientes para comparar.";
  else if (!leidoA) pendiente = "Te falta abrir el expediente A.";
  else if (!leidoB) pendiente = "Te falta abrir el expediente B.";

  return (
    <ScreenShell
      footer={
        <>
          <ActionButton disabled={!puedeComparar} onClick={onComparar}>
            Comparar las evidencias&nbsp; →
          </ActionButton>
          {pendiente && (
            <p className="absolute inset-x-0 top-full mt-2 text-center text-[11px] leading-[1.4] text-[var(--blanco-principal)]">
              {pendiente}
            </p>
          )}
        </>
      }
    >
      <TopBar onBack={onBack} onHome={onHome} />

      <div className="px-6 pt-[28px]">
        <p className="text-[11px] font-semibold leading-[1.4] text-[var(--verde-principal)]">
          01 / INVESTIGAR
        </p>

        <h1 className="font-display mt-[23px] text-[34px] font-extrabold leading-[1.12] text-[var(--verde-principal)]">
          Dos carpetas.
          <br />
          Otra perspectiva.
        </h1>

        <p className="mt-[19px] text-[15px] leading-[1.4] text-[var(--blanco-principal)]">
          Lee ambas evidencias antes de responder.
        </p>

        <FolderCard
          asset={folderA}
          onClick={onOpenA}
          label="Abrir el expediente A, El estándar"
          className="mt-[39px] min-h-[229px]"
          contentClassName="pt-[66px] pb-4"
        >
          <p className="ml-px text-[12px] font-semibold leading-[1.4] text-[var(--blanco-principal)]">
            EXPEDIENTE A
          </p>
          <h2 className="font-display mt-[17px] text-[28px] font-extrabold leading-[1.12] text-[var(--blanco-principal)]">
            El estándar
          </h2>
          <p className="mt-[17px] text-[15px] leading-[1.4] text-[var(--blanco-principal)]">
            Los criterios que definieron la norma.
          </p>
          <span className="mt-[24px] block text-[13px] font-semibold leading-[1.4] text-[var(--blanco-principal)]">
            Abrir evidencia&nbsp; ↗
          </span>
        </FolderCard>

        <FolderCard
          asset={folderB}
          onClick={onOpenB}
          label="Abrir el expediente B, Los cuerpos omitidos"
          className="mt-[19px] min-h-[229px]"
          contentClassName="pt-[66px] pb-4"
        >
          <p className="ml-px text-[12px] font-semibold leading-[1.4] text-[var(--negro-principal)]">
            EXPEDIENTE B
          </p>
          <h2 className="font-display mt-[17px] text-[27px] font-extrabold leading-[1.12] text-[var(--negro-principal)]">
            Los cuerpos omitidos
          </h2>
          <p className="mt-[18px] text-[15px] leading-[1.4] text-[var(--negro-principal)]">
            Las experiencias que quedaron fuera.
          </p>
          <span className="mt-[24px] block text-[13px] font-semibold leading-[1.4] text-[var(--negro-principal)]">
            Abrir evidencia&nbsp; ↗
          </span>
        </FolderCard>
      </div>
    </ScreenShell>
  );
}
