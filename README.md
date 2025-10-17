# PWA - Encuesta Musical 🎧

Este proyecto es una Progressive Web App (PWA) avanzada desarrollada como parte de la evaluación de la asignatura. La aplicación consiste en una encuesta de gustos musicales que implementa funcionalidades modernas para garantizar una experiencia de usuario robusta, incluso sin conexión a internet.

**URL de la PWA desplegada:** [Link a tu PWA en Vercel o Netlify]

## ✨ Características Principales

- **Diseño Personalizado:** Interfaz con un tema "Blood Sunset Spotify", con un fondo estático y una paleta de colores inspirada en la música.
- **Funcionalidad Offline-First:** La aplicación es 100% funcional sin conexión a internet.
- **Almacenamiento Local:** Utiliza **IndexedDB** para guardar las respuestas de la encuesta de forma segura en el navegador cuando no hay conexión.
- **Sincronización en Segundo Plano:** Implementa la **Background Sync API** para detectar cuándo el dispositivo recupera la conexión y enviar automáticamente los datos guardados a la base de datos en la nube.
- **Base de Datos en la Nube:** Usa **Firebase Firestore** como backend para almacenar permanentemente todas las respuestas.
- **Notificaciones Push:** Notifica al usuario con un mensaje claro y persistente una vez que sus datos han sido sincronizados con éxito.

## 🛠️ Tecnologías Utilizadas

- **Frontend:** React, Vite, TypeScript
- **Base de Datos (Nube):** Firebase Firestore
- **Almacenamiento Local:** IndexedDB (con la librería `idb`)
- **Service Worker:** Workbox (integrado con `vite-plugin-pwa`)
- **Notificaciones:** Web Push API con claves VAPID

## 🚀 Cómo Ejecutar el Proyecto Localmente

1.  **Clonar el repositorio:**
    ```bash
    git clone [https://github.com/yoel11705/entornospwa.git)
    ```
2.  **Instalar dependencias:**
    ```bash
    cd [nombre-de-la-carpeta]
    npm install
    ```
3.  **Para desarrollo (con recarga en vivo):**
    ```bash
    npm run dev
    ```
4.  **Para probar la versión de producción (necesario para el Service Worker):**
    ```bash
    # 1. Construir el proyecto
    npm run build

    # 2. Previsualizar la construcción
    npm run preview
    ```