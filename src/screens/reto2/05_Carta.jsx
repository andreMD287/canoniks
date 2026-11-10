import TopBar from "../../components/TopBar";
import ScreenShell from "../../components/ScreenShell";
import ActionButton from "../../components/ActionButton";
import VisorDocumento from "../../components/VisorDocumento";
import carta from "../../assets/r2-carta-1927.png";
import { TITULO_EXPEDIENTE } from "../../data/reto2";

export default function R2Carta({ onHome, onBack, onSeguir }) {
  return (
    <ScreenShell
      footer={
        <ActionButton compact onClick={onSeguir}>
          Lee la carta&nbsp; →
        </ActionButton>
      }
    >
      <TopBar title={TITULO_EXPEDIENTE} onHome={onHome} onBack={onBack} />

      <div className="flex flex-col gap-[14px] px-6 pt-[28px]">
        <p className="text-[11px] leading-[1.4] text-[var(--verde-principal)]">
          03 / CONTRASTAR · CORRESPONDENCIA
        </p>

        <h1 className="font-display text-[30px] font-extrabold leading-[1.12] text-[var(--blanco-principal)]">
          Otro archivo
          <br />
          cambia la historia.
        </h1>

        <p className="text-[14px] leading-[1.4] text-[var(--blanco-principal)]">
          Encontramos otro archivo que desmiente la patente anterior. Consulta
          la correspondencia de 1927.
        </p>

        <VisorDocumento
          etiqueta="CARTA DE 1927 · LE CORBUSIER"
          imagen={carta}
          alt="Carta de Le Corbusier a Charlotte Perriand, de 1927."
        />
      </div>
    </ScreenShell>
  );
}
