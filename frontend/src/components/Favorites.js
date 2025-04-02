import React, { useState } from 'react';
import '../styles/Favorites.css';

const Favorites = () => {
    const [favorites, setFavorites] = useState([
        {
            id: 1,
            name: 'Hospital São Lucas',
            type: 'Hospital',
            address: 'Rua das Flores, 123',
            rating: 4.5,
            distance: '2.3'
        },
        {
            id: 2,
            name: 'Clínica Vida',
            type: 'Clínica',
            address: 'Av. Principal, 456',
            rating: 4.8,
            distance: '1.5'
        }
    ]);

    const handleRemove = (id) => {
        setFavorites(favorites.filter(fav => fav.id !== id));
    };

    const handleNavigate = (address) => {
        // Implement navigation logic
        console.log(`Navegando para: ${address}`);
    };

    return (
        <div className="favorites-container">
            <h2 className="favorites-title">Meus Favoritos</h2>
            <div className="favorites-list">
                {favorites.map((favorite) => (
                    <div key={favorite.id} className="favorite-card">
                        <div className="favorite-info">
                            <h3>{favorite.name}</h3>
                            <span className="favorite-type">{favorite.type}</span>
                            <p>{favorite.address}</p>
                            <div className="favorite-details">
                                <span>⭐ {favorite.rating}</span>
                                <span>📍 {favorite.distance}km</span>
                            </div>
                        </div>
                        <div className="favorite-actions">
                            <button 
                                className="navigate-button"
                                onClick={() => handleNavigate(favorite.address)}
                            >
                                Como Chegar
                            </button>
                            <button 
                                className="remove-button"
                                onClick={() => handleRemove(favorite.id)}
                            >
                                Remover
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Favorites;