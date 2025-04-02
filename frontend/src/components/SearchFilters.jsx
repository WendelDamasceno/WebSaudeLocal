import React from 'react';
import {
  Drawer,
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Slider,
  Button,
  Chip,
  IconButton
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

const SearchFilters = ({ open, onClose, filters, onChange }) => {
  const [localFilters, setLocalFilters] = React.useState(filters);

  const handleChange = (key, value) => {
    setLocalFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleApply = () => {
    onChange(localFilters);
    onClose();
  };

  return (
    <Drawer
      anchor="bottom"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          height: '80vh',
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          p: 2
        }
      }}
    >
      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6">Filtros</Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography gutterBottom>Tipo de Unidade</Typography>
        <FormGroup>
          {['Hospital', 'UBS', 'Clínica', 'Farmácia'].map(type => (
            <FormControlLabel
              key={type}
              control={
                <Checkbox
                  checked={localFilters.types.includes(type)}
                  onChange={(e) => {
                    const types = e.target.checked 
                      ? [...localFilters.types, type]
                      : localFilters.types.filter(t => t !== type);
                    handleChange('types', types);
                  }}
                />
              }
              label={type}
            />
          ))}
        </FormGroup>
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography gutterBottom>Tempo de Espera</Typography>
        <Slider
          value={localFilters.waitTime}
          onChange={(e, value) => handleChange('waitTime', value)}
          valueLabelDisplay="auto"
          step={15}
          marks
          min={0}
          max={180}
          valueLabelFormat={value => `${value}min`}
        />
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography gutterBottom>Avaliação Mínima</Typography>
        <Slider
          value={localFilters.rating}
          onChange={(e, value) => handleChange('rating', value)}
          valueLabelDisplay="auto"
          step={0.5}
          marks
          min={0}
          max={5}
          valueLabelFormat={value => `${value}⭐`}
        />
      </Box>

      <Button
        variant="contained"
        fullWidth
        onClick={handleApply}
        sx={{ mt: 2 }}
      >
        Aplicar Filtros
      </Button>
    </Drawer>
  );
};

export default SearchFilters;
