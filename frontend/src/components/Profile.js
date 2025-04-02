import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaUser, 
  FaIdCard, 
  FaMedkit, 
  FaPhone, 
  FaEnvelope, 
  FaBirthdayCake, 
  FaVenusMars, 
  FaHeart, 
  FaExclamationTriangle, 
  FaPencilAlt, 
  FaPowerOff, 
  FaShieldAlt,
  FaChevronRight
} from 'react-icons/fa';
import '../styles/Profile.css';

const Profile = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('personal');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulando carregamento dos dados do usuário
    setTimeout(() => {
      setUserData({
        personal: {
          fullName: 'João Silva',
          email: 'joao.silva@email.com',
          phone: '(71) 99999-9999',
          birthDate: '1990-05-15',
          cpf: '123.456.789-00',
          gender: 'Masculino',
          avatar: 'JS'
        },
        health: {
          bloodType: 'O+',
          allergies: ['Penicilina', 'Poeira'],
          chronicConditions: ['Hipertensão'],
          emergencyContact: '(71) 98888-8888'
        },
        insurance: {
          hasHealthPlan: true,
          healthPlanName: 'Unimed',
          healthPlanNumber: '12345678901234',
          healthPlanExpiry: '2025-12-31'
        }
      });
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="profile-loading">
        <div className="loading-spinner"></div>
        <p>Carregando perfil...</p>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-avatar-container">
          <div className="profile-avatar">{userData.personal.avatar}</div>
          <button className="edit-avatar-button">
            <FaPencilAlt />
          </button>
        </div>
        <h1 className="profile-name">{userData.personal.fullName}</h1>
        <p className="profile-email">{userData.personal.email}</p>
        
        <button className="edit-profile-button">
          <FaPencilAlt /> Editar Perfil
        </button>
      </div>
      
      <div className="profile-tabs">
        <button 
          className={`profile-tab ${activeTab === 'personal' ? 'active' : ''}`}
          onClick={() => setActiveTab('personal')}
        >
          <FaUser />
          <span>Pessoal</span>
        </button>
        <button 
          className={`profile-tab ${activeTab === 'health' ? 'active' : ''}`}
          onClick={() => setActiveTab('health')}
        >
          <FaMedkit />
          <span>Saúde</span>
        </button>
        <button 
          className={`profile-tab ${activeTab === 'insurance' ? 'active' : ''}`}
          onClick={() => setActiveTab('insurance')}
        >
          <FaIdCard />
          <span>Plano</span>
        </button>
      </div>
      
      <div className="profile-content">
        {activeTab === 'personal' && (
          <div className="profile-section fade-in">
            <div className="section-header">
              <h2 className="section-title">
                <FaUser className="section-icon" />
                Informações Pessoais
              </h2>
              <button className="section-edit-button">
                <FaPencilAlt />
              </button>
            </div>
            
            <div className="info-card">
              <div className="info-item">
                <div className="info-label">
                  <FaUser className="info-icon" />
                  <span>Nome Completo</span>
                </div>
                <div className="info-value">{userData.personal.fullName}</div>
              </div>
              
              <div className="info-item">
                <div className="info-label">
                  <FaEnvelope className="info-icon" />
                  <span>Email</span>
                </div>
                <div className="info-value">{userData.personal.email}</div>
              </div>
              
              <div className="info-item">
                <div className="info-label">
                  <FaPhone className="info-icon" />
                  <span>Telefone</span>
                </div>
                <div className="info-value">{userData.personal.phone}</div>
              </div>
              
              <div className="info-item">
                <div className="info-label">
                  <FaBirthdayCake className="info-icon" />
                  <span>Data de Nascimento</span>
                </div>
                <div className="info-value">
                  {new Date(userData.personal.birthDate).toLocaleDateString('pt-BR')}
                </div>
              </div>
              
              <div className="info-item">
                <div className="info-label">
                  <FaIdCard className="info-icon" />
                  <span>CPF</span>
                </div>
                <div className="info-value">{userData.personal.cpf}</div>
              </div>
              
              <div className="info-item">
                <div className="info-label">
                  <FaVenusMars className="info-icon" />
                  <span>Gênero</span>
                </div>
                <div className="info-value">{userData.personal.gender}</div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'health' && (
          <div className="profile-section fade-in">
            <div className="section-header">
              <h2 className="section-title">
                <FaMedkit className="section-icon" />
                Informações de Saúde
              </h2>
              <button className="section-edit-button">
                <FaPencilAlt />
              </button>
            </div>
            
            <div className="info-card">
              <div className="info-row">
                <div className="info-item">
                  <div className="info-label">
                    <FaHeart className="info-icon" />
                    <span>Tipo Sanguíneo</span>
                  </div>
                  <div className="info-value">
                    <span className="blood-type">{userData.health.bloodType}</span>
                  </div>
                </div>
                
                <div className="info-item">
                  <div className="info-label">
                    <FaPhone className="info-icon" />
                    <span>Contato de Emergência</span>
                  </div>
                  <div className="info-value">{userData.health.emergencyContact}</div>
                </div>
              </div>
              
              <div className="divider"></div>
              
              <div className="info-block">
                <div className="info-label">
                  <FaExclamationTriangle className="info-icon warning" />
                  <span>Alergias</span>
                </div>
                <div className="tag-container">
                  {userData.health.allergies.length > 0 ? (
                    userData.health.allergies.map((allergy, index) => (
                      <div key={index} className="health-tag">{allergy}</div>
                    ))
                  ) : (
                    <p className="empty-data">Nenhuma alergia cadastrada</p>
                  )}
                </div>
              </div>
              
              <div className="divider"></div>
              
              <div className="info-block">
                <div className="info-label">
                  <FaHeart className="info-icon attention" />
                  <span>Condições Crônicas</span>
                </div>
                <div className="tag-container">
                  {userData.health.chronicConditions.length > 0 ? (
                    userData.health.chronicConditions.map((condition, index) => (
                      <div key={index} className="health-tag condition">{condition}</div>
                    ))
                  ) : (
                    <p className="empty-data">Nenhuma condição cadastrada</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'insurance' && (
          <div className="profile-section fade-in">
            <div className="section-header">
              <h2 className="section-title">
                <FaIdCard className="section-icon" />
                Plano de Saúde
              </h2>
              <button className="section-edit-button">
                <FaPencilAlt />
              </button>
            </div>
            
            {userData.insurance.hasHealthPlan ? (
              <div className="info-card">
                <div className="health-plan-card">
                  <div className="plan-header">
                    <div className="plan-logo">{userData.insurance.healthPlanName.charAt(0)}</div>
                    <div className="plan-name">{userData.insurance.healthPlanName}</div>
                  </div>
                  
                  <div className="plan-details">
                    <div className="plan-number">
                      <span className="label">Número da carteirinha</span>
                      <span className="value">{userData.insurance.healthPlanNumber}</span>
                    </div>
                    
                    <div className="plan-expiry">
                      <span className="label">Validade</span>
                      <span className="value">
                        {new Date(userData.insurance.healthPlanExpiry).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="plan-actions">
                  <button className="action-button">Ver Carteirinha Digital</button>
                </div>
              </div>
            ) : (
              <div className="empty-plan-card">
                <div className="empty-plan-icon">
                  <FaIdCard />
                </div>
                <h3>Sem plano de saúde</h3>
                <p>Você ainda não cadastrou um plano de saúde</p>
                <button className="add-plan-button">Adicionar Plano</button>
              </div>
            )}
          </div>
        )}
      </div>
      
      <div className="profile-menu">
        <h3 className="menu-title">Configurações</h3>
        
        <div className="menu-items">
          <button className="menu-item">
            <div className="menu-item-content">
              <FaShieldAlt className="menu-icon" />
              <span>Privacidade e Segurança</span>
            </div>
            <FaChevronRight className="menu-arrow" />
          </button>
          
          <button className="menu-item">
            <div className="menu-item-content">
              <FaIdCard className="menu-icon" />
              <span>Documentos Médicos</span>
            </div>
            <FaChevronRight className="menu-arrow" />
          </button>
          
          <button className="menu-item logout" onClick={() => navigate('/login')}>
            <div className="menu-item-content">
              <FaPowerOff className="menu-icon" />
              <span>Sair</span>
            </div>
          </button>
        </div>
      </div>
      
      <div className="app-version">
        <p>Saúde Local v1.0.0</p>
      </div>
    </div>
  );
};

export default Profile;
