import React, { useState, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { 
  Box, 
  Paper,
  BottomNavigation, 
  BottomNavigationAction,
  Slide,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  useTheme
} from '@mui/material';
import { 
  Home as HomeIcon, 
  CalendarMonth as CalendarIcon, 
  Search as SearchIcon, 
  Person as ProfileIcon,
  ArrowBack as BackIcon
} from '@mui/icons-material';

const MobileLayout = () => {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [value, setValue] = useState(0);
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [pageTitle, setPageTitle] = useState('Saúde Local');
  
  // Handle navigation
  const handleNavChange = (event, newValue) => {
    switch(newValue) {
      case 0:
        navigate('/');
        break;
      case 1:
        navigate('/appointments');
        break;
      case 2:
        navigate('/search');
        break;
      case 3:
        navigate('/profile');
        break;
      default:
        navigate('/');
    }
  };

  // Determine current navigation value based on path
  useEffect(() => {
    const path = location.pathname;
    if (path === '/') setValue(0);
    else if (path.includes('/appointments')) setValue(1);
    else if (path.includes('/search')) setValue(2);
    else if (path.includes('/profile')) setValue(3);
    
    // Set page title based on path
    if (path === '/') setPageTitle('Saúde Local');
    else if (path.includes('/appointments')) setPageTitle('Agendamentos');
    else if (path.includes('/search')) setPageTitle('Buscar');
    else if (path.includes('/profile')) setPageTitle('Meu Perfil');
    else if (path.includes('/health-card')) setPageTitle('Cartão de Saúde');
    else if (path.includes('/telemedicine')) setPageTitle('Teleconsulta');
    else if (path.includes('/emergency-guide')) setPageTitle('Guia de Emergência');
  }, [location]);
  
  // Hide header on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const st = window.pageYOffset || document.documentElement.scrollTop;
      if (st > lastScrollTop && st > 60) {
        // Scroll down
        setShowHeader(false);
      } else {
        // Scroll up
        setShowHeader(true);
      }
      setLastScrollTop(st <= 0 ? 0 : st);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollTop]);
  
  // Check if we should show back button
  const showBackButton = !['/', '/appointments', '/search', '/profile'].includes(location.pathname);

  return (
    <Box sx={{ 
      pb: `${theme.customVariables.bottomNavHeight + theme.customVariables.safeAreaBottom}px`,
      pt: `${theme.customVariables.headerHeight}px`,
      bgcolor: 'background.default',
      minHeight: '100vh',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* App Header */}
      <Slide appear={false} direction="down" in={showHeader}>
        <AppBar position="fixed" color="default" elevation={1} sx={{ bgcolor: 'background.paper' }}>
          <Toolbar sx={{ minHeight: theme.customVariables.headerHeight, px: 2 }}>
            {showBackButton ? (
              <IconButton edge="start" color="inherit" onClick={() => navigate(-1)}>
                <BackIcon />
              </IconButton>
            ) : (
              <Box sx={{ width: 40 }} /> // Spacer to maintain centering
            )}
            <Typography variant="h6" component="div" sx={{ 
              flexGrow: 1, 
              textAlign: 'center',
              fontWeight: 600,
              color: 'text.primary'
            }}>
              {pageTitle}
            </Typography>
            <Box sx={{ width: 40 }} /> {/* Spacer for symmetry */}
          </Toolbar>
        </AppBar>
      </Slide>

      {/* Main Content */}
      <Box sx={{ 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column',
        mx: 'auto',
        width: '100%',
        maxWidth: '100%',
        height: '100%'
      }}>
        <Outlet />
      </Box>

      {/* Bottom Navigation */}
      <Paper 
        sx={{ 
          position: 'fixed', 
          bottom: 0, 
          left: 0, 
          right: 0, 
          zIndex: 1100,
          borderRadius: '20px 20px 0 0',
          paddingBottom: `${theme.customVariables.safeAreaBottom}px`,
          boxShadow: '0 -2px 10px rgba(0,0,0,0.1)'
        }} 
        elevation={3}
      >
        <BottomNavigation
          showLabels
          value={value}
          onChange={handleNavChange}
        >
          <BottomNavigationAction 
            label="Início" 
            icon={<HomeIcon />} 
          />
          <BottomNavigationAction 
            label="Agendar" 
            icon={<CalendarIcon />} 
          />
          <BottomNavigationAction 
            label="Buscar" 
            icon={<SearchIcon />} 
          />
          <BottomNavigationAction 
            label="Perfil" 
            icon={<ProfileIcon />} 
          />
        </BottomNavigation>
      </Paper>
    </Box>
  );
};

export default MobileLayout;
