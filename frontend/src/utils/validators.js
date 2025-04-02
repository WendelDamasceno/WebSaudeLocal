export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePassword = (password) => {
  return {
    isValid: password.length >= 8,
    message: password.length < 8 ? 'A senha deve ter pelo menos 8 caracteres' : ''
  };
};

export const validateCPF = (cpf) => {
  // Add CPF validation logic here
  return cpf.length === 11;
};
