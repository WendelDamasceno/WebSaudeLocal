import React, { useState } from 'react';
import { 
  Box, Typography, Button, Alert,
  Dialog, DialogTitle, DialogContent, DialogActions
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import AppointmentCard from './AppointmentCard';

const UpcomingAppointments = ({ appointments, handleBookNew }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  
  // Handle appointment actions
  const handleReschedule = (id) => {
    console.log('Reschedule appointment:', id);
    // Implement rescheduling logic
  };
  
  const handleCancel = (id) => {
    console.log('Cancel appointment:', id);
    const appointment = appointments.find(apt => apt.id === id);
    setSelectedAppointment(appointment);
    setDialogOpen(true);
  };
  
  const handleViewDetails = (id) => {
    console.log('View details for appointment:', id);
    // Implement view details logic
  };
  
  const confirmCancel = () => {
    console.log('Confirmed cancellation for:', selectedAppointment.id);
    // Implement actual cancellation logic here
    setDialogOpen(false);
  };

  // Sort appointments by date (most recent first)
  const sortedAppointments = [...appointments].sort((a, b) => 
    new Date(`${a.date}T${a.time}`) - new Date(`${b.date}T${b.time}`)
  );

  if (appointments.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 5 }}>
        <EventAvailableIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
        <Typography variant="h6" gutterBottom>
          Você não possui agendamentos
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          Agende uma consulta ou exame para cuidar da sua saúde.
        </Typography>
        <Box sx={{ mt: 2, display: 'flex', gap: 2, justifyContent: 'center' }}>
          <Button 
            variant="contained" 
            startIcon={<AddIcon />}
            onClick={() => handleBookNew('consultation')}
          >
            Agendar Consulta
          </Button>
          <Button 
            variant="outlined" 
            onClick={() => handleBookNew('exam')}
          >
            Agendar Exame
          </Button>
        </Box>
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6">
          Próximos Agendamentos
        </Typography>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />}
          onClick={() => handleBookNew()}
        >
          Novo Agendamento
        </Button>
      </Box>

      <Alert severity="info" sx={{ mb: 3 }}>
        Lembre-se de chegar com 15 minutos de antecedência para seus agendamentos.
      </Alert>

      {sortedAppointments.map(appointment => (
        <AppointmentCard
          key={appointment.id}
          appointment={appointment}
          handleReschedule={handleReschedule}
          handleCancel={handleCancel}
          handleViewDetails={handleViewDetails}
        />
      ))}

      {/* Cancellation confirmation dialog */}
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
      >
        <DialogTitle>Cancelar Agendamento</DialogTitle>
        <DialogContent>
          <Typography>
            Tem certeza que deseja cancelar 
            {selectedAppointment && (
              <strong>
                {selectedAppointment.type === 'consulta'
                  ? ` sua consulta de ${selectedAppointment.specialty}`
                  : ` seu exame de ${selectedAppointment.exam}`
                }
              </strong>
            )}
            ?
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            Esta ação não pode ser desfeita. Você poderá fazer um novo agendamento posteriormente.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>
            Voltar
          </Button>
          <Button onClick={confirmCancel} color="error" variant="contained">
            Confirmar Cancelamento
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UpcomingAppointments;
