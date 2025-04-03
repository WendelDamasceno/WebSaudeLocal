import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  IconButton, 
  Button, 
  Avatar, 
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  Paper,
  Card,
  CardContent,
  Grid,
  Badge,
  CircularProgress,
  AppBar,
  Toolbar
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { 
  Edit as EditIcon,
  Lock as LockIcon,
  Bookmark as BookmarkIcon,
  History as HistoryIcon,
  Star as StarIcon,
  Diamond as DiamondIcon,
  ArrowForwardIos as ArrowForwardIcon,
  CalendarToday as CalendarIcon,
  ArrowBack as ArrowBackIcon
} from '@mui/icons-material';

const UserProfile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulação de carregamento de dados do usuário
    const fetchUserData = async () => {
      setLoading(true);
      try {
        // Simular atraso de rede
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Dados de exemplo do usuário
        const mockUserData = {
          name: 'Maria Santos',
          email: 'maria.santos@exemplo.com',
          joinedDate: '2022',
          favoriteCount: 8,
          historyCount: 12,
          reviewCount: 5,
          isPremium: false
        };
        
        setUserData(mockUserData);
      } catch (error) {
        console.error('Erro ao carregar dados do usuário:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleEditProfile = () => {
    navigate('/edit-profile');
  };

  const handleChangePassword = () => {
    navigate('/change-password');
  };

  const handleUpgradeToPremium = () => {
    navigate('/premium');
  };

  return (
    <Box 
      sx={{ 
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        maxWidth: '480px', 
        margin: '0 auto',
        minHeight: '100vh',
        backgroundColor: '#f8f9fa',
        fontFamily: '"Plus Jakarta Sans", "Noto Sans", sans-serif'
      }}
    >
      <AppBar 
        position="fixed"
        color="default"
        elevation={0}
        sx={{ 
          maxWidth: '480px', 
          margin: '0 auto',
          left: '50%',
          transform: 'translateX(-50%)',
          right: 'auto',
          width: '100%',
          borderBottom: '1px solid',
          borderColor: 'divider' 
        }}
      >
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={() => navigate(-1)}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            Meu Perfil
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Perfil do usuário */}
      <Box sx={{ p: 3, backgroundColor: 'white', mt: 8 }}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
              <Badge
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                badgeContent={
                  <IconButton 
                    size="small" 
                    sx={{ 
                      bgcolor: 'primary.main', 
                      color: 'white',
                      '&:hover': { bgcolor: 'primary.dark' }
                    }}
                    onClick={handleEditProfile}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                }
              >
                <Avatar
                  sx={{ 
                    width: 100, 
                    height: 100, 
                    fontSize: 40,
                    bgcolor: 'primary.main',
                    color: 'white',
                    mb: 1
                  }}
                >
                  {userData?.name.charAt(0)}
                </Avatar>
              </Badge>
              <Typography variant="h5" sx={{ fontWeight: 'bold', mt: 1 }}>
                {userData?.name}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {userData?.email}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Membro desde {userData?.joinedDate}
              </Typography>

              <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                <Button
                  variant="outlined"
                  startIcon={<EditIcon />}
                  sx={{ borderRadius: 2 }}
                  onClick={handleEditProfile}
                >
                  Editar Perfil
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<LockIcon />}
                  sx={{ borderRadius: 2 }}
                  onClick={handleChangePassword}
                >
                  Mudar Senha
                </Button>
              </Box>
            </Box>
          </>
        )}
      </Box>

      {/* Acessos Rápidos */}
      <Paper elevation={0} sx={{ mt: 2, bgcolor: 'white' }}>
        <Typography variant="subtitle1" sx={{ p: 2, fontWeight: 'bold' }}>
          Acessos Rápidos
        </Typography>
        <Grid container spacing={2} sx={{ px: 2, pb: 2 }}>
          <Grid item xs={4}>
            <Card 
              sx={{ textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', borderRadius: 3, cursor: 'pointer' }}
              onClick={() => navigate('/favorites')}
            >
              <CardContent>
                <BookmarkIcon color="primary" sx={{ fontSize: 32, mb: 1 }} />
                <Typography variant="body2" sx={{ fontWeight: 'medium' }}>Favoritos</Typography>
                <Typography variant="caption" color="text.secondary">
                  {userData?.favoriteCount || 0} itens
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card 
              sx={{ textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', borderRadius: 3, cursor: 'pointer' }}
              onClick={() => navigate('/history')}
            >
              <CardContent>
                <HistoryIcon color="primary" sx={{ fontSize: 32, mb: 1 }} />
                <Typography variant="body2" sx={{ fontWeight: 'medium' }}>Histórico</Typography>
                <Typography variant="caption" color="text.secondary">
                  {userData?.historyCount || 0} itens
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card 
              sx={{ textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', borderRadius: 3, cursor: 'pointer' }}
              onClick={() => navigate('/reviews')}
            >
              <CardContent>
                <StarIcon color="primary" sx={{ fontSize: 32, mb: 1 }} />
                <Typography variant="body2" sx={{ fontWeight: 'medium' }}>Avaliações</Typography>
                <Typography variant="caption" color="text.secondary">
                  {userData?.reviewCount || 0} itens
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Paper>

      {/* Lista de opções */}
      <Paper elevation={0} sx={{ mt: 2, bgcolor: 'white' }}>
        <List>
          <ListItem 
            button 
            onClick={() => navigate('/favorites')}
          >
            <ListItemIcon>
              <BookmarkIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Meus Favoritos" />
            <ListItemSecondaryAction>
              <IconButton edge="end">
                <ArrowForwardIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
          
          <Divider variant="inset" />
          
          <ListItem 
            button 
            onClick={() => navigate('/history')}
          >
            <ListItemIcon>
              <HistoryIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Histórico de Consultas" />
            <ListItemSecondaryAction>
              <IconButton edge="end">
                <ArrowForwardIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
          
          <Divider variant="inset" />
          
          <ListItem 
            button
            onClick={() => navigate('/appointments')}
          >
            <ListItemIcon>
              <CalendarIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Meus Agendamentos" />
            <ListItemSecondaryAction>
              <IconButton edge="end">
                <ArrowForwardIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
          
          <Divider variant="inset" />
          
          <ListItem 
            button
            onClick={() => navigate('/reviews')}
          >
            <ListItemIcon>
              <StarIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Minhas Avaliações" />
            <ListItemSecondaryAction>
              <IconButton edge="end">
                <ArrowForwardIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      </Paper>

      {/* Seção Premium */}
      <Paper elevation={0} sx={{ mt: 2, bgcolor: 'white', mb: 4 }}>
        <Box 
          sx={{ 
            m: 2, 
            p: 3, 
            borderRadius: 3, 
            background: userData?.isPremium 
              ? 'linear-gradient(135deg, #1976d2, #64b5f6)' 
              : 'linear-gradient(135deg, #f5f5f5, #ffffff)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            display: 'flex',
            alignItems: 'center',
            gap: 2
          }}
        >
          <DiamondIcon sx={{ 
            fontSize: 40, 
            color: userData?.isPremium ? 'white' : 'primary.main' 
          }} />
          <Box sx={{ flex: 1 }}>
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 'bold',
                color: userData?.isPremium ? 'white' : 'text.primary'
              }}
            >
              {userData?.isPremium ? 'Plano Premium Ativo' : 'Conheça o Plano Premium'}
            </Typography>
            <Typography 
              variant="body2"
              sx={{ 
                color: userData?.isPremium ? 'rgba(255,255,255,0.9)' : 'text.secondary',
                mb: 1
              }}
            >
              {userData?.isPremium 
                ? 'Aproveite todos os benefícios exclusivos' 
                : 'Mais recursos, sem anúncios e suporte prioritário'
              }
            </Typography>
            <Button 
              variant="contained" 
              size="small"
              onClick={handleUpgradeToPremium}
              sx={{ 
                borderRadius: 8,
                px: 2,
                bgcolor: userData?.isPremium ? 'white' : 'primary.main',
                color: userData?.isPremium ? 'primary.main' : 'white',
                '&:hover': {
                  bgcolor: userData?.isPremium ? 'rgba(255,255,255,0.9)' : 'primary.dark'
                }
              }}
            >
              {userData?.isPremium ? 'Gerenciar Assinatura' : 'Ver Planos'}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default UserProfile;
