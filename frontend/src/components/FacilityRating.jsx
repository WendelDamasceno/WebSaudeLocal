import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Rating, 
  Button, 
  Paper, 
  Avatar, 
  Divider, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions,
  TextField,
  LinearProgress,
  Grid,
  Card,
  CardContent,
  IconButton,
  Chip,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { 
  ThumbUp as ThumbUpIcon, 
  AccessTime as TimeIcon, 
  CleaningServices as CleaningIcon, 
  MedicalServices as QualityIcon, 
  People as CrowdIcon,
  Close as CloseIcon,
  Add as AddIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';

// Componente para mostrar a barra de progresso de cada critério
const RatingBar = ({ label, value, color, icon: Icon }) => {
  const theme = useTheme();
  
  return (
    <Box 
      component={motion.div}
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      sx={{ mb: 2, display: 'flex', alignItems: 'center' }}
    >
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        width: 140,
        mr: 1
      }}>
        {Icon && (
          <Avatar 
            sx={{ 
              width: 28, 
              height: 28, 
              mr: 1.5, 
              bgcolor: `${color}20`,
              color: color
            }}
          >
            <Icon sx={{ fontSize: 16 }} />
          </Avatar>
        )}
        <Typography 
          variant="body2" 
          sx={{ 
            color: theme.palette.text.primary,
            fontWeight: 500
          }}
        >
          {label}
        </Typography>
      </Box>
      <Box sx={{ flexGrow: 1, mx: 1 }}>
        <LinearProgress 
          variant="determinate" 
          value={(value / 5) * 100} 
          sx={{ 
            height: 8, 
            borderRadius: 4,
            backgroundColor: `${color}20`,
            '& .MuiLinearProgress-bar': {
              backgroundColor: color,
              borderRadius: 4
            }
          }} 
        />
      </Box>
      <Typography variant="body2" sx={{ fontWeight: 'bold', minWidth: 30, ml: 1 }}>
        {value.toFixed(1)}
      </Typography>
    </Box>
  );
};

