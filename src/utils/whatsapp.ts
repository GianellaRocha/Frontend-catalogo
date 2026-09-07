import { config } from '../config';
import type { ItemCarrito } from '../context/CarritoContext';
import { formatoPrecioARS } from './format';

export function construirMensajePedido(
  items: ItemCarrito[],
  cliente: string,
  formaDePago: string,
  nota: string,
): string {
  const lineas = items.map(
    (i) =>
      `- ${i.producto.nombre} x${i.cantidad}: ${formatoPrecioARS(
        i.producto.precio * i.cantidad,
      )}`,
  );
  const total = items.reduce(
    (suma, i) => suma + i.producto.precio * i.cantidad,
    0,
  );
  const notaLinea = nota.trim() ? `\n*Nota:* ${nota.trim()}` : '';

  return [
    `*Nuevo pedido - ${config.negocioNombre}*`,
    '',
    `*Cliente:* ${cliente}`,
    `*Forma de pago:* ${formaDePago}`,
    '',
    '*Detalle:*',
    ...lineas,
    '',
    `*TOTAL:* ${formatoPrecioARS(total)}`,
    notaLinea,
  ].join('\n');
}

export function generarLinkWhatsApp(
  mensaje: string,
  numero: string = config.whatsappNumber,
): string | null {
  if (!numero) return null;
  return `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
}