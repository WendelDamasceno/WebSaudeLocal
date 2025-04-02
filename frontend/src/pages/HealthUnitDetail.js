import React from 'react';
import { useParams } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent,
  Grid,
  Rating,
  Chip,
  Button
} from '@mui/material';
import {
  AccessTime as AccessTimeIcon,
  Phone as PhoneIcon,
  Place as PlaceIcon
} from '@mui/icons-material';

const HealthUnitDetail = () => {
  const { id } = useParams();

  // Dados de exemplo
  const unit = {
    name: 'Hospital São Lucas',
    type: 'Hospital',
    rating: 4.5,
    address: 'Av. Paulista, 1578, São Paulo - SP',
    phone: '(11) 3333-4444',
    waitTime: 'Médio (30-60 min)',
    isOpen: true
  };

  return (
    <Box>
      <Card>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            {unit.name}
          </Typography>
          
          <Chip 
            label={unit.type} 
            color="primary" 
            size="small" 
            sx={{ mb: 2 }} 
          />
          
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <PlaceIcon sx={{ mr: 1 }} />
                <Typography>{unit.address}</Typography>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <PhoneIcon sx={{ mr: 1 }} />
                <Typography>{unit.phone}</Typography>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <AccessTimeIcon sx={{ mr: 1 }} />
                <Typography>{unit.waitTime}</Typography>
              </Box>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <Box sx={{ textAlign: 'right' }}>
                <Rating value={unit.rating} readOnly precision={0.5} />
                <Typography variant="body2" sx={{ mt: 1 }}>
                  {unit.isOpen ? 'Aberto agora' : 'Fechado'}
                </Typography>
              </Box>
            </Grid>
          </Grid>
          
          <Box sx={{ mt: 3 }}>
            <Button 
              variant="contained" 
              color="primary" 
              fullWidth
            >
              Ver no Mapa
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default HealthUnitDetail;
