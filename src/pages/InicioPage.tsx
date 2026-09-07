import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api';
import type { Categoria, Producto } from '../types';
import { useCarrito } from '../context/CarritoContext';
import Hero from '../components/Hero';
import Banners from '../components/Banners';
import Categorias from '../components/Categorias';
import ProductosGrid from '../components/ProductosGrid';

export default function InicioPage() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [cargando, setCargando] = useState(true);
  const { agregar } = useCarrito();

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

  const destacados = productos.slice(0, 8);

  return (
    <>
      <Hero />
      <Banners />

      <div className="envolvente">
        <Categorias categorias={categorias} />

        <section className="seccion">
          <div className="seccion-cabecera">
            <h2>Productos destacados</h2>
            <Link to="/productos" className="enlace-mas">
              Ver catálogo completo
            </Link>
          </div>

          {cargando ? (
            <div className="cargando">Cargando productos...</div>
          ) : (
            <ProductosGrid productos={destacados} onAgregar={agregar} />
          )}
        </section>
      </div>
    </>
  );
}