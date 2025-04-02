import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  FaArrowLeft, 
  FaMapMarkerAlt, 
  FaPhone, 
  FaClock, 
  FaStar, 
  FaParking, 
  FaHospital, 
  FaUserMd, 
  FaMoneyBillWave,
  FaUsers
} from 'react-icons/fa';
import { fetchHospitalDetail } from '../services/apiService';
import '../styles/HospitalDetail.css';

const HospitalDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hospital, setHospital] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('info');

  useEffect(() => {
    const loadHospitalDetail = async () => {
      try {
        setLoading(true);
        const data = await fetchHospitalDetail(id);
        setHospital(data);
      } catch (err) {
        console.error('Error loading hospital details:', err);
        setError('Não foi possível carregar as informações do estabelecimento');
      } finally {
        setLoading(false);
      }
    };

    loadHospitalDetail();
  }, [id]);

  const getOccupancyStatusColor = (status) => {
    switch (status) {
      case 'low': return '#34C759'; // verde
      case 'medium': return '#FFCC00'; // amarelo
      case 'high': return '#FF9500'; // laranja
      case 'critical': return '#FF3B30'; // vermelho
      default: return '#8E8E93'; // cinza
    }
  };

  const getOccupancyStatusText = (status) => {
    switch (status) {
      case 'low': return 'Pouco Movimento';
      case 'medium': return 'Movimento Moderado';
      case 'high': return 'Muito Movimento';
      case 'critical': return 'Lotado';
      default: return 'Status Desconhecido';
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Carregando informações...</p>
      </div>
    );
  }

  if (error || !hospital) {
    return (
      <div className="error-container">
        <p>{error || 'Ocorreu um erro ao carregar as informações'}</p>
        <button className="back-button" onClick={() => navigate(-1)}>
          <FaArrowLeft /> Voltar
        </button>
      </div>
    );
  }

  return (
    <div className="hospital-detail-container">
      <div className="hospital-detail-header" style={{
        background: hospital.type === 'Hospital' 
          ? 'linear-gradient(135deg, #4158D0, #C850C0)' 
          : 'linear-gradient(135deg, #43CBFF, #9708CC)'
      }}>
        <button className="back-button" onClick={() => navigate(-1)}>
          <FaArrowLeft />
        </button>
        
        <div className="hospital-header-content">
          <div className="hospital-type-badge">
            {hospital.type}
            {hospital.isPublic && <span className="public-badge">SUS</span>}
          </div>
          <h1 className="hospital-name">{hospital.name}</h1>
          <div className="hospital-rating">
            <div className="stars">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className={i < Math.floor(hospital.rating) ? 'filled' : ''} />
              ))}
            </div>
            <span className="rating-value">{hospital.rating}</span>
            <span className="review-count">({hospital.reviewCount} avaliações)</span>
          </div>
        </div>
      </div>
      
      <div className="hospital-status-bar">
        <div className="occupancy-status" 
          style={{color: getOccupancyStatusColor(hospital.occupancyStatus)}}>
          <FaUsers />
          <span>{getOccupancyStatusText(hospital.occupancyStatus)}</span>
        </div>
        {hospital.hasEmergency && (
          <div className="emergency-badge">
            <FaHospital />
            <span>Emergência 24h</span>
          </div>
        )}
      </div>
      
      <div className="hospital-tabs">
        <button 
          className={`tab-button ${activeTab === 'info' ? 'active' : ''}`}
          onClick={() => setActiveTab('info')}
        >
          Informações
        </button>
        <button 
          className={`tab-button ${activeTab === 'specialties' ? 'active' : ''}`}
          onClick={() => setActiveTab('specialties')}
        >
          Especialidades
        </button>
        <button 
          className={`tab-button ${activeTab === 'reviews' ? 'active' : ''}`}
          onClick={() => setActiveTab('reviews')}
        >
          Avaliações
        </button>
      </div>
      
      <div className="hospital-detail-content">
        {activeTab === 'info' && (
          <div className="info-tab">
            <div className="info-card">
              <div className="info-item">
                <FaMapMarkerAlt className="info-icon" />
                <div>
                  <h3>Endereço</h3>
                  <p>{hospital.address}</p>
                  <button className="directions-button">Como Chegar</button>
                </div>
              </div>
              
              <div className="info-item">
                <FaPhone className="info-icon" />
                <div>
                  <h3>Contato</h3>
                  <p>{hospital.phone}</p>
                  <a href={`tel:${hospital.phone}`} className="call-button">Ligar</a>
                </div>
              </div>
              
              <div className="info-item">
                <FaClock className="info-icon" />
                <div>
                  <h3>Horário de Funcionamento</h3>
                  {hospital.operatingHours.map((hours, index) => (
                    <p key={index}>{hours}</p>
                  ))}
                </div>
              </div>
              
              <div className="info-item">
                <FaParking className="info-icon" />
                <div>
                  <h3>Estacionamento</h3>
                  {hospital.hasParking ? (
                    <p>{hospital.parkingDetails}</p>
                  ) : (
                    <p className="no-parking-message">Este estabelecimento não possui estacionamento próprio.</p>
                  )}
                </div>
              </div>
              
              {!hospital.isPublic && (
                <div className="info-item">
                  <FaMoneyBillWave className="info-icon" />
                  <div>
                    <h3>Planos de Saúde Aceitos</h3>
                    <div className="insurance-chips">
                      {hospital.acceptedInsurance.map((insurance, index) => (
                        <span key={index} className="insurance-chip">{insurance}</span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
        
        {activeTab === 'specialties' && (
          <div className="specialties-tab">
            <h3>Especialidades Disponíveis</h3>
            <div className="specialties-grid">
              {hospital.specialties.map((specialty, index) => (
                <div key={index} className="specialty-card">
                  <FaUserMd className="specialty-icon" />
                  <span>{specialty}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {activeTab === 'reviews' && (
          <div className="reviews-tab">
            <div className="reviews-summary">
              <div className="average-rating">
                <h3>Avaliação</h3>
                <div className="big-rating">{hospital.rating}</div>
                <div className="big-stars">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className={i < Math.floor(hospital.rating) ? 'filled' : ''} />
                  ))}
                </div>
                <p>{hospital.reviewCount} avaliações</p>
              </div>
              
              <div className="rating-breakdown">
                {hospital.ratingBreakdown.slice(0, 3).map((breakdown, index) => (
                  <div key={index} className="breakdown-item">
                    <span>{breakdown.stars}★</span>
                    <div className="breakdown-bar-container">
                      <div 
                        className="breakdown-bar" 
                        style={{width: `${breakdown.percentage}%`}}
                      ></div>
                    </div>
                    <span>{breakdown.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="reviews-list">
              <h3>Comentários</h3>
              {hospital.reviews.slice(0, 2).map((review) => (
                <div key={review.id} className="review-card">
                  <div className="review-header">
                    <div className="reviewer-info">
                      <div className="reviewer-avatar">{review.userName.charAt(0)}</div>
                      <div>
                        <p className="reviewer-name">{review.userName}</p>
                        <p className="review-date">{review.date}</p>
                      </div>
                    </div>
                    <div className="review-rating">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} className={i < review.rating ? 'filled' : ''} />
                      ))}
                    </div>
                  </div>
                  <p className="review-content">{review.comment}</p>
                </div>
              ))}
              
              <button className="write-review-button">Escrever avaliação</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HospitalDetail;
