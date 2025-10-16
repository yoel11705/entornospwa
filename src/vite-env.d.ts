/// <reference types="vite/client" />

interface ServiceWorkerRegistration {
  readonly sync: SyncManager;
}