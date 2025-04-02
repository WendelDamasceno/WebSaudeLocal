import React, { useState } from 'react';
import {
  Container, Box, Stepper, Step, StepLabel,
  Paper, Typography, Button
} from '@mui/material';
import SelectSpecialty from '../components/appointments/SelectSpecialty';
import SelectLocation from '../components/appointments/SelectLocation';
import DateTimeSelector from '../components/appointments/DateTimeSelector';
import AppointmentConfirmation from '../components/appointments/AppointmentConfirmation';
import { useNavigate } from 'react-router-dom';

const steps = ['Tipo', 'Especialidade/Exame', 'Local', 'Data/Hora', 'Confirmação'];

const NewAppointment = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [appointmentType, setAppointmentType] = useState(null);
  const [selectedSpecialty, setSelectedSpecialty] = useState(null);
  const [selectedDateTime, setSelectedDateTime] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const navigate = useNavigate();

  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleConfirm = async () => {
    try {
      // Aqui você faria a chamada para API para salvar o agendamento
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirecionar para a página de sucesso ou lista de agendamentos
      navigate('/appointments');
    } catch (error) {
      console.error('Erro ao confirmar agendamento:', error);
    }
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <Box sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Escolha o tipo de agendamento
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
              <Button
                variant={appointmentType === 'consulta' ? 'contained' : 'outlined'}
                onClick={() => setAppointmentType('consulta')}
                fullWidth
              >
                Consulta
              </Button>
              <Button
                variant={appointmentType === 'exame' ? 'contained' : 'outlined'}
                onClick={() => setAppointmentType('exame')}
                fullWidth
              >
                Exame
              </Button>
            </Box>
          </Box>
        );
      case 1:
        return (
          <SelectSpecialty
            type={appointmentType}
            onSelect={(item) => {
              setSelectedSpecialty(item);
              handleNext();
            }}
          />
        );
      case 2:
        return (
          <SelectLocation
            type={appointmentType}
            specialty={selectedSpecialty}
            onSelect={(location) => {
              setSelectedLocation(location);
              handleNext();
            }}
          />
        );
      case 3:
        return (
          <DateTimeSelector
            onSelect={(dateTime) => {
              setSelectedDateTime(dateTime);
              handleNext();
            }}
          />
        );
      case 4:
        return (
          <AppointmentConfirmation
            data={{
              type: appointmentType,
              specialty: selectedSpecialty?.name,
              location: selectedLocation?.name,
              date: selectedDateTime?.date,
              time: selectedDateTime?.time,
              doctor: selectedLocation?.doctor
            }}
            onConfirm={handleConfirm}
            onCancel={handleBack}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="md">
      <Paper sx={{ mt: 3, mb: 3, borderRadius: 2 }}>
        <Box sx={{ p: 3 }}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          
          <Box sx={{ mt: 3 }}>
            {renderStepContent()}
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', pt: 3 }}>
            {activeStep !== 0 && (
              <Button onClick={handleBack} sx={{ mr: 1 }}>
                Voltar
              </Button>
            )}
            {activeStep !== steps.length - 1 && activeStep !== 1 && (
              <Button
                variant="contained"
                onClick={handleNext}
                disabled={
                  (activeStep === 0 && !appointmentType) ||
                  (activeStep === 1 && !selectedSpecialty)
                }
              >
                Próximo
              </Button>
            )}
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default NewAppointment;
