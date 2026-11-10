import TopBar from "../../components/TopBar";
import ScreenShell from "../../components/ScreenShell";
import ActionButton from "../../components/ActionButton";
import { AUTORAS, PIEZAS, TITULO_EXPEDIENTE } from "../../data/reto3";

/** La revelación: las cuatro piezas son de mujeres, la pregunta no tenía sentido. */
export default function R3Contrastar({ onHome, onBack, onSeguir }) {
  return (
    <ScreenShell
      footer={
        <ActionButton compact onClick={onSeguir}>
          Continuar&nbsp; →
        </ActionButton>
      }
    >
      <TopBar title={TITULO_EXPEDIENTE} onHome={onHome} onBack={onBack} />

      <div className="px-6 pt-[28px]">
        <p className="text-[11px] leading-[1.4] text-[var(--verde-principal)]">
          03 / CONTRASTAR · LAS AUTORAS
        </p>

        <h1 className="font-display mt-[21px] text-[30px] font-extrabold leading-[1.12] text-[var(--verde-principal)]">
          El diseño no
          <br />
          tiene género.
        </h1>

        <p className="mt-[24px] text-[14px] leading-[1.4] text-[var(--blanco-principal)]">
          Aunque realmente todas las piezas fueron creadas por mujeres, la
          pregunta anterior no tiene sentido.
        </p>

        <p className="mt-[27px] text-[15px] leading-[1.4] text-[var(--verde-principal)]">
          ¿Por qué le atribuimos género a un trabajo cuando lo que importa es su
          resultado?
        </p>

        <div className="mt-[30px] flex h-[78px] w-full items-center justify-around overflow-hidden rounded-[12px] bg-[var(--blanco-principal)] px-[24px]">
          {PIEZAS.slice(0, 3).map((p) => (
            <img
              key={p.id}
              src={p.imagen}
              alt={p.alt}
              className="h-[66px] w-[81px] object-contain"
            />
          ))}
        </div>

        <div className="mt-[16px] flex flex-col gap-[10px]">
          {AUTORAS.map(({ nombre, perfil, foto }) => (
            <div
              key={nombre}
              className="flex h-[90px] w-full items-center overflow-hidden rounded-[12px] bg-[var(--blanco-principal)]"
            >
              <img
                src={foto}
                alt={`Retrato de ${nombre}.`}
                className="ml-[8px] h-[76px] w-[64px] shrink-0 object-cover"
              />
              <div className="ml-[16px]">
                <p className="font-display text-[20px] font-extrabold leading-[1.12] text-[var(--negro-principal)]">
                  {nombre}
                </p>
                <p className="mt-[10px] text-[11px] leading-[1.4] text-[var(--negro-principal)]">
                  {perfil}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ScreenShell>
  );
}
