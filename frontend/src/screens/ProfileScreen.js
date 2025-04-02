import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { theme } from '../styles/theme';

const ProfileScreen = ({ navigation }) => {
  const user = {
    name: 'João Silva',
    email: 'joao.silva@email.com',
    photo: null // URL da foto do usuário
  };

  const menuItems = [
    {
      id: 'favorites',
      title: 'Favoritos',
      icon: 'heart-outline',
      screen: 'Favorites'
    },
    {
      id: 'history',
      title: 'Histórico',
      icon: 'history',
      screen: 'History'
    },
    {
      id: 'ratings',
      title: 'Minhas Avaliações',
      icon: 'star-outline',
      screen: 'MyRatings'
    },
    {
      id: 'premium',
      title: 'SaudeLocal Premium',
      icon: 'star',
      screen: 'Premium',
      highlight: true
    },
    {
      id: 'settings',
      title: 'Configurações',
      icon: 'cog-outline',
      screen: 'Settings'
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Perfil</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
          <Icon name="cog-outline" size={24} color={theme.colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView>
        <View style={styles.profileSection}>
          <TouchableOpacity style={styles.photoContainer}>
            {user.photo ? (
              <Image source={{ uri: user.photo }} style={styles.photo} />
            ) : (
              <View style={styles.photoPlaceholder}>
                <Icon name="account" size={40} color={theme.colors.textSecondary} />
              </View>
            )}
            <View style={styles.editPhotoButton}>
              <Icon name="camera" size={16} color={theme.colors.buttonText} />
            </View>
          </TouchableOpacity>
          
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.userEmail}>{user.email}</Text>
          
          <TouchableOpacity 
            style={styles.editProfileButton}
            onPress={() => navigation.navigate('EditProfile')}
          >
            <Text style={styles.editProfileText}>Editar Perfil</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.menuSection}>
          {menuItems.map(item => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.menuItem,
                item.highlight && styles.menuItemHighlight
              ]}
              onPress={() => navigation.navigate(item.screen)}
            >
              <View style={styles.menuItemLeft}>
                <Icon 
                  name={item.icon} 
                  size={24} 
                  color={item.highlight ? theme.colors.primary : theme.colors.text} 
                />
                <Text style={[
                  styles.menuItemText,
                  item.highlight && styles.menuItemTextHighlight
                ]}>
                  {item.title}
                </Text>
              </View>
              <Icon 
                name="chevron-right" 
                size={24} 
                color={item.highlight ? theme.colors.primary : theme.colors.textSecondary} 
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
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
  headerTitle: {
    fontSize: theme.typography.fontSize.xlarge,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  profileSection: {
    alignItems: 'center',
    padding: theme.spacing.xl,
    backgroundColor: theme.colors.card,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  photoContainer: {
    position: 'relative',
    marginBottom: theme.spacing.md,
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  photoPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: theme.colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editPhotoButton: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.xs,
    borderRadius: theme.borderRadius.full,
    ...theme.shadow.small,
  },
  userName: {
    fontSize: theme.typography.fontSize.xlarge,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  userEmail: {
    fontSize: theme.typography.fontSize.medium,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.md,
  },
  editProfileButton: {
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.borderRadius.medium,
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },
  editProfileText: {
    color: theme.colors.primary,
    fontSize: theme.typography.fontSize.medium,
    fontWeight: 'bold',
  },
  menuSection: {
    marginTop: theme.spacing.md,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing.md,
    backgroundColor: theme.colors.card,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  menuItemHighlight: {
    backgroundColor: `${theme.colors.primary}10`,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    fontSize: theme.typography.fontSize.large,
    color: theme.colors.text,
    marginLeft: theme.spacing.md,
  },
  menuItemTextHighlight: {
    color: theme.colors.primary,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
