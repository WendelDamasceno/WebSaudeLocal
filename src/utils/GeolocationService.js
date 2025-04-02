import L from 'leaflet';

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

/**
 * Inicializa um mapa Leaflet no elemento especificado
 * @param {string} elementId - ID do elemento HTML onde o mapa será renderizado
 * @param {Array} initialPosition - [latitude, longitude] da posição inicial
 * @param {number} zoom - Nível de zoom inicial
 * @returns {Object} Objeto do mapa Leaflet
 */
export const initializeMap = (elementId, initialPosition = [-23.55052, -46.633308], zoom = 13) => {
  const map = L.map(elementId).setView(initialPosition, zoom);
  
  // Adicionar camada de tiles do OpenStreetMap
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);
  
  return map;
};

/**
 * Adiciona um marcador ao mapa
 * @param {Object} map - Objeto do mapa Leaflet
 * @param {Array} position - [latitude, longitude] da posição do marcador
 * @param {string} popupText - Texto a ser exibido no popup do marcador
 * @returns {Object} Objeto do marcador
 */
export const addMarker = (map, position, popupText) => {
  return L.marker(position).addTo(map).bindPopup(popupText);
};

/**
 * Busca locais de saúde usando a API Overpass
 * @param {Array} center - [latitude, longitude] do centro da busca
 * @param {number} radius - Raio de busca em metros
 * @param {string} amenity - Tipo de local (hospital, pharmacy, doctors, etc)
 * @returns {Promise} Promise com os resultados da busca
 */
export const searchHealthFacilities = async (center, radius = 5000, amenity = 'hospital') => {
  const [lat, lon] = center;
  const query = `
    [out:json];
    node[amenity=${amenity}](around:${radius},${lat},${lon});
    out body;
    >;
    out skel qt;
  `;
  
  try {
    const response = await fetch('https://overpass-api.de/api/interpreter', {
      method: 'POST',
      body: query
    });
    
    if (!response.ok) {
      throw new Error('Falha na resposta da API Overpass');
    }
    
    const data = await response.json();
    return data.elements.map(element => ({
      id: element.id,
      name: element.tags.name || 'Sem nome',
      position: [element.lat, element.lon],
      address: element.tags['addr:street'] 
        ? `${element.tags['addr:street']}${element.tags['addr:housenumber'] ? ', ' + element.tags['addr:housenumber'] : ''}`
        : 'Sem endereço',
      phone: element.tags.phone || 'Não disponível',
      website: element.tags.website || null,
      type: amenity
    }));
  } catch (error) {
    console.error('Erro ao buscar instalações de saúde:', error);
    return [];
  }
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
        resolve([latitude, longitude]);
      },
      error => {
        reject(error);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  });
};
