import { useState } from "react";
import {
  Campo,
  Destacado,
  Imagen,
  Pantalla,
  Tarjeta,
  Texto,
} from "../../components/RetoUI";

const RETO = "07";

const FRAGMENTOS = [
  "Robert Venturi",
  "Denise Scott Brown",
  "recibe",
  "comparten",
  "el Premio Pritzker",
  "una trayectoria",
  "de 1991",
  "arquitectónica",
  "un reconocimiento individual",
  "una obra conjunta",
];
const MAX_ESPACIOS = 6;

/** Titular con estética de recorte de prensa. */
const Recorte = ({ etiqueta, children, tono = "claro" }) => (
  <div
    className={`rounded-[4px] border-2 border-solid px-[14px] py-[12px] ${
      tono === "claro"
        ? "border-[var(--negro-principal)] bg-[var(--blanco-principal)] text-[var(--negro-principal)]"
        : "border-[var(--negro-principal)] bg-[var(--verde-principal)] text-[var(--negro-principal)]"
    }`}
  >
    <p className="text-[10px] font-semibold tracking-wide">{etiqueta}</p>
    <p className="font-display mt-[6px] text-[20px] font-extrabold leading-[1.15]">{children}</p>
  </div>
);

/** Reto 7 · Sala 07 «El mérito que cambió de nombre»: Cambia el titular. */
export default function Reto7({ onHome, onSalir }) {
  const [paso, setPaso] = useState(0);
  const [titular, setTitular] = useState([]); // índices de FRAGMENTOS, en orden
  const [reflexion, setReflexion] = useState("");

  const ir = (n) => () => setPaso(n);
  const comunes = { reto: RETO, onHome };

  const alternar = (i) =>
    setTitular((t) => {
      if (t.includes(i)) return t.filter((x) => x !== i);
      return t.length >= MAX_ESPACIOS ? t : [...t, i];
    });
  const mover = (pos, d) =>
    setTitular((t) => {
      const n = pos + d;
      if (n < 0 || n >= t.length) return t;
      const c = [...t];
      [c[pos], c[n]] = [c[n], c[pos]];
      return c;
    });
  const quitar = (pos) => setTitular((t) => t.filter((_, k) => k !== pos));
  const texto = titular.map((i) => FRAGMENTOS[i]).join(" ");

  if (paso === 0) {
    return (
      <Pantalla
        {...comunes}
        etapa="SALA 07 · EL MÉRITO QUE CAMBIÓ DE NOMBRE"
        titulo="CAMBIA EL TITULAR."
        onBack={onSalir}
        boton="ABRIR EXPEDIENTE"
        onBoton={ir(1)}
      >
        <p className="font-display text-[16px] font-extrabold leading-[1.2] text-[var(--blanco-principal)]">
          Un titular puede contar una historia. También puede borrar a quien la hizo posible.
        </p>
        <Imagen rotulo="Recortes de periódico y documentos de archivo" fuente="hemeroteca / archivo de prensa" alto={150} />
        <Texto>
          El archivo del museo ha encontrado una noticia sobre el Premio Pritzker de 1991. Tu
          misión es revisar su titular y descubrir qué historia quedó por fuera.
        </Texto>
      </Pantalla>
    );
  }

  if (paso === 1) {
    return (
      <Pantalla
        {...comunes}
        etapa="ARCHIVO DE PRENSA · 1991"
        titulo="EL TITULAR ORIGINAL"
        onBack={ir(0)}
        boton="CONTINUAR"
        onBoton={ir(2)}
      >
        <div className="rounded-[4px] border-2 border-solid border-[var(--negro-principal)] bg-[var(--blanco-principal)] px-[16px] py-[20px] text-[var(--negro-principal)]">
          <p className="text-[10px] font-semibold">ARCHIVO DE PRENSA · 1991</p>
          <p className="font-display mt-[10px] text-[30px] font-extrabold leading-[1.1]">
            «Robert Venturi recibe el Premio Pritzker de 1991»
          </p>
          <p className="mt-[12px] text-[13px] leading-[1.4]">
            El reconocimiento destaca la trayectoria del arquitecto estadounidense.
          </p>
        </div>
        <Destacado>
          ¿Qué información presenta este titular y qué información podría estar omitiendo?
        </Destacado>
      </Pantalla>
    );
  }

  if (paso === 2) {
    return (
      <Pantalla
        {...comunes}
        etapa="LA PISTA"
        titulo="UNA HISTORIA COMPARTIDA."
        onBack={ir(1)}
        boton="REVISAR EL TITULAR"
        onBoton={ir(3)}
      >
        <Imagen rotulo="Denise Scott Brown y Robert Venturi (foto documental)" fuente="archivo de prensa / archivo del estudio" alto={150} />
        <Texto>
          Denise Scott Brown fue socia y colaboradora intelectual de Robert Venturi. Ambos
          desarrollaron una trayectoria profesional conjunta, compartieron investigaciones y
          publicaciones.
        </Texto>
        <Destacado>
          En 1989, Scott Brown cuestionó la falta de reconocimiento de las mujeres en la
          arquitectura.
        </Destacado>
      </Pantalla>
    );
  }

  if (paso === 3) {
    return (
      <Pantalla
        {...comunes}
        etapa="EDICIÓN"
        titulo="AHORA TÚ ERES EL EDITOR."
        onBack={ir(2)}
        boton="PUBLICAR TITULAR"
        onBoton={ir(4)}
        botonDeshabilitado={titular.length === 0}
        nota={titular.length === 0 ? "Construye un titular para publicarlo." : undefined}
      >
        <Texto>
          Tienes la oportunidad de corregir la historia. Selecciona y organiza los fragmentos para
          construir un nuevo titular.
        </Texto>
        <div
          aria-label="Titular en construcción"
          className="min-h-[110px] rounded-[4px] border-2 border-dashed border-[var(--verde-principal)] bg-[var(--blanco-principal)] p-[10px]"
        >
          {titular.length === 0 ? (
            <p className="py-[14px] text-center text-[12px] text-[var(--negro-principal)]/60">
              Toca los fragmentos para colocarlos aquí.
            </p>
          ) : (
            <ul className="flex flex-wrap gap-[6px]">
              {titular.map((f, pos) => (
                <li
                  key={f}
                  className="flex items-center gap-[2px] rounded-[8px] bg-[var(--verde-principal)] px-[6px] py-[4px] text-[12px] font-semibold text-[var(--negro-principal)]"
                >
                  <button type="button" aria-label="Mover a la izquierda" onClick={() => mover(pos, -1)} disabled={pos === 0} className="px-[3px] disabled:opacity-30">←</button>
                  <span className="px-[2px]">{FRAGMENTOS[f]}</span>
                  <button type="button" aria-label="Mover a la derecha" onClick={() => mover(pos, 1)} disabled={pos === titular.length - 1} className="px-[3px] disabled:opacity-30">→</button>
                  <button type="button" aria-label="Quitar" onClick={() => quitar(pos)} className="px-[3px] font-bold">×</button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="flex gap-[8px]">
          <button
            type="button"
            onClick={() => setTitular([])}
            disabled={titular.length === 0}
            className="rounded-[20px] border border-solid border-[var(--blanco-principal)] px-[16px] py-[8px] text-[12px] font-semibold text-[var(--blanco-principal)] disabled:opacity-40"
          >
            BORRAR
          </button>
          <p className="self-center text-[11px] text-[var(--blanco-principal)]/70">
            {titular.length}/{MAX_ESPACIOS} fragmentos
          </p>
        </div>
        <div className="flex flex-wrap gap-[8px]">
          {FRAGMENTOS.map((f, i) => (
            <Tarjeta
              key={f}
              activa={titular.includes(i)}
              onClick={() => alternar(i)}
              className="!rounded-[10px] !px-[12px] !py-[8px] text-[13px] font-semibold"
            >
              {f}
            </Tarjeta>
          ))}
        </div>
      </Pantalla>
    );
  }

  if (paso === 4) {
    return (
      <Pantalla
        {...comunes}
        etapa="COMPARACIÓN"
        titulo="DOS FORMAS DE CONTAR UNA HISTORIA."
        onBack={ir(3)}
        boton="DESCUBRIR EL RESULTADO"
        onBoton={ir(5)}
      >
        <Recorte etiqueta="ANTES">«Robert Venturi recibe el Premio Pritzker de 1991».</Recorte>
        <Recorte etiqueta="DESPUÉS" tono="verde">
          «Una trayectoria compartida, un reconocimiento individual».
        </Recorte>
        <Recorte etiqueta="TU TITULAR">«{texto}»</Recorte>
        <Texto>
          Cambiar las palabras no cambia lo que ocurrió, pero sí permite cuestionar cómo se contó
          la historia.
        </Texto>
        <Destacado etiqueta="REVELACIÓN">
          El Premio Pritzker de 1991 fue otorgado exclusivamente a Robert Venturi, pese a la
          trayectoria profesional compartida con Denise Scott Brown.
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
      onBoton={onSalir}
    >
      <div className="self-start -rotate-6 rounded-[6px] border-[3px] border-solid border-[var(--verde-principal)] px-[12px] py-[4px] text-[14px] font-extrabold tracking-widest text-[var(--verde-principal)]">
        REVISADO
      </div>
      <Texto className="font-semibold">
        El reconocimiento no siempre refleja quiénes contribuyeron a construir una obra.
      </Texto>
      <Destacado etiqueta="EFECTO MATILDA">
        Ocurre cuando los aportes de una mujer son minimizados, invisibilizados o atribuidos a sus
        colegas hombres.
      </Destacado>
      <Texto>
        ¿Qué relación existe entre la contribución efectiva y el reconocimiento público?
      </Texto>
      <Campo valor={reflexion} onCambio={setReflexion} />
    </Pantalla>
  );
}
