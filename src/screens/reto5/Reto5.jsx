import { useState } from "react";
import { guardarRespuesta } from "../../data/respuestas";
import PantallaFinal from "../../components/PantallaFinal";
import imagenFinal from "../../assets/final-reto05.webp";
import {
  Campo,
  Destacado,
  Imagen,
  Pantalla,
  Progreso,
  Tarjeta,
  Texto,
  Ventana,
} from "../../components/RetoUI";

const RETO = "05";
const FUENTE = "Souls Grown Deep / archivos de museos";

const PIEZAS = [
  { id: 0, nombre: "Pieza 1", inicial: "MANUALIDAD DOMÉSTICA", clave: "MANUALIDAD" },
  { id: 1, nombre: "Pieza 2", inicial: "ARTESANÍA TEXTIL", clave: "ARTESANÍA" },
  { id: 2, nombre: "Pieza 3", inicial: "PIEZA DECORATIVA", clave: "PIEZA DECORATIVA" },
];

const EXPLICACIONES = {
  MANUALIDAD:
    "Puede asociarse con una actividad doméstica o recreativa y ser considerada de menor complejidad.",
  ARTESANÍA:
    "Suele relacionarse con conocimientos técnicos y producción manual, aunque puede recibir menor prestigio que el diseño industrial.",
  "PIEZA DECORATIVA":
    "Destaca su función estética y puede dejar en segundo plano sus procesos técnicos y compositivos.",
};

const CATEGORIAS = ["DISEÑO", "ARTE", "ARTESANÍA", "MANUALIDAD"];
const CRITERIOS = ["Técnica", "Composición", "Materiales", "Función", "Proceso de elaboración"];

