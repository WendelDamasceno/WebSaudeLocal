/**
 * Serviço de Geolocalização com integração ao Google Maps
 */

// Usando a chave já configurada
const GOOGLE_API_KEY = 'AIzaSyBcFZZlRk4Tvwnr9ESDEdco-MxiC2WKX5I';
let isApiLoading = false;
let callbackQueue = [];

// Carregar o script do Google Maps API
export const loadGoogleMapsAPI = (callback, errorCallback) => {
  // Verificar se a API já está carregada
  if (window.google && window.google.maps) {
    if (callback) callback();
    return;
  }
  
  // Se já estiver carregando, adicione o callback à fila
  if (isApiLoading) {
    callbackQueue.push({ callback, errorCallback });
    return;
  }
  
  isApiLoading = true;
  callbackQueue.push({ callback, errorCallback });
  
  // Criar e adicionar o script
  const script = document.createElement('script');
  script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&libraries=places,geometry&callback=googleMapsCallback`;
  script.async = true;
  script.defer = true;
  
  // Definir função de callback global
  window.googleMapsCallback = () => {
    console.log('Google Maps API carregada com sucesso');
    isApiLoading = false;
    
    // Executar todos os callbacks na fila
    callbackQueue.forEach(item => {
      if (item.callback) item.callback();
    });
    callbackQueue = [];
  };
  
  script.onerror = () => {
    console.error('Falha ao carregar Google Maps API');
    isApiLoading = false;
    
    // Notificar todos os callbacks de erro
    callbackQueue.forEach(item => {
      if (item.errorCallback) item.errorCallback(new Error('Falha ao carregar a API do Google Maps'));
    });
    callbackQueue = [];
  };
  
  document.head.appendChild(script);
  
  return script;
};

// Obter localização atual usando a API de Geolocalização nativa do navegador
export const getCurrentLocation = (successCallback, errorCallback, options = {}) => {
  if (!navigator.geolocation) {
    if (errorCallback) {
      errorCallback({
        code: 0,
        message: 'API de Geolocalização não suportada pelo seu navegador.'
      });
    }
    return;
  }
  
  const defaultOptions = { 
    enableHighAccuracy: true, 
    timeout: 15000, 
    maximumAge: 60000 
  };
  
  const geolocationOptions = { ...defaultOptions, ...options };
  
  navigator.geolocation.getCurrentPosition(
    (position) => {
      if (successCallback) successCallback(position);
    },
    (error) => {
      if (errorCallback) errorCallback(error);
    },
    geolocationOptions
  );
};

// Calcular distância entre dois pontos usando a API do Google
export const calculateDistance = (origin, destination) => {
  if (!window.google || !window.google.maps) {
    console.warn('Google Maps não disponível para calcular distância');
    // Implementar cálculo de distância aproximado como fallback
    const R = 6371; // Raio da Terra em km
    const dLat = (destination.lat - origin.lat) * Math.PI / 180;
    const dLon = (destination.lng - origin.lng) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(origin.lat * Math.PI / 180) * Math.cos(destination.lat * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;
    return distance.toFixed(1);
  }
  
  const originLatLng = new window.google.maps.LatLng(origin.lat, origin.lng);
  const destinationLatLng = new window.google.maps.LatLng(destination.lat, destination.lng);
  
  // Calcular distância em metros
  const distance = window.google.maps.geometry.spherical.computeDistanceBetween(
    originLatLng,
    destinationLatLng
  );
  
  // Converter para quilômetros
  return (distance / 1000).toFixed(1);
};

// Converter endereço para coordenadas (Geocoding)
export const geocodeAddress = (address, callback, errorCallback) => {
  if (!window.google || !window.google.maps) {
    if (errorCallback) {
      errorCallback(new Error('API do Google Maps não carregada corretamente.'));
    }
    return;
  }
  
  const geocoder = new window.google.maps.Geocoder();
  
  geocoder.geocode({ address }, (results, status) => {
    if (status === 'OK' && results && results.length > 0) {
      const location = results[0].geometry.location;
      const formattedAddress = results[0].formatted_address;
      
      callback({
        lat: location.lat(),
        lng: location.lng(),
        address: formattedAddress,
        placeId: results[0].place_id
      });
    } else {
      if (errorCallback) {
        errorCallback(new Error(`Geocoding falhou com status: ${status}`));
      }
    }
  });
};

// Converter coordenadas para endereço (Reverse Geocoding)
export const reverseGeocode = (lat, lng, callback, errorCallback) => {
  if (!window.google || !window.google.maps) {
    if (errorCallback) {
      errorCallback(new Error('API do Google Maps não carregada corretamente.'));
    }
    return;
  }
  
  const latlng = { lat, lng };
  const geocoder = new window.google.maps.Geocoder();
  
  geocoder.geocode({ location: latlng }, (results, status) => {
    if (status === 'OK' && results && results.length > 0) {
      callback(results[0].formatted_address);
    } else {
      if (errorCallback) {
        errorCallback(new Error(`Reverse geocoding falhou com status: ${status}`));
      }
    }
  });
};

// Criando uma variável para exportação
const geolocationService = {
  loadGoogleMapsAPI,
  getCurrentLocation,
  calculateDistance,
  geocodeAddress,
  reverseGeocode
};

export default geolocationService;
