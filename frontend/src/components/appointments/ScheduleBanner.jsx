import React from 'react';
import { FaStethoscope, FaVial, FaHospital } from 'react-icons/fa';

const ScheduleBanner = ({ 
  handleScheduleConsultation, 
  handleScheduleExam, 
  navigate 
}) => {
  return (
    <div className="schedule-banner">
      <div className="banner-content">
        <h2>Precisa agendar uma nova consulta ou exame?</h2>
        <p>Encontre os melhores profissionais e clínicas em Camaçari, BA.</p>
        <div className="banner-buttons">
          <button className="banner-button" onClick={handleScheduleConsultation}>
            <FaStethoscope /> 
            <div>
              <span className="button-title">Consultas</span>
              <span className="button-subtitle">Encontre especialistas</span>
            </div>
          </button>
          <button className="banner-button" onClick={handleScheduleExam}>
            <FaVial />
            <div>
              <span className="button-title">Exames</span>
              <span className="button-subtitle">Agende seus exames</span>
            </div>
          </button>
          <button className="banner-button" onClick={() => navigate('/clinics')}>
            <FaHospital />
            <div>
              <span className="button-title">Clínicas</span>
              <span className="button-subtitle">Ver todas as clínicas</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScheduleBanner;
