import { useState } from "react";
import ScreenShell from "../components/ScreenShell";
import flecha from "../assets/menu-flecha.svg";
import ojo from "../assets/menu-ojo.svg";
import alaIzq from "../assets/menu-ala-izq.svg";
import alaDer from "../assets/menu-ala-der.svg";
import chevron1 from "../assets/menu-chevron-1.svg";
import chevron2 from "../assets/menu-chevron-2.svg";
import chevron3 from "../assets/menu-chevron-3.svg";

/**
 * El home del archivo: una sala por pantalla. Las alas verdes de los lados
 * cambian de sala y el indicador de abajo entra al expediente.
 *
 * `ilustracion` es opcional y se pinta tal cual: cada sala coloca sus propias
 * imágenes en la posición que marca el diseño.
 */
export default function Menu({
  sala,
  titulo,
  descripcion,
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

  return (
    <ScreenShell scroll={false}>
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

      {ilustracion}

      <p className="absolute left-[155.5px] top-[415px] -translate-y-1/2 whitespace-nowrap text-[35.876px] font-semibold text-white">
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

      {/* Indicador de "desliza" que entra al expediente */}
      <button
        type="button"
        onClick={entrar}
        aria-label={`Entrar al expediente de ${sala}`}
        className="group absolute left-1/2 top-[699px] flex h-[235px] w-[198px] -translate-x-1/2 flex-col items-center"
      >
        <span className="relative block h-[134.534px] w-[55.807px] shrink-0 rounded-[39.862px] bg-white shadow-[0px_7.972px_15.945px_0px_rgba(255,255,255,0.3)]">
          <img
            src={chevron3}
            alt=""
            className="absolute left-[11.96px] top-[2.99px] block size-[31.89px] max-w-none transition-transform duration-300 ease-out group-hover:-translate-y-1"
          />
          <img
            src={chevron2}
            alt=""
            className="absolute left-[11.96px] top-[26.91px] block size-[31.89px] max-w-none transition-transform duration-300 ease-out group-hover:-translate-y-1"
          />
          <img
            src={chevron1}
            alt=""
            className="absolute left-[11.96px] top-[50.82px] block size-[31.89px] max-w-none transition-transform duration-300 ease-out group-hover:-translate-y-1"
          />
        </span>

        <img src={ojo} alt="" className="block h-[48px] w-[57.15px] shrink-0 max-w-none" />

        <span className="block shrink-0 whitespace-nowrap text-[15.945px] font-medium leading-[1.4] text-white">
          Desliza para ir al expediente
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