// Componente para um comentário individual
const UserComment = ({ author, rating, date, comment }) => {
  const formattedDate = new Date(date).toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
  
  return (
    <Card 
      component={motion.div}
      whileHover={{ y: -4, boxShadow: '0 6px 16px rgba(0,0,0,0.1)' }}
      transition={{ duration: 0.2 }}
      variant="outlined" 
      sx={{ 
        mb: 2, 
        borderRadius: 3,
        overflow: 'hidden',
        transition: 'all 0.2s ease'
      }}
    >
      <CardContent sx={{ p: 2.5, '&:last-child': { pb: 2.5 } }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar 
              sx={{ 
                width: 40, 
                height: 40, 
                bgcolor: 'primary.main', 
                mr: 1.5,
                fontWeight: 'bold'
              }}
            >
              {author.charAt(0)}
            </Avatar>
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', lineHeight: 1.2 }}>
                {author}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                <TimeIcon sx={{ fontSize: 12, mr: 0.5, verticalAlign: 'text-bottom' }} />
                {formattedDate}
              </Typography>
            </Box>
          </Box>
          <Box>
            <Rating value={rating} readOnly size="small" />
          </Box>
        </Box>
        <Typography 
          variant="body2" 
          sx={{ 
            mt: 1.5,
            color: 'text.primary',
            lineHeight: 1.6
          }}
        >
          "{comment}"
        </Typography>
      </CardContent>
    </Card>
  );
};

const FacilityRating = ({ ratings, facilityId }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [openRatingDialog, setOpenRatingDialog] = useState(false);
  const [userRating, setUserRating] = useState({
    overall: 0,
    attendance: 0,
    cleanliness: 0,
    quality: 0,
    crowding: 0,
    comment: ''
  });
  
  const handleOpenRatingDialog = () => {
    setOpenRatingDialog(true);
  };
  
  const handleCloseRatingDialog = () => {
    setOpenRatingDialog(false);
  };
  
  const handleRatingChange = (field, value) => {
    setUserRating(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  const handleSubmitRating = () => {
    // Aqui faria uma chamada à API para enviar a avaliação
    console.log('Enviando avaliação:', userRating);
    
    // Simulando o envio
    alert('Avaliação enviada com sucesso!');
    
    // Resetar formulário e fechar diálogo
    setUserRating({
      overall: 0,
      attendance: 0,
      cleanliness: 0,
      quality: 0,
      crowding: 0,
      comment: ''
    });
    handleCloseRatingDialog();
  };
  
  return (
    <>
      <Paper 
        elevation={0}
        sx={{ 
          p: 3, 
          mb: 4, 
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
            flexDirection: isMobile ? 'column' : 'row',
            justifyContent: 'space-between', 
            alignItems: isMobile ? 'flex-start' : 'center', 
            mb: 3
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', mb: isMobile ? 2 : 0 }}>
            <Box 
              sx={{ 
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 60,
                height: 60,
                borderRadius: 2,
                bgcolor: 'primary.light',
                mr: 2
              }}
            >
              <Typography 
                variant="h4" 
                sx={{ 
                  fontWeight: 'bold', 
                  color: 'primary.dark'
                }}
              >
                {ratings.average.toFixed(1)}
              </Typography>
            </Box>
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Rating value={ratings.average} precision={0.1} readOnly size="medium" />
                <Typography variant="body2" sx={{ ml: 1, color: 'text.secondary' }}>
                  ({ratings.total})
                </Typography>
              </Box>
              <Typography 
                variant="body2" 
                color="text.secondary"
                sx={{ mt: 0.5 }}
              >
                Baseado em {ratings.total} avaliações
              </Typography>
            </Box>
          </Box>
          
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleOpenRatingDialog}
            startIcon={<AddIcon />}
            sx={{ 
              borderRadius: 6,
              px: 3,
              py: 1,
              fontWeight: 600,
              boxShadow: '0 2px 8px rgba(25, 118, 210, 0.3)'
            }}
          >
            Avaliar
          </Button>
        </Box>
        
        <Divider sx={{ my: 3 }} />
        
        <Box sx={{ mt: 3 }}>
          <RatingBar 
            label="Atendimento" 
            value={ratings.criteria.attendance} 
            color="#2196f3"
            icon={ThumbUpIcon}
          />
          <RatingBar 
            label="Limpeza" 
            value={ratings.criteria.cleanliness} 
            color="#4caf50"
            icon={CleaningIcon}
          />
          <RatingBar 
            label="Qualidade" 
            value={ratings.criteria.quality} 
            color="#ff9800"
            icon={QualityIcon}
          />
          <RatingBar 
            label="Lotação" 
            value={ratings.criteria.crowding} 
            color="#f44336"
            icon={CrowdIcon}
          />
        </Box>
      </Paper>
      
      <Box 
        sx={{ 
          mb: 3, 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center' 
        }}
      >
        <Typography variant="h6" fontWeight="bold">
          Comentários ({ratings.comments.length})
        </Typography>
        <Chip 
          label="Mais relevantes" 
          size="small" 
          color="primary" 
          variant="outlined"
          sx={{ borderRadius: 6, fontWeight: 500 }}
        />
      </Box>
      
      <Box
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {ratings.comments.map((comment, index) => (
          <motion.div
            key={comment.id}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <UserComment
              author={comment.author}
              rating={comment.rating}
              date={comment.date}
              comment={comment.comment}
            />
          </motion.div>
        ))}
      </Box>
      
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Button
          variant="outlined"
          onClick={handleOpenRatingDialog}
          startIcon={<AddIcon />}
          sx={{ 
            borderRadius: 6,
            px: 4,
            py: 1.2,
            fontWeight: 600,
            borderWidth: 2,
            '&:hover': {
              borderWidth: 2
            }
          }}
        >
          Adicionar avaliação
        </Button>
      </Box>
      
      {/* Diálogo para enviar avaliação */}
      <Dialog
        open={openRatingDialog}
        onClose={handleCloseRatingDialog}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: { borderRadius: 3 }
        }}
      >
        <DialogTitle sx={{ pb: 1, pt: 2.5 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h5" fontWeight="bold">Avaliar unidade de saúde</Typography>
            <IconButton onClick={handleCloseRatingDialog} sx={{ color: 'text.secondary' }}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        
        <DialogContent sx={{ px: 3 }}>
          <Box sx={{ py: 2 }}>
            <Typography variant="h6" fontWeight="medium" gutterBottom>
              Avaliação geral
            </Typography>
            <Box 
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                mb: 4,
                p: 2,
                bgcolor: 'primary.light',
                borderRadius: 2
              }}
            >
              <Rating
                name="overall"
                value={userRating.overall}
                onChange={(e, newValue) => handleRatingChange('overall', newValue)}
                size="large"
                sx={{ 
                  '& .MuiRating-iconFilled': {
                    color: 'primary.dark'
                  }
                }}
              />
              <Typography 
                sx={{ 
                  ml: 1.5, 
                  color: 'primary.dark',
                  fontWeight: 500
                }}
              >
                {userRating.overall > 0 ? `${userRating.overall}/5` : 'Selecione uma nota'}
              </Typography>
            </Box>
            
            <Typography variant="h6" fontWeight="medium" gutterBottom>
              Avalie por categorias
            </Typography>
            
            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={12} sm={6}>
                <Box sx={{ mb: 2, p: 2, bgcolor: 'background.paper', borderRadius: 2 }}>
                  <Typography variant="subtitle2" gutterBottom fontWeight="bold">
                    <ThumbUpIcon sx={{ fontSize: 16, mr: 0.7, color: '#2196f3', verticalAlign: 'text-bottom' }} />
                    Atendimento
                  </Typography>
                  <Rating
                    name="attendance"
                    value={userRating.attendance}
                    onChange={(e, newValue) => handleRatingChange('attendance', newValue)}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box sx={{ mb: 2, p: 2, bgcolor: 'background.paper', borderRadius: 2 }}>
                  <Typography variant="subtitle2" gutterBottom fontWeight="bold">
                    <CleaningIcon sx={{ fontSize: 16, mr: 0.7, color: '#4caf50', verticalAlign: 'text-bottom' }} />
                    Limpeza
                  </Typography>
                  <Rating
                    name="cleanliness"
                    value={userRating.cleanliness}
                    onChange={(e, newValue) => handleRatingChange('cleanliness', newValue)}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box sx={{ mb: 2, p: 2, bgcolor: 'background.paper', borderRadius: 2 }}>
                  <Typography variant="subtitle2" gutterBottom fontWeight="bold">
                    <QualityIcon sx={{ fontSize: 16, mr: 0.7, color: '#ff9800', verticalAlign: 'text-bottom' }} />
                    Qualidade
                  </Typography>
                  <Rating
                    name="quality"
                    value={userRating.quality}
                    onChange={(e, newValue) => handleRatingChange('quality', newValue)}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box sx={{ mb: 2, p: 2, bgcolor: 'background.paper', borderRadius: 2 }}>
                  <Typography variant="subtitle2" gutterBottom fontWeight="bold">
                    <CrowdIcon sx={{ fontSize: 16, mr: 0.7, color: '#f44336', verticalAlign: 'text-bottom' }} />
                    Lotação
                  </Typography>
                  <Rating
                    name="crowding"
                    value={userRating.crowding}
                    onChange={(e, newValue) => handleRatingChange('crowding', newValue)}
                  />
                </Box>
              </Grid>
            </Grid>
            
            <Typography variant="h6" fontWeight="medium" gutterBottom>
              Deixe um comentário (opcional)
            </Typography>
            <TextField
              multiline
              rows={4}
              fullWidth
              placeholder="Compartilhe sua experiência para ajudar outras pessoas..."
              value={userRating.comment}
              onChange={(e) => handleRatingChange('comment', e.target.value)}
              variant="outlined"
              sx={{ 
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2
                }
              }}
            />
          </Box>
        </DialogContent>
        
        <DialogActions sx={{ px: 3, pb: 3, pt: 1, gap: 1 }}>
          <Button 
            onClick={handleCloseRatingDialog} 
            variant="outlined"
            sx={{ 
              borderRadius: 6,
              px: 3,
              fontWeight: 600
            }}
          >
            Cancelar
          </Button>
          <Button 
            onClick={handleSubmitRating} 
            variant="contained" 
            color="primary"
            disabled={userRating.overall === 0}
            sx={{ 
              borderRadius: 6,
              px: 3,
              fontWeight: 600,
              boxShadow: '0 2px 8px rgba(25, 118, 210, 0.3)'
            }}
          >
            Enviar avaliação
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default FacilityRating;
