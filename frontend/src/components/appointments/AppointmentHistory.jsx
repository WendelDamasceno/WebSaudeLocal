import React from 'react';
import { 
  Box, Typography, ToggleButtonGroup, ToggleButton,
  Divider
} from '@mui/material';
import HistoryIcon from '@mui/icons-material/History';
import AppointmentCard from './AppointmentCard';

const AppointmentHistory = ({ appointments, filterYear, setFilterYear }) => {
  // Generate array of the last 3 years for filtering
  const years = [
    new Date().getFullYear(),
    new Date().getFullYear() - 1,
    new Date().getFullYear() - 2
  ];

  // Handle year filter change
  const handleYearChange = (event, newYear) => {
    if (newYear !== null) {
      setFilterYear(newYear);
    }
  };

  // Group appointments by month for better organization
  const groupedAppointments = appointments.reduce((groups, appointment) => {
    const date = new Date(appointment.date);
    const month = date.getMonth();
    if (!groups[month]) {
      groups[month] = [];
    }
    groups[month].push(appointment);
    return groups;
  }, {});

  // Sort appointments by date (most recent first)
  Object.keys(groupedAppointments).forEach(month => {
    groupedAppointments[month].sort((a, b) => 
      new Date(b.date) - new Date(a.date)
    );
  });

  // Array of month names
  const monthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  // Dummy handlers for the AppointmentCard component
  const handleReschedule = () => {};
  const handleCancel = () => {};
  const handleViewDetails = () => {};

  if (appointments.length === 0) {
    return (
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6">
            Histórico de Atendimentos
          </Typography>
          <ToggleButtonGroup
            value={filterYear}
            exclusive
            onChange={handleYearChange}
            aria-label="year filter"
            size="small"
          >
            {years.map(year => (
              <ToggleButton key={year} value={year} aria-label={`filter by ${year}`}>
                {year}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Box>

        <Box sx={{ textAlign: 'center', py: 5 }}>
          <HistoryIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h6" gutterBottom>
            Sem histórico para {filterYear}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Você não possui consultas ou exames realizados neste ano.
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6">
          Histórico de Atendimentos
        </Typography>
        <ToggleButtonGroup
          value={filterYear}
          exclusive
          onChange={handleYearChange}
          aria-label="year filter"
          size="small"
        >
          {years.map(year => (
            <ToggleButton key={year} value={year} aria-label={`filter by ${year}`}>
              {year}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Box>

      {Object.keys(groupedAppointments)
        .sort((a, b) => b - a) // Sort months in descending order
        .map(month => (
          <Box key={month} sx={{ mb: 4 }}>
            <Divider textAlign="left" sx={{ mb: 2 }}>
              <Typography 
                variant="subtitle2" 
                color="text.secondary"
                sx={{ 
                  px: 2, 
                  py: 0.5, 
                  borderRadius: 1,
                  bgcolor: 'grey.100'
                }}
              >
                {monthNames[month]} {filterYear}
              </Typography>
            </Divider>
            
            {groupedAppointments[month].map(appointment => (
              <AppointmentCard
                key={appointment.id}
                appointment={appointment}
                handleReschedule={handleReschedule}
                handleCancel={handleCancel}
                handleViewDetails={handleViewDetails}
              />
            ))}
          </Box>
        ))}
    </Box>
  );
};

export default AppointmentHistory;
