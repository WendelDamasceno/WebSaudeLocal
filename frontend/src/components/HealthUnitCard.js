import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { theme } from '../styles/theme';

const HealthUnitCard = ({ data, onPress }) => {
  // Cor do tempo de espera baseado no texto
  const getWaitTimeColor = (waitTime) => {
    if (waitTime.includes('Baixo') || waitTime.includes('Sem espera')) {
      return theme.colors.secondary;
    } else if (waitTime.includes('Médio')) {
      return theme.colors.tertiary;
    } else {
      return theme.colors.emergency;
    }
  };

  // Ícone baseado no tipo de unidade
  const getUnitIcon = (type) => {
    switch (type) {
      case 'Hospital':
        return 'hospital-building';
      case 'UBS':
        return 'medical-bag';
      case 'Clínica':
        return 'doctor';
      case 'Farmácia Popular':
        return 'pharmacy';
      default:
        return 'hospital';
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={data.image} style={styles.image} />
      
      <View style={styles.infoContainer}>
        <View style={styles.typeContainer}>
          <Icon name={getUnitIcon(data.type)} size={16} color={theme.colors.primary} />
          <Text style={styles.typeText}>{data.type}</Text>
        </View>
        
        <Text style={styles.name} numberOfLines={1}>{data.name}</Text>
        
        <View style={styles.detailsContainer}>
          <View style={styles.detailRow}>
            <Icon name="map-marker" size={16} color={theme.colors.textSecondary} />
            <Text style={styles.detailText}>{data.distance}</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Icon name="clock-outline" size={16} color={getWaitTimeColor(data.waitTime)} />
            <Text style={[styles.detailText, { color: getWaitTimeColor(data.waitTime) }]}>
              {data.waitTime}
            </Text>
          </View>
          
          <View style={styles.detailRow}>
            <Icon name="star" size={16} color="#FFD700" />
            <Text style={styles.detailText}>{data.rating}</Text>
          </View>
        </View>
      </View>
      
      <TouchableOpacity style={styles.favoriteButton}>
        <Icon name="heart-outline" size={24} color={theme.colors.primary} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.medium,
    marginBottom: theme.spacing.md,
    overflow: 'hidden',
    ...theme.shadow.small,
  },
  image: {
    width: 100,
    height: 100,
  },
  infoContainer: {
    flex: 1,
    padding: theme.spacing.md,
  },
  typeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  typeText: {
    fontSize: theme.typography.fontSize.small,
    color: theme.colors.primary,
    marginLeft: theme.spacing.xs,
    fontWeight: 'bold',
  },
  name: {
    fontSize: theme.typography.fontSize.large,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  detailsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: theme.spacing.md,
    marginTop: theme.spacing.xs,
  },
  detailText: {
    fontSize: theme.typography.fontSize.small,
    color: theme.colors.textSecondary,
    marginLeft: theme.spacing.xs,
  },
  favoriteButton: {
    padding: theme.spacing.sm,
    alignSelf: 'flex-start',
  },
});

export default HealthUnitCard;
