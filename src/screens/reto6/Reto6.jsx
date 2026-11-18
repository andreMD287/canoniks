import { useState } from "react";
import { guardarRespuesta } from "../../data/respuestas";
import PantallaFinal from "../../components/PantallaFinal";
import imagenFinal from "../../assets/final-reto06.webp";
import {
  Campo,
  Destacado,
  Imagen,
  Pantalla,
  Tarjeta,
  Texto,
} from "../../components/RetoUI";

const RETO = "06";
const FUENTE = "archivo de textiles comunitarios";

const DECISIONES = [
  {
    titulo: "El primer acercamiento",
    situacion:
      "Una marca de diseño conoce el trabajo de una comunidad de artesanas y quiere utilizar sus técnicas textiles para desarrollar una colección comercial.",
    pregunta: "¿Cómo debería comenzar el proyecto?",
    imagen: "Artesanas tejiendo en fibras naturales",
    A: "La marca toma fotografías de las piezas y comienza a desarrollar productos inspirados en ellas.",
    B: "La marca se reúne con las artesanas, escucha sus propuestas y acuerda con ellas las condiciones del proyecto.",
    fbA: "Sin un acuerdo previo, el uso de los conocimientos y diseños puede dejar por fuera a quienes los desarrollaron.",
    fbB: "Reconocer a las creadoras desde el comienzo permite construir una relación basada en el diálogo y la participación.",
    boton: "CONTINUAR",
  },
  {
    titulo: "El desarrollo de la colección",
    situacion:
      "Las artesanas muestran sus patrones, técnicas y prototipos. El equipo de diseño quiere adaptar algunas piezas para producir una colección comercial.",
    pregunta: "¿Cómo deberían desarrollar las nuevas propuestas?",
    imagen: "Patrones textiles, tejidos y materiales en proceso",
    A: "El equipo de diseño modifica los patrones por su cuenta y decide cuáles utilizar en la colección.",
    B: "Las modificaciones se conversan con las artesanas y se desarrollan conjuntamente, respetando sus conocimientos y decisiones.",
    fbA: "Cuando las decisiones se toman sin las creadoras, sus conocimientos pueden utilizarse mientras su participación queda relegada.",
    fbB: "La co-creación permite que las artesanas participen en las decisiones y mantengan un papel activo en el desarrollo del producto.",
    boton: "CONTINUAR",
  },
  {
    titulo: "La llegada al mercado",
    situacion:
      "La colección está terminada y una tienda de diseño quiere comercializarla. La marca prepara las etiquetas, el catálogo y la campaña de lanzamiento.",
    pregunta: "¿Cómo deberían presentar las piezas?",
    imagen: "Productos textiles terminados, etiquetas y catálogo",
    A: "La marca presenta los productos bajo su propio nombre, destacando únicamente al equipo de diseño.",
    B: "La marca reconoce a las artesanas y a la comunidad, documenta sus aportes y acuerda cómo se compartirán los beneficios comerciales.",
    fbA: "Cuando la marca recibe todo el reconocimiento, las contribuciones de las artesanas pueden desaparecer de la historia del producto.",
    fbB: "Reconocer a las creadoras implica visibilizar sus aportes y establecer acuerdos sobre los beneficios derivados de la comercialización.",
    boton: "VER RESULTADO",
  },
];

const ETAPAS = ["Primer acercamiento", "Desarrollo", "Llegada al mercado"];

