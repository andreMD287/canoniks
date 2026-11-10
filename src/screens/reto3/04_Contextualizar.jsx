import TopBar from "../../components/TopBar";
import ScreenShell from "../../components/ScreenShell";
import ActionButton from "../../components/ActionButton";
import { TITULO_EXPEDIENTE } from "../../data/reto3";

export default function R3Contextualizar({ onHome, onBack, onJugar }) {
  return (
    <ScreenShell
      footer={
        <ActionButton compact onClick={onJugar}>
          JUGAR&nbsp; →
        </ActionButton>
      }
    >
      <TopBar title={TITULO_EXPEDIENTE} onHome={onHome} onBack={onBack} />

      <div className="px-6 pt-[28px]">
        <p className="text-[11px] leading-[1.4] text-[var(--verde-principal)]">
          04 / CONTEXTUALIZAR · LA BAUHAUS
        </p>

        <h1 className="font-display mt-[21px] text-[30px] font-extrabold leading-[1.12] text-[var(--verde-principal)]">
          Una escuela.
          <br />
          Distintas puertas.
        </h1>

        <p className="mt-[24px] text-[14px] leading-[1.4] text-[var(--blanco-principal)]">
          Ahora identifica cómo una distribución de actividades terminó
          asociándose con una jerarquía de valor.
        </p>

        {/* Pestaña del expediente: asoma por detrás de la carpeta */}
        <div className="relative mt-[36px]">
          <div className="absolute left-[212px] top-0 h-[56px] w-[152px] rounded-[18px] bg-[var(--verde-principal)]" />
          <div className="relative mt-[28px] min-h-[418px] w-full overflow-hidden rounded-[16px] bg-[var(--verde-principal)] px-[24px] pt-[28px]">
            <p className="text-[10px] leading-[1.4] text-[var(--negro-principal)]">
              ARCHIVO / EL ACCESO A LOS TALLERES
            </p>

            <p className="mt-[26px] text-[18px] leading-[1.4] text-[var(--negro-principal)]">
              Walter Gropius envió a las mujeres directamente al Taller de
              Tejido (Weberei) o al de cerámica, reservando los talleres de
              metal, madera y arquitectura para los varones.
            </p>

            <div className="mt-[36px] flex h-[100px] w-full items-center overflow-hidden rounded-[10px] bg-[var(--negro-principal)] px-[16px]">
              <p className="font-display text-[20px] font-extrabold leading-[1.12] text-[var(--verde-principal)]">
                Ponte en los zapatos
                <br />
                de Walter Gropius.
              </p>
            </div>
          </div>
        </div>
      </div>
    </ScreenShell>
  );
}
