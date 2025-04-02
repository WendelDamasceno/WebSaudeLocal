import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  IconButton, 
  Divider, 
  Paper, 
  Grid, 
  Card, 
  CardContent, 
  Checkbox, 
  FormGroup, 
  FormControlLabel, 
  TextField, 
  Slider, 
  Rating, 
  InputAdornment, 
  Chip, 
  Avatar, 
  BottomNavigation, 
  BottomNavigationAction,
  CircularProgress,
  ListItemAvatar,
  Autocomplete, // Adicionando Autocomplete que estava faltando
} from '@mui/material';
import { 
  FilterList as FilterIcon, 
  Star as StarIcon, 
  Medication as MedicationIcon, 
  Videocam as TelemedicineIcon, 
  History as HistoryIcon, 
  Settings as SettingsIcon, 
  Help as HelpIcon, 
  Info as InfoIcon, 
  ExitToApp as LogoutIcon, 
  Search as SearchIcon,
  Close as CloseIcon,
  Home as HomeIcon,
  Chat as ChatIcon,
  Favorite as FavoriteIcon,
  MoreHoriz as MoreIcon,
  LocationOn as LocationIcon,
  AccessTime as AccessTimeIcon,
  Event as EventIcon,
  ArrowForward as ArrowForwardIcon,
  LocalPharmacy as PharmacyIcon,
  LocalHospital as HospitalIcon,
  Thermostat as TemperatureIcon,
  Check as CheckIcon,
  LocalHospital,
  MedicalServices,
  ArrowBack as ArrowBackIcon // Restaurando ArrowBackIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

// Componente para itens do menu
const MenuOption = ({ icon, title, description, onClick, chip }) => (
  <Paper 
    elevation={0} 
    sx={{ 
      mb: 2, 
      borderRadius: 3,
      border: '1px solid rgba(0, 0, 0, 0.05)',
      overflow: 'hidden',
      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      }
    }}
  >
    <ListItem 
      button 
      onClick={onClick}
      sx={{ px: 2, py: 1.5 }}
    >
      <ListItemIcon sx={{ minWidth: 48 }}>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          width: 40, 
          height: 40, 
          borderRadius: 2,
          backgroundColor: 'primary.lighter' 
        }}>
          {icon}
        </Box>
      </ListItemIcon>
      <ListItemText 
        primary={
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="subtitle1" fontWeight="medium">
              {title}
            </Typography>
            {chip && (
              <Chip 
                size="small" 
                label={chip.label} 
                color={chip.color || "primary"} 
                sx={{ ml: 1, fontSize: '0.7rem', height: 20 }} 
              />
            )}
          </Box>
        }
        secondary={description}
      />
      <ArrowForwardIcon color="action" fontSize="small" />
    </ListItem>
  </Paper>
);

