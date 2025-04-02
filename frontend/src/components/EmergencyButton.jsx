import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Grid,
  Box,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  CircularProgress
} from '@mui/material';
import {
  LocalHospital as HospitalIcon,
  Phone as PhoneIcon,
  Close as CloseIcon,
  LocationOn as LocationIcon
} from '@mui/icons-material';

// Componente para exibir um serviço de emergência com botão de ligação
const EmergencyService = ({ number, service, color = 'error', onClick }) => (
  <Grid item xs={6}>
    <Button
      variant="contained"
      color={color}
      fullWidth
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: 120,
        borderRadius: 3,
        textTransform: 'none',
        p: 2
      }}
      onClick={onClick}
    >
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        {number}
      </Typography>
      <Typography variant="subtitle1">{service}</Typography>
    </Button>
  </Grid>
);

// Componente principal do botão de emergência
const EmergencyButton = ({ open, onClose }) => {
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [nearbyHospitals, setNearbyHospitals] = useState([]);
  const [loading, setLoading] = useState(false);

  // Simula a busca de hospitais próximos
  const fetchNearbyHospitals = () => {
    setLoading(true);
    // Simulação de dados - em um caso real, usar API real
    setTimeout(() => {
      setNearbyHospitals([
        {
          id: 1,
          name: 'Hospital São Lucas',
          distance: '1.2 km',
          address: 'Av. Principal, 123',
          phone: '(11) 3333-4444'
        },
        {
          id: 2,
          name: 'Hospital Santa Maria',
          distance: '2.5 km',
          address: 'Rua das Flores, 789',
          phone: '(11) 5555-6666'
        },
        {
          id: 3,
          name: 'Pronto Socorro Municipal',
          distance: '3.1 km',
          address: 'Av. Central, 456',
          phone: '(11) 7777-8888'
        }
      ]);
      setLoading(false);
    }, 1000);
  };

  // Ao abrir o diálogo, buscar hospitais próximos
  React.useEffect(() => {
    if (open) {
      fetchNearbyHospitals();
    }
  }, [open]);

  const handleCallService = (service, number) => {
    setSelectedService({ service, number });
    setConfirmDialogOpen(true);
  };

  const handleConfirmCall = () => {
    if (selectedService) {
      window.location.href = `tel:${selectedService.number}`;
    }
    setConfirmDialogOpen(false);
    onClose();
  };

  const handleCancelCall = () => {
    setConfirmDialogOpen(false);
  };

  return (
    <>
      <Dialog 
        open={open} 
        onClose={onClose} 
        maxWidth="sm" 
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            py: 2
          }
        }}
      >
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" fontWeight="bold" color="error.main">Emergência</Typography>
          <IconButton edge="end" color="inherit" onClick={onClose} aria-label="close">
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        
        <DialogContent>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Em caso de emergência, ligue imediatamente para o número apropriado:
          </Typography>
          
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <EmergencyService
              number="192"
              service="SAMU"
              onClick={() => handleCallService('SAMU', '192')}
            />
            <EmergencyService
              number="193"
              service="Bombeiros"
              onClick={() => handleCallService('Bombeiros', '193')}
            />
            <EmergencyService
              number="190"
              service="Polícia"
              color="primary"
              onClick={() => handleCallService('Polícia', '190')}
            />
            <EmergencyService
              number="199"
              service="Defesa Civil"
              color="primary"
              onClick={() => handleCallService('Defesa Civil', '199')}
            />
          </Grid>
          
          <Divider sx={{ my: 2 }} />
          
          <Typography variant="h6" fontWeight="medium" sx={{ mb: 1 }}>
            Hospitais de emergência próximos
          </Typography>
          
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 3 }}>
              <CircularProgress />
            </Box>
          ) : (
            <List>
              {nearbyHospitals.map((hospital) => (
                <ListItem
                  key={hospital.id}
                  secondaryAction={
                    <IconButton 
                      edge="end" 
                      color="primary"
                      onClick={() => handleCallService(hospital.name, hospital.phone.replace(/[^0-9]/g, ''))}
                    >
                      <PhoneIcon />
                    </IconButton>
                  }
                  sx={{ 
                    borderRadius: 2,
                    mb: 1,
                    '&:hover': { backgroundColor: 'rgba(0,0,0,0.04)' }
                  }}
                >
                  <ListItemIcon>
                    <HospitalIcon color="error" />
                  </ListItemIcon>
                  <ListItemText
                    primary={hospital.name}
                    secondary={
                      <React.Fragment>
                        <Typography component="span" variant="body2" color="text.primary">
                          {hospital.distance}
                        </Typography>
                        {" — "}{hospital.address}
                      </React.Fragment>
                    }
                  />
                </ListItem>
              ))}
            </List>
          )}
        </DialogContent>
      </Dialog>

      {/* Diálogo de confirmação para ligação */}
      <Dialog
        open={confirmDialogOpen}
        onClose={handleCancelCall}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            py: 1
          }
        }}
      >
        <DialogTitle>
          <Typography variant="h6">Confirmar ligação</Typography>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Você está prestes a ligar para {selectedService?.service} ({selectedService?.number}).
            Deseja continuar?
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={handleCancelCall} variant="outlined" color="inherit">
            Cancelar
          </Button>
          <Button 
            onClick={handleConfirmCall} 
            variant="contained" 
            color="error" 
            startIcon={<PhoneIcon />}
            autoFocus
          >
            Ligar agora
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EmergencyButton;
