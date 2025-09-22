import { ThemedText } from "@/components/themed-text";
import { AppColors } from "@/constants/colors";
import { BudgetRange, budgetRanges } from "@/types/budget";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";

interface BudgetStepProps {
  budget?: BudgetRange | null;
  onBudgetChange: (budget: BudgetRange | null) => void;
}

export function BudgetStep({ budget, onBudgetChange }: BudgetStepProps) {
  const [selectedRange, setSelectedRange] = useState<BudgetRange | null>(
    budget || null
  );

  const handleRangeSelect = (budgetRange: BudgetRange) => {
    setSelectedRange(budgetRange);

    onBudgetChange(budgetRange);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <ThemedText style={styles.title}>
          Defina o orçamento da sua viagem 💰
        </ThemedText>
        <ThemedText style={styles.subtitle}>
          Isso nos ajuda a recomendar atividades e acomodações dentro do seu
          orçamento
        </ThemedText>
      </View>

      <View style={styles.rangesContainer}>
        {budgetRanges.map((range) => (
          <TouchableOpacity
            key={range.id}
            style={[
              styles.rangeCard,
              selectedRange === range
                ? styles.selectedRange
                : styles.unselectedRange,
            ]}
            onPress={() => handleRangeSelect(range)}
          >
            <View style={styles.cardContent}>
              <View style={styles.rangeContent}>
                <Ionicons
                  name={range.icon}
                  size={32}
                  color={
                    selectedRange === range
                      ? AppColors.primary
                      : AppColors.textSecondary
                  }
                />
                <View>
                  <ThemedText style={styles.rangeLabel}>
                    {range.label}
                  </ThemedText>
                  <ThemedText style={styles.rangeAmount}>
                    {range.range}
                  </ThemedText>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    marginBottom: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: AppColors.text,
    marginBottom: 8,
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 16,
    color: AppColors.textSecondary,
    lineHeight: 22,
  },
  rangesContainer: {
    gap: 16,
    marginBottom: 24,
  },
  rangeCard: {
    borderRadius: 16,
    padding: 20,
  },
  selectedRange: {
    borderWidth: 2,
    borderColor: AppColors.primary,
    transform: [{ scale: 1.02 }],
  },
  unselectedRange: {
    borderWidth: 1,
    borderColor: AppColors.border,
  },
  cardContent: {
    borderWidth: 0,
    borderColor: "transparent",
  },
  rangeContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  rangeLabel: {
    fontSize: 18,
    fontWeight: "600",
    color: AppColors.text,
  },
  rangeAmount: {
    fontSize: 14,
    color: AppColors.textSecondary,
  },
  budgetSummary: {
    padding: 16,
    backgroundColor: AppColors.primary + "10",
    borderRadius: 12,
    alignItems: "center",
  },
  summaryText: {
    fontSize: 16,
    fontWeight: "600",
    color: AppColors.primary,
  },
});
