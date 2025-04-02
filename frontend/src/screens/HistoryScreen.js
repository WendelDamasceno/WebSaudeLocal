import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { theme } from '../styles/theme';
import HealthUnitCard from '../components/HealthUnitCard';

const HistoryScreen = ({ navigation }) => {
  const historyData = [
    {
      id: '1',
      date: '15/05/2023',
      type: 'view', // view ou visit
      unit: {
        id: '1',
        name: 'Hospital São Lucas',
        type: 'Hospital',
        distance: '1.2 km',
        waitTime: 'Médio (30-60 min)',
        rating: 4.2,
        image: require('../assets/hospital1.jpg'),
      }
    },
    // ... mais itens do histórico
  ];

  const renderHistoryItem = ({ item }) => (
    <View style={styles.historyItem}>
      <Text style={styles.dateText}>{item.date}</Text>
      <Text style={styles.actionText}>
        {item.type === 'view' ? 'Visualizado' : 'Visitado'}
      </Text>
      <HealthUnitCard 
        data={item.unit}
        onPress={() => navigation.navigate('HealthUnitDetail', { unitId: item.unit.id })}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Histórico</Text>
        <TouchableOpacity onPress={() => {}}>
          <Text style={styles.clearText}>Limpar</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={historyData}
        renderItem={renderHistoryItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
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
  clearText: {
    color: theme.colors.primary,
    fontSize: theme.typography.fontSize.medium,
  },
  listContainer: {
    padding: theme.spacing.md,
  },
  historyItem: {
    marginBottom: theme.spacing.lg,
  },
  dateText: {
    fontSize: theme.typography.fontSize.medium,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xs,
  },
  actionText: {
    fontSize: theme.typography.fontSize.small,
    color: theme.colors.primary,
    marginBottom: theme.spacing.sm,
  },
});

export default HistoryScreen;
