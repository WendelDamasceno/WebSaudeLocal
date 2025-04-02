import React from 'react';
import { 
  FaCalendarAlt, FaClock, FaMapMarkerAlt, FaUserMd, 
  FaTrashAlt, FaEdit, FaPhone, FaDownload, FaShareAlt, FaRegCheckCircle 
} from 'react-icons/fa';

const AppointmentList = ({ 
  appointments, 
  activeTab, 
  formatDate, 
  handleReschedule, 
  handleCancel 
}) => {
  return (
    <div className={`appointments-list ${activeTab === 'history' ? 'history-view' : ''}`}>
      {appointments.map((appointment) => (
        <div 
          key={appointment.id} 
          className={`appointment-card ${appointment.status}`}
        >
          <div className="appointment-header">
            <h3>
              {appointment.type === 'consulta' 
                ? appointment.specialty 
                : appointment.exam}
            </h3>
            <span className="appointment-type">
              {appointment.type === 'consulta' ? 'Consulta' : 'Exame'}
            </span>
          </div>
          <div className="appointment-details">
            {appointment.type === 'consulta' && (
              <p>
                <FaUserMd /> {appointment.doctor}
              </p>
            )}
            <p>
              <FaCalendarAlt /> {formatDate(appointment.date)}
            </p>
            <p>
              <FaClock /> {appointment.time}
            </p>
            <p>
              <FaMapMarkerAlt /> {appointment.location}
            </p>
            <p className="appointment-address">{appointment.address}</p>
            <p>
              <FaPhone /> {appointment.phone}
            </p>
            
            {appointment.status === 'completed' && appointment.type === 'consulta' && (
              <div className="appointment-result">
                <FaRegCheckCircle className="result-icon" />
                <div className="result-text">
                  <p className="diagnosis">{appointment.diagnosis}</p>
                  <p>{appointment.recommendations}</p>
                </div>
              </div>
            )}
            
            {appointment.status === 'completed' && appointment.type === 'exame' && (
              <div className="appointment-result">
                <FaRegCheckCircle className="result-icon" />
                <div className="result-text">
                  <p className="diagnosis">Resultado: {appointment.results}</p>
                </div>
              </div>
            )}
          </div>
          
          <div className="appointment-actions">
            {appointment.status === 'confirmed' && (
              <>
                <button
                  className="action-button edit"
                  onClick={() => handleReschedule(appointment.id)}
                >
                  <FaEdit /> Reagendar
                </button>
                <button
                  className="action-button delete"
                  onClick={() => handleCancel(appointment.id)}
                >
                  <FaTrashAlt /> Cancelar
                </button>
              </>
            )}
            
            {appointment.status === 'completed' && (
              <>
                <button className="action-button primary">
                  <FaDownload /> Baixar Resultado
                </button>
                <button className="action-button secondary">
                  <FaShareAlt /> Compartilhar
                </button>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AppointmentList;
