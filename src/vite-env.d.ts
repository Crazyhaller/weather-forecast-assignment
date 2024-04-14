/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_WEATHER_API: number
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
