import { useState } from "react";
import Intro from "./screens/00_Intro";
import Start from "./screens/00_Start";
import MisionDelReto from "./screens/01_MisionDelReto";
import Expedientes from "./screens/02_Expedientes";
import ExpedienteA from "./screens/03_ExpedienteA";
import ExpedienteB from "./screens/04_ExpedienteB";
import Comparar from "./screens/05_Comparar";
import Pregunta from "./screens/06_Pregunta";
import SinIntentos from "./screens/11_SinIntentos";
import RespuestaCorrecta from "./screens/12_RespuestaCorrecta";
import Bodega from "./screens/13_Bodega";
import BodegaVista from "./screens/13_BodegaVista";
import RetoCompletado from "./screens/14_RetoCompletado";
import SalaExposicion from "./screens/15_SalaExposicion";
import { MAX_INTENTOS } from "./data/pregunta";

const SCREENS = {
  INTRO: "intro",
  START: "start",
  MISION: "mision",
  EXPEDIENTES: "expedientes",
  EXPEDIENTE_A: "expedienteA",
  EXPEDIENTE_B: "expedienteB",
  COMPARAR: "comparar",
  PREGUNTA: "pregunta",
  SIN_INTENTOS: "sinIntentos",
  CORRECTA: "correcta",
  BODEGA: "bodega",
  BODEGA_VISTA: "bodegaVista",
  COMPLETADO: "completado",
  SALA: "sala",
};

/**
 * Flujo del Expediente 01:
 *  intro → start → 01 Misión → 02 Expedientes → 03 A / 04 B (hay que abrir
 *  los dos) → 05 Comparar → 06-10 Pregunta (3 intentos; sólo se avanza
 *  acertando)
 *     · acierta  → 12 Respuesta correcta → 13 Encuentra la escultura
 *                  → 13 Bodega (se toca la foto) → 14 Reto completado
 *                  → 15 Sala 1
 *     · 3 fallos → 11 Sin intentos → salir al archivo (el reto no se completa)
 *  "Salir al archivo" / "Volver al archivo" reinician el recorrido.
 */
export default function App() {
  const [screen, setScreen] = useState(SCREENS.INTRO);
  const [leidoA, setLeidoA] = useState(false);
  const [leidoB, setLeidoB] = useState(false);
  const [volverDeB, setVolverDeB] = useState(SCREENS.EXPEDIENTES);
  const [intentosUsados, setIntentosUsados] = useState(0);
  const [resuelta, setResuelta] = useState(false);

  const abrirA = () => {
    setLeidoA(true);
    setScreen(SCREENS.EXPEDIENTE_A);
  };

  // `desde` es la pantalla a la que debe volver la flecha del expediente B.
  const abrirB = (desde) => {
    setLeidoB(true);
    setVolverDeB(desde);
    setScreen(SCREENS.EXPEDIENTE_B);
  };

  const irALaPregunta = () =>
    setScreen(resuelta ? SCREENS.CORRECTA : SCREENS.PREGUNTA);

  const fallar = () => {
    const usados = intentosUsados + 1;
    setIntentosUsados(usados);
    if (usados >= MAX_INTENTOS) setScreen(SCREENS.SIN_INTENTOS);
  };

  const acertar = () => {
    setResuelta(true);
    setScreen(SCREENS.CORRECTA);
  };

  const reiniciar = () => {
    setLeidoA(false);
    setLeidoB(false);
    setVolverDeB(SCREENS.EXPEDIENTES);
    setIntentosUsados(0);
    setResuelta(false);
    setScreen(SCREENS.INTRO);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0b0b14] py-10">
      {screen === SCREENS.INTRO && (
        <Intro onContinuar={() => setScreen(SCREENS.START)} />
      )}

      {screen === SCREENS.START && (
        <Start onExplorar={() => setScreen(SCREENS.MISION)} />
      )}

      {screen === SCREENS.MISION && (
        <MisionDelReto
          onBack={() => setScreen(SCREENS.START)}
          onOpenExpediente={() => setScreen(SCREENS.EXPEDIENTES)}
        />
      )}

      {screen === SCREENS.EXPEDIENTES && (
        <Expedientes
          onBack={() => setScreen(SCREENS.MISION)}
          onOpenA={abrirA}
          onOpenB={() => abrirB(SCREENS.EXPEDIENTES)}
          onComparar={() => setScreen(SCREENS.COMPARAR)}
          leidoA={leidoA}
          leidoB={leidoB}
        />
      )}

      {screen === SCREENS.EXPEDIENTE_A && (
        <ExpedienteA
          onBack={() => setScreen(SCREENS.EXPEDIENTES)}
          onLeerExpedienteB={() => abrirB(SCREENS.EXPEDIENTE_A)}
        />
      )}

      {screen === SCREENS.EXPEDIENTE_B && (
        <ExpedienteB
          onBack={() => setScreen(volverDeB)}
          onComparar={() => setScreen(SCREENS.COMPARAR)}
          puedeComparar={leidoA}
        />
      )}

      {screen === SCREENS.COMPARAR && (
        <Comparar
          onBack={() => setScreen(SCREENS.EXPEDIENTES)}
          onIrALaPregunta={irALaPregunta}
        />
      )}

      {screen === SCREENS.PREGUNTA && (
        <Pregunta
          intentosUsados={intentosUsados}
          onFallar={fallar}
          onAcertar={acertar}
        />
      )}

      {screen === SCREENS.SIN_INTENTOS && <SinIntentos onSalir={reiniciar} />}

      {screen === SCREENS.CORRECTA && (
        <RespuestaCorrecta
          onBack={() => setScreen(SCREENS.COMPARAR)}
          onIrALaBodega={() => setScreen(SCREENS.BODEGA)}
        />
      )}

      {screen === SCREENS.BODEGA && (
        <Bodega
          onBack={() => setScreen(SCREENS.CORRECTA)}
          onEntrarALaBodega={() => setScreen(SCREENS.BODEGA_VISTA)}
        />
      )}

      {screen === SCREENS.BODEGA_VISTA && (
        <BodegaVista
          onBack={() => setScreen(SCREENS.BODEGA)}
          onEncontrar={() => setScreen(SCREENS.COMPLETADO)}
        />
      )}

      {screen === SCREENS.COMPLETADO && (
        <RetoCompletado
          onBack={() => setScreen(SCREENS.BODEGA_VISTA)}
          onVerLaSala={() => setScreen(SCREENS.SALA)}
        />
      )}

      {screen === SCREENS.SALA && (
        <SalaExposicion
          onBack={() => setScreen(SCREENS.COMPLETADO)}
          onVolver={reiniciar}
        />
      )}
    </div>
  );
}
