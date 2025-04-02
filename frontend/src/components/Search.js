import React, { useState, useEffect, useCallback } from 'react';
import { FaMapMarkerAlt, FaPhoneAlt, FaRegClock, FaStar, FaLocationArrow, FaHospital, FaHospitalAlt, FaUserMd, FaTimesCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { fetchHospitals, fetchDoctors } from '../services/apiService';
import '../styles/Search.css';

const Search = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [location] = useState('Camaçari, BA');
  const [results, setResults] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [allHospitals, setAllHospitals] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [showSpecialtiesModal, setShowSpecialtiesModal] = useState(false);
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  
  const filters = [
    { id: 'all', name: 'Todos', icon: <FaLocationArrow /> },
    { id: 'hospitals', name: 'Hospitais', icon: <FaHospital /> },
    { id: 'clinics', name: 'Clínicas', icon: <FaHospitalAlt /> },
    { id: 'doctors', name: 'Médicos', icon: <FaUserMd /> },
    { id: 'emergency', name: 'Emergência', icon: <FaHospitalAlt /> }
  ];
  
  const specialties = [
    'Cardiologia',
    'Dermatologia',
    'Ginecologia',
    'Ortopedia',
    'Pediatria',
    'Psiquiatria',
    'Oftalmologia',
    'Neurologia',
    'Otorrinolaringologia',
    'Endocrinologia',
    'Urologia',
    'Clínico Geral'
  ];
  
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);
    
    return () => {
      clearTimeout(timerId);
    };
  }, [searchTerm]);
  
  const loadHealthFacilities = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      if (activeFilter === 'doctors') {
        const doctorsData = await fetchDoctors(selectedSpecialty || searchTerm);
        if (doctorsData.error) {
          setError(doctorsData.message);
          setDoctors([]);
          setResults([]);
        } else {
          setDoctors(doctorsData);
          
          const formattedDoctors = doctorsData.map(doctor => ({
            id: doctor.id,
            name: doctor.name,
            type: doctor.specialty || 'Médico',
            address: doctor.location || 'Várias Unidades',
            phone: doctor.phone || '',
            rating: doctor.rating || 4.0,
            distance: doctor.distance || '',
            waitTime: doctor.available ? `Disponível: ${doctor.nextAvailable}` : 'Indisponível',
            hasEmergency: false,
            acceptsHealthInsurance: true,
            isDoctor: true,
            doctorData: doctor
          }));
          
          setResults(formattedDoctors);
        }
      } else {
        const data = await fetchHospitals(location, debouncedSearchTerm);
        if (data.error) {
          setError(data.message);
          setResults([]);
          setAllHospitals([]);
        } else {
          setAllHospitals(data);
          
          let filtered = data;
          if (activeFilter !== 'all') {
            filtered = filtered.filter(hospital => {
              if (activeFilter === 'hospitals') return hospital.type.toLowerCase().includes('hospital');
              if (activeFilter === 'clinics') return hospital.type.toLowerCase().includes('clínica');
              if (activeFilter === 'emergency') return hospital.hasEmergency;
              return true;
            });
          }
          setResults(filtered);
        }
      }
    } catch (err) {
      console.error('Erro ao carregar estabelecimentos de saúde:', err);
      setError('Não foi possível carregar os estabelecimentos de saúde. Tente novamente.');
      setResults([]);
      setAllHospitals([]);
    } finally {
      setLoading(false);
    }
  }, [location, debouncedSearchTerm, activeFilter, selectedSpecialty, searchTerm]);
  
  useEffect(() => {
    loadHealthFacilities();
  }, [loadHealthFacilities]);
  
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  
  const handleFilterChange = (filterId) => {
    setActiveFilter(filterId);
    if (filterId !== 'doctors') {
      setSelectedSpecialty('');
    } else if (!selectedSpecialty) {
      setShowSpecialtiesModal(true);
    }
  };
  
  const handleSpecialtySelect = (specialty) => {
    setSelectedSpecialty(specialty);
    setShowSpecialtiesModal(false);
  };
  
  const clearSpecialty = () => {
    setSelectedSpecialty('');
  };
  
  const getGoogleMapsDirections = (address) => {
    const encodedAddress = encodeURIComponent(`${address}, Camaçari, BA`);
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`, '_blank');
  };
  
  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
  };
  
  const suggestions = [
    'Hospital Geral', 
    'UPA', 
    'Clínica Popular', 
    'Hospital Regional',
    'Centro Médico'
  ];
  
  return (
    <div className="search-screen">
      <div className="search-header">
        <h2 className="search-location">Estabelecimentos em {location}</h2>
        
        <div className="search-input-container">
          <input
            type="text"
            className="search-input"
            placeholder="Buscar hospital..."
            value={searchTerm}
            onChange={handleSearch}
          />
          {searchTerm === '' && activeFilter !== 'doctors' && (
            <div className="search-suggestions">
              <div className="suggestion-chips">
                {suggestions.slice(0, 3).map((suggestion, index) => (
                  <span 
                    key={index} 
                    className="suggestion-chip"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <div className="search-filters">
          {filters.map(filter => (
            <button
              key={filter.id}
              className={`filter-chip ${activeFilter === filter.id ? 'active' : ''}`}
              onClick={() => handleFilterChange(filter.id)}
            >
              <span className="filter-icon">{filter.icon}</span>
              <span>{filter.name}</span>
            </button>
          ))}
        </div>
        
        {activeFilter === 'doctors' && (
          <div className="specialty-selection">
            {selectedSpecialty ? (
              <div className="selected-specialty">
                <span>Especialidade: {selectedSpecialty}</span>
                <button className="clear-specialty" onClick={clearSpecialty}>
                  <FaTimesCircle />
                </button>
              </div>
            ) : (
              <button 
                className="select-specialty-button"
                onClick={() => setShowSpecialtiesModal(true)}
              >
                Selecionar Especialidade
              </button>
            )}
          </div>
        )}
      </div>
      
      {showSpecialtiesModal && (
        <div className="specialties-modal">
          <div className="modal-header">
            <h3>Escolha uma Especialidade</h3>
            <button 
              className="close-modal"
              onClick={() => setShowSpecialtiesModal(false)}
            >
              <FaTimesCircle />
            </button>
          </div>
          <div className="specialties-list">
            {specialties.map((specialty, index) => (
              <button 
                key={index} 
                className="specialty-item"
                onClick={() => handleSpecialtySelect(specialty)}
              >
                {specialty}
              </button>
            ))}
          </div>
        </div>
      )}
      
      <div className="search-results">
        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Buscando {activeFilter === 'doctors' ? 'médicos' : 'estabelecimentos'} em Camaçari...</p>
          </div>
        ) : error ? (
          <div className="error-container">
            <p>{error}</p>
            <button 
              className="retry-button"
              onClick={loadHealthFacilities}
            >
              Tentar novamente
            </button>
          </div>
        ) : results.length === 0 ? (
          <div className="no-results">
            <FaHospital className="no-results-icon" />
            <h3>Nenhum resultado encontrado</h3>
            <p>Tente ajustar seus filtros ou termos de busca</p>
          </div>
        ) : (
          <div className="results-list">
            {results.map(result => (
              <div 
                key={result.id} 
                className="result-card"
                onClick={() => navigate(`/facility/${result.id}`)}
              >
                <div className="result-header">
                  <div className="result-badge">{result.type}</div>
                  <div className="result-rating">
                    <FaStar className="star-icon" />
                    <span>{result.rating}</span>
                  </div>
                </div>
                
                <h3 className="result-name">{result.name}</h3>
                
                <div className="result-info">
                  {!result.isDoctor && (
                    <div className="result-info-item">
                      <FaMapMarkerAlt />
                      <span className="result-address">{result.address}</span>
                      <span className="result-distance">{result.distance}km</span>
                    </div>
                  )}
                  
                  <div className="result-info-item">
                    <FaRegClock />
                    <span>{result.waitTime ? `${result.waitTime}` : 'Horário sob consulta'}</span>
                  </div>
                  
                  {result.phone && (
                    <div className="result-info-item">
                      <FaPhoneAlt />
                      <span>{result.phone}</span>
                    </div>
                  )}
                </div>
                
                <div className="result-tags">
                  {result.hasEmergency && <span className="tag emergency">Emergência 24h</span>}
                  {result.acceptsHealthInsurance && !result.isPublic && 
                    <span className="tag insurance">Aceita Convênio</span>
                  }
                  {result.isPublic && 
                    <span className="tag public">SUS</span>
                  }
                  {result.isDoctor && result.doctorData.available && (
                    <span className="tag available">Disponível Hoje</span>
                  )}
                </div>
                
                <div className="result-actions">
                  {!result.isDoctor ? (
                    <>
                      <button 
                        className="result-action-button primary"
                        onClick={() => getGoogleMapsDirections(result.address)}
                      >
                        <FaLocationArrow />
                        <span>Como Chegar</span>
                      </button>
                      <a 
                        href={`tel:${result.phone}`} 
                        className="result-action-button secondary"
                      >
                        <FaPhoneAlt />
                        <span>Ligar</span>
                      </a>
                    </>
                  ) : (
                    <>
                      <button 
                        className="result-action-button primary"
                        disabled={!result.doctorData.available}
                      >
                        <FaUserMd />
                        <span>Agendar Consulta</span>
                      </button>
                      <button 
                        className="result-action-button secondary"
                      >
                        <FaPhoneAlt />
                        <span>Ver Perfil</span>
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
