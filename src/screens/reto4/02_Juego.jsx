import { useEffect, useRef, useState } from "react";
import ScreenShell from "../../components/ScreenShell";
import { ALTO, ANCHO, crearCorredor } from "../../juego/corredor";
import correrPng from "../../assets/n4-correr.png";
import saltarPng from "../../assets/n4-saltar.png";
import agacharPng from "../../assets/n4-agachar.png";
import { META, OBSTACULOS, marcador } from "../../data/reto4";

const cargar = (src) =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });

/** Botón grande de control táctil (174 × 80). */
function Control({ direccion, etiqueta, onPulsar, onSoltar }) {
  return (
    <button
      type="button"
      aria-label={etiqueta}
      onPointerDown={(e) => {
        e.preventDefault();
        onPulsar();
      }}
      onPointerUp={onSoltar}
      onPointerLeave={onSoltar}
      onPointerCancel={onSoltar}
      className="font-display flex h-[80px] w-[174px] select-none flex-col items-center justify-center gap-[4px] rounded-[20px] bg-[var(--verde-principal)] font-extrabold leading-[1.12] text-[var(--negro-principal)] active:scale-[0.97]"
    >
      <span className="text-[23px]">{direccion}</span>
      <span className="text-[13px]">{etiqueta}</span>
    </button>
  );
}

export default function R4Juego({ onMenu, onFin }) {
  const lienzo = useRef(null);
  const motor = useRef(null);
  const [hud, setHud] = useState({ puntos: 0, avance: 0 });
  const [cargando, setCargando] = useState(true);

  // en un ref para que un re-render no reinicie la partida
  const avisarFin = useRef(onFin);
  useEffect(() => {
    avisarFin.current = onFin;
  });

  useEffect(() => {
    let vivo = true;

    Promise.all([cargar(correrPng), cargar(saltarPng), cargar(agacharPng)])
      .then(([correr, saltar, agachar]) => {
        if (!vivo || !lienzo.current) return;
        setCargando(false);
        motor.current = crearCorredor({
          canvas: lienzo.current,
          sprites: { correr, saltar, agachar },
          obstaculos: OBSTACULOS,
          meta: META,
          onCambio: setHud,
          onFin: (resultado) => avisarFin.current(resultado),
        });
        motor.current.arrancar();
        if (import.meta.env.DEV) window.__corredor = motor.current;
      })
      .catch(() => setCargando(false));

    return () => {
      vivo = false;
      motor.current?.parar();
    };
  }, []);

  // teclado, para jugar en el escritorio
  useEffect(() => {
    const abajo = (e) => {
      if (e.code === "Space" || e.code === "ArrowUp" || e.code === "KeyW") {
        e.preventDefault();
        motor.current?.saltar();
      }
      if (e.code === "ArrowDown" || e.code === "KeyS") {
        e.preventDefault();
        motor.current?.agachar(true);
      }
    };
    const arriba = (e) => {
      if (e.code === "ArrowDown" || e.code === "KeyS") motor.current?.agachar(false);
    };
    window.addEventListener("keydown", abajo);
    window.addEventListener("keyup", arriba);
    return () => {
      window.removeEventListener("keydown", abajo);
      window.removeEventListener("keyup", arriba);
    };
  }, []);

  const porcentaje = Math.round(hud.avance * 100);

  return (
    <ScreenShell scroll={false}>
      <p className="font-display absolute left-6 top-[34px] w-[248px] text-[12px] font-extrabold leading-[1.12] text-[var(--blanco-principal)]">
        RETO 04 · EN JUEGO
      </p>

      <button
        type="button"
        onClick={onMenu}
        className="font-display absolute left-[300px] top-[22px] h-[44px] w-[88px] rounded-[100px] border border-solid border-[var(--blanco-principal)] text-[12px] font-extrabold leading-[1.12] text-[var(--blanco-principal)]"
      >
        MENÚ
      </button>

      {/* Marcador */}
      <div className="absolute left-6 top-[88px] h-[55px] w-[364px]">
        <p className="absolute left-0 top-0 text-[10px] leading-[1.45] text-[var(--blanco-principal)]">
          PUNTOS
        </p>
        <p className="font-display absolute left-0 top-[18px] text-[30px] font-extrabold leading-[1.12] text-[var(--verde-principal)]">
          {marcador(hud.puntos)}
        </p>
        <p className="absolute right-0 top-[10px] text-right text-[11px] leading-[1.45] text-[var(--blanco-principal)]">
          TALLER
          <br />
          DE METAL
        </p>
      </div>

      {/* Recorrido */}
      <div className="absolute left-6 top-[163px] h-[36px] w-[364px]">
        <div className="absolute left-0 top-0 h-[4px] w-[364px] rounded-[2px] bg-[var(--blanco-principal)] opacity-20" />
        <div
          className="absolute left-0 top-0 h-[4px] rounded-[2px] bg-[var(--verde-principal)] transition-[width] duration-100 ease-linear"
          style={{ width: Math.max(6, hud.avance * 364) }}
        />
        <p className="absolute left-0 top-[13px] text-[10px] leading-[1.45] text-[var(--blanco-principal)]">
          SALIDA
        </p>
        <p className="absolute right-0 top-[13px] text-right text-[10px] leading-[1.45] text-[var(--verde-principal)]">
          {porcentaje} %
        </p>
      </div>

      <p className="absolute left-6 top-[185px] w-[364px] text-center text-[20px] leading-[1.45] text-[var(--blanco-principal)]">
        Llega al taller sin chocar.
      </p>

      {/* Área de juego */}
      <div
        className="absolute left-0 top-[220px] overflow-hidden border border-dashed border-[var(--blanco-principal)]/40"
        style={{ width: ANCHO, height: ALTO }}
      >
        <canvas ref={lienzo} className="block" />
        {cargando && (
          <p className="absolute inset-0 flex items-center justify-center text-[12px] text-[var(--blanco-principal)]">
            Preparando el taller…
          </p>
        )}
      </div>

      <p className="absolute left-6 top-[718px] w-[364px] text-center text-[20px] leading-[1.45] text-[var(--blanco-principal)]">
        TOCA LOS CONTROLES PARA MOVERTE
      </p>

      <div className="absolute left-6 top-[777px] flex w-[364px] justify-between">
        <Control
          direccion="↑"
          etiqueta="SALTAR"
          onPulsar={() => motor.current?.saltar()}
          onSoltar={() => {}}
        />
        <Control
          direccion="↓"
          etiqueta="ESQUIVAR"
          onPulsar={() => motor.current?.agachar(true)}
          onSoltar={() => motor.current?.agachar(false)}
        />
      </div>
    </ScreenShell>
  );
}
