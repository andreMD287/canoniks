import TopBar from "../../components/TopBar";
import ScreenShell from "../../components/ScreenShell";
import ActionButton from "../../components/ActionButton";
import VisorDocumento from "../../components/VisorDocumento";
import patente from "../../assets/r2-patente.png";
import { TITULO_EXPEDIENTE } from "../../data/reto2";

export default function R2Patente({ onHome, onBack, onSeguir }) {
  return (
    <ScreenShell
      footer={
        <ActionButton compact onClick={onSeguir}>
          Analiza y lee la patente&nbsp; →
        </ActionButton>
      }
    >
      <TopBar title={TITULO_EXPEDIENTE} onHome={onHome} onBack={onBack} />

      <div className="flex flex-col gap-[14px] px-6 pt-[28px]">
        <p className="text-[11px] leading-[1.4] text-[var(--verde-principal)]">
          01 / EXAMINAR · NUEVO ARCHIVO
        </p>

        <h1 className="font-display text-[30px] font-extrabold leading-[1.12] text-[var(--blanco-principal)]">
          Un nuevo archivo
          <br />
          ha llegado.
        </h1>

        <p className="text-[14px] leading-[1.4] text-[var(--blanco-principal)]">
          Al Museo de las Ausencias llegó un nuevo archivo: es una patente
          francesa de 1928.
        </p>

        <VisorDocumento
          etiqueta="PATENTE N.º 672.820"
          imagen={patente}
          alt="Patente francesa número 672.820, de 1928."
        />
      </div>
    </ScreenShell>
  );
}
