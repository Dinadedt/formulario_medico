import { useState } from 'react'
import './App.css'

function App() {
  const [patient, setPatient] = useState('')
  const [appointmentTime, setAppointmentTime] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', { patient, appointmentTime })
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="form-container">
        <h2>Agendar Cita Médica</h2>
        <div className="form-group">
          <label htmlFor="patient">Nombre del Paciente:</label>
          <input
            type="text"
            id="patient"
            value={patient}
            onChange={(e) => setPatient(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="appointmentTime">Hora de la Cita:</label>
          <input
            type="datetime-local"
            id="appointmentTime"
            value={appointmentTime}
            onChange={(e) => setAppointmentTime(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="button">
          Agendar Cita
        </button>
      </form>
    </div>
  )
}

export default App