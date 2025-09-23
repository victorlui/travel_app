import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '@/components/themed-text';
import { TravelCard } from '@/components/form/TravelCard';
import { AppColors } from '@/constants/colors';

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: keyof typeof Ionicons.glyphMap;
  color?: string;
  progress?: number;
  maxValue?: number;
}

export function StatsCard({ 
  title, 
  value, 
  subtitle, 
  icon, 
  color = AppColors.primary,
  progress,
  maxValue 
}: StatsCardProps) {
  return (
    <TravelCard style={styles.card}>
      <View style={styles.header}>
        <View style={[styles.iconContainer, { backgroundColor: `${color}15` }]}>
          <Ionicons name={icon} size={24} color={color} />
        </View>
        <View style={styles.content}>
          <ThemedText style={styles.title}>{title}</ThemedText>
          {subtitle && (
            <ThemedText style={styles.subtitle}>{subtitle}</ThemedText>
          )}
        </View>
      </View>
      
      <View style={styles.valueContainer}>
        <ThemedText style={[styles.value, { color }]}>{value}</ThemedText>
        {maxValue && (
          <ThemedText style={styles.maxValue}>/ {maxValue}</ThemedText>
        )}
      </View>

      {progress !== undefined && (
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill, 
                { 
                  width: `${Math.min(progress * 100, 100)}%`,
                  backgroundColor: color 
                }
              ]} 
            />
          </View>
          <ThemedText style={styles.progressText}>
            {Math.round(progress * 100)}% utilizado
          </ThemedText>
        </View>
      )}
    </TravelCard>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: AppColors.text,
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 14,
    color: AppColors.textSecondary,
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 12,
  },
  value: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  maxValue: {
    fontSize: 18,
    color: AppColors.textSecondary,
    marginLeft: 4,
  },
  progressContainer: {
    marginTop: 8,
  },
  progressBar: {
    height: 6,
    backgroundColor: AppColors.border,
    borderRadius: 3,
    marginBottom: 6,
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    color: AppColors.textSecondary,
    textAlign: 'center',
  },
});