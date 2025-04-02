import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  Button,
  List,
  Paper,
  Tab,
  Tabs
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Appointments = () => {
  const [tabValue, setTabValue] = useState(0);
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 3 }}>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          mb: 3
        }}>
          <Typography variant="h5" component="h1">
            Agendamentos
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => navigate('/appointments/new')}
          >
            Novo Agendamento
          </Button>
        </Box>

        <Paper sx={{ mb: 3 }}>
          <Tabs
            value={tabValue}
            onChange={(e, newValue) => setTabValue(newValue)}
            variant="fullWidth"
          >
            <Tab label="Próximos" />
            <Tab label="Histórico" />
          </Tabs>
        </Paper>

        <List>
          {/* Lista de agendamentos será implementada aqui */}
          <Typography color="text.secondary" align="center" sx={{ py: 4 }}>
            Nenhum agendamento encontrado
          </Typography>
        </List>
      </Box>
    </Container>
  );
};

export default Appointments;
