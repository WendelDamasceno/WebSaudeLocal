import React, { useState } from 'react';
import { FaDownload, FaShare, FaClock } from 'react-icons/fa';
import '../styles/Exams.css';

const Exams = () => {
  const [exams] = useState([
    {
      id: 1,
      type: 'Hemograma Completo',
      date: '2024-03-15',
      status: 'completed',
      laboratory: 'Laboratório Central',
      results: 'URL_DO_RESULTADO'
    },
    {
      id: 2,
      type: 'Raio-X Tórax',
      date: '2024-03-20',
      status: 'pending',
      laboratory: 'Centro de Imagem',
      scheduledTime: '14:30'
    }
  ]);

  return (
    <div className="exams-container">
      <h2>Meus Exames</h2>
      
      {exams.map(exam => (
        <div key={exam.id} className="exam-card">
          <div className="exam-header">
            <h3>{exam.type}</h3>
            <span className={`exam-status status-${exam.status}`}>
              {exam.status === 'completed' ? 'Concluído' : 'Pendente'}
            </span>
          </div>
          
          <div className="exam-info">
            <p>Data: {exam.date}</p>
            <p>Local: {exam.laboratory}</p>
            {exam.scheduledTime && (
              <p>
                <FaClock /> Horário: {exam.scheduledTime}
              </p>
            )}
          </div>
          
          <div className="exam-actions">
            {exam.status === 'completed' ? (
              <>
                <button className="action-button">
                  <FaDownload /> Baixar Resultado
                </button>
                <button className="action-button">
                  <FaShare /> Compartilhar
                </button>
              </>
            ) : (
              <button className="action-button">Remarcar</button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Exams;
