import TopBar from "../components/TopBar";
import ScreenShell from "../components/ScreenShell";
import ActionButton from "../components/ActionButton";
import salaExposicion from "../assets/sala-exposicion.png";

/** La pieza ya expuesta en la Sala 1, al final del recorrido. */
export default function SalaExposicion({ onHome, onBack, onVolver }) {
  return (
    <ScreenShell
      scroll={false}
      footer={<ActionButton onClick={onVolver}>Volver al archivo&nbsp; →</ActionButton>}
    >
      <img
        alt="La escultura expuesta sobre un pedestal en la sala del museo"
        src={salaExposicion}
        className="pointer-events-none absolute left-[-161px] top-0 h-[917px] w-[734px] max-w-none object-cover"
      />

      <div className="absolute inset-x-0 top-0 z-10">
        <TopBar onHome={onHome} onBack={onBack} />
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
