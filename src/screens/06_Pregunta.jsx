import { useState } from "react";
import TopBar from "../components/TopBar";
import ScreenShell from "../components/ScreenShell";
import FolderCard from "../components/FolderCard";
import ActionButton from "../components/ActionButton";
import folderPreguntaEnCurso from "../assets/folder-pregunta-en-curso.svg";
import {
  MAX_INTENTOS,
  OPCIONES,
  OPCION_CORRECTA,
  textoIntentos,
} from "../data/pregunta";

const ESTILO_OPCION = {
  normal: "bg-[var(--blanco-principal)] text-[var(--negro-principal)]",
  seleccionada: "bg-[var(--verde-principal)] text-[var(--negro-principal)]",
  incorrecta: "bg-[var(--morado-principal)] text-[var(--blanco-principal)]",
};

/** "INTENTOS 1 2 3": los gastados se pintan en negro, los disponibles en verde. */
function Intentos({ usados }) {
  return (
    <div
      role="status"
      aria-label={`Intentos usados: ${usados} de ${MAX_INTENTOS}`}
      className="mt-[22px] flex h-[50px] items-center justify-between rounded-[25px] bg-[var(--blanco-principal)] pl-[17px] pr-[28px]"
    >
      <span className="text-[11px] font-semibold leading-[1.4] text-[var(--negro-principal)]">
        INTENTOS
      </span>
      <div className="flex gap-[10px]">
        {Array.from({ length: MAX_INTENTOS }, (_, i) => {
          const gastado = i < usados;
          return (
            <span
              key={i}
              className={`flex size-[29px] items-center justify-center rounded-full text-[13px] font-semibold ${
                gastado
                  ? "bg-[var(--negro-principal)] text-[var(--blanco-principal)]"
                  : "bg-[var(--verde-principal)] text-[var(--negro-principal)]"
              }`}
            >
              {i + 1}
            </span>
          );
        })}
      </div>
    </div>
  );
}

function Opcion({ id, texto, estado, deshabilitada, onClick }) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={estado !== "normal"}
      disabled={deshabilitada}
      onClick={onClick}
      className={`relative h-[60px] w-full rounded-[13px] text-left ${ESTILO_OPCION[estado]}`}
    >
      <span className="font-display absolute left-[16px] top-[16px] text-[18px] font-extrabold leading-[1.12]">
        {id}
      </span>
      <span className="absolute left-[60px] top-[20px] text-[15px] font-semibold leading-[1.4]">
        {texto}
      </span>
      {estado === "seleccionada" && (
        <span aria-hidden="true" className="absolute left-[324px] top-[15px] text-[20px] font-semibold leading-[1.4]">
          ●
        </span>
      )}
      {estado === "incorrecta" && (
        <span aria-hidden="true" className="absolute left-[324px] top-[15px] text-[20px] font-semibold leading-[1.4]">
          ×
        </span>
      )}
    </button>
  );
}

/**
 * Pantallas 06 a 10 del Figma en un solo componente con estados:
 *  - eligiendo (06/07): sin selección el botón está bloqueado; con selección se activa.
 *  - incorrecta (08/09): muestra los intentos que quedan y una pista.
 *  - diálogo de salida (10): la "×" no deja salir, sólo recuerda cuántos intentos quedan.
 * Acertar o agotar los intentos lo decide el padre (App) con onAcertar / onFallar.
 */
