import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  TextInput, 
  SafeAreaView,
  ScrollView,
  FlatList,
  Image
} from 'react-native';
import { theme } from '../styles/theme';
import MapView, { Marker } from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import HealthUnitCard from '../components/HealthUnitCard';

const HomeScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('map'); // 'map' ou 'list'
  
  // Dados de exemplo de unidades de saúde
  const healthUnits = [
    {
      id: '1',
      name: 'Hospital São Lucas',
      type: 'Hospital',
      distance: '1.2 km',
      waitTime: 'Médio (30-60 min)',
      rating: 4.2,
      location: { latitude: -23.550520, longitude: -46.633309 },
      image: require('../assets/hospital1.jpg'),
    },
    {
      id: '2',
      name: 'UBS Vila Nova',
      type: 'UBS',
      distance: '0.8 km',
      waitTime: 'Baixo (<30 min)',
      rating: 3.8,
      location: { latitude: -23.551520, longitude: -46.634309 },
      image: require('../assets/ubs1.jpg'),
    },
    {
      id: '3',
      name: 'Clínica Saúde Integral',
      type: 'Clínica',
      distance: '2.1 km',
      waitTime: 'Sem espera',
      rating: 4.7,
      location: { latitude: -23.553520, longitude: -46.631309 },
      image: require('../assets/clinic1.jpg'),
    },
    {
      id: '4',
      name: 'Farmácia Popular Central',
      type: 'Farmácia Popular',
      distance: '1.5 km',
      waitTime: 'Baixo (<15 min)',
      rating: 4.0,
      location: { latitude: -23.548520, longitude: -46.635309 },
      image: require('../assets/pharmacy1.jpg'),
    },
  ];

  const renderHealthUnitCard = ({ item }) => (
    <HealthUnitCard 
      data={item} 
      onPress={() => navigation.navigate('HealthUnitDetail', { unitId: item.id })} 
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <Icon name="magnify" size={24} color={theme.colors.textSecondary} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar unidades, especialidades..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        
        <TouchableOpacity 
          style={styles.filterButton}
          onPress={() => navigation.navigate('Filters')}
        >
          <Icon name="filter-variant" size={24} color={theme.colors.primary} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.viewToggle}>
        <TouchableOpacity 
          style={[styles.toggleButton, viewMode === 'map' && styles.activeToggle]}
          onPress={() => setViewMode('map')}
        >
          <Icon 
            name="map" 
            size={20} 
            color={viewMode === 'map' ? theme.colors.primary : theme.colors.textSecondary} 
          />
          <Text 
            style={[
              styles.toggleText, 
              viewMode === 'map' && styles.activeToggleText
            ]}
          >
            Mapa
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.toggleButton, viewMode === 'list' && styles.activeToggle]}
          onPress={() => setViewMode('list')}
        >
          <Icon 
            name="format-list-bulleted" 
            size={20} 
            color={viewMode === 'list' ? theme.colors.primary : theme.colors.textSecondary} 
          />
          <Text 
            style={[
              styles.toggleText, 
              viewMode === 'list' && styles.activeToggleText
            ]}
          >
            Lista
          </Text>
        </TouchableOpacity>
      </View>
      
      {viewMode === 'map' ? (
        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: -23.550520,
              longitude: -46.633309,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            }}
          >
            {healthUnits.map(unit => (
              <Marker
                key={unit.id}
                coordinate={unit.location}
                title={unit.name}
                description={unit.type}
                onPress={() => navigation.navigate('HealthUnitDetail', { unitId: unit.id })}
              >
                <View style={styles.markerContainer}>
                  <Icon 
                    name={
                      unit.type === 'Hospital' ? 'hospital-building' :
                      unit.type === 'UBS' ? 'medical-bag' :
                      unit.type === 'Clínica' ? 'doctor' : 'pharmacy'
                    } 
                    size={24} 
                    color={theme.colors.primary} 
                  />
                </View>
              </Marker>
            ))}
          </MapView>
          
          <TouchableOpacity 
            style={styles.emergencyButton}
            onPress={() => navigation.navigate('Emergency')}
          >
            <Icon name="ambulance" size={28} color={theme.colors.buttonText} />
            <Text style={styles.emergencyButtonText}>Emergência</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={healthUnits}
          renderItem={renderHealthUnitCard}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContainer}
        />
      )}
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
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
    alignItems: 'center',
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.medium,
    alignItems: 'center',
    paddingHorizontal: theme.spacing.sm,
    ...theme.shadow.small,
  },
  searchIcon: {
    marginRight: theme.spacing.xs,
  },
  searchInput: {
    flex: 1,
    paddingVertical: theme.spacing.sm,
    fontSize: theme.typography.fontSize.medium,
  },
  filterButton: {
    marginLeft: theme.spacing.md,
    padding: theme.spacing.sm,
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.medium,
    ...theme.shadow.small,
  },
  viewToggle: {
    flexDirection: 'row',
    paddingHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  toggleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.borderRadius.full,
    marginRight: theme.spacing.sm,
  },
  activeToggle: {
    backgroundColor: `${theme.colors.primary}20`,
  },
  toggleText: {
    marginLeft: theme.spacing.xs,
    fontSize: theme.typography.fontSize.medium,
    color: theme.colors.textSecondary,
  },
  activeToggleText: {
    color: theme.colors.primary,
    fontWeight: 'bold',
  },
  mapContainer: {
    flex: 1,
    position: 'relative',
  },
  map: {
    flex: 1,
  },
  markerContainer: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.full,
    padding: theme.spacing.xs,
    borderWidth: 2,
    borderColor: theme.colors.primary,
  },
  emergencyButton: {
    position: 'absolute',
    bottom: theme.spacing.xl,
    right: theme.spacing.lg,
    flexDirection: 'row',
    backgroundColor: theme.colors.emergency,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.borderRadius.medium,
    alignItems: 'center',
    ...theme.shadow.medium,
  },
  emergencyButtonText: {
    color: theme.colors.buttonText,
    fontWeight: 'bold',
    marginLeft: theme.spacing.xs,
  },
  listContainer: {
    padding: theme.spacing.md,
  },
});

export default HomeScreen;
