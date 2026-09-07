import { Link } from 'react-router-dom';
import type { Categoria } from '../types';
import { obtenerImagenCategoria } from '../utils/format';

interface CategoriasProps {
  categorias: Categoria[];
}

export default function Categorias({ categorias }: CategoriasProps) {
  const productosTotal = categorias.reduce(
    (suma, c) => suma + (c.productos?.length ?? 0),
    0,
  );

  return (
    <section className="seccion">
      <div className="seccion-cabecera">
        <h2>Explorá por categoría</h2>
        <Link to="/productos" className="enlace-mas">
          Ver todos los productos
        </Link>
      </div>

      <div className="grid-categorias">
        <Link to="/productos" className="tarjeta-categoria todas">
          <div className="categoria-imagen todas">
            <svg
              viewBox="0 0 24 24"
              width="34"
              height="34"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              aria-hidden="true"
            >
              <rect x="3" y="3" width="7" height="7" rx="1.5" />
              <rect x="14" y="3" width="7" height="7" rx="1.5" />
              <rect x="3" y="14" width="7" height="7" rx="1.5" />
              <rect x="14" y="14" width="7" height="7" rx="1.5" />
            </svg>
          </div>
          <span className="categoria-nombre">Todos</span>
          <span className="categoria-sub">
            {productosTotal} producto{productosTotal === 1 ? '' : 's'}
          </span>
        </Link>

        {categorias.map((categoria) => {
          const imagen = obtenerImagenCategoria(categoria);
          const cantidad = categoria.productos?.length ?? 0;
          return (
            <Link
              key={categoria.id}
              to={`/productos?categoria=${categoria.id}`}
              className="tarjeta-categoria"
            >
              {imagen ? (
                <img
                  className="categoria-imagen"
                  src={imagen}
                  alt={categoria.nombre}
                  loading="lazy"
                />
              ) : (
                <div className="categoria-imagen placeholder">
                  <span>Sin foto</span>
                </div>
              )}
              <span className="categoria-nombre">{categoria.nombre}</span>
              <span className="categoria-sub">
                {cantidad} producto{cantidad === 1 ? '' : 's'}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}