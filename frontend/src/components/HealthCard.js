import React from 'react';
import QRCode from 'react-qr-code';
import { FaUserCircle } from 'react-icons/fa';
import '../styles/HealthCard.css';

const HealthCard = () => {
  const userData = {
    name: 'João Silva',
    plan: 'Saúde Premium',
    cardNumber: '123456789',
    validUntil: '12/2025',
    qrData: 'SAUDE-123456789'
  };

  return (
    <div className="health-card-container">
      <div className="virtual-card">
        <div className="card-header">
          <img src="/logo.png" alt="Saúde Local" className="card-logo" />
          <span className="card-type">Carteira Virtual</span>
        </div>
        
        <div className="card-body">
          <div className="user-photo">
            <FaUserCircle size={60} />
          </div>
          <div className="card-info">
            <h2>{userData.name}</h2>
            <p className="plan-name">{userData.plan}</p>
            <p className="card-number">Nº {userData.cardNumber}</p>
            <p className="valid-until">Válido até: {userData.validUntil}</p>
          </div>
          <div className="card-qr">
            <QRCode value={userData.qrData} size={100} />
          </div>
        </div>
      </div>
      
      <div className="card-actions">
        <button className="action-button">Compartilhar</button>
        <button className="action-button">Download PDF</button>
      </div>
    </div>
  );
};

export default HealthCard;
