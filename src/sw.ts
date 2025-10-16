import { precacheAndRoute } from 'workbox-precaching';

declare let self: ServiceWorkerGlobalScope;

precacheAndRoute(self.__WB_MANIFEST);

self.addEventListener('sync', (event: any) => {
  if (event.tag === 'sync-new-tasks') {
    console.log('Service Worker: Sincronizando encuestas musicales con Firebase...');
    event.waitUntil(syncTasksAndNotify());
  }
});

async function syncTasksAndNotify() {
  const projectId = 'pwa-tareas'; 
  const apiURL = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/tareas`;
  
  const dbPromise = self.indexedDB.open('formulariobd', 1);

  dbPromise.onsuccess = (event: any) => {
    const db = event.target.result;
    const store = db.transaction('respuestasbd', 'readonly').objectStore('respuestasbd');
    const getAllRequest = store.getAll();

    getAllRequest.onsuccess = async () => {
      const tasksToSync = getAllRequest.result;
      if (tasksToSync.length === 0) {
        console.log('Service Worker: No hay encuestas pendientes para sincronizar.');
        return;
      }

      try {
        for (const task of tasksToSync) {
            const firestoreDoc = {
                fields: {
                    apodo: { stringValue: task.apodo },
                    generoFavorito: { stringValue: task.generoFavorito },
                    artistaReciente: { stringValue: task.artistaReciente },
                    tipoAudifonos: { stringValue: task.tipoAudifonos },
                    importanciaMusica: { stringValue: task.importanciaMusica },
                    recomendacion: { stringValue: task.recomendacion }
                }
            };

            const response = await fetch(apiURL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(firestoreDoc),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Error del servidor: ${errorData.error.message}`);
            }
        }

        console.log('¡Encuestas musicales sincronizadas con Firebase con éxito!');
        
        const deleteTx = db.transaction('respuestasbd', 'readwrite');
        await deleteTx.objectStore('respuestasbd').clear();

        self.registration.showNotification('¡Respuestas Sincronizadas!', {
          body: 'Tus gustos musicales guardados offline ya están en la nube.',
          icon: '/icons/icon-main.png'
        });

      } catch (error) {
        console.error('Falló la sincronización con Firebase:', error);
      }
    };
  };
}

self.addEventListener('push', (event: any) => {
    console.log('Service Worker: Notificación Push recibida.');
    const message = event.data?.text() ?? '¡Tienes una nueva notificación!';
    
    self.registration.showNotification('Music Survey PWA', {
        body: message,
        icon: '/icons/icon-main.png'
    });
});