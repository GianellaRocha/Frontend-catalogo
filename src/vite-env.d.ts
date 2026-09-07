/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL?: string;
  readonly VITE_WHATSAPP_NUMBER?: string;
  readonly VITE_NEGOCIO_NOMBRE?: string;
  readonly VITE_LOGO_URL?: string;
  readonly VITE_FONDO_URL?: string;
  readonly VITE_BANNER_1?: string;
  readonly VITE_BANNER_2?: string;
  readonly VITE_BANNER_3?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}