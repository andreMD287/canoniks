import { useState } from "react";
import { guardarRespuesta } from "../../data/respuestas";
import PantallaFinal from "../../components/PantallaFinal";
import imagenFinal from "../../assets/final-reto08.png";
import {
  Campo,
  Destacado,
  Imagen,
  Pantalla,
  Tarjeta,
  Texto,
} from "../../components/RetoUI";
import OpcionRespuesta from "../../components/OpcionRespuesta";

const RETO = "08";
const NOMBRES = ["Producción", "Circulación", "Publicación", "Premiación", "Reconocimiento"];

/** Las cinco puertas. `correcta` es la opción válida; la puerta 2 admite varias. */
const PUERTAS = [
  {
    etapa: "PRIMERA PUERTA: PRODUCCIÓN",
    titulo: "TODO COMIENZA CON UNA CONTRIBUCIÓN.",
    texto:
      "Sylvia Harris trabajó en diseño cívico, información pública y orientación en servicios. Su trabajo buscaba mejorar la manera en que las personas interactuaban con la información y las instituciones.",
    desafio: "¿Qué demuestra el valor de un trabajo de diseño?",
    opciones: [
      "La cantidad de premios recibidos.",
      "Su capacidad para responder a problemas y necesidades reales.",
      "La cantidad de publicaciones que hablan de él.",
    ],
    correcta: "B",
    bien: "El valor de un trabajo de diseño se ve en su capacidad de responder a problemas y necesidades reales, más allá de los premios o las menciones.",
    mal: "Los premios y las publicaciones dependen de otros espacios. El valor de un trabajo está en su capacidad de responder a problemas y necesidades reales. Inténtalo de nuevo.",
    boton: "ABRIR SEGUNDA PUERTA",
  },
  {
    etapa: "SEGUNDA PUERTA: CIRCULACIÓN",
    titulo: "¿QUIÉN LLEGA A CONOCER TU TRABAJO?",
    texto:
      "«Un trabajo puede existir y generar impacto, pero ¿quién llega a conocerlo?». La circulación permite que un proyecto llegue a diferentes públicos y espacios profesionales.",
    desafio: "Selecciona los espacios donde puede circular un proyecto de diseño.",
    opciones: [
      "Redes y medios especializados.",
      "Exposiciones.",
      "Congresos profesionales.",
      "Archivos y repositorios.",
    ],
    multiple: true,
    bien: "Todos son espacios de circulación: cada uno permite que el trabajo llegue a públicos distintos.",
    boton: "ABRIR TERCERA PUERTA",
  },
  {
    etapa: "TERCERA PUERTA: PUBLICACIÓN",
    titulo: "LO QUE SE PUBLICA TAMBIÉN SE RECUERDA.",
    texto:
      "Las revistas, editoriales y medios especializados seleccionan qué proyectos y diseñadores aparecen en sus contenidos.",
    desafio: "Identifica quiénes pueden dar visibilidad editorial a una diseñadora.",
    opciones: [
      "Editoriales y revistas especializadas.",
      "Únicamente sus clientes.",
      "Exclusivamente sus compañeros de trabajo.",
    ],
    correcta: "A",
    bien: "Las editoriales y revistas especializadas seleccionan qué proyectos se publican y, con ello, qué se recuerda.",
    mal: "Los clientes y los compañeros no controlan, por sí solos, la visibilidad editorial. Piensa en quién selecciona qué se publica. Inténtalo de nuevo.",
    boton: "ABRIR CUARTA PUERTA",
  },
  {
    etapa: "CUARTA PUERTA: PREMIACIÓN",
    titulo: "¿QUIÉN OTORGA EL RECONOCIMIENTO?",
    texto:
      "«Los premios convierten ciertas trayectorias en referentes públicos». Los jurados y las instituciones evalúan, seleccionan y otorgan distinciones a determinados profesionales.",
    desafio: "¿Quién interviene directamente en la decisión de otorgar un premio?",
    opciones: [
      "El jurado y la institución organizadora.",
      "El público general exclusivamente.",
      "Los clientes de la diseñadora.",
    ],
    correcta: "A",
    bien: "El jurado y la institución organizadora evalúan, seleccionan y otorgan la distinción.",
    mal: "El público o los clientes no deciden directamente un premio: lo hacen el jurado y la institución. Inténtalo de nuevo.",
    boton: "ABRIR QUINTA PUERTA",
  },
  {
    etapa: "QUINTA PUERTA: RECONOCIMIENTO",
    titulo: "LA ÚLTIMA PUERTA NO SIEMPRE SE ABRE A TIEMPO.",
    texto:
      "Sylvia Harris falleció en 2011. En 2014 recibió póstumamente la AIGA Medal, una de las distinciones de mayor prestigio en el diseño gráfico estadounidense.",
    imagen: true,
    desafio: "¿Qué revela este caso?",
    opciones: [
      "Que el reconocimiento siempre llega junto con el impacto profesional.",
      "Que una contribución puede ser valiosa y obtener reconocimiento institucional tardíamente.",
      "Que los premios son la única forma de medir el valor del diseño.",
    ],
    correcta: "B",
    bien: "Una contribución puede ser valiosa mucho antes de recibir reconocimiento institucional: el de Sylvia Harris llegó tres años después de su muerte.",
    mal: "El caso muestra lo contrario: el reconocimiento no siempre acompaña al impacto ni es la única medida del valor. Inténtalo de nuevo.",
    boton: "DESCUBRIR EL RESULTADO",
  },
];

