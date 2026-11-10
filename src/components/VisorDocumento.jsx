import { useState } from "react";

const NIVELES = [100, 150, 200, 300];

/**
 * Visor de un documento de archivo: la hoja dentro de una caja con scroll y
 * una barra para acercar y alejar. Con el zoom al 100 % la hoja cabe entera y
 * va centrada; al ampliarla, la caja se desplaza.
 *
 * `firma` pinta encima el recuadro con el nombre restituido (pantalla de la
 * patente restaurada); sus medidas son las del diseño sobre la hoja sin
 * ampliar, así que se escalan con el zoom.
 */
export default function VisorDocumento({ etiqueta, imagen, alt, firma = null }) {
  const [nivel, setNivel] = useState(0);
  const z = NIVELES[nivel] / 100;

  return (
    <div className="flex w-full flex-col gap-[14px]">
      <div className="flex h-[352px] w-full flex-col gap-[8px] overflow-hidden rounded-[13px] bg-[var(--blanco-principal)] p-[12px]">
        <p className="w-full text-[10px] leading-[1.4] text-[var(--negro-principal)]">
          {etiqueta}
        </p>

        <div className="h-[302px] w-full overflow-auto">
          <div className="flex min-w-full justify-center">
            <div
              className="relative shrink-0"
              style={{ width: 194 * z, height: 290.587 * z }}
            >
              <img
                src={imagen}
                alt={alt}
                className="absolute inset-0 size-full max-w-none object-contain"
              />
              {firma && (
                <div
                  className="absolute flex items-center justify-center border-[1.5px] border-solid border-[var(--verde-principal)] bg-[var(--blanco-principal)]"
                  style={{
                    left: 6 * z,
                    top: 244 * z,
                    width: 182 * z,
                    height: 36 * z,
                  }}
                >
                  <p
                    className="w-full text-center font-semibold leading-[1.4] text-[var(--negro-principal)]"
                    style={{ fontSize: 11 * z }}
                  >
                    {firma}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex h-[44px] w-full items-center justify-between overflow-hidden rounded-[13px] bg-[var(--blanco-principal)] px-[6px]">
        <button
          type="button"
          onClick={() => setNivel((n) => Math.max(0, n - 1))}
          disabled={nivel === 0}
          aria-label="Reducir el documento"
          className="flex size-[44px] items-center justify-center text-[24px] leading-[1.4] text-[var(--negro-principal)] disabled:opacity-30"
        >
          −
        </button>

        <p className="flex-1 text-center text-[10px] leading-[1.4] text-[var(--negro-principal)]">
          {NIVELES[nivel]} % · DESLIZA PARA EXAMINAR
        </p>

        <button
          type="button"
          onClick={() => setNivel((n) => Math.min(NIVELES.length - 1, n + 1))}
          disabled={nivel === NIVELES.length - 1}
          aria-label="Ampliar el documento"
          className="flex size-[44px] items-center justify-center text-[24px] leading-[1.4] text-[var(--negro-principal)] disabled:opacity-30"
        >
          +
        </button>
      </div>
    </div>
  );
}
