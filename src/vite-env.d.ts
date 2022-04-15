/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GANALYTICS_ID: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
