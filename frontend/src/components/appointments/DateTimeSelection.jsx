import React from 'react';
import { Typography, Box, Chip, Button } from '@mui/material';

const DateTimeSelection = ({ 
  availableDates, 
  selectedDate, 
  handleDateSelect, 
  availableTimeSlots, 
  selectedTimeSlot, 
  setSelectedTimeSlot,
  handleBookAppointment
}) => {
  return (
    <>
      {/* Date selection */}
      <Typography variant="subtitle1" gutterBottom>
        Datas disponíveis
      </Typography>
      
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
        {availableDates.map((date) => (
          <Chip 
            key={date} 
            label={new Date(date).toLocaleDateString('pt-BR')}
            onClick={() => handleDateSelect(date)}
            color={selectedDate === date ? "primary" : "default"}
            sx={{ mb: 1 }}
          />
        ))}
      </Box>
      
      {/* Time slot selection */}
      {selectedDate && (
        <>
          <Typography variant="subtitle1" gutterBottom>
            Horários disponíveis para {new Date(selectedDate).toLocaleDateString('pt-BR')}
          </Typography>
          
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
            {availableTimeSlots.map((time) => (
              <Chip 
                key={time} 
                label={time}
                onClick={() => setSelectedTimeSlot(time)}
                color={selectedTimeSlot === time ? "primary" : "default"}
                sx={{ mb: 1 }}
              />
            ))}
          </Box>
        </>
      )}
      
      {/* Booking button */}
      {selectedDate && selectedTimeSlot && (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Button 
            variant="contained" 
            color="primary"
            onClick={handleBookAppointment}
          >
            Confirmar Agendamento
          </Button>
        </Box>
      )}
    </>
  );
};

export default DateTimeSelection;
