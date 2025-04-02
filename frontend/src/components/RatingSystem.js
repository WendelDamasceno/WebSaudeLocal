import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import '../styles/RatingSystem.css';

const RatingSystem = ({ facilityId }) => {
    const [ratings, setRatings] = useState({
        quality: 0,
        cleanliness: 0,
        experience: 0
    });

    const handleRating = (category, value) => {
        setRatings(prev => ({
            ...prev,
            [category]: value
        }));
    };

    const handleSubmit = async () => {
        try {
            // Implementar chamada API para salvar avaliação
            console.log('Ratings submitted:', ratings);
        } catch (error) {
            console.error('Error submitting ratings:', error);
        }
    };

    return (
        <div className="rating-container">
            <h3>Avalie este estabelecimento</h3>
            
            <div className="rating-category">
                <label>Qualidade do Atendimento</label>
                <div className="stars">
                    {[1,2,3,4,5].map(star => (
                        <FaStar
                            key={star}
                            className={star <= ratings.quality ? 'star active' : 'star'}
                            onClick={() => handleRating('quality', star)}
                        />
                    ))}
                </div>
            </div>

            <div className="rating-category">
                <label>Limpeza</label>
                <div className="stars">
                    {[1,2,3,4,5].map(star => (
                        <FaStar
                            key={star}
                            className={star <= ratings.cleanliness ? 'star active' : 'star'}
                            onClick={() => handleRating('cleanliness', star)}
                        />
                    ))}
                </div>
            </div>

            <div className="rating-category">
                <label>Experiência Geral</label>
                <div className="stars">
                    {[1,2,3,4,5].map(star => (
                        <FaStar
                            key={star}
                            className={star <= ratings.experience ? 'star active' : 'star'}
                            onClick={() => handleRating('experience', star)}
                        />
                    ))}
                </div>
            </div>

            <button className="submit-rating" onClick={handleSubmit}>
                Enviar Avaliação
            </button>
        </div>
    );
};

export default RatingSystem;
