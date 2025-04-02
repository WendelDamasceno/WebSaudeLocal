import React, { useEffect, useRef, useState } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { getCurrentLocation, initializeMap, addMarker, searchHealthFacilities } from '../utils/GeolocationService';
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import L from 'leaflet';

// Corrigir o ícone padrão do Leaflet que pode não carregar corretamente no React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: icon,
  iconUrl: icon,
  shadowUrl: iconShadow
});

const MapComponent = ({ height = 400, amenityType = 'hospital', searchRadius = 5000 }) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [facilities, setFacilities] = useState([]);

  useEffect(() => {
    const initMap = async () => {
      try {
        setLoading(true);
        // Obter localização atual
        const position = await getCurrentLocation();
        
        // Inicializar mapa
        if (mapRef.current && !mapInstanceRef.current) {
          mapInstanceRef.current = initializeMap('map', position);
          
          // Adicionar marcador para a posição atual
          addMarker(mapInstanceRef.current, position, 'Sua localização');
          
          // Buscar instalações de saúde
          const results = await searchHealthFacilities(position, searchRadius, amenityType);
          setFacilities(results);
          
          // Adicionar marcadores para as instalações encontradas
          results.forEach(facility => {
            addMarker(
              mapInstanceRef.current, 
              facility.position, 
              `<strong>${facility.name}</strong><br>${facility.address}<br>Tel: ${facility.phone}`
            );
          });
        }
      } catch (error) {
        console.error('Erro ao inicializar o mapa:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    
    initMap();
    
    // Cleanup function
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [amenityType, searchRadius]);

  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height }}>
        <Typography color="error">
          Erro ao carregar o mapa: {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ position: 'relative', height, width: '100%' }}>
      {loading && (
        <Box 
          sx={{ 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            right: 0, 
            bottom: 0, 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            backgroundColor: 'rgba(255,255,255,0.7)',
            zIndex: 1000
          }}
        >
          <CircularProgress />
        </Box>
      )}
      <div id="map" style={{ height: '100%', width: '100%' }} ref={mapRef} />
      
      {facilities.length > 0 && (
        <Box 
          sx={{ 
            position: 'absolute', 
            bottom: 10, 
            left: 10, 
            backgroundColor: 'white', 
            padding: 1,
            borderRadius: 1,
            boxShadow: 1,
            maxWidth: '300px',
            zIndex: 1000
          }}
        >
          <Typography variant="subtitle2">
            {facilities.length} {amenityType}(s) encontrado(s)
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default MapComponent;
