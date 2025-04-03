import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/global.css';
import './styles/leaflet-custom.css'; // Adicione esta linha
import App from './App.jsx'; // Alterado para incluir a extensão .jsx
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
