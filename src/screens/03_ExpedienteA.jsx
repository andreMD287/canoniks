import TopBar from "../components/TopBar";
import ScreenShell from "../components/ScreenShell";
import FolderCard from "../components/FolderCard";
import ActionButton from "../components/ActionButton";
import DatoCard from "../components/DatoCard";
import folderA1de2 from "../assets/folder-expediente-a-1de2.svg";
import tablaAntropometrica from "../assets/tabla-antropometrica.png";

export default function ExpedienteA({ onHome, onBack, onLeerExpedienteB }) {
  return (
    <ScreenShell>
      <TopBar onHome={onHome} onBack={onBack} />

      <div className="px-6 pt-[28px]">
        <p className="text-[11px] font-semibold leading-[1.4] text-[var(--verde-principal)]">
          01 / EVIDENCIA A
        </p>

        <h1 className="font-display mt-[23px] text-[38px] font-extrabold leading-[1.12] text-[var(--verde-principal)]">
          El estándar
        </h1>

        <p className="mt-[12px] text-[15px] leading-[1.4] text-[var(--blanco-principal)]">
          ¿A quién se tomó como referencia?
        </p>

        <FolderCard
          asset={folderA1de2}
          className="mt-[6px] min-h-[536px]"
          contentClassName="pt-[57px] pb-8"
        >
          <p className="ml-px text-[12px] font-semibold leading-[1.4] text-[var(--negro-principal)]">
            EXPEDIENTE A · 1 DE 2
          </p>

          {/* En el diseño la imagen (316 × 240) arranca 6 px a la izquierda del
              texto. */}
          <div className="relative -ml-[6px] mt-[5px] h-[240px] w-[316px] overflow-hidden rounded-[12px]">
            <img
              src={tablaAntropometrica}
              alt="Tabla antropométrica original, Henry Dreyfuss, The Measure of Man (1960)."
              className="size-full object-cover"
            />
          </div>
          <p className="ml-[33px] w-[316px] text-[11px] leading-[1.4] text-[var(--negro-principal)]">
            Henry Dreyfuss, The Measure of Man (1960).
          </p>

          <h2 className="font-display mt-[5px] text-[23px] font-extrabold leading-[1.12] text-[var(--negro-principal)]">
            Una medida para todos
          </h2>

          <p className="mt-[13px] text-[16px] leading-[1.4] text-[var(--negro-principal)]">
            Tomar el cuerpo masculino como norma universal convirtió una
            perspectiva particular en un estándar para todas las personas.
          </p>

          <p className="mt-[14px] text-[12px] font-semibold leading-[1.4] text-[var(--negro-principal)]">
            OBSERVA · ¿Qué cuerpos no están aquí?
          </p>
        </FolderCard>

        {/* Texto suelto del Figma: puente entre la norma y el caso de la realidad virtual. */}
        <DatoCard etiqueta="DATO · LA NORMA LLEGÓ A LA REALIDAD VIRTUAL" className="mt-5">
          <p>
            Dispositivos como el Meta Quest 2 implementaron en su interfaz
            digital únicamente 3 ajustes fijos de distancia ocular (IPD) en el
            software (58 mm, 63 mm y 68 mm). La mediana de la IPD masculina se
            ajusta con precisión a estos rangos.
          </p>
        </DatoCard>

        <ActionButton className="mt-8" onClick={onLeerExpedienteB}>
          Leer el expediente B&nbsp; →
        </ActionButton>
      </div>
    </ScreenShell>
  );
}
