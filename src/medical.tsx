import { useState, useEffect } from 'react';
import './App.css';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';

// Configuración de Firebase
const firebaseConfig = {
  apiKey: 'TU_API_KEY',
  authDomain: 'TU_AUTH_DOMAIN',
  projectId: 'TU_PROJECT_ID',
  storageBucket: 'TU_STORAGE_BUCKET',
  messagingSenderId: 'TU_MESSAGING_SENDER_ID',
  appId: 'TU_APP_ID',
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

interface MedicalAppointment {
  patient: string;
  appointmentTime: string;
  reason: string;
}

function App() {
  const [patient, setPatient] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const [reason, setReason] = useState('');
  const [appointments, setAppointments] = useState<MedicalAppointment[]>([]);

  // Función para enviar una nueva cita médica a Firestore (POST)
  const saveAppointment = async (appointment: MedicalAppointment) => {
    try {
      await addDoc(collection(db, 'appointments'), appointment);
      alert('Cita agendada correctamente.');
    } catch (error) {
      console.error('Error al guardar la cita: ', error);
      alert('Hubo un error al agendar la cita.');
    }
  };

  // Función para obtener las citas desde Firestore (GET)
  const fetchAppointments = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'appointments'));
      const fetchedAppointments = querySnapshot.docs.map((doc) => doc.data() as MedicalAppointment);
      setAppointments(fetchedAppointments);
    } catch (error) {
      console.error('Error al obtener las citas: ', error);
    }
  };

  useEffect(() => {
    // Obtener las citas al cargar el componente
    fetchAppointments();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newAppointment: MedicalAppointment = {
      patient,
      appointmentTime,
      reason,
    };

    await saveAppointment(newAppointment); // Guarda la cita en Firestore
    setPatient('');
    setAppointmentTime('');
    setReason('');
    fetchAppointments(); // Actualiza la lista después de guardar
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="form-container">
        <h1>Agendar Cita Médica</h1>
        <div>
          <label>Nombre del Paciente:</label>
          <input
            type="text"
            value={patient}
            onChange={(e) => setPatient(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Hora de la Cita:</label>
          <input
            type="datetime-local"
            value={appointmentTime}
            onChange={(e) => setAppointmentTime(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Asunto a Resolver:</label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit">Agendar Cita</button>
      </form>
      <div className="appointments-container">
        <h2>Citas Médicas</h2>
        {appointments.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Paciente</th>
                <th>Hora de la Cita</th>
                <th>Motivo</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment, index) => (
                <tr key={index}>
                  <td>{appointment.patient}</td>
                  <td>{appointment.appointmentTime}</td>
                  <td>{appointment.reason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No hay citas médicas agendadas.</p>
        )}
      </div>
    </div>
  );
}

export default App;