/** Reto 5 · Sala 05 «Lo que llamaron manualidad»: Cambia la etiqueta. */
export default function Reto5({ onHome, onSalir }) {
  const [paso, setPaso] = useState(0);
  const [ampliada, setAmpliada] = useState(null);
  const [etiquetaVista, setEtiquetaVista] = useState({}); // pieza -> true
  const [pieza, setPieza] = useState(0);
  const [categoria, setCategoria] = useState([null, null, null]);
  const [criterios, setCriterios] = useState([[], [], []]);
  const [reflexion, setReflexion] = useState("");

  const clasificadas = categoria.filter(Boolean).length;
  const ir = (n) => () => setPaso(n);
  const comunes = { reto: RETO, onHome };
  const [final, setFinal] = useState(false);
  const finalizar = () => {
    guardarRespuesta("Sala 05", reflexion, { categorias: categoria, criterios });
    setFinal(true);
  };

  if (final) {
    return (
      <PantallaFinal
        imagen={imagenFinal}
        alt="Pantalla final del reto 05: nos vemos en el debate"
        onHome={onHome}
        onBack={() => setFinal(false)}
        onVolver={onSalir}
      />
    );
  }

  const elegirCategoria = (c) =>
    setCategoria((a) => a.map((v, i) => (i === pieza ? (v === c ? null : c) : v)));
  const alternarCriterio = (c) =>
    setCriterios((a) =>
      a.map((lista, i) =>
        i !== pieza ? lista : lista.includes(c) ? lista.filter((x) => x !== c) : [...lista, c],
      ),
    );

  if (paso === 0) {
    return (
      <Pantalla
        {...comunes}
        etapa="SALA 05 · LO QUE LLAMARON MANUALIDAD"
        titulo="CAMBIA LA ETIQUETA."
        onBack={onSalir}
        boton="COMENZAR RETO"
        onBoton={ir(1)}
      >
        <Imagen rotulo="Quilt de Gee's Bend (pieza protagonista)" fuente={FUENTE} alto={170} />
        <Texto>
          «Una misma producción puede recibir diferentes nombres. Pero ¿qué hace que algo sea
          considerado diseño y no una simple manualidad?».
        </Texto>
        <Texto>
          «En el archivo del Museo de las Ausencias encontramos piezas textiles elaboradas por las
          quilters de Gee&apos;s Bend. Sus composiciones, materiales y técnicas revelan
          conocimientos que no siempre han recibido el mismo reconocimiento que otras producciones
          de diseño».
        </Texto>
        <Texto>
          «Tu misión será examinar sus características y cuestionar las etiquetas con las que han
          sido clasificadas».
        </Texto>
      </Pantalla>
    );
  }

  if (paso === 1) {
    return (
      <Pantalla
        {...comunes}
        etapa="01 / OBSERVAR · TRES PIEZAS"
        titulo="OBSERVA ANTES DE CLASIFICAR."
        onBack={ir(0)}
        boton="CONTINUAR"
        onBoton={ir(2)}
        overlay={
          ampliada !== null && (
            <Ventana onCerrar={() => setAmpliada(null)} cerrar="Volver a las tres piezas">
              <p className="text-[12px] font-semibold text-[var(--verde-principal)]">
                {PIEZAS[ampliada].nombre} · vista ampliada
              </p>
              <Imagen
                rotulo={`Foto ampliada de la ${PIEZAS[ampliada].nombre.toLowerCase()}: composición, costuras y fragmentos`}
                fuente={FUENTE}
                alto={260}
              />
              <Texto className="text-[12px]">
                Observa la composición, los materiales, las costuras y la organización de los
                fragmentos textiles.
              </Texto>
            </Ventana>
          )
        }
      >
        <Texto>«Antes de ponerle un nombre a una producción, observa cómo está construida».</Texto>
        {PIEZAS.map((p) => (
          <Tarjeta key={p.id} onClick={() => setAmpliada(p.id)} aria-label={`Ampliar ${p.nombre}`}>
            <div className="flex gap-[12px]">
              <div className="w-[96px] shrink-0">
                <Imagen rotulo={p.nombre} alto={84} fuente={undefined} className="!border-[var(--negro-principal)]/40 [&_span]:!text-[var(--negro-principal)]" />
              </div>
              <div className="text-[12px] leading-[1.35]">
                <p className="font-display text-[15px] font-extrabold">{p.nombre}</p>
                <p>Identificación documental: pendiente.</p>
                <p>Materiales: pendiente de documentar.</p>
                <p className="mt-[4px] font-semibold">Toca para ampliar ↗</p>
              </div>
            </div>
          </Tarjeta>
        ))}
      </Pantalla>
    );
  }

  if (paso === 2) {
    const vistas = Object.keys(etiquetaVista).length;
    return (
      <Pantalla
        {...comunes}
        etapa="02 / ETIQUETA ORIGINAL"
        titulo="¿CÓMO SE HA NOMBRADO ESTA PRODUCCIÓN?"
        onBack={ir(1)}
        boton="CAMBIAR LAS ETIQUETAS"
        onBoton={ir(3)}
        nota={vistas < 3 ? "Toca cada etiqueta para leer su explicación." : undefined}
      >
        <Texto>
          «Las palabras que utilizamos para describir un objeto también influyen en la manera en
          que lo valoramos».
        </Texto>
        {PIEZAS.map((p) => {
          const abierta = etiquetaVista[p.id];
          return (
            <div key={p.id} className="flex flex-col gap-[8px]">
              <div className="flex items-center gap-[12px]">
                <div className="w-[84px] shrink-0">
                  <Imagen rotulo={p.nombre} alto={64} />
                </div>
                <Tarjeta
                  activa={abierta}
                  onClick={() => setEtiquetaVista((v) => ({ ...v, [p.id]: !v[p.id] }))}
                  className="flex-1 text-[13px] font-semibold"
                >
                  {p.inicial}
                </Tarjeta>
              </div>
              {abierta && (
                <p className="rounded-[10px] bg-[var(--blanco-principal)]/10 px-[12px] py-[8px] text-[12px] leading-[1.4] text-[var(--blanco-principal)]">
                  <b>{p.clave}:</b> {EXPLICACIONES[p.clave]}
                </p>
              )}
            </div>
          );
        })}
        <p className="text-[10px] leading-[1.4] text-[var(--blanco-principal)]/70">
          Etiquetas didácticas para el ejercicio: no son clasificaciones históricas verificadas de
          las piezas.
        </p>
        <Destacado>
          ¿Estas etiquetas permiten reconocer todo el trabajo que hay detrás de cada pieza?
        </Destacado>
      </Pantalla>
    );
  }

  if (paso === 3) {
    return (
      <Pantalla
        {...comunes}
        etapa="03 / RECLASIFICAR"
        titulo="RECLASIFICA LAS PIEZAS."
        onBack={ir(2)}
        boton="COMPROBAR MI CLASIFICACIÓN"
        onBoton={ir(4)}
        botonDeshabilitado={clasificadas < 3}
        nota={clasificadas < 3 ? "Clasifica las tres piezas para comprobar." : undefined}
      >
        <Texto>
          «Ahora observa cada producción desde sus características. Elige una etiqueta que
          consideres adecuada y descubre qué aspectos permite reconocer».
        </Texto>
        <Progreso valor={clasificadas} total={3} etiqueta="PIEZAS CLASIFICADAS" />
        <div role="tablist" className="flex gap-[8px]">
          {PIEZAS.map((p) => (
            <button
              key={p.id}
              type="button"
              role="tab"
              aria-selected={pieza === p.id}
              onClick={() => setPieza(p.id)}
              className={`flex-1 rounded-[20px] py-[8px] text-[12px] font-semibold ${
                pieza === p.id
                  ? "bg-[var(--verde-principal)] text-[var(--negro-principal)]"
                  : "bg-[var(--blanco-principal)] text-[var(--negro-principal)]"
              }`}
            >
              {p.nombre}
              {categoria[p.id] ? " ✓" : ""}
            </button>
          ))}
        </div>
        <div className="relative">
          <Imagen rotulo={`${PIEZAS[pieza].nombre} (foto siempre visible)`} fuente={FUENTE} alto={150} />
          {categoria[pieza] && (
            <span className="absolute left-[10px] top-[10px] rounded-[6px] bg-[var(--verde-principal)] px-[8px] py-[3px] text-[11px] font-bold text-[var(--negro-principal)]">
              {categoria[pieza]}
            </span>
          )}
        </div>
        <div className="grid grid-cols-2 gap-[8px]" role="group" aria-label="Categorías">
          {CATEGORIAS.map((c) => (
            <Tarjeta
              key={c}
              activa={categoria[pieza] === c}
              onClick={() => elegirCategoria(c)}
              className="text-center text-[13px] font-semibold"
            >
              {c}
            </Tarjeta>
          ))}
        </div>
        <p className="text-[12px] font-semibold text-[var(--verde-principal)]">
          ¿QUÉ CARACTERÍSTICAS RESPALDAN TU CLASIFICACIÓN?
        </p>
        <div className="flex flex-wrap gap-[8px]">
          {CRITERIOS.map((c) => (
            <Tarjeta
              key={c}
              activa={criterios[pieza].includes(c)}
              onClick={() => alternarCriterio(c)}
              className="!rounded-[20px] !px-[12px] !py-[7px] text-[12px] font-semibold"
            >
              {c}
            </Tarjeta>
          ))}
        </div>
        <p className="text-[10px] text-[var(--blanco-principal)]/70">
          No hay una única categoría correcta: las categorías pueden superponerse.
        </p>
      </Pantalla>
    );
  }

  if (paso === 4) {
    return (
      <Pantalla
        {...comunes}
        etapa="04 / ¿QUÉ CAMBIÓ?"
        titulo="UNA ETIQUETA CAMBIA LA MIRADA."
        onBack={ir(3)}
        boton="CONTINUAR"
        onBoton={ir(5)}
      >
        <Texto>
          «Al observar una producción desde sus materiales, técnicas, composición y procesos,
          descubrimos aspectos que una etiqueta puede dejar en segundo plano».
        </Texto>
        <Imagen rotulo="Pieza 1 (misma foto en ambos bloques)" fuente={FUENTE} alto={110} />
        <div className="rounded-[13px] bg-[var(--blanco-principal)] px-[14px] py-[12px] text-[var(--negro-principal)]">
          <p className="text-[11px] font-semibold">ANTES</p>
          <p className="font-display mt-[4px] text-[16px] font-extrabold">Manualidad doméstica</p>
          <p className="mt-[4px] text-[12px] leading-[1.4]">
            Una clasificación que puede reducir la interpretación de la pieza a su asociación con
            el trabajo doméstico.
          </p>
        </div>
        <div className="rounded-[13px] bg-[var(--verde-principal)] px-[14px] py-[12px] text-[var(--negro-principal)]">
          <p className="text-[11px] font-semibold">DESPUÉS</p>
          <p className="font-display mt-[4px] text-[16px] font-extrabold">
            Producción textil con decisiones compositivas y técnicas
          </p>
          <p className="mt-[4px] text-[12px] leading-[1.4]">
            Una descripción que hace visibles los materiales, conocimientos y procesos
            involucrados.
          </p>
        </div>
        <Destacado>
          Cambiar la etiqueta no transforma el objeto. Transforma los aspectos que elegimos
          observar y reconocer.
        </Destacado>
        <Texto>
          ¿Qué conocimientos quedan invisibilizados cuando una producción se clasifica únicamente
          como manualidad?
        </Texto>
      </Pantalla>
    );
  }

  return (
    <Pantalla
      {...comunes}
      etapa="05 / CIERRE DEL RETO"
      titulo="EL VALOR TAMBIÉN ESTÁ EN LOS CRITERIOS."
      onBack={ir(4)}
      boton="FINALIZAR RECORRIDO"
      onBoton={finalizar}
    >
      <Texto>
        «Llamar a una producción manualidad, artesanía, arte o diseño no es una decisión neutral.
        Las categorías pueden influir en su valoración cultural, económica e histórica».
      </Texto>
      <Destacado etiqueta="APRENDIZAJE">
        Las quilters de Gee&apos;s Bend permiten cuestionar la jerarquía que ha separado ciertas
        prácticas textiles de las categorías tradicionales del arte y el diseño, pese a sus
        conocimientos técnicos, decisiones formales y procesos de creación.
      </Destacado>
      <Texto className="font-semibold">
        ¿Qué criterios hacen que una producción sea reconocida como diseño y otra sea clasificada
        como artesanía o manualidad?
      </Texto>
      <Campo valor={reflexion} onCambio={setReflexion} />
    </Pantalla>
  );
}
