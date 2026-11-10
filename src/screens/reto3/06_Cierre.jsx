import TopBar from "../../components/TopBar";
import ScreenShell from "../../components/ScreenShell";
import ActionButton from "../../components/ActionButton";
import galeria from "../../assets/r3-galeria.png";
import { TITULO_EXPEDIENTE } from "../../data/reto3";

/** La sala 3 con las piezas y sus autoras ya expuestas. */
export default function R3Cierre({ onHome, onBack, onVolver }) {
  return (
    <ScreenShell
      scroll={false}
      footer={<ActionButton onClick={onVolver}>Volver al archivo&nbsp; →</ActionButton>}
    >
      <img
        src={galeria}
        alt="Galería con los retratos de las autoras y sus textiles expuestos."
        className="pointer-events-none absolute left-[-122px] top-0 h-[917px] w-[655px] max-w-none object-cover"
      />

      <div className="absolute inset-x-0 top-0 z-10">
        <TopBar title={TITULO_EXPEDIENTE} onHome={onHome} onBack={onBack} />
      </div>

      <p className="absolute left-6 top-[94px] text-[11px] leading-[1.4] text-[var(--verde-principal)]">
        05 / RECONSTRUIR · EL REPARTO
      </p>

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
