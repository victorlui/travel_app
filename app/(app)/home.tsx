import { TravelCard } from "@/components/form/TravelCard";
import { ThemedText } from "@/components/themed-text";
import { StatsCard } from "@/components/ui/StatsCard";
import { TravelItemCard } from "@/components/ui/TravelItemCard";
import { AppColors } from "@/constants/colors";
import { useAuthStore } from "@/store/authStore";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface TravelItem {
  id: string;
  destination: string;
  startDate: string;
  endDate: string;
  status: "planned" | "in_progress" | "completed";
  travelers: string;
  budget: number;
}

export default function HomeScreen() {
  const router = useRouter();
  const { user } = useAuthStore();
  const [refreshing, setRefreshing] = useState(false);
  const [monthlyCount, setMonthlyCount] = useState(2);
  const [recentTravels, setRecentTravels] = useState<TravelItem[]>([
    {
      id: "1",
      destination: "Paris, França",
      startDate: "2024-02-15",
      endDate: "2024-02-22",
      status: "planned",
      travelers: "couple",
      budget: 3500,
    },
    {
      id: "2",
      destination: "Tóquio, Japão",
      startDate: "2024-01-10",
      endDate: "2024-01-20",
      status: "completed",
      travelers: "solo",
      budget: 4200,
    },
    {
      id: "3",
      destination: "Bali, Indonésia",
      startDate: "2024-03-05",
      endDate: "2024-03-12",
      status: "in_progress",
      travelers: "family",
      budget: 2800,
    },
  ]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // Aqui você faria a chamada para a API para atualizar os dados
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const handleTravelPress = (travelId: string) => {
    // Navegar para detalhes da viagem
    console.log("Navegando para viagem:", travelId);
  };

  const maxItineraries = 5;
  const remainingItineraries = maxItineraries - monthlyCount;

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <SafeAreaView style={styles.container}>
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {/* Header */}
          <View style={styles.header}>
            <View>
              <ThemedText style={styles.greeting}>
                Olá, {user?.name || "Viajante"}! 👋
              </ThemedText>
              <ThemedText style={styles.subtitle}>
                Pronto para sua próxima aventura?
              </ThemedText>
            </View>
            <TouchableOpacity style={styles.profileButton}>
              <Ionicons
                name="person-circle"
                size={40}
                color={AppColors.primary}
              />
            </TouchableOpacity>
          </View>

          {/* Stats Section */}
          <View style={styles.statsSection}>
            <StatsCard
              title="Plano Gratuito"
              subtitle="Itinerários criados este mês"
              value={monthlyCount}
              maxValue={maxItineraries}
              icon="analytics"
              progress={monthlyCount / maxItineraries}
            />
          </View>

          {/* Create New Trip Button - Versão sem LinearGradient */}
          <View style={styles.createTripContainer}>
            <View
              style={[
                styles.createTripCard,
                {
                  backgroundColor:
                    remainingItineraries > 0
                      ? `${AppColors.primary}08`
                      : `${AppColors.secondary}08`,
                  borderColor:
                    remainingItineraries > 0
                      ? `${AppColors.primary}20`
                      : `${AppColors.secondary}20`,
                },
              ]}
            >
              <View style={styles.createTripHeader}>
                <View style={styles.createTripIconContainer}>
                  <View
                    style={[
                      styles.createTripIconBackground,
                      {
                        backgroundColor:
                          remainingItineraries > 0
                            ? AppColors.primary
                            : AppColors.secondary,
                      },
                    ]}
                  >
                    <Ionicons
                      name={remainingItineraries > 0 ? "airplane" : "diamond"}
                      size={24}
                      color="#FFFFFF"
                    />
                  </View>
                </View>
                <View style={styles.createTripTextContainer}>
                  <ThemedText style={styles.createTripMainTitle}>
                    {remainingItineraries > 0
                      ? "Criar Nova Viagem"
                      : "Upgrade Premium"}
                  </ThemedText>
                  <ThemedText style={styles.createTripDescription}>
                    {remainingItineraries > 0
                      ? "Planeje sua próxima aventura em minutos"
                      : "Desbloqueie viagens ilimitadas"}
                  </ThemedText>
                </View>
              </View>

              <View style={styles.createTripStats}>
                <View style={styles.statItem}>
                  <ThemedText style={styles.statNumber}>
                    {remainingItineraries > 0 ? remainingItineraries : "∞"}
                  </ThemedText>
                  <ThemedText style={styles.statLabel}>
                    {remainingItineraries > 0 ? "Restantes" : "Ilimitadas"}
                  </ThemedText>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                  <View style={styles.statNumberWithIcon}>
                    <Ionicons name="time" size={16} color={AppColors.primary} />
                    <ThemedText style={[styles.statNumber, { marginLeft: 4 }]}>
                      5min
                    </ThemedText>
                  </View>
                  <ThemedText style={styles.statLabel}>
                    Criação rápida
                  </ThemedText>
                </View>
              </View>

              <TouchableOpacity
                style={[
                  styles.createTripButton,
                  {
                    backgroundColor:
                      remainingItineraries > 0
                        ? AppColors.primary
                        : AppColors.secondary,
                  },
                ]}
                onPress={() => {
                  if (remainingItineraries > 0) {
                    router.push("/(app)/create-itinerary");
                  } else {
                    console.log("Navegar para upgrade");
                  }
                }}
                activeOpacity={0.8}
              >
                <View style={styles.buttonContent}>
                  <Ionicons
                    name={remainingItineraries > 0 ? "add-circle" : "star"}
                    size={20}
                    color="#FFFFFF"
                    style={styles.buttonIcon}
                  />
                  <ThemedText style={styles.buttonText}>
                    {remainingItineraries > 0
                      ? "Começar Agora"
                      : "Fazer Upgrade"}
                  </ThemedText>
                  <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
                </View>
              </TouchableOpacity>
            </View>
          </View>

          {/* Recent Travels */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <ThemedText style={styles.sectionTitle}>Suas Viagens</ThemedText>
              <TouchableOpacity>
                <ThemedText style={styles.seeAllButton}>Ver todas</ThemedText>
              </TouchableOpacity>
            </View>

            {recentTravels.length > 0 ? (
              recentTravels.map((travel) => (
                <TravelItemCard
                  key={travel.id}
                  destination={travel.destination}
                  startDate={travel.startDate}
                  endDate={travel.endDate}
                  status={travel.status}
                  travelers={travel.travelers}
                  budget={travel.budget}
                  onPress={() => handleTravelPress(travel.id)}
                />
              ))
            ) : (
              <TravelCard style={styles.emptyState}>
                <View style={styles.emptyStateContent}>
                  <Ionicons
                    name="airplane-outline"
                    size={48}
                    color={AppColors.textSecondary}
                  />
                  <ThemedText style={styles.emptyStateTitle}>
                    Nenhuma viagem ainda
                  </ThemedText>
                  <ThemedText style={styles.emptyStateSubtitle}>
                    Crie sua primeira viagem e comece a explorar o mundo!
                  </ThemedText>
                </View>
              </TravelCard>
            )}
          </View>

          {/* Quick Actions */}
          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>Ações Rápidas</ThemedText>
            <View style={styles.quickActions}>
              <TouchableOpacity style={styles.quickActionItem}>
                <View style={styles.quickActionIcon}>
                  <Ionicons
                    name="help-circle-outline"
                    size={24}
                    color={AppColors.primary}
                  />
                </View>
                <ThemedText style={styles.quickActionText}>Ajuda</ThemedText>
              </TouchableOpacity>
              <TouchableOpacity style={styles.quickActionItem}>
                <View style={styles.quickActionIcon}>
                  <Ionicons
                    name="star-outline"
                    size={24}
                    color={AppColors.secondary}
                  />
                </View>
                <ThemedText style={styles.quickActionText}>Upgrade</ThemedText>
              </TouchableOpacity>
              <TouchableOpacity style={styles.quickActionItem}>
                <View style={styles.quickActionIcon}>
                  <Ionicons
                    name="settings-outline"
                    size={24}
                    color={AppColors.primary}
                  />
                </View>
                <ThemedText style={styles.quickActionText}>
                  Configurações
                </ThemedText>
              </TouchableOpacity>
            </View>
          </View>

          {/* Bottom Spacing */}
          <View style={styles.bottomSpacing} />
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.background,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
    backgroundColor: AppColors.surface,
  },
  greeting: {
    fontSize: 24,
    fontWeight: "bold",
    color: AppColors.text,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: AppColors.textSecondary,
  },
  profileButton: {
    padding: 4,
  },
  statsSection: {
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  // Estilos atualizados para o botão refatorado
  createTripContainer: {
    marginHorizontal: 20,
    marginTop: 8,
    marginBottom: 24,
  },
  createTripCard: {
    backgroundColor: AppColors.surface,
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
  },
  createTripHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  createTripIconContainer: {
    marginRight: 16,
  },
  createTripIconBackground: {
    width: 56,
    height: 56,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  createTripTextContainer: {
    flex: 1,
    paddingTop: 4,
  },
  createTripMainTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: AppColors.text,
    marginBottom: 6,
    letterSpacing: -0.5,
  },
  createTripDescription: {
    fontSize: 15,
    color: AppColors.textSecondary,
    lineHeight: 22,
    fontWeight: "400",
  },
  createTripStats: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
    paddingVertical: 16,
    backgroundColor: `${AppColors.surface}80`,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: `${AppColors.primary}10`,
  },
  statItem: {
    alignItems: "center",
    flex: 1,
  },
  statNumberWithIcon: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  statNumber: {
    fontSize: 18,
    fontWeight: "700",
    color: AppColors.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: AppColors.textSecondary,
    fontWeight: "500",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  statDivider: {
    width: 1,
    height: 32,
    backgroundColor: `${AppColors.border}60`,
    marginHorizontal: 16,
  },
  createTripButton: {
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 24,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 6,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonIcon: {
    marginRight: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
    flex: 1,
    textAlign: "center",
    letterSpacing: 0.3,
  },

  // Remover ou comentar os estilos antigos
  // createTripCard: { ... },
  // createTripContent: { ... },
  // createTripIcon: { ... },
  // createTripText: { ... },
  // createTripTitle: { ... },
  // createTripSubtitle: { ... },
  // createButton: { ... },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: AppColors.text,
  },
  seeAllButton: {
    fontSize: 14,
    color: AppColors.primary,
    fontWeight: "600",
  },
  emptyState: {
    alignItems: "center",
    paddingVertical: 32,
  },
  emptyStateContent: {
    alignItems: "center",
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: AppColors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateSubtitle: {
    fontSize: 14,
    color: AppColors.textSecondary,
    textAlign: "center",
    lineHeight: 20,
  },
  quickActions: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  quickActionItem: {
    alignItems: "center",
    flex: 1,
  },
  quickActionIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: `${AppColors.primary}15`,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  quickActionText: {
    fontSize: 14,
    color: AppColors.text,
    fontWeight: "500",
  },
  bottomSpacing: {
    height: 20,
  },
});
