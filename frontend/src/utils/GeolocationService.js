/**
 * Serviço de Geolocalização usando apenas serviços livres (OpenStreetMap)
 */

// Carregar recursos de mapa (sem Google Maps)
export const loadGoogleMapsAPI = (onSuccess, onError) => {
  // Simulando carregamento bem-sucedido
  setTimeout(() => {
    if (onSuccess) onSuccess();
  }, 500);
};

// Geocodificação reversa usando OpenStreetMap (Nominatim)
export const reverseGeocode = (lat, lng, onSuccess, onError) => {
  fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Falha ao obter endereço');
      }
      return response.json();
    })
    .then(data => {
      if (onSuccess) onSuccess(data.display_name);
    })
    .catch(error => {
      console.error('Erro na geocodificação reversa:', error);
      if (onError) onError(error);
    });
};

// Calcular distância entre dois pontos (retorna em km)
export const calculateDistance = (point1, point2) => {
  const toRad = value => (value * Math.PI) / 180;
  const R = 6371; // Raio da terra em km
  
  const dLat = toRad(point2.lat - point1.lat);
  const dLon = toRad(point2.lng - point1.lng);
  
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(toRad(point1.lat)) * Math.cos(toRad(point2.lat)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const distance = R * c;
  
  // Formatar distância
  if (distance < 1) {
    return `${Math.round(distance * 1000)} m`;
  } else {
    return `${distance.toFixed(1)} km`;
  }
};

// Criação de um objeto nomeado para exportação padrão
const GeolocationService = {
  loadGoogleMapsAPI,
  reverseGeocode,
  calculateDistance
};

export default GeolocationService;
