import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { api } from '../api';
import type { Categoria, Producto } from '../types';
import { useCarrito } from '../context/CarritoContext';
import Filtros, { type Orden } from '../components/Filtros';
import ProductosGrid from '../components/ProductosGrid';

export default function ProductosPage() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [cargando, setCargando] = useState(true);
  const [buscar, setBuscar] = useState('');
  const [orden, setOrden] = useState<Orden>('relevancia');
  const [searchParams, setSearchParams] = useSearchParams();
  const { agregar } = useCarrito();

  const categoriaId = searchParams.get('categoria') ?? '';

  useEffect(() => {
    Promise.all([api.productos(), api.categorias()])
      .then(([listaProductos, listaCategorias]) => {
        setProductos(listaProductos);
        setCategorias(listaCategorias);
      })
      .catch(() => {
        // los estados quedan vacíos y se muestra el estado de carga
      })
      .finally(() => setCargando(false));
  }, []);

  const cambiarCategoriaId = (valor: string) => {
    if (valor) {
      setSearchParams({ categoria: valor });
    } else {
      setSearchParams({});
    }
  };

  const categoriaActual = categorias.find(
    (c) => c.id.toString() === categoriaId,
  );

  const filtrados = useMemo(() => {
    const termino = buscar.trim().toLowerCase();

    let resultado = productos.filter((p) => {
      const coincideCategoria =
        !categoriaId || p.categoria?.id.toString() === categoriaId;
      const coincideNombre =
        !termino || p.nombre.toLowerCase().includes(termino);
      return coincideCategoria && coincideNombre;
    });

    if (orden === 'menor') {
      resultado = [...resultado].sort((a, b) => a.precio - b.precio);
    } else if (orden === 'mayor') {
      resultado = [...resultado].sort((a, b) => b.precio - a.precio);
    }

    return resultado;
  }, [productos, buscar, categoriaId, orden]);

  return (
    <div className="envolvente">
      <div className="pagina-titulo">
        <h1>
          {categoriaActual ? categoriaActual.nombre : 'Nuestros productos'}
        </h1>
        {categoriaActual && (
          <button
            type="button"
            className="enlace-mas"
            onClick={() => cambiarCategoriaId('')}
          >
            Ver todas las categorías
          </button>
        )}
      </div>

      <Filtros
        buscar={buscar}
        onBuscar={setBuscar}
        categoriaId={categoriaId}
        onCategoriaId={cambiarCategoriaId}
        orden={orden}
        onOrden={setOrden}
        categorias={categorias}
        total={filtrados.length}
      />

      {cargando ? (
        <div className="cargando">Cargando productos...</div>
      ) : (
        <ProductosGrid productos={filtrados} onAgregar={agregar} />
      )}
    </div>
  );
}