import React from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Avatar,
  Chip
} from '@mui/material';
import {
  Videocam as VideocamIcon,
  Message as MessageIcon,
  Schedule as ScheduleIcon
} from '@mui/icons-material';

const Telemedicine = () => {
  return (
    <Container maxWidth="lg">
      <Typography variant="h5" gutterBottom>Teleconsultas</Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Próxima Consulta
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ width: 56, height: 56, mr: 2 }}>DS</Avatar>
                <Box>
                  <Typography variant="subtitle1">Dra. Sarah Costa</Typography>
                  <Typography color="textSecondary">Clínico Geral</Typography>
                  <Chip 
                    icon={<ScheduleIcon />} 
                    label="Hoje, 15:30" 
                    size="small" 
                    color="primary"
                  />
                </Box>
              </Box>
              <Button
                variant="contained"
                startIcon={<VideocamIcon />}
                fullWidth
              >
                Iniciar Consulta
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Mensagens</Typography>
              <Button
                variant="outlined"
                startIcon={<MessageIcon />}
                fullWidth
              >
                Ver conversas
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Telemedicine;
