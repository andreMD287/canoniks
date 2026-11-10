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
import archivador from "./assets/menu2-archivador.svg";
import { MAX_INTENTOS } from "./data/pregunta";

const SCREENS = {
  CARRUSEL: "carrusel",
  MENU: "menu",
  MENU_2: "menu2",
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
};

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

  const irAlArchivo = () => setScreen(SCREENS.MENU);
  const irAlArchivo2 = () => setScreen(SCREENS.MENU_2);

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
          onSalaAnterior={irAlArchivo2}
          onSalaSiguiente={irAlArchivo2}
          onEntrar={ir(SCREENS.MISION)}
        />
      )}

      {screen === SCREENS.MENU_2 && (
        <Menu
          sala="Sala 2"
          titulo="Cuando saber no significa, ser escuchada"
          descripcion={DESCRIPCION_SALA}
          ilustracion={archivador}
          onBack={ir(SCREENS.CARRUSEL)}
          onSalaAnterior={irAlArchivo}
          onSalaSiguiente={irAlArchivo}
          onEntrar={ir(SCREENS.R2_MISION)}
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
    </div>
  );
}