const LETRAS = ["A", "B", "C", "D"];

/** Una puerta del corredor. */
function Puerta({ nombre, n, estado }) {
  const fondo =
    estado === "completada"
      ? "bg-[var(--verde-principal)] text-[var(--negro-principal)]"
      : estado === "abierta"
        ? "border-2 border-solid border-[var(--verde-principal)] bg-[var(--negro-principal)] text-[var(--verde-principal)]"
        : "bg-[var(--blanco-principal)] text-[var(--negro-principal)]";
  return (
    <div className="flex flex-1 flex-col items-center gap-[6px]">
      <div
        className={`flex h-[120px] w-full items-end justify-center rounded-t-[40px] pb-[8px] text-[18px] font-extrabold ${fondo}`}
      >
        {estado === "completada" ? "✓" : n}
      </div>
      <p className="text-center text-[9px] font-semibold leading-[1.2] text-[var(--blanco-principal)]">
        {nombre}
      </p>
    </div>
  );
}

/** "n de 5 puertas" en círculos. */
const ProgresoPuertas = ({ completadas }) => (
  <div role="status" aria-label={`${completadas} de 5 puertas completadas`} className="flex items-center gap-[8px]">
    <span className="text-[11px] font-semibold text-[var(--blanco-principal)]">PUERTAS</span>
    {NOMBRES.map((_, i) => (
      <span
        key={i}
        className={`size-[22px] rounded-full text-center text-[11px] font-bold leading-[22px] ${
          i < completadas
            ? "bg-[var(--verde-principal)] text-[var(--negro-principal)]"
            : "bg-[var(--blanco-principal)] text-[var(--negro-principal)]"
        }`}
      >
        {i + 1}
      </span>
    ))}
  </div>
);

