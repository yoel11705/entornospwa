import React, { useState } from 'react';
import { addTaskToDB } from './db';
import { db } from './firebase';
import { collection, addDoc } from "firebase/firestore";

export interface MusicFormData {
  apodo: string;
  generoFavorito: string;
  artistaReciente: string;
  tipoAudifonos: string;
  importanciaMusica: string;
  recomendacion: string;
}

const TaskForm: React.FC<{ onTaskAdded: () => void }> = ({ onTaskAdded }) => {
  const [formData, setFormData] = useState<MusicFormData>({
    apodo: '',
    generoFavorito: '',
    artistaReciente: '',
    tipoAudifonos: 'diadema', 
    importanciaMusica: '',
    recomendacion: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (Object.values(formData).some(value => value.trim() === '')) {
        alert('¡Hey! Por favor, responde todas las preguntas para continuar.');
        return;
    }
    setIsSubmitting(true);

    if (navigator.onLine) {
      console.log('Online: Enviando a Firebase...');
      try {
        await addDoc(collection(db, "tareas"), formData);
        onTaskAdded();
      } catch (error) { console.error('Error de Firebase:', error); }
    } else {
      console.log('Offline: Guardando en IndexedDB...');
      await addTaskToDB(formData);
      try {
        const registration = await navigator.serviceWorker.ready;
        await registration.sync.register('sync-new-tasks');
        alert('¡Conexión perdida! Tus respuestas se guardaron y se enviarán en cuanto vuelvas.');
        onTaskAdded();
      } catch (error) { console.error('Error al registrar la sincronización:', error); }
    }
    
    setFormData({ apodo: '', generoFavorito: '', artistaReciente: '', tipoAudifonos: 'diadema', importanciaMusica: '', recomendacion: '' });
    setIsSubmitting(false);
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="apodo">1. ¿Cómo te gusta que te llamen?</label>
          <input type="text" id="apodo" name="apodo" value={formData.apodo} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="generoFavorito">2. ¿Cuál es tu género musical favorito?</label>
          <input type="text" id="generoFavorito" name="generoFavorito" value={formData.generoFavorito} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="artistaReciente">3. Artista o banda que no puedes dejar de escuchar:</label>
          <input type="text" id="artistaReciente" name="artistaReciente" value={formData.artistaReciente} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="tipoAudifonos">4. ¿Qué tipo de audífonos prefieres?</label>
          <select id="tipoAudifonos" name="tipoAudifonos" value={formData.tipoAudifonos} onChange={handleChange}>
            <option value="diadema">De diadema (over-ear)</option>
            <option value="in-ear">In-ear (de chícharo)</option>
            <option value="ambos">Ambos, depende del mood</option>
            <option value="ninguno">¡Sin audífonos, a todo volumen!</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="importanciaMusica">5. Del 1 al 10, ¿qué tan importante es la música en tu vida?</label>
          <input type="number" id="importanciaMusica" name="importanciaMusica" min="1" max="10" value={formData.importanciaMusica} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="recomendacion">6. ¡Recomiéndanos una canción para descubrir!</label>
          <textarea id="recomendacion" name="recomendacion" value={formData.recomendacion} onChange={handleChange}></textarea>
        </div>
        <button type="submit" className="submit-button" disabled={isSubmitting}>
          {isSubmitting ? 'Enviando...' : 'Enviar Mis Gustos'}
        </button>
      </form>
    </div>
  );
};

export default TaskForm;