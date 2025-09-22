import React from 'react';
import {
  Modal,
  View,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { AppColors } from '@/constants/colors';

interface LoadingModalProps {
  visible: boolean;
  title?: string;
  subtitle?: string;
  progress?: number;
}

export function LoadingModal({
  visible,
  title = "Generating Itinerary...",
  subtitle = "Please wait while our AI works its magic to create the perfect trip plan tailored to your preferences.",
  progress,
}: LoadingModalProps) {
  const formatProgress = () => {
    if (progress !== undefined) {
      return `${title} (${Math.round(progress)}%)`;
    }
    return title;
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <View style={styles.content}>
            {/* Loading Spinner */}
            <View style={styles.spinnerContainer}>
              <ActivityIndicator 
                size="large" 
                color={AppColors.primary}
                style={styles.spinner}
              />
            </View>
            
            {/* Title */}
            <ThemedText style={styles.title}>
              {formatProgress()}
            </ThemedText>
            
            {/* Subtitle */}
            <ThemedText style={styles.subtitle}>
              {subtitle}
            </ThemedText>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: width * 0.85,
    maxWidth: 320,
    backgroundColor: AppColors.surface,
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
  content: {
    alignItems: 'center',
    width: '100%',
  },
  spinnerContainer: {
    marginBottom: 24,
    padding: 16,
    backgroundColor: '#F0F8FF',
    borderRadius: 50,
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  spinner: {
    transform: [{ scale: 1.2 }],
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: AppColors.text,
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 24,
  },
  subtitle: {
    fontSize: 14,
    color: AppColors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 8,
  },
});