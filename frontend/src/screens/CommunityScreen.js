import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  TextInput
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { theme } from '../styles/theme';

const CommunityScreen = ({ navigation }) => {
  const [topics, setTopics] = useState([
    {
      id: '1',
      title: 'Recomendação de pediatra',
      author: 'Maria Silva',
      time: '2h atrás',
      replies: 5,
      likes: 3,
      tags: ['Pediatria', 'Recomendação']
    },
    // ... mais tópicos
  ]);

  const renderTopicItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.topicCard}
      onPress={() => navigation.navigate('TopicDetail', { topicId: item.id })}
    >
      <View style={styles.topicHeader}>
        <Text style={styles.topicTitle}>{item.title}</Text>
        <Text style={styles.topicTime}>{item.time}</Text>
      </View>
      
      <View style={styles.topicFooter}>
        <View style={styles.authorContainer}>
          <Icon name="account" size={16} color={theme.colors.textSecondary} />
          <Text style={styles.authorText}>{item.author}</Text>
        </View>
        
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Icon name="message-outline" size={16} color={theme.colors.textSecondary} />
            <Text style={styles.statText}>{item.replies}</Text>
          </View>
          <View style={styles.statItem}>
            <Icon name="heart-outline" size={16} color={theme.colors.textSecondary} />
            <Text style={styles.statText}>{item.likes}</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.tagsContainer}>
        {item.tags.map((tag, index) => (
          <View key={index} style={styles.tagChip}>
            <Text style={styles.tagText}>{tag}</Text>
          </View>
        ))}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Comunidade</Text>
        <TouchableOpacity onPress={() => navigation.navigate('NewTopic')}>
          <Icon name="plus" size={24} color={theme.colors.primary} />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <Icon name="magnify" size={20} color={theme.colors.textSecondary} />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar tópicos..."
          placeholderTextColor={theme.colors.textSecondary}
        />
      </View>

      <FlatList
        data={topics}
        renderItem={renderTopicItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />

      <TouchableOpacity 
        style={styles.newTopicButton}
        onPress={() => navigation.navigate('NewTopic')}
      >
        <Icon name="plus" size={24} color={theme.colors.buttonText} />
        <Text style={styles.newTopicButtonText}>Novo Tópico</Text>
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
  headerTitle: {
    fontSize: theme.typography.fontSize.xlarge,
    fontWeight: 'bold',
    color: theme.colors.text,
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
  topicCard: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.medium,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    ...theme.shadow.small,
  },
  topicHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.sm,
  },
  topicTitle: {
    fontSize: theme.typography.fontSize.large,
    fontWeight: 'bold',
    color: theme.colors.text,
    flex: 1,
  },
  topicTime: {
    fontSize: theme.typography.fontSize.small,
    color: theme.colors.textSecondary,
    marginLeft: theme.spacing.sm,
  },
  topicFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: theme.spacing.sm,
  },
  authorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  authorText: {
    fontSize: theme.typography.fontSize.small,
    color: theme.colors.textSecondary,
    marginLeft: theme.spacing.xs,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: theme.spacing.md,
  },
  statText: {
    fontSize: theme.typography.fontSize.small,
    color: theme.colors.textSecondary,
    marginLeft: theme.spacing.xs,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: theme.spacing.sm,
  },
  tagChip: {
    backgroundColor: `${theme.colors.primary}20`,
    borderRadius: theme.borderRadius.full,
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: theme.spacing.sm,
    marginRight: theme.spacing.xs,
    marginBottom: theme.spacing.xs,
  },
  tagText: {
    fontSize: theme.typography.fontSize.small,
    color: theme.colors.primary,
  },
  newTopicButton: {
    position: 'absolute',
    bottom: theme.spacing.lg,
    right: theme.spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.full,
    ...theme.shadow.medium,
  },
  newTopicButtonText: {
    color: theme.colors.buttonText,
    fontWeight: 'bold',
    marginLeft: theme.spacing.sm,
  },
});

export default CommunityScreen;
