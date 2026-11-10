import ScreenShell from "../../components/ScreenShell";
import ojo from "../../assets/eye-icon.svg";
import idle from "../../assets/n4-idle.png";
import { OBSTACULOS, TITULO_EXPEDIENTE } from "../../data/reto4";

/** Botón de acción del Reto 4: píldora verde de 64 px. */
export function BotonReto4({ children, onClick, secundario = false }) {
  const estilo = secundario
    ? "h-[56px] border border-solid border-[var(--blanco-principal)] text-[13px] text-[var(--blanco-principal)]"
    : "h-[64px] bg-[var(--verde-principal)] text-[16px] text-[var(--negro-principal)]";
  return (
    <button
      type="button"
      onClick={onClick}
      className={`font-display w-full rounded-[100px] font-extrabold leading-[1.12] ${estilo}`}
    >
      {children}
    </button>
  );
}

export default function R4Introduccion({ onHome, onJugar }) {
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

      <p className="absolute left-6 top-[108px] w-[364px] text-[11px] leading-[1.45] text-[var(--verde-principal)]">
        LA FRONTERA PROFESIONAL
      </p>

      <h1 className="font-display absolute left-6 top-[139px] w-[364px] text-[34px] font-extrabold leading-[1.12] text-[var(--verde-principal)]">
        El taller también
        <br />
        es tu lugar.
      </h1>

      <p className="absolute left-6 top-[239px] w-[364px] text-[16px] leading-[1.45] text-[var(--blanco-principal)]">
        Ayuda a Marianne Brandt a esquivar todos los obstáculos que le han
        puesto para poder entrar al taller de metal
      </p>

      {/* Marianne y las barreras que va a encontrar */}
      <div className="absolute left-6 top-[378px] h-[300px] w-[364px] overflow-hidden rounded-[12px] border border-solid border-[var(--blanco-principal)]/30 bg-[var(--negro-principal)]/30">
        <p className="absolute left-[19px] top-[19px] text-[10px] leading-[1.45] text-[var(--blanco-principal)]">
          LAS BARRERAS DEL TALLER
        </p>

        <img
          src={idle}
          alt="Marianne Brandt, de pie."
          className="absolute bottom-[42px] left-[19px] h-[180px] w-[100px] max-w-none object-contain"
        />

        <ul className="absolute bottom-[46px] left-[132px] right-[19px] space-y-[7px]">
          {OBSTACULOS.map((o) => (
            <li
              key={o.id}
              className="flex items-center gap-[8px] text-[11px] leading-[1.3] text-[var(--blanco-principal)]"
            >
              <span
                className={`inline-block size-[7px] shrink-0 rounded-full ${
                  o.accion === "saltar"
                    ? "bg-[var(--verde-principal)]"
                    : "bg-[var(--morado-principal)]"
                }`}
              />
              {o.nombre}
            </li>
          ))}
        </ul>

        <p className="absolute bottom-[16px] left-[19px] right-[19px] text-[10px] leading-[1.45] text-[var(--blanco-principal)] opacity-65">
          Verde: se salta · Morado: se esquiva agachándose
        </p>
      </div>

      <p className="absolute left-6 top-[711px] w-[364px] text-[14px] leading-[1.45] text-[var(--blanco-principal)]">
        Corre automáticamente.
        <br />
        Salta o esquiva para llegar al taller.
      </p>

      <div className="absolute left-6 top-[806px] w-[364px]">
        <BotonReto4 onClick={onJugar}>PLAY</BotonReto4>
      </div>

      <p className="absolute left-6 top-[887px] w-[364px] text-[10px] leading-[1.45] text-[var(--blanco-principal)]">
        MARIANNE BRANDT&nbsp; /&nbsp; BAUHAUS
      </p>
    </ScreenShell>
  );
}
