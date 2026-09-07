import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import type { Producto } from '../types';

export interface ItemCarrito {
  producto: Producto;
  cantidad: number;
}

interface CarritoContextType {
  items: ItemCarrito[];
  cantidadTotal: number;
  total: number;
  notificacion: string | null;
  agregar: (producto: Producto) => void;
  quitar: (productoId: number) => void;
  setCantidad: (productoId: number, cantidad: number) => void;
  vaciar: () => void;
}

const STORAGE_KEY = 'antu_carrito';

const CarritoContext = createContext<CarritoContextType | null>(null);

export function CarritoProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ItemCarrito[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as ItemCarrito[]) : [];
    } catch {
      return [];
    }
  });
  const [notificacion, setNotificacion] = useState<string | null>(null);
  const temporizador = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // sin almacenamiento disponible
    }
  }, [items]);

  useEffect(() => {
    return () => {
      if (temporizador.current) clearTimeout(temporizador.current);
    };
  }, []);

  function notificar(texto: string) {
    setNotificacion(texto);
    if (temporizador.current) clearTimeout(temporizador.current);
    temporizador.current = setTimeout(() => setNotificacion(null), 2600);
  }

  const agregar = (producto: Producto) => {
    setItems((prev) => {
      const existente = prev.find((i) => i.producto.id === producto.id);
      if (existente) {
        return prev.map((i) =>
          i.producto.id === producto.id
            ? { ...i, cantidad: i.cantidad + 1 }
            : i,
        );
      }
      return [...prev, { producto, cantidad: 1 }];
    });
    notificar(`"${producto.nombre}" agregado al carrito`);
  };

  const quitar = (productoId: number) => {
    setItems((prev) => prev.filter((i) => i.producto.id !== productoId));
  };

  const setCantidad = (productoId: number, cantidad: number) => {
    if (cantidad <= 0) {
      quitar(productoId);
      return;
    }
    setItems((prev) =>
      prev.map((i) =>
        i.producto.id === productoId ? { ...i, cantidad } : i,
      ),
    );
  };

  const vaciar = () => setItems([]);

  const cantidadTotal = items.reduce((suma, i) => suma + i.cantidad, 0);
  const total = items.reduce(
    (suma, i) => suma + i.producto.precio * i.cantidad,
    0,
  );

  const value = useMemo<CarritoContextType>(
    () => ({
      items,
      cantidadTotal,
      total,
      notificacion,
      agregar,
      quitar,
      setCantidad,
      vaciar,
    }),
    [items, cantidadTotal, total, notificacion],
  );

  return (
    <CarritoContext.Provider value={value}>
      {children}
    </CarritoContext.Provider>
  );
}

export function useCarrito(): CarritoContextType {
  const ctx = useContext(CarritoContext);
  if (!ctx) {
    throw new Error('useCarrito debe usarse dentro de CarritoProvider');
  }
  return ctx;
}