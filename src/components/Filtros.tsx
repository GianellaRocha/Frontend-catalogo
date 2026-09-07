import type { Categoria } from '../types';

export type Orden = 'relevancia' | 'menor' | 'mayor';

interface FiltrosProps {
  buscar: string;
  onBuscar: (valor: string) => void;
  categoriaId: string;
  onCategoriaId: (valor: string) => void;
  orden: Orden;
  onOrden: (valor: Orden) => void;
  categorias: Categoria[];
  total: number;
}

export default function Filtros({
  buscar,
  onBuscar,
  categoriaId,
  onCategoriaId,
  orden,
  onOrden,
  categorias,
  total,
}: FiltrosProps) {
  return (
    <div className="filtros">
      <div className="filtro-buscar">
        <svg
          viewBox="0 0 24 24"
          width="20"
          height="20"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="M16.5 16.5L21 21" />
        </svg>
        <input
          type="search"
          value={buscar}
          onChange={(e) => onBuscar(e.target.value)}
          placeholder="Buscar por nombre..."
          aria-label="Buscar productos por nombre"
        />
      </div>

      <select
        className="filtro-select"
        value={categoriaId}
        onChange={(e) => onCategoriaId(e.target.value)}
        aria-label="Filtrar por categoría"
      >
        <option value="">Todas las categorías</option>
        {categorias.map((categoria) => (
          <option key={categoria.id} value={categoria.id}>
            {categoria.nombre}
          </option>
        ))}
      </select>

      <select
        className="filtro-select"
        value={orden}
        onChange={(e) => onOrden(e.target.value as Orden)}
        aria-label="Ordenar productos"
      >
        <option value="relevancia">Orden por defecto</option>
        <option value="menor">Menor precio</option>
        <option value="mayor">Mayor precio</option>
      </select>

      <span className="filtro-total">
        {total} producto{total === 1 ? '' : 's'}
      </span>
    </div>
  );
}