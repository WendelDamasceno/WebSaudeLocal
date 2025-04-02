import React, { useState, useEffect } from 'react';
import { fetchDoctors } from '../services/apiService';
import '../styles/Telemedicine.css';

const Telemedicine = () => {
    const [selectedSpecialty, setSelectedSpecialty] = useState('');
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const loadDoctors = async () => {
            setLoading(true);
            try {
                const data = await fetchDoctors(selectedSpecialty);
                setDoctors(data);
            } catch (error) {
                console.error('Error loading doctors:', error);
            }
            setLoading(false);
        };

        loadDoctors();
    }, [selectedSpecialty]);

    return (
        <div className="telemedicine-container">
            <h2>Consulta Online</h2>
            
            <div className="specialty-select">
                <select 
                    value={selectedSpecialty} 
                    onChange={(e) => setSelectedSpecialty(e.target.value)}
                >
                    <option value="">Selecione uma especialidade</option>
                    <option value="clinico">Clínico Geral</option>
                    <option value="pediatra">Pediatra</option>
                    <option value="cardiologista">Cardiologista</option>
                </select>
            </div>

            <div className="doctors-list">
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    doctors.map(doctor => (
                        <div key={doctor.id} className="doctor-card">
                            <div className="doctor-info">
                                <h3>{doctor.name}</h3>
                                <p>{doctor.specialty}</p>
                                <div className="doctor-rating">
                                    ⭐ {doctor.rating}
                                </div>
                            </div>
                            <button 
                                className={`consult-button ${doctor.available ? 'available' : 'unavailable'}`}
                                disabled={!doctor.available}
                            >
                                {doctor.available ? 'Consultar Agora' : 'Indisponível'}
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Telemedicine;