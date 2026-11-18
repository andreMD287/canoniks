import { useState } from "react";
import { guardarRespuesta } from "../../data/respuestas";
import {
  Campo,
  Destacado,
  Imagen,
  Pantalla,
  Tarjeta,
  Texto,
  Ventana,
} from "../../components/RetoUI";

const RETO = "09";
const FUENTE = "Instituto Bardi / Casa de Vidro";

/** Los cinco acontecimientos, con la ficha documental de la pantalla 04. */
const EVENTOS = {
  habitat: {
    nombre: "Trabajo editorial en la revista Habitat",
    periodo: "1950",
    dimension: "Editorial",
    imagen: "Páginas de la revista Habitat",
    importancia: "Muestra que su trayectoria también se construyó publicando y difundiendo ideas.",
  },
  mobiliario: {
    nombre: "Propuestas de mobiliario y diseño de interiores",
    periodo: "Década de 1950",
    dimension: "Mobiliaria",
    imagen: "Diseños de mobiliario de Lina Bo Bardi",
    importancia: "Revela una dimensión de diseño de objetos y espacios que suele quedar en segundo plano.",
  },
  masp: {
    nombre: "Diseño y desarrollo del MASP",
    periodo: "1957–1968",
    dimension: "Museográfica y arquitectónica",
    imagen: "Planos arquitectónicos del MASP",
    importancia: "Une arquitectura y museografía en uno de sus proyectos más conocidos.",
  },
  sesc: {
    nombre: "Proyecto y transformación del SESC Pompéia",
    periodo: "1977–1986",
    dimension: "Arquitectónica",
    imagen: "Documentación del SESC Pompéia",
    importancia: "Muestra su trabajo de transformar un espacio existente para uso cultural.",
  },
  cultura: {
    nombre: "Investigaciones sobre cultura popular brasileña",
    periodo: "Distintas etapas de su trayectoria",
    dimension: "Cultural",
    imagen: "Registros de sus investigaciones culturales",
    importancia: "Atraviesa toda su obra: no es un hecho puntual sino una dimensión transversal.",
  },
};
const IDS = Object.keys(EVENTOS);
const DESORDENADO = ["sesc", "cultura", "habitat", "masp", "mobiliario"];

/** Valida la línea de tiempo según las reglas del reto. */
function validar(slots) {
  if (slots.some((s) => !s)) return { ok: false, motivo: "falta" };
  const pos = (id) => slots.indexOf(id);
  const antes = Math.max(pos("habitat"), pos("mobiliario"));
  if (pos("masp") < antes)
    return { ok: false, motivo: "El MASP (1957–1968) llegó después del trabajo en Habitat y del mobiliario (década de 1950)." };
  if (pos("sesc") < pos("masp"))
    return { ok: false, motivo: "El SESC Pompéia (1977–1986) llegó después del MASP (1957–1968)." };
  return { ok: true };
}

