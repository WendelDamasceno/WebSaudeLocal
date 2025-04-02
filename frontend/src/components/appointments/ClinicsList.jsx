import React from 'react';
import { 
  Typography, Box, Grid, CardContent, CardHeader, 
  Button, Rating
} from '@mui/material';
import { AppointmentCard } from './StyledComponents';

const ClinicsList = ({ 
  clinics, 
  tabValue, 
  selectedSpecialty, 
  selectedExam, 
  searchTerm, 
  healthPlan,
  handleClinicSelect 
}) => {
  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        {tabValue === 0 
          ? `Clínicas com ${selectedSpecialty || searchTerm} em Camaçari, BA` 
          : `Clínicas que realizam ${selectedExam || searchTerm} em Camaçari, BA`}
      </Typography>
      
      <Grid container spacing={3}>
        {clinics.map((clinic) => (
          <Grid item xs={12} key={clinic.id}>
            <AppointmentCard>
              <CardHeader
                title={clinic.name}
                subheader={`${clinic.address}, ${clinic.district} - Camaçari, BA`}
              />
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={8}>
                    <Typography variant="body2" color="text.secondary">
                      {clinic.description}
                    </Typography>
                    <Box sx={{ mt: 1 }}>
                      <Typography variant="body2">
                        <strong>Telefone:</strong> {clinic.phone}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Horário:</strong> {clinic.workingHours}
                      </Typography>
                      {tabValue === 1 && (
                        <Typography variant="body2">
                          <strong>Aceita {healthPlan || 'atendimento particular'}</strong>
                        </Typography>
                      )}
                    </Box>
                    {clinic.rating && (
                      <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                        <Rating value={clinic.rating} readOnly precision={0.5} />
                        <Typography variant="body2" sx={{ ml: 1 }}>
                          ({clinic.reviewCount} avaliações)
                        </Typography>
                      </Box>
                    )}
                  </Grid>
                  <Grid item xs={12} md={4} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                    <Button 
                      variant="contained" 
                      color="primary"
                      onClick={() => handleClinicSelect(clinic)}
                    >
                      {tabValue === 0 ? 'Ver médicos' : 'Ver horários disponíveis'}
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </AppointmentCard>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ClinicsList;
