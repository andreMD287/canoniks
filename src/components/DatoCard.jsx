/**
 * Recuadro blanco con un dato de apoyo (mismo estilo que "CAMBIA LA MIRADA").
 */
export default function DatoCard({ etiqueta, className = "", children }) {
  return (
    <div
      className={`rounded-[14px] bg-[var(--blanco-principal)] p-[18px] text-[var(--negro-principal)] ${className}`}
    >
      <p className="text-[11px] font-semibold leading-[1.4]">{etiqueta}</p>
      <div className="mt-[8px] space-y-[8px] text-[14px] leading-[1.4]">{children}</div>
    </div>
  );
}
