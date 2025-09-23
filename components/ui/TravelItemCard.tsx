import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '@/components/themed-text';
import { TravelCard } from '@/components/form/TravelCard';
import { AppColors } from '@/constants/colors';

interface TravelItemCardProps {
  destination: string;
  startDate: string;
  endDate: string;
  status: 'planned' | 'in_progress' | 'completed';
  travelers: string;
  budget: number;
  onPress?: () => void;
}

export function TravelItemCard({
  destination,
  startDate,
  endDate,
  status,
  travelers,
  budget,
  onPress,
}: TravelItemCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
    });
  };

  const getTravelersLabel = (travelers: string) => {
    const labels: Record<string, string> = {
      solo: 'Sozinho',
      couple: 'Casal',
      family: 'Família',
      friends: 'Amigos',
    };
    return labels[travelers] || travelers;
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'planned':
        return {
          color: AppColors.primary,
          label: 'Planejada',
          icon: 'calendar-outline' as const,
        };
      case 'in_progress':
        return {
          color: AppColors.warning,
          label: 'Em andamento',
          icon: 'airplane-outline' as const,
        };
      case 'completed':
        return {
          color: AppColors.success,
          label: 'Concluída',
          icon: 'checkmark-circle-outline' as const,
        };
      default:
        return {
          color: AppColors.textSecondary,
          label: status,
          icon: 'help-circle-outline' as const,
        };
    }
  };

  const statusConfig = getStatusConfig(status);

  return (
    <TravelCard style={styles.card}>
      <TouchableOpacity style={styles.content} onPress={onPress}>
        <View style={styles.header}>
          <View style={styles.destinationContainer}>
            <ThemedText style={styles.destination}>{destination}</ThemedText>
            <View style={styles.metaRow}>
              <View style={styles.metaItem}>
                <Ionicons 
                  name="calendar-outline" 
                  size={14} 
                  color={AppColors.textSecondary} 
                />
                <ThemedText style={styles.metaText}>
                  {formatDate(startDate)} - {formatDate(endDate)}
                </ThemedText>
              </View>
              <View style={styles.metaItem}>
                <Ionicons 
                  name="people-outline" 
                  size={14} 
                  color={AppColors.textSecondary} 
                />
                <ThemedText style={styles.metaText}>
                  {getTravelersLabel(travelers)}
                </ThemedText>
              </View>
            </View>
          </View>
          
          <View style={styles.statusContainer}>
            <View 
              style={[
                styles.statusBadge, 
                { backgroundColor: `${statusConfig.color}20` }
              ]}
            >
              <Ionicons 
                name={statusConfig.icon} 
                size={12} 
                color={statusConfig.color} 
              />
              <ThemedText 
                style={[styles.statusText, { color: statusConfig.color }]}
              >
                {statusConfig.label}
              </ThemedText>
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <View style={styles.budgetContainer}>
            <Ionicons 
              name="wallet-outline" 
              size={16} 
              color={AppColors.textSecondary} 
            />
            <ThemedText style={styles.budgetText}>
              R$ {budget.toLocaleString('pt-BR')}
            </ThemedText>
          </View>
          
          <View style={styles.actionContainer}>
            <ThemedText style={styles.actionText}>Ver detalhes</ThemedText>
            <Ionicons 
              name="chevron-forward" 
              size={16} 
              color={AppColors.primary} 
            />
          </View>
        </View>
      </TouchableOpacity>
    </TravelCard>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 12,
    padding: 0,
  },
  content: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  destinationContainer: {
    flex: 1,
    marginRight: 12,
  },
  destination: {
    fontSize: 18,
    fontWeight: '600',
    color: AppColors.text,
    marginBottom: 8,
  },
  metaRow: {
    gap: 8,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaText: {
    fontSize: 13,
    color: AppColors.textSecondary,
  },
  statusContainer: {
    alignItems: 'flex-end',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: AppColors.border,
  },
  budgetContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  budgetText: {
    fontSize: 16,
    fontWeight: '600',
    color: AppColors.text,
  },
  actionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  actionText: {
    fontSize: 14,
    color: AppColors.primary,
    fontWeight: '500',
  },
});