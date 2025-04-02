import React from 'react';
import {
  Box, Typography, List, ListItem, ListItemButton,
  ListItemIcon, ListItemText, Divider, TextField,
  Chip, IconButton
} from '@mui/material';
import {
  Search as SearchIcon,
  LocalHospital as HospitalIcon,
  Biotech as BiotechIcon,
  Star as StarIcon
} from '@mui/icons-material';

const specialties = [
  { id: 1, name: 'Clínico Geral', icon: HospitalIcon, rating: 4.8, waitTime: '20min' },
  { id: 2, name: 'Cardiologia', icon: HospitalIcon, rating: 4.5, waitTime: '35min' },
  { id: 3, name: 'Pediatria', icon: HospitalIcon, rating: 4.7, waitTime: '25min' },
  { id: 4, name: 'Dermatologia', icon: HospitalIcon, rating: 4.6, waitTime: '40min' }
];

const exams = [
  { id: 1, name: 'Hemograma Completo', icon: BiotechIcon, price: 'R$ 80,00' },
  { id: 2, name: 'Raio-X', icon: BiotechIcon, price: 'R$ 120,00' },
  { id: 3, name: 'Ultrassonografia', icon: BiotechIcon, price: 'R$ 180,00' },
  { id: 4, name: 'Eletrocardiograma', icon: BiotechIcon, price: 'R$ 150,00' }
];

const SelectSpecialty = ({ type, onSelect }) => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const items = type === 'consulta' ? specialties : exams;

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box>
      <Box sx={{ p: 2, bgcolor: 'background.paper' }}>
        <TextField
          fullWidth
          placeholder={`Buscar ${type === 'consulta' ? 'especialidade' : 'exame'}...`}
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />
          }}
        />
      </Box>

      <List>
        {filteredItems.map((item, index) => (
          <React.Fragment key={item.id}>
            {index > 0 && <Divider />}
            <ListItemButton onClick={() => onSelect(item)}>
              <ListItemIcon>
                <item.icon color="primary" />
              </ListItemIcon>
              <ListItemText
                primary={item.name}
                secondary={
                  type === 'consulta' ? (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <StarIcon sx={{ fontSize: 16, color: 'warning.main' }} />
                      <Typography variant="body2" component="span">
                        {item.rating}
                      </Typography>
                      <Chip 
                        size="small" 
                        label={`Espera: ${item.waitTime}`}
                        sx={{ height: 20 }}
                      />
                    </Box>
                  ) : item.price
                }
              />
            </ListItemButton>
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};

export default SelectSpecialty;
