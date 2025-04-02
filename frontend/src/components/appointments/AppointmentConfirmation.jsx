import React from 'react';
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  Divider,
  LinearProgress
} from '@mui/material';
import {
  EventNote as EventIcon,
  LocationOn as LocationIcon,
  AccessTime as TimeIcon,
  LocalHospital as HospitalIcon,
  Person as PersonIcon,
  CheckCircle as CheckIcon
} from '@mui/icons-material';

const AppointmentConfirmation = ({ data, onConfirm, onCancel }) => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleConfirmClick = async () => {
    setIsSubmitting(true);
    try {
      await onConfirm();
      setIsSuccess(true);
    } catch (error) {
      console.error('Erro ao confirmar:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <Box sx={{ 
        p: 4, 
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2 
      }}>
        <CheckIcon sx={{ fontSize: 64, color: 'appointment.success' }} />
        <Typography variant="h5">Agendamento Confirmado!</Typography>
        <Typography color="text.secondary">
          Você receberá um e-mail com os detalhes do agendamento.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Confirme seu agendamento
      </Typography>

      <Paper variant="outlined" sx={{ p: 2, mb: 3 }}>
        <List disablePadding>
          <ListItem>
            <ListItemIcon>
              <EventIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary="Tipo"
              secondary={data.type === 'consulta' ? 'Consulta médica' : 'Exame'}
            />
          </ListItem>
          
          <Divider component="li" />
          
          <ListItem>
            <ListItemIcon>
              <HospitalIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary={data.type === 'consulta' ? 'Especialidade' : 'Exame'}
              secondary={data.specialty || data.examName}
            />
          </ListItem>
          
          <Divider component="li" />
          
          <ListItem>
            <ListItemIcon>
              <LocationIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary="Local"
              secondary={data.location}
            />
          </ListItem>
          
          <Divider component="li" />
          
          <ListItem>
            <ListItemIcon>
              <TimeIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary="Data e Horário"
              secondary={`${formatDate(data.date)} às ${data.time}`}
            />
          </ListItem>
          
          {data.doctor && (
            <>
              <Divider component="li" />
              <ListItem>
                <ListItemIcon>
                  <PersonIcon color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary="Médico"
                  secondary={data.doctor}
                />
              </ListItem>
            </>
          )}
        </List>
      </Paper>

      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
        <Button 
          onClick={onCancel} 
          color="inherit"
          disabled={isSubmitting}
        >
          Cancelar
        </Button>
        <Button 
          variant="contained" 
          color="primary"
          onClick={handleConfirmClick}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Confirmando...' : 'Confirmar Agendamento'}
        </Button>
      </Box>

      {isSubmitting && (
        <LinearProgress sx={{ mt: 2 }} />
      )}

      <Box sx={{ mt: 2, p: 2, bgcolor: 'info.light', borderRadius: 1 }}>
        <Typography variant="subtitle2" color="info.main">
          Lembre-se:
        </Typography>
        <Typography variant="body2">
          • Chegue 15 minutos antes do horário agendado
          • Traga um documento com foto
          {data.type === 'exame' && '• Siga as orientações de preparo enviadas por email'}
        </Typography>
      </Box>
    </Box>
  );
};

export default AppointmentConfirmation;
