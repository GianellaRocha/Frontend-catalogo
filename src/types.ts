export interface Categoria {
  id: number;
  nombre: string;
  imagen?: string | null;
  productos?: Producto[];
}

export interface Imagen {
  id: number;
  url: string;
}

export interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  categoria: Categoria;
  imagenes?: Imagen[];
}

export interface FormaDePago {
  id: number;
  nombre: string;
}