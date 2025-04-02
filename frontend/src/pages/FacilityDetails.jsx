import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  IconButton, 
  Divider, 
  Avatar, 
  Button,
  Rating,
  Chip,
  Skeleton,
  Paper,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid
} from '@mui/material';
import { 
  ArrowBack as ArrowBackIcon,
  Phone as PhoneIcon,
  Directions as DirectionsIcon,
  Schedule as ScheduleIcon,
  Star as StarIcon,
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  LocationOn as LocationIcon,
  Share as ShareIcon,
  Person as PersonIcon,
  AccessTime as AccessTimeIcon,
  MedicalServices as MedicalIcon,
  CleaningServices as CleanIcon,
  PeopleAlt as PeopleIcon,
  VerifiedUser as VerifiedIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon
} from '@mui/icons-material';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { loadGoogleMapsAPI } from '../utils/GeolocationService';

// Configuração dos ícones do Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const createCustomIcon = (iconUrl, size = [32, 32]) => {
  return new L.Icon({
    iconUrl,
    iconSize: size,
    iconAnchor: [size[0] / 2, size[1]],
    popupAnchor: [0, -size[1]]
  });
};

// Ícones personalizados para os tipos de estabelecimento
const hospitalIcon = createCustomIcon('https://cdn-icons-png.flaticon.com/512/4320/4320371.png');
const clinicIcon = createCustomIcon('https://cdn-icons-png.flaticon.com/512/3209/3209071.png');
const pharmacyIcon = createCustomIcon('https://cdn-icons-png.flaticon.com/512/1021/1021226.png');

