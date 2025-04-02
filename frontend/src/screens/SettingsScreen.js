import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Switch,
  Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { theme } from '../styles/theme';

const SettingsScreen = ({ navigation }) => {
  const [notifications, setNotifications] = useState({
    waitTime: true,
    newUnits: true,
    campaigns: true,
    chat: true
  });

  const [locationEnabled, setLocationEnabled] = useState(true);

  const toggleNotification = (key) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleLogout = () => {
    Alert.alert(
      "Sair",
      "Tem certeza que deseja sair da sua conta?",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Sair", onPress: () => navigation.navigate('Login') }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Configurações</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notificações</Text>
        
        <View style={styles.settingItem}>
          <Text style={styles.settingText}>Tempo de espera</Text>
          <Switch
            value={notifications.waitTime}
            onValueChange={() => toggleNotification('waitTime')}
            trackColor={{ false: '#E0E0E0', true: `${theme.colors.primary}80` }}
            thumbColor={notifications.waitTime ? theme.colors.primary : '#F4F4F4'}
          />
        </View>
        
        {/* Mais itens de configuração... */}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Privacidade</Text>
        
        <View style={styles.settingItem}>
          <Text style={styles.settingText}>Localização</Text>
          <Switch
            value={locationEnabled}
            onValueChange={setLocationEnabled}
            trackColor={{ false: '#E0E0E0', true: `${theme.colors.primary}80` }}
            thumbColor={locationEnabled ? theme.colors.primary : '#F4F4F4'}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Sobre</Text>
        
        <TouchableOpacity style={styles.linkItem}>
          <Text style={styles.linkText}>Termos de Uso</Text>
          <Icon name="chevron-right" size={24} color={theme.colors.textSecondary} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.linkItem}>
          <Text style={styles.linkText}>Política de Privacidade</Text>
          <Icon name="chevron-right" size={24} color={theme.colors.textSecondary} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Icon name="logout" size={24} color={theme.colors.emergency} />
        <Text style={styles.logoutText}>Sair da conta</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing.md,
    backgroundColor: theme.colors.card,
    ...theme.shadow.small,
  },
  // ... restante dos estilos
});

export default SettingsScreen;
