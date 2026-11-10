/**
 * Motor del corredor del Reto 4.
 *
 * Marianne corre sola de izquierda a derecha hacia el taller de metal. El
 * jugador sólo salta o se agacha. Chocar con una barrera termina la partida;
 * llegar al 100 % del recorrido la gana.
 *
 * Dibuja sobre un canvas y no sabe nada de React: la pantalla le pasa los
 * sprites ya cargados y recibe los avisos por callback.
 */

export const ANCHO = 412;
export const ALTO = 492;

const SUELO = 430; // línea del suelo dentro del canvas
const ESCALA = 0.52; // de la celda del sprite (133 × 240) a pantalla
const CELDA_W = 133;
const CELDA_H = 240;
const PERSONAJE_W = Math.round(CELDA_W * ESCALA);
const PERSONAJE_H = Math.round(CELDA_H * ESCALA);
const PERSONAJE_X = 58;

const GRAVEDAD = 2400;
const IMPULSO = -860;
const V_INICIAL = 280;
const V_MAXIMA = 430;

// Cajas de choque: más estrechas que el dibujo, para que no castigue de más.
const CAJA_DE_PIE = { ancho: 34, alto: 110 };
const CAJA_AGACHADA = { ancho: 44, alto: 68 };

const BARRERA_SUELO = { ancho: 42, alto: 62 };
const BARRERA_ALTA = { ancho: 54, alto: 60, hueco: 74 }; // deja 74 px libres abajo

const VERDE = "#aef200";
const MORADO = "#940eb5";
const BLANCO = "#f2effb";
const NEGRO = "#070707";

const limitar = (v, min, max) => Math.min(max, Math.max(min, v));

