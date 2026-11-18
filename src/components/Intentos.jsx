import { MAX_INTENTOS } from "../data/pregunta";

/** "INTENTOS 1 2 3": los gastados se pintan en negro, los disponibles en verde. */
export default function Intentos({ usados }) {
  return (
    <div
      role="status"
      aria-label={`Intentos usados: ${usados} de ${MAX_INTENTOS}`}
      className="mt-[22px] flex h-[50px] items-center justify-between rounded-[25px] bg-[var(--blanco-principal)] pl-[17px] pr-[28px]"
    >
      <span className="text-[11px] font-semibold leading-[1.4] text-[var(--negro-principal)]">
        INTENTOS
      </span>
      <div className="flex gap-[10px]">
        {Array.from({ length: MAX_INTENTOS }, (_, i) => {
          const gastado = i < usados;
          return (
            <span
              key={i}
              className={`flex size-[29px] items-center justify-center rounded-full text-[13px] font-semibold ${
                gastado
                  ? "bg-[var(--negro-principal)] text-[var(--blanco-principal)]"
                  : "bg-[var(--verde-principal)] text-[var(--negro-principal)]"
              }`}
            >
              {i + 1}
            </span>
          );
        })}
      </div>
    </div>
  );
}
