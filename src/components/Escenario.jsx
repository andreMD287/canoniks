import { createContext, useEffect, useState } from "react";

/** Indica que ya hay un escenario por encima (p. ej. las láminas del carrusel). */
export const Anidado = createContext(false);

const ANCHO = 412;
const ALTO = 917;
const MAX_TELEFONO = 640; // hasta este ancho se considera un móvil
const MAX_ESCALA = 1.5;

function useVentana() {
  const leer = () => ({ ancho: window.innerWidth, alto: window.innerHeight });
  const [ventana, setVentana] = useState(leer);

  useEffect(() => {
    const actualizar = () => setVentana(leer());
    window.addEventListener("resize", actualizar);
    window.visualViewport?.addEventListener("resize", actualizar);
    return () => {
      window.removeEventListener("resize", actualizar);
      window.visualViewport?.removeEventListener("resize", actualizar);
    };
  }, []);

  return ventana;
}

/**
 * Coloca una pantalla de 412 px de ancho en la ventana y la escala:
 *
 *  - `llena` y móvil: la pantalla ocupa todo el ancho y toda la altura de la
 *    ventana (el diseño crece o se acorta en vertical), sin franjas a los lados.
 *    Es para las pantallas que se desplazan y tienen el botón abajo.
 *  - resto de casos: se escala el diseño completo (412 × 917) para que quepa,
 *    centrado. Las franjas que sobran toman el color de fondo de la pantalla.
 */
export default function Escenario({ background, llena = false, children }) {
  const { ancho, alto } = useVentana();
  const rellena = llena && ancho <= MAX_TELEFONO;

  const escala = rellena
    ? ancho / ANCHO
    : Math.min(ancho / ANCHO, alto / ALTO, MAX_ESCALA);
  const altoDiseno = rellena ? alto / escala : ALTO;

  const estilo = rellena
    ? {
        left: "50%",
        top: 0,
        transform: `translateX(-50%) scale(${escala})`,
        transformOrigin: "top center",
      }
    : {
        left: "50%",
        top: "50%",
        transform: `translate(-50%, -50%) scale(${escala})`,
        transformOrigin: "center center",
      };

  return (
    <div className={`fixed inset-0 overflow-hidden ${background}`}>
      <div className="absolute" style={{ width: ANCHO, height: altoDiseno, ...estilo }}>
        <Anidado.Provider value={true}>{children}</Anidado.Provider>
      </div>
    </div>
  );
}
