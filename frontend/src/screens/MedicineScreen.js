import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  SafeAreaView
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { theme } from '../styles/theme';

const MedicineScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Dados de exemplo
  const medicines = [
    {
      id: '1',
      name: 'Dipirona 500mg',
      type: 'Analgésico',
      availableAt: [
        {
          id: '1',
          name: 'UBS Vila Nova',
          distance: '0.8 km',
          lastUpdate: '2 horas atrás',
          quantity: 'Em estoque'
        },
        {
          id: '2',
          name: 'Farmácia Popular Central',
          distance: '1.5 km',
          lastUpdate: '1 hora atrás',
          quantity: 'Estoque baixo'
        }
      ]
    },
    // ... outros medicamentos
  ];

  const renderMedicineItem = ({ item }) => (
    <View style={styles.medicineCard}>
      <View style={styles.medicineHeader}>
        <View>
          <Text style={styles.medicineName}>{item.name}</Text>
          <Text style={styles.medicineType}>{item.type}</Text>
        </View>
        <Icon name="pill" size={24} color={theme.colors.primary} />
      </View>
      
      <View style={styles.availabilityContainer}>
        <Text style={styles.availabilityTitle}>Disponível em:</Text>
        {item.availableAt.map(location => (
          <TouchableOpacity 
            key={location.id}
            style={styles.locationItem}
            onPress={() => navigation.navigate('HealthUnitDetail', { unitId: location.id })}
          >
            <View style={styles.locationInfo}>
              <Text style={styles.locationName}>{location.name}</Text>
              <Text style={styles.locationDistance}>
                <Icon name="map-marker" size={14} color={theme.colors.textSecondary} />
                {' '}{location.distance}
              </Text>
            </View>
            <View style={styles.stockInfo}>
              <Text style={[
                styles.stockStatus,
                { color: location.quantity.includes('baixo') ? theme.colors.tertiary : theme.colors.secondary }
              ]}>
                {location.quantity}
              </Text>
              <Text style={styles.updateTime}>Atualizado {location.lastUpdate}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-left" size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Medicamentos</Text>
      </View>

      <View style={styles.searchContainer}>
        <Icon name="magnify" size={24} color={theme.colors.textSecondary} />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar medicamentos..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <FlatList
        data={medicines}
        renderItem={renderMedicineItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
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
    alignItems: 'center',
    padding: theme.spacing.md,
    backgroundColor: theme.colors.card,
    ...theme.shadow.small,
  },
  backButton: {
    padding: theme.spacing.xs,
  },
  headerTitle: {
    fontSize: theme.typography.fontSize.xlarge,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginLeft: theme.spacing.md,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: theme.spacing.md,
    padding: theme.spacing.sm,
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.medium,
    ...theme.shadow.small,
  },
  searchInput: {
    flex: 1,
    marginLeft: theme.spacing.sm,
    fontSize: theme.typography.fontSize.medium,
  },
  listContainer: {
    padding: theme.spacing.md,
  },
  medicineCard: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.medium,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    ...theme.shadow.small,
  },
  medicineHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  medicineName: {
    fontSize: theme.typography.fontSize.large,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  medicineType: {
    fontSize: theme.typography.fontSize.medium,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.xs,
  },
  availabilityContainer: {
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    paddingTop: theme.spacing.md,
  },
  availabilityTitle: {
    fontSize: theme.typography.fontSize.medium,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  locationItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  locationInfo: {
    flex: 1,
  },
  locationName: {
    fontSize: theme.typography.fontSize.medium,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  locationDistance: {
    fontSize: theme.typography.fontSize.small,
    color: theme.colors.textSecondary,
  },
  stockInfo: {
    alignItems: 'flex-end',
  },
  stockStatus: {
    fontSize: theme.typography.fontSize.medium,
    fontWeight: 'bold',
  },
  updateTime: {
    fontSize: theme.typography.fontSize.small,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.xs,
  },
});

export default MedicineScreen;
