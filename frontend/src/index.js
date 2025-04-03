import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/global.css';
import './styles/leaflet-custom.css';
import App from './App.jsx';
import reportWebVitals from './reportWebVitals';
import 'framer-motion';

// Adicione as fontes diretamente no <head> do documento
const addGoogleFonts = () => {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Noto+Sans:wght@400;500;600;700&display=swap';
  document.head.appendChild(link);
};

// Chamar a função para adicionar as fontes
addGoogleFonts();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
