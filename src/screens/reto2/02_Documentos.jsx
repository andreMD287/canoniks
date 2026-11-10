import TopBar from "../../components/TopBar";
import ScreenShell from "../../components/ScreenShell";
import ActionButton from "../../components/ActionButton";
import { TITULO_EXPEDIENTE } from "../../data/reto2";

/**
 * Índice de las tres evidencias. La patente y la carta abren su visor; el
 * catálogo no tiene pantalla en el diseño, así que se muestra sin enlace.
 */
function FichaDocumento({ orden, titulo, pie, enlace, verde = false, onClick }) {
  const colores = verde
    ? "bg-[var(--verde-principal)]"
    : "bg-[var(--blanco-principal)]";
  const contenido = (
    <>
      <p className="text-[11px] font-semibold leading-[1.4]">{orden}</p>
      <h2 className="font-display mt-[11px] text-[23px] font-extrabold leading-[1.12]">
        {titulo}
      </h2>
      <p className="mt-[10px] text-[13px] leading-[1.4]">{pie}</p>
      <p className="mt-[14px] text-[12px] font-semibold leading-[1.4]">{enlace}</p>
    </>
  );

  const clases = `block h-[142px] w-full overflow-hidden rounded-[12px] px-[18px] pt-[14px] text-left text-[var(--negro-principal)] ${colores}`;

  if (!onClick) {
    return <div className={clases}>{contenido}</div>;
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${clases} transition-transform duration-300 ease-out hover:-translate-y-[3px] active:translate-y-0 active:scale-[0.99]`}
    >
      {contenido}
    </button>
  );
}

export default function R2Documentos({ onHome, onBack, onVerPatente, onVerCarta }) {
  return (
    <ScreenShell
      footer={
        <ActionButton onClick={onVerPatente}>Empezar por la patente&nbsp; →</ActionButton>
      }
    >
      <TopBar title={TITULO_EXPEDIENTE} onHome={onHome} onBack={onBack} />

      <div className="px-6 pt-[28px]">
        <p className="text-[11px] font-semibold leading-[1.4] text-[var(--verde-principal)]">
          01 / EXAMINAR · TRES EVIDENCIAS
        </p>

        <h1 className="font-display mt-[21px] text-[32px] font-extrabold leading-[1.12] text-[var(--verde-principal)]">
          Abre el archivo.
        </h1>

        <p className="mt-[18px] text-[15px] leading-[1.4] text-[var(--blanco-principal)]">
          Sigue las pistas de 1927 a 1929.
        </p>

        <div className="mt-[31px] flex flex-col gap-[16px]">
          <FichaDocumento
            verde
            orden="01 / 1928"
            titulo="Patente francesa"
            pie="N.º 672.820"
            enlace="Consultar registro  →"
            onClick={onVerPatente}
          />
          <FichaDocumento
            orden="02 / 1927"
            titulo="Correspondencia"
            pie="Le Corbusier · Carta a Perriand"
            enlace="Leer la carta  →"
            onClick={onVerCarta}
          />
          <FichaDocumento
            orden="03 / 1929"
            titulo="Salon d’Automne"
            pie="Catálogo de la exposición"
            enlace="Sin digitalizar"
          />
        </div>

        <p className="mt-[18px] text-[13px] leading-[1.4] text-[var(--blanco-principal)]">
          Busca nombres, roles y formas de crédito.
        </p>
      </div>
    </ScreenShell>
  );
}
