import { useEffect, useState } from "react";
import TopBar from "../../components/TopBar";
import ScreenShell from "../../components/ScreenShell";
import ActionButton from "../../components/ActionButton";
import {
  PERSONAS,
  TALLERES,
  TITULO_EXPEDIENTE,
  admite,
  taller as buscarTaller,
} from "../../data/reto3";

/**
 * El reparto de talleres como lo hacía Gropius: cada taller sólo admite un
 * género. Si se intenta llevar a un hombre a tejido y cerámica —o a una mujer
 * a metal y madera— la ficha se devuelve y se explica por qué. Ésa es la
 * actividad: la regla se descubre chocando con ella.
 *
 * Se puede arrastrar la ficha o tocarla y después tocar el taller. Tocar una
 * ficha ya repartida la devuelve a la lista.
 */
export default function R3Reparto({ onHome, onBack, onTerminar }) {
  const [asignaciones, setAsignaciones] = useState({});
  const [seleccionada, setSeleccionada] = useState(null);
  const [rechazo, setRechazo] = useState(null); // { nombre, taller }
  const [encima, setEncima] = useState(null);

  // el aviso del rechazo se borra solo
  useEffect(() => {
    if (!rechazo) return undefined;
    const t = setTimeout(() => setRechazo(null), 2600);
    return () => clearTimeout(t);
  }, [rechazo]);

  const sinRepartir = PERSONAS.filter((p) => !asignaciones[p.nombre]);
  const repartidas = (id) =>
    PERSONAS.filter((p) => asignaciones[p.nombre] === id);
  const completo = sinRepartir.length === 0;

  const intentar = (nombre, idTaller) => {
    if (!nombre) return;
    setEncima(null);
    if (!admite(idTaller, nombre)) {
      setRechazo({ nombre, taller: idTaller });
      setSeleccionada(null);
      return;
    }
    setRechazo(null);
    setSeleccionada(null);
    setAsignaciones((a) => ({ ...a, [nombre]: idTaller }));
  };

  const devolver = (nombre) =>
    setAsignaciones((a) => {
      const copia = { ...a };
      delete copia[nombre];
      return copia;
    });

  const Ficha = ({ nombre, dentro = false }) => {
    const rechazada = rechazo?.nombre === nombre;
    const activa = seleccionada === nombre;
    return (
      <button
        type="button"
        draggable
        onDragStart={(e) => {
          e.dataTransfer.setData("text/plain", nombre);
          setSeleccionada(nombre);
        }}
        onDragEnd={() => setEncima(null)}
        onClick={() => (dentro ? devolver(nombre) : setSeleccionada(activa ? null : nombre))}
        aria-pressed={activa}
        aria-label={
          dentro
            ? `Devolver a ${nombre} a la lista`
            : `Elegir a ${nombre} para llevarle a un taller`
        }
        className={`flex h-[40px] w-full cursor-grab items-center overflow-hidden rounded-[6px] px-[10px] text-left text-[12px] leading-[1.4] transition-colors duration-200 active:cursor-grabbing ${
          rechazada
            ? "animar-rechazo bg-[var(--morado-principal)] text-[var(--blanco-principal)]"
            : activa
              ? "bg-[var(--verde-principal)] text-[var(--negro-principal)]"
              : "bg-[var(--blanco-principal)] text-[var(--negro-principal)]"
        }`}
      >
        {nombre}
      </button>
    );
  };

  return (
    <ScreenShell
      background="bg-[var(--negro-principal)]"
      footer={
        <>
          <ActionButton disabled={!completo} onClick={onTerminar}>
            Ver la sala 3&nbsp; →
          </ActionButton>
          {!completo && (
            <p className="absolute inset-x-0 top-full mt-2 text-center text-[11px] leading-[1.4] text-[var(--blanco-principal)]">
              Faltan {sinRepartir.length} de {PERSONAS.length} por repartir.
            </p>
          )}
        </>
      }
    >
      <TopBar title={TITULO_EXPEDIENTE} onHome={onHome} onBack={onBack} />

      <div className="px-6 pt-[28px]">
        <p className="text-[11px] leading-[1.4] text-[var(--verde-principal)]">
          05 / RECONSTRUIR · EL REPARTO
        </p>

        <h1 className="font-display mt-[21px] text-[28px] font-extrabold leading-[1.12] text-[var(--verde-principal)]">
          ¿A quién abres
          <br />
          la puerta?
        </h1>

        <p className="mt-[9px] text-[14px] leading-[1.4] text-[var(--blanco-principal)]">
          Lleva cada nombre al taller al que pertenece.
        </p>
        <p className="mt-[4px] text-[12px] leading-[1.4] text-[var(--blanco-principal)]">
          Arrastra o toca cada ficha para cambiarla de taller. Recrea la
          perspectiva de Gropius.
        </p>

        {/* Fichas por repartir; la altura fija evita que los talleres salten */}
        <div className="mt-[14px] grid min-h-[178px] grid-cols-2 content-start gap-x-[12px] gap-y-[6px]">
          {sinRepartir.map((p) => (
            <Ficha key={p.nombre} nombre={p.nombre} />
          ))}

          {completo && (
            <p className="col-span-2 self-center text-[14px] leading-[1.4] text-[var(--verde-principal)]">
              Reparto completo: {repartidas("tejido").length} en tejido y
              cerámica, {repartidas("metal").length} en metal y madera. No había
              otro reparto posible.
            </p>
          )}
        </div>

        <div className="mt-[22px] flex gap-[12px]">
          {TALLERES.map((t) => (
            <div
              key={t.id}
              onDragOver={(e) => {
                e.preventDefault();
                setEncima(t.id);
              }}
              onDragLeave={() => setEncima((v) => (v === t.id ? null : v))}
              onDrop={(e) => {
                e.preventDefault();
                intentar(e.dataTransfer.getData("text/plain"), t.id);
              }}
              onClick={() => intentar(seleccionada, t.id)}
              className={`h-[300px] w-[176px] shrink-0 overflow-hidden rounded-[12px] border border-dashed bg-[var(--blanco-principal)] px-[11px] pt-[13px] transition-colors duration-200 ${
                rechazo?.taller === t.id
                  ? "border-[var(--morado-principal)]"
                  : "border-[var(--verde-principal)]"
              } ${encima === t.id ? "bg-[var(--verde-principal)]/30" : ""}`}
            >
              <p className="font-display text-[17px] font-extrabold leading-[1.12] text-[var(--negro-principal)]">
                {t.titulo[0]}
                <br />
                {t.titulo[1]}
              </p>
              <p className="mt-[8px] text-[9px] font-extrabold leading-[1.4] text-[var(--azul-oscuro)]">
                {t.jerarquia}
              </p>

              <div className="mt-[14px] flex flex-col gap-[6px]">
                {repartidas(t.id).map((p) => (
                  <Ficha key={p.nombre} nombre={p.nombre} dentro />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Aviso del rechazo, encima del botón para no mover la maqueta */}
      {rechazo && (
        <p
          role="alert"
          className="absolute inset-x-6 bottom-[132px] z-10 rounded-[12px] bg-[var(--morado-principal)] px-[16px] py-[12px] text-[12px] leading-[1.4] text-[var(--blanco-principal)]"
        >
          {buscarTaller(rechazo.taller).rechazo}
        </p>
      )}
    </ScreenShell>
  );
}
