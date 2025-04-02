import React from 'react';
import { FaPlus, FaStethoscope, FaVial } from 'react-icons/fa';

const AppointmentHeader = ({ 
  handleScheduleConsultation, 
  handleScheduleExam, 
  handleScheduleNew 
}) => {
  return (
    <div className="appointments-header">
      <h1>Meus Agendamentos</h1>
      <div className="header-actions">
        <button className="schedule-option-button" onClick={handleScheduleConsultation}>
          <FaStethoscope /> Agendar Consulta
        </button>
        <button className="schedule-option-button" onClick={handleScheduleExam}>
          <FaVial /> Agendar Exame
        </button>
        <button className="new-appointment-button" onClick={handleScheduleNew}>
          <FaPlus /> Todos os Agendamentos
        </button>
      </div>
    </div>
  );
};

export default AppointmentHeader;