/** Reto 6 · Sala 06 «¿De quién es la idea?»: La decisión final. */
export default function Reto6({ onHome, onSalir }) {
  const [paso, setPaso] = useState(0);
  const [dec, setDec] = useState([null, null, null]);
  const [revisada, setRevisada] = useState(0); // decisión abierta en el resultado
  const [reflexion, setReflexion] = useState("");

  const ir = (n) => () => setPaso(n);
  const comunes = { reto: RETO, onHome };
  const [final, setFinal] = useState(false);
  const finalizar = () => {
    guardarRespuesta("Sala 06", reflexion, { decisiones: dec });
    setFinal(true);
  };

  if (final) {
    return (
      <PantallaFinal
        imagen={imagenFinal}
        alt="Pantalla final del reto 06: nos vemos en el debate"
        onHome={onHome}
        onBack={() => setFinal(false)}
        onVolver={onSalir}
      />
    );
  }

  if (paso === 0) {
    return (
      <Pantalla
        {...comunes}
        etapa="SALA 06 · ¿DE QUIÉN ES LA IDEA?"
        titulo="La decisión final"
        onBack={onSalir}
        boton="COMENZAR"
        onBoton={ir(1)}
      >
        <p className="font-display text-[18px] font-extrabold text-[var(--blanco-principal)]">
          ¿Colaboración o apropiación?
        </p>
        <Imagen rotulo="Artesanas trabajando en tejidos" fuente={FUENTE} alto={150} />
        <Texto>
          «Una comunidad de artesanas ha desarrollado una técnica y una serie de patrones textiles
          a partir de sus conocimientos y tradiciones. Una marca de diseño se interesa en trabajar
          con ellas para crear una nueva colección. Pero ¿cómo garantizar que esta colaboración sea
          justa para todas las personas involucradas?»
        </Texto>
        <Destacado etiqueta="TU MISIÓN">
          «Acompaña el proyecto y toma decisiones para descubrir cuándo una colaboración reconoce
          a sus creadoras y cuándo puede convertirse en apropiación».
        </Destacado>
      </Pantalla>
    );
  }

  if (paso >= 1 && paso <= 3) {
    const i = paso - 1;
    const d = DECISIONES[i];
    const elegida = dec[i];
    const elegir = (op) => setDec((a) => a.map((v, k) => (k === i ? op : v)));
    return (
      <Pantalla
        {...comunes}
        etapa={`DECISIÓN ${paso} DE 3`}
        titulo={d.titulo}
        onBack={ir(paso - 1)}
        boton={d.boton}
        onBoton={ir(paso + 1)}
        botonDeshabilitado={!elegida}
        nota={!elegida ? "Elige una opción para continuar." : undefined}
      >
        <Imagen rotulo={d.imagen} fuente={FUENTE} alto={100} />
        <Texto>{d.situacion}</Texto>
        <p className="font-display text-[17px] font-extrabold text-[var(--blanco-principal)]">
          «{d.pregunta}»
        </p>
        {["A", "B"].map((op) => (
          <Tarjeta
            key={op}
            activa={elegida === op}
            onClick={() => elegir(op)}
            className="text-[13px] leading-[1.4]"
          >
            <span className="font-display mr-[8px] text-[15px] font-extrabold">OPCIÓN {op}</span>
            <br />
            {d[op]}
          </Tarjeta>
        ))}
        {elegida && (
          <div role="status" className="rounded-[13px] bg-[var(--negro-principal)] px-[14px] py-[12px]">
            <p className="text-[12px] font-semibold text-[var(--verde-principal)]">
              RETROALIMENTACIÓN
            </p>
            <p className="mt-[4px] text-[13px] leading-[1.4] text-[var(--blanco-principal)]">
              {d[`fb${elegida}`]}
            </p>
            <p className="mt-[6px] text-[10px] text-[var(--blanco-principal)]/60">
              Puedes cambiar tu elección antes de continuar.
            </p>
          </div>
        )}
      </Pantalla>
    );
  }

  if (paso === 4) {
    const abierta = DECISIONES[revisada];
    const clasif = (op) => (op === "B" ? "Colaboración reconocida" : "Riesgo de apropiación");
    return (
      <Pantalla
        {...comunes}
        etapa="RESULTADO"
        titulo="¿Colaboración o apropiación?"
        onBack={ir(3)}
        boton="CONTINUAR"
        onBoton={ir(5)}
      >
        <Texto>
          «Has recorrido tres momentos de un proceso de diseño. Ahora observa cómo tus decisiones
          transformaron la relación entre la marca y la comunidad».
        </Texto>
        <div className="flex flex-col gap-[8px]">
          {DECISIONES.map((d, i) => (
            <Tarjeta
              key={d.titulo}
              activa={revisada === i}
              onClick={() => setRevisada(i)}
              className="flex items-center justify-between gap-[10px]"
            >
              <span>
                <span className="block text-[10px] font-semibold">DECISIÓN {i + 1} · {ETAPAS[i]}</span>
                <span className="block text-[13px] font-semibold">Elegiste la opción {dec[i]}</span>
              </span>
              <span
                className={`rounded-[10px] px-[8px] py-[3px] text-[10px] font-bold ${
                  dec[i] === "B"
                    ? "bg-[var(--negro-principal)] text-[var(--verde-principal)]"
                    : "bg-[var(--morado-principal)] text-[var(--blanco-principal)]"
                }`}
              >
                {clasif(dec[i])}
              </span>
            </Tarjeta>
          ))}
        </div>
        <p className="rounded-[10px] bg-[var(--blanco-principal)]/10 px-[12px] py-[8px] text-[12px] leading-[1.4] text-[var(--blanco-principal)]">
          {abierta[`fb${dec[revisada]}`]}
        </p>
        <div className="rounded-[13px] bg-[var(--verde-principal)] px-[14px] py-[10px] text-[12px] leading-[1.4] text-[var(--negro-principal)]">
          <b>COLABORACIÓN RECONOCIDA</b>
          <br />
          Cuando existe participación, consentimiento, reconocimiento de aportes y acuerdos sobre
          los beneficios.
        </div>
        <div className="rounded-[13px] bg-[var(--morado-principal)] px-[14px] py-[10px] text-[12px] leading-[1.4] text-[var(--blanco-principal)]">
          <b>RIESGO DE APROPIACIÓN</b>
          <br />
          Cuando se utilizan conocimientos o creaciones sin autorización, se excluye a sus
          creadores de las decisiones o se borra su contribución.
        </div>
        <Destacado>
          «Trabajar con una comunidad no significa necesariamente trabajar en colaboración con
          ella. La diferencia está en quién decide, quién participa y quién recibe el
          reconocimiento».
        </Destacado>
      </Pantalla>
    );
  }

  return (
    <Pantalla
      {...comunes}
      etapa="CIERRE DEL RETO"
      titulo="El crédito también se construye"
      onBack={ir(4)}
      boton="FINALIZAR RECORRIDO"
      onBoton={finalizar}
    >
      <Texto>
        «La apropiación y el borramiento de la autoría ocurren cuando los conocimientos y las
        creaciones de otras personas son utilizados sin reconocer adecuadamente su origen y sus
        contribuciones. Reconocer a quienes crean también implica escuchar sus voces, respetar sus
        conocimientos y hacer visibles sus aportes».
      </Texto>
      <Destacado etiqueta="REFERENCIA">
        Las investigaciones de Luján Cambariere sobre experiencias de diseño comunitario en
        América Latina.
      </Destacado>
      <Imagen rotulo="Recurso gráfico de autoría colectiva: varias firmas sobre una pieza" alto={70} />
      <Texto className="font-semibold">
        «Si una creación nace del conocimiento de muchas personas, ¿por qué su reconocimiento
        suele terminar concentrado en una sola firma?»
      </Texto>
      <Campo valor={reflexion} onCambio={setReflexion} />
    </Pantalla>
  );
}
