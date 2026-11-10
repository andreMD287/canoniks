// Datos del Reto 4 · La frontera profesional (Marianne Brandt).

export const TITULO_EXPEDIENTE = "RETO 04 · CANONIKAS";

/**
 * Cuánto hay que recorrer para llegar al taller de metal. Da una partida de
 * unos 25 segundos: como se pierde al primer choque, un recorrido más largo
 * hacía casi imposible terminarlo.
 */
export const META = 9000;

/**
 * Las barreras que Brandt tuvo que superar. `accion` dice cómo se esquiva:
 * las del suelo se saltan, las de arriba se esquivan agachándose.
 * `consecuencia` es lo que costó esa barrera, y se muestra al chocar.
 */
export const OBSTACULOS = [
  {
    id: "telar",
    nombre: "El telar",
    accion: "saltar",
    consecuencia:
      "La desviaron al taller de tejido: su obra quedó archivada como artesanía y no como diseño industrial.",
  },
  {
    id: "chispas",
    nombre: "El círculo de chispas",
    accion: "agachar",
    consecuencia:
      "Sin acceso al taller no hubo formación técnica ni seguridad: aprender el oficio le costó el doble.",
  },
  {
    id: "puerta",
    nombre: "La puerta del taller",
    accion: "saltar",
    consecuencia:
      "Entrar tarde a la disciplina retrasó su carrera y su firma en los catálogos de la escuela.",
  },
  {
    id: "muro",
    nombre: "El muro de escepticismo",
    accion: "saltar",
    consecuencia:
      "La duda constante sobre su capacidad la obligó a demostrar el doble por la mitad del crédito.",
  },
  {
    id: "companeros",
    nombre: "El bloqueo de los compañeros",
    accion: "agachar",
    consecuencia:
      "El aislamiento dentro del taller la dejó fuera de los encargos y de las redes profesionales.",
  },
  {
    id: "ceramicas",
    nombre: "Las cerámicas en el piso",
    accion: "saltar",
    consecuencia:
      "Su trabajo se atribuyó al taller o a sus colegas: piezas suyas circularon sin su nombre.",
  },
];

export const obstaculo = (id) => OBSTACULOS.find((o) => o.id === id);

/** Puntos con cuatro cifras, como en el diseño. */
export const marcador = (n) => String(Math.max(0, Math.round(n))).padStart(4, "0");
