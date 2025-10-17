import { useState, useEffect } from 'react';
import './App.css';
import TaskForm, { MusicFormData } from './TaskForm'; 
import TaskList from './TaskList';
import { getAllTasksFromDB } from './db';

interface Task extends MusicFormData {
  id: number;
}

function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [notificationPermission, setNotificationPermission] = useState(Notification.permission);

  useEffect(() => {
    const fetchTasks = async () => {
      const allTasks = await getAllTasksFromDB();
      setTasks(allTasks);
    };
    fetchTasks();
  }, []);

  const handleTaskAdded = async () => {
    const allTasks = await getAllTasksFromDB();
    setTasks(allTasks);
  };
  
  const handleSubscribeButtonClick = async () => {
    try {
      const swRegistration = await navigator.serviceWorker.ready;
      const permission = await Notification.requestPermission();
      setNotificationPermission(permission); 

      if (permission !== 'granted') {
        throw new Error('Permiso para notificaciones no concedido.');
      }
      
      const vapidPublicKey = 'BIvi9Qn22D803VqgGq4fvdZ4tpfMNThN2efxxQGx4l6AYHyGEi_cC9Q-HkS85fFdcTI3Uu1Xdo7M0jb6eAYyAQw';

      const options = {
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(vapidPublicKey),
      };

      await swRegistration.pushManager.subscribe(options);
      alert('¡Notificaciones activadas con éxito!');

    } catch (error) {
      console.error('Error al suscribirse a notificaciones:', error);
      alert('Error al activar notificaciones. Revisa la consola.');
    }
  };

  const renderNotificationButton = () => {
    if (notificationPermission === 'granted') {
      return <p>✅ ¡Notificaciones activadas!</p>;
    }
    if (notificationPermission === 'denied') {
      return <p>🚫 Has bloqueado las notificaciones. Actívalas en la configuración del sitio.</p>;
    }
    return (
      <button onClick={handleSubscribeButtonClick} style={{ margin: '20px', padding: '10px' }}>
        Activar Notificaciones
      </button>
    );
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Music Survey PWA 🎧</h1>
        {renderNotificationButton()}
      </header>
      <main>
        <TaskForm onTaskAdded={handleTaskAdded} />
        <TaskList tasks={tasks} />
      </main>
    </div>
  );
}

export default App;