/** Reto 8 · Sala 08 «La puerta del reconocimiento»: Abre las puertas. */
export default function Reto8({ onHome, onSalir }) {
  const [paso, setPaso] = useState(0); // 0 inicio, 1 corredor, 2-6 puertas, 7 cierre
  const [sel, setSel] = useState({}); // puerta -> letra | [letras]
  const [revisada, setRevisada] = useState({}); // puerta -> true si ya comprobó
  const [reflexion, setReflexion] = useState("");

  const ir = (n) => () => setPaso(n);
  const comunes = { reto: RETO, onHome };
  const [final, setFinal] = useState(false);
  const finalizar = () => {
    guardarRespuesta("Sala 08", reflexion, { respuestas: sel });
    setFinal(true);
  };

  if (final) {
    return (
      <PantallaFinal
        imagen={imagenFinal}
        alt="Pantalla final del reto 08: nos vemos en el debate"
        onHome={onHome}
        onBack={() => setFinal(false)}
        onVolver={onSalir}
      />
    );
  }
  const completadas = PUERTAS.filter((_, i) => {
    const p = PUERTAS[i];
    if (p.multiple) return (sel[i] || []).length > 0 && revisada[i];
    return revisada[i] && sel[i] === p.correcta;
  }).length;

  if (paso === 0) {
    return (
      <Pantalla
        {...comunes}
        etapa="SALA 08 · LA PUERTA DEL RECONOCIMIENTO"
        titulo="ABRE LAS PUERTAS."
        onBack={onSalir}
        boton="COMENZAR RECORRIDO"
        onBoton={ir(1)}
      >
        <Destacado>«Un buen trabajo no siempre recibe el reconocimiento que merece».</Destacado>
        <Imagen rotulo="Recurso gráfico de puertas, archivos o espacios museográficos" alto={140} />
        <Texto>
          Sylvia Harris desarrolló proyectos de diseño que mejoraron la comunicación y el acceso a
          servicios públicos. Sin embargo, su reconocimiento institucional llegó después de su
          muerte.
        </Texto>
        <Texto>
          Tu misión es descubrir qué puertas debe atravesar una diseñadora para convertirse en un
          referente.
        </Texto>
      </Pantalla>
    );
  }

  if (paso === 1) {
    return (
      <Pantalla
        {...comunes}
        etapa="EL CORREDOR DEL RECONOCIMIENTO"
        titulo="CINCO PUERTAS, UN RECONOCIMIENTO."
        onBack={ir(0)}
        boton="ABRIR PRIMERA PUERTA"
        onBoton={ir(2)}
      >
        <Texto>
          «Para que un trabajo sea reconocido, debe atravesar diferentes espacios que determinan su
          visibilidad y legitimidad».
        </Texto>
        <ProgresoPuertas completadas={completadas} />
        <div className="flex gap-[6px]">
          {NOMBRES.map((nombre, i) => (
            <Puerta key={nombre} nombre={nombre} n={i + 1} estado={i < completadas ? "completada" : "cerrada"} />
          ))}
        </div>
        <Texto className="text-[12px]">Las puertas se abren una a una, en orden.</Texto>
      </Pantalla>
    );
  }

  if (paso >= 2 && paso <= 6) {
    const i = paso - 2;
    const p = PUERTAS[i];
    const actual = sel[i];
    const hecho = revisada[i];
    const acierta = p.multiple ? (actual || []).length > 0 : actual === p.correcta;
    const comprobar = () => setRevisada((r) => ({ ...r, [i]: true }));
    const elegir = (letra) => {
      setRevisada((r) => ({ ...r, [i]: false }));
      setSel((s) => {
        if (!p.multiple) return { ...s, [i]: letra };
        const lista = s[i] || [];
        return { ...s, [i]: lista.includes(letra) ? lista.filter((x) => x !== letra) : [...lista, letra] };
      });
    };
    const puedeAvanzar = p.multiple ? acierta && hecho : hecho && acierta;
    return (
      <Pantalla
        {...comunes}
        etapa={p.etapa}
        titulo={p.titulo}
        onBack={ir(paso - 1)}
        boton={puedeAvanzar ? p.boton : "COMPROBAR"}
        onBoton={puedeAvanzar ? ir(paso + 1) : comprobar}
        botonDeshabilitado={!puedeAvanzar && (p.multiple ? !(actual || []).length : !actual)}
        nota={!puedeAvanzar && !actual ? "Elige una respuesta para comprobar." : undefined}
      >
        <div key={paso} className="animar-puerta flex flex-col gap-[14px]">
          <ProgresoPuertas completadas={completadas} />
          {p.imagen && (
            <Imagen rotulo="Sylvia Harris (foto documental)" fuente="AIGA / archivo de la diseñadora" alto={110} />
          )}
          <Texto>{p.texto}</Texto>
          <p className="font-display text-[16px] font-extrabold text-[var(--blanco-principal)]">
            {p.desafio}
          </p>
          <div role={p.multiple ? "group" : "radiogroup"} className="flex flex-col gap-[8px]">
            {p.opciones.map((texto, k) => {
              const letra = LETRAS[k];
              if (p.multiple) {
                const on = (actual || []).includes(letra);
                return (
                  <Tarjeta key={letra} activa={on} onClick={() => elegir(letra)} className="text-[13px] font-semibold">
                    {on ? "✓ " : "○ "}
                    {texto}
                  </Tarjeta>
                );
              }
              let estado = "normal";
              if (actual === letra) estado = !hecho ? "seleccionada" : acierta ? "correcta" : "incorrecta";
              return (
                <OpcionRespuesta key={letra} multilinea id={letra} texto={texto} estado={estado} onClick={() => elegir(letra)} />
              );
            })}
          </div>
          {hecho && (
            <div role="status" className="rounded-[13px] bg-[var(--negro-principal)] px-[14px] py-[12px] text-[13px] leading-[1.4] text-[var(--blanco-principal)]">
              <b className="text-[var(--verde-principal)]">{acierta ? "Correcto. " : "Todavía no. "}</b>
              {acierta ? p.bien : p.mal}
            </div>
          )}
        </div>
      </Pantalla>
    );
  }

  return (
    <Pantalla
      {...comunes}
      etapa="CIERRE DEL EXPEDIENTE"
      titulo="EXPEDIENTE COMPLETADO."
      onBack={ir(6)}
      boton="VOLVER AL MUSEO"
      onBoton={finalizar}
    >
      <div className="flex gap-[6px]">
        {NOMBRES.map((nombre, i) => (
          <Puerta key={nombre} nombre={nombre} n={i + 1} estado="completada" />
        ))}
      </div>
      <Texto className="font-semibold">
        «Una diseñadora puede transformar la sociedad con su trabajo, pero su reconocimiento
        depende también de quienes controlan los espacios de visibilidad y legitimación».
      </Texto>
      <Destacado etiqueta="APRENDIZAJE">
        Los sistemas de legitimación están conformados por instituciones, premios, publicaciones,
        jurados, museos y espacios profesionales que determinan qué trabajos reciben prestigio y se
        convierten en referentes.
      </Destacado>
      <Texto>
        ¿Quién controla las puertas por las que una diseñadora debe pasar para convertirse en
        referente?
      </Texto>
      <Campo valor={reflexion} onCambio={setReflexion} />
    </Pantalla>
  );
}
