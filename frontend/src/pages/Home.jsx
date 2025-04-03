import React, { useState, useEffect, useRef, useCallback } from 'react';
import 'leaflet/dist/leaflet.css';
import { 
  Box, 
  Typography, 
  IconButton, 
  ListItemText,
  InputBase,
  styled,
  CircularProgress,
  Tooltip,
  Snackbar,
  Alert,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  Paper,
  Fade,
  Popper,
  ClickAwayListener,
  BottomNavigation,
  BottomNavigationAction,
  Badge,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Divider
} from '@mui/material';
import { 
  Person as PersonIcon,
  Phone as PhoneIcon,
  Search as SearchIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
  LocationOn as LocationIcon,
  MyLocation as MyLocationIcon,
  Close as CloseIcon,
  Home as HomeIcon,
  Chat as ChatIcon,
  Favorite as FavoriteIcon,
  MoreHoriz as MoreIcon,
  LocalHospital as HospitalIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { reverseGeocode, calculateDistance } from '../utils/GeolocationService';
import L from 'leaflet';

// Corrigindo o problema dos ícones do Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

// Hook personalizado para debounce
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

const SearchInput = styled('div')(({ theme, bgColor = 'white' }) => ({
  display: 'flex',
  width: '100%',
  height: 48,
  borderRadius: 12,
  overflow: 'hidden',
  transition: 'box-shadow 0.2s ease-in-out',
  boxShadow: '0 2px 8px rgba(0,0,0,0.12)'
}));

const SearchIconWrapper = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'white',
  paddingLeft: 16,
  borderRadius: '12px 0 0 12px',
  color: '#60778a',
});

const InputWrapper = styled(InputBase)(({ bgColor = 'white' }) => ({
  flex: 1,
  backgroundColor: bgColor,
  padding: '8px 12px 8px 2px',
  border: 'none',
  '& .MuiInputBase-input': {
    border: 'none',
    outline: 'none',
    padding: '0',
    height: '100%',
    fontSize: 16,
    fontWeight: 'normal',
    '&::placeholder': {
      color: '#60778a',
      opacity: 1,
    }
  }
}));

const MapButton = styled(IconButton)({
  width: 40,
  height: 40,
  backgroundColor: 'white',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  '&:hover': {
    backgroundColor: 'white',
  }
});

