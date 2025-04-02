import React, { useState, useEffect } from 'react';
import { 
  Box, Container, TextField, IconButton, Paper, 
  Typography, List, ListItem, ListItemText, ListItemAvatar,
  Avatar, Chip, Rating, Divider, useTheme, Tab, Tabs
} from '@mui/material';
import {
  Search as SearchIcon,
  LocalHospital as HospitalIcon,
  Tune as FilterIcon,
  LocationOn as LocationIcon,
  AccessTime as TimeIcon
} from '@mui/icons-material';
import SearchFilters from '../components/SearchFilters';
import EmergencyButton from '../components/EmergencyButton';

const Search = () => {
  const theme = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    types: [],
    waitTime: 60,
    rating: 3.5
  });
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Buscar resultados quando os filtros mudarem
    handleSearch();
  }, [filters, activeTab]);

  const handleSearch = async () => {
    setLoading(true);
    try {
      // Simulando uma chamada à API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Dados mockados
      const mockResults = [
        {
          id: 1,
          name: 'Hospital Geral de Camaçari',
          type: 'Hospital',
          distance: '1.2 km',
          waitTime: '30 min',
          rating: 4.5,
          reviews: 234,
          address: 'Av. Principal, 123',
          acceptsInsurance: true,
          isPublic: true
        },
        {
          id: 2,
          name: 'UPA 24h',
          type: 'Emergência',
          distance: '2.5 km',
          waitTime: '45 min',
          rating: 4.0,
          reviews: 156,
          address: 'Rua Secundária, 456',
          acceptsInsurance: false,
          isPublic: true
        }
      ];

      setResults(mockResults);
    } catch (error) {
      console.error('Erro ao buscar resultados:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ pb: 8 }}>
      {/* Header com busca */}
      <Paper 
        elevation={0}
        sx={{ 
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
          color: 'white',
          pt: 2,
          pb: 3
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <TextField
              fullWidth
              placeholder="Buscar estabelecimentos de saúde..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              sx={{
                backgroundColor: 'rgba(255,255,255,0.1)',
                borderRadius: 2,
                '& .MuiOutlinedInput-root': {
                  color: 'white',
                  '& fieldset': { border: 'none' }
                },
                '& .MuiInputBase-input::placeholder': {
                  color: 'rgba(255,255,255,0.7)'
                }
              }}
              InputProps={{
                startAdornment: <SearchIcon sx={{ color: 'white', mr: 1 }} />,
                endAdornment: (
                  <IconButton onClick={() => setShowFilters(true)} sx={{ color: 'white' }}>
                    <FilterIcon />
                  </IconButton>
                )
              }}
            />
          </Box>

          <Tabs 
            value={activeTab}
            onChange={(e, v) => setActiveTab(v)}
            sx={{ 
              '& .MuiTab-root': { 
                color: 'rgba(255,255,255,0.7)',
                '&.Mui-selected': { color: 'white' }
              }
            }}
          >
            <Tab label="Todos" />
            <Tab label="Hospitais" />
            <Tab label="Clínicas" />
            <Tab label="UBS" />
          </Tabs>
        </Container>
      </Paper>

      {/* Resultados */}
      <Container maxWidth="lg" sx={{ mt: 2 }}>
        <List>
          {results.map((result, index) => (
            <React.Fragment key={result.id}>
              {index > 0 && <Divider />}
              <ListItem 
                sx={{ 
                  py: 2,
                  cursor: 'pointer',
                  '&:hover': { bgcolor: 'action.hover' }
                }}
              >
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: result.isPublic ? 'primary.main' : 'secondary.main' }}>
                    <HospitalIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                      <Typography variant="subtitle1" component="span" fontWeight={500}>
                        {result.name}
                      </Typography>
                      {result.isPublic && (
                        <Chip 
                          label="SUS" 
                          size="small" 
                          color="primary" 
                          sx={{ height: 20 }}
                        />
                      )}
                      {result.acceptsInsurance && (
                        <Chip 
                          label="Convênio" 
                          size="small" 
                          variant="outlined" 
                          sx={{ height: 20 }}
                        />
                      )}
                    </Box>
                  }
                  secondary={
                    <Box sx={{ mt: 1 }}>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        {result.address}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <LocationIcon sx={{ fontSize: 16, mr: 0.5, color: 'primary.main' }} />
                          <Typography variant="body2">{result.distance}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <TimeIcon sx={{ fontSize: 16, mr: 0.5, color: 'primary.main' }} />
                          <Typography variant="body2">{result.waitTime}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Rating value={result.rating} size="small" readOnly />
                          <Typography variant="body2" sx={{ ml: 0.5 }}>
                            ({result.reviews})
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  }
                />
              </ListItem>
            </React.Fragment>
          ))}
        </List>
      </Container>

      {/* Filtros */}
      <SearchFilters 
        open={showFilters}
        onClose={() => setShowFilters(false)}
        filters={filters}
        onChange={setFilters}
      />

      <EmergencyButton />
    </Box>
  );
};

export default Search;
