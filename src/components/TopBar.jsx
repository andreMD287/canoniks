import arrowBack from "../assets/arrow-back.svg";
import eyeIcon from "../assets/eye-icon.svg";

/**
 * Barra superior reutilizada en todas las pantallas (412 × 66 px):
 * botón de volver (izquierda), título "EXPEDIENTE 01" centrado en la pantalla
 * y el ojo (derecha), que siempre lleva al home del archivo.
 *
 * En la pregunta, el botón de la izquierda es una "×" (closeIcon) que
 * intenta salir del reto.
 */
export default function TopBar({
  title = "EXPEDIENTE 01",
  onBack,
  onHome,
  closeIcon = false,
}) {
  return (
    <div className="relative h-[66px]">
      <button
        type="button"
        onClick={onBack}
        aria-label={closeIcon ? "Intentar salir" : "Volver"}
        className={`absolute left-6 top-[26px] flex size-10 items-center justify-center bg-[var(--verde-principal)] ${
          closeIcon ? "rounded-[9px]" : "rounded-[7.972px]"
        }`}
      >
        {closeIcon ? (
          <span className="text-[27px] font-normal leading-none text-[var(--negro-principal)]">×</span>
        ) : (
          <img src={arrowBack} alt="" className="size-5" />
        )}
      </button>

      <p className="font-display absolute left-1/2 top-[36px] w-[246px] -translate-x-1/2 text-center text-[13px] font-extrabold leading-[1.12] text-[var(--blanco-principal)]">
        {title}
      </p>

      <button
        type="button"
        onClick={onHome}
        aria-label="Ir al archivo"
        className="absolute right-6 top-[27px] block h-10 w-12 transition-transform duration-300 ease-out hover:scale-110"
      >
        <img src={eyeIcon} alt="" className="block size-full max-w-none" />
      </button>
    </div>
  );
}