const SearchBar = ({ onSearch, loading, searchResults, onSelectResult }) => {
  const [searchInput, setSearchInput] = useState('');
  const [showResults, setShowResults] = useState(false);
  const anchorRef = useRef(null);
  
  // Adicione debounce para o input de busca com 300ms de delay
  const debouncedSearchTerm = useDebounce(searchInput, 300);
  
  // Use o termo com debounce para fazer a busca
  useEffect(() => {
    if (debouncedSearchTerm.length > 2) {
      onSearch(debouncedSearchTerm);
      setShowResults(true);
    }
  }, [debouncedSearchTerm, onSearch]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    
    // Não chama mais diretamente onSearch aqui
    if (value.length <= 2) {
      setShowResults(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && searchInput.trim()) {
      onSearch(searchInput, true);
    }
  };

  const handleSelectResult = (result) => {
    onSelectResult(result);
    setSearchInput(result.display_name.split(',')[0]);
    setShowResults(false);
  };

  const handleClear = () => {
    setSearchInput('');
    setShowResults(false);
  };

  const handleClickAway = () => {
    setShowResults(false);
  };

  return (
    <Box sx={{ 
      position: 'relative', 
      width: '100%',
      maxWidth: '360px', // Limitando a largura máxima
      mx: 'auto' // Centraliza horizontalmente
    }} ref={anchorRef}>
      <SearchInput sx={{ 
        boxShadow: showResults ? '0 4px 12px rgba(0,0,0,0.15)' : '0 2px 8px rgba(0,0,0,0.12)',
        width: '100%',
        transition: 'all 0.2s ease-in-out',
        backgroundColor: 'white'
      }}>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <InputWrapper 
          placeholder="Buscar hospitais, clínicas ou endereços"
          value={searchInput}
          onChange={handleSearch}
          onKeyPress={handleKeyPress}
          inputProps={{ 'aria-label': 'buscar' }}
        />
        {searchInput && (
          <IconButton 
            size="small" 
            onClick={handleClear}
            sx={{ mr: 1, color: 'text.secondary' }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        )}
      </SearchInput>
      
      <Popper
        open={showResults && searchResults.length > 0}
        anchorEl={anchorRef.current}
        placement="bottom-start"
        transition
        style={{ 
          zIndex: 1500, 
          width: '100%',
          maxWidth: '360px', // Garante que o dropdown tenha a mesma largura
          position: 'absolute',
          boxShadow: '0 6px 12px rgba(0,0,0,0.15)',
          marginTop: '2px'
        }}
        modifiers={{
          offset: {
            enabled: true,
            offset: '0, 8'
          },
          preventOverflow: {
            enabled: true,
            boundariesElement: 'viewport'
          }
        }}
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={200}>
            <Paper 
              elevation={4}
              sx={{ 
                mt: 0.5, 
                maxHeight: 350, 
                overflow: 'auto',
                width: '100%',
                borderRadius: 2,
                border: '1px solid rgba(0,0,0,0.08)'
              }}
            >
              <ClickAwayListener onClickAway={handleClickAway}>
                <List dense sx={{ p: 0 }}>
                  {loading ? (
                    <ListItem>
                      <Box sx={{ display: 'flex', alignItems: 'center', px: 2, py: 1 }}>
                        <CircularProgress size={20} sx={{ mr: 2 }} />
                        <Typography>Buscando...</Typography>
                      </Box>
                    </ListItem>
                  ) : searchResults.length > 0 ? (
                    searchResults.map((result, index) => (
                      <ListItem 
                        key={`${result.place_id || result.osm_id || index}`} 
                        button 
                        onClick={() => handleSelectResult(result)}
                        sx={{ 
                          py: 1.5,
                          borderBottom: index < searchResults.length - 1 ? '1px solid rgba(0,0,0,0.05)' : 'none',
                          '&:hover': { backgroundColor: 'rgba(0,0,0,0.04)' }
                        }}
                      >
                        <ListItemAvatar>
                          <Avatar sx={{ bgcolor: 'primary.light' }}>
                            <LocationIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText 
                          primary={result.display_name.split(',')[0]} 
                          secondary={result.display_name.split(',').slice(1, 3).join(',')} 
                          primaryTypographyProps={{ fontWeight: 'medium' }}
                          secondaryTypographyProps={{ noWrap: true }}
                        />
                      </ListItem>
                    ))
                  ) : (
                    <ListItem>
                      <Box sx={{ display: 'flex', alignItems: 'center', px: 2, py: 2 }}>
                        <Typography color="text.secondary">Nenhum resultado encontrado</Typography>
                      </Box>
                    </ListItem>
                  )}
                </List>
              </ClickAwayListener>
            </Paper>
          </Fade>
        )}
      </Popper>
    </Box>
  );
};

const EmergencyService = ({ number, service, color = 'error', onClick }) => (
  <Grid item xs={6}>
    <Button
      variant="contained"
      color={color}
      fullWidth
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: 120,
        borderRadius: 3,
        textTransform: 'none',
        p: 2
      }}
      onClick={onClick}
    >
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        {number}
      </Typography>
      <Typography variant="subtitle1">{service}</Typography>
    </Button>
  </Grid>
);

