import React, { useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  TextField,
  Button,
  Stepper,
  Step,
  StepLabel,
  InputAdornment,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  styled,
  CircularProgress
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  ArrowForward as ArrowForwardIcon,
  Person as PersonIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  Lock as LockIcon,
  Cake as CakeIcon,
  LocationOn as LocationIcon,
  Check as CheckIcon,
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

const StyledSelect = styled(FormControl)(({ theme }) => ({
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

const steps = ['Dados Pessoais', 'Contato', 'Acesso'];

const Register = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    birthDate: '',
    gender: '',
    cpf: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    address: '',
    termsAccepted: false
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (activeStep < steps.length - 1) {
      handleNext();
      return;
    }
    
    if (!formData.termsAccepted) {
      setError('Você precisa aceitar os termos de uso');
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }
    
    setLoading(true);
    setError('');

    try {
      // Simulação de API
      await new Promise(resolve => setTimeout(resolve, 1000));
      navigate('/login');
    } catch (err) {
      setError('Erro ao criar conta. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <StyledInput
                fullWidth
                label="Nome"
                required
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon color="primary" />
                    </InputAdornment>
                  ),
                }}
              />
              <StyledInput
                fullWidth
                label="Sobrenome"
                required
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              />
            </Box>
            
            <StyledInput
              fullWidth
              label="Data de Nascimento"
              type="date"
              required
              InputLabelProps={{ shrink: true }}
              value={formData.birthDate}
              onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CakeIcon color="primary" />
                  </InputAdornment>
                ),
              }}
            />
            
            <StyledSelect fullWidth>
              <InputLabel>Gênero</InputLabel>
              <Select
                value={formData.gender}
                label="Gênero"
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
              >
                <MenuItem value="masculino">Masculino</MenuItem>
                <MenuItem value="feminino">Feminino</MenuItem>
                <MenuItem value="outro">Outro</MenuItem>
                <MenuItem value="naoInformar">Prefiro não informar</MenuItem>
              </Select>
            </StyledSelect>
            
            <StyledInput
              fullWidth
              label="CPF"
              required
              value={formData.cpf}
              onChange={(e) => setFormData({ ...formData, cpf: e.target.value })}
              placeholder="000.000.000-00"
            />
          </>
        );
      case 1:
        return (
          <>
            <StyledInput
              fullWidth
              label="Telefone"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="(00) 00000-0000"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PhoneIcon color="primary" />
                  </InputAdornment>
                ),
              }}
            />
            
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
              label="Endereço"
              required
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              placeholder="Rua, número, bairro, cidade, estado"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LocationIcon color="primary" />
                  </InputAdornment>
                ),
              }}
            />
          </>
        );
      case 2:
        return (
          <>
            <StyledInput
              fullWidth
              label="Senha"
              type="password"
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon color="primary" />
                  </InputAdornment>
                ),
              }}
            />
            
            <StyledInput
              fullWidth
              label="Confirmar Senha"
              type="password"
              required
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon color="primary" />
                  </InputAdornment>
                ),
              }}
            />
            
            <FormControlLabel
              control={
                <Checkbox 
                  checked={formData.termsAccepted}
                  onChange={(e) => setFormData({ ...formData, termsAccepted: e.target.checked })}
                  color="primary"
                />
              }
              label={
                <Typography variant="body2">
                  Li e aceito os{' '}
                  <Link to="/terms" style={{ color: '#1976d2', textDecoration: 'none' }}>
                    termos de uso
                  </Link>{' '}
                  e{' '}
                  <Link to="/privacy" style={{ color: '#1976d2', textDecoration: 'none' }}>
                    política de privacidade
                  </Link>
                </Typography>
              }
            />
          </>
        );
      default:
        return null;
    }
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
      {/* Cabeçalho */}
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        p: 2, 
        pb: 1,
        position: 'relative'
      }}>
        <IconButton 
          onClick={() => navigate('/login')}
          sx={{ position: 'absolute', left: 8 }}
        >
          <ArrowBackIcon />
        </IconButton>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {/* Substituindo a imagem por um ícone */}
          <Box 
            sx={{ 
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 48,
              height: 48,
              backgroundColor: '#1976d2',
              borderRadius: '50%',
              mb: 1
            }}
          >
            <HealthIcon sx={{ fontSize: 28, color: 'white' }} />
          </Box>
          <Typography 
            variant="h6" 
            sx={{ 
              fontSize: '1.125rem',
              fontWeight: 'bold',
              textAlign: 'center',
              color: '#1976d2',
              letterSpacing: '-0.015em',
            }}
          >
            Criar Conta
          </Typography>
        </Box>
      </Box>

      {/* Stepper */}
      <Box sx={{ 
        px: 2, 
        pt: 3, 
        pb: 2
      }}>
        <Stepper 
          activeStep={activeStep} 
          alternativeLabel
          sx={{ 
            '& .MuiStepLabel-label': {
              color: 'text.secondary',
              fontSize: '0.75rem',
              mt: 0.5
            },
            '& .MuiStepLabel-labelActive': {
              color: 'primary.main',
              fontWeight: 'bold'
            }
          }}
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>

      {/* Formulário */}
      <Box sx={{ 
        p: 3,
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
          {renderStepContent()}
          
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            mt: 2
          }}>
            <Button
              variant="text"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ 
                visibility: activeStep === 0 ? 'hidden' : 'visible',
                color: '#60778a',
                textTransform: 'none'
              }}
            >
              Voltar
            </Button>
            
            <ActionButton
              type="submit"
              variant="contained"
              disabled={loading}
              endIcon={activeStep === steps.length - 1 ? 
                (loading ? <CircularProgress size={20} color="inherit" /> : <CheckIcon />) : 
                <ArrowForwardIcon />
              }
            >
              {activeStep === steps.length - 1 ? 
                (loading ? 'Criando conta...' : 'Criar conta') : 
                'Próximo'
              }
            </ActionButton>
          </Box>
        </form>

        {/* Rodapé */}
        <Box sx={{ 
          mt: 'auto', 
          textAlign: 'center', 
          pt: 4
        }}>
          <Typography variant="body2" color="text.secondary">
            Já tem uma conta?{' '}
            <Link 
              to="/login" 
              style={{ 
                color: '#1976d2', 
                textDecoration: 'none',
                fontWeight: 'bold'
              }}
            >
              Entre aqui
            </Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Register;
