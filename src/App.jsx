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
import R2Mision from "./screens/reto2/01_Mision";
import R2Documentos from "./screens/reto2/02_Documentos";
import R2Patente from "./screens/reto2/03_Patente";
import R2Identificar from "./screens/reto2/04_Identificar";
import R2Carta from "./screens/reto2/05_Carta";
import R2Contrastar from "./screens/reto2/06_Contrastar";
import R2Restituir from "./screens/reto2/07_Restituir";
import R2PatenteRestaurada from "./screens/reto2/08_PatenteRestaurada";
import R2OjoAlDato from "./screens/reto2/09_OjoAlDato";
import R2Galeria from "./screens/reto2/10_Galeria";
import R2Cierre from "./screens/reto2/11_Cierre";
import R3Examinar from "./screens/reto3/01_Examinar";
import R3Clasificar from "./screens/reto3/02_Clasificar";
import R3Contrastar from "./screens/reto3/03_Contrastar";
import R3Contextualizar from "./screens/reto3/04_Contextualizar";
import R3Reparto from "./screens/reto3/05_Reparto";
import R3Cierre from "./screens/reto3/06_Cierre";
import R4Introduccion from "./screens/reto4/01_Introduccion";
import R4Juego from "./screens/reto4/02_Juego";
import R4Derrota from "./screens/reto4/03_Derrota";
import R4Victoria from "./screens/reto4/04_Victoria";
import archivador from "./assets/menu2-archivador.svg";
import carpetaA from "./assets/menu3-carpeta-a.svg";
import carpetaB from "./assets/menu3-carpeta-b.svg";
import caja4 from "./assets/menu4-caja.svg";
import { MAX_INTENTOS } from "./data/pregunta";

const SCREENS = {
  CARRUSEL: "carrusel",
  MENU: "menu",
  MENU_2: "menu2",
  MENU_3: "menu3",
  MENU_4: "menu4",
  // Reto 1 · El cuerpo que no estaba en el modelo
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
  // Reto 2 · El caso Perriand
  R2_MISION: "r2Mision",
  R2_DOCUMENTOS: "r2Documentos",
  R2_PATENTE: "r2Patente",
  R2_IDENTIFICAR: "r2Identificar",
  R2_CARTA: "r2Carta",
  R2_CONTRASTAR: "r2Contrastar",
  R2_RESTITUIR: "r2Restituir",
  R2_RESTAURADA: "r2Restaurada",
  R2_OJO: "r2Ojo",
  R2_GALERIA: "r2Galeria",
  R2_CIERRE: "r2Cierre",
  // Reto 3 · El trabajo que tenía género
  R3_EXAMINAR: "r3Examinar",
  R3_CLASIFICAR: "r3Clasificar",
  R3_CONTRASTAR: "r3Contrastar",
  R3_CONTEXTUALIZAR: "r3Contextualizar",
  R3_REPARTO: "r3Reparto",
  R3_CIERRE: "r3Cierre",
  // Reto 4 · La frontera profesional
  R4_INTRO: "r4Intro",
  R4_JUEGO: "r4Juego",
  R4_DERROTA: "r4Derrota",
  R4_VICTORIA: "r4Victoria",
};

/* Cada sala coloca su ilustración donde la pone el diseño. */
const ILUSTRACION_SALA_2 = (
  <img
    src={archivador}
    alt=""
    aria-hidden="true"
    className="pointer-events-none absolute left-[20px] top-[83px] block h-[338px] w-[372px] max-w-none"
  />
);

const ILUSTRACION_SALA_3 = (
  <>
    <img
      src={carpetaA}
      alt=""
      aria-hidden="true"
      className="pointer-events-none absolute left-[106px] top-[98px] block h-[250.7px] w-[148.7px] max-w-none"
    />
    <img
      src={carpetaB}
      alt=""
      aria-hidden="true"
      className="pointer-events-none absolute left-[158.2px] top-[123.5px] block h-[250.7px] w-[148.8px] max-w-none"
    />
  </>
);

const ILUSTRACION_SALA_4 = (
  <img
    src={caja4}
    alt=""
    aria-hidden="true"
    className="pointer-events-none absolute left-[72px] top-[120px] block h-[273px] w-[268px] max-w-none"
  />
);

const DESCRIPCION_SALA =
  "Que una decisión de diseño aparentemente neutral puede reproducir una " +
  "perspectiva particular cuando se convierte en estándar para todas las personas.";

