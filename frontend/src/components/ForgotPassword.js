import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaEnvelope } from 'react-icons/fa';
import '../styles/ForgotPassword.css';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate API call
        setSubmitted(true);
    };

    return (
        <div className="forgot-password-container hapvida-theme">
            <div className="forgot-password-card">
                <Link to="/login" className="back-button">
                    <FaArrowLeft /> Voltar
                </Link>

                {!submitted ? (
                    <>
                        <h2>Recuperar Senha</h2>
                        <p className="instruction-text">
                            Digite seu email cadastrado para receber as instruções de recuperação
                        </p>

                        <form onSubmit={handleSubmit} className="forgot-password-form">
                            <div className="input-group">
                                <FaEnvelope className="input-icon" />
                                <input
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>

                            <button type="submit" className="submit-button">
                                Enviar Instruções
                            </button>
                        </form>
                    </>
                ) : (
                    <div className="success-message">
                        <h2>Email Enviado!</h2>
                        <p>Verifique sua caixa de entrada para redefinir sua senha.</p>
                        <Link to="/login" className="return-login">
                            Voltar para Login
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ForgotPassword;
