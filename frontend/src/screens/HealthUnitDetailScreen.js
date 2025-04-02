import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Linking,
  Modal,
  FlatList
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MapView, { Marker } from 'react-native-maps';
import { theme } from '../styles/theme';
import RatingModal from '../components/RatingModal';

const HealthUnitDetailScreen = ({ route, navigation }) => {
  const { unitId } = route.params;
  const [isFavorite, setIsFavorite] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(false);
  
  // Dados de exemplo para a unidade selecionada
  const unitData = {
    id: unitId,
    name: 'Hospital São Lucas',
    type: 'Hospital',
    address: 'Av. Paulista, 1578, São Paulo - SP',
    phone: '(11) 3333-4444',
    operatingHours: 'Aberto 24h',
    location: { latitude: -23.550520, longitude: -46.633309 },
    waitTime: 'Médio (30-60 min)',
    image: require('../assets/hospital1.jpg'),
    rating: {
      overall: 4.2,
      attendance: 4.0,
      cleanliness: 4.5,
      quality: 4.3,
      occupation: 3.5,
    },
    specialties: [
      'Clínica Geral',
      'Pediatria',
      'Ortopedia',
      'Cardiologia',
      'Neurologia',
      'Ginecologia',
    ],
    reviews: [
      {
        id: '1',
        userName: 'Ana Silva',
        date: '15/05/2023',
        rating: 4,
        comment: 'Atendimento rápido e equipe muito atenciosa. Recomendo!'
      },
      {
        id: '2',
        userName: 'Carlos Oliveira',
        date: '03/05/2023',
        rating: 5,
        comment: 'Excelente estrutura e médicos muito capacitados.'
      },
      {
        id: '3',
        userName: 'Mariana Santos',
        date: '28/04/2023',
        rating: 3,
        comment: 'Bom atendimento, mas o tempo de espera foi maior que o informado.'
      },
    ]
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const callPhone = () => {
    Linking.openURL(`tel:${unitData.phone}`);
  };

  const openMap = () => {
    const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
    const latLng = `${unitData.location.latitude},${unitData.location.longitude}`;
    const label = unitData.name;
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`
    });
    
    Linking.openURL(url);
  };

  const renderSpecialtyItem = ({ item }) => (
    <View style={styles.specialtyItem}>
      <Icon name="medical-bag" size={18} color={theme.colors.primary} />
      <Text style={styles.specialtyText}>{item}</Text>
    </View>
  );

  const renderReviewItem = ({ item }) => (
    <View style={styles.reviewItem}>
      <View style={styles.reviewHeader}>
        <Text style={styles.reviewUserName}>{item.userName}</Text>
        <Text style={styles.reviewDate}>{item.date}</Text>
      </View>
      <View style={styles.ratingContainer}>
        {[1, 2, 3, 4, 5].map(star => (
          <Icon 
            key={star}
            name={star <= item.rating ? "star" : "star-outline"} 
            size={18} 
            color="#FFD700" 
          />
        ))}
      </View>
      <Text style={styles.reviewComment}>{item.comment}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => navigation.goBack()}
          >
            <Icon name="arrow-left" size={24} color={theme.colors.primary} />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.favoriteButton} 
            onPress={toggleFavorite}
          >
            <Icon 
              name={isFavorite ? "heart" : "heart-outline"} 
              size={24} 
              color={isFavorite ? theme.colors.emergency : theme.colors.primary} 
            />
          </TouchableOpacity>
        </View>
        
        <Image source={unitData.image} style={styles.image} />
        
        <View style={styles.contentContainer}>
          <View style={styles.titleContainer}>
            <View style={styles.typeContainer}>
              <Icon 
                name={
                  unitData.type === 'Hospital' ? 'hospital-building' :
                  unitData.type === 'UBS' ? 'medical-bag' :
                  unitData.type === 'Clínica' ? 'doctor' : 'pharmacy'
                } 
                size={20} 
                color={theme.colors.primary} 
              />
              <Text style={styles.typeText}>{unitData.type}</Text>
            </View>
            <Text style={styles.unitName}>{unitData.name}</Text>
            
            <View style={styles.ratingRow}>
              <View style={styles.overallRating}>
                {[1, 2, 3, 4, 5].map(star => (
                  <Icon 
                    key={star}
                    name={star <= Math.round(unitData.rating.overall) ? "star" : "star-outline"} 
                    size={20} 
                    color="#FFD700" 
                  />
                ))}
              </View>
              <Text style={styles.ratingText}>{unitData.rating.overall.toFixed(1)}</Text>
            </View>
          </View>
          
          <View style={styles.section}>
            <View style={styles.addressRow}>
              <Icon name="map-marker" size={22} color={theme.colors.primary} />
              <Text style={styles.addressText}>{unitData.address}</Text>
            </View>
            
            <View style={styles.detailRow}>
              <Icon name="clock-outline" size={20} color={theme.colors.textSecondary} />
              <Text style={styles.detailText}>{unitData.operatingHours}</Text>
            </View>
            
            <View style={styles.detailRow}>
              <Icon name="phone" size={20} color={theme.colors.textSecondary} />
              <Text style={styles.detailText}>{unitData.phone}</Text>
            </View>
          </View>
          
          <View style={styles.actionsContainer}>
            <TouchableOpacity style={styles.actionButton} onPress={callPhone}>
              <Icon name="phone" size={24} color={theme.colors.primary} />
              <Text style={styles.actionText}>Ligar</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionButton} onPress={openMap}>
              <Icon name="directions" size={24} color={theme.colors.primary} />
              <Text style={styles.actionText}>Traçar Rota</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.actionButton} 
              onPress={() => setShowRatingModal(true)}
            >
              <Icon name="star-outline" size={24} color={theme.colors.primary} />
              <Text style={styles.actionText}>Avaliar</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.waitTimeContainer}>
            <Text style={styles.sectionTitle}>Tempo de Espera Estimado</Text>
            <View style={styles.waitTimeBox}>
              <Icon 
                name="clock-outline" 
                size={28} 
                color={
                  unitData.waitTime.includes('Baixo') ? theme.colors.secondary :
                  unitData.waitTime.includes('Médio') ? theme.colors.tertiary :
                  theme.colors.emergency
                } 
              />
              <Text style={[
                styles.waitTimeText,
                {
                  color: 
                    unitData.waitTime.includes('Baixo') ? theme.colors.secondary :
                    unitData.waitTime.includes('Médio') ? theme.colors.tertiary :
                    theme.colors.emergency
                }
              ]}>
                {unitData.waitTime}
              </Text>
            </View>
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Localização</Text>
            <View style={styles.mapContainer}>
              <MapView
                style={styles.map}
                initialRegion={{
                  latitude: unitData.location.latitude,
                  longitude: unitData.location.longitude,
                  latitudeDelta: 0.01,
                  longitudeDelta: 0.01,
                }}
                scrollEnabled={false}
                zoomEnabled={false}
              >
                <Marker coordinate={unitData.location} title={unitData.name}>
                  <View style={styles.markerContainer}>
                    <Icon 
                      name={
                        unitData.type === 'Hospital' ? 'hospital-building' :
                        unitData.type === 'UBS' ? 'medical-bag' :
                        unitData.type === 'Clínica' ? 'doctor' : 'pharmacy'
                      } 
                      size={24} 
                      color={theme.colors.primary} 
                    />
                  </View>
                </Marker>
              </MapView>
            </View>
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Especialidades</Text>
            <FlatList
              data={unitData.specialties}
              renderItem={renderSpecialtyItem}
              keyExtractor={item => item}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.specialtiesContainer}
            />
          </View>
          
          <View style={styles.section}>
            <View style={styles.reviewsHeader}>
              <Text style={styles.sectionTitle}>Avaliações</Text>
              <TouchableOpacity onPress={() => setShowRatingModal(true)}>
                <Text style={styles.addReviewText}>Adicionar Avaliação</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.ratingDetails}>
              <View style={styles.ratingColumn}>
                <Text style={styles.overallRatingText}>{unitData.rating.overall.toFixed(1)}</Text>
                <View style={styles.starsRow}>
                  {[1, 2, 3, 4, 5].map(star => (
                    <Icon 
                      key={star}
                      name={star <= Math.round(unitData.rating.overall) ? "star" : "star-outline"} 
                      size={16} 
                      color="#FFD700" 
                    />
                  ))}
                </View>
                <Text style={styles.reviewCount}>{unitData.reviews.length} avaliações</Text>
              </View>
              
              <View style={styles.ratingsBreakdown}>
                <View style={styles.ratingItemRow}>
                  <Text style={styles.ratingLabel}>Atendimento</Text>
                  <View style={styles.ratingBarContainer}>
                    <View style={[styles.ratingBar, { width: `${(unitData.rating.attendance / 5) * 100}%` }]} />
                  </View>
                  <Text style={styles.ratingValue}>{unitData.rating.attendance.toFixed(1)}</Text>
                </View>
                
                <View style={styles.ratingItemRow}>
                  <Text style={styles.ratingLabel}>Limpeza</Text>
                  <View style={styles.ratingBarContainer}>
                    <View style={[styles.ratingBar, { width: `${(unitData.rating.cleanliness / 5) * 100}%` }]} />
                  </View>
                  <Text style={styles.ratingValue}>{unitData.rating.cleanliness.toFixed(1)}</Text>
                </View>
                
                <View style={styles.ratingItemRow}>
                  <Text style={styles.ratingLabel}>Qualidade</Text>
                  <View style={styles.ratingBarContainer}>
                    <View style={[styles.ratingBar, { width: `${(unitData.rating.quality / 5) * 100}%` }]} />
                  </View>
                  <Text style={styles.ratingValue}>{unitData.rating.quality.toFixed(1)}</Text>
                </View>
                
                <View style={styles.ratingItemRow}>
                  <Text style={styles.ratingLabel}>Lotação</Text>
                  <View style={styles.ratingBarContainer}>
                    <View style={[styles.ratingBar, { width: `${(unitData.rating.occupation / 5) * 100}%` }]} />
                  </View>
                  <Text style={styles.ratingValue}>{unitData.rating.occupation.toFixed(1)}</Text>
                </View>
              </View>
            </View>
            
            <FlatList
              data={unitData.reviews}
              renderItem={renderReviewItem}
              keyExtractor={item => item.id}
              scrollEnabled={false}
              contentContainerStyle={styles.reviewsContainer}
            />
          </View>
        </View>
      </ScrollView>
      
      {/* Modal de Avaliação */}
      <RatingModal 
        visible={showRatingModal} 
        onClose={() => setShowRatingModal(false)} 
        unitName={unitData.name}
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
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: theme.spacing.md,
    zIndex: 10,
  },
  backButton: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.full,
    padding: theme.spacing.xs,
  },
  favoriteButton: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.full,
    padding: theme.spacing.xs,
  },
  image: {
    width: '100%',
    height: 250,
  },
  contentContainer: {
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.lg,
    paddingBottom: theme.spacing.xxl,
    backgroundColor: theme.colors.background,
    borderTopLeftRadius: theme.borderRadius.large,
    borderTopRightRadius: theme.borderRadius.large,
    marginTop: -25,
  },
  titleContainer: {
    marginBottom: theme.spacing.lg,
  },
  typeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  typeText: {
    fontSize: theme.typography.fontSize.medium,
    color: theme.colors.primary,
    fontWeight: 'bold',
    marginLeft: theme.spacing.xs,
  },
  unitName: {
    fontSize: theme.typography.fontSize.title,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  overallRating: {
    flexDirection: 'row',
    marginRight: theme.spacing.sm,
  },
  ratingText: {
    fontSize: theme.typography.fontSize.medium,
    color: theme.colors.text,
    fontWeight: 'bold',
  },
  section: {
    marginBottom: theme.spacing.xl,
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.sm,
  },
  addressText: {
    fontSize: theme.typography.fontSize.medium,
    color: theme.colors.text,
    marginLeft: theme.spacing.sm,
    flex: 1,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  detailText: {
    fontSize: theme.typography.fontSize.medium,
    color: theme.colors.textSecondary,
    marginLeft: theme.spacing.sm,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.xl,
  },
  actionButton: {
    alignItems: 'center',
    backgroundColor: theme.colors.card,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.medium,
    flex: 0.3,
    ...theme.shadow.small,
  },
  actionText: {
    fontSize: theme.typography.fontSize.medium,
    color: theme.colors.primary,
    marginTop: theme.spacing.xs,
    fontWeight: 'bold',
  },
  waitTimeContainer: {
    marginBottom: theme.spacing.xl,
  },
  waitTimeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.card,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.medium,
    ...theme.shadow.small,
  },
  waitTimeText: {
    fontSize: theme.typography.fontSize.large,
    fontWeight: 'bold',
    marginLeft: theme.spacing.sm,
  },
  sectionTitle: {
    fontSize: theme.typography.fontSize.large,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  mapContainer: {
    height: 200,
    borderRadius: theme.borderRadius.medium,
    overflow: 'hidden',
    ...theme.shadow.small,
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
  specialtiesContainer: {
    paddingVertical: theme.spacing.xs,
  },
  specialtyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.card,
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.borderRadius.full,
    marginRight: theme.spacing.sm,
    ...theme.shadow.small,
  },
  specialtyText: {
    fontSize: theme.typography.fontSize.medium,
    color: theme.colors.text,
    marginLeft: theme.spacing.xs,
  },
  reviewsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  addReviewText: {
    fontSize: theme.typography.fontSize.medium,
    color: theme.colors.primary,
    fontWeight: 'bold',
  },
  ratingDetails: {
    flexDirection: 'row',
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.medium,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    ...theme.shadow.small,
  },
  ratingColumn: {
    alignItems: 'center',
    paddingRight: theme.spacing.md,
    marginRight: theme.spacing.md,
    borderRightWidth: 1,
    borderRightColor: theme.colors.border,
  },
  overallRatingText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  starsRow: {
    flexDirection: 'row',
    marginVertical: theme.spacing.xs,
  },
  reviewCount: {
    fontSize: theme.typography.fontSize.small,
    color: theme.colors.textSecondary,
  },
  ratingsBreakdown: {
    flex: 1,
  },
  ratingItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  ratingLabel: {
    fontSize: theme.typography.fontSize.small,
    color: theme.colors.textSecondary,
    width: 70,
  },
  ratingBarContainer: {
    flex: 1,
    height: 6,
    backgroundColor: '#E0E0E0',
    borderRadius: 3,
    marginRight: theme.spacing.sm,
  },
  ratingBar: {
    height: '100%',
    backgroundColor: theme.colors.primary,
    borderRadius: 3,
  },
  ratingValue: {
    fontSize: theme.typography.fontSize.small,
    color: theme.colors.text,
    fontWeight: 'bold',
    width: 25,
    textAlign: 'right',
  },
  reviewsContainer: {
    paddingTop: theme.spacing.xs,
  },
  reviewItem: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.medium,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    ...theme.shadow.small,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.xs,
  },
  reviewUserName: {
    fontSize: theme.typography.fontSize.medium,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  reviewDate: {
    fontSize: theme.typography.fontSize.small,
    color: theme.colors.textSecondary,
  },
  ratingContainer: {
    flexDirection: 'row',
    marginBottom: theme.spacing.sm,
  },
  reviewComment: {
    fontSize: theme.typography.fontSize.medium,
    color: theme.colors.text,
    lineHeight: 20,
  },
});

export default HealthUnitDetailScreen;