// Modal de Filtros
const FilterModal = ({ open, onClose }) => {
  const [filterOptions, setFilterOptions] = useState({
    facilityTypes: {
      hospital: true,
      clinic: true,
      basicUnit: false,
      pharmacy: true
    },
    specialty: '',
    waitingTime: 3,
    rating: 0,
    insurances: []
  });

  const handleFilterChange = (category, value) => {
    if (category === 'facilityTypes') {
      setFilterOptions(prev => ({
        ...prev,
        facilityTypes: {
          ...prev.facilityTypes,
          [value]: !prev.facilityTypes[value]
        }
      }));
    } else {
      setFilterOptions(prev => ({
        ...prev,
        [category]: value
      }));
    }
  };

  const handleClearFilters = () => {
    setFilterOptions({
      facilityTypes: {
        hospital: false,
        clinic: false,
        basicUnit: false,
        pharmacy: false
      },
      specialty: '',
      waitingTime: 3,
      rating: 0,
      insurances: []
    });
  };

  const specialties = [
    "Cardiologia", "Clínica Geral", "Dermatologia", "Endocrinologia",
    "Ginecologia", "Neurologia", "Oftalmologia", "Ortopedia",
    "Pediatria", "Psiquiatria"
  ];

  const insurances = [
    "SUS", "Amil", "Bradesco Saúde", "Hapvida", "NotreDame Intermédica",
    "SulAmérica", "Unimed"
  ];

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{ 
        sx: { 
          borderRadius: 4,
          px: 1
        } 
      }}
    >
      <DialogTitle>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h6" fontWeight="bold">Filtros</Typography>
          <IconButton onClick={onClose} edge="end">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      
      <DialogContent dividers sx={{ p: 3 }}>
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
            Tipo de Unidade
          </Typography>
          <FormGroup>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <FormControlLabel
                  control={
                    <Checkbox 
                      checked={filterOptions.facilityTypes.hospital}
                      onChange={() => handleFilterChange('facilityTypes', 'hospital')}
                    />
                  }
                  label="Hospital"
                />
              </Grid>
              <Grid item xs={6}>
                <FormControlLabel
                  control={
                    <Checkbox 
                      checked={filterOptions.facilityTypes.clinic}
                      onChange={() => handleFilterChange('facilityTypes', 'clinic')}
                    />
                  }
                  label="Clínica"
                />
              </Grid>
              <Grid item xs={6}>
                <FormControlLabel
                  control={
                    <Checkbox 
                      checked={filterOptions.facilityTypes.basicUnit}
                      onChange={() => handleFilterChange('facilityTypes', 'basicUnit')}
                    />
                  }
                  label="UBS"
                />
              </Grid>
              <Grid item xs={6}>
                <FormControlLabel
                  control={
                    <Checkbox 
                      checked={filterOptions.facilityTypes.pharmacy}
                      onChange={() => handleFilterChange('facilityTypes', 'pharmacy')}
                    />
                  }
                  label="Farmácia"
                />
              </Grid>
            </Grid>
          </FormGroup>
        </Box>
        
        <Divider sx={{ my: 2 }} />
        
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
            Especialidade Médica
          </Typography>
          <Autocomplete
            options={specialties}
            value={filterOptions.specialty}
            onChange={(e, newValue) => handleFilterChange('specialty', newValue)}
            renderInput={(params) => (
              <TextField 
                {...params} 
                variant="outlined"
                placeholder="Selecione uma especialidade"
                InputProps={{
                  ...params.InputProps,
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon color="action" />
                    </InputAdornment>
                  )
                }}
                fullWidth
              />
            )}
            sx={{ mt: 1 }}
          />
        </Box>
        
        <Divider sx={{ my: 2 }} />
        
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
            Tempo Estimado de Espera
          </Typography>
          <Box sx={{ px: 1 }}>
            <Slider
              value={filterOptions.waitingTime}
              onChange={(e, value) => handleFilterChange('waitingTime', value)}
              step={1}
              min={1}
              max={5}
              marks={[
                { value: 1, label: 'Baixo' },
                { value: 3, label: 'Médio' },
                { value: 5, label: 'Alto' }
              ]}
              valueLabelDisplay="off"
            />
          </Box>
        </Box>
        
        <Divider sx={{ my: 2 }} />
        
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
            Avaliação Mínima
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
            <Rating
              value={filterOptions.rating}
              onChange={(e, value) => handleFilterChange('rating', value)}
              precision={1}
              size="large"
            />
            <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
              {filterOptions.rating > 0 ? `${filterOptions.rating}+ estrelas` : 'Qualquer avaliação'}
            </Typography>
          </Box>
        </Box>
        
        <Divider sx={{ my: 2 }} />
        
        <Box>
          <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
            Convênios Aceitos
          </Typography>
          <Autocomplete
            multiple
            options={insurances}
            value={filterOptions.insurances}
            onChange={(e, newValue) => handleFilterChange('insurances', newValue)}
            renderInput={(params) => (
              <TextField 
                {...params} 
                variant="outlined"
                placeholder="Selecione os convênios"
              />
            )}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip
                  label={option}
                  {...getTagProps({ index })}
                  key={option}
                  size="small"
                />
              ))
            }
            sx={{ mt: 1 }}
          />
        </Box>
      </DialogContent>
      
      <DialogActions sx={{ p: 2, justifyContent: 'space-between' }}>
        <Button 
          onClick={handleClearFilters} 
          variant="outlined"
          color="inherit"
          sx={{ borderRadius: 2 }}
        >
          Limpar Filtros
        </Button>
        <Button 
          onClick={onClose} 
          variant="contained"
          startIcon={<FilterIcon />}
          sx={{ borderRadius: 2 }}
        >
          Aplicar Filtros
        </Button>
      </DialogActions>
    </Dialog>
  );
};

