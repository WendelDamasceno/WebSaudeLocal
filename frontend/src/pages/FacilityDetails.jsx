import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Button, 
  Chip, 
  Divider, 
  Paper, 
  Rating, 
  IconButton, 
  Avatar, 
  Card, 
  CardContent, 
  Grid,
  CircularProgress,
  Alert,
  Tab,
  Tabs,
  Snackbar,
  Container,
  BottomNavigation,
  BottomNavigationAction,
  Badge
} from '@mui/material';
import { 
  Phone as PhoneIcon, 
  Directions as DirectionsIcon, 
  AccessTime as AccessTimeIcon, 
  Star as StarIcon, 
  ArrowBack as ArrowBackIcon,
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  LocationOn as LocationIcon,
  Today as TodayIcon,
  MedicalServices as MedicalServicesIcon,
  Comment as CommentIcon,
  Share as ShareIcon,
  People as PeopleIcon,
  Error as ErrorIcon,
  Home as HomeIcon,
  Chat as ChatIcon,
  MoreHoriz as MoreIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import GoogleMapsView from '../components/GoogleMapsView';
import FacilityRating from '../components/FacilityRating';
import OpeningHours from '../components/OpeningHours';
import { calculateDistance } from '../utils/GeolocationService';
import { toggleFavorite } from '../utils/FavoritesService';

// Hospital images from Google
const hospitalImages = [
  'https://img.freepik.com/fotos-premium/grande-hhospital-moderno_78493-4968.jpg',
  'https://media.gazetadopovo.com.br/haus/2020/03/medplex-vl9-34ab60c0.jpg',
  'https://www.anabad.org/wp-content/uploads/2020/03/hospital-2.jpg',
  'https://nossasaude.page/wp-content/uploads/2023/10/2023-10-08-hospital-770.webp',
  'https://blog.ipog.edu.br/wp-content/uploads/2017/10/831587408-hospital-publico-1.jpg',
  'https://www.hc.fm.usp.br/site/wp-content/uploads/2022/01/Fachada-ICHC-02-scaled.jpg',
  'https://www.direcaoconcursos.com.br/artigos/wp-content/uploads/2021/12/concursos-hospitais-universitarios-2022.jpg',
  'https://setor3.com.br/wp-content/uploads/2022/03/hospital-scaled.jpeg'
];

// Lista de hospitais simulados com dados mais detalhados
const hospitals = [
  {
    id: '1',
    name: 'Hospital Regional São Lucas',
    type: 'Hospital Público',
    address: 'Av. Principal, 1500, Centro',
    city: 'Salvador',
    state: 'BA',
    phone: '(71) 3333-2222',
    position: [-12.9722, -38.5014],
    acceptsPublicInsurance: true,
    privateInsurance: ['Unimed', 'Bradesco Saúde', 'SulAmérica', 'Amil'],
    hasEmergency: true,
    hasPediatricEmergency: true,
    hasMaternity: true,
    description: 'Hospital regional de referência com atendimento de alta complexidade e pronto-socorro 24h.',
    specialties: ['Clínica Geral', 'Pediatria', 'Ortopedia', 'Cardiologia', 'Neurologia', 'Obstetrícia', 'Oncologia', 'Urologia'],
    departments: [
      { name: 'Pronto-Socorro', hasEmergency: true, workingHours: '24 horas' },
      { name: 'Maternidade', hasEmergency: true, workingHours: '24 horas' },
      { name: 'Pediatria', hasEmergency: true, workingHours: '24 horas' },
      { name: 'Ambulatório', hasEmergency: false, workingHours: '08:00 - 18:00' },
      { name: 'Centro Cirúrgico', hasEmergency: false, workingHours: '24 horas' },
      { name: 'UTI', hasEmergency: true, workingHours: '24 horas' },
    ],
    services: [
      'Consultas ambulatoriais',
      'Exames laboratoriais',
      'Exames de imagem',
      'Cirurgias',
      'Internação',
      'Terapia intensiva',
      'Maternidade',
      'Vacinação'
    ],
    accessibility: {
      wheelchairAccess: true,
      accessibleBathrooms: true,
      brailleSignage: false,
      hearingAccessibility: true,
      dedicatedParking: true
    }
  },
  {
    id: '2',
    name: 'UPA 24h Costa Azul',
    type: 'Unidade de Pronto Atendimento',
    address: 'Rua do Costa Azul, 758, Costa Azul',
    city: 'Salvador',
    state: 'BA',
    phone: '(71) 3444-5555',
    position: [-12.9914, -38.4612],
    acceptsPublicInsurance: true,
    privateInsurance: [],
    hasEmergency: true,
    hasPediatricEmergency: true,
    hasMaternity: false,
    description: 'Unidade de pronto atendimento com atendimento 24 horas para urgências e emergências.',
    specialties: ['Clínica Geral', 'Pediatria', 'Ortopedia'],
    departments: [
      { name: 'Pronto-Socorro Adulto', hasEmergency: true, workingHours: '24 horas' },
      { name: 'Pronto-Socorro Infantil', hasEmergency: true, workingHours: '24 horas' },
      { name: 'Sala de Medicação', hasEmergency: false, workingHours: '24 horas' },
      { name: 'Observação', hasEmergency: false, workingHours: '24 horas' },
    ],
    services: [
      'Atendimento de urgência',
      'Raio-X',
      'Eletrocardiograma',
      'Exames laboratoriais básicos',
      'Medicação'
    ],
    accessibility: {
      wheelchairAccess: true,
      accessibleBathrooms: true,
      brailleSignage: false,
      hearingAccessibility: false,
      dedicatedParking: true
    }
  },
  {
    id: '3',
    name: 'Hospital Particular da Bahia',
    type: 'Hospital Privado',
    address: 'Avenida Tancredo Neves, 2782, Caminho das Árvores',
    city: 'Salvador',
    state: 'BA',
    phone: '(71) 3222-1111',
    position: [-12.9833, -38.4518],
    acceptsPublicInsurance: false,
    privateInsurance: ['Unimed', 'Bradesco Saúde', 'SulAmérica', 'Amil', 'Golden Cross', 'Hapvida'],
    hasEmergency: true,
    hasPediatricEmergency: true,
    hasMaternity: true,
    description: 'Hospital particular de alta complexidade com excelência em atendimento e tecnologia avançada.',
    specialties: ['Clínica Geral', 'Pediatria', 'Ortopedia', 'Cardiologia', 'Neurologia', 'Dermatologia', 'Endocrinologia', 'Obstetrícia', 'Oftalmologia', 'Oncologia', 'Urologia'],
    departments: [
      { name: 'Pronto-Socorro', hasEmergency: true, workingHours: '24 horas' },
      { name: 'Maternidade', hasEmergency: true, workingHours: '24 horas' },
      { name: 'Pediatria', hasEmergency: true, workingHours: '24 horas' },
      { name: 'Ambulatório', hasEmergency: false, workingHours: '07:00 - 20:00' },
      { name: 'Centro Cirúrgico', hasEmergency: false, workingHours: '24 horas' },
      { name: 'UTI Adulto', hasEmergency: true, workingHours: '24 horas' },
      { name: 'UTI Pediátrica', hasEmergency: true, workingHours: '24 horas' },
      { name: 'UTI Neonatal', hasEmergency: true, workingHours: '24 horas' },
      { name: 'Centro de Diagnóstico', hasEmergency: false, workingHours: '07:00 - 19:00' },
    ],
    services: [
      'Consultas ambulatoriais',
      'Exames laboratoriais',
      'Exames de imagem avançados',
      'Cirurgias de alta complexidade',
      'Internação',
      'Terapia intensiva',
      'Maternidade',
      'Hemodiálise',
      'Radioterapia',
      'Quimioterapia'
    ],
    accessibility: {
      wheelchairAccess: true,
      accessibleBathrooms: true,
      brailleSignage: true,
      hearingAccessibility: true,
      dedicatedParking: true
    }
  }
];

// Componente para o indicador de lotação com design melhorado
const CrowdIndicator = ({ level }) => {
  const colors = {
    low: '#4caf50', // Verde
    medium: '#ff9800', // Laranja
    high: '#f44336', // Vermelho
    unknown: '#9e9e9e' // Cinza
  };

  const labels = {
    low: 'Baixa',
    medium: 'Média',
    high: 'Alta',
    unknown: 'Desconhecida'
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', mb: 2 }}>
      <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
        Lotação atual:
      </Typography>
      <Box 
        component={motion.div}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          backgroundColor: colors[level] || colors.unknown,
          color: 'white',
          px: 2,
          py: 1,
          borderRadius: 2,
          fontSize: '0.95rem',
          fontWeight: 600,
          boxShadow: `0 2px 12px ${colors[level]}40`
        }}
      >
        <PeopleIcon sx={{ fontSize: 20, mr: 1 }} />
        {labels[level] || labels.unknown}
      </Box>
    </Box>
  );
};

