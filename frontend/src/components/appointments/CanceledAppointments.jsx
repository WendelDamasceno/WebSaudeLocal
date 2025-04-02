import React from 'react';
import { Box, Typography } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import AppointmentCard from './AppointmentCard';

const CanceledAppointments = ({ appointments }) => {
  // Dummy handlers for the AppointmentCard component
  const handleReschedule = (id) => {
    console.log('Reschedule canceled appointment:', id);
    // Implement rescheduling logic
  };
  
  const handleCancel = () => {};
  const handleViewDetails = () => {};

  // Sort appointments by date (most recent first)
  const sortedAppointments = [...appointments].sort((a, b) => 
    new Date(b.date) - new Date(a.date)
  );

  if (appointments.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 5 }}>
        <CancelIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
        <Typography variant="h6" gutterBottom>
          Sem cancelamentos
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Você não possui consultas ou exames cancelados.
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Agendamentos Cancelados
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        Aqui estão seus agendamentos cancelados. Você pode reagendar se necessário.
      </Typography>

      {sortedAppointments.map(appointment => (
        <AppointmentCard
          key={appointment.id}
          appointment={appointment}
          handleReschedule={handleReschedule}
          handleCancel={handleCancel}
          handleViewDetails={handleViewDetails}
        />
      ))}
    </Box>
  );
};

export default CanceledAppointments;