// Modal de Avaliação
const RatingModal = ({ open, onClose }) => {
  const [ratingValues, setRatingValues] = useState({
    occupancy: 0,
    service: 0,
    cleanliness: 0,
    quality: 0
  });
  const [comment, setComment] = useState('');
  const facilityName = "Hospital Geral de Camaçari"; // Exemplo estático
  
  const handleRatingChange = (category, value) => {
    setRatingValues(prev => ({
      ...prev,
      [category]: value
    }));
  };
  
  const handleSendRating = () => {
    // Aqui enviaríamos a avaliação para o backend
    console.log('Enviando avaliação:', { ratingValues, comment });
    onClose();
  };
  
  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{ 
        sx: { 
          borderRadius: 4,
        } 
      }}
    >
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" fontWeight="bold">
          Avaliar {facilityName}
        </Typography>
        <IconButton onClick={onClose} edge="end">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      
      <DialogContent dividers sx={{ p: 3 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Sua avaliação ajuda outros usuários a encontrarem os melhores serviços de saúde.
          </Typography>
          
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box>
              <Typography variant="subtitle2" fontWeight="medium" gutterBottom>
                Lotação
              </Typography>
              <Rating
                name="occupancy"
                value={ratingValues.occupancy}
                onChange={(e, value) => handleRatingChange('occupancy', value)}
                precision={1}
                size="large"
              />
            </Box>
            
            <Box>
              <Typography variant="subtitle2" fontWeight="medium" gutterBottom>
                Atendimento
              </Typography>
              <Rating
                name="service"
                value={ratingValues.service}
                onChange={(e, value) => handleRatingChange('service', value)}
                precision={1}
                size="large"
              />
            </Box>
            
            <Box>
              <Typography variant="subtitle2" fontWeight="medium" gutterBottom>
                Limpeza
              </Typography>
              <Rating
                name="cleanliness"
                value={ratingValues.cleanliness}
                onChange={(e, value) => handleRatingChange('cleanliness', value)}
                precision={1}
                size="large"
              />
            </Box>
            
            <Box>
              <Typography variant="subtitle2" fontWeight="medium" gutterBottom>
                Qualidade
              </Typography>
              <Rating
                name="quality"
                value={ratingValues.quality}
                onChange={(e, value) => handleRatingChange('quality', value)}
                precision={1}
                size="large"
              />
            </Box>
          </Box>
        </Box>
        
        <Box>
          <Typography variant="subtitle2" fontWeight="medium" gutterBottom>
            Deixe seu comentário (opcional)
          </Typography>
          <TextField
            multiline
            rows={4}
            placeholder="Compartilhe sua experiência..."
            fullWidth
            variant="outlined"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            sx={{ 
              mt: 1, 
              '& .MuiOutlinedInput-root': { 
                borderRadius: 3 
              } 
            }}
          />
        </Box>
      </DialogContent>
      
      <DialogActions sx={{ p: 3 }}>
        <Button 
          onClick={onClose} 
          variant="text"
          color="inherit"
        >
          Cancelar
        </Button>
        <Button 
          onClick={handleSendRating} 
          variant="contained"
          startIcon={<StarIcon />}
          sx={{ borderRadius: 3 }}
        >
          Enviar Avaliação
        </Button>
      </DialogActions>
    </Dialog>
  );
};

