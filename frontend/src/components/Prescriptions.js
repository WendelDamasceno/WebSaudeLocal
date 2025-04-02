import React from 'react';
import { FaFilePrescription, FaDownload, FaShare } from 'react-icons/fa';
import '../styles/Prescriptions.css';

const Prescriptions = () => {
  const prescriptions = [
    {
      id: 1,
      doctor: 'Dr. João Silva',
      date: '2024-03-01',
      medications: [
        { name: 'Dipirona', dosage: '500mg', frequency: '6/6 horas' },
        { name: 'Amoxicilina', dosage: '500mg', frequency: '8/8 horas' }
      ],
      expiryDate: '2024-04-01'
    }
  ];

  return (
    <div className="prescriptions-container">
      <h2>Minhas Prescrições</h2>
      
      {prescriptions.map(prescription => (
        <div key={prescription.id} className="prescription-card">
          <div className="prescription-header">
            <FaFilePrescription className="prescription-icon" />
            <div className="prescription-info">
              <p>Dr(a). {prescription.doctor}</p>
              <p>Data: {prescription.date}</p>
            </div>
          </div>

          <div className="medications-list">
            {prescription.medications.map((med, index) => (
              <div key={index} className="medication-item">
                <h4>{med.name}</h4>
                <p>{med.dosage} - {med.frequency}</p>
              </div>
            ))}
          </div>

          <div className="prescription-footer">
            <p>Válido até: {prescription.expiryDate}</p>
            <div className="prescription-actions">
              <button className="action-button">
                <FaDownload /> Baixar
              </button>
              <button className="action-button">
                <FaShare /> Compartilhar
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Prescriptions;
