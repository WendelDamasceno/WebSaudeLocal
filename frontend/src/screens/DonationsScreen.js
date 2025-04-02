import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { theme } from '../styles/theme';

const DonationsScreen = ({ navigation }) => {
  const [selectedValue, setSelectedValue] = useState(null);

  const donationValues = [
    { value: 5, text: 'R$ 5,00' },
    { value: 10, text: 'R$ 10,00' },
    { value: 20, text: 'R$ 20,00' },
    { value: 50, text: 'R$ 50,00' },
    { value: 100, text: 'R$ 100,00' },
  ];

  const handleDonation = () => {
    if (!selectedValue) {
      return;
    }
    // Implementar lógica de pagamento aqui
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Apoie o SaudeLocal</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.introSection}>
          <Icon name="heart" size={48} color={theme.colors.emergency} />
          <Text style={styles.introTitle}>
            Ajude-nos a continuar ajudando
          </Text>
          <Text style={styles.introText}>
            Sua doação ajuda a manter o SaudeLocal gratuito e em constante evolução
          </Text>
        </View>

        <View style={styles.impactSection}>
          <Text style={styles.sectionTitle}>Seu impacto</Text>
          <View style={styles.impactItem}>
            <Icon name="server" size={24} color={theme.colors.primary} />
            <View style={styles.impactInfo}>
              <Text style={styles.impactTitle}>Manutenção dos servidores</Text>
              <Text style={styles.impactDescription}>
                Mantém o aplicativo funcionando 24h por dia
              </Text>
            </View>
          </View>
          <View style={styles.impactItem}>
            <Icon name="code-tags" size={24} color={theme.colors.primary} />
            <View style={styles.impactInfo}>
              <Text style={styles.impactTitle}>Desenvolvimento</Text>
              <Text style={styles.impactDescription}>
                Permite criar novas funcionalidades
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.donationSection}>
          <Text style={styles.sectionTitle}>Escolha um valor</Text>
          <View style={styles.valuesContainer}>
            {donationValues.map((item) => (
              <TouchableOpacity
                key={item.value}
                style={[
                  styles.valueButton,
                  selectedValue === item.value && styles.selectedValue
                ]}
                onPress={() => setSelectedValue(item.value)}
              >
                <Text style={[
                  styles.valueText,
                  selectedValue === item.value && styles.selectedValueText
                ]}>
                  {item.text}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.paymentSection}>
          <Text style={styles.sectionTitle}>Formas de pagamento</Text>
          <View style={styles.paymentMethods}>
            <Image 
              source={require('../assets/pix-logo.png')}
              style={styles.paymentLogo}
              resizeMode="contain"
            />
            <View style={styles.paymentDivider} />
            <Image 
              source={require('../assets/card-icons.png')}
              style={styles.paymentLogo}
              resizeMode="contain"
            />
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={[
            styles.donateButton,
            !selectedValue && styles.disabledButton
          ]}
          onPress={handleDonation}
          disabled={!selectedValue}
        >
          <Text style={styles.donateButtonText}>
            {selectedValue ? `Doar R$ ${selectedValue},00` : 'Escolha um valor'}
          </Text>
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
  impactSection: {
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.card,
    marginBottom: theme.spacing.md,
  },
  sectionTitle: {
    fontSize: theme.typography.fontSize.large,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  impactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  impactInfo: {
    marginLeft: theme.spacing.md,
    flex: 1,
  },
  impactTitle: {
    fontSize: theme.typography.fontSize.medium,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  impactDescription: {
    fontSize: theme.typography.fontSize.medium,
    color: theme.colors.textSecondary,
  },
  donationSection: {
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.card,
    marginBottom: theme.spacing.md,
  },
  valuesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  valueButton: {
    width: '48%',
    backgroundColor: theme.colors.background,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.medium,
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  selectedValue: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  valueText: {
    fontSize: theme.typography.fontSize.large,
    color: theme.colors.text,
    fontWeight: 'bold',
  },
  selectedValueText: {
    color: theme.colors.buttonText,
  },
  paymentSection: {
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.card,
  },
  paymentMethods: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paymentLogo: {
    height: 40,
    width: 120,
  },
  paymentDivider: {
    width: 1,
    height: 30,
    backgroundColor: theme.colors.border,
    marginHorizontal: theme.spacing.lg,
  },
  footer: {
    padding: theme.spacing.md,
    backgroundColor: theme.colors.card,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  donateButton: {
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.medium,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: theme.colors.border,
  },
  donateButtonText: {
    color: theme.colors.buttonText,
    fontSize: theme.typography.fontSize.large,
    fontWeight: 'bold',
  },
});

export default DonationsScreen;