const Home = () => {
  const [emergencyDialogOpen, setEmergencyDialogOpen] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [nearbyEmergencyFacilities, setNearbyEmergencyFacilities] = useState([]);
  const [location, setLocation] = useState(null);
  const [locationStatus, setLocationStatus] = useState('idle');
  const [locationError, setLocationError] = useState(null);
  const [currentAddress, setCurrentAddress] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [bottomNavValue, setBottomNavValue] = useState(0);
  const [mapInstance, setMapInstance] = useState(null);
  const mapContainerRef = useRef(null);
  const markersLayerGroup = useRef(null);
  
  const navigate = useNavigate();
  
  const navigateToProfile = () => {
    navigate('/profile');
  };

  const handleEmergencyClick = () => {
    setEmergencyDialogOpen(true);
    if (location) {
      fetchEmergencyFacilities(location.lat, location.lng);
    }
  };

  const fetchEmergencyFacilities = async (lat, lng, radius = 10000) => {
    try {
      const overpassApi = `https://overpass-api.de/api/interpreter`;
      const query = `
        [out:json];
        (
          node["amenity"="hospital"]["emergency"="yes"](around:${radius},${lat},${lng});
          node["amenity"="clinic"]["emergency"="yes"](around:${radius},${lat},${lng});
          node["amenity"="doctors"]["emergency"="yes"](around:${radius},${lat},${lng});
          node["emergency"="yes"](around:${radius},${lat},${lng});
        );
        out body;
      `;
      
      const response = await fetch(overpassApi, {
        method: 'POST',
        body: query
      });
      
      if (!response.ok) {
        throw new Error('Falha ao buscar estabelecimentos de emergência próximos');
      }
      
      const data = await response.json();
      
      const emergencyFacilities = data.elements.map(element => {
        const { id, lat, lon, tags } = element;
        const type = tags.amenity || 'serviço de emergência';
        
        return {
          id,
          name: tags.name || `${type.charAt(0).toUpperCase() + type.slice(1)}`,
          position: [lat, lon],
          distance: calculateDistance(
            { lat: location.lat, lng: location.lng },
            { lat: parseFloat(lat), lng: parseFloat(lon) }
          ),
          address: tags['addr:street'] 
            ? `${tags['addr:street']} ${tags['addr:housenumber'] || ''}` 
            : 'Endereço não disponível',
          phone: tags.phone || tags['contact:phone'] || 'Telefone não disponível',
        };
      });
      
      emergencyFacilities.sort((a, b) => a.distance - b.distance);
      
      setNearbyEmergencyFacilities(emergencyFacilities.slice(0, 5));
      
      if (emergencyFacilities.length === 0) {
        setNearbyEmergencyFacilities([
          {
            id: 1,
            name: 'Hospital Regional',
            distance: '2.1 km',
            address: 'Av. Principal, 123',
            phone: '(71) 3333-4444'
          },
          {
            id: 2,
            name: 'UPA 24h',
            distance: '3.5 km',
            address: 'Rua das Flores, 789',
            phone: '(71) 5555-6666'
          },
          {
            id: 3,
            name: 'Pronto Atendimento Municipal',
            distance: '4.3 km',
            address: 'Av. Central, 456',
            phone: '(71) 7777-8888'
          }
        ]);
      }
    } catch (error) {
      console.error('Erro ao buscar estabelecimentos de emergência:', error);
      setNearbyEmergencyFacilities([
        {
          id: 1,
          name: 'Hospital Regional',
          distance: '2.1 km',
          address: 'Av. Principal, 123',
          phone: '(71) 3333-4444'
        },
        {
          id: 2,
          name: 'UPA 24h',
          distance: '3.5 km',
          address: 'Rua das Flores, 789',
          phone: '(71) 5555-6666'
        },
        {
          id: 3,
          name: 'Pronto Atendimento Municipal',
          distance: '4.3 km',
          address: 'Av. Central, 456',
          phone: '(71) 7777-8888'
        }
      ]);
    }
  };

  const handleCallService = (service, number) => {
    setSelectedService({ service, number });
    setConfirmDialogOpen(true);
  };

  const handleConfirmCall = () => {
    if (selectedService) {
      window.location.href = `tel:${selectedService.number}`;
    }
    setConfirmDialogOpen(false);
    setEmergencyDialogOpen(false);
  };

  const handleCancelCall = () => {
    setConfirmDialogOpen(false);
  };

  const fetchAddressFromCoordinates = useCallback(async (lat, lng) => {
    const setAddressLoading = (loading) => {
      console.log("Address loading:", loading);
    };
    
    setAddressLoading(true);
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
      if (!response.ok) {
        throw new Error('Falha ao obter endereço');
      }
      const data = await response.json();
      setCurrentAddress(data.display_name);
    } catch (error) {
      console.error('Erro ao buscar endereço:', error);
      setCurrentAddress('Endereço não disponível');
    } finally {
      setAddressLoading(false);
    }
  }, []);

  const getLocation = useCallback(() => {
    setLocationStatus('loading');
    setLocationError(null);
    
    if (!navigator.geolocation) {
      setLocationStatus('error');
      setLocationError('Seu navegador não suporta geolocalização.');
      setLocation({ lat: -23.5505, lng: -46.6333 });
      return;
    }
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude, accuracy } = position.coords;
        setLocation({
          lat: latitude,
          lng: longitude,
          accuracy: accuracy
        });
        setLocationStatus('success');
        fetchAddressFromCoordinates(latitude, longitude);
      },
      (error) => {
        setLocationStatus('error');
        console.error('Erro ao obter localização:', error);
        
        let errorMessage = 'Falha ao obter sua localização.';
        switch(error.code) {
          case 1:
            errorMessage = 'Acesso à localização negado. Por favor, permita o acesso para encontrar serviços próximos.';
            break;
          case 2:
            errorMessage = 'Não foi possível determinar sua localização. Verifique se o GPS está ativado.';
            break;
          case 3:
            errorMessage = 'Tempo esgotado ao obter localização. Tente novamente.';
            break;
          default:
            errorMessage = 'Erro desconhecido ao obter localização.';
        }
        
        setLocationError(errorMessage);
        setLocation({ lat: -23.5505, lng: -46.6333 });
      },
      { 
        enableHighAccuracy: true, 
        timeout: 15000, 
        maximumAge: 60000 
      }
    );
  }, [fetchAddressFromCoordinates]);

  const handleRefreshLocation = () => {
    getLocation();
  };
  
  const handleSelectSearchResult = useCallback((result) => {
    const newLocation = {
      lat: parseFloat(result.lat),
      lng: parseFloat(result.lon),
    };
  
    if (mapInstance) {
      mapInstance.setView([newLocation.lat, newLocation.lng], 15, { animate: true });
  
      const marker = L.marker([newLocation.lat, newLocation.lng], {
        title: result.display_name,
        icon: L.divIcon({
          className: 'search-result-marker',
          html: `<div style="background-color: #1976d2; width: 24px; height: 24px; border-radius: 50%; border: 2px solid white; display: flex; align-items: center; justify-content: center;">
                   <span style="color: white; font-size: 14px;">H</span>
                 </div>`,
          iconSize: [24, 24],
          iconAnchor: [12, 12],
        }),
      }).addTo(mapInstance);
  
      marker.bindPopup(`
        <div>
          <strong>${result.display_name.split(',')[0]}</strong>
          <p>${result.display_name.split(',').slice(1).join(', ')}</p>
        </div>
      `).openPopup();
  
      if (markersLayerGroup.current) {
        markersLayerGroup.current.clearLayers();
      }
      markersLayerGroup.current = L.layerGroup([marker]).addTo(mapInstance);
    }
  }, [mapInstance]);

  useEffect(() => {
    if (location) {
      reverseGeocode(
        location.lat,
        location.lng,
        (address) => {
          setCurrentAddress(address);
        },
        (error) => {
          console.error("Erro ao obter endereço:", error);
          fetchAddressFromCoordinates(location.lat, location.lng);
        }
      );
    }
  }, [location, fetchAddressFromCoordinates]);

  const searchCache = useRef({});

  const searchPlaces = useCallback(async (query, executeSearch = false) => {
    if ((!executeSearch && query.length < 2) || !query.trim() || !location) return;
    
    // Verificar se já temos resultados em cache para esta consulta
    const cacheKey = `${query}-${location.lat.toFixed(2)}-${location.lng.toFixed(2)}`;
    if (searchCache.current[cacheKey] && !executeSearch) {
      setSearchResults(searchCache.current[cacheKey]);
      return;
    }
    
    setSearchLoading(true);
    
    try {
      // Definir a área de busca com base na localização atual
      const boundingBoxSize = 0.1;
      const viewbox = [
        location.lng - boundingBoxSize,
        location.lat - boundingBoxSize,
        location.lng + boundingBoxSize,
        location.lat + boundingBoxSize,
      ].join(',');
      
      // Adicionar parâmetro de prioridade (Priority for hospitals)
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&addressdetails=1&limit=10&viewbox=${viewbox}&bounded=1&dedupe=1&countrycodes=br`
      );
      
      if (!response.ok) {
        throw new Error('Falha ao buscar lugares');
      }
      
      const data = await response.json();
      
      // Filtrar e classificar resultados por relevância
      const filteredResults = data
        .filter((result) => {
          const tags = result.extratags || {};
          const category = result.type || '';
          const name = result.display_name.toLowerCase();
          return (
            tags.amenity === 'hospital' ||
            tags.amenity === 'clinic' ||
            tags.amenity === 'doctors' ||
            category.includes('hospital') ||
            category.includes('clinic') ||
            name.includes('hospital') ||
            name.includes('clínic') ||
            name.includes('saúde') ||
            name.includes('médic')
          );
        })
        .sort((a, b) => {
          // Priorizar hospitais e lugares com nomes mais curtos (geralmente mais relevantes)
          const aIsHospital = a.display_name.toLowerCase().includes('hospital');
          const bIsHospital = b.display_name.toLowerCase().includes('hospital');
          
          if (aIsHospital && !bIsHospital) return -1;
          if (!aIsHospital && bIsHospital) return 1;
          
          return a.display_name.length - b.display_name.length;
        });
      
      // Armazenar em cache
      searchCache.current[cacheKey] = filteredResults;
      setSearchResults(filteredResults);
      
      if (executeSearch && filteredResults.length > 0) {
        const result = filteredResults[0];
        handleSelectSearchResult(result);
      }
    } catch (err) {
      console.error('Erro na busca de lugares:', err);
    } finally {
      setSearchLoading(false);
    }
  }, [location, handleSelectSearchResult]);

  // Limpar o cache quando a localização mudar significativamente
  useEffect(() => {
    searchCache.current = {};
  }, [location?.lat, location?.lng]);

  const initializeMap = useCallback(() => {
    if (!mapContainerRef.current || mapInstance) return;
    
    const map = L.map(mapContainerRef.current, {
      zoomControl: false
    }).setView(
      location ? [location.lat, location.lng] : [-23.55052, -46.633308],
      15
    );
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    
    markersLayerGroup.current = L.layerGroup().addTo(map);
    
    setMapInstance(map);
  }, [location, mapInstance]);

  useEffect(() => {
    if (mapInstance && location) {
      mapInstance.setView([location.lat, location.lng], 15, { animate: true, duration: 0.5 });
      
      const userMarker = L.marker([location.lat, location.lng], {
        icon: L.divIcon({
          className: 'user-location-marker',
          html: `<div style="background-color: #1976d2; width: 16px; height: 16px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 5px rgba(0,0,0,0.3);"></div>`,
          iconSize: [22, 22],
          iconAnchor: [11, 11]
        })
      }).addTo(mapInstance);
      
      const popupContent = `
        <div>
          <strong>Sua localização atual</strong>
          ${currentAddress ? `<p>${currentAddress}</p>` : ''}
        </div>
      `;
      
      userMarker.bindPopup(popupContent, {
        offset: [0, -8],
        closeButton: false,
        className: 'user-location-popup'
      });
      
      return () => {
        mapInstance.removeLayer(userMarker);
      };
    }
  }, [mapInstance, location, currentAddress]);

  useEffect(() => {
    if (location && !mapInstance) {
      initializeMap();
    }
  }, [location, mapInstance, initializeMap]);

  useEffect(() => {
    getLocation();
  }, [getLocation]);
  
  return (
    <Box sx={{ 
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      maxWidth: '480px', 
      margin: '0 auto',
      minHeight: '100vh',
      backgroundColor: 'white',
      overflow: 'hidden',
      fontFamily: '"Plus Jakarta Sans", "Noto Sans", sans-serif',
      paddingBottom: '56px',
      position: 'relative' 
    }}>
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        p: 2, 
        pb: 1,
        backgroundColor: 'white',
        position: 'relative',
        zIndex: 2000,
        boxShadow: '0px 2px 4px rgba(0,0,0,0.05)'
      }}>
        <Tooltip title="Emergência">
          <IconButton 
            sx={{ 
              width: 48,
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                backgroundColor: 'rgba(211, 47, 47, 0.1)',
                animation: 'pulse 2s infinite',
              },
              '@keyframes pulse': {
                '0%': { 
                  transform: 'scale(0.95)',
                  boxShadow: '0 0 0 0 rgba(211, 47, 47, 0.4)'
                },
                '70%': { 
                  transform: 'scale(1)',
                  boxShadow: '0 0 0 8px rgba(211, 47, 47, 0)'
                },
                '100%': { 
                  transform: 'scale(0.95)',
                  boxShadow: '0 0 0 0 rgba(211, 47, 47, 0)'
                }
              }
            }}
            onClick={handleEmergencyClick}
            aria-label="emergência"
          >
            <PhoneIcon 
              sx={{ 
                color: 'error.main',
                fontSize: 24
              }} 
            />
          </IconButton>
        </Tooltip>
        
        <Typography 
          variant="h6" 
          sx={{ 
            fontSize: '1.125rem',
            fontWeight: 'bold',
            flex: 1,
            textAlign: 'center',
            color: '#111518',
            letterSpacing: '-0.015em',
            lineHeight: 'tight'
          }}
        >
          Saúde Local
        </Typography>
        
        <IconButton 
          sx={{ width: 48 }}
          onClick={navigateToProfile}
        >
          <PersonIcon sx={{ color: '#111518' }} />
        </IconButton>
      </Box>

      <Box sx={{ 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column',
        position: 'relative',
        height: 'calc(100vh - 120px)'
      }}>
        <Box sx={{ 
          position: 'absolute',
          top: 10,
          left: 0,
          right: 0,
          zIndex: 2100,
          display: 'flex',
          justifyContent: 'center', // Centraliza horizontalmente
          alignItems: 'center',
          padding: '0 10px', // Adiciona padding horizontal
        }}>
          <SearchBar 
            onSearch={searchPlaces}
            loading={searchLoading}
            searchResults={searchResults}
            onSelectResult={handleSelectSearchResult}
          />
        </Box>

        <Box sx={{ 
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          zIndex: 900
        }}>
          {locationStatus === 'loading' && (
            <Box sx={{
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
            }}>
              <CircularProgress />
            </Box>
          )}

          {locationStatus === 'error' && !location && (
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              padding: 3,
              textAlign: 'center'
            }}>
              <LocationIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
              <Typography variant="h6" color="text.secondary" gutterBottom>
                Localização não disponível
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Não foi possível carregar o mapa. Permita o acesso à sua localização para visualizar os serviços de saúde próximos.
              </Typography>
              <Button 
                variant="contained" 
                color="primary"
                onClick={handleRefreshLocation}
                startIcon={<MyLocationIcon />}
              >
                Tentar novamente
              </Button>
            </Box>
          )}

          <Box 
            ref={mapContainerRef} 
            id="map"
            sx={{
              width: '100%',
              height: '100%',
              display: locationStatus !== 'error' || location ? 'block' : 'none'
            }}
          />

          <Box sx={{ 
            position: 'absolute', 
            bottom: 15, 
            right: 15,
            display: 'flex', 
            flexDirection: 'column', 
            gap: 1,
            zIndex: 1500
          }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
              <MapButton 
                sx={{ borderRadius: '12px 12px 0 0' }}
                onClick={() => mapInstance && mapInstance.setZoom(mapInstance.getZoom() + 1)}
              >
                <AddIcon />
              </MapButton>
              <MapButton 
                sx={{ borderRadius: '0 0 12px 12px' }}
                onClick={() => mapInstance && mapInstance.setZoom(mapInstance.getZoom() - 1)}
              >
                <RemoveIcon />
              </MapButton>
            </Box>
            <Tooltip title="Centralizar na minha localização">
              <MapButton 
                sx={{ 
                  borderRadius: '12px',
                  backgroundColor: locationStatus === 'success' ? 'rgba(76, 175, 80, 0.1)' : 'white',
                  '&:hover': {
                    backgroundColor: locationStatus === 'success' ? 'rgba(76, 175, 80, 0.2)' : 'rgba(255, 255, 255, 0.9)',
                  }
                }}
                onClick={() => {
                  if (locationStatus === 'success' && location && mapInstance) {
                    mapInstance.setView([location.lat, location.lng], 15);
                  } else {
                    handleRefreshLocation();
                  }
                }}
                disabled={locationStatus === 'loading'}
              >
                {locationStatus === 'loading' ? (
                  <CircularProgress size={20} />
                ) : (
                  <MyLocationIcon 
                    sx={{ 
                      color: locationStatus === 'success' ? 'success.main' : 'inherit'
                    }} 
                  />
                )}
              </MapButton>
            </Tooltip>
          </Box>
        </Box>
      </Box>

      <BottomNavigation
        value={bottomNavValue}
        onChange={(event, newValue) => {
          setBottomNavValue(newValue);
        }}
        showLabels
        sx={{
          width: '100%',
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          maxWidth: '480px',
          margin: '0 auto',
          height: '56px',
          boxShadow: '0px -2px 10px rgba(0, 0, 0, 0.05)',
          zIndex: 2000
        }}
      >
        <BottomNavigationAction 
          label="Início" 
          icon={<HomeIcon />} 
          sx={{ minWidth: 'auto' }}
          onClick={() => navigate('/home')}
        />
        <BottomNavigationAction 
          label="Comunidade" 
          icon={<ChatIcon />} 
          sx={{ minWidth: 'auto' }}
          onClick={() => navigate('/community')}
        />
        <BottomNavigationAction 
          label="Favoritos" 
          icon={
            <Badge color="error" variant="dot" invisible={true}>
              <FavoriteIcon />
            </Badge>
          } 
          sx={{ minWidth: 'auto' }}
          onClick={() => navigate('/favorites')}
        />
        <BottomNavigationAction 
          label="Mais" 
          icon={<MoreIcon />} 
          sx={{ minWidth: 'auto' }}
          onClick={() => navigate('/more')}
        />
      </BottomNavigation>

      <Dialog 
        open={emergencyDialogOpen} 
        onClose={() => setEmergencyDialogOpen(false)}
        maxWidth="sm" 
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            py: 2,
            maxWidth: '480px',
            margin: '0 auto'
          }
        }}
      >
        <DialogTitle sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
          pb: 2
        }}>
          <Typography variant="h6" fontWeight="bold" color="error.main">
            Emergência
          </Typography>
          <IconButton 
            edge="end" 
            color="inherit" 
            onClick={() => setEmergencyDialogOpen(false)}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        
        <DialogContent sx={{ px: 3, py: 3 }}>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Em caso de emergência, ligue imediatamente para o número apropriado:
          </Typography>
          
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <EmergencyService
              number="192"
              service="SAMU"
              onClick={() => handleCallService('SAMU', '192')}
            />
            <EmergencyService
              number="193"
              service="Bombeiros"
              onClick={() => handleCallService('Bombeiros', '193')}
            />
            <EmergencyService
              number="190"
              service="Polícia"
              color="primary"
              onClick={() => handleCallService('Polícia', '190')}
            />
            <EmergencyService
              number="199"
              service="Defesa Civil"
              color="primary"
              onClick={() => handleCallService('Defesa Civil', '199')}
            />
          </Grid>
          
          <Divider sx={{ my: 3 }} />
          
          <Box>
            <Typography variant="h6" fontWeight="medium" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
              <HospitalIcon sx={{ mr: 1, color: 'error.main' }} />
              Hospitais com emergência próximos
            </Typography>
            
            {!location ? (
              <Box sx={{ textAlign: 'center', py: 2 }}>
                <CircularProgress size={24} sx={{ mb: 1 }} />
                <Typography variant="body2" color="text.secondary">
                  Obtendo sua localização...
                </Typography>
              </Box>
            ) : (
              <List sx={{ 
                bgcolor: 'background.paper', 
                borderRadius: 2,
                boxShadow: '0 2px 12px rgba(0,0,0,0.08)'
              }}>
                {nearbyEmergencyFacilities.length > 0 ? nearbyEmergencyFacilities.map((facility) => (
                  <ListItem
                    key={facility.id}
                    divider
                    secondaryAction={
                      <Button 
                        variant="contained" 
                        size="small"
                        color="primary"
                        startIcon={<PhoneIcon />}
                        onClick={() => handleCallService(facility.name, facility.phone.replace(/[^0-9]/g, ''))}
                        sx={{ borderRadius: 6 }}
                      >
                        Ligar
                      </Button>
                    }
                    sx={{ 
                      py: 1.5,
                      px: 2
                    }}
                  >
                    <ListItemText
                      primary={
                        <Typography variant="subtitle1" fontWeight="medium">
                          {facility.name}
                        </Typography>
                      }
                      secondary={
                        <Box>
                          <Typography component="span" variant="body2" color="text.primary">
                            {facility.distance}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {facility.address}
                          </Typography>
                          <Typography variant="body2" color="primary.main">
                            {facility.phone}
                          </Typography>
                        </Box>
                      }
                      sx={{ pr: 2 }}
                    />
                  </ListItem>
                )) : (
                  <Box sx={{ textAlign: 'center', py: 3 }}>
                    <Typography variant="body2" color="text.secondary">
                      Nenhum hospital de emergência encontrado na sua região.
                    </Typography>
                  </Box>
                )}
              </List>
            )}
          </Box>
        </DialogContent>
      </Dialog>

      <Dialog
        open={confirmDialogOpen}
        onClose={handleCancelCall}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            py: 1
          }
        }}
      >
        <DialogTitle sx={{ pt: 3 }}>
          <Typography variant="h6" fontWeight="medium">Confirmar ligação</Typography>
        </DialogTitle>
        
        <DialogContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <PhoneIcon sx={{ color: 'error.main', mr: 2, fontSize: 28 }} />
            <Box>
              <Typography variant="body1" fontWeight="medium">
                {selectedService?.service}
              </Typography>
              <Typography variant="h6" color="error.main" fontWeight="bold">
                {selectedService?.number}
              </Typography>
            </Box>
          </Box>
          
          <Typography variant="body2" color="text.secondary">
            Você está prestes a fazer uma chamada. Deseja continuar?
          </Typography>
        </DialogContent>
        
        <DialogActions sx={{ px: 3, pb: 3, pt: 1 }}>
          <Button 
            onClick={handleCancelCall} 
            variant="outlined" 
            color="inherit"
            sx={{ borderRadius: 6 }}
          >
            Cancelar
          </Button>
          <Button 
            onClick={handleConfirmCall} 
            variant="contained" 
            color="error" 
            startIcon={<PhoneIcon />}
            autoFocus
            sx={{ borderRadius: 6 }}
          >
            Ligar agora
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={locationStatus === 'error' && !!locationError}
        autoHideDuration={6000}
        onClose={() => setLocationError(null)}
        sx={{ bottom: 70 }}
      >
        <Alert
          severity="warning"
          onClose={() => setLocationError(null)}
          sx={{ width: '100%' }}
          action={
            <Button 
              color="primary"
              size="small"
              onClick={handleRefreshLocation}
              sx={{ ml: 1 }}
            >
              Tentar novamente
            </Button>
          }
        >
          {locationError}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Home;
