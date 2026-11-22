import { useState } from "react";
import ScreenShell from "../components/ScreenShell";
import flecha from "../assets/menu-flecha.svg";
import ojo from "../assets/menu-ojo.svg";
import alaIzq from "../assets/menu-ala-izq.svg";
import alaDer from "../assets/menu-ala-der.svg";
import ojoGrande from "../assets/menu-ojo-grande.svg";

/**
 * El home del archivo: una sala por pantalla. Las alas verdes de los lados
 * cambian de sala y el indicador de abajo entra al expediente.
 *
 * `fondo` es la foto de la sala ({ src, left, ancho }, tal como la coloca el
 * diseño). `ilustracion` es opcional y se pinta encima por si una sala aún no
 * tiene foto.
 */
export default function Menu({
  sala,
  titulo,
  descripcion,
  fondo,
  imagenCompleta,
  sinSiguiente = false,
  sinEntrada = false,
  ilustracion,
  // la Sala 3 lleva la descripción algo más estrecha y más abajo
  descripcionAncho = 354,
  descripcionTop = 599.5,
  disponible = true,
  onBack,
  onSalaAnterior,
  onSalaSiguiente,
  onEntrar,
}) {
  const [aviso, setAviso] = useState(false);

  const entrar = () => {
    if (disponible) {
      onEntrar();
      return;
    }
    setAviso(true);
  };

  if (imagenCompleta) {
    // el diseño ya trae los textos: sólo se colocan las zonas pulsables
    return (
      <ScreenShell scroll={false} background={fondo || imagenCompleta ? "bg-[var(--negro-principal)]" : undefined}>
        <img
          src={imagenCompleta}
          alt={`Archivo, ${sala}: ${titulo}`}
          draggable={false}
          className="pointer-events-none absolute inset-0 size-full max-w-none select-none"
        />
        <button
          type="button"
          onClick={onBack}
          aria-label="Volver"
          className="absolute left-[13px] top-[27px] size-[47px] rounded-[8px]"
        />
        <button
          type="button"
          onClick={onSalaAnterior}
          aria-label="Sala anterior"
          className="absolute left-[-6px] top-[584px] h-[217px] w-[95px] transition-transform duration-300 hover:-translate-x-1"
        />
        {!sinSiguiente && (
          <button
            type="button"
            onClick={onSalaSiguiente}
            aria-label="Sala siguiente"
            className="absolute left-[324px] top-[584px] h-[217px] w-[95px] transition-transform duration-300 hover:translate-x-1"
          />
        )}
        {!sinEntrada && (
          <button
            type="button"
            onClick={entrar}
            aria-label={`Entrar al expediente de ${sala}`}
            className="absolute left-1/2 top-[765px] h-[100px] w-[220px] -translate-x-1/2"
          />
        )}
        {aviso && (
          <p
            role="status"
            className="absolute inset-x-6 bottom-[16px] text-center text-[12px] font-semibold leading-[1.4] text-[var(--verde-principal)]"
          >
            El reto de esta sala todavía no está disponible.
          </p>
        )}
      </ScreenShell>
    );
  }

  return (
    <ScreenShell scroll={false} background={fondo || imagenCompleta ? "bg-[var(--negro-principal)]" : undefined}>
      <button
        type="button"
        onClick={onBack}
        aria-label="Volver"
        className="absolute left-[13.22px] top-[27.35px] flex size-[47.472px] items-center justify-center rounded-[7.972px] bg-[var(--verde-principal)]"
      >
        <img src={flecha} alt="" className="block size-[23.736px] max-w-none" />
      </button>

      {/* El ojo ya está en el home: sólo marca dónde estás. */}
      <img
        src={ojo}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute left-[337px] top-[27px] block h-[48px] w-[57.15px] max-w-none"
      />

      {fondo && (
        <img
          src={fondo.src}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute top-0 block h-[917px] max-w-none object-cover"
          style={{ left: fondo.left, width: fondo.ancho }}
        />
      )}

      {ilustracion}

      <p className="absolute left-1/2 top-[415px] -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-[35.876px] font-semibold text-white">
        {sala}
      </p>

      <p className="absolute left-1/2 top-[428px] h-[75px] w-[515px] -translate-x-1/2 text-center text-[70px] font-bold leading-none text-[var(--verde-principal)]">
        ARCHIVO
      </p>

      <div className="absolute left-1/2 top-[513px] w-[354px] -translate-x-1/2">
        <div className="flex items-center rounded-[23.917px] border-[0.997px] border-solid border-[var(--verde-principal)] bg-[var(--verde-principal)] px-[11.959px] py-[5.979px]">
          <p className="w-[330px] text-center text-[15px] font-medium text-[var(--negro-principal)]">
            {titulo}
          </p>
        </div>
      </div>

      <p
        className="absolute -translate-x-1/2 -translate-y-1/2 text-center text-[14px] leading-[1.2] text-[#ddd]"
        style={{ left: 206, top: descripcionTop, width: descripcionAncho }}
      >
        {descripcion}
      </p>

      {/* Alas con las flechas para cambiar de sala */}
      <button
        type="button"
        onClick={onSalaAnterior}
        aria-label="Sala anterior"
        className="group absolute left-[-6.56px] top-[583.83px] block h-[216.704px] w-[94.944px]"
      >
        {/* el ala izquierda es la derecha reflejada, como en el diseño */}
        <img
          src={alaIzq}
          alt=""
          className="block size-full max-w-none -scale-x-100 transition-transform duration-300 ease-out group-hover:-translate-x-1"
        />
      </button>
      <button
        type="button"
        onClick={onSalaSiguiente}
        aria-label="Sala siguiente"
        className="group absolute left-[323.78px] top-[583.83px] block h-[216.704px] w-[94.944px]"
      >
        <img
          src={alaDer}
          alt=""
          className="block size-full max-w-none transition-transform duration-300 ease-out group-hover:translate-x-1"
        />
      </button>

      {/* El ojo grande entra al expediente */}
      <button
        type="button"
        onClick={entrar}
        aria-label={`Entrar al expediente de ${sala}`}
        className="group absolute left-1/2 top-[769px] flex h-[90px] w-[198px] -translate-x-1/2 flex-col items-center gap-[17px]"
      >
        <img
          src={ojoGrande}
          alt=""
          className="block h-[72px] w-[85.725px] shrink-0 max-w-none transition-transform duration-300 ease-out group-hover:scale-110"
        />
        <span className="block shrink-0 whitespace-nowrap text-[15.945px] font-medium leading-[1.4] text-white">
          Has click para ir al expediente
        </span>
      </button>

      {aviso && (
        <p
          role="status"
          className="absolute inset-x-6 bottom-[16px] text-center text-[12px] font-semibold leading-[1.4] text-[var(--verde-principal)]"
        >
          El reto de esta sala todavía no está disponible.
        </p>
      )}
    </ScreenShell>
  );
}
