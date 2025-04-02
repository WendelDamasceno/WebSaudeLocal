import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaSearch, 
  FaCalendarAlt, 
  FaUserMd, 
  FaFileMedical, 
  FaHeartbeat, 
  FaClock, 
  FaMapMarkerAlt,
  FaBell,
  FaUser,
  FaSpinner
} from 'react-icons/fa';
import { fetchHealthFacilities } from '../services/apiService';
import '../styles/Home.css';

const Home = () => {
  const services = [
    { name: 'Consultas', icon: <FaCalendarAlt />, path: '/app/appointments', color: '#4158D0' },
    { name: 'Médicos', icon: <FaUserMd />, path: '/app/telemedicine', color: '#C850C0' },
    { name: 'Exames', icon: <FaFileMedical />, path: '/app/exams', color: '#2196F3' },
    { name: 'Carteirinha', icon: <FaHeartbeat />, path: '/app/health-card', color: '#00C853' }
  ];

  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [nearbyHospitals, setNearbyHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        // Simulação de dados para appointments
        // Em um app real, isso viria de uma API
        setTimeout(() => {
          setUpcomingAppointments([
            { 
              id: 1, 
              type: 'Consulta', 
              doctor: 'Dra. Maria Silva', 
              specialty: 'Cardiologia',
              date: '15 Mai', 
              time: '14:30', 
              location: 'Clínica Central'
            }
          ]);
        }, 500);

        // Carregar estabelecimentos próximos
        const hospitalsData = await fetchHealthFacilities();
        if (hospitalsData.error) {
          console.error('Erro ao carregar hospitais:', hospitalsData.message);
        } else {
          // Pega os 3 hospitais mais próximos
          setNearbyHospitals(hospitalsData.slice(0, 3));
        }
      } catch (err) {
        console.error('Erro ao carregar dados da home:', err);
        setError('Não foi possível carregar os dados. Tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="loading-screen">
        <FaSpinner className="loading-icon" />
        <p>Carregando...</p>
      </div>
    );
  }

  return (
    <div className="home-screen">
      {/* Header section */}
      <div className="home-header-wrapper">
        <div className="home-header">
          <div className="app-title">
            <h2>Saúde Local</h2>
          </div>
          <div className="header-actions">
            <Link to="/app/notifications" className="notification-badge-wrapper">
              <FaBell className="notification-icon" />
              <span className="notification-count">2</span>
            </Link>
            <Link to="/app/profile" className="profile-icon-wrapper">
              <FaUser className="profile-icon" />
            </Link>
          </div>
        </div>
        
        <div className="search-container">
          <Link to="/app/search" className="search-bar">
            <FaSearch className="search-icon" />
            <span className="search-input">Buscar médicos, clínicas, serviços...</span>
          </Link>
        </div>
      </div>
      
      {/* Content */}
      <div className="home-content">
        {error && (
          <div className="error-message">
            <p>{error}</p>
            <button onClick={() => window.location.reload()}>
              Tentar novamente
            </button>
          </div>
        )}
        
        {/* Services Grid */}
        <section className="services-section">
          <h3 className="section-title">Serviços</h3>
          <div className="services-grid">
            {services.map((service, index) => (
              <Link 
                key={index} 
                to={service.path} 
                className="service-card"
                style={{background: `linear-gradient(135deg, ${service.color}, ${service.color}99)`}}
              >
                <div className="service-icon">{service.icon}</div>
                <div className="service-name">{service.name}</div>
              </Link>
            ))}
          </div>
        </section>
        
        {/* Emergency banner */}
        <div className="emergency-banner">
          <div className="emergency-content">
            <h3>Emergência?</h3>
            <p>Acesse o guia de emergência ou entre em contato com o SAMU (192)</p>
          </div>
          <Link to="/app/emergency-guide" className="emergency-button">
            <FaHeartbeat />
            <span>Preciso de ajuda</span>
          </Link>
        </div>
        
        {/* Nearby Hospitals */}
        {nearbyHospitals.length > 0 && (
          <section className="nearby-section">
            <div className="section-header">
              <h3 className="section-title">Hospitais Próximos</h3>
              <Link to="/app/search" className="see-all">Ver todos</Link>
            </div>
            
            <div className="nearby-cards">
              {nearbyHospitals.map(hospital => (
                <div key={hospital.id} className="nearby-card">
                  <div className="nearby-badge">{hospital.type}</div>
                  <h4>{hospital.name}</h4>
                  <div className="nearby-info">
                    <div className="nearby-info-item">
                      <FaMapMarkerAlt />
                      <span>{hospital.distance}km</span>
                    </div>
                    {hospital.waitTime && (
                      <div className="nearby-info-item">
                        <FaClock />
                        <span>Espera: {hospital.waitTime}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
        
        {/* Upcoming appointments */}
        <section className="appointments-section">
          <div className="section-header">
            <h3 className="section-title">Próximos Agendamentos</h3>
            <Link to="/app/appointments" className="see-all">Ver todos</Link>
          </div>
          
          {upcomingAppointments.length > 0 ? (
            <div className="appointment-cards">
              {upcomingAppointments.map(appointment => (
                <div key={appointment.id} className="appointment-card">
                  <div className="appointment-date">
                    <div className="date">{appointment.date}</div>
                    <div className="time">{appointment.time}</div>
                  </div>
                  <div className="appointment-details">
                    <h4>{appointment.type} - {appointment.specialty}</h4>
                    <p className="doctor-name">{appointment.doctor}</p>
                    <div className="appointment-location">
                      <FaMapMarkerAlt />
                      <span>{appointment.location}</span>
                    </div>
                  </div>
                  <div className="appointment-status">
                    <FaClock />
                    <span>Em breve</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-appointments">
              <p>Você não tem agendamentos próximos</p>
              <Link to="/app/appointments" className="schedule-button">
                Agendar consulta
              </Link>
            </div>
          )}
        </section>
        
        {/* Health tips */}
        <section className="health-tips">
          <h3 className="section-title">Dicas de Saúde</h3>
          <div className="tip-card">
            <div className="tip-image">
              <img src="/tip-placeholder.jpg" alt="Dica de saúde" />
            </div>
            <div className="tip-content">
              <h4>Hidratação é fundamental</h4>
              <p>Beba pelo menos 2 litros de água por dia para manter o corpo hidratado e saudável.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
