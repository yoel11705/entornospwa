import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCfYub6Tz7UGHKjhLnFyD93AOHgoPM5LLM",
  authDomain: "pwa-tareas.firebaseapp.com",
  projectId: "pwa-tareas",
  storageBucket: "pwa-tareas.firebasestorage.app",
  messagingSenderId: "614974128397",
  appId: "1:614974128397:web:4323eaba6b2052b1fc7044"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);