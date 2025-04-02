import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
  SafeAreaView
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { theme } from '../styles/theme';
import Slider from '@react-native-community/slider';

const FiltersScreen = ({ navigation, route }) => {
  // Estados para os filtros
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [maxWaitTime, setMaxWaitTime] = useState(60); // minutos
  const [minRating, setMinRating] = useState(0);
  const [selectedSpecialties, setSelectedSpecialties] = useState([]);
  const [onlyOpenNow, setOnlyOpenNow] = useState(false);
  const [acceptsInsurance, setAcceptsInsurance] = useState(false);
  
  const unitTypes = [
    { id: 'hospital', name: 'Hospital', icon: 'hospital-building' },
    { id: 'ubs', name: 'UBS', icon: 'medical-bag' },
    { id: 'clinic', name: 'Clínica', icon: 'doctor' },
    { id: 'pharmacy', name: 'Farmácia Popular', icon: 'pharmacy' }
  ];
  
  const specialties = [
    'Clínica Geral',
    'Pediatria',
    'Ginecologia',
    'Ortopedia',
    'Cardiologia',
    'Neurologia',
    'Oftalmologia',
    'Dermatologia',
    'Urologia',
    'Psiquiatria'
  ];
  
  const insuranceProviders = [
    'SUS',
    'Amil',
    'Bradesco Saúde',
    'SulAmérica',
    'Unimed',
    'Porto Seguro'
  ];
  
  const toggleUnitType = (typeId) => {
    if (selectedTypes.includes(typeId)) {
      setSelectedTypes(selectedTypes.filter(id => id !== typeId));
    } else {
      setSelectedTypes([...selectedTypes, typeId]);
    }
  };
  
  const toggleSpecialty = (specialty) => {
    if (selectedSpecialties.includes(specialty)) {
      setSelectedSpecialties(selectedSpecialties.filter(s => s !== specialty));
    } else {
      setSelectedSpecialties([...selectedSpecialties, specialty]);
    }
  };
  
  const clearFilters = () => {
    setSelectedTypes([]);
    setMaxWaitTime(60);
    setMinRating(0);
    setSelectedSpecialties([]);
    setOnlyOpenNow(false);
    setAcceptsInsurance(false);
  };
  
  const applyFilters = () => {
    // Aqui você passaria os filtros aplicados de volta para a tela principal
    const filters = {
      types: selectedTypes,
      maxWaitTime,
      minRating,
      specialties: selectedSpecialties,
      onlyOpenNow,
      acceptsInsurance
    };
    
    navigation.navigate('Home', { filters });
  };
  
  const getWaitTimeLabel = () => {
    if (maxWaitTime <= 15) return 'Baixo (até 15 min)';
    if (maxWaitTime <= 30) return 'Médio (até 30 min)';
    if (maxWaitTime <= 60) return 'Alto (até 1 hora)';
    return 'Muito alto (mais de 1 hora)';
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.closeButton} 
          onPress={() => navigation.goBack()}
        >
          <Icon name="close" size={24} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Filtros</Text>
        <TouchableOpacity onPress={clearFilters}>
          <Text style={styles.clearText}>Limpar</Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.scrollView}>
        {/* Tipos de Unidade */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tipo de Unidade</Text>
          <View style={styles.typesContainer}>
            {unitTypes.map((type) => (
              <TouchableOpacity
                key={type.id}
                style={[
                  styles.typeButton,
                  selectedTypes.includes(type.id) && styles.selectedTypeButton
                ]}
                onPress={() => toggleUnitType(type.id)}
              >
                <Icon 
                  name={type.icon} 
                  size={24} 
                  color={selectedTypes.includes(type.id) ? theme.colors.buttonText : theme.colors.primary} 
                />
                <Text 
                  style={[
                    styles.typeText,
                    selectedTypes.includes(type.id) && styles.selectedTypeText
                  ]}
                >
                  {type.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        
        {/* Tempo de Espera */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tempo de Espera</Text>
          <Text style={styles.sliderValue}>{getWaitTimeLabel()}</Text>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={120}
            step={15}
            value={maxWaitTime}
            onValueChange={setMaxWaitTime}
            minimumTrackTintColor={theme.colors.primary}
            maximumTrackTintColor={theme.colors.border}
            thumbTintColor={theme.colors.primary}
          />
          <View style={styles.sliderLabels}>
            <Text style={styles.sliderLabel}>0 min</Text>
            <Text style={styles.sliderLabel}>2h+</Text>
          </View>
        </View>
        
        {/* Avaliação Mínima */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Avaliação Mínima</Text>
          <View style={styles.ratingSelector}>
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity
                key={star}
                onPress={() => setMinRating(star)}
                style={styles.starButton}
              >
                <Icon
                  name={minRating >= star ? 'star' : 'star-outline'}
                  size={32}
                  color={minRating >= star ? '#FFD700' : theme.colors.border}
                />
              </TouchableOpacity>
            ))}
            {minRating > 0 && (
              <TouchableOpacity 
                style={styles.clearRating} 
                onPress={() => setMinRating(0)}
              >
                <Icon name="close-circle" size={16} color={theme.colors.textSecondary} />
              </TouchableOpacity>
            )}
          </View>
        </View>
        
        {/* Especialidades */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Especialidades</Text>
          <View style={styles.specialtiesContainer}>
            {specialties.map((specialty) => (
              <TouchableOpacity
                key={specialty}
                style={[
                  styles.specialtyButton,
                  selectedSpecialties.includes(specialty) && styles.selectedSpecialtyButton
                ]}
                onPress={() => toggleSpecialty(specialty)}
              >
                <Text 
                  style={[
                    styles.specialtyText,
                    selectedSpecialties.includes(specialty) && styles.selectedSpecialtyText
                  ]}
                >
                  {specialty}
                </Text>
                {selectedSpecialties.includes(specialty) && (
                  <Icon name="check" size={16} color={theme.colors.buttonText} />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
        
        {/* Opções adicionais */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Opções Adicionais</Text>
          
          <View style={styles.switchRow}>
            <Text style={styles.switchLabel}>Apenas unidades abertas agora</Text>
            <Switch
              value={onlyOpenNow}
              onValueChange={setOnlyOpenNow}
              trackColor={{ false: '#E0E0E0', true: `${theme.colors.primary}80` }}
              thumbColor={onlyOpenNow ? theme.colors.primary : '#F4F4F4'}
            />
          </View>
          
          <View style={styles.switchRow}>
            <Text style={styles.switchLabel}>Aceita convênios</Text>
            <Switch
              value={acceptsInsurance}
              onValueChange={setAcceptsInsurance}
              trackColor={{ false: '#E0E0E0', true: `${theme.colors.primary}80` }}
              thumbColor={acceptsInsurance ? theme.colors.primary : '#F4F4F4'}
            />
          </View>
        </View>
      </ScrollView>
      
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.applyButton}
          onPress={applyFilters}
        >
          <Text style={styles.applyButtonText}>Aplicar Filtros</Text>
        </TouchableOpacity>
      </View>
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
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    backgroundColor: theme.colors.card,
  },
  closeButton: {
    padding: theme.spacing.xs,
  },
  headerTitle: {
    fontSize: theme.typography.fontSize.xlarge,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  clearText: {
    color: theme.colors.primary,
    fontSize: theme.typography.fontSize.medium,
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
  },
  section: {
    padding: theme.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  sectionTitle: {
    fontSize: theme.typography.fontSize.large,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  typesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  typeButton: {
    backgroundColor: theme.colors.card,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.medium,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.sm,
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
    width: '48%',
  },
  selectedTypeButton: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  typeText: {
    color: theme.colors.text,
    marginTop: theme.spacing.xs,
    fontSize: theme.typography.fontSize.medium,
  },
  selectedTypeText: {
    color: theme.colors.buttonText,
  },
  sliderValue: {
    fontSize: theme.typography.fontSize.medium,
    color: theme.colors.primary,
    fontWeight: 'bold',
    marginBottom: theme.spacing.sm,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: -8,
  },
  sliderLabel: {
    fontSize: theme.typography.fontSize.small,
    color: theme.colors.textSecondary,
  },
  ratingSelector: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starButton: {
    marginRight: theme.spacing.xs,
  },
  clearRating: {
    marginLeft: theme.spacing.sm,
  },
  specialtiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  specialtyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.card,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.full,
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: theme.spacing.md,
    marginRight: theme.spacing.sm,
    marginBottom: theme.spacing.sm,
  },
  selectedSpecialtyButton: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  specialtyText: {
    color: theme.colors.text,
    fontSize: theme.typography.fontSize.medium,
    marginRight: theme.spacing.xs,
  },
  selectedSpecialtyText: {
    color: theme.colors.buttonText,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  switchLabel: {
    fontSize: theme.typography.fontSize.medium,
    color: theme.colors.text,
  },
  footer: {
    padding: theme.spacing.md,
    backgroundColor: theme.colors.card,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  applyButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.medium,
    paddingVertical: theme.spacing.md,
    alignItems: 'center',
  },
  applyButtonText: {
    color: theme.colors.buttonText,
    fontWeight: 'bold',
    fontSize: theme.typography.fontSize.large,
  },
});

export default FiltersScreen;