// Componente da Tela de Detalhes da Unidade de Saúde
const FacilityDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [facility, setFacility] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [ratingDialogOpen, setRatingDialogOpen] = useState(false);
  const [userRating, setUserRating] = useState({
    service: 0,
    cleanliness: 0,
    quality: 0,
    occupancy: 0,
    comment: ""
  });

  // Função para buscar os detalhes da unidade de saúde
  useEffect(() => {
    const fetchFacilityDetails = async () => {
      setLoading(true);
      try {
        // Em um ambiente real, faríamos a requisição para a API
        // Simulação de resposta da API
        setTimeout(() => {
          // Verificando se o ID é válido para simulação
          if (id && !isNaN(parseInt(id))) {
            const mockFacility = {
              id: parseInt(id),
              name: "Hospital Geral de Camaçari",
              type: "hospital",
              address: "Av. Leste, 787, Centro, Camaçari - BA",
              phone: "(71) 3333-4444",
              coordinates: [-12.6975, -38.3242], // Coordenadas fictícias para Camaçari, BA
              photo: "https://source.unsplash.com/random/400x200/?hospital",
              waitingTime: {
                status: "medium", // low, medium, high
                minutes: 45,
                updatedAt: "2023-08-18T14:30:00Z"
              },
              schedule: {
                weekdays: "08:00 - 18:00",
                saturday: "08:00 - 12:00",
                sunday: "Fechado",
                emergency: "24 horas"
              },
              specialties: [
                "Clínica Geral",
                "Pediatria",
                "Ortopedia",
                "Cardiologia",
                "Neurologia",
                "Ginecologia"
              ],
              services: [
                "Emergência",
                "Exames Laboratoriais",
                "Raio-X",
                "Tomografia",
                "Internação"
              ],
              ratings: {
                average: 4.2,
                count: 158,
                criteria: {
                  service: 4.0,
                  cleanliness: 4.5,
                  quality: 4.3,
                  occupancy: 3.8
                }
              },
              reviews: [
                {
                  id: 1,
                  user: {
                    name: "Ana Silva",
                    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
                    verified: true
                  },
                  rating: 5,
                  comment: "Ótimo atendimento, fui muito bem recebida e o médico foi extremamente atencioso.",
                  date: "2023-08-15T10:20:00Z",
                  criteria: {
                    service: 5,
                    cleanliness: 5,
                    quality: 5,
                    occupancy: 4
                  }
                },
                {
                  id: 2,
                  user: {
                    name: "Carlos Oliveira",
                    avatar: "https://randomuser.me/api/portraits/men/22.jpg",
                    verified: false
                  },
                  rating: 3,
                  comment: "Atendimento demorado, mas a equipe médica é competente. O local estava um pouco sujo.",
                  date: "2023-08-10T15:45:00Z",
                  criteria: {
                    service: 3,
                    cleanliness: 2,
                    quality: 4,
                    occupancy: 2
                  }
                },
                {
                  id: 3,
                  user: {
                    name: "Mariana Costa",
                    avatar: "https://randomuser.me/api/portraits/women/67.jpg",
                    verified: true
                  },
                  rating: 4,
                  comment: "Bom hospital, equipamentos modernos e profissionais competentes. A única ressalva é quanto ao tempo de espera.",
                  date: "2023-08-05T09:30:00Z",
                  criteria: {
                    service: 4,
                    cleanliness: 5,
                    quality: 5,
                    occupancy: 3
                  }
                }
              ]
            };
            
            setFacility(mockFacility);
            // Verificar se está nos favoritos (simulado)
            setIsFavorite(Math.random() > 0.5);
          } else {
            setError("Unidade de saúde não encontrada");
          }
          setLoading(false);
        }, 1500);
      } catch (error) {
        console.error("Erro ao buscar detalhes da unidade:", error);
        setError("Ocorreu um erro ao buscar os detalhes da unidade de saúde");
        setLoading(false);
      }
    };

    fetchFacilityDetails();
  }, [id]);

  // Verifique se a API do Google Maps já está disponível
  useEffect(() => {
    if (!window.google || !window.google.maps) {
      loadGoogleMapsAPI(
        () => console.log("Google Maps API carregada com sucesso na página de detalhes"),
        (error) => console.error("Erro ao carregar Google Maps API:", error)
      );
    }
  }, []);

  // Função para voltar à tela anterior
  const handleBack = () => {
    navigate(-1);
  };

  // Função para alternar entre as abas
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Função para adicionar/remover dos favoritos
  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
    // Aqui implementaríamos a lógica para salvar nos favoritos
  };

  // Função para ligar para a unidade
  const handleCall = () => {
    if (facility && facility.phone) {
      window.location.href = `tel:${facility.phone.replace(/[^0-9]/g, '')}`;
    }
  };

  // Modifique a função handleGetDirections para uma implementação melhorada
  const handleGetDirections = () => {
    if (facility && facility.coordinates) {
      const [lat, lng] = facility.coordinates;
      
      // Se o Google Maps API estiver disponível, use características avançadas
      if (window.google && window.google.maps) {
        // Verificar se o usuário tem geolocalização disponível
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const origin = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
              };
              
              // Abrir com parâmetros mais completos
              window.open(
                `https://www.google.com/maps/dir/?api=1&origin=${origin.lat},${origin.lng}&destination=${lat},${lng}&travelmode=driving`, 
                '_blank'
              );
            },
            () => {
              // Fallback se a geolocalização falhar
              window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`, '_blank');
            }
          );
        } else {
          window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`, '_blank');
        }
      } else {
        // Fallback sem a API
        window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`, '_blank');
      }
    }
  };

  // Função para compartilhar a unidade
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: facility?.name,
        text: `Confira detalhes sobre ${facility?.name}`,
        url: window.location.href
      }).catch((error) => console.log('Erro ao compartilhar', error));
    } else {
      // Fallback caso a Web Share API não seja suportada
      alert(`Link copiado para a área de transferência: ${window.location.href}`);
    }
  };

  // Função para abrir o modal de avaliação
  const handleOpenRatingDialog = () => {
    setRatingDialogOpen(true);
  };

  // Função para fechar o modal de avaliação
  const handleCloseRatingDialog = () => {
    setRatingDialogOpen(false);
  };

  // Função para enviar a avaliação
  const handleSubmitRating = () => {
    console.log("Avaliação enviada:", userRating);
    // Aqui implementaríamos a lógica para enviar a avaliação para o backend
    
    // Fechar o diálogo após enviar
    setRatingDialogOpen(false);
    
    // Resetar o formulário
    setUserRating({
      service: 0,
      cleanliness: 0,
      quality: 0,
      occupancy: 0,
      comment: ""
    });
  };

  // Função para atualizar o estado da avaliação do usuário
  const handleRatingChange = (criteria, value) => {
    setUserRating(prev => ({
      ...prev,
      [criteria]: value
    }));
  };

  // Função para formatar a data
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric'
    });
  };

  // Função para renderizar o ícone baseado no tipo da unidade
  const getFacilityIcon = (type) => {
    switch (type) {
      case 'hospital':
        return hospitalIcon;
      case 'clinic':
        return clinicIcon;
      case 'pharmacy':
        return pharmacyIcon;
      default:
        return null;
    }
  };

  // Função para renderizar o status do tempo de espera
  const renderWaitingTimeStatus = (status) => {
    switch (status) {
      case 'low':
        return (
          <Chip 
            label="Baixo tempo de espera" 
            color="success" 
            size="small" 
            icon={<CheckCircleIcon />} 
          />
        );
      case 'medium':
        return (
          <Chip 
            label="Tempo de espera médio" 
            color="warning" 
            size="small" 
            icon={<AccessTimeIcon />} 
          />
        );
      case 'high':
        return (
          <Chip 
            label="Alto tempo de espera" 
            color="error" 
            size="small" 
            icon={<ErrorIcon />} 
          />
        );
      default:
        return null;
    }
  };

  // Renderização condicional - Loading
  if (loading) {
    return (
      <Box sx={{ maxWidth: '480px', margin: '0 auto', p: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <IconButton onClick={handleBack}>
            <ArrowBackIcon />
          </IconButton>
          <Skeleton variant="text" width={200} height={40} sx={{ ml: 1 }} />
        </Box>
        
        <Skeleton variant="rectangular" width="100%" height={200} sx={{ borderRadius: 2, mb: 2 }} />
        
        <Box sx={{ mb: 2 }}>
          <Skeleton variant="text" width="80%" height={30} />
          <Skeleton variant="text" width="60%" height={24} />
        </Box>
        
        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
          <Skeleton variant="rectangular" width="50%" height={40} sx={{ borderRadius: 2 }} />
          <Skeleton variant="rectangular" width="50%" height={40} sx={{ borderRadius: 2 }} />
        </Box>
        
        <Skeleton variant="rectangular" width="100%" height={200} sx={{ borderRadius: 2, mb: 2 }} />
        
        <Box sx={{ mb: 2 }}>
          <Skeleton variant="text" width="40%" height={24} />
          <Skeleton variant="text" width="100%" height={20} />
          <Skeleton variant="text" width="100%" height={20} />
        </Box>
      </Box>
    );
  }

  // Renderização condicional - Erro
  if (error) {
    return (
      <Box sx={{ 
        maxWidth: '480px', 
        margin: '0 auto', 
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '50vh'
      }}>
        <ErrorIcon color="error" sx={{ fontSize: 60, mb: 2 }} />
        <Typography variant="h6" color="error" textAlign="center" gutterBottom>
          {error}
        </Typography>
        <Button 
          variant="contained" 
          startIcon={<ArrowBackIcon />}
          onClick={handleBack}
          sx={{ mt: 2 }}
        >
          Voltar
        </Button>
      </Box>
    );
  }

  // Renderização principal
  return (
    <Box sx={{ maxWidth: '480px', margin: '0 auto', minHeight: '100vh', pb: 2 }}>
      {/* Cabeçalho */}
      <Box sx={{ 
        position: 'sticky', 
        top: 0, 
        zIndex: 1100, 
        backgroundColor: 'white',
        borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
        p: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <IconButton onClick={handleBack} edge="start">
          <ArrowBackIcon />
        </IconButton>
        
        <Typography variant="h6" fontWeight="bold" sx={{ flex: 1, ml: 1 }}>
          Detalhes da Unidade
        </Typography>
        
        <Box>
          <IconButton onClick={handleShare} sx={{ mr: 1 }}>
            <ShareIcon />
          </IconButton>
          
          <IconButton 
            onClick={handleToggleFavorite}
            color={isFavorite ? "error" : "default"}
          >
            {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
        </Box>
      </Box>
      
      {/* Imagem principal */}
      {facility.photo && (
        <Box sx={{ width: '100%', height: 200, position: 'relative' }}>
          <img 
            src={facility.photo} 
            alt={facility.name} 
            style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'cover'
            }}
          />
          <Box sx={{ 
            position: 'absolute', 
            bottom: 0, 
            left: 0, 
            right: 0,
            p: 2,
            background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
            color: 'white'
          }}>
            <Typography variant="h5" fontWeight="bold">
              {facility.name}
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
              <LocationIcon fontSize="small" sx={{ mr: 0.5 }} />
              <Typography variant="body2">
                {facility.address}
              </Typography>
            </Box>
          </Box>
        </Box>
      )}
      
      {/* Botões de ação */}
      <Box sx={{ 
        display: 'flex', 
        gap: 2, 
        px: 2, 
        py: 2,
        borderBottom: '1px solid rgba(0, 0, 0, 0.05)'
      }}>
        <Button 
          variant="contained" 
          fullWidth
          startIcon={<PhoneIcon />}
          onClick={handleCall}
          sx={{ borderRadius: 2 }}
        >
          Ligar
        </Button>
        
        <Button 
          variant="outlined" 
          fullWidth
          startIcon={<DirectionsIcon />}
          onClick={handleGetDirections}
          sx={{ borderRadius: 2 }}
        >
          Traçar Rota
        </Button>
      </Box>
      
      {/* Tempo de Espera */}
      <Box sx={{ p: 2, borderBottom: '1px solid rgba(0, 0, 0, 0.05)' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="subtitle1" fontWeight="medium">
            Tempo de Espera
          </Typography>
          
          {renderWaitingTimeStatus(facility.waitingTime.status)}
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <AccessTimeIcon color="action" sx={{ mr: 1, fontSize: 20 }} />
          <Typography variant="body1">
            Aproximadamente {facility.waitingTime.minutes} minutos
          </Typography>
        </Box>
        
        <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
          Atualizado em {formatDate(facility.waitingTime.updatedAt)} pela comunidade
        </Typography>
      </Box>
      
      {/* Abas para informações detalhadas */}
      <Box sx={{ width: '100%' }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange} 
          variant="fullWidth"
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab label="Informações" />
          <Tab label="Avaliações" />
          <Tab label="Mapa" />
        </Tabs>
        
        {/* Conteúdo da aba Informações */}
        {tabValue === 0 && (
          <Box sx={{ p: 2 }}>
            {/* Horário de Funcionamento */}
            <Typography variant="subtitle1" fontWeight="medium" sx={{ mb: 1 }}>
              Horário de Funcionamento
            </Typography>
            
            <Paper variant="outlined" sx={{ p: 2, mb: 3, borderRadius: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <ScheduleIcon color="action" sx={{ mr: 1 }} />
                <Typography variant="body2" fontWeight="medium">
                  Segunda a Sexta
                </Typography>
                <Typography variant="body2" sx={{ ml: 'auto' }}>
                  {facility.schedule.weekdays}
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <ScheduleIcon color="action" sx={{ mr: 1, opacity: 0 }} />
                <Typography variant="body2" fontWeight="medium">
                  Sábado
                </Typography>
                <Typography variant="body2" sx={{ ml: 'auto' }}>
                  {facility.schedule.saturday}
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <ScheduleIcon color="action" sx={{ mr: 1, opacity: 0 }} />
                <Typography variant="body2" fontWeight="medium">
                  Domingo
                </Typography>
                <Typography variant="body2" sx={{ ml: 'auto' }}>
                  {facility.schedule.sunday}
                </Typography>
              </Box>
              
              {facility.schedule.emergency && (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <ScheduleIcon color="error" sx={{ mr: 1 }} />
                  <Typography variant="body2" fontWeight="medium" color="error.main">
                    Emergência
                  </Typography>
                  <Typography variant="body2" sx={{ ml: 'auto' }} color="error.main">
                    {facility.schedule.emergency}
                  </Typography>
                </Box>
              )}
            </Paper>
            
            {/* Especialidades */}
            <Typography variant="subtitle1" fontWeight="medium" sx={{ mb: 1 }}>
              Especialidades
            </Typography>
            
            <Box sx={{ mb: 3, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {facility.specialties.map((specialty, index) => (
                <Chip 
                  key={index}
                  label={specialty}
                  icon={<MedicalIcon />}
                  variant="outlined"
                  sx={{ borderRadius: 2 }}
                />
              ))}
            </Box>
            
            {/* Serviços */}
            <Typography variant="subtitle1" fontWeight="medium" sx={{ mb: 1 }}>
              Serviços Oferecidos
            </Typography>
            
            <Paper variant="outlined" sx={{ p: 2, mb: 3, borderRadius: 2 }}>
              <List disablePadding dense>
                {facility.services.map((service, index) => (
                  <ListItem key={index} disableGutters sx={{ py: 0.75 }}>
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      <CheckCircleIcon color="success" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary={service} />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Box>
        )}
        
        {/* Conteúdo da aba Avaliações */}
        {tabValue === 1 && (
          <Box sx={{ p: 2 }}>
            {/* Resumo das avaliações */}
            <Paper sx={{ p: 2, mb: 3, borderRadius: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Box sx={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center',
                  mr: 3
                }}>
                  <Typography variant="h3" fontWeight="bold" color="primary">
                    {facility.ratings.average.toFixed(1)}
                  </Typography>
                  <Rating 
                    value={facility.ratings.average} 
                    precision={0.5} 
                    readOnly
                    sx={{ mt: 0.5 }}
                  />
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                    {facility.ratings.count} avaliações
                  </Typography>
                </Box>
                
                <Divider orientation="vertical" flexItem sx={{ mr: 3 }} />
                
                <Box sx={{ flex: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Typography variant="body2" sx={{ width: 100 }}>
                      Atendimento
                    </Typography>
                    <Rating value={facility.ratings.criteria.service} size="small" readOnly />
                    <Typography variant="body2" sx={{ ml: 1 }}>
                      {facility.ratings.criteria.service.toFixed(1)}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Typography variant="body2" sx={{ width: 100 }}>
                      Limpeza
                    </Typography>
                    <Rating value={facility.ratings.criteria.cleanliness} size="small" readOnly />
                    <Typography variant="body2" sx={{ ml: 1 }}>
                      {facility.ratings.criteria.cleanliness.toFixed(1)}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Typography variant="body2" sx={{ width: 100 }}>
                      Qualidade
                    </Typography>
                    <Rating value={facility.ratings.criteria.quality} size="small" readOnly />
                    <Typography variant="body2" sx={{ ml: 1 }}>
                      {facility.ratings.criteria.quality.toFixed(1)}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="body2" sx={{ width: 100 }}>
                      Lotação
                    </Typography>
                    <Rating value={facility.ratings.criteria.occupancy} size="small" readOnly />
                    <Typography variant="body2" sx={{ ml: 1 }}>
                      {facility.ratings.criteria.occupancy.toFixed(1)}
                    </Typography>
                  </Box>
                </Box>
              </Box>
              
              <Button 
                variant="contained" 
                fullWidth
                startIcon={<StarIcon />}
                onClick={handleOpenRatingDialog}
                sx={{ borderRadius: 2 }}
              >
                Avaliar esta unidade
              </Button>
            </Paper>
            
            {/* Lista de comentários */}
            <Typography variant="subtitle1" fontWeight="medium" sx={{ mb: 1 }}>
              Comentários dos Usuários
            </Typography>
            
            {facility.reviews.map((review) => (
              <Paper key={review.id} variant="outlined" sx={{ p: 2, mb: 2, borderRadius: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar src={review.user.avatar} alt={review.user.name} sx={{ mr: 1 }} />
                    <Box>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="subtitle2" fontWeight="medium">
                          {review.user.name}
                        </Typography>
                        {review.user.verified && (
                          <VerifiedIcon color="primary" sx={{ ml: 0.5, fontSize: 16 }} />
                        )}
                      </Box>
                      <Typography variant="caption" color="text.secondary">
                        {formatDate(review.date)}
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Rating value={review.rating} readOnly size="small" />
                </Box>
                
                <Typography variant="body2" sx={{ mb: 1.5 }}>
                  {review.comment}
                </Typography>
                
                <Divider sx={{ my: 1.5 }} />
                
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  <Chip 
                    size="small" 
                    icon={<PersonIcon fontSize="small" />} 
                    label={`Atendimento: ${review.criteria.service}`} 
                  />
                  <Chip 
                    size="small" 
                    icon={<CleanIcon fontSize="small" />} 
                    label={`Limpeza: ${review.criteria.cleanliness}`} 
                  />
                  <Chip 
                    size="small" 
                    icon={<MedicalIcon fontSize="small" />} 
                    label={`Qualidade: ${review.criteria.quality}`} 
                  />
                  <Chip 
                    size="small" 
                    icon={<PeopleIcon fontSize="small" />} 
                    label={`Lotação: ${review.criteria.occupancy}`} 
                  />
                </Box>
              </Paper>
            ))}
          </Box>
        )}
        
        {/* Conteúdo da aba Mapa */}
        {tabValue === 2 && (
          <Box sx={{ p: 2 }}>
            <Paper variant="outlined" sx={{ borderRadius: 2, overflow: 'hidden', height: 400 }}>
              <MapContainer 
                center={facility.coordinates} 
                zoom={15} 
                style={{ height: '100%', width: '100%' }}
                zoomControl={false}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker 
                  position={facility.coordinates}
                  icon={getFacilityIcon(facility.type)}
                >
                  <Popup>
                    <Typography variant="subtitle2" fontWeight="bold">
                      {facility.name}
                    </Typography>
                    <Typography variant="body2">
                      {facility.address}
                    </Typography>
                  </Popup>
                </Marker>
              </MapContainer>
            </Paper>
            
            <Button 
              variant="contained" 
              fullWidth
              startIcon={<DirectionsIcon />}
              onClick={handleGetDirections}
              sx={{ mt: 2, borderRadius: 2 }}
            >
              Traçar Rota no Google Maps
            </Button>
          </Box>
        )}
      </Box>
      
      {/* Diálogo de Avaliação */}
      <Dialog 
        open={ratingDialogOpen} 
        onClose={handleCloseRatingDialog}
        maxWidth="sm"
        fullWidth
        PaperProps={{ sx: { borderRadius: 3 } }}
      >
        <DialogTitle sx={{ pb: 1 }}>
          <Typography variant="h6" fontWeight="bold">
            Avaliar {facility.name}
          </Typography>
        </DialogTitle>
        
        <DialogContent dividers>
          <Typography variant="body2" color="text.secondary" paragraph>
            Sua avaliação ajuda outros usuários a encontrarem os melhores serviços de saúde.
          </Typography>
          
          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" gutterBottom>
                Atendimento
              </Typography>
              <Rating
                name="service"
                value={userRating.service}
                onChange={(e, value) => handleRatingChange('service', value)}
                size="large"
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" gutterBottom>
                Limpeza
              </Typography>
              <Rating
                name="cleanliness"
                value={userRating.cleanliness}
                onChange={(e, value) => handleRatingChange('cleanliness', value)}
                size="large"
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" gutterBottom>
                Qualidade
              </Typography>
              <Rating
                name="quality"
                value={userRating.quality}
                onChange={(e, value) => handleRatingChange('quality', value)}
                size="large"
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" gutterBottom>
                Lotação
              </Typography>
              <Rating
                name="occupancy"
                value={userRating.occupancy}
                onChange={(e, value) => handleRatingChange('occupancy', value)}
                size="large"
              />
            </Grid>
          </Grid>
          
          <Typography variant="subtitle2" gutterBottom>
            Comentário (opcional)
          </Typography>
          <TextField
            multiline
            rows={4}
            fullWidth
            placeholder="Compartilhe sua experiência com esta unidade..."
            value={userRating.comment}
            onChange={(e) => handleRatingChange('comment', e.target.value)}
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
          />
        </DialogContent>
        
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleCloseRatingDialog} color="inherit">
            Cancelar
          </Button>
          <Button 
            onClick={handleSubmitRating} 
            variant="contained"
            disabled={!userRating.service || !userRating.cleanliness || !userRating.quality || !userRating.occupancy}
          >
            Enviar Avaliação
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default FacilityDetails;
