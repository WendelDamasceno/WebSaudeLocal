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
  CircularProgress,
  Paper
} from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import { 
  ArrowBack as ArrowBackIcon,
  Email as EmailIcon,
  KeyboardReturn as CodeIcon,
  Lock as LockIcon,
  CheckCircle as CheckCircleIcon
} from '@mui/icons-material';

const steps = ['Email', 'Verificação', 'Nova Senha'];

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    code: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (activeStep === 0) {
        // Simular envio de código para o email
        await new Promise(resolve => setTimeout(resolve, 1500));
        setActiveStep(1);
      } else if (activeStep === 1) {
        // Simular verificação do código
        await new Promise(resolve => setTimeout(resolve, 1000));
        if (formData.code !== '123456') { // Código para teste
          throw new Error('Código de verificação inválido. Para testar, use: 123456');
        }
        setActiveStep(2);
      } else if (activeStep === 2) {
        // Simular atualização da senha
        await new Promise(resolve => setTimeout(resolve, 1500));
        if (formData.newPassword !== formData.confirmPassword) {
          throw new Error('As senhas não coincidem.');
        }
        if (formData.newPassword.length < 6) {
          throw new Error('A senha deve ter pelo menos 6 caracteres.');
        }
        setSuccess(true);
        // Redirecionar para login após 2 segundos
        setTimeout(() => navigate('/login'), 2000);
      }
    } catch (err) {
      setError(err.message || 'Ocorreu um erro. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleBackClick = () => {
    if (activeStep === 0) {
      navigate('/login');
    } else {
      setActiveStep(activeStep - 1);
    }
  };

  // Conteúdo baseado na etapa atual
  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Digite seu email para receber um código de recuperação.
            </Typography>
            <TextField
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
              sx={{ 
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                }
              }}
            />
          </>
        );
      case 1:
        return (
          <>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Digite o código de 6 dígitos enviado para <strong>{formData.email}</strong>
            </Typography>
            <TextField
              fullWidth
              label="Código de verificação"
              required
              value={formData.code}
              onChange={(e) => setFormData({ ...formData, code: e.target.value })}
              placeholder="Digite o código de 6 dígitos"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CodeIcon color="primary" />
                  </InputAdornment>
                ),
              }}
              sx={{ 
                mb: 1,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                }
              }}
            />
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
              <Button 
                color="primary"
                onClick={() => {
                  // Simular reenvio de código
                  setLoading(true);
                  setTimeout(() => {
                    setLoading(false);
                    setError('Para teste, use o código: 123456');
                  }, 1000);
                }}
                disabled={loading}
                sx={{ textTransform: 'none' }}
              >
                Reenviar código
              </Button>
            </Box>
          </>
        );
      case 2:
        return (
          <>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Defina sua nova senha
            </Typography>
            <TextField
              fullWidth
              label="Nova senha"
              type="password"
              required
              value={formData.newPassword}
              onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon color="primary" />
                  </InputAdornment>
                ),
              }}
              sx={{ 
                mb: 2,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                }
              }}
            />
            <TextField
              fullWidth
              label="Confirmar nova senha"
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
              sx={{ 
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                }
              }}
            />
          </>
        );
      default:
        return null;
    }
  };

  if (success) {
    return (
      <Box 
        sx={{ 
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          maxWidth: '480px',
          margin: '0 auto',
          minHeight: '100vh',
          backgroundColor: '#f8f9fa'
        }}
      >
        <Paper 
          sx={{ 
            p: 4, 
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
            borderRadius: 0,
            height: '100vh',
            justifyContent: 'center'
          }}
        >
          <CheckCircleIcon sx={{ fontSize: 64, color: 'success.main' }} />
          <Typography variant="h5" fontWeight="bold">
            Senha alterada com sucesso!
          </Typography>
          <Typography color="text.secondary">
            Redirecionando para a tela de login...
          </Typography>
          <CircularProgress size={24} sx={{ mt: 2 }} />
        </Paper>
      </Box>
    );
  }

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
      {/* Cabeçalho */}
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        p: 2, 
        pb: 1.5,
        backgroundColor: 'white',
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
      }}>
        <IconButton 
          onClick={handleBackClick}
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography 
          variant="h6" 
          sx={{ 
            fontSize: '1.125rem',
            fontWeight: 'bold',
            flex: 1,
            textAlign: 'center',
            color: '#111518',
            mr: 6 // Compensar o espaço do botão para centralizar
          }}
        >
          Recuperar Senha
        </Typography>
      </Box>

      {/* Stepper */}
      <Box sx={{ bgcolor: 'white', pt: 2, pb: 1 }}>
        <Stepper 
          activeStep={activeStep} 
          alternativeLabel
          sx={{ px: 2 }}
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>

      {/* Conteúdo */}
      <Box sx={{ p: 3, flex: 1 }}>
        <Paper 
          elevation={0} 
          sx={{ 
            p: 3, 
            borderRadius: 2,
            bgcolor: 'white'
          }}
        >
          {error && (
            <Alert 
              severity="error" 
              sx={{ 
                mb: 3,
                borderRadius: 2
              }}
            >
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            {renderStepContent()}

            <Button
              fullWidth
              variant="contained"
              color="primary"
              type="submit"
              disabled={loading}
              sx={{ 
                py: 1.5, 
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 'bold'
              }}
            >
              {loading ? (
                <>
                  <CircularProgress size={24} color="inherit" sx={{ mr: 1 }} />
                  {activeStep === 0 ? 'Enviando...' : 
                   activeStep === 1 ? 'Verificando...' : 
                   'Alterando senha...'}
                </>
              ) : (
                activeStep === 0 ? 'Enviar código' : 
                activeStep === 1 ? 'Verificar código' : 
                'Alterar senha'
              )}
            </Button>
          </form>
        </Paper>
      </Box>

      {/* Rodapé */}
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          Lembrou sua senha? <Link to="/login" style={{ color: '#1976d2', textDecoration: 'none', fontWeight: 'bold' }}>Voltar ao login</Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default ForgotPassword;
