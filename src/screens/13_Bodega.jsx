import TopBar from "../components/TopBar";
import ScreenShell from "../components/ScreenShell";
import ActionButton from "../components/ActionButton";
import auricularVr from "../assets/auricular-vr.png";
import estrellaBodega from "../assets/estrella-bodega.svg";

/**
 * Se desbloquea al acertar la pregunta. "Confirmar hallazgo" entra a la
 * bodega, donde hay que localizar la pieza.
 */
export default function Bodega({ onHome, onBack, onEntrarALaBodega }) {
  return (
    <ScreenShell
      background="bg-[var(--negro-bodega)]"
      footer={
        <ActionButton onClick={onEntrarALaBodega}>Confirmar hallazgo&nbsp; →</ActionButton>
      }
    >
      <TopBar onHome={onHome} onBack={onBack} />

      <div className="px-6 pt-[28px]">
        <p className="text-[11px] font-semibold leading-[1.4] text-[var(--verde-principal)]">
          04 / BUSCAR · BODEGA DESBLOQUEADA
        </p>

        <h1 className="font-display mt-[23px] text-[38px] font-extrabold leading-[1.12] text-[var(--verde-principal)]">
          Encuentra
          <br />
          la escultura.
        </h1>

        <p className="mt-[14px] text-[15px] leading-[1.4] text-[var(--blanco-principal)]">
          Explora la bodega y localiza la pieza para la sala «El conocimiento
          desde una sola mirada».
        </p>
      </div>

      {/* Tarjeta de instrucción (posición del diseño) */}
      <div className="absolute left-6 top-[705px] h-[66px] w-[364px] rounded-[14px] bg-[var(--blanco-principal)] px-[16px] pt-[11px] text-[var(--negro-principal)]">
        <p className="text-[15px] font-semibold leading-[1.4]">¿Ya la encontraste?</p>
        <p className="mt-[5px] text-[12px] leading-[1.4]">
          Confirma el hallazgo para cerrar el expediente.
        </p>
      </div>

      {/* Estrella morada girada (misma construcción que el diseño) */}
      <div
        className="pointer-events-none absolute inset-[0_-64.08%_-6.39%_-72.09%] flex items-center justify-center"
        style={{ containerType: "size" }}
      >
        <div className="h-[hypot(-56.5649cqw,42.512cqh)] w-[hypot(43.4351cqw,57.488cqh)] flex-none rotate-53">
          <div className="relative size-full">
            <img alt="" src={estrellaBodega} className="absolute inset-0 block size-full max-w-none" />
          </div>
        </div>
      </div>

      <img
        alt="Auricular de realidad virtual sobre una estrella morada"
        src={auricularVr}
        className="pointer-events-none absolute left-[-51px] top-[285px] h-[430.836px] w-[462.882px] max-w-none object-cover"
      />
    </ScreenShell>
  );
}
