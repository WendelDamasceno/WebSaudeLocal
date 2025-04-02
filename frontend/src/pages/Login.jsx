import React, { useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  TextField,
  Button,
  InputAdornment,
  CircularProgress,
  Divider,
  Alert,
  styled
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Email as EmailIcon,
  Lock as LockIcon,
  Google as GoogleIcon,
  ArrowForward as ArrowForwardIcon,
  LocalHospital as HealthIcon // Adicionando ícone para usar como logo
} from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';

// Componentes estilizados
const StyledInput = styled(TextField)(({ theme }) => ({
  borderRadius: 12,
  '& .MuiOutlinedInput-root': {
    borderRadius: 12,
    backgroundColor: '#f8f9fa',
    '&.Mui-focused': {
      backgroundColor: '#fff',
      boxShadow: '0 4px 12px rgba(25, 118, 210, 0.15)'
    }
  }
}));

const ActionButton = styled(Button)(({ theme, color = 'primary' }) => ({
  borderRadius: 12,
  height: 48,
  padding: '0 16px',
  fontWeight: 600,
  textTransform: 'none',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  '&:hover': {
    boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
  }
}));

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      localStorage.setItem('token', 'demo-token');
      navigate('/home');
    } catch (err) {
      setError('Email ou senha inválidos');
    } finally {
      setLoading(false);
    }
  };

  const handleGuestAccess = () => {
    localStorage.setItem('guestMode', 'true');
    navigate('/home');
  };

  return (
    <Box sx={{ 
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      maxWidth: '480px', 
      margin: '0 auto',
      minHeight: '100vh',
      backgroundColor: 'white',
      fontFamily: '"Plus Jakarta Sans", "Noto Sans", sans-serif'
    }}>
      {/* Logo centralizado */}
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        pt: 6,
        pb: 4,
      }}>
        {/* Substituindo a imagem por um ícone */}
        <Box 
          sx={{ 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 120,
            height: 120,
            backgroundColor: '#1976d2',
            borderRadius: '50%',
            mb: 2,
            boxShadow: '0 8px 16px rgba(25, 118, 210, 0.2)'
          }}
        >
          <HealthIcon sx={{ fontSize: 64, color: 'white' }} />
        </Box>
        
        <Typography 
          variant="h5" 
          component="h1" 
          sx={{ 
            fontWeight: 'bold',
            textAlign: 'center',
            color: '#1976d2',
            letterSpacing: '-0.025em',
          }}
        >
          Saúde Local
        </Typography>
        <Typography 
          variant="body1" 
          sx={{ 
            textAlign: 'center', 
            color: '#60778a',
            maxWidth: '300px',
            mt: 1
          }}
        >
          Acesse para encontrar serviços de saúde próximos a você
        </Typography>
      </Box>

      {/* Formulário de Login */}
      <Box sx={{ 
        px: 3, 
        py: 3,
        display: 'flex',
        flexDirection: 'column',
        gap: 2.5,
        flex: 1,
        maxWidth: '400px',
        mx: 'auto',
        width: '100%'
      }}>
        {error && (
          <Alert 
            severity="error" 
            sx={{ 
              borderRadius: 3,
              boxShadow: '0 2px 8px rgba(211, 47, 47, 0.1)'
            }}
          >
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <StyledInput
            fullWidth
            label="Email"
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon color="primary" />
                </InputAdornment>
              ),
            }}
          />

          <StyledInput
            fullWidth
            label="Senha"
            type={showPassword ? 'text' : 'password'}
            required
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon color="primary" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <ActionButton
            fullWidth
            variant="contained"
            type="submit"
            disabled={loading}
            endIcon={loading ? 
              <CircularProgress size={20} color="inherit" /> : 
              <ArrowForwardIcon />
            }
            sx={{ mt: 1 }}
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </ActionButton>

          <Box sx={{ textAlign: 'center', mt: 1 }}>
            <Button
              component={Link}
              to="/forgot-password"
              sx={{ 
                textTransform: 'none',
                fontWeight: 500
              }}
            >
              Esqueceu sua senha?
            </Button>
          </Box>
        </form>

        <Divider sx={{ my: 2 }}>
          <Typography variant="body2" color="text.secondary" sx={{ px: 1 }}>
            ou continue com
          </Typography>
        </Divider>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <ActionButton
            fullWidth
            variant="outlined"
            startIcon={<GoogleIcon />}
            onClick={() => {/* Login com Google */}}
            sx={{
              color: '#4285F4',
              borderColor: 'rgba(66, 133, 244, 0.5)',
              '&:hover': {
                backgroundColor: 'rgba(66, 133, 244, 0.04)',
              }
            }}
          >
            Continuar com Google
          </ActionButton>

          <ActionButton
            fullWidth
            variant="outlined"
            onClick={handleGuestAccess}
            sx={{
              color: '#60778a',
              borderColor: '#dbe1e6',
            }}
          >
            Acessar como visitante
          </ActionButton>
        </Box>

        {/* Rodapé */}
        <Box sx={{ 
          mt: 'auto', 
          textAlign: 'center', 
          pt: 4,
          borderTop: '1px solid #f0f2f5'
        }}>
          <Typography variant="body2" color="text.secondary">
            Não tem uma conta?{' '}
            <Link 
              to="/register" 
              style={{ 
                color: '#1976d2', 
                textDecoration: 'none',
                fontWeight: 'bold'
              }}
            >
              Cadastre-se
            </Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