// Tela de Consulta de Medicamentos
const MedicationScreen = ({ open, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const handleSearch = () => {
    if (!searchTerm.trim()) return;
    
    setLoading(true);
    
    // Simulando uma pesquisa
    setTimeout(() => {
      setSearchResults([
        {
          id: 1,
          name: "Farmácia Popular - Centro",
          hasStock: true,
          updatedAt: "12/08/2023",
          distance: "1.2 km",
          address: "Av. Principal, 123, Centro"
        },
        {
          id: 2,
          name: "UBS Vila Nova",
          hasStock: true,
          updatedAt: "10/08/2023",
          distance: "2.5 km",
          address: "Rua das Flores, 456, Vila Nova"
        },
        {
          id: 3,
          name: "Drogaria São Paulo",
          hasStock: false,
          updatedAt: "11/08/2023",
          distance: "0.8 km",
          address: "Av. Comercial, 789, Centro"
        }
      ]);
      setLoading(false);
    }, 1500);
  };
  
  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{ 
        sx: { 
          borderRadius: 4,
          height: '80vh',
          maxHeight: 600
        } 
      }}
    >
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton edge="start" onClick={onClose} sx={{ mr: 1 }}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" fontWeight="bold">
            Consulta de Medicamentos
          </Typography>
        </Box>
      </DialogTitle>
      
      <DialogContent sx={{ p: 2 }}>
        <Box sx={{ mb: 3 }}>
          <TextField
            fullWidth
            placeholder="Buscar nome do medicamento"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              endAdornment: searchTerm && (
                <InputAdornment position="end">
                  <IconButton size="small" onClick={() => setSearchTerm('')}>
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ),
              sx: { borderRadius: 3 }
            }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={handleSearch}
              disabled={!searchTerm.trim() || loading}
              sx={{ borderRadius: 2 }}
            >
              {loading ? <CircularProgress size={24} /> : 'Buscar'}
            </Button>
          </Box>
        </Box>
        
        {searchTerm && (
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="subtitle1" fontWeight="medium">
                Resultados para "{searchTerm}"
              </Typography>
              <Chip 
                label={`${searchResults.length} locais encontrados`} 
                size="small" 
                color="primary" 
              />
            </Box>
            
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
                <CircularProgress />
              </Box>
            ) : searchResults.length > 0 ? (
              <Box>
                {searchResults.map((result) => (
                  <Card 
                    key={result.id} 
                    variant="outlined"
                    sx={{ 
                      mb: 2, 
                      borderRadius: 3,
                      border: '1px solid rgba(0, 0, 0, 0.08)',
                      '&:hover': {
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                      }
                    }}
                  >
                    <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1, alignItems: 'flex-start' }}>
                        <Typography variant="subtitle1" fontWeight="medium">
                          {result.name}
                        </Typography>
                        <Chip 
                          icon={result.hasStock ? <CheckIcon fontSize="small" /> : <CloseIcon fontSize="small" />}
                          label={result.hasStock ? "Em estoque" : "Sem estoque"} 
                          color={result.hasStock ? "success" : "error"}
                          size="small"
                        />
                      </Box>
                      
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <LocationIcon fontSize="small" color="action" sx={{ mr: 0.5, fontSize: 16 }} />
                        <Typography variant="body2" color="text.secondary">
                          {result.address} ({result.distance})
                        </Typography>
                      </Box>
                      
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
                        <Typography variant="caption" color="text.secondary">
                          Info atualizada em {result.updatedAt}
                        </Typography>
                        <Button 
                          variant="outlined" 
                          size="small"
                          sx={{ borderRadius: 2 }}
                        >
                          Ver detalhes
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            ) : searchTerm && !loading && (
              <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center',
                minHeight: 200,
                backgroundColor: 'rgba(0,0,0,0.02)',
                borderRadius: 3,
                p: 3
              }}>
                <MedicationIcon sx={{ fontSize: 48, color: 'text.disabled', mb: 2 }} />
                <Typography variant="body1" color="text.secondary" textAlign="center">
                  Nenhum resultado encontrado para "{searchTerm}".
                </Typography>
                <Typography variant="body2" color="text.secondary" textAlign="center" sx={{ mt: 1 }}>
                  Verifique o nome do medicamento ou tente outro termo.
                </Typography>
              </Box>
            )}
          </Box>
        )}
        
        {!searchTerm && !loading && (
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center',
            minHeight: 300,
            backgroundColor: 'rgba(0,0,0,0.02)',
            borderRadius: 3,
            p: 3
          }}>
            <MedicationIcon sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
            <Typography variant="h6" color="text.secondary" textAlign="center">
              Busque por medicamentos
            </Typography>
            <Typography variant="body2" color="text.secondary" textAlign="center" sx={{ mt: 1, mb: 2 }}>
              Digite o nome do medicamento para verificar disponibilidade nas farmácias e UBS próximas.
            </Typography>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
};

