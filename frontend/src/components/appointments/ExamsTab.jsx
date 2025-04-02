import React from 'react';
import { 
  Typography, Box, TextField, Button, Chip, 
  FormControl, InputLabel, MenuItem, Select 
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { SearchBar } from './StyledComponents';

const ExamsTab = ({ 
  searchTerm, 
  setSearchTerm, 
  selectedExam, 
  setSelectedExam, 
  exams, 
  healthPlan, 
  setHealthPlan, 
  handleSearch 
}) => {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Agendamento de Exames
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        Encontre os melhores laboratórios e clínicas em Camaçari para realizar seus exames. Informe o seu plano de saúde para visualizar apenas locais conveniados.
      </Typography>
      
      <SearchBar>
        <TextField
          fullWidth
          label="Buscar exame"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ mr: 1 }}
          placeholder="Digite o nome do exame desejado (ex: Hemograma, Raio-X...)"
        />
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleSearch}
          startIcon={<SearchIcon />}
          size="large"
        >
          Buscar
        </Button>
      </SearchBar>
      
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          Exames populares:
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
          {exams.slice(0, 8).map((exam) => (
            <Chip 
              key={exam.id} 
              label={exam.name}
              onClick={() => {
                setSelectedExam(exam.name);
                setSearchTerm(exam.name);
              }}
              color={selectedExam === exam.name ? "primary" : "default"}
              sx={{ mb: 1, px: 1 }}
            />
          ))}
        </Box>
      </Box>
      
      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel>Plano de Saúde</InputLabel>
        <Select
          value={healthPlan}
          label="Plano de Saúde"
          onChange={(e) => setHealthPlan(e.target.value)}
        >
          <MenuItem value=""><em>Nenhum (Particular)</em></MenuItem>
          <MenuItem value="unimed">Unimed</MenuItem>
          <MenuItem value="amil">Amil</MenuItem>
          <MenuItem value="sulamerica">SulAmérica</MenuItem>
          <MenuItem value="bradesco">Bradesco Saúde</MenuItem>
          <MenuItem value="hapvida">Hapvida</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default ExamsTab;
