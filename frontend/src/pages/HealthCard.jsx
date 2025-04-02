import React from 'react';
import { Container, Paper, Typography, Grid, Box, Chip } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import { QRCodeSVG } from 'qrcode.react';

const HealthCard = () => {
  const { user } = useAuth();
  const healthInfo = {
    bloodType: 'A+',
    allergies: ['Penicilina', 'Látex'],
    conditions: ['Hipertensão'],
    emergencyContact: '+55 11 98765-4321'
  };

  return (
    <Container maxWidth="md">
      <Paper sx={{ p: 3, mt: 3, background: 'linear-gradient(135deg, #1976d2, #64b5f6)' }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Typography variant="h5" sx={{ color: 'white', mb: 2 }}>
              Cartão Digital de Saúde
            </Typography>
            <Box sx={{ color: 'white' }}>
              <Typography variant="body1">Nome: {user?.name}</Typography>
              <Typography variant="body1">CPF: {user?.cpf}</Typography>
              <Typography variant="body1">Tipo Sanguíneo: {healthInfo.bloodType}</Typography>
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2">Alergias:</Typography>
                {healthInfo.allergies.map((allergy, index) => (
                  <Chip 
                    key={index}
                    label={allergy}
                    size="small"
                    sx={{ mr: 1, mt: 1, bgcolor: 'rgba(255,255,255,0.9)' }}
                  />
                ))}
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <QRCodeSVG value={`healthapp://user/${user?.id}`} size={128} level="H" />
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default HealthCard;
