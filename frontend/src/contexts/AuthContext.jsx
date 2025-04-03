import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar se há um token de autenticação no localStorage
    const token = localStorage.getItem('token');
    const guestMode = localStorage.getItem('guestMode');

    if (token) {
      // Simular carregamento de dados do usuário
      setTimeout(() => {
        setUser({
          name: 'Usuário Demo',
          email: 'usuario@exemplo.com',
          role: 'user'
        });
        setLoading(false);
      }, 500);
    } else if (guestMode) {
      setUser({
        name: 'Visitante',
        role: 'guest'
      });
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('token', 'demo-token');
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('guestMode');
  };

  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
