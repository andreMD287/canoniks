import ScreenShell from "./ScreenShell";

/**
 * Pantalla final de un reto: la imagen del diseño (412 × 917) ya trae la barra
 * superior, la tarjeta «Nos vemos en el debate» y el botón, así que encima
 * sólo se colocan las zonas pulsables en el mismo sitio que en el diseño.
 */
export default function PantallaFinal({ imagen, alt, onHome, onBack, onVolver }) {
  return (
    <ScreenShell scroll={false} background="bg-[var(--negro-principal)]">
      <img
        src={imagen}
        alt={alt}
        draggable={false}
        className="pointer-events-none absolute inset-0 size-full max-w-none select-none"
      />

      <button
        type="button"
        onClick={onBack}
        aria-label="Volver"
        className="absolute left-6 top-[26px] size-10 rounded-[8px]"
      />
      <button
        type="button"
        onClick={onHome}
        aria-label="Ir al archivo"
        className="absolute right-6 top-[27px] h-10 w-12 rounded-[16px] transition-transform duration-300 ease-out hover:scale-110"
      />
      <button
        type="button"
        onClick={onVolver}
        aria-label="Volver al archivo"
        className="absolute left-6 top-[800px] h-[58px] w-[364px] rounded-[29px] transition-transform duration-200 hover:scale-[1.01] active:scale-[0.99]"
      />
    </ScreenShell>
  );
}
