import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Box, CircularProgress, Typography, Button } from '@mui/material';
import { loadGoogleMapsAPI } from '../utils/GeolocationService';
import RefreshIcon from '@mui/icons-material/Refresh';

/**
 * Componente para exibir o mapa do Google
 * Este componente substitui o Leaflet e oferece recursos avançados do Google Maps
 */
const GoogleMapsView = ({ 
  center, 
  zoom = 15, 
  markers = [], 
  height = 400,
  showTraffic = false,
  onMapReady = () => {} 
}) => {
  const mapRef = useRef(null);
  const googleMapRef = useRef(null);
  const markersRef = useRef([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  // Função para adicionar um marcador ao mapa
  const addMarker = useCallback((marker) => {
    if (!googleMapRef.current || !window.google || !window.google.maps) return;
    
    const position = { lat: marker.position[0], lng: marker.position[1] };
    
    const mapMarker = new window.google.maps.Marker({
      position,
      map: googleMapRef.current,
      title: marker.title || '',
      icon: marker.icon ? {
        url: marker.icon,
        scaledSize: new window.google.maps.Size(32, 32),
        anchor: new window.google.maps.Point(16, 32)
      } : undefined
    });
    
    // Adicionar infowindow se tiver conteúdo
    if (marker.content) {
      const infoWindow = new window.google.maps.InfoWindow({
        content: marker.content
      });
      
      mapMarker.addListener('click', () => {
        // Fechar outras infowindows abertas
        markersRef.current.forEach(m => {
          if (m.infoWindow && m.infoWindow !== infoWindow) {
            m.infoWindow.close();
          }
        });
        
        infoWindow.open(googleMapRef.current, mapMarker);
        
        if (marker.onClick) {
          marker.onClick();
        }
      });
      
      // Armazenar referência para poder fechar depois
      mapMarker.infoWindow = infoWindow;
    } else if (marker.onClick) {
      mapMarker.addListener('click', marker.onClick);
    }
    
    // Salvar referência ao marcador
    markersRef.current.push(mapMarker);
  }, []);

  // Mova a função initMap para o useCallback para corrigir a dependência
  const initMap = useCallback(() => {
    if (!window.google || !window.google.maps) {
      setError("API do Google Maps não disponível");
      setLoading(false);
      return;
    }

    try {
      // Criar a instância do mapa com mais opções de estilo
      const mapOptions = {
        center: { lat: center[0], lng: center[1] },
        zoom: zoom,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        zoomControl: false, // Desabilitar controles padrão de zoom
        styles: [
          {
            featureType: "poi.business",
            stylers: [{ visibility: "off" }]
          },
          {
            featureType: "poi.medical",
            stylers: [{ visibility: "on" }] // Manter pontos de interesse médicos
          },
          {
            featureType: "transit",
            elementType: "labels.icon",
            stylers: [{ visibility: "off" }]
          }
        ],
        gestureHandling: "greedy", // Melhor manipulação em dispositivos móveis
        disableDefaultUI: true, // Interface minimalista
      };

      const map = new window.google.maps.Map(mapRef.current, mapOptions);
      googleMapRef.current = map;
      
      // Adicionar layer de tráfego se solicitado
      if (showTraffic) {
        const trafficLayer = new window.google.maps.TrafficLayer();
        trafficLayer.setMap(map);
      }

      // Adicionar marcadores iniciais
      markers.forEach(marker => addMarker(marker));

      setLoading(false);
      setError(null);
      onMapReady(map); // Callback para informar que o mapa está pronto
    } catch (err) {
      console.error("Erro ao inicializar o mapa:", err);
      setError("Ocorreu um erro ao carregar o mapa");
      setLoading(false);
    }
  }, [center, zoom, showTraffic, markers, onMapReady, addMarker]);

  // Função para tentar novamente carregar o mapa
  const handleRetryLoading = () => {
    setLoading(true);
    setError(null);
    setRetryCount(prev => prev + 1);
    
    // Remover qualquer instância anterior
    if (googleMapRef.current) {
      googleMapRef.current = null;
    }
    
    // Limpar marcadores
    if (markersRef.current.length > 0) {
      markersRef.current.forEach(marker => {
        if (marker && marker.setMap) {
          marker.setMap(null);
        }
      });
      markersRef.current = [];
    }
    
    // Carregar a API novamente
    loadGoogleMapsAPI(
      initMap,
      (err) => {
        console.error("Erro ao carregar Google Maps API:", err);
        setError("Não foi possível carregar o mapa do Google. Verifique sua conexão.");
        setLoading(false);
      }
    );
  };

  useEffect(() => {
    // Verifique se o Google Maps já está disponível
    if (window.google && window.google.maps) {
      initMap(); // Se já estiver carregado, inicialize diretamente
      return;
    }
    
    // Se não estiver disponível, carregue via serviço
    loadGoogleMapsAPI(
      initMap,
      (err) => {
        console.error("Erro ao carregar Google Maps API:", err);
        setError("Não foi possível carregar o mapa do Google");
        setLoading(false);
      }
    );

    // Limpeza ao desmontar o componente
    return () => {
      // Limpar marcadores para evitar vazamentos de memória
      if (markersRef.current.length > 0) {
        markersRef.current.forEach(marker => {
          if (marker && marker.setMap) {
            marker.setMap(null);
          }
        });
        markersRef.current = [];
      }
    };
  }, [initMap, retryCount]); // Adicionando retryCount para acionar o efeito quando tentar novamente

  // Efeito para atualizar marcadores quando eles mudam
  useEffect(() => {
    if (googleMapRef.current && markers) {
      // Limpar marcadores anteriores
      markersRef.current.forEach(marker => {
        if (marker && marker.setMap) {
          marker.setMap(null);
        }
      });
      markersRef.current = [];
      
      // Adicionar novos marcadores
      markers.forEach(marker => addMarker(marker));
    }
  }, [markers, addMarker]);

  // Atualizar o centro do mapa quando mudar
  useEffect(() => {
    if (googleMapRef.current && center) {
      googleMapRef.current.setCenter({ lat: center[0], lng: center[1] });
    }
  }, [center]);

  // Atualizar o zoom do mapa quando mudar
  useEffect(() => {
    if (googleMapRef.current && zoom) {
      googleMapRef.current.setZoom(zoom);
    }
  }, [zoom]);

  if (error) {
    return (
      <Box 
        sx={{ 
          height, 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center', 
          justifyContent: 'center',
          backgroundColor: '#f5f5f5',
          borderRadius: 2,
          padding: 2
        }}
      >
        <Typography color="error" gutterBottom>{error}</Typography>
        <Button 
          variant="contained" 
          startIcon={<RefreshIcon />}
          onClick={handleRetryLoading}
          sx={{ mt: 2 }}
        >
          Tentar novamente
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ position: 'relative', height, borderRadius: 2, overflow: 'hidden' }}>
      {loading && (
        <Box 
          sx={{ 
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            zIndex: 1
          }}
        >
          <CircularProgress />
        </Box>
      )}
      <Box 
        ref={mapRef} 
        sx={{ 
          width: '100%', 
          height: '100%'
        }} 
      />
    </Box>
  );
};

export default GoogleMapsView;
