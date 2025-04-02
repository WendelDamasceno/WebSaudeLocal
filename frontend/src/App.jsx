import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Páginas
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import ForgotPassword from './pages/ForgotPassword';
import FacilityDetails from './pages/FacilityDetails';
import UserProfile from './pages/UserProfile';
import Settings from './pages/Settings';
import Community from './pages/Community';
import Favorites from './pages/Favorites';
import More from './pages/More'; // Importação da nova página Mais

// Tema e estilos
import theme from './styles/theme';
import { loadGoogleMapsAPI } from './utils/GeolocationService';

function App() {
  // Carregando a API do Google Maps no início da aplicação
  useEffect(() => {
    const loadGoogleAPI = async () => {
      try {
        // Carregar a API
        loadGoogleMapsAPI(
          () => console.log("Google Maps API carregada globalmente com sucesso"),
          (error) => console.error("Erro ao carregar Google Maps API globalmente:", error)
        );
      } catch (error) {
        console.error("Erro ao importar ou carregar serviço de localização:", error);
      }
    };
    
    loadGoogleAPI();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          {/* Rotas públicas */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          
          {/* Rotas protegidas */}
          <Route path="/home" element={<Home />} />
          <Route path="/facility/:id" element={<FacilityDetails />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/community" element={<Community />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/more" element={<More />} /> {/* Nova rota para a página Mais */}
          
          {/* Redirecionar raiz para login ao invés de home */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
