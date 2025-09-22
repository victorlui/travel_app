import { AppColors } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View } from "react-native";
import { TravelCard } from "./form/TravelCard";
import { ThemedText } from "./themed-text";

const ReferencesCard: React.FC = () => {
  return (
    <TravelCard style={styles.featuresCard}>
      <ThemedText style={styles.featuresTitle}>
        O que você vai receber:
      </ThemedText>
      <View style={styles.featuresList}>
        <View style={styles.featureItem}>
          <Ionicons
            name="checkmark-circle"
            size={20}
            color={AppColors.success}
          />
          <ThemedText style={styles.featureText}>
            Roteiro personalizado dia a dia
          </ThemedText>
        </View>
        {/* <View style={styles.featureItem}>
          <Ionicons
            name="checkmark-circle"
            size={20}
            color={AppColors.success}
          />
          <ThemedText style={styles.featureText}>
            Sugestões de hospedagem
          </ThemedText>
        </View> */}
        <View style={styles.featureItem}>
          <Ionicons
            name="checkmark-circle"
            size={20}
            color={AppColors.success}
          />
          <ThemedText style={styles.featureText}>
            Atividades e pontos turísticos
          </ThemedText>
        </View>
        <View style={styles.featureItem}>
          <Ionicons
            name="checkmark-circle"
            size={20}
            color={AppColors.success}
          />
          <ThemedText style={styles.featureText}>
            Estimativa de custos
          </ThemedText>
        </View>
      </View>
    </TravelCard>
  );
};

const styles = StyleSheet.create({
  featuresCard: {
    marginBottom: 20,
  },
  featuresTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: AppColors.text,
    marginBottom: 16,
  },
  featuresList: {
    gap: 12,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  featureText: {
    fontSize: 16,
    color: AppColors.textSecondary,
    flex: 1,
  },
});

export default ReferencesCard;
