import React from 'react';
import { 
  Paper, Box, Typography, Chip, Grid, Button, 
  ButtonGroup, Divider, IconButton, Tooltip
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import BiotechIcon from '@mui/icons-material/Biotech';
import PersonIcon from '@mui/icons-material/Person';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import ShareIcon from '@mui/icons-material/Share';
import FeedbackIcon from '@mui/icons-material/Feedback';

const getStatusColor = (status) => {
  switch (status) {
    case 'confirmed':
      return '#4caf50';
    case 'scheduled':
      return '#2196f3';
    case 'completed':
      return '#673ab7';
    case 'canceled':
      return '#9e9e9e';
    default:
      return '#9e9e9e';
  }
};

const getStatusLabel = (status) => {
  switch (status) {
    case 'confirmed':
      return 'Confirmado';
    case 'scheduled':
      return 'Agendado';
    case 'completed':
      return 'Concluído';
    case 'canceled':
      return 'Cancelado';
    default:
      return status;
  }
};

const getStatusIcon = (status) => {
  switch (status) {
    case 'confirmed':
    case 'completed':
      return <CheckCircleIcon fontSize="small" />;
    case 'canceled':
      return <WarningIcon fontSize="small" />;
    default:
      return <AccessTimeIcon fontSize="small" />;
  }
};

const AppointmentCard = ({ 
  appointment, 
  handleReschedule, 
  handleCancel,
  handleViewDetails 
}) => {
  const { 
    id, 
    type, 
    status, 
    specialty, 
    exam, 
    doctor, 
    date, 
    time, 
    location, 
    address, 
    phone 
  } = appointment;

  const formattedDate = new Date(date).toLocaleDateString('pt-BR', {
    weekday: 'long', 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric'
  });

  const isPast = new Date(`${date}T${time}`) < new Date();
  const isActive = status === 'confirmed' || status === 'scheduled';
  const isCompleted = status === 'completed';
  
  return (
    <Paper
      elevation={2}
      sx={{
        p: 3,
        mb: 3,
        borderRadius: 2,
        borderLeft: `4px solid ${getStatusColor(status)}`,
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-3px)',
          boxShadow: 3
        }
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box 
            sx={{ 
              mr: 2, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              bgcolor: getStatusColor(status),
              color: 'white',
              width: 40,
              height: 40,
              borderRadius: '50%'
            }}
          >
            {type === 'consulta' ? <LocalHospitalIcon /> : <BiotechIcon />}
          </Box>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 'medium' }}>
              {type === 'consulta' ? specialty : exam}
            </Typography>
            <Chip 
              icon={getStatusIcon(status)} 
              label={getStatusLabel(status)} 
              size="small"
              sx={{ 
                bgcolor: `${getStatusColor(status)}20`, 
                color: getStatusColor(status),
                fontWeight: 'medium'
              }}
            />
          </Box>
        </Box>
        <IconButton aria-label="more options" onClick={() => handleViewDetails(id)}>
          <MoreVertIcon />
        </IconButton>
      </Box>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <CalendarTodayIcon sx={{ mr: 1, color: 'text.secondary', fontSize: 18 }} />
            <Typography variant="body2">{formattedDate}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <AccessTimeIcon sx={{ mr: 1, color: 'text.secondary', fontSize: 18 }} />
            <Typography variant="body2">{time}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <LocationOnIcon sx={{ mr: 1, color: 'text.secondary', fontSize: 18 }} />
            <Typography variant="body2">{location}</Typography>
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ ml: 3.5 }}>
            {address}
          </Typography>
        </Grid>
        
        <Grid item xs={12} md={6}>
          {type === 'consulta' && (
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <PersonIcon sx={{ mr: 1, color: 'text.secondary', fontSize: 18 }} />
              <Typography variant="body2">{doctor}</Typography>
            </Box>
          )}
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <ContactPhoneIcon sx={{ mr: 1, color: 'text.secondary', fontSize: 18 }} />
            <Typography variant="body2">{phone}</Typography>
          </Box>
          {appointment.diagnosis && (
            <Box sx={{ display: 'flex', mt: 2 }}>
              <CheckCircleIcon sx={{ mr: 1, color: '#673ab7', alignSelf: 'flex-start', fontSize: 18 }} />
              <Box>
                <Typography variant="body2" fontWeight="medium">
                  {appointment.diagnosis}
                </Typography>
                {appointment.recommendations && (
                  <Typography variant="body2" color="text.secondary">
                    {appointment.recommendations}
                  </Typography>
                )}
              </Box>
            </Box>
          )}
          {appointment.results && (
            <Box sx={{ display: 'flex', mt: 2 }}>
              <CheckCircleIcon sx={{ mr: 1, color: '#673ab7', alignSelf: 'flex-start', fontSize: 18 }} />
              <Typography variant="body2">
                <strong>Resultado:</strong> {appointment.results}
              </Typography>
            </Box>
          )}
        </Grid>
      </Grid>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
        {isActive && !isPast && (
          <ButtonGroup size="small" variant="outlined">
            <Button 
              startIcon={<EditIcon />}
              onClick={() => handleReschedule(id)}
            >
              Reagendar
            </Button>
            <Button 
              color="error"
              startIcon={<DeleteIcon />}
              onClick={() => handleCancel(id)}
            >
              Cancelar
            </Button>
          </ButtonGroup>
        )}
        
        {isCompleted && (
          <ButtonGroup size="small" variant="outlined">
            <Button startIcon={<FileDownloadIcon />}>
              Baixar Resultado
            </Button>
            <Button startIcon={<ShareIcon />}>
              Compartilhar
            </Button>
            <Tooltip title="Avaliar atendimento">
              <IconButton color="primary">
                <FeedbackIcon />
              </IconButton>
            </Tooltip>
          </ButtonGroup>
        )}
        
        {status === 'canceled' && (
          <Button 
            variant="outlined" 
            size="small"
            onClick={() => handleReschedule(id)}
          >
            Agendar novamente
          </Button>
        )}
      </Box>
    </Paper>
  );
};

export default AppointmentCard;
