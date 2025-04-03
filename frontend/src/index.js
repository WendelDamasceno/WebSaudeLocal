import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/global.css';
import './styles/leaflet-custom.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './contexts/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);

// Se você quiser começar a medir o desempenho em seu app, passe uma função
// para registrar resultados (por exemplo: reportWebVitals(console.log))
reportWebVitals();
