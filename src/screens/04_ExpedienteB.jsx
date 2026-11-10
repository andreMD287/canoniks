import TopBar from "../components/TopBar";
import ScreenShell from "../components/ScreenShell";
import FolderCard from "../components/FolderCard";
import ActionButton from "../components/ActionButton";
import DatoCard from "../components/DatoCard";
import folderB2de2 from "../assets/folder-expediente-b-2de2.svg";

/**
 * `puedeComparar` es falso si el visitante llegó directo al expediente B sin
 * haber abierto el A: primero hay que leer ambas evidencias.
 */
export default function ExpedienteB({ onBack, onComparar, puedeComparar = true }) {
  return (
    <ScreenShell>
      <TopBar onBack={onBack} />

      <div className="px-6 pt-[28px]">
        <p className="text-[11px] font-semibold leading-[1.4] text-[var(--verde-principal)]">
          01 / EVIDENCIA B
        </p>

        <h1 className="font-display mt-[23px] text-[38px] font-extrabold leading-[1.12] text-[var(--verde-principal)]">
          Los cuerpos
          <br />
          omitidos
        </h1>

        <FolderCard asset={folderB2de2} className="mt-[33px] min-h-[520px]">
          <p className="ml-px text-[12px] font-semibold leading-[1.4] text-[var(--blanco-principal)]">
            EXPEDIENTE B · 2 DE 2
          </p>

          <h2 className="font-display mt-[24px] text-[31px] font-extrabold leading-[1.12] text-[var(--blanco-principal)]">
            No era el cuerpo.
            <br />
            Era el diseño.
          </h2>

          <p className="mt-[25px] text-[16px] leading-[1.4] text-[var(--blanco-principal)]">
            Las investigaciones iniciales atribuyeron el mareo en realidad
            virtual a una supuesta «vulnerabilidad o imperfección de la
            mujer».
          </p>

          <div className="mt-[37px] min-h-[158px] rounded-[14px] bg-[var(--blanco-principal)] p-[18px] text-[var(--negro-principal)]">
            <p className="text-[11px] font-semibold leading-[1.4]">CAMBIA LA MIRADA</p>
            <p className="mt-[15px] text-[14px] leading-[1.4]">
              Las interfaces físicas y el software tomaban el cuerpo
              masculino como norma universal. El problema estaba en esas
              decisiones de diseño.
            </p>
          </div>
        </FolderCard>

        {/* Texto suelto del Figma: el dato que contradice la "imperfección" de la mujer. */}
        <DatoCard etiqueta="DATO · LO QUE MUESTRAN LAS MEDIDAS" className="mt-5">
          <p>
            Sin embargo, un porcentaje masivo de la población femenina posee
            una IPD inferior a 58 mm o intermedia entre las escalas (Doty et
            al., 2023).
          </p>
          <p>
            El efecto en la UI/UX espacial: al estar las cámaras virtuales y la
            interfaz digital calibradas bajo la plantilla óptica masculina, la
            perspectiva renderizada en pantalla genera una desalineación
            milimétrica constante en los ojos de la mayoría de las usuarias.
          </p>
        </DatoCard>

        <ActionButton className="mt-8" disabled={!puedeComparar} onClick={onComparar}>
          Comparar las evidencias&nbsp; →
        </ActionButton>
        {!puedeComparar && (
          <p className="mt-2 text-center text-[11px] leading-[1.4] text-[var(--blanco-principal)]">
            Lee también el expediente A para poder comparar.
          </p>
        )}
      </div>
    </ScreenShell>
  );
}
