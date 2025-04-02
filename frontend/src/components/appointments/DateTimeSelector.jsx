import React, { useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  Paper,
  Button,
  styled
} from '@mui/material';

const DateButton = styled(Button)(({ theme }) => ({
  width: '100%',
  height: '72px',
  borderRadius: theme.spacing(1),
  display: 'flex',
  flexDirection: 'column',
  padding: theme.spacing(1),
  gap: theme.spacing(0.5),
  border: '1px solid',
  borderColor: theme.palette.divider,
  '&.selected': {
    borderColor: theme.palette.primary.main,
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.contrastText,
  }
}));

const TimeButton = styled(Button)(({ theme, available }) => ({
  width: '100%',
  borderRadius: theme.spacing(1),
  padding: theme.spacing(1.5),
  border: '1px solid',
  borderColor: theme.palette.divider,
  opacity: available ? 1 : 0.5,
  cursor: available ? 'pointer' : 'not-allowed',
  '&.selected': {
    borderColor: theme.palette.primary.main,
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.contrastText,
  },
  '&:hover': {
    backgroundColor: available ? theme.colors.appointment.available + '20' : 'transparent'
  }
}));

const DateTimeSelector = ({ onSelect, availableTimes = [] }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  // Gerar próximos 7 dias disponíveis
  const availableDates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return date;
  });

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setSelectedTime(null);
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    if (selectedDate) {
      onSelect({ date: selectedDate, time });
    }
  };

  const handleNext = () => {
    if (!selectedDate || !selectedTime) return;
    onSelect({ date: selectedDate, time: selectedTime });
  };

  const formatDate = (date) => {
    const days = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB'];
    return {
      weekday: days[date.getDay()],
      day: date.getDate().toString().padStart(2, '0'),
      month: (date.getMonth() + 1).toString().padStart(2, '0')
    };
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Selecione a data
      </Typography>
      
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {availableDates.map((date) => {
          const formattedDate = formatDate(date);
          const isSelected = selectedDate?.getTime() === date.getTime();
          
          return (
            <Grid item xs={6} sm={3} key={date.getTime()}>
              <DateButton
                className={isSelected ? 'selected' : ''}
                onClick={() => handleDateSelect(date)}
              >
                <Typography variant="caption">{formattedDate.weekday}</Typography>
                <Typography variant="h6">{formattedDate.day}</Typography>
                <Typography variant="caption">{formattedDate.month}</Typography>
              </DateButton>
            </Grid>
          );
        })}
      </Grid>

      {selectedDate && (
        <>
          <Typography variant="h6" gutterBottom>
            Horários disponíveis
          </Typography>
          
          <Grid container spacing={2}>
            {availableTimes.map((time) => (
              <Grid item xs={6} sm={3} key={time.value}>
                <TimeButton
                  disabled={!time.available}
                  available={time.available}
                  onClick={() => time.available && handleTimeSelect(time.value)}
                  className={selectedTime === time.value ? 'selected' : ''}
                >
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="body1">{time.value}</Typography>
                    <Typography 
                      variant="caption" 
                      color={time.available ? 'success.main' : 'text.disabled'}
                    >
                      {time.available ? 'Disponível' : 'Indisponível'}
                    </Typography>
                  </Box>
                </TimeButton>
              </Grid>
            ))}
          </Grid>

          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="contained"
              disabled={!selectedTime}
              onClick={handleNext}
            >
              Próximo
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default DateTimeSelector;
