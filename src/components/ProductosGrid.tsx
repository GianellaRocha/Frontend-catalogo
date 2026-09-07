import type { Producto } from '../types';
import TarjetaProducto from './TarjetaProducto';

interface ProductosGridProps {
  productos: Producto[];
  onAgregar: (producto: Producto) => void;
}

export default function ProductosGrid({
  productos,
  onAgregar,
}: ProductosGridProps) {
  if (productos.length === 0) {
    return (
      <div className="vacio">
        <svg
          viewBox="0 0 24 24"
          width="40"
          height="40"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="M16.5 16.5L21 21" />
        </svg>
        <p>No encontramos productos con esos filtros.</p>
      </div>
    );
  }

  return (
    <div className="grid-productos">
      {productos.map((producto) => (
        <TarjetaProducto
          key={producto.id}
          producto={producto}
          onAgregar={onAgregar}
        />
      ))}
    </div>
  );
}