import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Paper, Typography, Container } from '@mui/material';
import Navbar from './Navbar';
import ErrorBoundary from './ErrorBoundary';

const Footer = () => (
  <Paper component="footer" square variant="outlined" sx={{ mt: 'auto', py: 2 }}>
    <Container>
      <Typography variant="body2" color="text.secondary" align="center">
        © {new Date().getFullYear()} Health App. Todos os direitos reservados.
      </Typography>
    </Container>
  </Paper>
);

const Layout = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <Box component="main" sx={{ flexGrow: 1, py: 3 }}>
        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;
