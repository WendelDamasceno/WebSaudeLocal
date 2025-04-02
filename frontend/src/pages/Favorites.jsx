import React, { useState, useEffect, useCallback } from 'react';
import { 
  Box, 
  Typography, 
  IconButton, 
  Card, 
  CardContent, 
  Divider, 
  Avatar, 
  Button,
  Rating,
  Chip,
  Tabs,
  Tab,
  ToggleButtonGroup,
  ToggleButton,
  Skeleton,
  Paper,
  Snackbar,
  Alert,
  Tooltip,
  AppBar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Slider,
  FormControlLabel,
  Switch,
  FormGroup,
  TextField,
  MenuItem,
  Stack,
  Select,    
  InputAdornment,
  BottomNavigation,
  BottomNavigationAction
} from '@mui/material';
import { 
  FavoriteBorder as FavoriteBorderIcon,
  LocationOn as LocationIcon,
  ArrowBack as ArrowBackIcon,
  Delete as DeleteIcon,
  LocalHospital as HospitalIcon,
  MedicalServices as ClinicIcon,
  Medication as PharmacyIcon,
  Phone as PhoneIcon,
  Directions as DirectionsIcon,
  Home as HomeIcon,
  MyLocation as MyLocationIcon,
  FilterAlt as FilterAltIcon,
  RestartAlt as ResetIcon,
  Search as SearchIcon,
  Chat as ChatIcon,
  MoreHoriz as MoreIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { loadGoogleMapsAPI } from '../utils/GeolocationService';

// Dados simulados de estabelecimentos favoritos
const MOCK_FAVORITES = [
  {
    id: 101,
    name: "Hospital Geral de Camaçari",
    type: "hospital",
    address: "Av. Leste, 787, Centro",
    distance: "1.5 km",
    phone: "(71) 3333-4444",
    rating: 4.2,
    reviewCount: 273,
    lastVisit: "2023-08-10T14:00:00Z",
    image: "https://source.unsplash.com/random/100x100/?hospital"
  },
  {
    id: 102,
    name: "Clínica São Lucas",
    type: "clinic",
    address: "Rua das Flores, 123, Jardim Limoeiro",
    distance: "2.8 km",
    phone: "(71) 5555-6666",
    rating: 4.7,
    reviewCount: 189,
    lastVisit: "2023-07-15T10:30:00Z",
    image: "https://source.unsplash.com/random/100x100/?clinic"
  },
  {
    id: 103,
    name: "Farmácia Popular",
    type: "pharmacy",
    address: "Av. Principal, 456, Gleba A",
    distance: "0.8 km",
    phone: "(71) 7777-8888",
    rating: 4.0,
    reviewCount: 127,
    lastVisit: "2023-08-05T17:15:00Z",
    image: "https://source.unsplash.com/random/100x100/?pharmacy"
  }
];

// Modifique a função handleDirections para usar o Google Maps
const handleDirections = (address) => {
  if (window.google && window.google.maps) {
    // Tente usar o geocoder do Google para obter coordenadas exatas
    const geocoder = new window.google.maps.Geocoder();
    
    geocoder.geocode({ address }, (results, status) => {
      if (status === 'OK' && results && results.length > 0) {
        const location = results[0].geometry.location;
        const lat = location.lat();
        const lng = location.lng();
        
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const origin = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
              };
              
              window.open(
                `https://www.google.com/maps/dir/?api=1&origin=${origin.lat},${origin.lng}&destination=${lat},${lng}&travelmode=driving`, 
                '_blank'
              );
            },
            () => {
              window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`, '_blank');
            }
          );
        } else {
          window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`, '_blank');
        }
      } else {
        // Fallback usando apenas o endereço
        window.open(`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`, '_blank');
      }
    });
  } else {
    // Fallback sem a API do Google
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`, '_blank');
  }
};

// Componente de Favorito
const FavoriteItem = ({ favorite, onRemove, onNavigateToDetail }) => {
  const getFacilityIcon = (type) => {
    switch (type) {
      case 'hospital':
        return <HospitalIcon color="error" />;
      case 'clinic':
        return <ClinicIcon color="primary" />;
      case 'pharmacy':
        return <PharmacyIcon color="success" />;
      default:
        return <LocationIcon />;
    }
  };
  
  const getFacilityChipColor = (type) => {
    switch (type) {
      case 'hospital':
        return 'error';
      case 'clinic':
        return 'primary';
      case 'pharmacy':
        return 'success';
      default:
        return 'default';
    }
  };
  
  const formatLastVisit = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric'
    });
  };
  
  return (
    <Card 
      elevation={1}
      sx={{ 
        mb: 2, 
        borderRadius: 2,
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
        },
        overflow: 'hidden'
      }}
    >
      <CardContent sx={{ p: 0 }}>
        <Box
          onClick={() => onNavigateToDetail(favorite.id)}
          sx={{ 
            cursor: 'pointer',
            p: 2
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
            <Avatar 
              src={favorite.image}
              variant="rounded"
              sx={{ 
                width: 60, 
                height: 60, 
                borderRadius: 2,
                mr: 2,
                bgcolor: favorite.type === 'hospital' ? 'rgba(211, 47, 47, 0.1)' : 
                         favorite.type === 'clinic' ? 'rgba(25, 118, 210, 0.1)' : 
                         'rgba(76, 175, 80, 0.1)'
              }}
            >
              {getFacilityIcon(favorite.type)}
            </Avatar>
            
            <Box sx={{ flex: 1 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Typography variant="subtitle1" fontWeight="bold" sx={{ pr: 1, lineHeight: 1.3 }}>
                  {favorite.name}
                </Typography>
                <Chip 
                  label={favorite.type.charAt(0).toUpperCase() + favorite.type.slice(1)} 
                  color={getFacilityChipColor(favorite.type)}
                  size="small"
                  sx={{ fontSize: '0.7rem', height: 24 }}
                />
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                <Rating 
                  value={favorite.rating} 
                  precision={0.1} 
                  size="small" 
                  readOnly 
                  sx={{ color: '#FFB400' }}
                />
                <Typography variant="body2" color="text.secondary" sx={{ ml: 0.5 }}>
                  ({favorite.reviewCount})
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.7 }}>
                <LocationIcon fontSize="small" color="action" sx={{ mr: 0.5, fontSize: 16 }} />
                <Typography
                  component="span"
                  variant="body2"
                  color="text.secondary"
                  sx={{ display: 'flex', alignItems: 'center' }}
                >
                  {favorite.distance}
                  <Box sx={{ mx: 0.5, width: 3, height: 3, borderRadius: '50%', bgcolor: 'text.disabled' }} />
                  {favorite.address}
                </Typography>
              </Box>
            </Box>
          </Box>
          
          <Divider sx={{ my: 1.5 }} />
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="caption" color="text.secondary">
              Última visita: {formatLastVisit(favorite.lastVisit)}
            </Typography>
            
            <Box>
              <Tooltip title="Ver detalhes">
                <Button 
                  variant="text" 
                  size="small" 
                  sx={{ minWidth: 'auto', ml: 1 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    onNavigateToDetail(favorite.id);
                  }}
                >
                  Detalhes
                </Button>
              </Tooltip>
            </Box>
          </Box>
        </Box>
        
        <Divider />
        
        <Box sx={{ display: 'flex', p: 1 }}>
          <Tooltip title="Remover dos favoritos">
            <IconButton 
              size="small" 
              color="error"
              onClick={(e) => {
                e.stopPropagation();
                onRemove(favorite.id);
              }}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          
          <Box sx={{ ml: 'auto', display: 'flex' }}>
            <Tooltip title="Ligar">
              <IconButton 
                size="small" 
                color="primary"
                onClick={(e) => {
                  e.stopPropagation();
                  window.location.href = `tel:${favorite.phone.replace(/[^0-9]/g, '')}`;
                }}
              >
                <PhoneIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            
            <Tooltip title="Como chegar">
              <IconButton 
                size="small" 
                color="success"
                sx={{ ml: 1 }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleDirections(favorite.address);
                }}
              >
                <DirectionsIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState(null);
  const [locationStatus, setLocationStatus] = useState('idle');
  const [locationError, setLocationError] = useState(null);
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [bottomNavValue, setBottomNavValue] = useState(2); // 2 corresponde à aba "Favoritos"
  
  // Estados para o diálogo de filtro
  const [filterDialogOpen, setFilterDialogOpen] = useState(false);
  const [filterOptions, setFilterOptions] = useState({
    minRating: 0,
    maxDistance: 10,
    lastVisitDays: 90,
    onlyOpenNow: false,
    searchTerm: ''
  });
  const [activeFilters, setActiveFilters] = useState(0);
  
  const navigate = useNavigate();
  
  // Função para buscar favoritos próximos
  const fetchNearbyFavorites = useCallback(async (lat, lng) => {
    setLoading(true);
    
    try {
      // Em um caso real, enviaríamos as coordenadas para a API
      // Por enquanto, simulamos dados com base nas coordenadas
      
      // Simulando uma chamada de API
      setTimeout(() => {
        // Adicionando propriedades de distância de acordo com a localização real (se disponível)
        const favoritesWithDistance = MOCK_FAVORITES.map(fav => {
          // Se temos coordenadas, calculamos distâncias mais realistas
          // Caso contrário, usamos as distâncias simuladas
          if (lat && lng) {
            // Em implementações reais, calcularíamos a distância real
            // com base nas coordenadas dos estabelecimentos
            const randomDistance = (Math.random() * 5).toFixed(1);
            return {
              ...fav,
              distance: `${randomDistance} km`,
              distanceValue: parseFloat(randomDistance)
            };
          }
          return {
            ...fav,
            // Extraindo o valor numérico da distância
            distanceValue: parseFloat(fav.distance.split(' ')[0])
          };
        });
        
        setFavorites(favoritesWithDistance);
        setLoading(false);
      }, 1500);
    } catch (error) {
      console.error('Erro ao buscar favoritos próximos:', error);
      setFavorites([]);
      setLoading(false);
      
      setSnackbarMessage('Não foi possível carregar seus favoritos. Tente novamente.');
      setShowSnackbar(true);
    }
  }, []);
  
  // Função para obter localização 
  const getLocation = useCallback(() => {
    setLocationStatus('loading');
    setLocationError(null);
    
    // Usar a API de Geolocalização nativa
    if (!navigator.geolocation) {
      setLocationStatus('error');
      setLocationError('Seu navegador não suporta geolocalização.');
      // Mesmo sem localização, carregamos favoritos simulados
      fetchNearbyFavorites(null, null);
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
        
        // Já que temos a localização, buscar favoritos próximos
        fetchNearbyFavorites(latitude, longitude);
      },
      (error) => {
        setLocationStatus('error');
        console.error('Erro ao obter localização:', error);
        
        let errorMessage = 'Falha ao obter sua localização.';
        switch(error.code) {
          case 1: // PERMISSION_DENIED
            errorMessage = 'Acesso à localização negado. Por favor, permita o acesso para encontrar favoritos próximos.';
            break;
          case 2: // POSITION_UNAVAILABLE
            errorMessage = 'Não foi possível determinar sua localização. Verifique se o GPS está ativado.';
            break;
          case 3: // TIMEOUT
            errorMessage = 'Tempo esgotado ao obter localização. Tente novamente.';
            break;
          default:
            errorMessage = 'Erro desconhecido ao obter localização.';
        }
        
        setLocationError(errorMessage);
        
        // Mesmo sem localização, carregamos favoritos simulados
        fetchNearbyFavorites(null, null);
      },
      { 
        enableHighAccuracy: true, 
        timeout: 15000, 
        maximumAge: 60000 
      }
    );
  }, [fetchNearbyFavorites]);
  
  // Atualizando para usar corretamente as variáveis de localização
  useEffect(() => {
    loadGoogleMapsAPI(
      () => {
        console.log('Google Maps API carregada com sucesso na página de Favoritos');
        getLocation();
      },
      (error) => {
        console.error('Erro ao carregar Google Maps API:', error);
        setLocationStatus('error');
        setLocationError('Não foi possível carregar o serviço de localização. Tente novamente mais tarde.');
        
        // Mesmo com erro, carregamos favoritos simulados
        fetchNearbyFavorites(null, null);
      }
    );
  }, [getLocation, fetchNearbyFavorites]);
  
  // Função para navegar para a tela inicial
  const handleBackToHome = () => {
    navigate('/home');
  };
  
  // Função para remover um favorito
  const handleRemoveFavorite = (id) => {
    setFavorites(favorites.filter(fav => fav.id !== id));
    setSnackbarMessage('Favorito removido com sucesso');
    setShowSnackbar(true);
  };
  
  // Função para navegar para os detalhes do estabelecimento
  const navigateToFacilityDetails = (facilityId) => {
    navigate(`/facility/${facilityId}`);
  };
  
  // Função para fechar o diálogo de filtro
  const handleCloseFilterDialog = () => {
    setFilterDialogOpen(false);
  };
  
  // Função para lidar com mudanças nos filtros
  const handleFilterChange = (field, value) => {
    setFilterOptions(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  // Função para aplicar os filtros
  const applyFilters = () => {
    // Conta quantos filtros estão ativos
    let count = 0;
    if (filterOptions.minRating > 0) count++;
    if (filterOptions.maxDistance < 10) count++;
    if (filterOptions.lastVisitDays < 90) count++;
    if (filterOptions.onlyOpenNow) count++;
    if (filterOptions.searchTerm) count++;
    
    setActiveFilters(count);
    setFilterDialogOpen(false);
    
    setSnackbarMessage('Filtros aplicados com sucesso');
    setShowSnackbar(true);
  };
  
  // Função para resetar os filtros
  const resetFilters = () => {
    setFilterOptions({
      minRating: 0,
      maxDistance: 10,
      lastVisitDays: 90,
      onlyOpenNow: false,
      searchTerm: ''
    });
    setActiveFilters(0);
    
    setSnackbarMessage('Filtros removidos');
    setShowSnackbar(true);
  };
  
  // Filtragem avançada de favoritos
  const getFilteredFavorites = () => {
    // Filtramos primeiro por tipo (hospital, clínica, farmácia)
    let filtered = favorites;
    if (filterType !== 'all') {
      filtered = filtered.filter(fav => fav.type === filterType);
    }
    
    // Aplicar filtros avançados
    if (activeFilters > 0) {
      // Filtrar por avaliação mínima
      if (filterOptions.minRating > 0) {
        filtered = filtered.filter(fav => fav.rating >= filterOptions.minRating);
      }
      
      // Filtrar por distância máxima
      if (filterOptions.maxDistance < 10) {
        filtered = filtered.filter(fav => fav.distanceValue <= filterOptions.maxDistance);
      }
      
      // Filtrar por visita recente (últimos X dias)
      if (filterOptions.lastVisitDays < 90) {
        const cutoffDate = new Date();
        cutoffDate.setDate(cutoffDate.getDate() - filterOptions.lastVisitDays);
        filtered = filtered.filter(fav => new Date(fav.lastVisit) >= cutoffDate);
      }
      
      // Filtrar por termo de busca
      if (filterOptions.searchTerm) {
        const searchTerm = filterOptions.searchTerm.toLowerCase();
        filtered = filtered.filter(fav => 
          fav.name.toLowerCase().includes(searchTerm) ||
          fav.address.toLowerCase().includes(searchTerm)
        );
      }
    }
    
    // Aplicar filtros adicionais se houver localização
    if (location && filterOptions.maxDistance < 10) {
      filtered = filtered.filter(fav => {
        // Verifica se a distância do favorito está dentro do raio máximo configurado
        return fav.distanceValue <= filterOptions.maxDistance;
      });
    }
    
    // Adicionar log de erro para depuração
    if (locationError) {
      console.warn('Filtragem com limitações devido a erro de localização:', locationError);
    }
    
    // Depois ordenamos
    switch (sortBy) {
      case 'distance':
        return filtered.sort((a, b) => a.distanceValue - b.distanceValue);
      case 'rating':
        return filtered.sort((a, b) => b.rating - a.rating);
      case 'recent':
      default:
        return filtered.sort((a, b) => new Date(b.lastVisit) - new Date(a.lastVisit));
    }
  };
  
  const filteredFavorites = getFilteredFavorites();
  
  return (
    <Box sx={{ 
      maxWidth: '480px', 
      margin: '0 auto',
      minHeight: '100vh',
      backgroundColor: '#f8f9fa',
      pb: 7,
      position: 'relative'
    }}>
      {/* Cabeçalho */}
      <AppBar 
        position="static" 
        color="default" 
        elevation={0}
        sx={{ 
          backgroundColor: 'white',
          borderBottom: '1px solid rgba(0, 0, 0, 0.05)'
        }}
      >
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          p: 2
        }}>
          <IconButton 
            edge="start" 
            onClick={handleBackToHome}
          >
            <ArrowBackIcon />
          </IconButton>
          
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center',
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)'
          }}>
            <Typography variant="h6" fontWeight="bold">
              Favoritos
            </Typography>
          </Box>
        </Box>
        
        {/* Filtros de tipo */}
        <Tabs
          value={filterType}
          onChange={(e, newValue) => setFilterType(newValue)}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ px: 1, borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab label="Todos" value="all" />
          <Tab label="Hospitais" value="hospital" />
          <Tab label="Clínicas" value="clinic" />
          <Tab label="Farmácias" value="pharmacy" />
        </Tabs>
      </AppBar>

      {/* Ordenação */}
      <Box sx={{ p: 2, pb: 1 }}>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 1
        }}>
          <Typography variant="body2" color="text.secondary">
            {locationStatus === 'success' ? 'Sua localização foi encontrada' : 
             locationStatus === 'loading' ? 'Buscando sua localização...' : 
             'Não foi possível obter sua localização'}
          </Typography>
          
          <ToggleButtonGroup
            value={sortBy}
            exclusive
            onChange={(e, newValue) => {
              if (newValue !== null) {
                setSortBy(newValue);
              }
            }}
            size="small"
            sx={{ height: 32 }}
          >
            <ToggleButton value="recent" sx={{ px: 1, py: 0.5 }}>
              <Typography variant="caption">Recentes</Typography>
            </ToggleButton>
            <ToggleButton value="distance" sx={{ px: 1, py: 0.5 }}>
              <Typography variant="caption">Distância</Typography>
            </ToggleButton>
            <ToggleButton value="rating" sx={{ px: 1, py: 0.5 }}>
              <Typography variant="caption">Avaliação</Typography>
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </Box>

      {/* Conteúdo */}
      <Box sx={{ p: 2, pt: 0 }}>
        {loading ? (
          // Esqueletos de carregamento
          Array.from(new Array(3)).map((_, index) => (
            <Card key={index} sx={{ mb: 2, borderRadius: 2 }}>
              <CardContent sx={{ p: 2 }}>
                <Box sx={{ display: 'flex', mb: 1.5 }}>
                  <Skeleton variant="rectangular" width={60} height={60} sx={{ borderRadius: 2, mr: 2 }} />
                  <Box sx={{ flex: 1 }}>
                    <Skeleton variant="text" width="80%" height={24} />
                    <Skeleton variant="text" width="40%" height={20} />
                    <Skeleton variant="text" width="60%" height={20} />
                  </Box>
                </Box>
                <Divider sx={{ my: 1.5 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Skeleton variant="text" width="30%" height={20} />
                  <Skeleton variant="text" width="20%" height={20} />
                </Box>
              </CardContent>
            </Card>
          ))
        ) : filteredFavorites.length > 0 ? (
          filteredFavorites.map((favorite) => (
            <FavoriteItem
              key={favorite.id}
              favorite={favorite}
              onRemove={handleRemoveFavorite}
              onNavigateToDetail={navigateToFacilityDetails}
            />
          ))
        ) : (
          <Paper sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center',
            height: 'calc(100vh - 300px)',
            borderRadius: 2,
            p: 3,
            bgcolor: 'background.paper'
          }}>
            <FavoriteBorderIcon sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
            <Typography variant="h6" color="text.secondary" textAlign="center">
              {filterType !== 'all' 
                ? `Você não tem favoritos da categoria ${filterType === 'hospital' ? 'hospitais' : filterType === 'clinic' ? 'clínicas' : 'farmácias'}`
                : 'Você ainda não tem favoritos'}
            </Typography>
            <Typography variant="body2" color="text.secondary" textAlign="center" sx={{ mt: 1, mb: 3 }}>
              Adicione estabelecimentos de saúde aos favoritos para acesso rápido.
            </Typography>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={handleBackToHome}
              startIcon={<HomeIcon />}
              sx={{ borderRadius: 6 }}
            >
              Explorar estabelecimentos
            </Button>
          </Paper>
        )}
      </Box>
      
      {/* Botão para recarregar localização */}
      {locationStatus === 'error' && (
        <Tooltip title="Tentar obter localização novamente">
          <Button
            variant="contained"
            color="primary"
            startIcon={<MyLocationIcon />}
            onClick={getLocation}
            sx={{
              position: 'fixed',
              bottom: 76,
              right: 16,
              borderRadius: 6,
              zIndex: 10
            }}
          >
            Atualizar localização
          </Button>
        </Tooltip>
      )}
      
      {/* Bottom Navigation */}
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
          icon={<FavoriteBorderIcon />} 
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
      
      {/* Diálogo de Filtros */}
      <Dialog 
        open={filterDialogOpen} 
        onClose={handleCloseFilterDialog}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="h6">Filtros</Typography>
            <IconButton size="small" onClick={resetFilters} disabled={activeFilters === 0}>
              <ResetIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        
        <DialogContent dividers>
          <Box sx={{ mb: 3 }}>
            <TextField 
              fullWidth 
              variant="outlined"
              label="Buscar nos favoritos"
              value={filterOptions.searchTerm}
              onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
              placeholder="Nome, endereço..."
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" />
                  </InputAdornment>
                )
              }}
            />
          </Box>
          
          <Typography gutterBottom>Avaliação Mínima</Typography>
          <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 3 }}>
            <Rating 
              value={filterOptions.minRating} 
              onChange={(e, newValue) => handleFilterChange('minRating', newValue || 0)}
              precision={0.5}
            />
            <Typography variant="body2" color="text.secondary">
              {filterOptions.minRating > 0 ? `${filterOptions.minRating} estrelas ou mais` : 'Qualquer avaliação'}
            </Typography>
          </Stack>
          
          <Typography gutterBottom>Distância Máxima</Typography>
          <Box sx={{ px: 1, mb: 3 }}>
            <Slider
              value={filterOptions.maxDistance}
              onChange={(e, newValue) => handleFilterChange('maxDistance', newValue)}
              min={0.5}
              max={10}
              step={0.5}
              marks={[
                { value: 0.5, label: '0.5 km' },
                { value: 5, label: '5 km' },
                { value: 10, label: '10+ km' }
              ]}
              valueLabelDisplay="auto"
              valueLabelFormat={(value) => `${value} km`}
            />
          </Box>
          
          <Typography gutterBottom>Última Visita</Typography>
          <Box sx={{ px: 1, mb: 3 }}>
            <Select
              value={filterOptions.lastVisitDays}
              onChange={(e) => handleFilterChange('lastVisitDays', e.target.value)}
              fullWidth
              size="small"
            >
              <MenuItem value={7}>Últimos 7 dias</MenuItem>
              <MenuItem value={30}>Últimos 30 dias</MenuItem>
              <MenuItem value={90}>Últimos 3 meses</MenuItem>
              <MenuItem value={180}>Últimos 6 meses</MenuItem>
              <MenuItem value={365}>Último ano</MenuItem>
              <MenuItem value={999999}>Qualquer período</MenuItem>
            </Select>
          </Box>
          
          <FormGroup>
            <FormControlLabel 
              control={
                <Switch 
                  checked={filterOptions.onlyOpenNow} 
                  onChange={(e) => handleFilterChange('onlyOpenNow', e.target.checked)}
                />
              } 
              label="Aberto agora"
            />
          </FormGroup>
        </DialogContent>
        
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button onClick={handleCloseFilterDialog} color="inherit">
            Cancelar
          </Button>
          <Button 
            onClick={applyFilters} 
            variant="contained" 
            startIcon={<FilterAltIcon />}
          >
            Aplicar Filtros
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Snackbar para mensagens */}
      <Snackbar
        open={showSnackbar}
        autoHideDuration={4000}
        onClose={() => setShowSnackbar(false)}
        sx={{ bottom: 70 }}
      >
        <Alert 
          onClose={() => setShowSnackbar(false)} 
          severity="info" 
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Favorites;
