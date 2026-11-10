import ScreenShell from "../components/ScreenShell";
import TextoAjustado from "../components/TextoAjustado";
import museo from "../assets/intro-museo.png";
import logoMuseo from "../assets/intro-logo.svg";
import ojoMuseo from "../assets/intro-ojo.svg";
import luces from "../assets/intro-luces.svg";

/**
 * Portada del archivo del museo. No tiene botón en el diseño: toda la
 * pantalla avanza al start.
 */
export default function Intro({ onContinuar }) {
  return (
    <ScreenShell background="bg-white" scroll={false}>
      <button
        type="button"
        onClick={onContinuar}
        aria-label="Entrar al archivo del museo"
        className="group absolute inset-0 block text-left"
      >
        <img
          alt="Fachada del Museo de las Ausencias de noche"
          src={museo}
          className="pointer-events-none absolute left-[-52px] top-0 h-[917px] w-[516px] max-w-none object-cover"
        />

        {/* Logotipo del museo sobre el frontón */}
        <img
          alt=""
          src={logoMuseo}
          className="pointer-events-none absolute left-[115.3px] top-[312px] block h-[39.8px] w-[180.4px] max-w-none"
        />
        <img
          alt=""
          src={ojoMuseo}
          className="pointer-events-none absolute left-[205.4px] top-[312.9px] block h-[19px] w-[22.7px] max-w-none"
        />

        {/* Haces de luz de color, en modo de fusión superpuesto */}
        <img
          alt=""
          src={luces}
          className="pointer-events-none absolute left-[-171px] top-[-41px] block h-[958px] w-[820px] max-w-none mix-blend-overlay"
        />

        <span className="font-titular pointer-events-none absolute left-[18px] top-[703px] block h-[99px] w-[92px] text-[120px] leading-[0.84] text-[var(--verde-principal)] transition-transform duration-500 group-hover:-translate-x-1">
          ¡
        </span>

        <span className="pointer-events-none absolute left-[59px] top-[711px] block h-[105px] w-[316px] text-[var(--verde-principal)]">
          <TextoAjustado ancho={300} className="font-titular text-[60px] leading-[0.84]">
            BIENVENIDO
          </TextoAjustado>
          <TextoAjustado ancho={316} className="font-titular text-[48px] leading-[0.84]">
            AL ARCHIVO DEL MUSEO
          </TextoAjustado>
          <span className="font-titular block text-[48px] leading-[0.84]">...</span>
        </span>

        <span className="font-titular pointer-events-none absolute left-[366px] top-[699px] block h-[99px] w-[92px] text-[120px] leading-[0.84] text-[var(--verde-principal)] transition-transform duration-500 group-hover:translate-x-1">
          !
        </span>

        <span className="pointer-events-none absolute inset-x-0 bottom-[28px] text-center text-[11px] font-semibold tracking-[0.08em] text-[var(--blanco-principal)] opacity-60 transition-opacity duration-500 group-hover:opacity-100">
          TOCA PARA ENTRAR
        </span>
      </button>
    </ScreenShell>
  );
}
