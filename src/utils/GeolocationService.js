// Esta função não será mais necessária se o script já estiver no HTML
// Mantemos como fallback caso seja necessário carregar a API dinamicamente
export const loadGoogleMapsAPI = (onLoad, onError) => {
  // Verificar se a API já foi carregada
  if (window.google && window.google.maps) {
    if (onLoad) onLoad();
    return;
  }

  // Configurar callback para quando a API carregar
  window.initGoogleMapsAPI = () => {
    if (onLoad) onLoad();
  };

  // Adicionar script à página apenas se necessário
  const script = document.createElement('script');
  script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places&callback=initGoogleMapsAPI`;
  script.async = true;
  script.defer = true;
  script.onerror = onError;
  document.head.appendChild(script);
};

// Obter localização atual do usuário
export const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocalização não é suportada pelo seu navegador'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        resolve({ latitude, longitude });
      },
      error => {
        reject(error);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  });
};
