/// <reference types="vite/client" />
/// <reference types="vite/types/importMeta.d.ts" />

interface ImportMeta {
    readonly env: ImportMetaEnv
  }
  
interface ImportMetaEnv {
  readonly VITE_PET_IMAGES_BUCKET_URL: string
  // Add other environment variables you're using
  // For example:
  // readonly VITE_API_URL: string
  // readonly VITE_APP_VERSION: string
  [key: string]: any
}