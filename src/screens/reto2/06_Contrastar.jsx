import TopBar from "../../components/TopBar";
import ScreenShell from "../../components/ScreenShell";
import ActionButton from "../../components/ActionButton";
import { TITULO_EXPEDIENTE } from "../../data/reto2";

const REGISTROS = [
  {
    fuente: "1927 / CORRESPONDENCIA",
    titulo: "La voz del documento",
    pregunta: "¿Quién escribe, a quién se dirige y qué cuenta la carta?",
    verde: false,
  },
  {
    fuente: "1928 / PATENTE N.º 672.820",
    titulo: "El registro de invención",
    pregunta: "¿Qué nombres figuran como inventores en la patente?",
    verde: false,
  },
  {
    fuente: "1929 / SALON D’AUTOMNE",
    titulo: "El crédito de exposición",
    pregunta: "¿Quién aparece como participante en el catálogo?",
    verde: true,
  },
];

export default function R2Contrastar({
  onHome,
  onBack,
  onReconstruir,
  identificados = [],
}) {
  return (
    <ScreenShell
      footer={
        <ActionButton onClick={onReconstruir}>
          Reconstruir el reconocimiento&nbsp; →
        </ActionButton>
      }
    >
      <TopBar title={TITULO_EXPEDIENTE} onHome={onHome} onBack={onBack} />

      <div className="px-6 pt-[28px]">
        <p className="text-[11px] font-semibold leading-[1.4] text-[var(--verde-principal)]">
          03 / CONTRASTAR · TRES REGISTROS
        </p>

        <h1 className="font-display mt-[21px] text-[28px] font-extrabold leading-[1.12] text-[var(--verde-principal)]">
          No es lo mismo
          <br />
          participar que firmar.
        </h1>

        <p className="mt-[22px] text-[14px] leading-[1.4] text-[var(--blanco-principal)]">
          Compara qué reconoce cada evidencia.
        </p>

        <div className="mt-[25px] flex flex-col gap-[14px]">
          {REGISTROS.map(({ fuente, titulo, pregunta, verde }) => (
            <div
              key={fuente}
              className={`h-[129px] w-full overflow-hidden rounded-[12px] px-[18px] pt-[13px] text-[var(--negro-principal)] ${
                verde ? "bg-[var(--verde-principal)]" : "bg-[var(--blanco-principal)]"
              }`}
            >
              <p className="text-[10px] font-semibold leading-[1.4]">{fuente}</p>
              <h2 className="font-display mt-[11px] text-[20px] font-extrabold leading-[1.12]">
                {titulo}
              </h2>
              <p className="mt-[12px] text-[13px] leading-[1.4]">{pregunta}</p>
            </div>
          ))}
        </div>

        {identificados.length > 0 && (
          <p className="mt-[18px] text-[13px] leading-[1.4] text-[var(--verde-principal)]">
            En la patente marcaste: {identificados.join(", ")}.
          </p>
        )}

        <p className="mt-[23px] text-[13px] leading-[1.4] text-[var(--blanco-principal)]">
          Una fuente prueba algo concreto. No todas
          <br />
          reconocen el mismo tipo de participación.
        </p>
      </div>
    </ScreenShell>
  );
}
