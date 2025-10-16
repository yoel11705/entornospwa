import { openDB } from 'idb';
import { MusicFormData } from './TaskForm'; // Importamos la interfaz correcta

const DB_NAME = 'formulariobd';
const STORE_NAME = 'respuestasbd';

const initDB = async () => {
  const db = await openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
      }
    },
  });
  return db;
};

// Función actualizada para aceptar el nuevo tipo de datos
export const addTaskToDB = async (task: MusicFormData) => {
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, 'readwrite');
  await tx.store.add(task);
  await tx.done;
};

export const getAllTasksFromDB = async () => {
  const db = await initDB();
  return await db.getAll(STORE_NAME);
};