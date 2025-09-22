import { PlacesAutocompleteInput } from "@/components/form/PlacesAutocompleteInput";
import { ThemedText } from "@/components/themed-text";
import { AppColors } from "@/constants/colors";
import React from "react";
import { StyleSheet, View } from "react-native";

interface DestinationStepProps {
  destination?: string;
  onDestinationChange: (destination: any) => void;
}

export function DestinationStep({
  destination,
  onDestinationChange,
}: DestinationStepProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <ThemedText style={styles.title}>Qual será seu destino? 🌍</ThemedText>
        <ThemedText style={styles.subtitle}>
          Busque por cidades, países ou lugares específicos
        </ThemedText>
      </View>

      <View style={styles.inputContainer}>
        <PlacesAutocompleteInput
          label="Informe seu destino"
          placeholder="Para onde você quer viajar?"
          value={destination || ""}
          onPlaceSelected={onDestinationChange}
          required
        />
      </View>

      <View style={styles.tipsContainer}>
        <ThemedText style={styles.tipsTitle}>💡 Dicas:</ThemedText>
        <ThemedText style={styles.tipText}>
          • Tente buscar por cidades específicas como Paris, França
        </ThemedText>
        <ThemedText style={styles.tipText}>
          • Você também pode buscar por regiões como Toscana, Itália
        </ThemedText>
        <ThemedText style={styles.tipText}>
          • Destinos populares mostrarão sugestões enquanto você digita
        </ThemedText>
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
    color: AppColors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,

    color: AppColors.textSecondary,
    lineHeight: 22,
  },
  inputContainer: {
    marginBottom: 32,
  },
  tipsContainer: {
    padding: 16,
    backgroundColor: AppColors.surface,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: AppColors.primary,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: AppColors.text,
    marginBottom: 8,
  },
  tipText: {
    fontSize: 14,
    color: AppColors.textSecondary,
    marginBottom: 4,
    lineHeight: 20,
  },
});
