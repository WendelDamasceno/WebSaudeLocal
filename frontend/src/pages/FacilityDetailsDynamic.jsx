import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Chip,
  Divider,
  IconButton,
  CircularProgress,
  Snackbar,
  Alert,
  Grid,
  AppBar,
  Toolbar,
  Paper,
  Avatar,
  Rating,
  BottomNavigation,
  BottomNavigationAction,
  Badge,
  Tab,
  Tabs,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar
} from '@mui/material';
import {
  Phone as PhoneIcon,
  Directions as DirectionsIcon,
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  LocationOn as LocationIcon,
  ArrowBack as ArrowBackIcon,
  AccessTime as AccessTimeIcon,
  MedicalServices as MedicalServicesIcon,
  Comment as CommentIcon,
  Home as HomeIcon,
  Chat as ChatIcon,
  MoreHoriz as MoreIcon,
  Star as StarIcon,
  Person as PersonIcon
} from '@mui/icons-material';
import GoogleMapsView from '../components/GoogleMapsView';
import OpeningHours from '../components/OpeningHours';
import { toggleFavorite, isFavorite } from '../utils/FavoritesService';

const FacilityDetailsDynamic = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [facility, setFacility] = useState(null);
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFavorited, setIsFavorited] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });
  const [bottomNavValue, setBottomNavValue] = useState(0);

  useEffect(() => {
    const hospitalImages = [
      'https://img.freepik.com/fotos-premium/grande-hhospital-moderno_78493-4968.jpg',
      'https://media.gazetadopovo.com.br/haus/2020/03/medplex-vl9-34ab60c0.jpg',
      'https://www.anabad.org/wp-content/uploads/2020/03/hospital-2.jpg',
      'https://nossasaude.page/wp-content/uploads/2023/10/2023-10-08-hospital-770.webp',
      'https://blog.ipog.edu.br/wp-content/uploads/2017/10/831587408-hospital-publico-1.jpg',
      'https://www.hospitalinfantilsabara.org.br/wp-content/uploads/2022/02/sabara-fachada-1.jpg',
      'https://blogs.correiobraziliense.com.br/cbpoder/wp-content/uploads/sites/20/2022/10/hospital-de-base.jpeg'
    ];

    const fetchFacilityDetails = async () => {
      setLoading(true);
      try {
        console.log("ID recebido na busca:", id);
        
        const hospitalsData = [
          {
            id: '1',
            name: 'Hospital Regional São Lucas',
            type: 'Hospital Público',
            address: 'Av. Principal, 1500, Centro, Salvador, BA',
            phone: '(71) 3333-2222',
            position: [-12.9722, -38.5014],
            image: hospitalImages[0],
            waitingTime: {
              minutes: 45,
              updatedAt: new Date(Date.now() - 30 * 60000).toISOString()
            },
            crowdLevel: 'medium',
            acceptsSUS: true,
            openingHours: [
              { day: 'Segunda-feira', hours: '08:00 - 18:00' },
              { day: 'Terça-feira', hours: '08:00 - 18:00' },
              { day: 'Quarta-feira', hours: '08:00 - 18:00' },
              { day: 'Quinta-feira', hours: '08:00 - 18:00' },
              { day: 'Sexta-feira', hours: '08:00 - 18:00' },
              { day: 'Sábado', hours: '08:00 - 12:00' },
              { day: 'Domingo', hours: 'Fechado' },
            ],
            specialties: ['Clínica Geral', 'Pediatria', 'Ortopedia', 'Cardiologia', 'Neurologia'],
            ratings: {
              average: 4.2,
              total: 120,
              criteria: {
                attendance: 4.5,
                cleanliness: 4.0,
                quality: 4.3,
                crowding: 3.8,
              },
              comments: [
                { id: 1, author: 'João Silva', rating: 5, date: '2023-10-01', comment: 'Excelente atendimento! Os médicos são muito atenciosos e o hospital é bem organizado.' },
                { id: 2, author: 'Maria Oliveira', rating: 4, date: '2023-09-25', comment: 'Muito limpo e organizado. O tempo de espera foi razoável.' },
                { id: 3, author: 'Pedro Santos', rating: 3, date: '2023-09-18', comment: 'Atendimento médico bom, mas a espera foi longa.' },
              ],
            },
          },
          {
            id: '2',
            name: 'UPA 24h Costa Azul',
            type: 'Unidade de Pronto Atendimento',
            address: 'Rua do Costa Azul, 758, Costa Azul, Salvador, BA',
            phone: '(71) 3444-5555',
            position: [-12.9914, -38.4612],
            image: hospitalImages[1],
            waitingTime: {
              minutes: 30,
              updatedAt: new Date(Date.now() - 15 * 60000).toISOString()
            },
            crowdLevel: 'low',
            acceptsSUS: true,
            openingHours: [
              { day: 'Segunda-feira', hours: '24 horas' },
              { day: 'Terça-feira', hours: '24 horas' },
              { day: 'Quarta-feira', hours: '24 horas' },
              { day: 'Quinta-feira', hours: '24 horas' },
              { day: 'Sexta-feira', hours: '24 horas' },
              { day: 'Sábado', hours: '24 horas' },
              { day: 'Domingo', hours: '24 horas' },
            ],
            specialties: ['Clínica Geral', 'Pediatria', 'Emergência'],
            ratings: {
              average: 3.8,
              total: 95,
              criteria: {
                attendance: 3.5,
                cleanliness: 4.0,
                quality: 3.8,
                crowding: 3.2,
              },
              comments: [
                { id: 1, author: 'Ana Costa', rating: 4, date: '2023-09-15', comment: 'Atendimento rápido na emergência. Equipe competente.' },
                { id: 2, author: 'Carlos Mendes', rating: 3, date: '2023-09-10', comment: 'Bom atendimento, mas estava cheio quando fui.' },
              ],
            },
          },
          {
            id: '3',
            name: 'Hospital Particular da Bahia',
            type: 'Hospital Particular',
            address: 'Avenida Tancredo Neves, 2782, Caminho das Árvores, Salvador, BA',
            phone: '(71) 3222-1111',
            position: [-12.9833, -38.4518],
            image: hospitalImages[2],
            waitingTime: {
              minutes: 15,
              updatedAt: new Date(Date.now() - 5 * 60000).toISOString()
            },
            crowdLevel: 'low',
            acceptsSUS: false,
            openingHours: [
              { day: 'Segunda-feira', hours: '08:00 - 20:00' },
              { day: 'Terça-feira', hours: '08:00 - 20:00' },
              { day: 'Quarta-feira', hours: '08:00 - 20:00' },
              { day: 'Quinta-feira', hours: '08:00 - 20:00' },
              { day: 'Sexta-feira', hours: '08:00 - 20:00' },
              { day: 'Sábado', hours: '08:00 - 16:00' },
              { day: 'Domingo', hours: '08:00 - 12:00' },
            ],
            specialties: ['Clínica Geral', 'Cardiologia', 'Ortopedia', 'Neurologia', 'Dermatologia', 'Oftalmologia'],
            ratings: {
              average: 4.7,
              total: 210,
              criteria: {
                attendance: 4.8,
                cleanliness: 4.9,
                quality: 4.7,
                crowding: 4.4,
              },
              comments: [
                { id: 1, author: 'Roberto Almeida', rating: 5, date: '2023-10-10', comment: 'Excelente estrutura e atendimento. Médicos muito qualificados.' },
                { id: 2, author: 'Camila Souza', rating: 4, date: '2023-09-28', comment: 'Ótimo hospital, recomendo. Limpeza impecável e bom atendimento.' },
              ],
            },
          },
          {
            id: 'default',
            name: 'Unidade de Saúde',
            type: 'Instituição de Saúde',
            address: 'Endereço a ser confirmado, Salvador, BA',
            phone: '(71) 9999-9999',
            position: [-12.9716, -38.5024],
            image: hospitalImages[3],
            waitingTime: {
              minutes: 20,
              updatedAt: new Date().toISOString()
            },
            crowdLevel: 'medium',
            acceptsSUS: true,
            openingHours: [
              { day: 'Segunda-feira', hours: '08:00 - 18:00' },
              { day: 'Terça-feira', hours: '08:00 - 18:00' },
              { day: 'Quarta-feira', hours: '08:00 - 18:00' },
              { day: 'Quinta-feira', hours: '08:00 - 18:00' },
              { day: 'Sexta-feira', hours: '08:00 - 18:00' },
              { day: 'Sábado', hours: '08:00 - 12:00' },
              { day: 'Domingo', hours: 'Fechado' },
            ],
            specialties: ['Clínica Geral', 'Atendimento Básico'],
            ratings: {
              average: 3.5,
              total: 45,
              criteria: {
                attendance: 3.5,
                cleanliness: 3.6,
                quality: 3.4,
                crowding: 3.5,
              },
              comments: [
                { id: 1, author: 'Usuário Anônimo', rating: 3, date: '2023-09-20', comment: 'Atendimento padrão, sem grandes problemas.' },
              ],
            },
          }
        ];

        setHospitals(hospitalsData);

        const osmIdMapping = {
          '1234567': '1',
          '7654321': '2',
          '9876543': '3',
        };

        let foundHospital = hospitalsData.find(h => String(h.id) === String(id));
        console.log("Resultado busca direta:", foundHospital);

        if (!foundHospital) {
          const osmId = Object.entries(osmIdMapping).find(([key]) => key === id)?.[1];
          if (osmId) {
            foundHospital = hospitalsData.find(h => String(h.id) === String(osmId));
            console.log("Resultado busca OSM:", foundHospital);
          }
        }

        if (!foundHospital) {
          foundHospital = {
            ...hospitalsData.find(h => h.id === 'default'),
            id: id,
            name: `Hospital ${id}`,
            image: hospitalImages[Math.floor(Math.random() * hospitalImages.length)]
          };
          console.log("Usando hospital padrão:", foundHospital);
        }

        if (foundHospital) {
          console.log("Definindo facility com:", foundHospital);
          setFacility(foundHospital);
          setIsFavorited(isFavorite(foundHospital.id));
        } else {
          throw new Error('Hospital não encontrado');
        }
      } catch (err) {
        console.error('Erro ao buscar detalhes:', err);
        setError('Não foi possível carregar as informações desta unidade de saúde.');
      } finally {
        setLoading(false);
      }
    };

    fetchFacilityDetails();
  }, [id]);

  const handleToggleFavorite = () => {
    toggleFavorite(id);
    setIsFavorited(!isFavorited);
    setNotification({
      open: true,
      message: isFavorited ? 'Removido dos favoritos' : 'Adicionado aos favoritos',
      severity: 'success',
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

  const formatWaitingTime = (minutes) => {
    if (minutes < 60) {
      return `${minutes} minutos`;
    } else {
      const hours = Math.floor(minutes / 60);
      const mins = minutes % 60;
      return `${hours}h ${mins > 0 ? mins + 'min' : ''}`;
    }
  };

  const handleNavigate = (route) => {
    navigate(route);
  };

  const handleMarkerClick = (markerId) => {
    const selectedHospital = hospitals.find(h => h.id === markerId);
    if (selectedHospital) {
      setFacility(selectedHospital);
      console.log(`Hospital selecionado: ${selectedHospital.name}`);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ textAlign: 'center', mt: 4, p: 2 }}>
        <Typography variant="h6" color="error" gutterBottom>
          {error}
        </Typography>
        <Button variant="contained" onClick={() => navigate(-1)} sx={{ mt: 2 }}>
          Voltar
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ 
      width: '100%',
      maxWidth: '480px', 
      margin: '0 auto',
      minHeight: '100vh',
      backgroundColor: '#f5f5f7',
      paddingBottom: '56px',
      fontFamily: '"Plus Jakarta Sans", "Noto Sans", sans-serif',
      position: 'relative' 
    }}>
      <AppBar 
        position="fixed" 
        color="default" 
        elevation={0} 
        sx={{ 
          maxWidth: '480px', 
          margin: '0 auto',
          left: '50%',
          transform: 'translateX(-50%)',
          right: 'auto',
          width: '100%'
        }}
      >
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={() => navigate(-1)} aria-label="back">
            <ArrowBackIcon />
          </IconButton>
          <Typography 
            variant="h6" 
            sx={{ 
              flexGrow: 1, 
              fontWeight: 'bold', 
              textAlign: 'center',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
          >
            {facility?.name || 'Carregando...'}
          </Typography>
          <IconButton color="inherit" onClick={handleToggleFavorite}>
            {isFavorited ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
          </IconButton>
        </Toolbar>
      </AppBar>

      <Box sx={{ pt: 7 }}>
        <Box sx={{ position: 'relative' }}>
          <img 
            src={facility?.image || ''} 
            alt={facility?.name || 'Imagem do hospital'} 
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://via.placeholder.com/400x200?text=Imagem+não+disponível';
            }}
            style={{ 
              width: '100%', 
              height: '200px', 
              objectFit: 'cover',
              borderBottomLeftRadius: '16px',
              borderBottomRightRadius: '16px' 
            }} 
          />
          <Box sx={{ 
            position: 'absolute', 
            bottom: 0, 
            left: 0, 
            right: 0, 
            background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
            p: 2,
            borderBottomLeftRadius: '16px',
            borderBottomRightRadius: '16px',
            color: 'white' 
          }}>
            <Chip 
              label={facility?.type || 'Tipo não especificado'} 
              size="small" 
              color="primary" 
              sx={{ mb: 1 }} 
            />
            <Typography variant="h5" fontWeight="bold">
              {facility?.name || 'Nome do hospital não disponível'}
            </Typography>
          </Box>
        </Box>

        <Paper sx={{ mx: 2, mt: -2, borderRadius: 3, position: 'relative', zIndex: 1, p: 2 }}>
          <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center' }} color="text.secondary">
            <LocationIcon fontSize="small" sx={{ mr: 1 }} />
            {facility?.address || 'Endereço não disponível'}
          </Typography>
          
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={6}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                startIcon={<PhoneIcon />}
                onClick={handleCallFacility}
                sx={{ borderRadius: 2 }}
              >
                Ligar
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="outlined"
                color="primary"
                fullWidth
                startIcon={<DirectionsIcon />}
                onClick={handleGetDirections}
                sx={{ borderRadius: 2 }}
              >
                Traçar Rota
              </Button>
            </Grid>
          </Grid>
        </Paper>

        <Paper sx={{ m: 2, p: 2, borderRadius: 3 }}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Tempo de Espera Estimado
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <AccessTimeIcon sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
            <Box>
              <Typography variant="h5" fontWeight="bold" color="primary.main">
                {formatWaitingTime(facility.waitingTime.minutes)}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Atualizado {new Date(facility.waitingTime.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </Typography>
            </Box>
          </Box>
        </Paper>

        <Paper sx={{ mx: 2, mb: 2, borderRadius: 3, overflow: 'hidden' }}>
          <Tabs
            value={activeTab}
            onChange={handleChangeTab}
            variant="fullWidth"
            aria-label="hospital information tabs"
            sx={{ bgcolor: 'background.paper' }}
          >
            <Tab 
              icon={<MedicalServicesIcon fontSize="small" />} 
              label="Informações" 
              id="tab-0" 
              aria-controls="tabpanel-0" 
            />
            <Tab 
              icon={<AccessTimeIcon fontSize="small" />} 
              label="Horários" 
              id="tab-1" 
              aria-controls="tabpanel-1" 
            />
            <Tab 
              icon={<CommentIcon fontSize="small" />} 
              label="Avaliações" 
              id="tab-2" 
              aria-controls="tabpanel-2" 
            />
          </Tabs>
        </Paper>

        <Box sx={{ px: 2, pb: 4 }}>
          {activeTab === 0 && (
            <Box role="tabpanel" id="tabpanel-0" aria-labelledby="tab-0">
              <Paper sx={{ p: 2, mb: 2, borderRadius: 3 }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Especialidades
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {facility.specialties.map((specialty, index) => (
                    <Chip key={index} label={specialty} color="primary" variant="outlined" />
                  ))}
                </Box>
              </Paper>

              <Paper sx={{ p: 2, mb: 2, borderRadius: 3 }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Localização
                </Typography>
                <Box sx={{ height: '200px', borderRadius: 2, overflow: 'hidden', mb: 2 }}>
                  <GoogleMapsView 
                    center={facility.position} 
                    zoom={15} 
                    markers={[
                      {
                        id: facility.id,
                        position: facility.position,
                        content: `<strong>${facility.name}</strong>`,
                        onClick: () => handleMarkerClick(facility.id)
                      }
                    ]} 
                  />
                </Box>
              </Paper>

              <Paper sx={{ p: 2, borderRadius: 3 }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Convênios
                </Typography>
                <Chip 
                  label={facility.acceptsSUS ? "Aceita SUS" : "Não aceita SUS"} 
                  color={facility.acceptsSUS ? "success" : "default"} 
                  variant="outlined" 
                />
              </Paper>
            </Box>
          )}

          {activeTab === 1 && (
            <Box role="tabpanel" id="tabpanel-1" aria-labelledby="tab-1">
              <Paper sx={{ p: 2, borderRadius: 3 }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Horário de Funcionamento
                </Typography>
                <OpeningHours schedule={facility.openingHours} />
              </Paper>
            </Box>
          )}

          {activeTab === 2 && (
            <Box role="tabpanel" id="tabpanel-2" aria-labelledby="tab-2">
              <Paper sx={{ p: 2, mb: 2, borderRadius: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                    <StarIcon />
                  </Avatar>
                  <Box>
                    <Typography variant="h4" fontWeight="bold">
                      {facility.ratings.average.toFixed(1)}
                    </Typography>
                    <Rating value={facility.ratings.average} precision={0.5} readOnly />
                  </Box>
                  <Box sx={{ ml: 'auto', textAlign: 'right' }}>
                    <Typography variant="body2" color="text.secondary">
                      {facility.ratings.total} avaliações
                    </Typography>
                    <Button 
                      variant="contained" 
                      size="small" 
                      sx={{ mt: 1, borderRadius: 2 }}
                    >
                      Avaliar
                    </Button>
                  </Box>
                </Box>

                <Divider sx={{ my: 2 }} />

                <Box>
                  <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                    Avaliações por critério
                  </Typography>
                  <Grid container spacing={1}>
                    <Grid item xs={6}>
                      <Typography variant="body2">Atendimento</Typography>
                      <Rating value={facility.ratings.criteria.attendance} precision={0.5} readOnly size="small" />
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2">Limpeza</Typography>
                      <Rating value={facility.ratings.criteria.cleanliness} precision={0.5} readOnly size="small" />
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2">Qualidade</Typography>
                      <Rating value={facility.ratings.criteria.quality} precision={0.5} readOnly size="small" />
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2">Lotação</Typography>
                      <Rating value={facility.ratings.criteria.crowding} precision={0.5} readOnly size="small" />
                    </Grid>
                  </Grid>
                </Box>
              </Paper>

              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Comentários dos usuários
              </Typography>

              <List sx={{ p: 0 }}>
                {facility.ratings.comments.map((comment) => (
                  <Paper 
                    key={comment.id} 
                    sx={{ mb: 2, p: 2, borderRadius: 3 }}
                  >
                    <ListItem sx={{ px: 0 }} alignItems="flex-start">
                      <ListItemAvatar>
                        <Avatar>
                          <PersonIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="subtitle1" fontWeight="bold">
                              {comment.author}
                            </Typography>
                            <Rating value={comment.rating} readOnly size="small" />
                          </Box>
                        }
                        secondary={
                          <>
                            <Typography variant="caption" color="text.secondary" component="span">
                              {new Date(comment.date).toLocaleDateString()}
                            </Typography>
                            <Typography variant="body2" sx={{ mt: 1 }}>
                              {comment.comment}
                            </Typography>
                          </>
                        }
                      />
                    </ListItem>
                  </Paper>
                ))}
              </List>
            </Box>
          )}
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
          onClick={() => handleNavigate('/home')}
        />
        <BottomNavigationAction 
          label="Comunidade" 
          icon={<ChatIcon />} 
          onClick={() => handleNavigate('/community')}
        />
        <BottomNavigationAction 
          label="Favoritos" 
          icon={
            <Badge color="error" variant="dot" invisible={!isFavorited}>
              <FavoriteIcon />
            </Badge>
          } 
          onClick={() => handleNavigate('/favorites')}
        />
        <BottomNavigationAction 
          label="Mais" 
          icon={<MoreIcon />} 
          onClick={() => handleNavigate('/more')}
        />
      </BottomNavigation>

      <Snackbar
        open={notification.open}
        autoHideDuration={3000}
        onClose={() => setNotification({ ...notification, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        sx={{ mb: 7 }}
      >
        <Alert 
          severity={notification.severity} 
          sx={{ width: '100%' }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default FacilityDetailsDynamic;
