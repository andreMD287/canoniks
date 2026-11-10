import TopBar from "../components/TopBar";
import ScreenShell from "../components/ScreenShell";
import FolderCard from "../components/FolderCard";
import ActionButton from "../components/ActionButton";
import folderSinIntentos from "../assets/folder-sin-intentos.svg";

/**
 * Se llega aquí al fallar el tercer intento. No hay desbloqueo ni recompensa:
 * la única salida es volver al archivo (el reto no queda completado).
 */
export default function SinIntentos({ onHome, onSalir }) {
  return (
    <ScreenShell
      footer={
        <>
          <ActionButton onClick={onSalir}>Salir al archivo&nbsp; →</ActionButton>
          <p className="absolute inset-x-0 top-full mt-2 text-center text-[11px] leading-[1.4] text-[var(--blanco-principal)]">
            Sin desbloqueo ni recompensa.
          </p>
        </>
      }
    >
      <TopBar onHome={onHome} onBack={onSalir} />

      <div className="px-6 pt-[28px]">
        <p className="text-[11px] font-semibold leading-[1.4] text-[var(--verde-principal)]">
          03 / RESOLVER · INTENTOS AGOTADOS
        </p>

        <h1 className="font-display mt-[29px] text-[40px] font-extrabold leading-[1.12] text-[var(--verde-principal)]">
          Este intento
          <br />
          terminó.
        </h1>

        <FolderCard
          asset={folderSinIntentos}
          bleed
          className="mt-[39px] min-h-[454px]"
          contentClassName="pt-[59px] pb-8"
        >
          <p className="text-[12px] font-semibold leading-[1.4] text-[var(--blanco-principal)]">
            0 DE 3 INTENTOS DISPONIBLES
          </p>

          <h2 className="font-display mt-[35px] text-[30px] font-extrabold leading-[1.12] text-[var(--blanco-principal)]">
            La investigación
            <br />
            puede continuar.
          </h2>

          <p className="mt-[37px] text-[16px] leading-[1.4] text-[var(--blanco-principal)]">
            Has agotado los tres intentos de esta pregunta. Puedes salir, pero
            el reto no se marcará como completado.
          </p>

          <div className="mt-[60px] min-h-[73px] rounded-[13px] bg-[var(--blanco-principal)] px-[16px] pt-[15px] pb-[14px] text-[var(--negro-principal)]">
            <p className="text-[12px] font-semibold leading-[1.4]">EXPEDIENTE PENDIENTE</p>
            <p className="mt-[7px] text-[13px] leading-[1.4]">La bodega sigue bloqueada.</p>
          </div>
        </FolderCard>
      </div>
    </ScreenShell>
  );
}
