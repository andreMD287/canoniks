import { useState } from "react";
import TopBar from "../../components/TopBar";
import ScreenShell from "../../components/ScreenShell";
import ActionButton from "../../components/ActionButton";
import Intentos from "../../components/Intentos";
import Opcion from "../../components/OpcionRespuesta";
import { MAX_INTENTOS, textoIntentos } from "../../data/pregunta";
import {
  OPCIONES,
  OPCION_CORRECTA,
  PREGUNTA_PATENTE,
  TITULO_EXPEDIENTE,
} from "../../data/reto2";

const REGISTROS = [
  { año: "1927", activo: false },
  { año: "1928", activo: true },
  { año: "1929", activo: false },
];

/**
 * Pregunta de respuesta única sobre la patente de 1928, con 3 intentos como
 * la del Reto 1. Estados: eligiendo → incorrecta (con pista) o correcta.
 * Acertar o agotar los intentos lo decide el padre (App) con onAcertar /
 * onFallar; una vez resuelta, la pantalla se abre ya en el estado correcto.
 */
export default function R2Identificar({
  onHome,
  onBack,
  intentosUsados,
  resuelta,
  onFallar,
  onAcertar,
  onContinuar,
}) {
  const [seleccion, setSeleccion] = useState(resuelta ? OPCION_CORRECTA : null);
  const [fase, setFase] = useState(resuelta ? "correcta" : "eligiendo");

  const restantes = MAX_INTENTOS - intentosUsados;
  const incorrecta = fase === "incorrecta";
  const correcta = fase === "correcta";

  const comprobar = () => {
    if (seleccion === null) return;
    if (seleccion === OPCION_CORRECTA) {
      setFase("correcta");
      onAcertar();
      return;
    }
    setFase("incorrecta");
    onFallar();
  };

  const volverAElegir = () => {
    setSeleccion(null);
    setFase("eligiendo");
  };

  let footer;
  if (correcta) {
    footer = <ActionButton onClick={onContinuar}>Ver la carta de 1927&nbsp; →</ActionButton>;
  } else if (incorrecta) {
    footer = <ActionButton onClick={volverAElegir}>Volver a elegir</ActionButton>;
  } else {
    footer = (
      <>
        <ActionButton disabled={seleccion === null} onClick={comprobar}>
          Comprobar respuesta
        </ActionButton>
        {seleccion === null && (
          <p className="absolute inset-x-0 top-full mt-2 text-center text-[11px] leading-[1.4] text-[var(--blanco-principal)]">
            Selecciona una opción para comprobar.
          </p>
        )}
      </>
    );
  }

  return (
    <ScreenShell footer={footer}>
      <TopBar title={TITULO_EXPEDIENTE} onHome={onHome} onBack={onBack} />

      <div className="px-6 pt-[28px]">
        <p className="text-[11px] font-semibold leading-[1.4] text-[var(--verde-principal)]">
          02 / IDENTIFICAR · REGISTRO 2 DE 3
        </p>

        <Intentos usados={intentosUsados} />

        <h1 className="font-display mt-[24px] text-[28px] font-extrabold leading-[1.12] text-[var(--verde-principal)]">
          ¿Quién aparece
          <br />
          en el registro?
        </h1>

        {/* Los tres registros del expediente, como texto: el de 1928 es el que se consulta */}
        <p
          className="mt-[18px] flex items-center gap-[10px] text-[13px] font-semibold leading-[1.4]"
          aria-label="Registro de 1928, el segundo de tres: 1927, 1928 y 1929"
        >
          {REGISTROS.map(({ año, activo }, i) => (
            <span key={año} className="flex items-center gap-[10px]">
              {i > 0 && (
                <span aria-hidden="true" className="text-[var(--blanco-principal)] opacity-30">
                  ·
                </span>
              )}
              <span
                aria-current={activo ? "true" : undefined}
                className={
                  activo
                    ? "text-[var(--verde-principal)] underline decoration-2 underline-offset-[6px]"
                    : "text-[var(--blanco-principal)] opacity-45"
                }
              >
                {año}
              </span>
            </span>
          ))}
        </p>

        <div className="mt-[18px] rounded-[12px] bg-[var(--blanco-principal)] px-[18px] py-[14px] text-[var(--negro-principal)]">
          <p className="text-[11px] font-semibold leading-[1.4]">PATENTE FRANCESA · 1928</p>
          <p className="font-display mt-[8px] text-[22px] font-extrabold leading-[1.12]">
            N.º 672.820
          </p>
          <p className="mt-[8px] text-[13px] font-semibold leading-[1.4]">{PREGUNTA_PATENTE}</p>
        </div>

        <p className="mt-[16px] text-[14px] leading-[1.4] text-[var(--blanco-principal)]">
          Selecciona una opción. Vuelve a la patente si lo necesitas.
        </p>

        <div
          role="radiogroup"
          aria-label="Inventores de la patente"
          className="mt-[16px] flex flex-col gap-[10px]"
        >
          {OPCIONES.map(({ id, texto }) => {
            let estado = "normal";
            if (id === seleccion) {
              estado = correcta ? "correcta" : incorrecta ? "incorrecta" : "seleccionada";
            }
            return (
              <Opcion
                key={id}
                id={id}
                texto={texto}
                estado={estado}
                deshabilitada={incorrecta || correcta}
                onClick={() => setSeleccion(id)}
              />
            );
          })}
        </div>

        {incorrecta && (
          <div
            role="alert"
            className="mt-[24px] rounded-[14px] bg-[var(--blanco-principal)] px-[16px] pt-[14px] pb-[16px] text-[var(--negro-principal)]"
          >
            <p className="text-[15px] font-semibold leading-[1.4]">
              Todavía no.{" "}
              {restantes === 1 ? "Te queda 1 intento." : `Te quedan ${textoIntentos(restantes)}.`}
            </p>
            <p className="mt-[10px] text-[13px] leading-[1.4]">
              Pista: lee la casilla «Inventeurs» de la patente. Selecciona otra respuesta.
            </p>
          </div>
        )}

        {correcta && (
          <div
            role="status"
            className="mt-[24px] rounded-[14px] bg-[var(--blanco-principal)] px-[16px] pt-[14px] pb-[16px] text-[var(--negro-principal)]"
          >
            <p className="text-[15px] font-semibold leading-[1.4]">Correcto.</p>
            <p className="mt-[10px] text-[13px] leading-[1.4]">
              La patente nombra a Le Corbusier y a Pierre Jeanneret. Fíjate en quién no aparece:
              eso lo contrastarás con la carta de 1927.
            </p>
          </div>
        )}

        {!incorrecta && !correcta && (
          <p className="mt-[24px] text-[13px] leading-[1.4] text-[var(--blanco-principal)]">
            Solo puedes continuar si respondes correctamente.
          </p>
        )}
      </div>
    </ScreenShell>
  );
}
