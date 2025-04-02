import React, { useState, useEffect } from 'react';
import '../styles/History.css';

const History = () => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulated data - replace with actual API call
        const mockHistory = [
            {
                id: 1,
                date: '2023-12-01',
                type: 'Consulta',
                doctor: 'Dr. João Silva',
                specialty: 'Clínico Geral',
                notes: 'Checkup de rotina'
            },
            {
                id: 2,
                date: '2023-11-15',
                type: 'Exame',
                facility: 'Laboratório Central',
                exam: 'Hemograma Completo',
                status: 'Concluído'
            }
        ];
        
        setTimeout(() => {
            setHistory(mockHistory);
            setLoading(false);
        }, 1000);
    }, []);

    return (
        <div className="history-container">
            <h2 className="history-title">Histórico Médico</h2>
            
            {loading ? (
                <div className="loading">Carregando histórico...</div>
            ) : (
                <div className="history-list">
                    {history.map((item) => (
                        <div key={item.id} className="history-card">
                            <div className="history-date">{item.date}</div>
                            <div className="history-type">{item.type}</div>
                            {item.doctor && (
                                <div className="history-details">
                                    <p>Médico: {item.doctor}</p>
                                    <p>Especialidade: {item.specialty}</p>
                                </div>
                            )}
                            {item.facility && (
                                <div className="history-details">
                                    <p>Local: {item.facility}</p>
                                    <p>Exame: {item.exam}</p>
                                    <p>Status: {item.status}</p>
                                </div>
                            )}
                            {item.notes && (
                                <div className="history-notes">{item.notes}</div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default History;