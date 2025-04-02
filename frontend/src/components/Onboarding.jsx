import React, { useState } from 'react';
import { Box, Typography, Button, MobileStepper } from '@mui/material';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const onboardingSteps = [
  {
    title: 'Bem-vindo ao Saúde Local',
    description: 'Encontre unidades de saúde próximas a você de forma rápida e fácil.',
    icon: '🏥'
  },
  {
    title: 'Busca Inteligente',
    description: 'Filtre por especialidade, tempo de espera e avaliações da comunidade.',
    icon: '🔍'
  },
  {
    title: 'Emergência',
    description: 'Acesso rápido a serviços de emergência e guia de primeiros socorros.',
    icon: '🚑'
  },
  {
    title: 'Começar',
    description: 'Para uma melhor experiência, permita o acesso à sua localização e notificações.',
    icon: '📍'
  }
];

const Onboarding = () => {
  const [activeStep, setActiveStep] = useState(0);
  const navigate = useNavigate();

  const handleNext = () => {
    if (activeStep === onboardingSteps.length - 1) {
      // Solicitar permissões
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(() => {
          console.log('Permissão de localização concedida');
        });
      }
      
      if ('Notification' in window) {
        Notification.requestPermission();
      }
      
      localStorage.setItem('hasSeenOnboarding', 'true');
      navigate('/login');
    } else {
      setActiveStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(prev => prev - 1);
  };

  return (
    <Box sx={{ height: '100vh', bgcolor: 'background.paper' }}>
      <Box
        sx={{
          height: '80%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          p: 3,
          textAlign: 'center'
        }}
      >
        <Typography variant="h1" sx={{ fontSize: '4rem', mb: 2 }}>
          {onboardingSteps[activeStep].icon}
        </Typography>
        <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
          {onboardingSteps[activeStep].title}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {onboardingSteps[activeStep].description}
        </Typography>
      </Box>

      <Box sx={{ p: 2 }}>
        <MobileStepper
          variant="dots"
          steps={onboardingSteps.length}
          position="static"
          activeStep={activeStep}
          nextButton={
            <Button size="small" onClick={handleNext}>
              {activeStep === onboardingSteps.length - 1 ? 'Começar' : 'Próximo'}
              <KeyboardArrowRight />
            </Button>
          }
          backButton={
            <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
              <KeyboardArrowLeft />
              Voltar
            </Button>
          }
        />
      </Box>
    </Box>
  );
};

export default Onboarding;
