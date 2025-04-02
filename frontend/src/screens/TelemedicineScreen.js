import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Image
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { theme } from '../styles/theme';

const TelemedicineScreen = ({ navigation }) => {
  const services = [
    {
      id: '1',
      name: 'Consulta Online Geral',
      description: 'Atendimento médico virtual para casos não urgentes',
      price: 'A partir de R$ 80,00',
      specialties: ['Clínica Geral', 'Pediatria', 'Ginecologia'],
      image: require('../assets/telemedicine1.jpg'),
      available: true
    },
    // ... mais serviços
  ];

  const renderService = (service) => (
    <TouchableOpacity 
      key={service.id} 
      style={styles.serviceCard}
      onPress={() => navigation.navigate('TelemedicineDetail', { serviceId: service.id })}
    >
      <Image source={service.image} style={styles.serviceImage} />
      <View style={styles.serviceInfo}>
        <Text style={styles.serviceName}>{service.name}</Text>
        <Text style={styles.serviceDescription}>{service.description}</Text>
        <Text style={styles.servicePrice}>{service.price}</Text>
        <View style={styles.specialtiesList}>
          {service.specialties.map((specialty, index) => (
            <View key={index} style={styles.specialtyTag}>
              <Text style={styles.specialtyText}>{specialty}</Text>
            </View>
          ))}
        </View>
        {service.available && (
          <TouchableOpacity style={styles.startButton}>
            <Text style={styles.startButtonText}>Iniciar Consulta</Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Telemedicina</Text>
        <View style={{width: 24}} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.infoBox}>
          <Icon name="information" size={24} color={theme.colors.primary} />
          <Text style={styles.infoText}>
            Consulte-se com médicos certificados sem sair de casa. 
            Atendimento 24h para sua comodidade.
          </Text>
        </View>

        <View style={styles.servicesSection}>
          <Text style={styles.sectionTitle}>Serviços Disponíveis</Text>
          {services.map(renderService)}
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
  // ...resto dos estilos
});

export default TelemedicineScreen;
