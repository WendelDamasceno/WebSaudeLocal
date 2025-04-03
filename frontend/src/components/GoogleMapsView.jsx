import React, { useEffect, useRef, useCallback } from 'react';
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

const GoogleMapsView = ({ center, zoom, markers, height, onMapReady, onMarkerClick }) => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const mapMarkersRef = useRef([]);
  
  // Refs para armazenar as props atuais para uso no useEffect
  const centerRef = useRef(center);
  const zoomRef = useRef(zoom);
  const markersRef = useRef(markers);
  const onMapReadyRef = useRef(onMapReady);
  const onMarkerClickRef = useRef(onMarkerClick);
  
  // Atualizar refs quando as props mudarem
  useEffect(() => {
    centerRef.current = center;
    zoomRef.current = zoom;
    markersRef.current = markers;
    onMapReadyRef.current = onMapReady;
    onMarkerClickRef.current = onMarkerClick;
  }, [center, zoom, markers, onMapReady, onMarkerClick]);

  // Função para adicionar marcadores ao mapa (usando useCallback para evitar recriações)
  const addMarkersToMap = useCallback((mapInstance, markersData) => {
    // Limpar marcadores existentes
    if (mapMarkersRef.current.length > 0) {
      mapMarkersRef.current.forEach(marker => {
        if (mapInstance) marker.removeFrom(mapInstance);
      });
      mapMarkersRef.current = [];
    }
    
    // Criar layer group para os marcadores (melhor desempenho)
    const markersGroup = L.layerGroup();
    
    // Adicionar novos marcadores
    if (mapInstance) {
      markersData?.forEach(markerData => {
        // Verificar se position existe e é válido
        if (!markerData.position || markerData.position.length !== 2) {
          console.error("Posição inválida para o marcador:", markerData);
          return;
        }
        
        // Criar um marcador personalizado para melhor visibilidade
        const marker = L.marker(markerData.position, {
          icon: L.divIcon({
            className: 'hospital-marker',
            html: '<div style="background-color: #1976d2; width: 24px; height: 24px; border-radius: 50%; border: 2px solid white; display: flex; align-items: center; justify-content: center;"><span style="color: white; font-size: 14px;">H</span></div>',
            iconSize: [24, 24],
            iconAnchor: [12, 12]
          })
        });
        
        // Se houver conteúdo, adicionar um popup
        if (markerData.content) {
          marker.bindPopup(markerData.content, {
            maxWidth: 250,
            minWidth: 200,
            closeButton: true
          });
          
          // Abrir o popup imediatamente para mostrar as informações
          setTimeout(() => {
            marker.openPopup();
          }, 500);
        }
        
        // Adicionar evento de clique
        if (markerData.onClick) {
          marker.on('click', () => {
            marker.openPopup();
            markerData.onClick(markerData.id);
          });
        } else if (onMarkerClickRef.current && markerData.id) {
          // Usar callback padrão se não tiver onClick específico
          marker.on('click', () => {
            marker.openPopup();
            onMarkerClickRef.current(markerData.id);
          });
        }
        
        markersGroup.addLayer(marker);
        mapMarkersRef.current.push(marker);
      });
      
      // Adicionar o grupo de marcadores ao mapa de uma vez só (mais eficiente)
      markersGroup.addTo(mapInstance);
    }
  }, []);

  // Efeito para inicializar o mapa (executa apenas uma vez na montagem)
  useEffect(() => {
    if (mapContainerRef.current && !mapRef.current) {
      // Inicializar mapa Leaflet com opções otimizadas
      const options = {
        center: centerRef.current,
        zoom: zoomRef.current || 15,
        zoomControl: false, // Explicitamente desabilitando controles de zoom
        attributionControl: false,
        minZoom: 5,
        maxZoom: 18,
        preferCanvas: true,
        tap: true,
        dragging: true,
        scrollWheelZoom: false, // Desativando o zoom com scrollwheel para evitar problemas
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
      
      // Adicionar marcadores iniciais
      if (markersRef.current && markersRef.current.length > 0) {
        addMarkersToMap(mapRef.current, markersRef.current);
      }
      
      // Notificar que o mapa está pronto
      if (onMapReadyRef.current) {
        const mockMapApi = {
          setCenter: (coords) => mapRef.current.setView([coords.lat, coords.lng], mapRef.current.getZoom()),
          setZoom: (newZoom) => mapRef.current.setZoom(newZoom),
          getZoom: () => mapRef.current.getZoom()
        };
        
        onMapReadyRef.current(mockMapApi);
      }
    }
    
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [addMarkersToMap]); // Adicionado addMarkersToMap como dependência

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

  // Atualizar marcadores quando mudarem
  useEffect(() => {
    if (mapRef.current && markers) {
      // Usar setTimeout para evitar atualizações simultâneas
      const timer = setTimeout(() => {
        addMarkersToMap(mapRef.current, markers);
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [markers, addMarkersToMap]); // Adicionado addMarkersToMap como dependência

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