// Componente para o tempo de espera com design melhorado
const WaitingTime = ({ minutes, updatedAt }) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  const timeString = hours > 0 
    ? `${hours}h ${mins}min` 
    : `${mins} minutos`;
  
  // Formatar a data de atualização
  const formatUpdatedTime = () => {
    if (!updatedAt) return 'Sem informação';
    
    const now = new Date();
    const updated = new Date(updatedAt);
    const diffMs = now - updated;
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 60) {
      return `Atualizado há ${diffMins} min`;
    } else if (diffMins < 1440) { // menos de 24 horas
      const hours = Math.floor(diffMins / 60);
      return `Atualizado há ${hours}h`;
    } else {
      return `Atualizado em ${updated.toLocaleDateString()}`;
    }
  };

  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="body2" sx={{ fontWeight: 500, mb: 1 }}>
        Tempo médio de espera:
      </Typography>
      <Box 
        component={motion.div}
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          bgcolor: 'primary.light', 
          color: 'primary.dark',
          py: 1,
          px: 2,
          borderRadius: 2,
          boxShadow: '0 2px 10px rgba(25, 118, 210, 0.15)'
        }}
      >
        <AccessTimeIcon sx={{ color: 'primary.main', mr: 1.5, fontSize: 24 }} />
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.dark', lineHeight: 1.2 }}>
            {timeString}
          </Typography>
          <Typography variant="caption" sx={{ color: 'primary.dark', opacity: 0.8 }}>
            {formatUpdatedTime()}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

const FacilityDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [facility, setFacility] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFavorited, setIsFavorited] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [userLocation, setUserLocation] = useState(null);
  const [distance, setDistance] = useState(null);
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });
  const [bottomNavValue, setBottomNavValue] = useState(null);

  // Buscar detalhes da unidade de saúde
  useEffect(() => {
    const fetchFacilityDetails = async () => {
      setLoading(true);
      try {
        // Buscar hospital pelo ID
        const foundHospital = hospitals.find(h => h.id === id);
        if (foundHospital) {
          const randomImageIndex = Math.floor(Math.random() * hospitalImages.length);
          const hospitalImage = hospitalImages[randomImageIndex];
          const facilityData = {
            ...foundHospital,
            image: hospitalImage,
            openingHours: {
              emergency: foundHospital.hasEmergency ? '24 horas' : 'Não disponível',
              general: [
                { day: 'Segunda-feira', hours: '08:00 - 18:00' },
                { day: 'Terça-feira', hours: '08:00 - 18:00' },
                { day: 'Quarta-feira', hours: '08:00 - 18:00' },
                { day: 'Quinta-feira', hours: '08:00 - 18:00' },
                { day: 'Sexta-feira', hours: '08:00 - 18:00' },
                { day: 'Sábado', hours: '08:00 - 12:00' },
                { day: 'Domingo', hours: 'Fechado' }
              ]
            }
          };
          setFacility(facilityData);
        } else {
          setError('Unidade de saúde não encontrada.');
        }
      } catch (err) {
        console.error('Erro ao buscar detalhes:', err);
        setError('Não foi possível carregar as informações desta unidade de saúde.');
      } finally {
        setLoading(false);
      }
    };

    fetchFacilityDetails();
  }, [id]); // Adicionar `id` como dependência para refazer a busca ao mudar o ID

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      },
      (error) => {
        console.error('Erro ao obter localização do usuário:', error);
      }
    );
  }, []);

  useEffect(() => {
    if (userLocation && facility?.position) {
      const facilityLocation = {
        lat: facility.position[0],
        lng: facility.position[1]
      };
      const distanceStr = calculateDistance(userLocation, facilityLocation);
      setDistance(distanceStr);
    }
  }, [userLocation, facility]);

  useEffect(() => {
    if (location.pathname.includes('/facility')) {
      setBottomNavValue(null);
    }
  }, [location.pathname]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleToggleFavorite = () => {
    toggleFavorite(id);
    setIsFavorited(!isFavorited);
    setNotification({
      open: true,
      message: isFavorited 
        ? 'Removido dos favoritos' 
        : 'Adicionado aos favoritos',
      severity: 'success'
    });
  };

  const handleCallFacility = () => {
    if (facility?.phone) {
      window.location.href = `tel:${facility.phone.replace(/\D/g, '')}`;
    }
  };

  const handleGetDirections = () => {
    if (facility?.position) {
      const [lat, lng] = facility.position;
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      if (isMobile) {
        const wazeUrl = `https://waze.com/ul?ll=${lat},${lng}&navigate=yes`;
        window.location.href = wazeUrl;
      } else {
        const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
        window.open(googleMapsUrl, '_blank');
      }
    }
  };

  const handleChangeTab = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleShare = async () => {
    const shareUrl = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: facility?.name,
          text: `Confira informações sobre ${facility?.name}`,
          url: shareUrl
        });
      } catch (error) {
        console.error('Erro ao compartilhar:', error);
      }
    } else {
      navigator.clipboard.writeText(shareUrl);
      setNotification({
        open: true,
        message: 'Link copiado para a área de transferência!',
        severity: 'success'
      });
    }
  };

  const handleMarkerClick = (markerId) => {
    console.log(`Marker clicked: ${markerId}`);
  };

  const handleCloseNotification = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setNotification({ ...notification, open: false });
  };

  if (loading) {
    return (
      <Box 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          bgcolor: '#f5f5f7',
          maxWidth: '480px',
          margin: '0 auto',
        }}
      >
        <Box 
          component={motion.div}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          sx={{ textAlign: 'center' }}
        >
          <CircularProgress size={60} thickness={4} sx={{ mb: 2 }} />
          <Typography variant="h6" color="text.secondary">
            Carregando informações da unidade
          </Typography>
        </Box>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ maxWidth: '480px', margin: '0 auto' }}>
        <Container maxWidth="sm" sx={{ py: 5 }}>
          <Box 
            component={motion.div}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
            sx={{ 
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center'
            }}
          >
            <ErrorIcon color="error" sx={{ fontSize: 60, mb: 2 }} />
            <Typography variant="h5" gutterBottom fontWeight="medium">
              Ops! Ocorreu um erro
            </Typography>
            <Alert severity="error" sx={{ mb: 3, width: '100%' }}>{error}</Alert>
            <Button 
              variant="contained" 
              onClick={handleGoBack} 
              startIcon={<ArrowBackIcon />}
              sx={{ 
                mt: 2, 
                borderRadius: 8,
                px: 3
              }}
            >
              Voltar
            </Button>
          </Box>
        </Container>
      </Box>
    );
  }

  if (!facility) {
    return (
      <Box sx={{ maxWidth: '480px', margin: '0 auto' }}>
        <Container maxWidth="sm" sx={{ py: 5 }}>
          <Box 
            component={motion.div} 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            sx={{ 
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center'
            }}
          >
            <Typography variant="h5" gutterBottom fontWeight="medium">
              Unidade de saúde não encontrada
            </Typography>
            <Alert severity="warning" sx={{ mb: 3, width: '100%' }}>
              Não conseguimos encontrar informações sobre esta unidade de saúde.
            </Alert>
            <Button 
              variant="contained" 
              onClick={handleGoBack} 
              startIcon={<ArrowBackIcon />}
              sx={{ 
                mt: 2, 
                borderRadius: 8,
                px: 3
              }}
            >
              Voltar
            </Button>
          </Box>
        </Container>
      </Box>
    );
  }

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      sx={{ 
        width: '100%',
        minHeight: '100vh',
        bgcolor: '#f5f5f7',
        maxWidth: '480px', 
        margin: '0 auto',
        paddingBottom: '56px',
        position: 'relative'
      }}
    >
      {/* Cabeçalho com imagem da unidade */}
      <Box
        component={motion.div}
        initial={{ scale: 1.05, opacity: 0.8 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
        sx={{ position: 'relative' }}
      >
        <Box
          component="img"
          src={facility.image}
          alt={facility.name}
          sx={{ 
            width: '100%',
            height: 200,
            objectFit: 'cover',
            filter: 'brightness(0.85)',
          }}
        />
        <Box sx={{ 
          position: 'absolute', 
          top: 16, 
          left: 0, 
          right: 0, 
          display: 'flex', 
          justifyContent: 'space-between',
          px: 2,
          zIndex: 2
        }}>
          <IconButton 
            onClick={handleGoBack} 
            sx={{ 
              bgcolor: 'rgba(255,255,255,0.9)', 
              backdropFilter: 'blur(5px)',
              '&:hover': { bgcolor: 'white' },
              transition: 'all 0.2s',
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
            }}
          >
            <ArrowBackIcon />
          </IconButton>
          
          <Box>
            <IconButton 
              onClick={handleToggleFavorite} 
              sx={{ 
                bgcolor: 'rgba(255,255,255,0.9)', 
                backdropFilter: 'blur(5px)',
                '&:hover': { bgcolor: 'white' },
                mr: 1,
                transition: 'all 0.2s',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
              }}
            >
              {isFavorited ? 
                <FavoriteIcon sx={{ color: 'error.main' }} /> : 
                <FavoriteBorderIcon />
              }
            </IconButton>
            <IconButton 
              onClick={handleShare} 
              sx={{ 
                bgcolor: 'rgba(255,255,255,0.9)', 
                backdropFilter: 'blur(5px)',
                '&:hover': { bgcolor: 'white' },
                transition: 'all 0.2s',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
              }}
            >
              <ShareIcon />
            </IconButton>
          </Box>
        </Box>
        
        <Box
          sx={{ 
            position: 'absolute', 
            bottom: 0, 
            left: 0, 
            right: 0,
            p: 2,
            background: 'linear-gradient(to top, rgba(0,0,0,0.85), transparent)',
            color: 'white',
          }}
        >
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            <Chip 
              label={facility.type} 
              size="small" 
              color="primary" 
              sx={{ 
                mb: 1, 
                fontWeight: 600,
                bgcolor: 'primary.main',
                boxShadow: '0 2px 8px rgba(25, 118, 210, 0.4)'
              }}
            />
            <Typography 
              variant="h5" 
              fontWeight="bold"
              sx={{ textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}
            >
              {facility.name}
            </Typography>
            
            {distance && (
              <Typography 
                variant="body2" 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  mt: 0.5,
                  opacity: 0.9
                }}
              >
                <LocationIcon sx={{ fontSize: 16, mr: 0.5 }} />
                {distance} de distância
              </Typography>
            )}
          </motion.div>
        </Box>
      </Box>

      {/* Área de ações principais */}
      <Card
        component={motion.div}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        sx={{ 
          mx: 2, 
          mt: -2, 
          borderRadius: 3, 
          overflow: 'visible', 
          position: 'relative',
          zIndex: 2,
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
        }}
        elevation={2}
      >
        <CardContent sx={{ p: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Button 
                variant="contained" 
                color="primary" 
                fullWidth
                startIcon={<PhoneIcon />}
                onClick={handleCallFacility}
                sx={{ 
                  borderRadius: 2,
                  py: 1.2,
                  boxShadow: '0 4px 12px rgba(25, 118, 210, 0.3)',
                  fontWeight: 600,
                  transition: 'all 0.2s',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 6px 16px rgba(25, 118, 210, 0.4)'
                  }
                }}
              >
                Ligar
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button 
                variant="outlined" 
                fullWidth
                startIcon={<DirectionsIcon />}
                onClick={handleGetDirections}
                sx={{ 
                  borderRadius: 2,
                  py: 1.2,
                  borderWidth: 2,
                  fontWeight: 600,
                  transition: 'all 0.2s',
                  '&:hover': {
                    borderWidth: 2,
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                  }
                }}
              >
                Traçar Rota
              </Button>
            </Grid>
          </Grid>

          <Box sx={{ mt: 2.5, mb: 1 }}>
            <Typography 
              variant="body2" 
              sx={{ 
                display: 'flex', 
                alignItems: 'flex-start',
                color: 'text.secondary',
                lineHeight: 1.6
              }}
            >
              <LocationIcon sx={{ fontSize: 18, mr: 1, mt: 0.3, color: 'text.disabled' }} />
              {facility.address}
            </Typography>
          </Box>
          <Divider sx={{ my: 2.5 }} />
          
          {/* Tempo de espera e lotação */}
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <WaitingTime 
                minutes={facility.waitingTime.minutes} 
                updatedAt={facility.waitingTime.updatedAt} 
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CrowdIndicator level={facility.crowdLevel} />
            </Grid>
          </Grid>
          
          {/* Avaliação resumida */}
          <Box 
            component={motion.div}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.3 }}
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              mt: 3,
              bgcolor: 'background.paper', 
              p: 2,
              borderRadius: 2,
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
            }}
          >
            <Avatar 
              sx={{ 
                bgcolor: 'primary.light', 
                width: 48, 
                height: 48,
                color: 'primary.dark' 
              }}
            >
              <StarIcon />
            </Avatar>
            <Box sx={{ ml: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="h5" sx={{ fontWeight: 'bold', mr: 1, color: 'primary.dark' }}>
                  {facility.ratings.average.toFixed(1)}
                </Typography>
                <Rating value={facility.ratings.average} precision={0.1} readOnly size="small" />
              </Box>
              <Typography variant="body2" color="text.secondary">
                {facility.ratings.total} avaliações
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Tabs para diferentes seções */}
      <Box sx={{ mt: 3, px: 2 }}>
        <Paper 
          sx={{ 
            borderRadius: 3,
            overflow: 'hidden',
            boxShadow: '0 2px 12px rgba(0,0,0,0.06)'
          }}
        >
          <Tabs 
            value={activeTab} 
            onChange={handleChangeTab}
            variant="fullWidth"
            aria-label="facility details tabs"
            sx={{ 
              borderBottom: 1,
              borderColor: 'divider',
              '& .MuiTab-root': {
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '0.95rem',
                py: 1.8,
                color: 'text.secondary',
                '&.Mui-selected': {
                  color: 'primary.main'
                }
              },
              '& .MuiTabs-indicator': {
                height: 3,
                borderRadius: '3px 3px 0 0'
              }
            }}
          >
            <Tab 
              icon={<MedicalServicesIcon sx={{ mb: 0.5 }} />} 
              label="Informações" 
              iconPosition="top"
            />
            <Tab 
              icon={<CommentIcon sx={{ mb: 0.5 }} />} 
              label="Avaliações" 
              iconPosition="top"
            />
            <Tab 
              icon={<TodayIcon sx={{ mb: 0.5 }} />} 
              label="Horários" 
              iconPosition="top"
            />
          </Tabs>
        </Paper>
        <Box sx={{ p: 2 }}>
          {/* Conteúdo da tab "Informações" */}
          {activeTab === 0 && (
            <Box component={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {/* Sobre o hospital */}
              {facility.description && (
                <Paper 
                  elevation={0} 
                  sx={{ 
                    p: 2, 
                    mb: 3, 
                    borderRadius: 2,
                    bgcolor: 'background.paper',
                    border: '1px solid rgba(0,0,0,0.05)'
                  }}
                >
                  <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                    Sobre
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                    {facility.description}
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
                    <Chip 
                      icon={<LocationIcon fontSize="small" />} 
                      label={`${facility.city}, ${facility.state}`} 
                      variant="outlined" 
                      size="small"
                    />
                    {facility.hasEmergency && (
                      <Chip 
                        icon={<AccessTimeIcon fontSize="small" />} 
                        label="Emergência 24h" 
                        color="error" 
                        size="small"
                        sx={{ fontWeight: 500 }}
                      />
                    )}
                    {facility.hasPediatricEmergency && (
                      <Chip 
                        label="Emergência Pediátrica" 
                        color="info" 
                        size="small"
                        sx={{ fontWeight: 500 }}
                      />
                    )}
                    {facility.hasMaternity && (
                      <Chip 
                        label="Maternidade" 
                        color="success" 
                        size="small"
                        sx={{ fontWeight: 500 }}
                      />
                    )}
                  </Box>
                </Paper>
              )}
              {/* Especialidades */}
              <Paper 
                elevation={0} 
                sx={{ 
                  p: 2, 
                  mb: 3, 
                  borderRadius: 2,
                  bgcolor: 'background.paper',
                  border: '1px solid rgba(0,0,0,0.05)'
                }}
              >
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  Especialidades
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {facility.specialties.map((specialty, index) => (
                    <Chip 
                      key={index} 
                      label={specialty} 
                      variant="outlined" 
                      color="primary" 
                      size="medium"
                      sx={{ fontWeight: 500, borderRadius: 4 }}
                    />
                  ))}
                </Box>
              </Paper>
              {/* Serviços oferecidos */}
              {facility.services && (
                <Paper 
                  elevation={0} 
                  sx={{ 
                    p: 2, 
                    mb: 3, 
                    borderRadius: 2,
                    bgcolor: 'background.paper',
                    border: '1px solid rgba(0,0,0,0.05)'
                  }}
                >
                  <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                    Serviços
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {facility.services.map((service, index) => (
                      <Chip 
                        key={index} 
                        label={service} 
                        variant="outlined" 
                        color="primary" 
                        size="medium"
                        sx={{ fontWeight: 500, borderRadius: 4 }}
                      />
                    ))}
                  </Box>
                </Paper>
              )}
              {/* Convênios aceitos */}
              <Paper 
                elevation={0} 
                sx={{ 
                  p: 2, 
                  mb: 3, 
                  borderRadius: 2,
                  bgcolor: 'background.paper',
                  border: '1px solid rgba(0,0,0,0.05)'
                }}
              >
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  Convênios
                </Typography>
                <Box sx={{ mb: 1.5 }}>
                  <Chip 
                    label={facility.acceptsPublicInsurance ? "Aceita SUS" : "Não aceita SUS"} 
                    color={facility.acceptsPublicInsurance ? "success" : "default"} 
                    variant={facility.acceptsPublicInsurance ? "filled" : "outlined"} 
                    sx={{ fontWeight: 500, borderRadius: 4, mr: 1 }}
                  />
                </Box>
                {facility.privateInsurance && facility.privateInsurance.length > 0 ? (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {facility.privateInsurance.map((insurance, index) => (
                      <Chip 
                        key={index} 
                        label={insurance} 
                        variant="outlined" 
                        size="small"
                        sx={{ borderRadius: 4 }}
                      />
                    ))}
                  </Box>
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    Não aceita convênios particulares.
                  </Typography>
                )}
              </Paper>
              {/* Localização */}
              <Paper 
                elevation={1} 
                sx={{ 
                  p: 2, 
                  mb: 3, 
                  borderRadius: 2,
                  height: 200, 
                  overflow: 'hidden',
                  boxShadow: '0 3px 12px rgba(0,0,0,0.08)'
                }}
              >
                <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1.5, mt: 4 }}>
                  Localização
                </Typography>
                {facility.position && (
                  <GoogleMapsView 
                    center={[facility.position[0], facility.position[1]]}
                    zoom={15}
                    markers={[
                      {
                        id: facility.id,
                        position: [facility.position[0], facility.position[1]],
                        content: `
                          <div style="padding: 5px; max-width: 200px;">
                            <strong style="font-size: 14px;">${facility.name}</strong>
                            <p style="font-size: 12px; margin: 5px 0;">${facility.address}</p>
                            <p style="font-size: 12px; margin: 5px 0;">${facility.city}, ${facility.state}</p>
                            <p style="font-size: 12px; margin: 5px 0;">Telefone: ${facility.phone}</p>
                          </div>`,
                        onClick: () => handleMarkerClick(facility.id)
                      }
                    ]}
                  />
                )}
              </Paper>
              {/* Atendimento de emergência */}
              {facility.hasEmergency && (
                <>
                  <Paper 
                    elevation={0} 
                    sx={{ 
                      p: 3, 
                      mb: 3, 
                      borderRadius: 2,
                      bgcolor: 'error.light',
                      border: '1px solid rgba(211,47,47,0.2)'
                    }}
                  >
                    <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1.5 }}>
                      Atendimento de emergência
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <AccessTimeIcon sx={{ mr: 1.5, color: 'error.main', fontSize: 28 }} />
                      <Typography variant="h6" fontWeight="500" color="error.dark">
                        {facility.openingHours.emergency}
                      </Typography>
                    </Box>
                  </Paper>
                </>
              )}
              {/* Acessibilidade */}
              {facility.accessibility && (
                <Paper 
                  elevation={0} 
                  sx={{ 
                    p: 2, 
                    mb: 3, 
                    borderRadius: 2,
                    bgcolor: 'background.paper',
                    border: '1px solid rgba(0,0,0,0.05)'
                  }}
                >
                  <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                    Acessibilidade
                  </Typography>
                  <Grid container spacing={1}>
                    {Object.entries(facility.accessibility).map(([key, value]) => {
                      let label;
                      switch (key) {
                        case 'wheelchairAccess': label = 'Acesso para cadeirantes'; break;
                        case 'accessibleBathrooms': label = 'Banheiros acessíveis'; break;
                        case 'brailleSignage': label = 'Sinalização em Braille'; break;
                        case 'hearingAccessibility': label = 'Acessibilidade auditiva'; break;
                        case 'dedicatedParking': label = 'Estacionamento dedicado'; break;
                        default: label = key;
                      }
                      return (
                        <Grid item xs={12} sm={6} key={key}>
                          <Box sx={{ display: 'flex', alignItems: 'center', py: 0.5 }}>
                            {value ? (
                              <CheckCircleIcon color="success" fontSize="small" sx={{ mr: 1 }} />
                            ) : (
                              <CancelIcon color="disabled" fontSize="small" sx={{ mr: 1 }} />
                            )}
                            <Typography 
                              variant="body2" 
                              sx={{ color: value ? 'text.primary' : 'text.secondary' }}
                            >
                              {label}
                            </Typography>
                          </Box>
                        </Grid>
                      );
                    })}
                  </Grid>
                </Paper>
              )}
            </Box>
          )}
          {/* Conteúdo da tab "Avaliações" */}
          {activeTab === 1 && (
            <Box component={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <FacilityRating 
                ratings={facility.ratings} 
                facilityId={facility.id}
              />
            </Box>
          )}
          {/* Conteúdo da tab "Horários" */}
          {activeTab === 2 && (
            <Box component={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <OpeningHours schedule={facility.openingHours.general} />
            </Box>
          )}
        </Box>
      </Box>

      {/* Corrigir a barra de navegação inferior */}
      <Snackbar 
        open={notification.open} 
        autoHideDuration={3000} 
        onClose={handleCloseNotification} 
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        sx={{ mb: 7 }}
      >
        <Alert 
          severity={notification.severity} 
          onClose={handleCloseNotification} 
          variant="filled"
          sx={{ width: '100%', boxShadow: '0 2px 10px rgba(0,0,0,0.2)' }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
      <BottomNavigation 
        value={bottomNavValue} 
        onChange={(event, newValue) => {
          switch (newValue) {
            case 0: 
              navigate('/home');
              break;
            case 1: 
              navigate('/community');
              break;
            case 2: 
              navigate('/favorites');
              break;
            case 3: 
              navigate('/more');
              break;
            default: 
              break;
          }
        }}
        showLabels
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          width: '100%',
          height: '56px',
          boxShadow: '0px -2px 10px rgba(0, 0, 0, 0.05)',
          zIndex: 2000,
          maxWidth: '480px',
          margin: '0 auto',
        }}
      >
        <BottomNavigationAction 
          label="Início" 
          icon={<HomeIcon />} 
          sx={{ minWidth: 'auto' }}
        />
        <BottomNavigationAction 
          label="Comunidade" 
          icon={<ChatIcon />} 
          sx={{ minWidth: 'auto' }}
        />
        <BottomNavigationAction 
          label="Favoritos" 
          icon={
            <Badge color="error" variant="dot" invisible={!isFavorited}>
              <FavoriteIcon />
            </Badge>
          } 
          sx={{ minWidth: 'auto' }}
        />
        <BottomNavigationAction 
          label="Mais" 
          icon={<MoreIcon />} 
          sx={{ minWidth: 'auto' }}
        />
      </BottomNavigation>
    </Box>
  );
};

export default FacilityDetails;
