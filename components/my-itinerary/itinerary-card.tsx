import { AppColors } from "@/constants/colors";
import { formatCurrency } from "@/utils/helpers";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { ThemedText } from "../themed-text";

interface Props {
  itinerary: any;
}
const IntineraryCard: React.FC<Props> = ({ itinerary }) => {
  return (
    <View style={styles.itineraryCard}>
      <Image source={itinerary.image} style={styles.cardImage} />

      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <View style={styles.destinationInfo}>
            <ThemedText style={styles.destinationName}>
              {itinerary.country}
            </ThemedText>
            <ThemedText style={styles.countryName}>
              {formatCurrency(itinerary.budget)}
            </ThemedText>
            <ThemedText style={styles.createdDate}>
              {itinerary.createdDate}
            </ThemedText>
          </View>

          <View style={styles.cardActions}>
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons
                name="trash-outline"
                size={20}
                color={AppColors.textSecondary}
              />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.detailsButton}>
          <ThemedText style={styles.detailsButtonText}>Ver Detalhes</ThemedText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itineraryCard: {
    backgroundColor: AppColors.surface,
    borderRadius: 12,
    marginVertical: 8,
    overflow: "hidden",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardImage: {
    width: "100%",
    height: 120,
    resizeMode: "cover",
  },
  cardContent: {
    padding: 16,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  destinationInfo: {
    flex: 1,
  },
  destinationName: {
    fontSize: 18,
    fontWeight: "600",
    color: AppColors.text,
    marginBottom: 4,
  },
  countryName: {
    fontSize: 14,
    color: AppColors.textSecondary,
    marginBottom: 4,
  },
  createdDate: {
    fontSize: 12,
    color: AppColors.textSecondary,
  },
  cardActions: {
    flexDirection: "row",
    gap: 8,
  },
  actionButton: {
    padding: 8,
  },
  detailsButton: {
    backgroundColor: AppColors.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
  },
  detailsButtonText: {
    color: AppColors.surface,
    fontSize: 16,
    fontWeight: "600",
  },
  fab: {
    position: "absolute",
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: AppColors.success,
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
});

export default IntineraryCard;
