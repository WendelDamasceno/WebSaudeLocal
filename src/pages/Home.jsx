import React, { useState } from 'react';
import { Container, Typography, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import MapComponent from '../components/Map';

const Home = () => {
  const [facilityType, setFacilityType] = useState('hospital');
  
  const handleFacilityTypeChange = (event) => {
    setFacilityType(event.target.value);
  };
  
  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" gutterBottom sx={{ mt: 3 }}>
        Encontre serviços de saúde próximos
      </Typography>
      
      <Box sx={{ mb: 2 }}>
        <FormControl fullWidth>
          <InputLabel id="facility-type-label">Tipo de serviço</InputLabel>
          <Select
            labelId="facility-type-label"
            id="facility-type"
            value={facilityType}
            label="Tipo de serviço"
            onChange={handleFacilityTypeChange}
          >
            <MenuItem value="hospital">Hospitais</MenuItem>
            <MenuItem value="pharmacy">Farmácias</MenuItem>
            <MenuItem value="doctors">Consultórios médicos</MenuItem>
            <MenuItem value="clinic">Clínicas</MenuItem>
          </Select>
        </FormControl>
      </Box>
      
      <Box sx={{ height: '500px', mb: 4 }}>
        <MapComponent 
          height={500} 
          amenityType={facilityType} 
          searchRadius={5000} 
        />
      </Box>
    </Container>
  );
};

export default Home;
