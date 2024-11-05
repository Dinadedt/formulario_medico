import { useState } from 'react'
import './App.css'

interface MedicalAppointment {
  patient: string
  appointmentTime: string
  reason: string
}

function App() {
  const [patient, setPatient] = useState('')
  const [appointmentTime, setAppointmentTime] = useState('')
  const [reason, setReason] = useState('')
  const [appointments, setAppointments] = useState<MedicalAppointment[]>([])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newAppointment: MedicalAppointment = {
      patient,
      appointmentTime,
      reason
    }
    setAppointments([...appointments, newAppointment])
    setPatient('')
    setAppointmentTime('')
    setReason('')
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="form-container">
        {/* Form fields */}
      </form>
      <div className="appointments-container">
        <h2>Citas Médicas</h2>
        {appointments.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Paciente</th>
                <th>Hora de la Cita</th>
                <th>Asunto a Resolver</th>
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
  )
}

export default App