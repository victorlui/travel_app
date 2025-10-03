import { useAuthStore } from "@/store/authStore";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const PlanUpgrade: React.FC = () => {
  const { user } = useAuthStore();

  const handlePlanAction = () => {
    router.push("/(app)/change-plan");
  };

  return (
    <View style={styles.planContainer}>
      <View style={styles.planHeader}>
        <Text style={styles.planTitle}>Plano atual</Text>
        <View style={styles.planStatusContainer}>
          <Text style={styles.planStatus}>
            {user?.plan?.name === "free" ? "Gratuito" : "Premium"}
          </Text>
        </View>
      </View>
      <Text style={styles.planDescription}>
        {user?.plan?.name === "free"
          ? "Você pode criar até 3 itinerários por mês no plano gratuito"
          : "Você pode criar até 10 itinerários por mês no plano Premium"}
      </Text>
      <TouchableOpacity style={styles.upgradeButton} onPress={handlePlanAction}>
        {user?.plan?.name === "free" && (
          <Ionicons name="diamond" size={16} color="#34C759" />
        )}
        <Text style={styles.upgradeButtonText}>
          {user?.plan?.name === "free"
            ? "Upgrade para Premium"
            : "Gerenciar Plano"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  planContainer: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  planHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  planTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1A1A1A",
  },
  planStatusContainer: {
    backgroundColor: "#F2F2F7",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  planStatus: {
    fontSize: 14,
    color: "#8E8E93",
    fontWeight: "400",
  },
  planDescription: {
    fontSize: 14,
    color: "#8E8E93",
    marginBottom: 20,
    lineHeight: 20,
  },
  upgradeButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#34C759",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    gap: 8,
  },
  upgradeButtonText: {
    color: "#34C759",
    fontSize: 14,
    fontWeight: "600",
  },
});

export default PlanUpgrade;
