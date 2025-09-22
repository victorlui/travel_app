import { ThemedText } from "@/components/themed-text";
import { AppColors } from "@/constants/colors";
import { StepData } from "@/hooks/useStepNavigation";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";

interface ReviewSummaryStepProps {
  stepData: StepData;
  goToStep: (step: number) => void;
}

const travelerLabels: Record<string, string> = {
  solo: "Apenas Eu",
  couple: "Casal",
  family: "Família",
  friends: "Amigos",
};

export function ReviewSummaryStep({
  stepData,
  goToStep,
}: ReviewSummaryStepProps) {
  const formatDate = (date: Date | null) => {
    if (!date) return "Não selecionado";
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const calculateDuration = () => {
    if (!stepData.startDate || !stepData.endDate) return 0;
    return Math.ceil(
      (stepData.endDate.getTime() - stepData.startDate.getTime()) /
        (1000 * 60 * 60 * 24)
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <ThemedText style={styles.title}>Resumo da Viagem ✈️</ThemedText>
        </View>
        <ThemedText style={styles.subtitle}>
          Revise os detalhes da sua viagem antes de criarmos seu roteiro
          personalizado
        </ThemedText>
      </View>

      <View style={styles.summaryContainer}>
        {/* Viajantes */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryItem}>
            <View style={styles.summaryHeader}>
              <View style={styles.iconContainer}>
                <Ionicons name="people" size={24} color={AppColors.primary} />
              </View>
              <View style={styles.summaryContent}>
                <ThemedText style={styles.summaryLabel}>Quem Vai</ThemedText>
                <ThemedText style={styles.summaryValue}>
                  {stepData.travelers
                    ? travelerLabels[stepData.travelers]
                    : "Não selecionado"}
                </ThemedText>
              </View>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => goToStep(1)}
                activeOpacity={0.7}
              >
                <Ionicons name="pencil" size={20} color={AppColors.primary} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Datas */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryItem}>
            <View style={styles.summaryHeader}>
              <View style={styles.iconContainer}>
                <Ionicons name="calendar" size={24} color={AppColors.primary} />
              </View>
              <View style={styles.summaryContent}>
                <ThemedText style={styles.summaryLabel}>
                  Datas da Viagem
                </ThemedText>
              </View>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => goToStep(2)}
                activeOpacity={0.7}
              >
                <Ionicons name="pencil" size={20} color={AppColors.primary} />
              </TouchableOpacity>
            </View>
            <View style={styles.dateContainer}>
              <ThemedText style={styles.dateLabel}>Saída:</ThemedText>
              <View style={styles.dateRow}>
                <ThemedText style={styles.summaryValue}>
                  {formatDate(stepData.startDate || null)}
                </ThemedText>
              </View>
              <ThemedText style={[styles.dateLabel, { marginTop: 10 }]}>
                Retorno:
              </ThemedText>
              <View style={styles.dateRow}>
                <ThemedText style={styles.summaryValue}>
                  {formatDate(stepData.endDate || null)}
                </ThemedText>
              </View>
              {stepData.startDate && stepData.endDate && (
                <View style={styles.durationContainer}>
                  <Ionicons name="time" size={16} color={AppColors.primary} />
                  <ThemedText style={styles.durationText}>
                    Duração: {calculateDuration()} dias
                  </ThemedText>
                </View>
              )}
            </View>
          </View>
        </View>

        {/* Destino */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryItem}>
            <View style={styles.summaryHeader}>
              <View style={styles.iconContainer}>
                <Ionicons name="location" size={24} color={AppColors.primary} />
              </View>
              <View style={styles.summaryContent}>
                <ThemedText style={styles.summaryLabel}>Destino</ThemedText>
                <ThemedText style={styles.summaryValue}>
                  {stepData.destination || "Não selecionado"}
                </ThemedText>
              </View>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => goToStep(3)}
                activeOpacity={0.7}
              >
                <Ionicons name="pencil" size={20} color={AppColors.primary} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Orçamento */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryItem}>
            <View style={styles.summaryHeader}>
              <View style={styles.iconContainer}>
                <Ionicons name="wallet" size={24} color={AppColors.primary} />
              </View>
              <View style={styles.summaryContent}>
                <ThemedText style={styles.summaryLabel}>Orçamento</ThemedText>
                <ThemedText style={styles.summaryValue}>
                  {stepData.budget?.label || "Não selecionado"}
                </ThemedText>
                <ThemedText style={styles.summaryValue}>
                  {stepData.budget?.range}
                </ThemedText>
              </View>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => goToStep(4)}
                activeOpacity={0.7}
              >
                <Ionicons name="pencil" size={20} color={AppColors.primary} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.summaryCard}>
          <View style={styles.nextStepsCard}>
            <View style={styles.nextStepsHeader}>
              <View style={styles.nextStepsIconContainer}>
                <Ionicons name="rocket" size={24} color={AppColors.primary} />
              </View>
              <ThemedText style={styles.nextStepsTitle}>
                Próximos Passos
              </ThemedText>
            </View>
            <ThemedText style={styles.nextStepsText}>
              Após confirmar estes detalhes, nossa IA criará um roteiro de
              viagem personalizado para você, incluindo:
            </ThemedText>
            <View style={styles.featuresList}>
              <View style={styles.featureItem}>
                <View style={styles.checkIconContainer}>
                  <Ionicons
                    name="checkmark-circle"
                    size={18}
                    color={AppColors.success}
                  />
                </View>
                <ThemedText style={styles.featureText}>
                  Roteiro dia a dia detalhado
                </ThemedText>
              </View>
              <View style={styles.featureItem}>
                <View style={styles.checkIconContainer}>
                  <Ionicons
                    name="checkmark-circle"
                    size={18}
                    color={AppColors.success}
                  />
                </View>
                <ThemedText style={styles.featureText}>
                  Recomendações de atividades
                </ThemedText>
              </View>
              <View style={styles.featureItem}>
                <View style={styles.checkIconContainer}>
                  <Ionicons
                    name="checkmark-circle"
                    size={18}
                    color={AppColors.success}
                  />
                </View>
                <ThemedText style={styles.featureText}>
                  Detalhamento do orçamento
                </ThemedText>
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  summaryContent: {
    flex: 1,
  },
  editButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: AppColors.primary + "10",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: AppColors.primary + "30",
  },
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    marginBottom: 32,
  },
  titleContainer: {
    marginBottom: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: AppColors.text,
  },

  subtitle: {
    fontSize: 16,
    color: AppColors.textSecondary,
    lineHeight: 24,
  },
  summaryContainer: {
    marginBottom: 32,
    gap: 15,
  },
  summaryCard: {
    borderLeftWidth: 0,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    backgroundColor: "#ffffff",
    padding: 20,
  },
  summaryItem: {
    gap: 16,
  },
  summaryHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: AppColors.primary + "15",
    justifyContent: "center",
    alignItems: "center",
  },
  summaryLabel: {
    fontSize: 18,
    fontWeight: "700",
    color: AppColors.text,
  },
  summaryValue: {
    fontSize: 16,
    color: AppColors.textSecondary,
    lineHeight: 22,
  },
  dateContainer: {
    marginLeft: 64,
  },
  dateRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  dateLabel: {
    fontSize: 15,
    fontWeight: "600",
    color: AppColors.text,
    minWidth: 60,
    marginBottom: 5,
  },
  durationContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: AppColors.primary + "20",
  },
  durationText: {
    fontSize: 15,
    color: AppColors.primary,
    fontWeight: "700",
  },
  nextStepsContainer: {
    marginBottom: 20,
  },
  nextStepsCard: {},
  nextStepsHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    marginBottom: 16,
  },
  nextStepsIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: AppColors.primary + "20",
    justifyContent: "center",
    alignItems: "center",
  },
  nextStepsTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: AppColors.text,
    flex: 1,
  },
  nextStepsText: {
    fontSize: 16,
    color: AppColors.textSecondary,
    lineHeight: 24,
    marginBottom: 20,
  },
  featuresList: {
    gap: 16,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  checkIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: AppColors.success + "15",
    justifyContent: "center",
    alignItems: "center",
  },
  featureText: {
    fontSize: 15,
    color: AppColors.textSecondary,
    fontWeight: "500",
    flex: 1,
  },
});
