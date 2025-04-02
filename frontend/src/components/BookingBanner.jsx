import React from 'react';
import { 
  Box, Typography, Button, Grid, 
  Paper, useTheme, useMediaQuery 
} from '@mui/material';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import BiotechIcon from '@mui/icons-material/Biotech';

const BookingBanner = ({ handleBookNew }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Paper 
      elevation={0}
      sx={{ 
        p: 3, 
        borderRadius: 2,
        background: 'linear-gradient(120deg, #e0f7fa, #bbdefb)',
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      <Grid container spacing={3} alignItems="center">
        <Grid item xs={12} md={7}>
          <Typography variant="h5" component="h2" gutterBottom fontWeight="bold">
            Precisa agendar um novo atendimento?
          </Typography>
          <Typography variant="body1" paragraph>
            Encontre os melhores médicos e clínicas em Camaçari para consultas e exames.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              color="primary"
              size={isMobile ? "medium" : "large"}
              startIcon={<LocalHospitalIcon />}
              onClick={() => handleBookNew('consultation')}
              sx={{ borderRadius: 2 }}
            >
              Agendar Consulta
            </Button>
            <Button
              variant="outlined"
              color="primary"
              size={isMobile ? "medium" : "large"}
              startIcon={<BiotechIcon />}
              onClick={() => handleBookNew('exam')}
              sx={{ borderRadius: 2 }}
            >
              Agendar Exame
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} md={5} sx={{ display: { xs: 'none', md: 'block' } }}>
          <Box sx={{ position: 'relative', height: '100%', minHeight: 150 }}>
            {/* Background decorative elements */}
            <Box sx={{ 
              position: 'absolute', 
              right: -20, 
              top: -40, 
              width: 200, 
              height: 200, 
              borderRadius: '50%', 
              background: 'rgba(255,255,255,0.2)',
              zIndex: 0
            }} />
            <Box sx={{ 
              position: 'absolute', 
              right: 40, 
              bottom: -30, 
              width: 100, 
              height: 100, 
              borderRadius: '50%', 
              background: 'rgba(255,255,255,0.3)',
              zIndex: 0
            }} />
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default BookingBanner;
