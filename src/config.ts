interface Banner {
  url: string;
  titulo?: string;
  subtitulo?: string;
}

const env = import.meta.env;

function leerBanners(e: Record<string, string | undefined>): Banner[] {
  const urls = [e.VITE_BANNER_1, e.VITE_BANNER_2, e.VITE_BANNER_3].filter(
    Boolean,
  ) as string[];
  return urls.map((url, i) => ({
    url,
    titulo: e[`VITE_BANNER_TITULO_${i + 1}`] || undefined,
    subtitulo: e[`VITE_BANNER_SUBTITULO_${i + 1}`] || undefined,
  }));
}

function leerCategoriaImagenes(
  e: Record<string, string | undefined>,
): Record<string, string> {
  try {
    return JSON.parse(e.VITE_CATEGORIA_IMAGENES ?? '{}') as Record<
      string,
      string
    >;
  } catch {
    return {};
  }
}

export const config = {
  apiUrl: env.VITE_API_URL ?? '/api',
  whatsappNumber: env.VITE_WHATSAPP_NUMBER ?? '',
  negocioNombre: env.VITE_NEGOCIO_NOMBRE ?? 'Antü',
  logo: env.VITE_LOGO_URL ?? '/logo.svg',
  fondo: env.VITE_FONDO_URL ?? '/fondo.svg',
  banners: leerBanners(env),
  categoriaImagenes: leerCategoriaImagenes(env),
};

export type { Banner };