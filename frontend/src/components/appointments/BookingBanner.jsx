import React from 'react';
import { Paper, Typography, Button, Box } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const BookingBanner = () => {
  return (
    <Paper sx={{ p: 2, mb: 3, bgcolor: 'primary.main', color: 'white' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h6">Agende sua consulta</Typography>
          <Typography variant="body2">
            Marque consultas com os melhores profissionais
          </Typography>
        </Box>
        <Button
          component={Link}
          to="/appointments/new"
          variant="contained"
          color="secondary"
          startIcon={<AddIcon />}
        >
          Nova Consulta
        </Button>
      </Box>
    </Paper>
  );
};

export default BookingBanner;
