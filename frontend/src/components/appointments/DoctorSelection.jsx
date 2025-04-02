import React from 'react';
import { Typography, Box, Grid, Card, CardContent, Rating } from '@mui/material';

const DoctorSelection = ({ doctors, selectedDoctor, handleDoctorSelect }) => {
  return (
    <Box>
      <Typography variant="subtitle1" gutterBottom>
        Médicos disponíveis
      </Typography>
      
      <Grid container spacing={2}>
        {doctors.map((doctor) => (
          <Grid item xs={12} md={6} key={doctor.id}>
            <Card 
              sx={{ 
                cursor: 'pointer',
                border: selectedDoctor?.id === doctor.id ? '2px solid #1976d2' : 'none'
              }}
              onClick={() => handleDoctorSelect(doctor)}
            >
              <CardContent>
                <Typography variant="h6">
                  Dr(a). {doctor.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {doctor.specialty}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                  <Rating value={doctor.rating} readOnly precision={0.5} />
                  <Typography variant="body2" sx={{ ml: 1 }}>
                    ({doctor.reviewCount} avaliações)
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default DoctorSelection;
