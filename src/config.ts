const env = import.meta.env;

export const config = {
  apiUrl: env.VITE_API_URL ?? '/api',
  whatsappNumber: env.VITE_WHATSAPP_NUMBER ?? '',
  negocioNombre: env.VITE_NEGOCIO_NOMBRE ?? 'Antü',
  logo: env.VITE_LOGO_URL ?? '/logo.svg',
  fondo: env.VITE_FONDO_URL ?? '/fondo.svg',
  banners: [
    env.VITE_BANNER_1 ?? '/banners/banner-1.svg',
    env.VITE_BANNER_2 ?? '/banners/banner-2.svg',
    env.VITE_BANNER_3 ?? '/banners/banner-3.svg',
  ],
};