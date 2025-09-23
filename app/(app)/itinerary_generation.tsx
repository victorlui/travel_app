import { ThemedText } from "@/components/themed-text";
import { AppColors } from "@/constants/colors";
import { useWebsocket } from "@/hooks/use-websocket";
import { useItineraryGenerationStore } from "@/store/itinerary_generation_store";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, StatusBar, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ItineraryGenerationScreen() {
  const { data } = useItineraryGenerationStore.getState();
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState("Iniciando geração...");
  const { socket, isConnected } = useWebsocket();

  const steps = React.useMemo(
    () => [
      "Analisando destino...",
      "Pesquisando atrações...",
      "Verificando disponibilidade...",
      "Calculando orçamento...",
      "Organizando cronograma...",
      "Finalizando itinerário...",
    ],
    []
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + Math.random() * 15;
        if (newProgress >= 100) {
          clearInterval(interval);
          return 100;
        }

        const stepIndex = Math.floor((newProgress / 100) * steps.length);
        if (stepIndex < steps.length) {
          setCurrentStep(steps[stepIndex]);
        }

        return newProgress;
      });
    }, 1500);

    return () => clearInterval(interval);
  }, [steps]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
    });
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <SafeAreaView style={styles.container}>
        {/* Header com informações básicas */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <ThemedText style={styles.familyTrip}>
              {data?.travel.travelers === "solo"
                ? "Viajando Sozinho"
                : data?.travel.travelers === "couple"
                ? "Viajando em Casal"
                : data?.travel.travelers === "family"
                ? "Viajando em Família"
                : "Viajando em Grupo"}
            </ThemedText>
            <ThemedText style={styles.statusBadge}>Gerando...</ThemedText>
          </View>

          <View style={styles.destinationSection}>
            <ThemedText style={styles.tripToLabel}>Viajando para</ThemedText>
            <ThemedText style={styles.destinationName}>
              {data?.travel?.destination || "Yogyakarta"}
            </ThemedText>
          </View>

          {data?.travel && (
            <View style={styles.dateSection}>
              <View style={styles.dateItem}>
                <ThemedText style={styles.dateIcon}>📅</ThemedText>
                <ThemedText style={styles.dateText}>
                  {formatDate(data.travel.start_date)} -{" "}
                  {formatDate(data.travel.end_date)}
                </ThemedText>
              </View>
            </View>
          )}
        </View>

        {/* Seção principal de progresso */}
        <View style={styles.mainContent}>
          {/* Tabs de navegação (similar à imagem) */}
          <View style={styles.tabsContainer}>
            <View style={styles.tab}>
              <ThemedText style={styles.tabText}>Overview</ThemedText>
            </View>
            <View style={[styles.tab, styles.activeTab]}>
              <ThemedText style={[styles.tabText, styles.activeTabText]}>
                Trip plan
              </ThemedText>
            </View>
            <View style={styles.tab}>
              <ThemedText style={styles.tabText}>Budget</ThemedText>
            </View>
          </View>
          <View style={styles.progressCard}>
            <View style={styles.progressHeader}>
              <ThemedText style={styles.progressTitle}>
                Criando seu itinerário
              </ThemedText>
              <ThemedText style={styles.progressSubtitle}>
                Nossa IA está analisando as melhores opções para sua viagem
              </ThemedText>
            </View>

            <View style={styles.progressIndicator}>
              <ActivityIndicator
                size="large"
                color={AppColors.primary}
                style={styles.spinner}
              />
              <View style={styles.progressTextContainer}>
                <ThemedText style={styles.progressPercentage}>
                  {Math.round(progress)}%
                </ThemedText>
                <ThemedText style={styles.currentStepText}>
                  {currentStep}
                </ThemedText>
              </View>
            </View>

            {/* Barra de progresso */}
            <View style={styles.progressBarContainer}>
              <View style={styles.progressBarBackground}>
                <View
                  style={[styles.progressBarFill, { width: `${progress}%` }]}
                />
              </View>
            </View>
          </View>

          {/* Área de conteúdo em geração */}
          <View style={styles.contentArea}>
            <View style={styles.generatingContent}>
              <View style={styles.placeholderItem}>
                <View style={styles.placeholderIcon} />
                <View style={styles.placeholderText}>
                  <View style={styles.placeholderLine} />
                  <View
                    style={[
                      styles.placeholderLine,
                      styles.placeholderLineShort,
                    ]}
                  />
                </View>
              </View>

              <View style={styles.placeholderItem}>
                <View style={styles.placeholderIcon} />
                <View style={styles.placeholderText}>
                  <View style={styles.placeholderLine} />
                  <View
                    style={[
                      styles.placeholderLine,
                      styles.placeholderLineShort,
                    ]}
                  />
                </View>
              </View>

              <View style={styles.placeholderItem}>
                <View style={styles.placeholderIcon} />
                <View style={styles.placeholderText}>
                  <View style={styles.placeholderLine} />
                  <View
                    style={[
                      styles.placeholderLine,
                      styles.placeholderLineShort,
                    ]}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
    backgroundColor: "#FFFFFF",
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  familyTrip: {
    fontSize: 16,
    color: AppColors.textSecondary,
    fontWeight: "500",
  },
  statusBadge: {
    fontSize: 12,
    color: AppColors.primary,
    backgroundColor: "#E3F2FD",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    fontWeight: "600",
  },
  destinationSection: {
    marginBottom: 16,
  },
  tripToLabel: {
    fontSize: 16,
    color: AppColors.textSecondary,
    marginBottom: 4,
  },
  destinationName: {
    fontSize: 32,
    fontWeight: "bold",
    color: AppColors.text,
    lineHeight: 38,
  },
  dateSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  dateItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  dateIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  dateText: {
    fontSize: 14,
    color: AppColors.text,
    fontWeight: "500",
  },
  mainContent: {
    flex: 1,
    backgroundColor: "#F8F9FA",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 24,
  },
  progressCard: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 24,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  progressHeader: {
    marginBottom: 24,
    alignItems: "center",
  },
  progressTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: AppColors.text,
    marginBottom: 8,
    textAlign: "center",
  },
  progressSubtitle: {
    fontSize: 14,
    color: AppColors.textSecondary,
    textAlign: "center",
    lineHeight: 20,
  },
  progressIndicator: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  spinner: {
    marginRight: 16,
  },
  progressTextContainer: {
    flex: 1,
  },
  progressPercentage: {
    fontSize: 24,
    fontWeight: "bold",
    color: AppColors.primary,
    marginBottom: 4,
  },
  currentStepText: {
    fontSize: 14,
    color: AppColors.textSecondary,
  },
  progressBarContainer: {
    width: "100%",
  },
  progressBarBackground: {
    height: 6,
    backgroundColor: "#E0E0E0",
    borderRadius: 3,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: AppColors.primary,
    borderRadius: 3,
  },
  tabsContainer: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: AppColors.primary,
  },
  tabText: {
    fontSize: 14,
    fontWeight: "500",
    color: AppColors.textSecondary,
  },
  activeTabText: {
    color: "#FFFFFF",
  },
  contentArea: {
    flex: 1,
    marginHorizontal: 20,
  },
  generatingContent: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  placeholderItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  placeholderIcon: {
    width: 40,
    height: 40,
    backgroundColor: "#F0F0F0",
    borderRadius: 20,
    marginRight: 16,
  },
  placeholderText: {
    flex: 1,
  },
  placeholderLine: {
    height: 12,
    backgroundColor: "#F0F0F0",
    borderRadius: 6,
    marginBottom: 8,
  },
  placeholderLineShort: {
    width: "60%",
  },
});
