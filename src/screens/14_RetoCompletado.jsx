import TopBar from "../components/TopBar";
import ScreenShell from "../components/ScreenShell";
import ActionButton from "../components/ActionButton";
import folderCompletado from "../assets/folder-completado.svg";
import estrellaCompletado from "../assets/estrella-completado.svg";
import auricularVr from "../assets/auricular-vr.png";

export default function RetoCompletado({ onBack, onVerLaSala }) {
  return (
    <ScreenShell
      footer={<ActionButton onClick={onVerLaSala}>Ver la SALA 1&nbsp; →</ActionButton>}
    >
      <TopBar onBack={onBack} />

      <div className="px-6 pt-[28px]">
        <p className="text-[11px] font-semibold leading-[1.4] text-[var(--verde-principal)]">
          05 / COMPLETAR · CASO RESUELTO
        </p>

        <h1 className="font-display mt-[29px] text-[43px] font-extrabold leading-[1.12] text-[var(--verde-principal)]">
          Una ausencia
          <br />
          menos.
        </h1>
      </div>

      {/* El recorte (overflow) evita que la estrella amplíe la zona de scroll */}
      <div className="relative -mt-[17px] h-[571px] w-full overflow-hidden">
        <div className="absolute left-6 top-0 h-[528px] w-[364px]">
          <img
            alt=""
            src={folderCompletado}
            className="absolute left-0 top-0 block h-[571px] w-[364px] max-w-none"
          />

          <p className="absolute left-[24px] top-[59px] w-[316px] text-[12px] font-semibold leading-[1.4] text-[var(--negro-principal)]">
            RETO 01 / COMPLETADO
          </p>
          <p className="font-display absolute left-[24px] top-[76px] w-[316px] text-[64px] font-extrabold leading-[1.12] text-[var(--negro-principal)]">
            01 / 01
          </p>

          {/* Estrella morada girada (misma construcción que el diseño) */}
          <div
            className="pointer-events-none absolute inset-[-10.04%_-63.19%_-46.63%_-63.46%] flex items-center justify-center"
            style={{ containerType: "size" }}
          >
            <div className="h-[hypot(-56.5649cqw,42.512cqh)] w-[hypot(43.4351cqw,57.488cqh)] flex-none rotate-53">
              <div className="relative size-full">
                <img
                  alt=""
                  src={estrellaCompletado}
                  className="absolute inset-0 block size-full max-w-none"
                />
              </div>
            </div>
          </div>
          <img
            alt="Auricular de realidad virtual sobre una estrella morada"
            src={auricularVr}
            className="pointer-events-none absolute left-[-15px] top-[178px] h-[365.303px] w-[392.475px] max-w-none object-cover"
          />

          <h2 className="font-display absolute left-[28px] top-[142px] w-[316px] text-[25px] font-extrabold leading-[1.12] text-[var(--negro-principal)]">
            Expediente resuelto
          </h2>

          <div className="absolute left-[23px] top-[173px] h-[70px] w-[316px] rounded-[14px] bg-[var(--blanco-principal)]">
            <p className="absolute left-[10px] top-[9px] w-[296px] text-[14px] leading-[1.23] text-[var(--negro-principal)]">
              ¡Gracias, visitante! Ayudaste a completar la exposición de la
              escultura del modelo igualitario en el diseño.
            </p>
          </div>

          <div className="absolute left-[24px] top-[503px] flex h-[48px] w-[316px] items-center justify-center rounded-[15px] bg-[var(--negro-principal)]">
            <p className="w-[284px] text-center text-[12px] font-semibold leading-[1.4] text-[var(--verde-principal)]">
              AHORA LLEVÉMOSLAS A LA EXPOSICIÓN
            </p>
          </div>
        </div>
      </div>
    </ScreenShell>
  );
}
