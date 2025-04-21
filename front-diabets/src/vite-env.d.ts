/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_STRAPI_API_URL: string;
  readonly VITE_STRAPI_BEARER_TOKEN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
