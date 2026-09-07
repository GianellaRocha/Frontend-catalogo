import { useEffect, useState } from 'react';
import { useCarrito } from '../context/CarritoContext';
import { api } from '../api';
import type { FormaDePago } from '../types';
import { config } from '../config';
import { formatoPrecioARS, obtenerImagenProducto } from '../utils/format';
import {
  construirMensajePedido,
  generarLinkWhatsApp,
} from '../utils/whatsapp';

interface CarritoDrawerProps {
  abierto: boolean;
  onCerrar: () => void;
}

export default function CarritoDrawer({
  abierto,
  onCerrar,
}: CarritoDrawerProps) {
  const { items, total, cantidadTotal, quitar, setCantidad, agregar, vaciar } =
    useCarrito();
  const [formasDePago, setFormasDePago] = useState<FormaDePago[]>([]);
  const [formaDePagoId, setFormaDePagoId] = useState<number>(0);
  const [cliente, setCliente] = useState('');
  const [nota, setNota] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    api
      .formasDePago()
      .then((lista) => {
        setFormasDePago(lista);
        if (lista.length > 0) setFormaDePagoId(lista[0].id);
      })
      .catch(() => {
        // sin formas de pago, se usa la letra del mensaje
      });
  }, []);

  useEffect(() => {
    const cerrarConEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCerrar();
    };
    document.addEventListener('keydown', cerrarConEscape);
    return () => document.removeEventListener('keydown', cerrarConEscape);
  }, [onCerrar]);

  if (!abierto) return null;

  const nombreFormaDePago =
    formasDePago.find((f) => f.id === formaDePagoId)?.nombre ?? '';

  async function enviarPedido() {
    if (items.length === 0) return;
    if (!cliente.trim()) {
      setError('Escribí tu nombre para confirmar el pedido.');
      return;
    }
    setError(null);
    setEnviando(true);

    if (config.whatsappNumber) {
      try {
        await api.crearVenta({
          cliente: cliente.trim(),
          formaDePagoId,
          detalles: items.map((i) => ({
            productoId: i.producto.id,
            cantidad: i.cantidad,
          })),
        });
      } catch {
        // si falla el registro, el pedido igual se envía por WhatsApp
      }
    }

    const mensaje = construirMensajePedido(
      items,
      cliente.trim(),
      nombreFormaDePago || 'A convenir',
      nota,
    );
    const link = generarLinkWhatsApp(mensaje);

    if (link) {
      window.open(link, '_blank');
    } else {
      try {
        await navigator.clipboard.writeText(mensaje);
        setError(
          'No hay número de WhatsApp configurado. El pedido se copió al portapapeles.',
        );
      } catch {
        setError(
          'Falta configurar el número de WhatsApp en el archivo .env.',
        );
      }
    }

    setEnviando(false);
  }

  return (
    <div className="carrito-fondo" onClick={onCerrar}>
      <aside
        className="carrito-drawer"
        onClick={(e) => e.stopPropagation()}
        aria-label="Carrito de compras"
      >
        <header className="carrito-cabecera">
          <h3>Tu pedido</h3>
          <button
            type="button"
            className="btn-cerrar"
            onClick={onCerrar}
            aria-label="Cerrar carrito"
          >
            <svg
              viewBox="0 0 24 24"
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </header>

        {items.length === 0 ? (
          <div className="carrito-vacio">
            <svg
              viewBox="0 0 24 24"
              width="44"
              height="44"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
              aria-hidden="true"
            >
              <path d="M3 4h2.5l2 12h11l2-8H6.8" />
              <circle cx="9.5" cy="19" r="1.4" />
              <circle cx="17" cy="19" r="1.4" />
            </svg>
            <p>Tu carrito está vacío.</p>
            <p className="sub">
              Agregá productos y te los preparamos para enviarlos por
              WhatsApp.
            </p>
          </div>
        ) : (
          <>
            <ul className="carrito-lista">
              {items.map((item) => {
                const imagen = obtenerImagenProducto(item.producto);
                return (
                  <li key={item.producto.id} className="carrito-item">
                    {imagen ? (
                      <img
                        className="carrito-img"
                        src={imagen}
                        alt={item.producto.nombre}
                        loading="lazy"
                      />
                    ) : (
                      <img
                        className="carrito-img"
                        src="/placeholder.svg"
                        alt=""
                        loading="lazy"
                      />
                    )}
                    <div className="carrito-detalle">
                      <span className="carrito-nombre">
                        {item.producto.nombre}
                      </span>
                      <span className="carrito-precio">
                        {formatoPrecioARS(item.producto.precio)}
                      </span>
                      <div className="carrito-cantidades">
                        <button
                          type="button"
                          className="btn-mini"
                          onClick={() =>
                            setCantidad(item.producto.id, item.cantidad - 1)
                          }
                          aria-label={`Quitar uno de ${item.producto.nombre}`}
                        >
                          -
                        </button>
                        <span className="carrito-cantidad">
                          {item.cantidad}
                        </span>
                        <button
                          type="button"
                          className="btn-mini"
                          onClick={() => agregar(item.producto)}
                          aria-label={`Agregar uno de ${item.producto.nombre}`}
                        >
                          +
                        </button>
                        <button
                          type="button"
                          className="btn-quitar"
                          onClick={() => quitar(item.producto.id)}
                        >
                          Quitar
                        </button>
                      </div>
                    </div>
                    <span className="carrito-subtotal">
                      {formatoPrecioARS(item.producto.precio * item.cantidad)}
                    </span>
                  </li>
                );
              })}
            </ul>

            <div className="carrito-total">
              <span>
                Total ({cantidadTotal} producto{cantidadTotal === 1 ? '' : 's'})
              </span>
              <span className="monto">{formatoPrecioARS(total)}</span>
            </div>

            <div className="carrito-form">
              <label className="campo">
                <span>Tu nombre</span>
                <input
                  type="text"
                  value={cliente}
                  onChange={(e) => setCliente(e.target.value)}
                  placeholder="¿Con quién hablamos?"
                />
              </label>

              <label className="campo">
                <span>Forma de pago</span>
                <select
                  value={formaDePagoId}
                  onChange={(e) => setFormaDePagoId(Number(e.target.value))}
                >
                  <option value={0}>A convenir</option>
                  {formasDePago.map((f) => (
                    <option key={f.id} value={f.id}>
                      {f.nombre}
                    </option>
                  ))}
                </select>
              </label>

              <label className="campo">
                <span>Nota (opcional)</span>
                <textarea
                  value={nota}
                  onChange={(e) => setNota(e.target.value)}
                  rows={2}
                  placeholder="Comentarios, dirección, color preferido..."
                />
              </label>

              {error && <p className="alerta-error-texto">{error}</p>}

              <button
                type="button"
                className="btn btn-whatsapp"
                onClick={enviarPedido}
                disabled={enviando}
              >
                <svg
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M12 2a9.9 9.9 0 0 0-8.5 15L2.2 22l5.1-1.3A10 10 0 1 0 12 2zm5.6 14.2c-.2.7-1.3 1.3-1.9 1.4-.5.1-1.1.1-1.8-.1a14 14 0 0 1-1.6-.6c-2.9-1.2-4.7-4.2-4.9-4.4-.1-.2-1.1-1.5-1.1-2.9s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5.2.5.7 1.7.8 1.9.1.1.1.3 0 .5-.1.2-.1.3-.3.5l-.5.6c-.2.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.3 2.4 1.5.3.1.5.1.7 0 .2-.1.8-.9 1-1.2.2-.3.4-.3.7-.2.2.1 1.4.7 1.6.8.2.1.4.2.4.3.1.2.1.6-.1 1z" />
                </svg>
                {enviando ? 'Enviando...' : 'Enviar pedido por WhatsApp'}
              </button>

              <button
                type="button"
                className="btn btn-vaciar"
                onClick={vaciar}
              >
                Vaciar carrito
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}