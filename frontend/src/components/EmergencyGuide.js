import React from 'react';
import { FaPhone, FaHospital, FaAmbulance, FaHeartbeat } from 'react-icons/fa';
import '../styles/EmergencyGuide.css';

const EmergencyGuide = () => {
  const emergencyServices = [
    { icon: <FaPhone />, number: '192', service: 'SAMU' },
    { icon: <FaAmbulance />, number: '193', service: 'Bombeiros' },
    { icon: <FaHospital />, number: '190', service: 'Polícia' }
  ];

  const firstAidGuides = [
    {
      title: 'Parada Cardíaca',
      steps: [
        'Verifique se a pessoa está consciente',
        'Ligue para o SAMU (192)',
        'Inicie compressões torácicas',
        'Continue até a chegada do socorro'
      ]
    },
    {
      title: 'Engasgo',
      steps: [
        'Aplique 5 tapas nas costas',
        'Realize a manobra de Heimlich',
        'Se a pessoa ficar inconsciente, ligue 192'
      ]
    }
  ];

  return (
    <div className="emergency-guide-container">
      <section className="guide-section">
        <h2>Números de Emergência</h2>
        <div className="emergency-numbers">
          {emergencyServices.map((service, index) => (
            <div key={index} className="emergency-service">
              <div className="service-icon">{service.icon}</div>
              <h3>{service.service}</h3>
              <a href={`tel:${service.number}`} className="emergency-number">
                {service.number}
              </a>
            </div>
          ))}
        </div>
      </section>

      <section className="guide-section">
        <h2>Guia de Primeiros Socorros</h2>
        {firstAidGuides.map((guide, index) => (
          <div key={index} className="first-aid-guide">
            <h3>
              <FaHeartbeat /> {guide.title}
            </h3>
            <ol className="guide-steps">
              {guide.steps.map((step, stepIndex) => (
                <li key={stepIndex}>{step}</li>
              ))}
            </ol>
          </div>
        ))}
      </section>
    </div>
  );
};

export default EmergencyGuide;
