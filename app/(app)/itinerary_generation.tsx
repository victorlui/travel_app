import { ThemedText } from "@/components/themed-text";
import { AppColors } from "@/constants/colors";
import { StepData } from "@/hooks/useStepNavigation";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface ItineraryGenerationScreenProps {
  stepData: StepData;
  onComplete: (itinerary: any) => void;
  onError: (error: string) => void;
}

export default function ItineraryGenerationScreen({
  stepData,
  onComplete,
  onError,
}: ItineraryGenerationScreenProps) {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState("Iniciando geração...");

  const generationSteps = [
    "Analisando suas preferências...",
    "Pesquisando destinos...",
    "Criando roteiro personalizado...",
    "Calculando orçamento...",
    "Finalizando detalhes...",
  ];

  useEffect(() => {
    generateItinerary();
  }, []);

  const generateItinerary = async () => {
    try {
      for (let i = 0; i < generationSteps.length; i++) {
        setCurrentStep(generationSteps[i]);
        setProgress((i + 1) * 20);

        // Simula tempo de processamento
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }

      // Simula chamada da API
      const mockItinerary = {
        id: Date.now(),
        destination: stepData.destination,
        travelers: stepData.travelers,
        startDate: stepData.startDate,
        endDate: stepData.endDate,
        budget: stepData.budget,
        activities: [
          {
            day: 1,
            title: "Chegada e Check-in",
            description: "Chegada ao destino e acomodação",
            time: "14:00",
          },
          {
            day: 1,
            title: "Exploração Local",
            description: "Caminhada pela região central",
            time: "16:00",
          },
        ],
      };

      setProgress(100);
      setCurrentStep("Itinerário criado com sucesso!");

      // Aguarda um pouco antes de chamar onComplete
      setTimeout(() => {
        onComplete(mockItinerary);
      }, 1000);
    } catch (error) {
      onError("Erro ao gerar itinerário. Tente novamente.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <Ionicons name="airplane" size={48} color={AppColors.primary} />
          </View>
          <ThemedText style={styles.title}>
            Criando seu itinerário perfeito
          </ThemedText>
          <ThemedText style={styles.subtitle}>
            Nossa IA está trabalhando para criar a viagem dos seus sonhos
          </ThemedText>
        </View>

        {/* Trip Summary */}
        <View style={styles.summarySection}>
          <ThemedText style={styles.summaryTitle}>
            Resumo da sua viagem
          </ThemedText>

          <View style={styles.summaryItem}>
            <Ionicons name="location" size={20} color={AppColors.primary} />
            <ThemedText style={styles.summaryText}>
              {stepData.destination}
            </ThemedText>
          </View>

          <View style={styles.summaryItem}>
            <Ionicons name="calendar" size={20} color={AppColors.primary} />
            <ThemedText style={styles.summaryText}>
              {stepData.startDate?.toLocaleDateString("pt-BR")} -{" "}
              {stepData.endDate?.toLocaleDateString("pt-BR")}
            </ThemedText>
          </View>

          <View style={styles.summaryItem}>
            <Ionicons name="people" size={20} color={AppColors.primary} />
            <ThemedText style={styles.summaryText}>
              {stepData.travelers === "solo"
                ? "Viagem solo"
                : stepData.travelers === "couple"
                ? "Em casal"
                : stepData.travelers === "family"
                ? "Em família"
                : "Com amigos"}
            </ThemedText>
          </View>

          <View style={styles.summaryItem}>
            <Ionicons name="wallet" size={20} color={AppColors.primary} />
            <ThemedText style={styles.summaryText}>
              {stepData.budget?.label}
            </ThemedText>
          </View>
        </View>

        {/* Progress Section */}
        <View style={styles.progressSection}>
          {/* Current Step */}
          <View style={styles.stepContainer}>
            <ActivityIndicator
              size="large"
              color={AppColors.primary}
              style={styles.spinner}
            />
            <ThemedText style={styles.stepText}>{currentStep}</ThemedText>
          </View>

          {/* Progress Bar */}
          <View style={styles.progressContainer}>
            <View style={styles.progressTrack}>
              <View style={[styles.progressFill, { width: `${progress}%` }]} />
            </View>
            <ThemedText style={styles.progressText}>{progress}%</ThemedText>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  header: {
    alignItems: "center",
    marginBottom: 48,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: `${AppColors.primary}15`,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 12,
    color: AppColors.primary,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: AppColors.textSecondary,
    lineHeight: 24,
  },
  progressSection: {
    marginVertical: 48,
  },
  progressContainer: {
    marginBottom: 32,
  },
  progressTrack: {
    height: 8,
    backgroundColor: AppColors.border,
    borderRadius: 4,
    overflow: "hidden",
    marginBottom: 8,
  },
  progressFill: {
    height: "100%",
    backgroundColor: AppColors.primary,
    borderRadius: 4,
  },
  progressText: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    color: AppColors.primary,
  },
  stepContainer: {
    alignItems: "center",
  },
  spinner: {
    marginBottom: 16,
  },
  stepText: {
    fontSize: 16,
    textAlign: "center",
    color: AppColors.textSecondary,
    fontWeight: "500",
  },
  summarySection: {
    backgroundColor: `${AppColors.primary}08`,
    borderRadius: 16,
    padding: 20,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
    color: AppColors.primary,
  },
  summaryItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  summaryText: {
    fontSize: 14,
    marginLeft: 12,
    color: AppColors.textSecondary,
    flex: 1,
  },
});
