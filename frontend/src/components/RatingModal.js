import React, { useState } from 'react';
import { 
  View, 
  Text, 
  Modal, 
  StyleSheet, 
  TouchableOpacity, 
  TextInput,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { theme } from '../styles/theme';

const RatingCriteria = ({ title, rating, setRating }) => {
  return (
    <View style={styles.criteriaContainer}>
      <Text style={styles.criteriaTitle}>{title}</Text>
      <View style={styles.starsContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity
            key={star}
            onPress={() => setRating(star)}
            style={styles.starButton}
          >
            <Icon
              name={rating >= star ? 'star' : 'star-outline'}
              size={30}
              color={rating >= star ? '#FFD700' : theme.colors.border}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const RatingModal = ({ visible, onClose, unitName }) => {
  const [attendanceRating, setAttendanceRating] = useState(0);
  const [cleanlinessRating, setCleanlinessRating] = useState(0);
  const [qualityRating, setQualityRating] = useState(0);
  const [occupationRating, setOccupationRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = () => {
    // Aqui você implementaria a lógica para enviar a avaliação para o backend
    console.log({
      unitName,
      attendanceRating,
      cleanlinessRating,
      qualityRating,
      occupationRating,
      comment,
    });
    
    // Resetar os valores
    setAttendanceRating(0);
    setCleanlinessRating(0);
    setQualityRating(0);
    setOccupationRating(0);
    setComment('');
    
    // Fechar o modal
    onClose();
  };

  const calculateAverageRating = () => {
    const sum = attendanceRating + cleanlinessRating + qualityRating + occupationRating;
    const count = [attendanceRating, cleanlinessRating, qualityRating, occupationRating]
      .filter(rating => rating > 0).length;
    
    if (count === 0) return 0;
    return (sum / count).toFixed(1);
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.keyboardView}
          >
            <TouchableWithoutFeedback>
              <View style={styles.modalContainer}>
                <View style={styles.header}>
                  <Text style={styles.modalTitle}>Avaliar</Text>
                  <Text style={styles.unitName}>{unitName}</Text>
                </View>
                
                <View style={styles.averageContainer}>
                  <Text style={styles.averageLabel}>Sua avaliação geral</Text>
                  <Text style={styles.averageRating}>{calculateAverageRating()}</Text>
                  <View style={styles.starsContainer}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Icon
                        key={star}
                        name={parseFloat(calculateAverageRating()) >= star ? 'star' : 'star-outline'}
                        size={24}
                        color={parseFloat(calculateAverageRating()) >= star ? '#FFD700' : theme.colors.border}
                      />
                    ))}
                  </View>
                </View>
                
                <RatingCriteria
                  title="Atendimento"
                  rating={attendanceRating}
                  setRating={setAttendanceRating}
                />
                
                <RatingCriteria
                  title="Limpeza"
                  rating={cleanlinessRating}
                  setRating={setCleanlinessRating}
                />
                
                <RatingCriteria
                  title="Qualidade dos Serviços"
                  rating={qualityRating}
                  setRating={setQualityRating}
                />
                
                <RatingCriteria
                  title="Lotação"
                  rating={occupationRating}
                  setRating={setOccupationRating}
                />
                
                <View style={styles.commentContainer}>
                  <Text style={styles.commentLabel}>Comentário (opcional)</Text>
                  <TextInput
                    style={styles.commentInput}
                    placeholder="Compartilhe sua experiência..."
                    multiline
                    value={comment}
                    onChangeText={setComment}
                    maxLength={500}
                  />
                </View>
                
                <View style={styles.buttons}>
                  <TouchableOpacity 
                    style={styles.cancelButton}
                    onPress={onClose}
                  >
                    <Text style={styles.cancelButtonText}>Cancelar</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    style={[
                      styles.submitButton,
                      calculateAverageRating() === '0' && styles.disabledButton
                    ]}
                    onPress={handleSubmit}
                    disabled={calculateAverageRating() === '0'}
                  >
                    <Text style={styles.submitButtonText}>Enviar Avaliação</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  keyboardView: {
    width: '100%',
  },
  modalContainer: {
    backgroundColor: theme.colors.background,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: theme.spacing.lg,
    maxHeight: '90%',
  },
  header: {
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  modalTitle: {
    fontSize: theme.typography.fontSize.xlarge,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  unitName: {
    fontSize: theme.typography.fontSize.medium,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.xs,
  },
  averageContainer: {
    alignItems: 'center',
    marginVertical: theme.spacing.md,
    padding: theme.spacing.md,
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.medium,
    ...theme.shadow.small,
  },
  averageLabel: {
    fontSize: theme.typography.fontSize.medium,
    color: theme.colors.textSecondary,
  },
  averageRating: {
    fontSize: 36,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginVertical: theme.spacing.xs,
  },
  criteriaContainer: {
    marginBottom: theme.spacing.md,
  },
  criteriaTitle: {
    fontSize: theme.typography.fontSize.medium,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  starButton: {
    padding: theme.spacing.xs,
  },
  commentContainer: {
    marginBottom: theme.spacing.lg,
  },
  commentLabel: {
    fontSize: theme.typography.fontSize.medium,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  commentInput: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.medium,
    padding: theme.spacing.md,
    height: 100,
    textAlignVertical: 'top',
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    flex: 0.48,
    alignItems: 'center',
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.medium,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  cancelButtonText: {
    color: theme.colors.textSecondary,
    fontWeight: 'bold',
  },
  submitButton: {
    flex: 0.48,
    alignItems: 'center',
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.medium,
    backgroundColor: theme.colors.primary,
  },
  disabledButton: {
    backgroundColor: theme.colors.border,
  },
  submitButtonText: {
    color: theme.colors.buttonText,
    fontWeight: 'bold',
  },
});

export default RatingModal;
