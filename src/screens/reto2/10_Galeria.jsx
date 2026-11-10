import TopBar from "../../components/TopBar";
import ScreenShell from "../../components/ScreenShell";
import ActionButton from "../../components/ActionButton";
import galeria from "../../assets/r2-galeria.png";
import { TITULO_EXPEDIENTE } from "../../data/reto2";

/** La sala 2 con los retratos y la patente ya expuestos. */
export default function R2Galeria({ onHome, onBack, onCerrar }) {
  return (
    <ScreenShell
      scroll={false}
      footer={
        <ActionButton compact onClick={onCerrar}>
          Cerrar el expediente&nbsp; →
        </ActionButton>
      }
    >
      <img
        src={galeria}
        alt="Galería con los retratos de los autores y la patente francesa expuesta."
        className="pointer-events-none absolute left-[-161px] top-0 h-[917px] w-[734px] max-w-none object-cover"
      />

      <div className="absolute inset-x-0 top-0 z-10">
        <TopBar title={TITULO_EXPEDIENTE} onHome={onHome} onBack={onBack} />
      </div>

      <div className="absolute left-[48px] top-[698px] h-[70px] w-[316px] rounded-[15px] bg-[var(--negro-principal)] text-[12px] leading-[1.4]">
        <p className="absolute left-[16px] top-[14px] w-[284px] font-semibold text-[var(--verde-principal)]">
          NOS VEMOS EN EL DEBATE
        </p>
        <p className="absolute left-[16px] top-[40px] w-[284px] text-[var(--blanco-principal)]">
          ¿Qué otras ausencias reconoces?
        </p>
      </div>
    </ScreenShell>
  );
}
