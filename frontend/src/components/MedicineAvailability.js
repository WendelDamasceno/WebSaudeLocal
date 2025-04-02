import React, { useState } from 'react';
import { searchMedicine } from '../services/apiService';
import '../styles/MedicineAvailability.css';

const MedicineAvailability = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
        setLoading(true);
        try {
            const data = await searchMedicine(searchTerm);
            setResults(data);
        } catch (error) {
            console.error('Error searching medicine:', error);
        }
        setLoading(false);
    };

    return (
        <div className="medicine-container">
            <div className="medicine-search">
                <input
                    type="text"
                    placeholder="Digite o nome do medicamento"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="medicine-input"
                />
                <button onClick={handleSearch} className="medicine-search-button">
                    Buscar
                </button>
            </div>

            <div className="medicine-results">
                {loading ? (
                    <div className="loading">Buscando...</div>
                ) : (
                    results.map((item) => (
                        <div key={item.id} className="medicine-item">
                            <h3>{item.name}</h3>
                            <p>{item.pharmacy}</p>
                            <p className="medicine-price">R$ {item.price}</p>
                            <p className="medicine-availability">
                                {item.available ? 'Disponível' : 'Indisponível'}
                            </p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default MedicineAvailability;