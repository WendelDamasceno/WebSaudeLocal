import React from 'react';
import { 
  Box, 
  Typography, 
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
  useTheme,
  Chip // Adicionar importação para Chip que estava faltando
} from '@mui/material';
import { 
  AccessTime as AccessTimeIcon,
  Schedule as ScheduleIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const OpeningHours = ({ schedule }) => {
  // Verificar se o dia atual está na lista
  const today = new Date().toLocaleDateString('pt-BR', { weekday: 'long' }).toLowerCase();
  const theme = useTheme();
  
  return (
    <Paper 
      elevation={0}
      sx={{ 
        p: 3, 
        borderRadius: 3,
        bgcolor: 'background.paper',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        border: '1px solid rgba(0,0,0,0.05)'
      }}
    >
      <Box 
        component={motion.div}
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        sx={{ 
          display: 'flex',
          alignItems: 'center',
          mb: 3
        }}
      >
        <ScheduleIcon sx={{ mr: 1.5, color: 'primary.main', fontSize: 28 }} />
        <Typography variant="h5" fontWeight="bold">
          Horários de funcionamento
        </Typography>
      </Box>
      
      <List sx={{ p: 0 }}>
        {schedule.map((item, index) => {
          const isToday = item.day.toLowerCase().includes(today);
          const isClosed = item.hours.toLowerCase().includes('fechado');
          
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
            >
              {index > 0 && <Divider sx={{ my: 1 }} />}
              <ListItem 
                sx={{ 
                  py: 1.8, 
                  px: 2,
                  bgcolor: isToday ? 'primary.lighter' : 'transparent',
                  borderRadius: isToday ? 2 : 0,
                  transition: 'all 0.2s',
                  '&:hover': {
                    bgcolor: isToday ? 'primary.lighter' : 'rgba(0,0,0,0.03)'
                  }
                }}
              >
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography 
                        variant="body1" 
                        sx={{ 
                          fontWeight: isToday ? 700 : 500,
                          display: 'flex',
                          alignItems: 'center',
                          color: isToday ? 'primary.dark' : 'text.primary'
                        }}
                      >
                        {isToday && (
                          <AccessTimeIcon 
                            fontSize="small" 
                            sx={{ mr: 1, color: 'primary.main' }} 
                          />
                        )}
                        {item.day}
                        {isToday && (
                          <Chip 
                            label="HOJE" 
                            size="small" 
                            color="primary" 
                            variant="filled"
                            sx={{ 
                              ml: 1, 
                              height: 20, 
                              fontSize: '0.7rem',
                              fontWeight: 'bold',
                              letterSpacing: '0.5px'
                            }} 
                          />
                        )}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {isClosed ? (
                          <CancelIcon sx={{ mr: 1, color: 'error.main', fontSize: 18 }} />
                        ) : (
                          <CheckCircleIcon sx={{ mr: 1, color: 'success.main', fontSize: 18 }} />
                        )}
                        <Typography 
                          variant="body1" 
                          sx={{ 
                            fontWeight: isToday ? 700 : 500,
                            color: isClosed 
                              ? 'error.main' 
                              : (isToday ? 'primary.dark' : 'text.primary')
                          }}
                        >
                          {item.hours}
                        </Typography>
                      </Box>
                    </Box>
                  }
                />
              </ListItem>
            </motion.div>
          );
        })}
      </List>
      
      <Box 
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.4 }}
        sx={{ 
          mt: 3, 
          p: 2.5, 
          bgcolor: theme.palette.info.lighter, 
          borderRadius: 2,
          border: `1px solid ${theme.palette.info.light}`
        }}
      >
        <Typography variant="body2" color="info.dark">
          <strong>Nota:</strong> Os horários podem ser alterados em feriados ou situações excepcionais. 
          Recomendamos confirmar por telefone antes de sua visita.
        </Typography>
      </Box>
    </Paper>
  );
};

export default OpeningHours;
