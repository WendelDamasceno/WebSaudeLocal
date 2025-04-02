import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaEye, FaEyeSlash, FaUser, FaIdCard, FaMedkit, FaShieldAlt } from 'react-icons/fa';
import '../styles/Register.css';

const Register = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  
  const [formData, setFormData] = useState({
    // Personal info
    fullName: '',
    email: '',
    password: '',
    phone: '',
    birthDate: '',
    cpf: '',
    gender: '',
    
    // Health info
    bloodType: '',
    allergies: '',
    chronicConditions: '',
    emergency_contact: '',
    
    // Health plan
    hasHealthPlan: false,
    healthPlanName: '',
    healthPlanNumber: '',
    healthPlanExpiry: ''
  });
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  const nextStep = () => {
    setCurrentStep(prev => prev + 1);
  };
  
  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Process registration here
    console.log("Registration form submitted:", formData);
    navigate('/login');
  };
  
  return (
    <div className="register-container">
      <div className="register-card">
        <Link to="/login" className="back-button">
          <FaArrowLeft /> Voltar para login
        </Link>
        
        <div className="register-header">
          <h1 className="register-title">Crie sua conta</h1>
          <p className="register-subtitle">Registre-se para acessar o Saúde Local</p>
        </div>
        
        <form onSubmit={handleSubmit}>
          {currentStep === 1 && (
            <div className="form-step">
              <h2 className="step-title">
                <FaUser /> Informações Pessoais
              </h2>
              
              <div className="form-grid">
                <div className="form-group">
                  <label>Nome Completo</label>
                  <input
                    type="text"
                    className="form-control"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>E-mail</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Senha</label>
                  <div className="password-input">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                    <button 
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>
                
                <div className="form-group">
                  <label>Telefone</label>
                  <input
                    type="tel"
                    className="form-control"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Data de Nascimento</label>
                  <input
                    type="date"
                    className="form-control"
                    name="birthDate"
                    value={formData.birthDate}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>CPF</label>
                  <input
                    type="text"
                    className="form-control"
                    name="cpf"
                    value={formData.cpf}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Gênero</label>
                  <select
                    className="form-control"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Selecione</option>
                    <option value="male">Masculino</option>
                    <option value="female">Feminino</option>
                    <option value="other">Outro</option>
                    <option value="prefer_not_to_say">Prefiro não dizer</option>
                  </select>
                </div>
              </div>
              
              <div className="action-buttons">
                <button
                  type="button"
                  className="register-button primary-button"
                  onClick={nextStep}
                >
                  Continuar
                </button>
              </div>
            </div>
          )}
          
          {currentStep === 2 && (
            <div className="form-step">
              <h2 className="step-title">
                <FaMedkit /> Informações de Saúde
              </h2>
              
              <div className="form-grid">
                <div className="form-group">
                  <label>Tipo Sanguíneo</label>
                  <select
                    className="form-control"
                    name="bloodType"
                    value={formData.bloodType}
                    onChange={handleChange}
                  >
                    <option value="">Selecione</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Contato de Emergência</label>
                  <input
                    type="text"
                    className="form-control"
                    name="emergency_contact"
                    value={formData.emergency_contact}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="form-group full-width">
                  <label>Alergias</label>
                  <input
                    type="text"
                    className="form-control"
                    name="allergies"
                    value={formData.allergies}
                    onChange={handleChange}
                    placeholder="Separar por vírgulas se tiver múltiplas"
                  />
                </div>
                
                <div className="form-group full-width">
                  <label>Condições Crônicas</label>
                  <input
                    type="text"
                    className="form-control"
                    name="chronicConditions"
                    value={formData.chronicConditions}
                    onChange={handleChange}
                    placeholder="Separar por vírgulas se tiver múltiplas"
                  />
                </div>
              </div>
              
              <div className="action-buttons">
                <button
                  type="button"
                  className="register-button secondary-button"
                  onClick={prevStep}
                >
                  Voltar
                </button>
                <button
                  type="button"
                  className="register-button primary-button"
                  onClick={nextStep}
                >
                  Continuar
                </button>
              </div>
            </div>
          )}
          
          {currentStep === 3 && (
            <div className="form-step">
              <h2 className="step-title">
                <FaIdCard /> Plano de Saúde
              </h2>
              
              <div className="form-group">
                <div className="checkbox-group">
                  <input
                    type="checkbox"
                    id="hasHealthPlan"
                    name="hasHealthPlan"
                    checked={formData.hasHealthPlan}
                    onChange={handleChange}
                  />
                  <label htmlFor="hasHealthPlan">Possuo plano de saúde</label>
                </div>
              </div>
              
              {formData.hasHealthPlan && (
                <div className="form-grid">
                  <div className="form-group">
                    <label>Nome do Plano</label>
                    <input
                      type="text"
                      className="form-control"
                      name="healthPlanName"
                      value={formData.healthPlanName}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Número da Carteirinha</label>
                    <input
                      type="text"
                      className="form-control"
                      name="healthPlanNumber"
                      value={formData.healthPlanNumber}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Validade</label>
                    <input
                      type="date"
                      className="form-control"
                      name="healthPlanExpiry"
                      value={formData.healthPlanExpiry}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              )}
              
              <div className="form-group">
                <h2 className="step-title">
                  <FaShieldAlt /> Termos e Privacidade
                </h2>
                <div className="checkbox-group">
                  <input
                    type="checkbox"
                    id="agreeTerms"
                    checked={agreeTerms}
                    onChange={() => setAgreeTerms(!agreeTerms)}
                    required
                  />
                  <label htmlFor="agreeTerms">
                    Concordo com os <button type="button" className="terms-button">termos de uso</button> e <button type="button" className="terms-button">política de privacidade</button>
                  </label>
                </div>
              </div>
              
              <div className="action-buttons">
                <button
                  type="button"
                  className="register-button secondary-button"
                  onClick={prevStep}
                >
                  Voltar
                </button>
                <button
                  type="submit"
                  className="register-button primary-button"
                  disabled={!agreeTerms}
                >
                  Finalizar Cadastro
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Register;