export default function Pregunta({ intentosUsados, onFallar, onAcertar }) {
  const [seleccion, setSeleccion] = useState(null);
  const [fase, setFase] = useState("eligiendo"); // "eligiendo" | "incorrecta"
  const [salirAbierto, setSalirAbierto] = useState(false);

  const restantes = MAX_INTENTOS - intentosUsados;
  const incorrecta = fase === "incorrecta";

  const comprobar = () => {
    if (seleccion === null) return;
    if (seleccion === OPCION_CORRECTA) {
      onAcertar();
      return;
    }
    onFallar();
    setFase("incorrecta");
  };

  const volverAElegir = () => {
    setSeleccion(null);
    setFase("eligiendo");
  };

  const footer = incorrecta ? (
    <ActionButton onClick={volverAElegir}>Volver a elegir</ActionButton>
  ) : (
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

  const dialogoSalida = salirAbierto && (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="titulo-salida"
      className="absolute inset-0 z-20"
    >
      <div className="absolute inset-0 bg-[var(--negro-principal)]/80" />
      <div className="absolute inset-x-6 top-[269px]">
        <FolderCard
          asset={folderPreguntaEnCurso}
          bleed
          className="min-h-[410px]"
          contentClassName="pt-[59px] pb-8"
        >
          <p className="text-[12px] font-semibold leading-[1.4] text-[var(--negro-principal)]">
            PREGUNTA EN CURSO
          </p>

          <h2
            id="titulo-salida"
            className="font-display mt-[32px] text-[30px] font-extrabold leading-[1.12] text-[var(--negro-principal)]"
          >
            Aún queda
            <br />
            algo por resolver.
          </h2>

          <p className="mt-[25px] text-[15px] leading-[1.4] text-[var(--negro-principal)]">
            Para avanzar, responde correctamente. Todavía tienes{" "}
            {textoIntentos(restantes)}. Si {restantes === 1 ? "lo agotas" : "los agotas"},
            podrás salir sin completar el reto.
          </p>

          <ActionButton
            variant="oscuro"
            compact
            className="mt-[60px]"
            onClick={() => setSalirAbierto(false)}
          >
            Seguir con la pregunta
          </ActionButton>
        </FolderCard>
      </div>
    </div>
  );

  return (
    <ScreenShell footer={footer} overlay={dialogoSalida}>
      <TopBar closeIcon onBack={() => setSalirAbierto(true)} />

      <div className="px-6 pt-[28px]">
        <p className="text-[11px] font-semibold leading-[1.4] text-[var(--verde-principal)]">
          03 / RESOLVER · PREGUNTA 1 DE 1
        </p>

        <Intentos usados={intentosUsados} />

        <h1 className="font-display mt-[28px] text-[28px] font-extrabold leading-[1.12] text-[var(--verde-principal)]">
          ¿Qué modelo elegirías
          <br />
          para diseñar para
          <br />
          personas?
        </h1>

        <p className="mt-[16px] text-[14px] leading-[1.4] text-[var(--blanco-principal)]">
          Selecciona una de las cuatro esculturas.
        </p>

        <div
          role="radiogroup"
          aria-label="Modelos para diseñar"
          className="mt-[24px] flex flex-col gap-[10px]"
        >
          {OPCIONES.map(({ id, texto }) => {
            let estado = "normal";
            if (id === seleccion) estado = incorrecta ? "incorrecta" : "seleccionada";
            return (
              <Opcion
                key={id}
                id={id}
                texto={texto}
                estado={estado}
                deshabilitada={incorrecta}
                onClick={() => setSeleccion(id)}
              />
            );
          })}
        </div>

        {incorrecta ? (
          <div
            role="alert"
            className="mt-[31px] min-h-[107px] rounded-[14px] bg-[var(--blanco-principal)] px-[16px] pt-[14px] pb-[16px] text-[var(--negro-principal)]"
          >
            <p className="text-[15px] font-semibold leading-[1.4]">
              Todavía no.{" "}
              {restantes === 1 ? "Te queda 1 intento." : `Te quedan ${restantes} intentos.`}
            </p>
            <p className="mt-[10px] text-[13px] leading-[1.4]">
              Pista: revisa quiénes quedaron fuera del estándar. Selecciona otra respuesta.
            </p>
          </div>
        ) : (
          <p className="mt-[42px] text-[13px] leading-[1.4] text-[var(--blanco-principal)]">
            Solo puedes continuar si respondes correctamente.
          </p>
        )}
      </div>
    </ScreenShell>
  );
}
