import TopBar from "../../components/TopBar";
import ScreenShell from "../../components/ScreenShell";
import ActionButton from "../../components/ActionButton";
import ojoRojo from "../../assets/r2-ojo-rojo.svg";
import { TITULO_EXPEDIENTE } from "../../data/reto2";

export default function R2OjoAlDato({ onHome, onBack, onVerLaSala }) {
  return (
    <ScreenShell
      footer={<ActionButton onClick={onVerLaSala}>Ver la sala 2&nbsp; →</ActionButton>}
    >
      <TopBar title={TITULO_EXPEDIENTE} onHome={onHome} onBack={onBack} />

      <div className="flex flex-col gap-[18px] px-6 pt-[28px]">
        <p className="text-[11px] leading-[1.4] text-[var(--verde-principal)]">
          06 / COMPLETAR · OJO AL DATO
        </p>

        <div className="flex h-[86px] w-full items-center justify-center overflow-hidden rounded-[13px]">
          <img
            src={ojoRojo}
            alt=""
            className="block h-[68px] w-[89px] max-w-none"
          />
        </div>

        <h1 className="font-display w-full text-center text-[36px] font-extrabold leading-[1.12] text-[var(--blanco-principal)]">
          Ojo al dato
        </h1>

        <div className="flex min-h-[342px] w-full flex-col gap-[20px] overflow-hidden rounded-[13px] bg-[var(--blanco-principal)] p-[22px] text-[var(--negro-principal)]">
          <p className="font-display w-full text-[11px] font-extrabold leading-[1.12]">
            UN AÑO DESPUÉS
          </p>
          <p className="w-full text-[15px] leading-[1.4]">
            Le Corbusier solo hasta un año después otorga formalmente a
            Perriand la titularidad compartida sobre los derechos de
            explotación industrial de los diseños.
          </p>
          <p className="w-full text-[15px] leading-[1.4]">
            Y después, en la sección de créditos del stand, imprime la firma de
            autoría de manera explícita a nombre conjunto de Charlotte
            Perriand, Pierre Jeanneret y Le Corbusier, visibilizando
            públicamente ante la prensa y la crítica su estatus de coautora
            principal.
          </p>
        </div>
      </div>
    </ScreenShell>
  );
}
