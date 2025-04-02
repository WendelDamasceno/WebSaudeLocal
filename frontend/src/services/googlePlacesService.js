import axios from 'axios';

const API_KEY = 'YOUR_GOOGLE_API_KEY'; // Você precisará criar uma chave na Google Cloud Console

export const searchHealthFacilities = async (location, radius = 5000, type = 'hospital') => {
  try {
    // Converter o endereço em coordenadas (geocoding)
    const geocodeResponse = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json`, {
      params: {
        address: location,
        key: API_KEY
      }
    });
    
    if (geocodeResponse.data.status !== 'OK') {
      throw new Error('Não foi possível encontrar as coordenadas do local');
    }
    
    const { lat, lng } = geocodeResponse.data.results[0].geometry.location;
    
    // Buscar estabelecimentos de saúde próximos
    const placesResponse = await axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json`, {
      params: {
        location: `${lat},${lng}`,
        radius: radius,
        type: type, // Pode ser 'hospital', 'doctor', 'health'
        key: API_KEY
      }
    });
    
    if (placesResponse.data.status !== 'OK') {
      throw new Error('Não foi possível buscar estabelecimentos próximos');
    }
    
    // Transformar os resultados para o formato usado pela aplicação
    return placesResponse.data.results.map(place => ({
      id: place.place_id,
      name: place.name,
      type: determineType(place),
      address: place.vicinity,
      phone: place.formatted_phone_number || '',
      rating: place.rating || 0,
      distance: calculateDistance(lat, lng, place.geometry.location.lat, place.geometry.location.lng),
      hasEmergency: determineIfEmergency(place),
      acceptsHealthInsurance: true, // Isso não vem na API, precisaria ser enriquecido
      location: {
        lat: place.geometry.location.lat,
        lng: place.geometry.location.lng
      }
    }));
  } catch (error) {
    console.error('Erro ao buscar estabelecimentos de saúde:', error);
    throw error;
  }
};

// Função utilitária para calcular distância em km entre dois pontos
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Raio da Terra em km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2); 
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  const distance = R * c; // Distância em km
  return distance.toFixed(1);
};

// Determinar tipo do estabelecimento com base nas informações disponíveis
const determineType = (place) => {
  const types = place.types || [];
  const name = place.name.toLowerCase();
  
  if (types.includes('hospital')) return 'Hospital';
  if (name.includes('hospital')) return 'Hospital';
  if (name.includes('upa') || name.includes('pronto')) return 'Emergência';
  if (name.includes('clínica') || name.includes('clinica')) return 'Clínica';
  if (types.includes('doctor')) return 'Clínica';
  
  return 'Estabelecimento de Saúde';
};

// Tentar determinar se tem emergência
const determineIfEmergency = (place) => {
  const name = place.name.toLowerCase();
  return name.includes('emergência') || 
         name.includes('emergencia') || 
         name.includes('pronto socorro') || 
         name.includes('upa') || 
         name.includes('24h');
};

export default searchHealthFacilities;
