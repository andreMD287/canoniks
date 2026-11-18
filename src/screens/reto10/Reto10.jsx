import { useState } from "react";
import { guardarRespuesta } from "../../data/respuestas";
import PantallaFinal from "../../components/PantallaFinal";
import imagenFinal from "../../assets/final-reto10.webp";
import {
  Campo,
  Destacado,
  Imagen,
  Pantalla,
  Progreso,
  Tarjeta,
  Texto,
} from "../../components/RetoUI";

const RETO = "10";

const EXPERIENCIAS = [
  {
    id: "A",
    titulo: "CONOCIMIENTO NO RECONOCIDO",
    corta: "Conocimiento no reconocido",
    texto:
      "Una diseñadora desarrolla proyectos a partir de conocimientos de su comunidad y su territorio, pero estos no son considerados suficientemente académicos por una institución.",
    resumen: "Saberes de comunidad y territorio frente a criterios académicos.",
    reveal:
      "Los criterios académicos pueden desvalorizar conocimientos territoriales y culturales. También pueden intervenir desigualdades raciales y de clase, según el contexto.",
  },
  {
    id: "B",
    titulo: "TRAYECTORIA QUE NO CUENTA",
    corta: "Trayectoria que no cuenta",
    texto:
      "Una diseñadora tiene experiencia en proyectos independientes y colaborativos, pero una convocatoria prioriza títulos y experiencia en instituciones reconocidas.",
    resumen: "Proyectos independientes frente a títulos e instituciones reconocidas.",
    reveal:
      "Los requisitos institucionales pueden favorecer a quienes han tenido mayor acceso a formación, recursos y redes profesionales.",
  },
  {
    id: "C",
    titulo: "FALTA DE REPRESENTACIÓN",
    corta: "Falta de representación",
    texto:
      "Una diseñadora encuentra pocos referentes con experiencias culturales similares a la suya en publicaciones, exposiciones y espacios de reconocimiento profesional.",
    resumen: "Pocos referentes similares en publicaciones y exposiciones.",
    reveal:
      "La falta de representación puede relacionarse con sesgos de género, raciales y culturales en los espacios de legitimación.",
  },
];

const DIMENSIONES = [
  { id: "genero", nombre: "GÉNERO", icono: "♀", texto: "Expectativas y desigualdades asociadas a ser mujer." },
  { id: "raza", nombre: "RAZA", icono: "◐", texto: "Prejuicios y jerarquías raciales que afectan el reconocimiento." },
  { id: "clase", nombre: "CLASE SOCIAL", icono: "▤", texto: "Desigualdad en el acceso a recursos y oportunidades." },
  { id: "territorio", nombre: "TERRITORIO", icono: "◎", texto: "Diferencias en el acceso y valoración de conocimientos según el lugar de origen o trabajo." },
  { id: "edad", nombre: "EDAD", icono: "◷", texto: "Prejuicios relacionados con la edad y la experiencia." },
  { id: "cultural", nombre: "PERTENENCIA CULTURAL", icono: "✦", texto: "Desvalorización de prácticas, saberes y formas de expresión culturales." },
];
const NOMBRE_DIM = Object.fromEntries(DIMENSIONES.map((d) => [d.id, d.nombre]));

