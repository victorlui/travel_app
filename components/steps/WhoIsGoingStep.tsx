import { ThemedText } from "@/components/themed-text";
import { AppColors } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

interface WhoIsGoingStepProps {
  value?: string;
  onValueChange: (value: string) => void;
}

const opcoesViajantes = [
  {
    id: "solo",
    label: "Só Eu",
    description: "Estou viajando sozinho",
    icon: "person" as const,
  },
  {
    id: "couple",
    label: "Em Casal",
    description: "Estou viajando com meu par",
    icon: "heart" as const,
  },
  {
    id: "family",
    label: "Família",
    description: "Estou viajando com minha família",
    icon: "people" as const,
  },
  {
    id: "friends",
    label: "Amigos",
    description: "Estou viajando com meus amigos",
    icon: "people-circle" as const,
  },
];

export function WhoIsGoingStep({ value, onValueChange }: WhoIsGoingStepProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <ThemedText style={styles.title}>Quem está indo? 😊</ThemedText>
        <ThemedText style={styles.description}>
          Selecione o número de viajantes para planejar sua viagem.
        </ThemedText>
      </View>

      <View style={styles.optionsContainer}>
        {opcoesViajantes.map((option) => (
          <TouchableOpacity
            key={option.id}
            style={[
              styles.optionCard,
              value === option.id
                ? styles.selectedOption
                : styles.unselectedOption,
            ]}
            onPress={() => onValueChange(option.id)}
          >
            <View style={styles.cardContent}>
              <View style={styles.optionContent}>
                <Ionicons
                  name={option.icon}
                  size={32}
                  color={
                    value === option.id
                      ? AppColors.primary
                      : AppColors.textSecondary
                  }
                />
                <View>
                  <ThemedText style={[styles.optionLabel]}>
                    {option.label}
                  </ThemedText>
                  <ThemedText style={[styles.optionDescription]}>
                    {option.description}
                  </ThemedText>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
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
    marginBottom: 16,
    color: AppColors.text,
  },
  description: {
    fontSize: 16,
    color: AppColors.textSecondary,
    width: "80%",
  },
  optionsContainer: {
    flex: 1,
    gap: 16,
  },
  optionCard: {
    borderRadius: 16,
    padding: 20,
  },
  selectedOption: {
    borderWidth: 2,
    borderColor: AppColors.primary,
    transform: [{ scale: 1.02 }],
  },
  unselectedOption: {
    borderWidth: 1,
    borderColor: AppColors.border,
  },
  cardContent: {
    borderWidth: 0,
    borderColor: "transparent",
  },
  optionContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  optionLabel: {
    fontSize: 18,
    fontWeight: "600",
    color: AppColors.text,
  },
  selectedOptionText: {
    color: AppColors.text,
  },
  optionDescription: {
    fontSize: 14,
    color: AppColors.textSecondary,
  },
  selectedOptionDescription: {
    color: AppColors.surface,
  },
});
