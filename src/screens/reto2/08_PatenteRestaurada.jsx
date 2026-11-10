import TopBar from "../../components/TopBar";
import ScreenShell from "../../components/ScreenShell";
import ActionButton from "../../components/ActionButton";
import VisorDocumento from "../../components/VisorDocumento";
import patente from "../../assets/r2-patente.png";
import { NOMBRE_RESTITUIDO, TITULO_EXPEDIENTE } from "../../data/reto2";

export default function R2PatenteRestaurada({ onHome, onBack, onSeguir }) {
  return (
    <ScreenShell
      footer={
        <ActionButton compact onClick={onSeguir}>
          Descubre qué pasó después&nbsp; →
        </ActionButton>
      }
    >
      <TopBar title={TITULO_EXPEDIENTE} onHome={onHome} onBack={onBack} />

      <div className="flex flex-col gap-[14px] px-6 pt-[28px]">
        <p className="text-[11px] leading-[1.4] text-[var(--verde-principal)]">
          05 / RESTAURAR · RECONOCIMIENTO
        </p>

        <h1 className="font-display text-[30px] font-extrabold leading-[1.12] text-[var(--blanco-principal)]">
          La firma vuelve
          <br />
          a su lugar.
        </h1>

        <p className="text-[14px] leading-[1.4] text-[var(--blanco-principal)]">
          Patente restaurada con el nombre de Charlotte Perriand visible.
        </p>

        <VisorDocumento
          etiqueta="PATENTE N.º 672.820 · RESTAURADA"
          imagen={patente}
          alt="Patente francesa restaurada con la firma de Charlotte Perriand."
          firma={NOMBRE_RESTITUIDO.toUpperCase()}
        />

        <p className="text-[11px] leading-[1.4] text-[var(--blanco-principal)]">
          Restitución simbólica: no modifica el documento original.
        </p>
      </div>
    </ScreenShell>
  );
}
