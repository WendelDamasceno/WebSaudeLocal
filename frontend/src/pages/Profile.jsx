import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Avatar,
  Button,
  Grid,
  TextField,
  Divider,
  Switch,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction
} from '@mui/material';
import { Person as PersonIcon } from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';

const Profile = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState(true);

  return (
    <Container maxWidth="md">
      <Paper sx={{ p: 3, mt: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Avatar sx={{ width: 80, height: 80, mr: 2 }}>
            <PersonIcon sx={{ fontSize: 40 }} />
          </Avatar>
          <Box>
            <Typography variant="h5">{user?.name || 'Usuário'}</Typography>
            <Typography color="textSecondary">{user?.email}</Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>Informações Pessoais</Typography>
            <TextField
              fullWidth
              label="Nome"
              margin="normal"
              defaultValue={user?.name}
            />
            <TextField
              fullWidth
              label="Email"
              margin="normal"
              defaultValue={user?.email}
            />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>Preferências</Typography>
            <List>
              <ListItem>
                <ListItemText primary="Notificações" />
                <ListItemSecondaryAction>
                  <Switch
                    checked={notifications}
                    onChange={(e) => setNotifications(e.target.checked)}
                  />
                </ListItemSecondaryAction>
              </ListItem>
            </List>
          </Grid>
        </Grid>

        <Box sx={{ mt: 3 }}>
          <Button variant="contained" color="primary">
            Salvar Alterações
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Profile;