export function crearCorredor({
  canvas,
  sprites,
  obstaculos,
  meta,
  onCambio,
  onFin,
}) {
  const ctx = canvas.getContext("2d");
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = ANCHO * dpr;
  canvas.height = ALTO * dpr;
  canvas.style.width = `${ANCHO}px`;
  canvas.style.height = `${ALTO}px`;
  ctx.scale(dpr, dpr);
  ctx.imageSmoothingQuality = "high";

  const estado = {
    distancia: 0,
    velocidad: V_INICIAL,
    y: 0, // altura sobre el suelo
    vy: 0,
    enElAire: false,
    agachado: false,
    puntos: 0,
    barreras: [],
    proxima: 900,
    reloj: 0,
    vivo: true,
    terminado: false,
  };

  let rafId = null;
  let anterior = 0;
  let ultimoAviso = 0;

  const caja = () => (estado.agachado && !estado.enElAire ? CAJA_AGACHADA : CAJA_DE_PIE);

  function sembrar() {
    const tipo = obstaculos[Math.floor(Math.random() * obstaculos.length)];
    const alta = tipo.accion === "agachar";
    estado.barreras.push({
      tipo,
      alta,
      x: ANCHO + 40,
      ancho: alta ? BARRERA_ALTA.ancho : BARRERA_SUELO.ancho,
      alto: alta ? BARRERA_ALTA.alto : BARRERA_SUELO.alto,
      superada: false,
    });
    estado.proxima = 480 + Math.random() * 340;
  }

  function avanzar(dt) {
    const progreso = estado.distancia / meta;
    estado.velocidad = V_INICIAL + (V_MAXIMA - V_INICIAL) * limitar(progreso, 0, 1);

    const paso = estado.velocidad * dt;
    estado.distancia += paso;
    estado.reloj += dt;
    estado.puntos += paso / 20;

    // salto
    if (estado.enElAire) {
      estado.vy += GRAVEDAD * dt;
      estado.y += estado.vy * dt;
      if (estado.y >= 0) {
        estado.y = 0;
        estado.vy = 0;
        estado.enElAire = false;
      }
    }

    // barreras
    estado.proxima -= paso;
    if (estado.proxima <= 0 && estado.distancia < meta - 700) sembrar();

    const miCaja = caja();
    const miX = PERSONAJE_X + (PERSONAJE_W - miCaja.ancho) / 2;
    const miArriba = SUELO + estado.y - miCaja.alto;
    const miAbajo = SUELO + estado.y;

    for (const b of estado.barreras) {
      b.x -= paso;
      const bArriba = b.alta ? SUELO - BARRERA_ALTA.hueco - b.alto : SUELO - b.alto;
      const bAbajo = bArriba + b.alto;

      const chocaX = miX < b.x + b.ancho && miX + miCaja.ancho > b.x;
      const chocaY = miArriba < bAbajo && miAbajo > bArriba;
      if (chocaX && chocaY) {
        estado.vivo = false;
        estado.terminado = true;
        return b.tipo;
      }

      if (!b.superada && b.x + b.ancho < miX) {
        b.superada = true;
        estado.puntos += 30;
      }
    }
    estado.barreras = estado.barreras.filter((b) => b.x > -120);

    if (estado.distancia >= meta) {
      estado.terminado = true;
      return null;
    }
    return undefined;
  }

  // ---------- dibujo ----------

  function fondo() {
    ctx.fillStyle = "#00163f";
    ctx.fillRect(0, 0, ANCHO, ALTO);

    // franjas del taller al fondo, moviéndose despacio
    const desfase = -(estado.distancia * 0.18) % 120;
    ctx.fillStyle = "rgba(242,239,251,0.05)";
    for (let x = desfase - 120; x < ANCHO + 120; x += 120) {
      ctx.fillRect(x, 120, 60, SUELO - 120);
    }

    // la puerta del taller aparece al final del recorrido
    const restante = meta - estado.distancia;
    if (restante < 900) {
      const x = ANCHO - 60 + (restante / 900) * 520;
      ctx.fillStyle = VERDE;
      ctx.fillRect(x, SUELO - 190, 96, 190);
      ctx.fillStyle = NEGRO;
      ctx.font = "700 11px Alexandria, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("TALLER", x + 48, SUELO - 100);
      ctx.fillText("DE METAL", x + 48, SUELO - 84);
      ctx.textAlign = "left";
    }

    // suelo
    ctx.fillStyle = NEGRO;
    ctx.fillRect(0, SUELO, ANCHO, ALTO - SUELO);
    ctx.fillStyle = VERDE;
    ctx.fillRect(0, SUELO, ANCHO, 2);
    ctx.fillStyle = "rgba(174,242,0,0.35)";
    const marca = -(estado.distancia % 48);
    for (let x = marca; x < ANCHO; x += 48) ctx.fillRect(x, SUELO + 12, 22, 2);
  }

  function dibujarBarrera(b) {
    const arriba = b.alta ? SUELO - BARRERA_ALTA.hueco - b.alto : SUELO - b.alto;
    const x = b.x;
    const w = b.ancho;
    const h = b.alto;
    ctx.save();

    switch (b.tipo.id) {
      case "telar": {
        ctx.strokeStyle = VERDE;
        ctx.lineWidth = 3;
        ctx.strokeRect(x, arriba, w, h);
        ctx.lineWidth = 1.5;
        for (let i = 1; i < 5; i++) {
          ctx.beginPath();
          ctx.moveTo(x + (w / 5) * i, arriba + 4);
          ctx.lineTo(x + (w / 5) * i, arriba + h - 4);
          ctx.stroke();
        }
        break;
      }
      case "ceramicas": {
        ctx.fillStyle = BLANCO;
        for (let i = 0; i < 3; i++) {
          const cx = x + 8 + i * ((w - 16) / 2);
          ctx.beginPath();
          ctx.ellipse(cx, SUELO - 14, 9, 14, 0, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.fillStyle = MORADO;
        for (let i = 0; i < 3; i++) {
          const cx = x + 8 + i * ((w - 16) / 2);
          ctx.fillRect(cx - 9, SUELO - 18, 18, 3);
        }
        break;
      }
      case "muro": {
        ctx.fillStyle = BLANCO;
        ctx.fillRect(x, arriba, w, h);
        ctx.strokeStyle = NEGRO;
        ctx.lineWidth = 1.5;
        for (let f = 0; f < 4; f++) {
          const y = arriba + (h / 4) * f;
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(x + w, y);
          ctx.stroke();
          const dx = f % 2 ? w / 2 : 0;
          ctx.beginPath();
          ctx.moveTo(x + dx, y);
          ctx.lineTo(x + dx, y + h / 4);
          ctx.stroke();
        }
        break;
      }
      case "puerta": {
        ctx.fillStyle = MORADO;
        ctx.fillRect(x, arriba, w, h);
        ctx.fillStyle = VERDE;
        ctx.fillRect(x + w - 12, arriba + h / 2 - 4, 7, 8);
        ctx.strokeStyle = BLANCO;
        ctx.lineWidth = 2;
        ctx.strokeRect(x + 5, arriba + 6, w - 10, h - 12);
        break;
      }
      case "chispas": {
        const cy = arriba + h / 2;
        const cx = x + w / 2;
        ctx.strokeStyle = VERDE;
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.arc(cx, cy, h / 2 - 4, 0, Math.PI * 2);
        ctx.stroke();
        for (let i = 0; i < 8; i++) {
          const a = (Math.PI * 2 * i) / 8 + estado.reloj * 4;
          ctx.beginPath();
          ctx.moveTo(cx + Math.cos(a) * (h / 2 - 2), cy + Math.sin(a) * (h / 2 - 2));
          ctx.lineTo(cx + Math.cos(a) * (h / 2 + 7), cy + Math.sin(a) * (h / 2 + 7));
          ctx.stroke();
        }
        break;
      }
      case "companeros":
      default: {
        ctx.fillStyle = MORADO;
        ctx.fillRect(x, arriba, w, h);
        ctx.fillStyle = BLANCO;
        for (let i = 0; i < 2; i++) {
          const cx = x + 14 + i * 26;
          ctx.beginPath();
          ctx.arc(cx, arriba + 16, 8, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillRect(cx - 9, arriba + 26, 18, h - 30);
        }
        break;
      }
    }
    ctx.restore();
  }

  function dibujarPersonaje() {
    let hoja = sprites.correr;
    let indice = Math.floor(estado.reloj * 14) % 8;

    if (estado.enElAire) {
      // El sprite del salto va del impulso (3) a la caída (6) según la altura.
      hoja = sprites.saltar;
      const altura = -estado.y;
      if (estado.vy < 0) indice = altura < 50 ? 3 : 4;
      else indice = altura > 60 ? 5 : 6;
    } else if (estado.agachado) {
      hoja = sprites.agachar;
      indice = Math.floor(estado.reloj * 8) % 2;
    }

    const origenX = indice * CELDA_W;
    const destinoX = PERSONAJE_X;
    const destinoY = SUELO + estado.y - PERSONAJE_H;

    ctx.drawImage(
      hoja,
      origenX,
      0,
      CELDA_W,
      CELDA_H,
      destinoX,
      destinoY,
      PERSONAJE_W,
      PERSONAJE_H,
    );
  }

  function pintar() {
    fondo();
    for (const b of estado.barreras) dibujarBarrera(b);
    dibujarPersonaje();
  }

  // ---------- bucle ----------

  function paso(ahora) {
    if (!anterior) anterior = ahora;
    const dt = Math.min((ahora - anterior) / 1000, 0.05);
    anterior = ahora;

    const choque = avanzar(dt);
    pintar();

    if (ahora - ultimoAviso > 80) {
      ultimoAviso = ahora;
      onCambio({
        puntos: estado.puntos,
        avance: limitar(estado.distancia / meta, 0, 1),
      });
    }

    if (estado.terminado) {
      const avance = limitar(estado.distancia / meta, 0, 1);
      onFin({
        resultado: estado.vivo ? "victoria" : "derrota",
        puntos: Math.round(estado.puntos),
        avance,
        obstaculo: choque || null,
      });
      return;
    }
    rafId = requestAnimationFrame(paso);
  }

  return {
    arrancar() {
      anterior = 0;
      rafId = requestAnimationFrame(paso);
    },
    parar() {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = null;
    },
    saltar() {
      if (estado.enElAire || estado.terminado) return;
      estado.enElAire = true;
      estado.agachado = false;
      estado.vy = IMPULSO;
    },
    agachar(valor) {
      if (estado.terminado) return;
      estado.agachado = valor && !estado.enElAire;
    },
    /** Sólo para depurar y para las pruebas: foto del estado actual. */
    leerEstado: () => ({
      distancia: estado.distancia,
      y: estado.y,
      enElAire: estado.enElAire,
      agachado: estado.agachado,
      barreras: estado.barreras.map((b) => ({
        id: b.tipo.id,
        accion: b.tipo.accion,
        x: Math.round(b.x),
      })),
    }),
  };
}