// Tela de Telemedicina
const TelemedicineScreen = ({ open, onClose }) => {
  const telemedicineServices = [
    {
      id: 1,
      name: "Consulta Online",
      description: "Atendimento médico por vídeo-chamada com especialistas",
      icon: <TelemedicineIcon />,
      color: "#1E88E5"
    },
    {
      id: 2,
      name: "Orientação Médica",
      description: "Tire dúvidas rápidas com médicos de plantão",
      icon: <HelpIcon />,
      color: "#43A047"
    },
    {
      id: 3,
      name: "Telediagnóstico",
      description: "Envie exames para avaliação preliminar",
      icon: <TemperatureIcon />,
      color: "#E53935"
    },
    {
      id: 4,
      name: "Acompanhamento",
      description: "Monitoramento remoto de pacientes crônicos",
      icon: <AccessTimeIcon />,
      color: "#FB8C00"
    }
  ];
  
  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{ 
        sx: { 
          borderRadius: 4,
          height: '80vh',
          maxHeight: 600
        } 
      }}
    >
      <DialogTitle sx={{ pb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton edge="start" onClick={onClose} sx={{ mr: 1 }}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" fontWeight="bold">
            Telemedicina
          </Typography>
        </Box>
      </DialogTitle>
      
      <DialogContent sx={{ p: 2 }}>
        <Box sx={{ mb: 3 }}>
          <Typography variant="body1" paragraph>
            Tenha acesso a atendimento médico de qualidade sem sair de casa. Escolha o serviço de telemedicina mais adequado às suas necessidades.
          </Typography>
        </Box>
        
        <Grid container spacing={2}>
          {telemedicineServices.map((service) => (
            <Grid item xs={12} sm={6} key={service.id}>
              <Card 
                elevation={0}
                sx={{ 
                  borderRadius: 4,
                  border: '1px solid rgba(0, 0, 0, 0.08)',
                  height: '100%',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  '&:hover': {
                    transform: 'translateY(-3px)',
                    boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                  }
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box 
                    sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      width: 60, 
                      height: 60, 
                      borderRadius: 3,
                      mb: 2,
                      color: 'white',
                      bgcolor: service.color
                    }}
                  >
                    {service.icon}
                  </Box>
                  
                  <Typography variant="h6" fontWeight="medium" gutterBottom>
                    {service.name}
                  </Typography>
                  
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {service.description}
                  </Typography>
                  
                  <Button 
                    variant="outlined" 
                    color="primary"
                    fullWidth
                    sx={{ borderRadius: 2, mt: 'auto' }}
                  >
                    Agendar
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        
        <Box sx={{ mt: 3 }}>
          <Paper
            elevation={0}
            sx={{ 
              p: 2, 
              bgcolor: 'primary.lighter', 
              borderRadius: 3,
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <InfoIcon color="primary" sx={{ mr: 1 }} />
            <Typography variant="body2">
              Os serviços de telemedicina estão disponíveis 24h. Em caso de emergência, ligue para 192 (SAMU) ou procure o hospital mais próximo.
            </Typography>
          </Paper>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

// Tela de Histórico
const HistoryScreen = ({ open, onClose }) => {
  // eslint-disable-next-line no-unused-vars
  const [historyItems, setHistoryItems] = useState([
    {
      id: 1,
      name: "Hospital Geral de Camaçari",
      type: "hospital",
      address: "Av. Leste, 787, Centro",
      date: "10/08/2023, 15:30",
      action: "Visualizado"
    },
    {
      id: 2,
      name: "UBS Vila Nova",
      type: "ubs",
      address: "Rua das Flores, 456, Vila Nova",
      date: "08/08/2023, 09:15",
      action: "Visitado"
    },
    {
      id: 3,
      name: "Clínica São Lucas",
      type: "clinic",
      address: "Av. Comercial, 789, Centro",
      date: "05/08/2023, 14:40",
      action: "Visualizado"
    },
    {
      id: 4,
      name: "Farmácia Popular",
      type: "pharmacy",
      address: "Rua dos Lírios, 123, Jardim",
      date: "02/08/2023, 11:20",
      action: "Visitado"
    }
  ]);
  
  const getFacilityIcon = (type) => {
    switch (type) {
      case 'hospital':
        return <HospitalIcon sx={{ color: '#d32f2f' }} />;
      case 'ubs':
        return <LocalHospital sx={{ color: '#388e3c' }} />;
      case 'clinic':
        return <MedicalServices sx={{ color: '#1976d2' }} />;
      case 'pharmacy':
        return <PharmacyIcon sx={{ color: '#f57c00' }} />;
      default:
        return <LocationIcon />;
    }
  };
  
  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{ 
        sx: { 
          borderRadius: 4,
          height: '80vh',
          maxHeight: 600
        } 
      }}
    >
      <DialogTitle sx={{ pb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton edge="start" onClick={onClose} sx={{ mr: 1 }}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" fontWeight="bold">
            Meu Histórico
          </Typography>
        </Box>
      </DialogTitle>
      
      <DialogContent sx={{ p: 2 }}>
        {historyItems.length > 0 ? (
          <List sx={{ pt: 1 }}>
            {historyItems.map((item, index) => (
              <React.Fragment key={item.id}>
                {index > 0 && <Divider component="li" />}
                <ListItem 
                  sx={{ 
                    px: 2, 
                    py: 1.5,
                    borderRadius: 3,
                    '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' },
                    cursor: 'pointer'
                  }}
                >
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: 'background.paper', border: '1px solid rgba(0,0,0,0.08)' }}>
                      {getFacilityIcon(item.type)}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="subtitle1" fontWeight="medium">
                          {item.name}
                        </Typography>
                        <Chip 
                          label={item.action} 
                          size="small" 
                          color={item.action === "Visitado" ? "success" : "primary"}
                          sx={{ ml: 1, height: 20, fontSize: '0.7rem' }}
                        />
                      </Box>
                    }
                    secondary={
                      <>
                        <Typography component="span" variant="body2" color="text.primary">
                          {item.address}
                        </Typography>
                        <Typography component="div" variant="caption" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                          <EventIcon fontSize="small" sx={{ mr: 0.5, fontSize: 14 }} />
                          {item.date}
                        </Typography>
                      </>
                    }
                  />
                  <IconButton edge="end" size="small">
                    <ArrowForwardIcon fontSize="small" />
                  </IconButton>
                </ListItem>
              </React.Fragment>
            ))}
          </List>
        ) : (
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center',
            minHeight: 300,
            backgroundColor: 'rgba(0,0,0,0.02)',
            borderRadius: 3,
            p: 3
          }}>
            <HistoryIcon sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
            <Typography variant="h6" color="text.secondary" textAlign="center">
              Sem histórico
            </Typography>
            <Typography variant="body2" color="text.secondary" textAlign="center" sx={{ mt: 1 }}>
              Seu histórico de visualização e visitas aparecerá aqui.
            </Typography>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
};

// Componente principal - Tela "Mais"
const More = () => {
  const [openModal, setOpenModal] = useState(null);
  const [bottomNavValue, setBottomNavValue] = useState(3); // Valor 3 corresponde à aba "Mais"
  
  const navigate = useNavigate();
  
  const handleCloseModal = () => {
    setOpenModal(null);
  };
  
  const handleNavigate = (path) => {
    navigate(path);
  };
  
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
      <Box sx={{ 
        p: 2, 
        backgroundColor: 'white',
        borderBottom: '1px solid rgba(0, 0, 0, 0.05)'
      }}>
        <Typography variant="h6" fontWeight="bold" align="center">
          Mais Opções
        </Typography>
      </Box>

      {/* Conteúdo */}
      <Box sx={{ p: 2 }}>
        <Typography variant="subtitle1" fontWeight="medium" sx={{ mb: 2, pl: 1 }}>
          Ferramentas
        </Typography>
        
        <MenuOption 
          icon={<FilterIcon color="primary" />}
          title="Filtros avançados"
          description="Ajuste os filtros de busca para encontrar o que precisa"
          onClick={() => setOpenModal('filter')}
        />
        
        <MenuOption 
          icon={<StarIcon sx={{ color: '#FB8C00' }} />}
          title="Avaliar unidade"
          description="Compartilhe sua experiência com outros usuários"
          onClick={() => setOpenModal('rating')}
        />
        
        <MenuOption 
          icon={<MedicationIcon color="success" />}
          title="Consulta de medicamentos"
          description="Verifique a disponibilidade em farmácias próximas"
          onClick={() => setOpenModal('medication')}
          chip={{ label: "Novo", color: "success" }}
        />
        
        <MenuOption 
          icon={<TelemedicineIcon sx={{ color: '#1E88E5' }} />}
          title="Telemedicina"
          description="Consultas online com especialistas"
          onClick={() => setOpenModal('telemedicine')}
        />
        
        <MenuOption 
          icon={<HistoryIcon color="action" />}
          title="Histórico"
          description="Visualize seu histórico de visitas e buscas"
          onClick={() => setOpenModal('history')}
        />
        
        <Typography variant="subtitle1" fontWeight="medium" sx={{ mb: 2, mt: 4, pl: 1 }}>
          Configurações
        </Typography>
        
        <MenuOption 
          icon={<SettingsIcon color="action" />}
          title="Configurações"
          description="Ajustes da conta e preferências"
          onClick={() => navigate('/settings')}
        />
        
        <MenuOption 
          icon={<HelpIcon color="action" />}
          title="Ajuda"
          description="Suporte e perguntas frequentes"
          onClick={() => {}}
        />
        
        <MenuOption 
          icon={<InfoIcon color="action" />}
          title="Sobre o aplicativo"
          description="Informações sobre versão e termos de uso"
          onClick={() => {}}
        />
        
        <MenuOption 
          icon={<LogoutIcon sx={{ color: '#d32f2f' }} />}
          title="Sair"
          description="Desconecte-se do aplicativo"
          onClick={() => navigate('/login')}
        />
      </Box>
      
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
          onClick={() => handleNavigate('/home')}
        />
        <BottomNavigationAction 
          label="Comunidade" 
          icon={<ChatIcon />} 
          sx={{ minWidth: 'auto' }}
          onClick={() => handleNavigate('/community')}
        />
        <BottomNavigationAction 
          label="Favoritos" 
          icon={<FavoriteIcon />} 
          sx={{ minWidth: 'auto' }}
          onClick={() => handleNavigate('/favorites')}
        />
        <BottomNavigationAction 
          label="Mais" 
          icon={<MoreIcon />} 
          sx={{ minWidth: 'auto' }}
          onClick={() => handleNavigate('/more')}
        />
      </BottomNavigation>
      
      {/* Modais/Telas */}
      <FilterModal 
        open={openModal === 'filter'} 
        onClose={handleCloseModal} 
      />
      
      <RatingModal 
        open={openModal === 'rating'} 
        onClose={handleCloseModal} 
      />
      
      <MedicationScreen 
        open={openModal === 'medication'} 
        onClose={handleCloseModal} 
      />
      
      <TelemedicineScreen 
        open={openModal === 'telemedicine'} 
        onClose={handleCloseModal} 
      />
      
      <HistoryScreen 
        open={openModal === 'history'} 
        onClose={handleCloseModal} 
      />
    </Box>
  );
};

export default More;
