import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { theme } from '../styles/theme';

const PremiumScreen = ({ navigation }) => {
  const plans = [
    {
      id: 'monthly',
      name: 'Mensal',
      price: 'R$ 9,90',
      period: '/mês',
      popular: false
    },
    {
      id: 'yearly',
      name: 'Anual',
      price: 'R$ 89,90',
      period: '/ano',
      popular: true,
      savings: 'Economize R$ 28,90'
    }
  ];

  const benefits = [
    {
      icon: 'star',
      title: 'Sem anúncios',
      description: 'Navegue sem interrupções'
    },
    {
      icon: 'bell-ring',
      title: 'Notificações prioritárias',
      description: 'Seja o primeiro a saber sobre alterações nos tempos de espera'
    },
    {
      icon: 'map-marker',
      title: 'Mapa personalizado',
      description: 'Salve suas rotas favoritas e locais frequentes'
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Premium</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.introSection}>
          <Icon name="crown" size={48} color={theme.colors.primary} />
          <Text style={styles.introTitle}>
            Aproveite o SaudeLocal sem limitações
          </Text>
          <Text style={styles.introText}>
            Acesse recursos exclusivos e tenha a melhor experiência
          </Text>
        </View>

        <View style={styles.plansContainer}>
          {plans.map(plan => (
            <TouchableOpacity
              key={plan.id}
              style={[
                styles.planCard,
                plan.popular && styles.popularPlan
              ]}
            >
              {plan.popular && (
                <View style={styles.popularTag}>
                  <Text style={styles.popularTagText}>Mais Popular</Text>
                </View>
              )}
              
              <Text style={styles.planName}>{plan.name}</Text>
              <View style={styles.priceContainer}>
                <Text style={styles.planPrice}>{plan.price}</Text>
                <Text style={styles.planPeriod}>{plan.period}</Text>
              </View>
              {plan.savings && (
                <Text style={styles.savingsText}>{plan.savings}</Text>
              )}
              
              <TouchableOpacity 
                style={[
                  styles.subscribeButton,
                  plan.popular && styles.popularSubscribeButton
                ]}
              >
                <Text style={styles.subscribeButtonText}>Assinar</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.benefitsSection}>
          <Text style={styles.benefitsTitle}>Benefícios Premium</Text>
          {benefits.map((benefit, index) => (
            <View key={index} style={styles.benefitItem}>
              <Icon name={benefit.icon} size={24} color={theme.colors.primary} />
              <View style={styles.benefitInfo}>
                <Text style={styles.benefitTitle}>{benefit.title}</Text>
                <Text style={styles.benefitDescription}>
                  {benefit.description}
                </Text>
              </View>
            </View>
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
  content: {
    flex: 1,
  },
  introSection: {
    alignItems: 'center',
    padding: theme.spacing.xl,
  },
  introTitle: {
    fontSize: theme.typography.fontSize.xxlarge,
    fontWeight: 'bold',
    color: theme.colors.text,
    textAlign: 'center',
    marginVertical: theme.spacing.md,
  },
  introText: {
    fontSize: theme.typography.fontSize.medium,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
  plansContainer: {
    padding: theme.spacing.md,
  },
  planCard: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.large,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    ...theme.shadow.small,
  },
  popularPlan: {
    borderColor: theme.colors.primary,
    borderWidth: 2,
  },
  popularTag: {
    position: 'absolute',
    top: -12,
    right: theme.spacing.lg,
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: theme.spacing.sm,
    borderRadius: theme.borderRadius.full,
  },
  popularTagText: {
    color: theme.colors.buttonText,
    fontSize: theme.typography.fontSize.small,
    fontWeight: 'bold',
  },
  planName: {
    fontSize: theme.typography.fontSize.large,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginVertical: theme.spacing.sm,
  },
  planPrice: {
    fontSize: theme.typography.fontSize.title,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  planPeriod: {
    fontSize: theme.typography.fontSize.medium,
    color: theme.colors.textSecondary,
    marginLeft: theme.spacing.xs,
  },
  savingsText: {
    fontSize: theme.typography.fontSize.medium,
    color: theme.colors.secondary,
    marginBottom: theme.spacing.sm,
  },
  subscribeButton: {
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.medium,
    alignItems: 'center',
    marginTop: theme.spacing.sm,
  },
  subscribeButtonText: {
    color: theme.colors.buttonText,
    fontSize: theme.typography.fontSize.medium,
    fontWeight: 'bold',
  },
  benefitsSection: {
    padding: theme.spacing.lg,
  },
  benefitsTitle: {
    fontSize: theme.typography.fontSize.large,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: theme.spacing.lg,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  benefitInfo: {
    marginLeft: theme.spacing.md,
    flex: 1,
  },
  benefitTitle: {
    fontSize: theme.typography.fontSize.medium,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  benefitDescription: {
    fontSize: theme.typography.fontSize.medium,
    color: theme.colors.textSecondary,
  },
});

export default PremiumScreen;