/**
 * Archivo del Museo de las Ausencias.
 *
 *  carrusel (fachada + qué podrás hacer) → menu (una sala por pantalla)
 *
 *  Sala 1 · El cuerpo que no estaba en el modelo
 *    01 Misión → 02 Expedientes → 03 A / 04 B (hay que abrir los dos)
 *    → 05 Comparar → 06-10 Pregunta (3 intentos; sólo se avanza acertando)
 *       · acierta  → 12 Correcta → 13 Encuentra la escultura → 13 Bodega
 *                    → 14 Reto completado → 15 Sala 1
 *       · 3 fallos → 11 Sin intentos → salir al archivo
 *
 *  Sala 2 · El caso Perriand
 *    Misión → Documentos → Patente → Identificar → Carta → Contrastar
 *    → Restituir la firma → Patente restaurada → Ojo al dato → Sala 2
 *    → Cierre
 *
 * El ojo de la barra superior vuelve al archivo desde cualquier pantalla.
 */
export default function App() {
  const [screen, setScreen] = useState(SCREENS.CARRUSEL);
  // Reto 1
  const [leidoA, setLeidoA] = useState(false);
  const [leidoB, setLeidoB] = useState(false);
  const [volverDeB, setVolverDeB] = useState(SCREENS.EXPEDIENTES);
  const [intentosUsados, setIntentosUsados] = useState(0);
  const [resuelta, setResuelta] = useState(false);
  // Reto 2: nombres marcados en la patente de 1928
  const [identificados, setIdentificados] = useState([]);
  // Reto 4: resultado de la última partida y nº de intento (remonta el juego)
  const [partida, setPartida] = useState({ puntos: 0, avance: 0, obstaculo: null });
  const [intento, setIntento] = useState(0);

  const irAlArchivo = () => setScreen(SCREENS.MENU);
  const irAlArchivo2 = () => setScreen(SCREENS.MENU_2);
  const irAlArchivo3 = () => setScreen(SCREENS.MENU_3);
  const irAlArchivo4 = () => setScreen(SCREENS.MENU_4);

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

  const reiniciar2 = () => {
    setIdentificados([]);
    setScreen(SCREENS.MENU_2);
  };

  const home = { onHome: irAlArchivo };
  const ir = (destino) => () => setScreen(destino);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0b0b14] py-10">
      {screen === SCREENS.CARRUSEL && <Carrusel onExplorar={irAlArchivo} />}

      {screen === SCREENS.MENU && (
        <Menu
          sala="Sala 1"
          titulo="El conocimiento desde una sola mirada"
          descripcion={DESCRIPCION_SALA}
          onBack={ir(SCREENS.CARRUSEL)}
          onSalaAnterior={irAlArchivo4}
          onSalaSiguiente={irAlArchivo2}
          onEntrar={ir(SCREENS.MISION)}
        />
      )}

      {screen === SCREENS.MENU_2 && (
        <Menu
          sala="Sala 2"
          titulo="Cuando saber no significa, ser escuchada"
          descripcion={DESCRIPCION_SALA}
          ilustracion={ILUSTRACION_SALA_2}
          onBack={ir(SCREENS.CARRUSEL)}
          onSalaAnterior={irAlArchivo}
          onSalaSiguiente={irAlArchivo3}
          onEntrar={ir(SCREENS.R2_MISION)}
        />
      )}

      {screen === SCREENS.MENU_3 && (
        <Menu
          sala="Sala 3"
          titulo="El trabajo que tenía género"
          descripcion={
            "Las actividades y responsabilidades se distribuyeron según roles " +
            "de género, creando jerarquías entre el trabajo productivo, técnico " +
            "y público y el trabajo doméstico, textil y artesanal."
          }
          ilustracion={ILUSTRACION_SALA_3}
          descripcionAncho={319}
          descripcionTop={611}
          onBack={ir(SCREENS.CARRUSEL)}
          onSalaAnterior={irAlArchivo2}
          onSalaSiguiente={irAlArchivo4}
          onEntrar={ir(SCREENS.R3_EXAMINAR)}
        />
      )}

      {screen === SCREENS.MENU_4 && (
        <Menu
          sala="Sala 4"
          titulo="El lugar que no estaba destinado para ella"
          descripcion={
            "Las expectativas de género se traducen en barreras concretas de " +
            "acceso a áreas, oportunidades, cargos y espacios de decisión."
          }
          ilustracion={ILUSTRACION_SALA_4}
          descripcionAncho={292}
          descripcionTop={611}
          onBack={ir(SCREENS.CARRUSEL)}
          onSalaAnterior={irAlArchivo3}
          onSalaSiguiente={irAlArchivo}
          onEntrar={ir(SCREENS.R4_INTRO)}
        />
      )}

      {/* ---------- Sala 1 ---------- */}

      {screen === SCREENS.MISION && (
        <MisionDelReto
          {...home}
          onBack={irAlArchivo}
          onOpenExpediente={ir(SCREENS.EXPEDIENTES)}
        />
      )}

      {screen === SCREENS.EXPEDIENTES && (
        <Expedientes
          {...home}
          onBack={ir(SCREENS.MISION)}
          onOpenA={abrirA}
          onOpenB={() => abrirB(SCREENS.EXPEDIENTES)}
          onComparar={ir(SCREENS.COMPARAR)}
          leidoA={leidoA}
          leidoB={leidoB}
        />
      )}

      {screen === SCREENS.EXPEDIENTE_A && (
        <ExpedienteA
          {...home}
          onBack={ir(SCREENS.EXPEDIENTES)}
          onLeerExpedienteB={() => abrirB(SCREENS.EXPEDIENTE_A)}
        />
      )}

      {screen === SCREENS.EXPEDIENTE_B && (
        <ExpedienteB
          {...home}
          onBack={() => setScreen(volverDeB)}
          onComparar={ir(SCREENS.COMPARAR)}
          puedeComparar={leidoA}
        />
      )}

      {screen === SCREENS.COMPARAR && (
        <Comparar
          {...home}
          onBack={ir(SCREENS.EXPEDIENTES)}
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
          onBack={ir(SCREENS.COMPARAR)}
          onIrALaBodega={ir(SCREENS.BODEGA)}
        />
      )}

      {screen === SCREENS.BODEGA && (
        <Bodega
          {...home}
          onBack={ir(SCREENS.CORRECTA)}
          onEntrarALaBodega={ir(SCREENS.BODEGA_VISTA)}
        />
      )}

      {screen === SCREENS.BODEGA_VISTA && (
        <BodegaVista
          {...home}
          onBack={ir(SCREENS.BODEGA)}
          onEncontrar={ir(SCREENS.COMPLETADO)}
        />
      )}

      {screen === SCREENS.COMPLETADO && (
        <RetoCompletado
          {...home}
          onBack={ir(SCREENS.BODEGA_VISTA)}
          onVerLaSala={ir(SCREENS.SALA)}
        />
      )}

      {screen === SCREENS.SALA && (
        <SalaExposicion
          {...home}
          onBack={ir(SCREENS.COMPLETADO)}
          onVolver={reiniciar}
        />
      )}

      {/* ---------- Sala 2 ---------- */}

      {screen === SCREENS.R2_MISION && (
        <R2Mision
          onHome={irAlArchivo2}
          onBack={irAlArchivo2}
          onAbrir={ir(SCREENS.R2_DOCUMENTOS)}
        />
      )}

      {screen === SCREENS.R2_DOCUMENTOS && (
        <R2Documentos
          onHome={irAlArchivo2}
          onBack={ir(SCREENS.R2_MISION)}
          onVerPatente={ir(SCREENS.R2_PATENTE)}
          onVerCarta={ir(SCREENS.R2_CARTA)}
        />
      )}

      {screen === SCREENS.R2_PATENTE && (
        <R2Patente
          onHome={irAlArchivo2}
          onBack={ir(SCREENS.R2_DOCUMENTOS)}
          onSeguir={ir(SCREENS.R2_IDENTIFICAR)}
        />
      )}

      {screen === SCREENS.R2_IDENTIFICAR && (
        <R2Identificar
          onHome={irAlArchivo2}
          onBack={ir(SCREENS.R2_PATENTE)}
          onGuardar={(nombres) => {
            setIdentificados(nombres);
            setScreen(SCREENS.R2_CARTA);
          }}
        />
      )}

      {screen === SCREENS.R2_CARTA && (
        <R2Carta
          onHome={irAlArchivo2}
          onBack={ir(SCREENS.R2_IDENTIFICAR)}
          onSeguir={ir(SCREENS.R2_CONTRASTAR)}
        />
      )}

      {screen === SCREENS.R2_CONTRASTAR && (
        <R2Contrastar
          onHome={irAlArchivo2}
          onBack={ir(SCREENS.R2_CARTA)}
          onReconstruir={ir(SCREENS.R2_RESTITUIR)}
          identificados={identificados}
        />
      )}

      {screen === SCREENS.R2_RESTITUIR && (
        <R2Restituir
          onHome={irAlArchivo2}
          onBack={ir(SCREENS.R2_CONTRASTAR)}
          onRestituir={ir(SCREENS.R2_RESTAURADA)}
        />
      )}

      {screen === SCREENS.R2_RESTAURADA && (
        <R2PatenteRestaurada
          onHome={irAlArchivo2}
          onBack={ir(SCREENS.R2_RESTITUIR)}
          onSeguir={ir(SCREENS.R2_OJO)}
        />
      )}

      {screen === SCREENS.R2_OJO && (
        <R2OjoAlDato
          onHome={irAlArchivo2}
          onBack={ir(SCREENS.R2_RESTAURADA)}
          onVerLaSala={ir(SCREENS.R2_GALERIA)}
        />
      )}

      {screen === SCREENS.R2_GALERIA && (
        <R2Galeria
          onHome={irAlArchivo2}
          onBack={ir(SCREENS.R2_OJO)}
          onCerrar={ir(SCREENS.R2_CIERRE)}
        />
      )}

      {screen === SCREENS.R2_CIERRE && (
        <R2Cierre
          onHome={irAlArchivo2}
          onBack={ir(SCREENS.R2_GALERIA)}
          onVolver={reiniciar2}
        />
      )}

      {/* ---------- Sala 3 ---------- */}

      {screen === SCREENS.R3_EXAMINAR && (
        <R3Examinar
          onHome={irAlArchivo3}
          onBack={irAlArchivo3}
          onSeguir={ir(SCREENS.R3_CLASIFICAR)}
        />
      )}

      {screen === SCREENS.R3_CLASIFICAR && (
        <R3Clasificar
          onHome={irAlArchivo3}
          onBack={ir(SCREENS.R3_EXAMINAR)}
          onConfirmar={() => setScreen(SCREENS.R3_CONTRASTAR)}
        />
      )}

      {screen === SCREENS.R3_CONTRASTAR && (
        <R3Contrastar
          onHome={irAlArchivo3}
          onBack={ir(SCREENS.R3_CLASIFICAR)}
          onSeguir={ir(SCREENS.R3_CONTEXTUALIZAR)}
        />
      )}

      {screen === SCREENS.R3_CONTEXTUALIZAR && (
        <R3Contextualizar
          onHome={irAlArchivo3}
          onBack={ir(SCREENS.R3_CONTRASTAR)}
          onJugar={ir(SCREENS.R3_REPARTO)}
        />
      )}

      {screen === SCREENS.R3_REPARTO && (
        <R3Reparto
          onHome={irAlArchivo3}
          onBack={ir(SCREENS.R3_CONTEXTUALIZAR)}
          onTerminar={ir(SCREENS.R3_CIERRE)}
        />
      )}

      {screen === SCREENS.R3_CIERRE && (
        <R3Cierre
          onHome={irAlArchivo3}
          onBack={ir(SCREENS.R3_REPARTO)}
          onVolver={irAlArchivo3}
        />
      )}

      {/* ---------- Sala 4 ---------- */}

      {screen === SCREENS.R4_INTRO && (
        <R4Introduccion
          onHome={irAlArchivo4}
          onJugar={() => {
            setIntento((n) => n + 1);
            setScreen(SCREENS.R4_JUEGO);
          }}
        />
      )}

      {screen === SCREENS.R4_JUEGO && (
        <R4Juego
          key={intento}
          onMenu={irAlArchivo4}
          onFin={(resultado) => {
            setPartida(resultado);
            setScreen(
              resultado.resultado === "victoria"
                ? SCREENS.R4_VICTORIA
                : SCREENS.R4_DERROTA,
            );
          }}
        />
      )}

      {screen === SCREENS.R4_DERROTA && (
        <R4Derrota
          onHome={irAlArchivo4}
          onMenu={irAlArchivo4}
          partida={partida}
          onReintentar={() => {
            setIntento((n) => n + 1);
            setScreen(SCREENS.R4_JUEGO);
          }}
        />
      )}

      {screen === SCREENS.R4_VICTORIA && (
        <R4Victoria
          onHome={irAlArchivo4}
          partida={partida}
          onContinuar={irAlArchivo4}
        />
      )}
    </div>
  );
}
