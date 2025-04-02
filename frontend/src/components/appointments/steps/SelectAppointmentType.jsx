import React from 'react';
import { 
  Typography, Box, Grid, Paper, Radio, RadioGroup,
  FormControlLabel, FormControl
} from '@mui/material';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import BiotechIcon from '@mui/icons-material/Biotech';

const SelectAppointmentType = ({ selectedType, onTypeSelect }) => {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Selecione o tipo de agendamento
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        Escolha entre consulta médica ou exame clínico.
      </Typography>

      <FormControl component="fieldset">
        <RadioGroup
          aria-label="appointment-type"
          name="appointment-type"
          value={selectedType}
          onChange={(e) => onTypeSelect(e.target.value)}
        >
          <Grid container spacing={3} sx={{ mt: 2 }}>
            <Grid item xs={12} sm={6}>
              <Paper 
                elevation={selectedType === 'consultation' ? 3 : 1}
                sx={{ 
                  p: 3, 
                  borderRadius: 2,
                  border: selectedType === 'consultation' ? '2px solid #1976d2' : '1px solid #e0e0e0',
                  height: '100%',
                  transition: 'all 0.2s'
                }}
              >
                <FormControlLabel 
                  value="consultation" 
                  control={<Radio />} 
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <LocalHospitalIcon color="primary" />
                      <Typography variant="h6">Consulta Médica</Typography>
                    </Box>
                  }
                  sx={{ mb: 2, width: '100%' }}
                />
                <Typography variant="body2" color="text.secondary">
                  Agende uma consulta com um médico especialista. Ideal para check-ups, 
                  acompanhamento de condições existentes ou novos sintomas.
                </Typography>
              </Paper>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <Paper 
                elevation={selectedType === 'exam' ? 3 : 1}
                sx={{ 
                  p: 3, 
                  borderRadius: 2,
                  border: selectedType === 'exam' ? '2px solid #4caf50' : '1px solid #e0e0e0',
                  height: '100%',
                  transition: 'all 0.2s'
                }}
              >
                <FormControlLabel 
                  value="exam" 
                  control={<Radio />} 
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <BiotechIcon sx={{ color: '#4caf50' }} />
                      <Typography variant="h6">Exame Clínico</Typography>
                    </Box>
                  }
                  sx={{ mb: 2, width: '100%' }}
                />
                <Typography variant="body2" color="text.secondary">
                  Agende exames laboratoriais ou de imagem. Ideal para diagnósticos,
                  prevenção ou monitoramento de saúde.
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </RadioGroup>
      </FormControl>
    </Box>
  );
};

export default SelectAppointmentType;
