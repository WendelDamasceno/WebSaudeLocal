import React, { useState, useEffect } from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  Chip,
  Divider,
  Rating,
  TextField,
  InputAdornment,
  CircularProgress,
  Skeleton,
  Badge
} from '@mui/material';
import {
  Search as SearchIcon,
  LocationOn as LocationIcon,
  AccessTime as TimeIcon,
  LocalHospital as HospitalIcon,
  Star as StarIcon
} from '@mui/icons-material';

const SelectLocation = ({ type, specialty, onSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [locations, setLocations] = useState([]);
  const [filteredLocations, setFilteredLocations] = useState([]);

  useEffect(() => {
    const fetchLocations = async () => {
      setLoading(true);
      try {
        // Simular chamada à API
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Dados mockados
        const mockLocations = [
          {
            id: 1,
            name: 'Hospital Geral de Camaçari',
            type: 'Hospital',
            address: 'Av. Principal, 123 - Centro',
            distance: '1.2 km',
            rating: 4.5,
            reviews: 234,
            waitTime: '30 min',
            doctor: type === 'consulta' ? 'Dr. João Silva' : null,
            acceptsInsurance: true,
            isPublic: true,
            price: type === 'exame' ? 'R$ 150,00' : null,
            available: true
          },
          {
            id: 2,
            name: 'Clínica São Lucas',
            type: 'Clínica',
            address: 'Rua Secundária, 456 - Centro',
            distance: '2.5 km',
            rating: 4.8,
            reviews: 156,
            waitTime: '15 min',
            doctor: type === 'consulta' ? 'Dra. Maria Santos' : null,
            acceptsInsurance: true,
            isPublic: false,
            price: type === 'exame' ? 'R$ 180,00' : null,
            available: false
          }
        ];

        setLocations(mockLocations);
        setFilteredLocations(mockLocations);
      } catch (error) {
        console.error('Erro ao carregar locais:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, [type]);

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    
    const filtered = locations.filter(location =>
      location.name.toLowerCase().includes(term) ||
      location.address.toLowerCase().includes(term)
    );
    
    setFilteredLocations(filtered);
  };

  if (loading) {
    return (
      <Box sx={{ p: 2 }}>
        <Skeleton variant="text" sx={{ mb: 2 }} />
        <Skeleton variant="rectangular" height={56} sx={{ mb: 2 }} />
        {[1, 2, 3].map((item) => (
          <React.Fragment key={item}>
            <Skeleton variant="rectangular" height={100} sx={{ mb: 2 }} />
          </React.Fragment>
        ))}
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ p: 2, bgcolor: 'background.paper' }}>
        <Typography variant="h6" gutterBottom>
          {type === 'consulta' 
            ? `Clínicas disponíveis para ${specialty?.name}`
            : 'Locais que realizam este exame'
          }
        </Typography>

        <TextField
          fullWidth
          placeholder="Buscar por nome ou endereço..."
          value={searchTerm}
          onChange={handleSearch}
          sx={{ mb: 2 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            )
          }}
        />

        <List sx={{ bgcolor: 'background.paper' }}>
          {filteredLocations.map((location, index) => (
            <React.Fragment key={location.id}>
              {index > 0 && <Divider />}
              <ListItem 
                button
                onClick={() => onSelect(location)}
                sx={{ 
                  flexDirection: 'column', 
                  alignItems: 'flex-start',
                  py: 2
                }}
              >
                <Box sx={{ 
                  width: '100%',
                  display: 'flex',
                  alignItems: 'flex-start',
                  mb: 1
                }}>
                  <ListItemAvatar>
                    <Box sx={{ position: 'relative' }}>
                      <Badge 
                        color={location.available ? "success" : "error"}
                        badgeContent={location.available ? "Disponível" : "Lotado"}
                        sx={{ 
                          '& .MuiBadge-badge': {
                            fontSize: '0.8rem',
                            height: '22px',
                            minWidth: '70px'
                          }
                        }}
                      >
                        <Avatar 
                          sx={{ 
                            bgcolor: location.isPublic ? 'primary.main' : 'secondary.main'
                          }}
                        >
                          <HospitalIcon />
                        </Avatar>
                      </Badge>
                    </Box>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                        <Typography variant="subtitle1" component="span">
                          {location.name}
                        </Typography>
                        {location.isPublic && (
                          <Chip 
                            label="SUS" 
                            size="small"
                            color="primary"
                            sx={{ height: 20 }}
                          />
                        )}
                        {location.acceptsInsurance && (
                          <Chip 
                            label="Convênio"
                            size="small"
                            variant="outlined"
                            sx={{ height: 20 }}
                          />
                        )}
                      </Box>
                    }
                    secondary={location.address}
                  />
                </Box>

                <Box sx={{ 
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  pl: 7
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <LocationIcon 
                        fontSize="small" 
                        sx={{ mr: 0.5, color: 'primary.main' }}
                      />
                      <Typography variant="body2">
                        {location.distance}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <TimeIcon 
                        fontSize="small" 
                        sx={{ mr: 0.5, color: 'primary.main' }}
                      />
                      <Typography variant="body2">
                        {location.waitTime}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Rating 
                        value={location.rating} 
                        size="small" 
                        readOnly 
                        sx={{ mr: 0.5 }}
                      />
                      <Typography variant="body2">
                        ({location.reviews})
                      </Typography>
                    </Box>
                  </Box>
                  {location.price && (
                    <Typography 
                      variant="body1" 
                      color="primary.main"
                      fontWeight="medium"
                    >
                      {location.price}
                    </Typography>
                  )}
                </Box>
              </ListItem>
            </React.Fragment>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default SelectLocation;
