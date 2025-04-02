import React, { useState } from 'react';
import { 
  Typography, Box, Grid, Chip, TextField, 
  InputAdornment, FormControl, InputLabel, 
  Select, MenuItem, Autocomplete
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SelectSpecialtyOrExam = ({ 
  type, 
  specialties, 
  exams, 
  selectedSpecialty, 
  selectedExam, 
  healthPlan,
  onSpecialtySelect, 
  onExamSelect,
  onHealthPlanSelect
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const isConsultation = type === 'consultation';
  const items = isConsultation ? specialties : exams;
  const selectedValue = isConsultation ? selectedSpecialty : selectedExam;
  const onSelect = isConsultation ? onSpecialtySelect : onExamSelect;
  
  // Filter items based on search term
  const filteredItems = items.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Popular items
  const popularItems = items.slice(0, 8);
  
  const healthPlans = [
    { id: 'unimed', name: 'Unimed' },
    { id: 'amil', name: 'Amil' },
    { id: 'sulamerica', name: 'SulAmérica' },
    { id: 'bradesco', name: 'Bradesco Saúde' },
    { id: 'hapvida', name: 'Hapvida' }
  ];
  
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        {isConsultation 
          ? 'Selecione a especialidade médica' 
          : 'Selecione o exame desejado'}
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        {isConsultation 
          ? 'Busque pela especialidade médica que você precisa consultar.' 
          : 'Busque pelo exame que você precisa realizar.'}
      </Typography>
      
      <Autocomplete
        freeSolo
        id={isConsultation ? "specialty-search" : "exam-search"}
        options={items}
        getOptionLabel={(option) => typeof option === 'string' ? option : option.name}
        value={items.find(item => item.name === selectedValue) || null}
        onChange={(event, newValue) => {
          if (newValue && typeof newValue === 'object') {
            onSelect(newValue.name);
          }
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label={isConsultation ? "Buscar especialidade" : "Buscar exame"}
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              )
            }}
          />
        )}
      />
      
      <Typography variant="subtitle1" sx={{ mt: 3, mb: 1 }}>
        {isConsultation ? 'Especialidades populares:' : 'Exames populares:'}
      </Typography>
      
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {popularItems.map((item) => (
          <Chip
            key={item.id}
            label={item.name}
            clickable
            color={selectedValue === item.name ? "primary" : "default"}
            onClick={() => onSelect(item.name)}
            sx={{ mb: 1 }}
          />
        ))}
      </Box>
      
      {!isConsultation && (
        <Box sx={{ mt: 3 }}>
          <FormControl fullWidth margin="normal">
            <InputLabel id="health-plan-label">Plano de Saúde</InputLabel>
            <Select
              labelId="health-plan-label"
              id="health-plan-select"
              value={healthPlan}
              label="Plano de Saúde"
              onChange={(e) => onHealthPlanSelect(e.target.value)}
            >
              <MenuItem value="">
                <em>Nenhum (Particular)</em>
              </MenuItem>
              {healthPlans.map((plan) => (
                <MenuItem key={plan.id} value={plan.id}>
                  {plan.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      )}
    </Box>
  );
};

export default SelectSpecialtyOrExam;
