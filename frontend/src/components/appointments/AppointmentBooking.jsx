import React from 'react';
import { 
  Box, Typography, Grid, Button, 
  Card, CardContent, CardActionArea, CardMedia
} from '@mui/material';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import BiotechIcon from '@mui/icons-material/Biotech';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';

const AppointmentBooking = ({ handleBookNew }) => {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Agendar Consulta ou Exame
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        Escolha o tipo de agendamento que você deseja realizar:
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* Consultation Card */}
        <Grid item xs={12} sm={6}>
          <Card 
            sx={{ 
              height: '100%',
              boxShadow: 3,
              '&:hover': { transform: 'translateY(-5px)', boxShadow: 5 },
              transition: 'transform 0.3s, box-shadow 0.3s',
              borderRadius: 2
            }}
          >
            <CardActionArea 
              sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}
              onClick={() => handleBookNew('consultation')}
            >
              <CardMedia
                component="div"
                sx={{
                  height: 140,
                  bgcolor: '#1976d2',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <LocalHospitalIcon sx={{ fontSize: 60, color: 'white' }} />
              </CardMedia>
              <CardContent sx={{ flexGrow: 1, p: 3 }}>
                <Typography variant="h5" component="h2" gutterBottom>
                  Consulta Médica
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                  Agende uma consulta com especialistas em diversas áreas médicas.
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body2" gutterBottom>
                    <HealthAndSafetyIcon fontSize="small" sx={{ mr: 1, verticalAlign: 'middle', color: '#1976d2' }} />
                    <strong>Especialidades disponíveis:</strong> Cardiologia, Dermatologia, Ginecologia e mais
                  </Typography>
                  <Typography variant="body2">
                    <MedicalServicesIcon fontSize="small" sx={{ mr: 1, verticalAlign: 'middle', color: '#1976d2' }} />
                    <strong>Atendimento:</strong> Presencial em Camaçari, BA
                  </Typography>
                </Box>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>

        {/* Exam Card */}
        <Grid item xs={12} sm={6}>
          <Card 
            sx={{ 
              height: '100%',
              boxShadow: 3,
              '&:hover': { transform: 'translateY(-5px)', boxShadow: 5 },
              transition: 'transform 0.3s, box-shadow 0.3s',
              borderRadius: 2
            }}
          >
            <CardActionArea 
              sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}
              onClick={() => handleBookNew('exam')}
            >
              <CardMedia
                component="div"
                sx={{
                  height: 140,
                  bgcolor: '#4caf50',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <BiotechIcon sx={{ fontSize: 60, color: 'white' }} />
              </CardMedia>
              <CardContent sx={{ flexGrow: 1, p: 3 }}>
                <Typography variant="h5" component="h2" gutterBottom>
                  Exames Médicos
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                  Agende exames laboratoriais e de imagem em clínicas conveniadas.
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body2" gutterBottom>
                    <HealthAndSafetyIcon fontSize="small" sx={{ mr: 1, verticalAlign: 'middle', color: '#4caf50' }} />
                    <strong>Exames disponíveis:</strong> Hemograma, Raio-X, Ultrassonografia e mais
                  </Typography>
                  <Typography variant="body2">
                    <MedicalServicesIcon fontSize="small" sx={{ mr: 1, verticalAlign: 'middle', color: '#4caf50' }} />
                    <strong>Cobertura:</strong> Planos de saúde e particular
                  </Typography>
                </Box>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>

      <Typography variant="body2" align="center" sx={{ mt: 4, color: 'text.secondary' }}>
        Não encontrou o que procura? Entre em contato com nosso suporte.
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <Button variant="outlined" color="primary">
          Suporte ao Cliente
        </Button>
      </Box>
    </Box>
  );
};

export default AppointmentBooking;
