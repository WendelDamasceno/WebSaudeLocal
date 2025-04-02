import React from 'react';
import { Typography, Box, TextField, Button, Chip } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { SearchBar } from './StyledComponents';

const ConsultationTab = ({ 
  searchTerm, 
  setSearchTerm, 
  selectedSpecialty, 
  setSelectedSpecialty, 
  specialties, 
  handleSearch 
}) => {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Agendamento de Consultas
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        Encontre o especialista ideal para sua consulta em Camaçari. Escolha entre diversas especialidades médicas e agende sua consulta de forma rápida e prática.
      </Typography>
      
      <SearchBar>
        <TextField
          fullWidth
          label="Buscar especialidade médica"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ mr: 1 }}
          placeholder="Digite a especialidade desejada (ex: Cardiologia, Dermatologia...)"
        />
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleSearch}
          startIcon={<SearchIcon />}
          size="large"
        >
          Buscar
        </Button>
      </SearchBar>
      
      <Box sx={{ mb: 4 }}>
        <Typography variant="subtitle1" gutterBottom>
          Especialidades populares:
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
          {specialties.slice(0, 8).map((specialty) => (
            <Chip 
              key={specialty.id} 
              label={specialty.name}
              onClick={() => {
                setSelectedSpecialty(specialty.name);
                setSearchTerm(specialty.name);
              }}
              color={selectedSpecialty === specialty.name ? "primary" : "default"}
              sx={{ mb: 1, px: 1 }}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default ConsultationTab;
