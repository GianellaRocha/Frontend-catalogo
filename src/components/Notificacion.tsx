import { useCarrito } from '../context/CarritoContext';

export default function Notificacion() {
  const { notificacion } = useCarrito();

  if (!notificacion) return null;

  return (
    <div className="notificacion" role="status">
      <svg
        viewBox="0 0 24 24"
        width="18"
        height="18"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden="true"
      >
        <path d="M4 12.5l5 5L20 7" />
      </svg>
      {notificacion}
    </div>
  );
}