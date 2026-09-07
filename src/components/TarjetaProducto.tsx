import type { Producto } from '../types';
import { formatoPrecioARS, obtenerImagenProducto } from '../utils/format';

interface TarjetaProductoProps {
  producto: Producto;
  onAgregar: (producto: Producto) => void;
}

export default function TarjetaProducto({
  producto,
  onAgregar,
}: TarjetaProductoProps) {
  const imagen = obtenerImagenProducto(producto);

  return (
    <article className="tarjeta-producto">
      {imagen ? (
        <img
          className="producto-imagen"
          src={imagen}
          alt={producto.nombre}
          loading="lazy"
        />
      ) : (
        <img
          className="producto-imagen"
          src="/placeholder.svg"
          alt={`${producto.nombre} sin imagen`}
          loading="lazy"
        />
      )}

      <div className="producto-contenido">
        {producto.categoria?.nombre && (
          <span className="producto-categoria">
            {producto.categoria.nombre}
          </span>
        )}
        <h3 className="producto-nombre">{producto.nombre}</h3>
        {producto.descripcion && (
          <p className="producto-descripcion">{producto.descripcion}</p>
        )}

        <div className="producto-pie">
          <span className="producto-precio">
            {formatoPrecioARS(producto.precio)}
          </span>
          <button
            type="button"
            className="btn btn-primary btn-agregar"
            onClick={() => onAgregar(producto)}
          >
            <svg
              viewBox="0 0 24 24"
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M12 5v14M5 12h14" />
            </svg>
            Agregar
          </button>
        </div>
      </div>
    </article>
  );
}