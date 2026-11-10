import { useState } from "react";
import Carrusel from "./screens/00_Carrusel";
import Menu from "./screens/00_Menu";
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
import archivador from "./assets/menu2-archivador.svg";
import { MAX_INTENTOS } from "./data/pregunta";

const SCREENS = {
  CARRUSEL: "carrusel",
  MENU: "menu",
  MENU_2: "menu2",
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

const DESCRIPCION_SALA =
  "Que una decisión de diseño aparentemente neutral puede reproducir una " +
  "perspectiva particular cuando se convierte en estándar para todas las personas.";

/**
 * Flujo del Expediente 01:
 *  carrusel (fachada + qué podrás hacer) → menu (el archivo, una sala por
 *  pantalla) → 01 Misión → 02 Expedientes → 03 A / 04 B (hay que abrir los
 *  dos) → 05 Comparar → 06-10 Pregunta (3 intentos; sólo se avanza acertando)
 *     · acierta  → 12 Respuesta correcta → 13 Encuentra la escultura
 *                  → 13 Bodega (se toca la foto) → 14 Reto completado
 *                  → 15 Sala 1
 *     · 3 fallos → 11 Sin intentos → salir al archivo (el reto no se completa)
 *
 * El ojo de la barra superior vuelve al archivo (el menu) desde cualquier
 * pantalla. La Sala 2 ya tiene su portada, pero su reto está por implementar.
 */
export default function App() {
  const [screen, setScreen] = useState(SCREENS.CARRUSEL);
  const [leidoA, setLeidoA] = useState(false);
  const [leidoB, setLeidoB] = useState(false);
  const [volverDeB, setVolverDeB] = useState(SCREENS.EXPEDIENTES);
  const [intentosUsados, setIntentosUsados] = useState(0);
  const [resuelta, setResuelta] = useState(false);

  const irAlArchivo = () => setScreen(SCREENS.MENU);

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

  // "Salir al archivo" / "Volver al archivo": deja el reto como nuevo.
  const reiniciar = () => {
    setLeidoA(false);
    setLeidoB(false);
    setVolverDeB(SCREENS.EXPEDIENTES);
    setIntentosUsados(0);
    setResuelta(false);
    setScreen(SCREENS.MENU);
  };

  const home = { onHome: irAlArchivo };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0b0b14] py-10">
      {screen === SCREENS.CARRUSEL && (
        <Carrusel onExplorar={irAlArchivo} />
      )}

      {screen === SCREENS.MENU && (
        <Menu
          sala="Sala 1"
          titulo="El conocimiento desde una sola mirada"
          descripcion={DESCRIPCION_SALA}
          onBack={() => setScreen(SCREENS.CARRUSEL)}
          onSalaAnterior={() => setScreen(SCREENS.MENU_2)}
          onSalaSiguiente={() => setScreen(SCREENS.MENU_2)}
          onEntrar={() => setScreen(SCREENS.MISION)}
        />
      )}

      {screen === SCREENS.MENU_2 && (
        <Menu
          sala="Sala 2"
          titulo="Cuando saber no significa, ser escuchada"
          descripcion={DESCRIPCION_SALA}
          ilustracion={archivador}
          disponible={false}
          onBack={() => setScreen(SCREENS.CARRUSEL)}
          onSalaAnterior={irAlArchivo}
          onSalaSiguiente={irAlArchivo}
          onEntrar={() => {}}
        />
      )}

      {screen === SCREENS.MISION && (
        <MisionDelReto
          {...home}
          onBack={irAlArchivo}
          onOpenExpediente={() => setScreen(SCREENS.EXPEDIENTES)}
        />
      )}

      {screen === SCREENS.EXPEDIENTES && (
        <Expedientes
          {...home}
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
          {...home}
          onBack={() => setScreen(SCREENS.EXPEDIENTES)}
          onLeerExpedienteB={() => abrirB(SCREENS.EXPEDIENTE_A)}
        />
      )}

      {screen === SCREENS.EXPEDIENTE_B && (
        <ExpedienteB
          {...home}
          onBack={() => setScreen(volverDeB)}
          onComparar={() => setScreen(SCREENS.COMPARAR)}
          puedeComparar={leidoA}
        />
      )}

      {screen === SCREENS.COMPARAR && (
        <Comparar
          {...home}
          onBack={() => setScreen(SCREENS.EXPEDIENTES)}
          onIrALaPregunta={irALaPregunta}
        />
      )}

      {screen === SCREENS.PREGUNTA && (
        <Pregunta
          {...home}
          intentosUsados={intentosUsados}
          onFallar={fallar}
          onAcertar={acertar}
        />
      )}

      {screen === SCREENS.SIN_INTENTOS && (
        <SinIntentos {...home} onSalir={reiniciar} />
      )}

      {screen === SCREENS.CORRECTA && (
        <RespuestaCorrecta
          {...home}
          onBack={() => setScreen(SCREENS.COMPARAR)}
          onIrALaBodega={() => setScreen(SCREENS.BODEGA)}
        />
      )}

      {screen === SCREENS.BODEGA && (
        <Bodega
          {...home}
          onBack={() => setScreen(SCREENS.CORRECTA)}
          onEntrarALaBodega={() => setScreen(SCREENS.BODEGA_VISTA)}
        />
      )}

      {screen === SCREENS.BODEGA_VISTA && (
        <BodegaVista
          {...home}
          onBack={() => setScreen(SCREENS.BODEGA)}
          onEncontrar={() => setScreen(SCREENS.COMPLETADO)}
        />
      )}

      {screen === SCREENS.COMPLETADO && (
        <RetoCompletado
          {...home}
          onBack={() => setScreen(SCREENS.BODEGA_VISTA)}
          onVerLaSala={() => setScreen(SCREENS.SALA)}
        />
      )}

      {screen === SCREENS.SALA && (
        <SalaExposicion
          {...home}
          onBack={() => setScreen(SCREENS.COMPLETADO)}
          onVolver={reiniciar}
        />
      )}
    </div>
  );
}
