import React from 'react';
import { Container, Typography, Accordion, AccordionSummary, AccordionDetails, Button, Box } from '@mui/material';
import { ExpandMore as ExpandMoreIcon, Phone as PhoneIcon } from '@mui/icons-material';

const emergencyProcedures = [
  {
    title: 'Parada Cardíaca',
    steps: [
      'Verifique se a pessoa está consciente',
      'Ligue para 192 (SAMU)',
      'Inicie compressões torácicas',
      'Continue até a chegada do socorro'
    ]
  },
  {
    title: 'Convulsão',
    steps: [
      'Proteja a cabeça da pessoa',
      'Afaste objetos próximos',
      'Não tente conter os movimentos',
      'Aguarde o fim da crise e procure ajuda médica'
    ]
  }
];

const EmergencyGuide = () => {
  return (
    <Container maxWidth="md">
      <Box sx={{ mb: 3 }}>
        <Button
          variant="contained"
          color="error"
          size="large"
          startIcon={<PhoneIcon />}
          onClick={() => window.location.href = 'tel:192'}
          fullWidth
        >
          Ligar para SAMU (192)
        </Button>
      </Box>

      {emergencyProcedures.map((procedure, index) => (
        <Accordion key={index}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">{procedure.title}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <ol>
              {procedure.steps.map((step, stepIndex) => (
                <li key={stepIndex}><Typography>{step}</Typography></li>
              ))}
            </ol>
          </AccordionDetails>
        </Accordion>
      ))}
    </Container>
  );
};

export default EmergencyGuide;
