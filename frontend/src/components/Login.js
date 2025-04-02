import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock, FaArrowRight } from 'react-icons/fa';
import '../styles/Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Simular autenticação
      if (email && password) {
        navigate('/app/home');
      }
    } catch (err) {
      setError('Login falhou. Verifique suas credenciais.');
    }
  };

  const handleGuestLogin = () => {
    navigate('/app/home');
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="login-logo">
            <img src="/logo.png" alt="Saúde Local" />
          </div>
          <h1 className="login-title">Saúde Local</h1>
          <p className="login-subtitle">Acesse sua conta de saúde</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleLogin}>
          <div className="input-group">
            <div className="input-with-icon">
              <FaEnvelope className="input-icon" />
              <input
                type="email"
                placeholder="" /* Removido o placeholder para usar o label */
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <span className="input-label">Email</span>
            </div>
          </div>

          <div className="input-group">
            <div className="input-with-icon">
              <FaLock className="input-icon" />
              <input
                type="password"
                placeholder="" /* Removido o placeholder para usar o label */
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span className="input-label">Senha</span>
            </div>
          </div>

          <button type="submit" className="login-button">
            Entrar <FaArrowRight style={{ marginLeft: '8px' }} />
          </button>

          <Link to="/forgot-password" className="forgot-password">
            Esqueceu sua senha?
          </Link>
        </form>

        <div className="login-divider">
          <span>ou</span>
        </div>

        <div className="login-options">
          <Link to="/register" className="register-button">
            Criar Nova Conta
          </Link>
          
          <button onClick={handleGuestLogin} className="guest-button">
            Entrar sem cadastro
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;