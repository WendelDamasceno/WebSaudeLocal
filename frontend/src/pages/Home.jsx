import React, { useState, useEffect, useRef, useCallback } from 'react';
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
import GoogleMapsView from '../components/GoogleMapsView';
import { loadGoogleMapsAPI, reverseGeocode, calculateDistance } from '../utils/GeolocationService';

const ICON_URLS = {
  hospital: 'https://cdn-icons-png.flaticon.com/512/4320/4320371.png',
  clinic: 'https://cdn-icons-png.flaticon.com/512/3209/3209071.png',
  pharmacy: 'https://cdn-icons-png.flaticon.com/512/1021/1021226.png',
  user: 'https://cdn-icons-png.flaticon.com/512/3710/3710297.png'
};

const SearchInput = styled('div')(({ theme, bgColor = 'white' }) => ({
  display: 'flex',
  width: '100%',
  height: 48,
  borderRadius: 12,
  overflow: 'hidden'
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
  
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    
    if (value.length > 2) {
      onSearch(value);
      setShowResults(true);
    } else {
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
    <Box sx={{ position: 'relative', width: '100%' }} ref={anchorRef}>
      <SearchInput>
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
        style={{ zIndex: 1500, width: '100%' }}
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper 
              elevation={3}
              sx={{ 
                mt: 0.5, 
                maxHeight: 300, 
                overflow: 'auto',
                width: '100%',
                borderRadius: 2
              }}
            >
              <ClickAwayListener onClickAway={handleClickAway}>
                <List dense>
                  {loading ? (
                    <ListItem>
                      <Box sx={{ display: 'flex', alignItems: 'center', px: 2, py: 1 }}>
                        <CircularProgress size={20} sx={{ mr: 2 }} />
                        <Typography>Buscando...</Typography>
                      </Box>
                    </ListItem>
                  ) : (
                    searchResults.map((result, index) => (
                      <ListItem 
                        key={`${result.place_id}-${index}`} 
                        button 
                        onClick={() => handleSelectResult(result)}
                        sx={{ 
                          py: 1.5,
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
                        />
                      </ListItem>
                    ))
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
  const [mapLoading, setMapLoading] = useState(true);
  const mapRef = useRef(null);
  
  const [location, setLocation] = useState(null);
  const [locationStatus, setLocationStatus] = useState('idle');
  const [locationError, setLocationError] = useState(null);
  const [currentAddress, setCurrentAddress] = useState(null);
  const [mapZoom, setMapZoom] = useState(15);
  
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  
  const [healthFacilities, setHealthFacilities] = useState([]);
  
  const [bottomNavValue, setBottomNavValue] = useState(0);
  
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
        
        if (window.google && window.google.maps) {
          const geocoder = new window.google.maps.Geocoder();
          const latlng = { lat: latitude, lng: longitude };
          
          geocoder.geocode({ location: latlng }, (results, status) => {
            if (status === 'OK' && results && results.length > 0) {
              setCurrentAddress(results[0].formatted_address);
            } else {
              fetchAddressFromCoordinates(latitude, longitude);
            }
          });
        } else {
          fetchAddressFromCoordinates(latitude, longitude);
        }
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
  
  useEffect(() => {
    if (window.google && window.google.maps && mapRef.current && location) {
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

  const searchPlaces = async (query, executeSearch = false) => {
    if ((!executeSearch && query.length < 3) || !query.trim()) return;
    
    setSearchLoading(true);
    
    const setSearchQuery = (q) => {
      console.log("Search query:", q);
    };
    
    setSearchQuery(query);
    
    try {
      if (window.google && window.google.maps) {
        const placesService = new window.google.maps.places.PlacesService(document.createElement('div'));
        
        const request = {
          query: query,
          fields: ['name', 'geometry', 'formatted_address'],
        };
        
        placesService.findPlaceFromQuery(request, (results, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK && results) {
            const formattedResults = results.map(place => ({
              place_id: place.place_id,
              display_name: place.name,
              lat: place.geometry.location.lat(),
              lon: place.geometry.location.lng(),
              address: place.formatted_address || '',
            }));
            
            setSearchResults(formattedResults);
            
            if (executeSearch && formattedResults.length > 0) {
              const result = formattedResults[0];
              handleSelectSearchResult(result);
            }
            
            setSearchLoading(false);
          } else {
            fallbackToNominatim();
          }
        });
      } else {
        fallbackToNominatim();
      }
    } catch (error) {
      console.error('Erro na busca de lugares:', error);
      fallbackToNominatim();
    }
    
    async function fallbackToNominatim() {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5`
        );
        
        if (!response.ok) {
          throw new Error('Falha ao buscar lugares');
        }
        
        const data = await response.json();
        setSearchResults(data);
        
        if (executeSearch && data.length > 0) {
          const result = data[0];
          handleSelectSearchResult(result);
        }
      } catch (err) {
        console.error('Erro no fallback para Nominatim:', err);
      } finally {
        setSearchLoading(false);
      }
    }
  };

  const fetchNearbyHealthFacilities = async (lat, lng, radius = 5000) => {
    try {
      const overpassApi = `https://overpass-api.de/api/interpreter`;
      const query = `
        [out:json];
        (
          node["amenity"="hospital"](around:${radius},${lat},${lng});
          node["amenity"="clinic"](around:${radius},${lat},${lng});
          node["amenity"="doctors"](around:${radius},${lat},${lng});
          node["amenity"="pharmacy"](around:${radius},${lat},${lng});
        );
        out body;
      `;
      
      const response = await fetch(overpassApi, {
        method: 'POST',
        body: query
      });
      
      if (!response.ok) {
        throw new Error('Falha ao buscar estabelecimentos de saúde próximos');
      }
      
      const data = await response.json();
      
      const facilities = data.elements.map(element => {
        const { id, lat, lon, tags } = element;
        const type = tags.amenity;
        let icon;
        
        switch (type) {
          case 'hospital':
            icon = ICON_URLS.hospital;
            break;
          case 'clinic':
          case 'doctors':
            icon = ICON_URLS.clinic;
            break;
          case 'pharmacy':
            icon = ICON_URLS.pharmacy;
            break;
          default:
            icon = null;
        }
        
        return {
          id,
          position: [lat, lon],
          name: tags.name || `${type.charAt(0).toUpperCase() + type.slice(1)}`,
          type,
          icon,
          address: tags['addr:street'] ? `${tags['addr:street']} ${tags['addr:housenumber'] || ''}` : 'Endereço não disponível',
          phone: tags.phone || 'Telefone não disponível',
          website: tags.website || null,
          wheelchair: tags.wheelchair === 'yes',
          opening_hours: tags.opening_hours || 'Horário não disponível',
          emergency: tags.emergency === 'yes',
          ratings: {
            stars: Math.random() * 2 + 3,
            count: Math.floor(Math.random() * 500)
          }
        };
      });
      
      setHealthFacilities(facilities);
    } catch (error) {
      console.error('Erro ao buscar estabelecimentos de saúde:', error);
    }
  };
  
  const handleSelectSearchResult = (result) => {
    const newLocation = { 
      lat: parseFloat(result.lat), 
      lng: parseFloat(result.lon) 
    };
    
    if (mapRef.current) {
      mapRef.current.setCenter(newLocation);
      mapRef.current.setZoom(15);
      setMapZoom(15);
    }
    
    fetchNearbyHealthFacilities(newLocation.lat, newLocation.lng);
  };
  
  const handleSelectFacility = (facility) => {
    if (mapRef.current) {
      mapRef.current.setCenter({ lat: facility.position[0], lng: facility.position[1] });
      mapRef.current.setZoom(16);
    }
  };
  
  const navigateToFacilityDetails = (facilityId) => {
    navigate(`/facility/${facilityId}`);
  };

  const handleZoomIn = () => {
    if (mapRef.current) {
      const newZoom = mapRef.current.getZoom() + 1;
      mapRef.current.setZoom(newZoom);
      setMapZoom(newZoom);
    }
  };
  
  const handleZoomOut = () => {
    if (mapRef.current) {
      const newZoom = mapRef.current.getZoom() - 1;
      mapRef.current.setZoom(newZoom);
      setMapZoom(newZoom);
    }
  };
  
  const handleCenterMap = () => {
    if (mapRef.current && location) {
      mapRef.current.setCenter({ lat: location.lat, lng: location.lng });
      mapRef.current.setZoom(15);
      setMapZoom(15);
    }
  };
  
  const prepareMapMarkers = () => {
    const markers = [];
    
    if (location) {
      markers.push({
        position: [location.lat, location.lng],
        icon: ICON_URLS.user,
        title: 'Sua localização',
        content: `
          <div>
            <strong>Sua localização atual</strong>
            <p>${currentAddress || ''}</p>
          </div>
        `
      });
    }
    
    healthFacilities.forEach(facility => {
      let iconUrl;
      
      switch (facility.type) {
        case 'hospital':
          iconUrl = ICON_URLS.hospital;
          break;
        case 'clinic':
        case 'doctors':
          iconUrl = ICON_URLS.clinic;
          break;
        case 'pharmacy':
          iconUrl = ICON_URLS.pharmacy;
          break;
        default:
          iconUrl = null;
      }
      
      markers.push({
        position: facility.position,
        icon: iconUrl,
        title: facility.name,
        content: `
          <div style="min-width: 200px; max-width: 300px;">
            <h4 style="margin: 0 0 8px 0;">${facility.name}</h4>
            <p style="margin: 0 0 5px 0;"><strong>Tipo:</strong> ${facility.type.charAt(0).toUpperCase() + facility.type.slice(1)}</p>
            <p style="margin: 0 0 5px 0;"><strong>Endereço:</strong> ${facility.address}</p>
            <p style="margin: 0 0 5px 0;"><strong>Telefone:</strong> ${facility.phone}</p>
          </div>
        `,
        onClick: () => handleSelectFacility(facility)
      });
    });
    
    return markers;
  };

  useEffect(() => {
    loadGoogleMapsAPI(
      () => {
        console.log('Google Maps API carregada com sucesso na Home');
        getLocation();
      },
      (error) => {
        console.error('Erro ao carregar Google Maps API:', error);
        setLocationStatus('error');
        setLocationError('Não foi possível carregar o serviço de localização. Tente novamente mais tarde.');
        setLocation({ lat: -23.5505, lng: -46.6333 }); // Coordenadas padrão
      }
    );
  }, [getLocation]);
  
  useEffect(() => {
    if (location && locationStatus === 'success') {
      fetchNearbyHealthFacilities(location.lat, location.lng);
    }
  }, [location, locationStatus]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMapLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

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
        backgroundColor: 'white'
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
        position: 'relative'
      }}>
        <Box sx={{ 
          position: 'absolute',
          top: 10,
          left: 10,
          right: 10,
          zIndex: 1000,
          backgroundColor: 'white',
          borderRadius: 2,
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          overflow: 'hidden',
        }}>
          <SearchBar 
            onSearch={searchPlaces}
            loading={searchLoading}
            searchResults={searchResults}
            onSelectResult={handleSelectSearchResult}
          />
        </Box>

        <Box sx={{ 
          flex: 1, 
          width: '100%', 
          position: 'relative'
        }}>
          {mapLoading && (
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
              zIndex: 900
            }}>
              <CircularProgress />
            </Box>
          )}
          
          {location && (
            <GoogleMapsView
              center={[location.lat, location.lng]}
              zoom={mapZoom}
              markers={prepareMapMarkers()}
              height="calc(100vh - 170px)"
              onMapReady={(googleMap) => {
                mapRef.current = googleMap;
                setMapLoading(false);
              }}
              showTraffic={true}
            />
          )}

          <Box sx={{ 
            position: 'absolute', 
            bottom: 15, 
            right: 15,
            display: 'flex', 
            flexDirection: 'column', 
            gap: 1,
            zIndex: 800
          }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
              <MapButton 
                sx={{ borderRadius: '12px 12px 0 0' }}
                onClick={handleZoomIn}
              >
                <AddIcon />
              </MapButton>
              <MapButton 
                sx={{ borderRadius: '0 0 12px 12px' }}
                onClick={handleZoomOut}
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
                onClick={locationStatus === 'success' ? handleCenterMap : handleRefreshLocation}
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

          <Box sx={{
            position: 'absolute',
            bottom: 15,
            left: 15,
            zIndex: 800,
            display: 'flex',
            alignItems: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            borderRadius: 2,
            padding: locationStatus === 'loading' ? '6px 12px' : '6px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            {locationStatus === 'loading' && (
              <>
                <CircularProgress size={16} sx={{ mr: 1 }} />
                <Typography variant="caption">Obtendo localização...</Typography>
              </>
            )}
            {locationStatus === 'success' && location && (
              <Box sx={{
                width: 16,
                height: 16,
                borderRadius: '50%',
                backgroundColor: 'success.main',
                animation: 'pulse 2s infinite',
                '@keyframes pulse': {
                  '0%': { boxShadow: '0 0 0 0 rgba(76, 175, 80, 0.7)' },
                  '70%': { boxShadow: '0 0 0 6px rgba(76, 175, 80, 0)' },
                  '100%': { boxShadow: '0 0 0 0 rgba(76, 175, 80, 0)' }
                }
              }}/>
            )}
            {locationStatus === 'error' && (
              <Box sx={{
                width: 16,
                height: 16,
                borderRadius: '50%',
                backgroundColor: 'error.main'
              }}/>
            )}
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
          zIndex: 1000
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
                    <Button 
                      variant="contained"
                      size="small"
                      fullWidth
                      onClick={() => navigateToFacilityDetails(facility.id)}
                      sx={{ mt: 1 }}
                    >
                      Ver Detalhes
                    </Button>
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
