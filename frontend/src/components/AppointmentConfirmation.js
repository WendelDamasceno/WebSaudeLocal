import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  FaCheckCircle, 
  FaCalendarAlt, 
  FaClock, 
  FaMapMarkerAlt, 
  FaUserMd, 
  FaFileMedical,
  FaHospital,
  FaHome,
  FaArrowLeft,
  FaCreditCard
} from 'react-icons/fa';
import '../styles/AppointmentConfirmation.css';

const AppointmentConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const appointmentData = location.state || {};
  
  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('pt-BR', { 
      weekday: 'long', 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  };
  
  return (
    <div className="confirmation-container">
      <div className="confirmation-header">
        <button className="back-button" onClick={() => navigate('/appointments')}>
          <FaArrowLeft />
        </button>
      </div>
      
      <div className="confirmation-content">
        <div className="success-icon">
          <FaCheckCircle />
        </div>
        
        <h1>Agendamento Confirmado!</h1>
        <p className="confirmation-message">
          Seu agendamento foi realizado com sucesso. Enviamos os detalhes por e-mail e você receberá lembretes antes da data.
        </p>
        
        <div className="appointment-details-card">
          <div className="card-header">
            <FaCalendarAlt className="header-icon" />
            <h2>Detalhes do Agendamento</h2>
          </div>
          
          <div className="details-content">
            <div className="detail-item">
              <FaFileMedical className="detail-icon" />
              <div className="detail-text">
                <span className="label">Tipo</span>
                <span className="value">
                  {appointmentData.appointmentType === 'consulta' ? 'Consulta' : 'Exame'} 
                  {appointmentData.isVirtual ? ' (Telemedicina)' : ' (Presencial)'}
                </span>
              </div>
            </div>
            
            {/* Only show specialty for consultations */}
            {appointmentData.appointmentType === 'consulta' && appointmentData.specialty && (
              <div className="detail-item">
                <FaUserMd className="detail-icon" />
                <div className="detail-text">
                  <span className="label">Especialidade</span>
                  <span className="value">{appointmentData.specialty}</span>
                </div>
              </div>
            )}
            
            {/* Show exam name for exams */}
            {appointmentData.appointmentType === 'exame' && appointmentData.selectedExam && (
              <div className="detail-item">
                <FaFileMedical className="detail-icon" />
                <div className="detail-text">
                  <span className="label">Exame</span>
                  <span className="value">{appointmentData.selectedExam}</span>
                </div>
              </div>
            )}
            
            {/* Only show doctor for consultations */}
            {appointmentData.appointmentType === 'consulta' && appointmentData.doctor && (
              <div className="detail-item">
                <FaUserMd className="detail-icon" />
                <div className="detail-text">
                  <span className="label">Médico</span>
                  <span className="value">{appointmentData.doctor}</span>
                </div>
              </div>
            )}
            
            {/* Show health insurance for exams */}
            {appointmentData.appointmentType === 'exame' && appointmentData.healthInsurance && (
              <div className="detail-item">
                <FaCreditCard className="detail-icon" />
                <div className="detail-text">
                  <span className="label">Plano de Saúde</span>
                  <span className="value">{appointmentData.healthInsurance}</span>
                </div>
              </div>
            )}
            
            <div className="detail-item">
              <FaHospital className="detail-icon" />
              <div className="detail-text">
                <span className="label">Local</span>
                <span className="value">{appointmentData.facility}</span>
              </div>
            </div>
            
            <div className="detail-item">
              <FaCalendarAlt className="detail-icon" />
              <div className="detail-text">
                <span className="label">Data</span>
                <span className="value">{formatDate(appointmentData.date)}</span>
              </div>
            </div>
            
            <div className="detail-item">
              <FaClock className="detail-icon" />
              <div className="detail-text">
                <span className="label">Horário</span>
                <span className="value">{appointmentData.time}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="confirmation-id">
          <span className="label">Código de confirmação:</span>
          <span className="code">{Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
        </div>
      </div>
      
      <div className="confirmation-actions">
        <button 
          className="action-button primary" 
          onClick={() => navigate('/appointments')}
        >
          <FaCalendarAlt />
          <span>Ver meus agendamentos</span>
        </button>
        
        <button 
          className="action-button secondary" 
          onClick={() => navigate('/')}
        >
          <FaHome />
          <span>Voltar para início</span>
        </button>
      </div>
    </div>
  );
};

export default AppointmentConfirmation;
