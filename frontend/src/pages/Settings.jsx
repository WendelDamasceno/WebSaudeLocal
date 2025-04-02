import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  IconButton, 
  List, 
  ListItem, 
  ListItemText, 
  Switch,
  Divider,
  ListItemIcon,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Slider,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowBack as ArrowBackIcon,
  Notifications as NotificationsIcon,
  Security as SecurityIcon,
  VisibilityOff as PrivacyIcon,
  Storage as DataIcon,
  Language as LanguageIcon,
  Palette as ThemeIcon,
  VolumeUp as SoundIcon,
  Fingerprint as BiometricIcon,
  Logout as LogoutIcon,
  HelpOutline as HelpIcon,
  Info as AboutIcon
} from '@mui/icons-material';

const Settings = () => {
  const navigate = useNavigate();
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [biometricEnabled, setBiometricEnabled] = useState(false);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [fontScale, setFontScale] = useState(1);
  const [language, setLanguage] = useState('pt-BR');

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleLogoutClick = () => {
    setLogoutDialogOpen(true);
  };

  const handleConfirmLogout = () => {
    // Implementação futura: lógica de logout
    localStorage.removeItem('token');
    setLogoutDialogOpen(false);
    navigate('/login');
  };

  const handleCancelLogout = () => {
    setLogoutDialogOpen(false);
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
        backgroundColor: 'white',
        fontFamily: '"Plus Jakarta Sans", "Noto Sans", sans-serif'
      }}
    >
      {/* Cabeçalho */}
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        p: 2, 
        pb: 1,
        backgroundColor: 'white',
        position: 'sticky',
        top: 0,
        zIndex: 10
      }}>
        <IconButton 
          onClick={handleBackClick}
          sx={{ mr: 1 }}
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography 
          variant="h6" 
          sx={{ 
            fontSize: '1.125rem',
            fontWeight: 'bold',
            color: '#111518',
            letterSpacing: '-0.015em',
            lineHeight: 'tight'
          }}
        >
          Configurações
        </Typography>
      </Box>

      <Typography 
        variant="subtitle2" 
        color="text.secondary"
        sx={{ px: 2, pt: 2, pb: 1 }}
      >
        Preferências do Aplicativo
      </Typography>

      {/* Lista de Configurações */}
      <List>
        {/* Notificações */}
        <ListItem>
          <ListItemIcon>
            <NotificationsIcon color="primary" />
          </ListItemIcon>
          <ListItemText 
            primary="Notificações" 
            secondary="Receber alertas do aplicativo"
          />
          <Switch 
            edge="end"
            checked={notificationsEnabled}
            onChange={(e) => setNotificationsEnabled(e.target.checked)}
          />
        </ListItem>
        
        <Divider variant="inset" component="li" />
        
        {/* Som */}
        <ListItem>
          <ListItemIcon>
            <SoundIcon color="primary" />
          </ListItemIcon>
          <ListItemText 
            primary="Sons" 
            secondary="Sons e alertas do aplicativo"
          />
          <Switch 
            edge="end"
            checked={soundEnabled}
            onChange={(e) => setSoundEnabled(e.target.checked)}
          />
        </ListItem>
        
        <Divider variant="inset" component="li" />
        
        {/* Tema */}
        <ListItem>
          <ListItemIcon>
            <ThemeIcon color="primary" />
          </ListItemIcon>
          <ListItemText 
            primary="Tema Escuro" 
            secondary="Mudar para tema escuro"
          />
          <Switch 
            edge="end"
            checked={darkModeEnabled}
            onChange={(e) => setDarkModeEnabled(e.target.checked)}
          />
        </ListItem>
        
        <Divider variant="inset" component="li" />
        
        {/* Tamanho da Fonte */}
        <ListItem sx={{ flexDirection: 'column', alignItems: 'flex-start' }}>
          <Box sx={{ display: 'flex', width: '100%', mb: 1 }}>
            <ListItemIcon>
              <ThemeIcon color="primary" />
            </ListItemIcon>
            <ListItemText 
              primary="Tamanho da Fonte" 
              secondary="Ajustar o tamanho da fonte"
            />
          </Box>
          <Box sx={{ width: '100%', pl: 9, pr: 2 }}>
            <Slider
              value={fontScale}
              min={0.8}
              max={1.4}
              step={0.1}
              marks
              onChange={(e, newValue) => setFontScale(newValue)}
              valueLabelDisplay="auto"
              valueLabelFormat={(value) => `${Math.round(value * 100)}%`}
            />
          </Box>
        </ListItem>
        
        <Divider variant="inset" component="li" />

        {/* Idioma */}
        <ListItem sx={{ flexDirection: 'column', alignItems: 'flex-start' }}>
          <Box sx={{ display: 'flex', width: '100%', mb: 1 }}>
            <ListItemIcon>
              <LanguageIcon color="primary" />
            </ListItemIcon>
            <ListItemText 
              primary="Idioma" 
              secondary="Selecione o idioma do aplicativo"
            />
          </Box>
          <Box sx={{ width: '100%', pl: 9, pr: 2 }}>
            <FormControl component="fieldset">
              <RadioGroup
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                <FormControlLabel value="pt-BR" control={<Radio />} label="Português (Brasil)" />
                <FormControlLabel value="en-US" control={<Radio />} label="English (US)" />
                <FormControlLabel value="es" control={<Radio />} label="Español" />
              </RadioGroup>
            </FormControl>
          </Box>
        </ListItem>

        <Typography 
          variant="subtitle2" 
          color="text.secondary"
          sx={{ px: 2, pt: 3, pb: 1 }}
        >
          Privacidade e Segurança
        </Typography>

        {/* Biometria */}
        <ListItem>
          <ListItemIcon>
            <BiometricIcon color="primary" />
          </ListItemIcon>
          <ListItemText 
            primary="Autenticação Biométrica" 
            secondary="Usar biometria para login"
          />
          <Switch 
            edge="end"
            checked={biometricEnabled}
            onChange={(e) => setBiometricEnabled(e.target.checked)}
          />
        </ListItem>
        
        <Divider variant="inset" component="li" />

        {/* Privacidade */}
        <ListItem button onClick={() => navigate('/privacy-settings')}>
          <ListItemIcon>
            <PrivacyIcon color="primary" />
          </ListItemIcon>
          <ListItemText 
            primary="Privacidade" 
            secondary="Controle quem pode ver suas informações"
          />
        </ListItem>
        
        <Divider variant="inset" component="li" />

        {/* Dados */}
        <ListItem button onClick={() => navigate('/data-settings')}>
          <ListItemIcon>
            <DataIcon color="primary" />
          </ListItemIcon>
          <ListItemText 
            primary="Dados e Armazenamento" 
            secondary="Gerenciar dados do aplicativo"
          />
        </ListItem>
        
        <Divider variant="inset" component="li" />

        {/* Segurança */}
        <ListItem button onClick={() => navigate('/security-settings')}>
          <ListItemIcon>
            <SecurityIcon color="primary" />
          </ListItemIcon>
          <ListItemText 
            primary="Segurança" 
            secondary="Senhas e verificação em duas etapas"
          />
        </ListItem>

        <Typography 
          variant="subtitle2" 
          color="text.secondary"
          sx={{ px: 2, pt: 3, pb: 1 }}
        >
          Sobre e Suporte
        </Typography>

        {/* Ajuda */}
        <ListItem button onClick={() => navigate('/help')}>
          <ListItemIcon>
            <HelpIcon color="primary" />
          </ListItemIcon>
          <ListItemText 
            primary="Ajuda e Suporte" 
            secondary="Entre em contato conosco"
          />
        </ListItem>
        
        <Divider variant="inset" component="li" />

        {/* Sobre */}
        <ListItem button onClick={() => navigate('/about')}>
          <ListItemIcon>
            <AboutIcon color="primary" />
          </ListItemIcon>
          <ListItemText 
            primary="Sobre o Saúde Local" 
            secondary="Versão, licenças e informações"
          />
        </ListItem>
        
        <Divider variant="inset" component="li" />

        {/* Logout */}
        <ListItem 
          button 
          onClick={handleLogoutClick}
          sx={{ color: 'error.main' }}
        >
          <ListItemIcon>
            <LogoutIcon color="error" />
          </ListItemIcon>
          <ListItemText 
            primary="Sair" 
            primaryTypographyProps={{ color: 'error.main' }}
          />
        </ListItem>
      </List>

      {/* Diálogo de Logout */}
      <Dialog
        open={logoutDialogOpen}
        onClose={handleCancelLogout}
      >
        <DialogTitle>Sair da conta</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Tem certeza que deseja sair da sua conta? Você precisará fazer login novamente para acessar seus dados.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelLogout} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleConfirmLogout} color="error" variant="contained">
            Sair
          </Button>
        </DialogActions>
      </Dialog>

      {/* Espaçador */}
      <Box sx={{ height: 40, backgroundColor: 'white' }} />
    </Box>
  );
};

export default Settings;
