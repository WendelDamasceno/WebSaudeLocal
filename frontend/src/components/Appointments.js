import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../styles/theme';

const Appointments = () => {
  const appointments = [
    {
      id: '1',
      doctor: 'Dr. João Silva',
      specialty: 'Clínico Geral',
      date: '15/05/2023',
      time: '14:30',
      status: 'confirmed'
    },
    // ... mais agendamentos
  ];

  const renderAppointment = (appointment) => (
    <View key={appointment.id} style={styles.appointmentCard}>
      <View style={styles.appointmentHeader}>
        <Text style={styles.doctorName}>{appointment.doctor}</Text>
        <Text style={styles.specialty}>{appointment.specialty}</Text>
      </View>
      
      <View style={styles.appointmentDetails}>
        <View style={styles.detailRow}>
          <Icon name="calendar" size={20} color={theme.colors.primary} />
          <Text style={styles.detailText}>{appointment.date}</Text>
        </View>
        
        <View style={styles.detailRow}>
          <Icon name="clock-outline" size={20} color={theme.colors.primary} />
          <Text style={styles.detailText}>{appointment.time}</Text>
        </View>
      </View>
      
      <TouchableOpacity style={styles.actionButton}>
        <Text style={styles.actionButtonText}>Ver Detalhes</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Minhas Consultas</Text>
      {appointments.map(renderAppointment)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.spacing.md,
  },
  title: {
    fontSize: theme.typography.fontSize.xlarge,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: theme.spacing.lg,
  },
  appointmentCard: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.medium,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    ...theme.shadow.small,
  },
  appointmentHeader: {
    marginBottom: theme.spacing.sm,
  },
  doctorName: {
    fontSize: theme.typography.fontSize.large,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  specialty: {
    fontSize: theme.typography.fontSize.medium,
    color: theme.colors.textSecondary,
  },
  appointmentDetails: {
    marginVertical: theme.spacing.sm,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  detailText: {
    fontSize: theme.typography.fontSize.medium,
    color: theme.colors.text,
    marginLeft: theme.spacing.sm,
  },
  actionButton: {
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.medium,
    alignItems: 'center',
    marginTop: theme.spacing.sm,
  },
  actionButtonText: {
    color: theme.colors.buttonText,
    fontSize: theme.typography.fontSize.medium,
    fontWeight: 'bold',
  },
});

export default Appointments;
