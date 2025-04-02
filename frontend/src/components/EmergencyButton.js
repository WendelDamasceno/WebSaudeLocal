import React from 'react';
import '../styles/EmergencyButton.css';

const EmergencyButton = () => {
    const emergencyNumbers = [
        { number: '192', service: 'SAMU' },
        { number: '193', service: 'Bombeiros' },
        { number: '190', service: 'Polícia' },
        { number: '199', service: 'Defesa Civil' }
    ];

    const handleCall = (number) => {
        window.location.href = `tel:${number}`;
    };

    return (
        <div className="emergency-container">
            <h2 className="emergency-title">Emergência</h2>
            <div className="emergency-grid">
                {emergencyNumbers.map((item) => (
                    <button
                        key={item.number}
                        className="emergency-button"
                        onClick={() => handleCall(item.number)}
                    >
                        <span className="emergency-number">{item.number}</span>
                        <span className="emergency-service">{item.service}</span>
                    </button>
                ))}
            </div>
            <div className="emergency-info">
                <p>Em caso de emergência, ligue imediatamente para o número apropriado</p>
            </div>
        </div>
    );
};

export default EmergencyButton;