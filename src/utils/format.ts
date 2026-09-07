import type { Categoria, Producto } from '../types';

const formatoPrecio = new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'ARS',
  maximumFractionDigits: 0,
});

export function formatoPrecioARS(valor: number): string {
  return formatoPrecio.format(valor);
}

export function obtenerImagenProducto(producto: Producto): string | null {
  return producto.imagenes?.[0]?.url ?? null;
}

export function obtenerImagenCategoria(categoria: Categoria): string | null {
  if (categoria.imagen) return categoria.imagen;
  const primerProducto = categoria.productos?.[0];
  if (primerProducto) return obtenerImagenProducto(primerProducto);
  return null;
}