import React from 'react';
import { FaRegCalendarCheck, FaHistory, FaRegCalendarTimes, FaStethoscope, FaVial } from 'react-icons/fa';

const EmptyState = ({ 
  activeTab, 
  filterYear, 
  handleScheduleConsultation, 
  handleScheduleExam 
}) => {
  if (activeTab === 'upcoming') {
    return (
      <div className="empty-state">
        <FaRegCalendarCheck className="empty-icon" />
        <h3>Nenhum agendamento futuro</h3>
        <p>Você não possui consultas ou exames agendados.</p>
        <div className="schedule-options">
          <button className="schedule-button consultation" onClick={handleScheduleConsultation}>
            <FaStethoscope /> Agendar Consulta
          </button>
          <button className="schedule-button exam" onClick={handleScheduleExam}>
            <FaVial /> Agendar Exame
          </button>
        </div>
      </div>
    );
  } else if (activeTab === 'history') {
    return (
      <div className="empty-state">
        <FaHistory className="empty-icon" />
        <h3>Nenhum histórico encontrado</h3>
        <p>Você não possui consultas ou exames realizados em {filterYear}.</p>
      </div>
    );
  } else {
    return (
      <div className="empty-state">
        <FaRegCalendarTimes className="empty-icon" />
        <h3>Nenhum agendamento cancelado</h3>
        <p>Você não possui consultas ou exames cancelados.</p>
      </div>
    );
  }
};

export default EmptyState;