/** Reto 9 · Sala 09 «La historia que fue seleccionada»: Completa la historia. */
export default function Reto9({ onHome, onSalir }) {
  const [paso, setPaso] = useState(0);
  const [slots, setSlots] = useState([null, null, null, null, null]);
  const [activa, setActiva] = useState(null);
  const [resultado, setResultado] = useState(null);
  const [ficha, setFicha] = useState(null);
  const [reflexion, setReflexion] = useState("");

  const ir = (n) => () => setPaso(n);
  const comunes = { reto: RETO, onHome };
  const finalizar = () => {
    guardarRespuesta("Sala 09", reflexion, { lineaDeTiempo: slots });
    onSalir();
  };
  const libres = IDS.filter((id) => !slots.includes(id));

  const colocar = (id, pos) => {
    setResultado(null);
    setSlots((s) => {
      const c = s.map((x) => (x === id ? null : x));
      c[pos] = id;
      return c;
    });
    setActiva(null);
  };
  const quitar = (pos) => {
    setResultado(null);
    setSlots((s) => s.map((x, k) => (k === pos ? null : x)));
  };
  const soltar = (e, pos) => {
    e.preventDefault();
    const id = e.dataTransfer.getData("text/plain");
    if (EVENTOS[id]) colocar(id, pos);
  };

  if (paso === 0) {
    return (
      <Pantalla
        {...comunes}
        etapa="SALA 09 · LA HISTORIA QUE FUE SELECCIONADA"
        titulo="COMPLETA LA HISTORIA."
        onBack={onSalir}
        boton="ABRIR EXPEDIENTE"
        onBoton={ir(1)}
      >
        <Destacado>«Toda historia tiene acontecimientos que se recuerdan y otros que quedan fuera».</Destacado>
        <Imagen rotulo="Fotografía, plano o recurso de archivo de Lina Bo Bardi" fuente={FUENTE} alto={150} />
        <Texto>
          El archivo del Museo de las Ausencias ha encontrado documentos de Lina Bo Bardi, pero su
          historia está incompleta y desordenada.
        </Texto>
        <Texto>
          Tu misión es reconstruir su trayectoria y descubrir qué aspectos de su trabajo no suelen
          aparecer en los relatos históricos.
        </Texto>
      </Pantalla>
    );
  }

  if (paso === 1) {
    return (
      <Pantalla
        {...comunes}
        etapa="01 / EL ARCHIVO INCOMPLETO"
        titulo="UNA HISTORIA DESORDENADA."
        onBack={ir(0)}
        boton="RECONSTRUIR HISTORIA"
        onBoton={ir(2)}
      >
        <Texto>
          «Encontramos diferentes documentos sobre Lina Bo Bardi, pero no sabemos cómo se
          relacionan ni en qué momento fueron creados».
        </Texto>
        {DESORDENADO.map((id) => (
          <div key={id} className="flex gap-[12px] rounded-[13px] bg-[var(--blanco-principal)] p-[10px] text-[var(--negro-principal)]">
            <div className="w-[84px] shrink-0">
              <Imagen rotulo={EVENTOS[id].imagen} alto={70} className="!border-[var(--negro-principal)]/40 [&_span]:!text-[var(--negro-principal)] [&_span]:!text-[9px]" />
            </div>
            <div className="text-[12px] leading-[1.35]">
              <p className="font-semibold">{EVENTOS[id].nombre}</p>
              <p className="text-[11px]">{EVENTOS[id].periodo}</p>
            </div>
          </div>
        ))}
        <Texto className="font-semibold">
          «Organiza los acontecimientos para reconstruir una parte de su trayectoria».
        </Texto>
      </Pantalla>
    );
  }

  if (paso === 2) {
    const v = resultado && validar(slots);
    return (
      <Pantalla
        {...comunes}
        etapa="02 / LÍNEA DE TIEMPO"
        titulo="ORDENA LOS ACONTECIMIENTOS."
        onBack={ir(1)}
        boton={v?.ok ? "CONTINUAR" : "COMPROBAR LÍNEA DE TIEMPO"}
        onBoton={v?.ok ? ir(3) : () => setResultado(validar(slots).ok ? { ok: true } : validar(slots))}
        botonDeshabilitado={!v?.ok && libres.length > 0}
        nota={!v?.ok && libres.length > 0 ? "Ubica los cinco acontecimientos para comprobar." : undefined}
      >
        <Texto>
          «Cada documento representa una parte de la trayectoria de Lina. Ubícalos en el orden
          histórico correspondiente».
        </Texto>
        <p className="text-[10px] text-[var(--blanco-principal)]/70">
          Arrastra una tarjeta a un espacio, o tócala y luego toca el espacio. Toca una tarjeta
          colocada para quitarla.
        </p>
        <div className="flex flex-col gap-[6px]" aria-label="Línea de tiempo">
          {slots.map((id, pos) => (
            <div
              key={pos}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => soltar(e, pos)}
              onClick={() => (activa && !id ? colocar(activa, pos) : id ? quitar(pos) : undefined)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && (activa && !id ? colocar(activa, pos) : id && quitar(pos))}
              className={`flex min-h-[48px] cursor-pointer items-center gap-[10px] rounded-[12px] px-[12px] py-[6px] text-[12px] ${
                id
                  ? v && !v.ok
                    ? "bg-[var(--morado-principal)] text-[var(--blanco-principal)]"
                    : "bg-[var(--verde-principal)] text-[var(--negro-principal)]"
                  : "border-2 border-dashed border-[var(--verde-principal)] text-[var(--blanco-principal)]"
              }`}
            >
              <span className="font-display text-[16px] font-extrabold">{pos + 1}</span>
              <span className="font-semibold leading-[1.3]">
                {id ? `${EVENTOS[id].nombre} (${EVENTOS[id].periodo})` : activa ? "Toca para colocar aquí" : "Espacio libre"}
              </span>
              {id && <span className="ml-auto text-[14px] font-bold">×</span>}
            </div>
          ))}
        </div>
        {libres.length > 0 && (
          <div className="flex flex-col gap-[6px]">
            {libres.map((id) => (
              <Tarjeta
                key={id}
                activa={activa === id}
                onClick={() => setActiva(activa === id ? null : id)}
                draggable
                onDragStart={(e) => e.dataTransfer.setData("text/plain", id)}
                className="text-[12px] font-semibold"
              >
                {EVENTOS[id].nombre} <span className="font-normal">({EVENTOS[id].periodo})</span>
              </Tarjeta>
            ))}
          </div>
        )}
        {v && (
          <div role="status" className="rounded-[13px] bg-[var(--negro-principal)] px-[14px] py-[12px] text-[13px] leading-[1.4] text-[var(--blanco-principal)]">
            {v.ok ? (
              <>
                <b className="text-[var(--verde-principal)]">Línea de tiempo correcta. </b>
                Habitat y el mobiliario son de la misma década, por eso su orden entre sí es
                intercambiable. Las investigaciones sobre cultura popular atraviesan toda su
                trayectoria: pueden ir en cualquier posición.
              </>
            ) : (
              <>
                <b className="text-[var(--verde-principal)]">Todavía no. </b>
                {v.motivo} Corrige la línea de tiempo y vuelve a comprobar.
              </>
            )}
          </div>
        )}
        {v?.ok && (
          <div className="h-[6px] w-full rounded-[3px] bg-[var(--verde-principal)]" aria-hidden="true" />
        )}
      </Pantalla>
    );
  }

  if (paso === 3) {
    const e = ficha && EVENTOS[ficha];
    return (
      <Pantalla
        {...comunes}
        etapa="03 / LOS DOCUMENTOS"
        titulo="CADA DOCUMENTO CUENTA ALGO."
        onBack={ir(2)}
        boton="CONTINUAR"
        onBoton={ir(4)}
        overlay={
          e && (
            <Ventana onCerrar={() => setFicha(null)} cerrar="Cerrar ficha">
              <Imagen rotulo={e.imagen} fuente={FUENTE} alto={150} />
              <p className="font-display text-[18px] font-extrabold text-[var(--verde-principal)]">{e.nombre}</p>
              <p className="text-[12px] text-[var(--blanco-principal)]">
                <b>Periodo:</b> {e.periodo}
                <br />
                <b>Dimensión:</b> {e.dimension}
              </p>
              <Texto className="text-[12px]">{e.importancia}</Texto>
            </Ventana>
          )
        }
      >
        <Texto>
          «Has reconstruido una parte de la historia. Ahora descubre qué revela cada
          acontecimiento».
        </Texto>
        {IDS.map((id) => (
          <Tarjeta key={id} onClick={() => setFicha(id)} className="flex items-center justify-between gap-[8px]">
            <span>
              <span className="block text-[10px] font-semibold">{EVENTOS[id].dimension.toUpperCase()}</span>
              <span className="block text-[13px] font-semibold">{EVENTOS[id].nombre}</span>
            </span>
            <span className="text-[16px]">↗</span>
          </Tarjeta>
        ))}
      </Pantalla>
    );
  }

  if (paso === 4) {
    return (
      <Pantalla
        {...comunes}
        etapa="04 / LA HISTORIA SELECCIONADA"
        titulo="¿ESTA ES TODA SU HISTORIA?"
        onBack={ir(3)}
        boton="DESCUBRIR LA REFLEXIÓN"
        onBoton={ir(5)}
      >
        <Texto>
          «Cuando se habla de Lina Bo Bardi, algunos relatos destacan principalmente sus grandes
          obras arquitectónicas».
        </Texto>
        <div className="grid grid-cols-2 gap-[8px]">
          <div className="rounded-[13px] bg-[var(--blanco-principal)] px-[12px] py-[12px] text-[var(--negro-principal)]">
            <p className="text-[10px] font-semibold">LO QUE SUELE DESTACARSE</p>
            <ul className="mt-[8px] flex flex-col gap-[6px] text-[12px] font-semibold">
              <li>Arquitectura del MASP</li>
              <li>Arquitectura del SESC Pompéia</li>
            </ul>
          </div>
          <div className="rounded-[13px] bg-[var(--verde-principal)] px-[12px] py-[12px] text-[var(--negro-principal)]">
            <p className="text-[10px] font-semibold">OTRAS DIMENSIONES DE SU TRABAJO</p>
            <ul className="mt-[8px] flex flex-col gap-[6px] text-[12px] font-semibold">
              <li>Publicaciones en Habitat</li>
              <li>Diseño de mobiliario</li>
              <li>Investigación cultural</li>
              <li>Museografía y propuestas expositivas</li>
            </ul>
          </div>
        </div>
        <Destacado>
          ¿Qué ocurre cuando la historia destaca solamente algunas partes de una trayectoria?
        </Destacado>
      </Pantalla>
    );
  }

  return (
    <Pantalla
      {...comunes}
      etapa="CIERRE DEL EXPEDIENTE"
      titulo="EXPEDIENTE COMPLETADO."
      onBack={ir(4)}
      boton="VOLVER AL MUSEO"
      onBoton={finalizar}
    >
      <Imagen rotulo="Expediente archivado: documentos recuperados, planos o fotografías históricas" alto={90} />
      <Texto className="font-semibold">
        «La historia no siempre cuenta todo lo que ocurrió. Al seleccionar unos acontecimientos y
        dejar otros fuera, construye una versión de lo que merece ser recordado».
      </Texto>
      <Destacado etiqueta="APRENDIZAJE">
        La historiografía interpreta y organiza los acontecimientos del pasado, mientras que el
        canon establece qué autores, obras y movimientos se consideran fundamentales.
      </Destacado>
      <Texto>
        ¿Quién decide qué obras y acontecimientos merecen formar parte de la historia del diseño?
      </Texto>
      <Campo valor={reflexion} onCambio={setReflexion} />
    </Pantalla>
  );
}
