import ScreenShell from "../../components/ScreenShell";
import { BotonReto4 } from "./01_Introduccion";
import ojo from "../../assets/eye-icon.svg";
import agachar from "../../assets/n4-agachar.png";
import { TITULO_EXPEDIENTE, marcador, obstaculo } from "../../data/reto4";

/**
 * Se llega aquí al chocar. La escena de la colisión cuenta qué barrera la
 * detuvo y qué costaba en la carrera de Brandt: ésa es la lección del reto.
 */
export default function R4Derrota({ onHome, onReintentar, onMenu, partida }) {
  const barrera = partida.obstaculo ? obstaculo(partida.obstaculo.id) : null;

  return (
    <ScreenShell scroll={false}>
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

      {/* La barrera que la detuvo y lo que costaba */}
      <div className="absolute left-6 top-[102px] h-[218px] w-[364px] overflow-hidden rounded-[12px] border border-solid border-[var(--blanco-principal)]/30 bg-[var(--negro-principal)]/30">
        <p className="absolute left-[19px] top-[19px] text-[10px] leading-[1.45] text-[var(--blanco-principal)]">
          TE DETUVO
        </p>

        {/* La hoja trae dos poses: se recorta al primer fotograma. */}
        <div
          role="img"
          aria-label="Marianne Brandt, detenida."
          className="absolute bottom-0 left-[14px] h-[110px] w-[61px]"
          style={{
            backgroundImage: `url(${agachar})`,
            backgroundSize: "122px 110px",
            backgroundPosition: "0 0",
            backgroundRepeat: "no-repeat",
          }}
        />

        <p className="font-display absolute left-[92px] right-[19px] top-[44px] text-[20px] font-extrabold leading-[1.12] text-[var(--verde-principal)]">
          {barrera ? barrera.nombre : "Una barrera del taller"}
        </p>

        <p className="absolute left-[92px] right-[19px] top-[88px] text-[12px] leading-[1.4] text-[var(--blanco-principal)]">
          {barrera
            ? barrera.consecuencia
            : "Cada barrera retrasó su entrada al taller de metal."}
        </p>
      </div>

      <p className="absolute left-6 top-[352px] w-[364px] text-[11px] leading-[1.45] text-[var(--verde-principal)]">
        RECORRIDO INTERRUMPIDO
      </p>

      <h1 className="font-display absolute left-6 top-[383px] w-[364px] text-[40px] font-extrabold leading-[1.12] text-[var(--verde-principal)]">
        GAME OVER
      </h1>

      <p className="absolute left-6 top-[449px] w-[364px] text-[15px] leading-[1.45] text-[var(--blanco-principal)]">
        Una barrera te detuvo.
        <br />
        Tu lugar en el taller sigue esperándote.
      </p>

      <div className="absolute left-6 top-[533px] h-[118px] w-[364px] overflow-hidden rounded-[12px] bg-[var(--blanco-principal)] text-[var(--negro-principal)]">
        <p className="absolute left-[20px] top-[18px] text-[10px] leading-[1.45]">
          TU PUNTUACIÓN
        </p>
        <p className="font-display absolute left-[20px] top-[42px] text-[36px] font-extrabold leading-[1.12]">
          {marcador(partida.puntos)}
        </p>
        <p className="absolute left-[224px] top-[18px] text-[10px] leading-[1.45]">
          RECORRIDO
        </p>
        <p className="font-display absolute left-[224px] top-[50px] text-[25px] font-extrabold leading-[1.12]">
          {Math.round(partida.avance * 100)} %
        </p>
      </div>

      <p className="absolute left-6 top-[681px] w-[364px] text-[18px] leading-[1.45] text-[var(--blanco-principal)]">
        Vuelve a intentarlo.
        <br />
        Cada salto abre camino.
      </p>

      <div className="absolute left-6 top-[759px] w-[364px]">
        <BotonReto4 onClick={onReintentar}>REINTENTAR</BotonReto4>
      </div>

      <div className="absolute left-6 top-[835px] w-[364px]">
        <BotonReto4 secundario onClick={onMenu}>
          MENÚ
        </BotonReto4>
      </div>
    </ScreenShell>
  );
}
