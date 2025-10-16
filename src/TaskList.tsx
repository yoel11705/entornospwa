import React from 'react';
import { MusicFormData } from './TaskForm'; 

interface Task extends MusicFormData {
  id: number;
}

const TaskList: React.FC<{ tasks: Task[] }> = ({ tasks }) => {
  return (
    <div className="task-list-container">
      <h2>Respuestas Recientes</h2>
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <div key={task.id} className="task-item">
            <p><strong>Apodo:</strong> {task.apodo}</p>
            <p><strong>Género:</strong> {task.generoFavorito}</p>
            <p><strong>Artista del Momento:</strong> {task.artistaReciente}</p>
            <p><strong>Audífonos:</strong> {task.tipoAudifonos}</p>
            <p><strong>Importancia (1-10):</strong> {task.importanciaMusica}</p>
            <p><strong>Recomendación:</strong> {task.recomendacion}</p>
          </div>
        ))
      ) : (
        <p>Aún no hay respuestas. ¡Sé el primero!</p>
      )}
    </div>
  );
};

export default TaskList;