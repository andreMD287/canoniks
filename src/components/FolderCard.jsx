/**
 * Tarjeta con forma de "carpeta" (el recorte diagonal del Figma),
 * usando el asset SVG real exportado del diseño como fondo.
 *
 * Hay dos tipos de asset exportado:
 *  - por defecto (carpetas de las pantallas 01-04): el SVG incluye la sombra y
 *    es 25,6 px más grande que la tarjeta (15,8 px a izquierda/arriba y 9,8 px
 *    a derecha/abajo), igual que en el diseño;
 *  - `bleed` (pantallas 05 en adelante): el SVG lleva trazo y es 1 px más
 *    grande que la tarjeta.
 *
 * `contentClassName` es el relleno interior (por defecto el de las primeras 4
 * pantallas); las demás lo ajustan al diseño.
 */
export default function FolderCard({
  asset,
  className = "",
  contentClassName = "pt-[66px] pb-8",
  bleed = false,
  children,
}) {
  const margenAsset = bleed
    ? "-inset-[0.5px]"
    : "-left-[15.8px] -right-[9.8px] -top-[15.8px] -bottom-[9.8px]";

  return (
    <div className={`relative w-full ${className}`}>
      <div className={`absolute z-0 ${margenAsset}`} aria-hidden="true">
        <img alt="" src={asset} className="block size-full max-w-none" />
      </div>
      <div className={`relative z-10 px-6 ${contentClassName}`}>{children}</div>
    </div>
  );
}
