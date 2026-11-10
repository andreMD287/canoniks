import ScreenShell from "../../components/ScreenShell";
import { BotonReto4 } from "./01_Introduccion";
import ojo from "../../assets/eye-icon.svg";
import idle from "../../assets/n4-idle.png";
import { TITULO_EXPEDIENTE, marcador } from "../../data/reto4";

export default function R4Victoria({ onHome, onContinuar, partida }) {
  return (
    <ScreenShell scroll={false} background="bg-[var(--negro-principal)]">
      <p className="font-display absolute left-6 top-[40px] w-[280px] text-[13px] font-extrabold leading-[1.12] text-[var(--blanco-principal)]">
        {TITULO_EXPEDIENTE}
      </p>

      <button
        type="button"
        onClick={onHome}
        aria-label="Ir al archivo"
        className="absolute right-6 top-[28px] block h-10 w-12 transition-transform duration-300 ease-out hover:scale-110"
      >
        <img src={ojo} alt="" className="block size-full max-w-none" />
      </button>

      {/* Marianne entrando al taller de metal */}
      <div className="absolute left-6 top-[102px] h-[218px] w-[364px] overflow-hidden rounded-[12px] border border-solid border-[var(--blanco-principal)]/30">
        <p className="absolute left-[19px] top-[19px] text-[10px] leading-[1.45] text-[var(--blanco-principal)]">
          ENTRADA AL TALLER
        </p>

        {/* la puerta, ya abierta */}
        <div className="absolute bottom-0 right-[40px] h-[150px] w-[108px] bg-[var(--verde-principal)]">
          <p className="font-display absolute inset-x-0 top-[48px] text-center text-[11px] font-extrabold leading-[1.3] text-[var(--negro-principal)]">
            TALLER
            <br />
            DE METAL
          </p>
        </div>

        <img
          src={idle}
          alt="Marianne Brandt entrando al taller de metal."
          className="absolute bottom-0 left-[56px] h-[150px] w-[83px] max-w-none object-contain"
        />

        <div className="absolute inset-x-0 bottom-0 h-[2px] bg-[var(--verde-principal)]" />
      </div>

      <div className="absolute left-6 top-[352px] h-[338px] w-[364px] overflow-hidden rounded-[16px] bg-[var(--verde-principal)] text-[var(--negro-principal)]">
        <p className="absolute left-[24px] top-[25px] w-[316px] text-[11px] leading-[1.45]">
          RETO 04 / COMPLETADO
        </p>

        <h1 className="font-display absolute left-[24px] top-[65px] w-[316px] text-[32px] font-extrabold leading-[1.12]">
          ¡El taller
          <br />
          también es tuyo!
        </h1>

        <p className="absolute left-[24px] top-[164px] w-[316px] text-[15px] leading-[1.45]">
          Marianne ha superado las barreras
          <br />
          y ha entrado al taller de metal.
        </p>

        <div className="absolute left-[24px] top-[224px] h-px w-[316px] bg-[var(--negro-principal)] opacity-20" />

        <p className="absolute left-[24px] top-[247px] w-[190px] text-[10px] leading-[1.45]">
          PUNTUACIÓN FINAL
        </p>
        <p className="font-display absolute left-[24px] top-[274px] w-[190px] text-[36px] font-extrabold leading-[1.12]">
          {marcador(partida.puntos)}
        </p>

        <p className="absolute left-[222px] top-[247px] w-[118px] text-[10px] leading-[1.45]">
          RECORRIDO
        </p>
        <p className="font-display absolute left-[222px] top-[282px] w-[118px] text-[24px] font-extrabold leading-[1.12]">
          {Math.round(partida.avance * 100)} %
        </p>
      </div>

      <p className="absolute left-1/2 top-[716px] w-[305px] -translate-x-1/2 text-center text-[20px] leading-[1.45] text-[var(--blanco-principal)]">
        La capacidad no tiene género.
        <br />
        El acceso tampoco debería tenerlo.
      </p>

      <div className="absolute left-6 top-[830px] w-[364px]">
        <BotonReto4 onClick={onContinuar}>CONTINUAR</BotonReto4>
      </div>
    </ScreenShell>
  );
}
