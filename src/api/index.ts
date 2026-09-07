import { http } from './http';
import type { Categoria, FormaDePago, Producto } from '../types';

export interface DetalleVentaPayload {
  productoId: number;
  cantidad: number;
}

export interface VentaCatalogoPayload {
  cliente: string;
  formaDePagoId: number;
  detalles: DetalleVentaPayload[];
}

export const api = {
  productos: () => http.get<Producto[]>('/productos'),
  categorias: () => http.get<Categoria[]>('/categorias'),
  formasDePago: () => http.get<FormaDePago[]>('/formas-de-pago'),
  crearVenta: (payload: VentaCatalogoPayload) =>
    http.post<{ id: number }>('/ventas', payload),
};