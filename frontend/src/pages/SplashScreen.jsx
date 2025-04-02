import React, { useEffect } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import theme from '../styles/theme';

const SplashScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Simular carregamento inicial
    const timer = setTimeout(() => {
      const hasSeenOnboarding = localStorage.getItem('hasSeenOnboarding');
      if (!hasSeenOnboarding) {
        navigate('/onboarding');
      } else {
        navigate('/login');
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.primaryLight})`
      }}
    >
      <Box
        component="img"
        src="/logo192.png"
        alt="Saúde Local"
        sx={{
          width: 120,
          height: 120,
          mb: 4,
          animation: 'pulse 2s infinite'
        }}
      />
      <Typography
        variant="h4"
        sx={{
          color: 'white',
          fontWeight: 'bold',
          mb: 3
        }}
      >
        Saúde Local
      </Typography>
      <CircularProgress sx={{ color: 'white' }} />
    </Box>
  );
};

export default SplashScreen;
