import React, { useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Corrigindo o problema dos ícones do Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const GoogleMapsView = ({ center, zoom, markers, height, onMapReady }) => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const mapMarkersRef = useRef([]);

  useEffect(() => {
    if (mapContainerRef.current && !mapRef.current) {
      // Inicializar mapa Leaflet com opções otimizadas
      const options = {
        center: center,
        zoom: zoom || 15,
        zoomControl: false, // Explicitamente desabilitando controles de zoom
        attributionControl: false,
        minZoom: 5,
        maxZoom: 18,
        preferCanvas: true,
        tap: true,
        dragging: true,
        scrollWheelZoom: true,
        doubleClickZoom: true
      };
      
      mapRef.current = L.map(mapContainerRef.current, options);
      
      // Adicionar camada de OpenStreetMap
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
        className: 'map-tiles'
      }).addTo(mapRef.current);
      
      // Adicionar atribuição em posição personalizada
      L.control.attribution({
        position: 'bottomright',
        prefix: false
      }).addTo(mapRef.current);
      
      // Garantir explicitamente que os controles de zoom estão removidos
      mapRef.current.removeControl(mapRef.current.zoomControl);
      
      // Adicionar marcadores iniciais
      if (markers && markers.length > 0) {
        addMarkersToMap(markers);
      }
      
      // Notificar que o mapa está pronto
      if (onMapReady) {
        const mockMapApi = {
          setCenter: (coords) => mapRef.current.setView([coords.lat, coords.lng], mapRef.current.getZoom()),
          setZoom: (newZoom) => mapRef.current.setZoom(newZoom),
          getZoom: () => mapRef.current.getZoom()
        };
        
        onMapReady(mockMapApi);
      }
    }
    
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // Atualizar centro do mapa quando as coordenadas mudarem
  useEffect(() => {
    if (mapRef.current && center) {
      mapRef.current.setView(center, mapRef.current.getZoom(), { animate: true });
    }
  }, [center]);

  // Atualizar zoom quando mudar
  useEffect(() => {
    if (mapRef.current && zoom) {
      mapRef.current.setZoom(zoom);
    }
  }, [zoom]);

  // Função para adicionar marcadores ao mapa
  const addMarkersToMap = (markers) => {
    // Limpar marcadores existentes
    if (mapMarkersRef.current.length > 0) {
      mapMarkersRef.current.forEach(marker => {
        if (mapRef.current) marker.removeFrom(mapRef.current);
      });
      mapMarkersRef.current = [];
    }
    
    // Criar layer group para os marcadores (melhor desempenho)
    const markersGroup = L.layerGroup();
    
    // Adicionar novos marcadores
    if (mapRef.current) {
      markers.forEach(markerData => {
        const marker = L.marker(markerData.position);
        
        // Se houver conteúdo, adicionar um popup
        if (markerData.content) {
          marker.bindPopup(markerData.content);
        }
        
        // Adicionar evento de clique
        if (markerData.onClick) {
          marker.on('click', markerData.onClick);
        }
        
        markersGroup.addLayer(marker);
        mapMarkersRef.current.push(marker);
      });
      
      // Adicionar o grupo de marcadores ao mapa de uma vez só (mais eficiente)
      markersGroup.addTo(mapRef.current);
    }
  };

  // Atualizar marcadores quando mudarem
  useEffect(() => {
    if (markers && markers.length > 0) {
      // Usar setTimeout para evitar atualizações simultâneas
      const timer = setTimeout(() => {
        addMarkersToMap(markers);
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [markers]);

  return (
    <Box
      ref={mapContainerRef}
      sx={{
        width: '100%',
        height: height || '400px',
        borderRadius: 0
      }}
    />
  );
};

export default GoogleMapsView;