/** Reto 10 · Sala 10 «Las ausencias que se cruzan»: Une las experiencias. */
export default function Reto10({ onHome, onSalir }) {
  const [paso, setPaso] = useState(0);
  const [abierta, setAbierta] = useState(null); // experiencia vista en pantalla 2
  const [dimVista, setDimVista] = useState(null); // dimensión vista en pantalla 3
  const [activa, setActiva] = useState("A"); // experiencia activa en pantalla 4
  const [conex, setConex] = useState({ A: [], B: [], C: [] });
  const [reflexion, setReflexion] = useState("");

  const ir = (n) => () => setPaso(n);
  const comunes = { reto: RETO, onHome };
  const [final, setFinal] = useState(false);
  const finalizar = () => {
    guardarRespuesta("Sala 10", reflexion, { conexiones: conex });
    setFinal(true);
  };

  if (final) {
    return (
      <PantallaFinal
        imagen={imagenFinal}
        alt="Pantalla final del reto 10: nos vemos en el debate"
        onHome={onHome}
        onBack={() => setFinal(false)}
        onVolver={onSalir}
      />
    );
  }
  const relacionadas = Object.values(conex).filter((l) => l.length > 0).length;

  const alternar = (dim) =>
    setConex((c) => ({
      ...c,
      [activa]: c[activa].includes(dim) ? c[activa].filter((x) => x !== dim) : [...c[activa], dim],
    }));

  if (paso === 0) {
    return (
      <Pantalla
        {...comunes}
        etapa="SALA 10 · LAS AUSENCIAS QUE SE CRUZAN"
        titulo="UNE LAS EXPERIENCIAS."
        onBack={onSalir}
        boton="COMENZAR RETO"
        onBoton={ir(1)}
      >
        <Imagen rotulo="Composición documental: fichas y documentos superpuestos" alto={140} />
        <Texto>
          «No todas las diseñadoras encuentran las mismas barreras. Algunas experiencias de
          invisibilización se cruzan y hacen que ciertos conocimientos sean más difíciles de
          reconocer».
        </Texto>
        <Texto>
          «En el archivo del Museo de las Ausencias encontramos diferentes situaciones relacionadas
          con la exclusión en el diseño. Tu misión será conectar cada experiencia con las
          condiciones que pueden influir en ella».
        </Texto>
      </Pantalla>
    );
  }

  if (paso === 1) {
    return (
      <Pantalla
        {...comunes}
        etapa="01 / LAS EXPERIENCIAS"
        titulo="DISTINTAS EXPERIENCIAS, DISTINTAS BARRERAS."
        onBack={ir(0)}
        boton="CONTINUAR"
        onBoton={ir(2)}
      >
        <Texto>
          «Lee cada situación. Detrás de cada una pueden existir diferentes condiciones que influyen
          en el reconocimiento de una diseñadora».
        </Texto>
        {EXPERIENCIAS.map((e) => (
          <Tarjeta
            key={e.id}
            activa={abierta === e.id}
            onClick={() => setAbierta(abierta === e.id ? null : e.id)}
            aria-expanded={abierta === e.id}
          >
            <p className="text-[11px] font-semibold">TARJETA {e.id}. {e.titulo}</p>
            <p className="mt-[6px] text-[12px] leading-[1.4]">
              {abierta === e.id ? `«${e.texto}»` : e.resumen}
            </p>
            {abierta !== e.id && <p className="mt-[4px] text-[11px] font-semibold">Toca para leerla completa ↓</p>}
          </Tarjeta>
        ))}
      </Pantalla>
    );
  }

  if (paso === 2) {
    const d = DIMENSIONES.find((x) => x.id === dimVista);
    return (
      <Pantalla
        {...comunes}
        etapa="02 / LAS DIMENSIONES"
        titulo="¿QUÉ HAY DETRÁS DE CADA EXPERIENCIA?"
        onBack={ir(1)}
        boton="RELACIONAR EXPERIENCIAS"
        onBoton={ir(3)}
      >
        <Texto>
          «Las barreras no siempre tienen una sola causa. Identifica las dimensiones que pueden
          intervenir en cada situación».
        </Texto>
        <div className="grid grid-cols-2 gap-[8px]">
          {DIMENSIONES.map((x) => (
            <Tarjeta
              key={x.id}
              activa={dimVista === x.id}
              onClick={() => setDimVista(dimVista === x.id ? null : x.id)}
              className="flex flex-col items-start gap-[4px]"
            >
              <span className="text-[20px] leading-none" aria-hidden="true">{x.icono}</span>
              <span className="text-[11px] font-extrabold leading-[1.2]">{x.nombre}</span>
            </Tarjeta>
          ))}
        </div>
        {d ? (
          <div role="status" className="rounded-[13px] bg-[var(--negro-principal)] px-[14px] py-[12px]">
            <p className="text-[12px] font-semibold text-[var(--verde-principal)]">{d.nombre}</p>
            <p className="mt-[4px] text-[13px] leading-[1.4] text-[var(--blanco-principal)]">{d.texto}</p>
          </div>
        ) : (
          <p className="text-[11px] text-[var(--blanco-principal)]/70">Toca una dimensión para leer su explicación.</p>
        )}
      </Pantalla>
    );
  }

  if (paso === 3) {
    return (
      <Pantalla
        {...comunes}
        etapa="03 / UNE LAS EXPERIENCIAS"
        titulo="CONECTA LAS DIMENSIONES."
        onBack={ir(2)}
        boton="COMPROBAR RESPUESTAS"
        onBoton={ir(4)}
        botonDeshabilitado={relacionadas === 0}
        nota={relacionadas === 0 ? "Conecta al menos una experiencia." : undefined}
      >
        <Texto>
          «Relaciona cada experiencia con las dimensiones que pueden estar interviniendo. Recuerda:
          una misma situación puede tener varias conexiones».
        </Texto>
        <Progreso valor={relacionadas} total={3} etiqueta="EXPERIENCIAS RELACIONADAS" />
        <div className="grid grid-cols-2 gap-[10px]">
          <div className="flex flex-col gap-[8px]">
            <p className="text-[10px] font-semibold text-[var(--verde-principal)]">EXPERIENCIAS</p>
            {EXPERIENCIAS.map((e) => (
              <Tarjeta
                key={e.id}
                activa={activa === e.id}
                onClick={() => setActiva(e.id)}
                className="!px-[10px]"
              >
                <p className="font-display text-[15px] font-extrabold">{e.id}. {e.corta}</p>
                <p className="mt-[2px] text-[10px] leading-[1.3]">{e.resumen}</p>
                <div className="mt-[6px] flex flex-wrap gap-[3px]">
                  {conex[e.id].map((dim) => (
                    <span
                      key={dim}
                      className={`rounded-[8px] px-[5px] py-[1px] text-[9px] font-bold ${
                        activa === e.id
                          ? "bg-[var(--negro-principal)] text-[var(--verde-principal)]"
                          : "bg-[var(--verde-principal)] text-[var(--negro-principal)]"
                      }`}
                    >
                      {NOMBRE_DIM[dim]}
                    </span>
                  ))}
                </div>
              </Tarjeta>
            ))}
          </div>
          <div className="flex flex-col gap-[8px]">
            <p className="text-[10px] font-semibold text-[var(--verde-principal)]">
              DIMENSIONES · para la {activa}
            </p>
            {DIMENSIONES.map((d) => {
              const on = conex[activa].includes(d.id);
              return (
                <Tarjeta key={d.id} activa={on} onClick={() => alternar(d.id)} className="!px-[10px] !py-[10px]">
                  <span className="text-[11px] font-extrabold">
                    {on ? "✓ " : ""}
                    {d.nombre}
                  </span>
                </Tarjeta>
              );
            })}
          </div>
        </div>
        <p className="text-[10px] text-[var(--blanco-principal)]/70">
          No hay una única respuesta correcta. Toca una dimensión de nuevo para quitar la conexión.
        </p>
      </Pantalla>
    );
  }

  if (paso === 4) {
    return (
      <Pantalla
        {...comunes}
        etapa="04 / LAS CONEXIONES REVELADAS"
        titulo="LAS AUSENCIAS SE CRUZAN."
        onBack={ir(3)}
        boton="CONTINUAR"
        onBoton={ir(5)}
      >
        <Texto>
          «Las experiencias de invisibilización no ocurren de la misma manera para todas las
          personas. Distintas condiciones sociales y culturales pueden combinarse y producir
          barreras particulares».
        </Texto>
        {EXPERIENCIAS.map((e) => (
          <div key={e.id} className="rounded-[13px] bg-[var(--blanco-principal)] px-[14px] py-[12px] text-[var(--negro-principal)]">
            <p className="text-[11px] font-semibold">EXPERIENCIA {e.id}. {e.titulo}</p>
            <div className="mt-[6px] flex flex-wrap gap-[4px]">
              {conex[e.id].length === 0 ? (
                <span className="text-[10px] italic">Sin conexiones elegidas</span>
              ) : (
                conex[e.id].map((dim) => (
                  <span key={dim} className="rounded-[8px] bg-[var(--verde-principal)] px-[6px] py-[2px] text-[10px] font-bold">
                    {NOMBRE_DIM[dim]}
                  </span>
                ))
              )}
            </div>
            <p className="mt-[8px] text-[12px] leading-[1.4]">«{e.reveal}»</p>
          </div>
        ))}
        <Destacado>
          «No existe una sola forma de vivir la exclusión. Las barreras pueden acumularse, cruzarse
          y cambiar según cada contexto».
        </Destacado>
      </Pantalla>
    );
  }

  return (
    <Pantalla
      {...comunes}
      etapa="05 / CIERRE DEL RETO"
      titulo="UN RECONOCIMIENTO MÁS AMPLIO."
      onBack={ir(4)}
      boton="FINALIZAR RECORRIDO"
      onBoton={finalizar}
    >
      <Texto>
        «Reconocer las ausencias también implica revisar las reglas con las que decidimos qué
        conocimientos, trayectorias y prácticas merecen ser reconocidos».
      </Texto>
      <Destacado etiqueta="CONEXIÓN CON EL CASO REAL">
        OCAD University y sus iniciativas Black Cluster Hire e Indigenous Cluster Hire, impulsadas
        durante 2020–2021, como respuestas institucionales orientadas a ampliar la representación
        y revisar las condiciones de contratación.
        <br />
        <br />
        El trabajo de Dori Tunstall en Decolonizing Design es una perspectiva que cuestiona las
        estructuras tradicionales de conocimiento y reconocimiento en el diseño.
      </Destacado>
      <p className="text-[11px] leading-[1.4] text-[var(--blanco-principal)]/80">
        «Estas iniciativas representan una respuesta institucional a formas de exclusión, pero no
        significan que todas las desigualdades hayan desaparecido».
      </p>
      <Texto className="font-semibold">
        «¿Qué tendría que cambiar en las instituciones para que distintas formas de diseñar y
        producir conocimiento sean reconocidas?».
      </Texto>
      <Campo valor={reflexion} onCambio={setReflexion} />
    </Pantalla>
  );
}
