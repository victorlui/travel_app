import { AppColors } from "@/constants/colors";
import { formatCurrency } from "@/utils/helpers";
import {
  formatDateRange,
  getStatusTextColor,
  getTravelStatusText,
} from "@/utils/travel-helper";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface TravelItem {
  id: string;
  destination: string;
  startDate: string;
  endDate: string;
  status: "planned" | "in_progress" | "completed";
  travelers: string;
  budget: number;
}

interface Props {
  travel: TravelItem;
}

const TravelItemComponent: React.FC<Props> = ({ travel }) => {
  const getStatusIconContainer = (
    status: "planned" | "in_progress" | "completed"
  ) => {
    if (status === "planned") return styles.plannedIconContainer;
    if (status === "in_progress") return styles.inProgressIconContainer;
    if (status === "completed") return styles.completedIconContainer;
    return styles.plannedIconContainer;
  };

  return (
    <TouchableOpacity style={styles.travelCard}>
      <View style={styles.cardContent}>
        <View style={styles.leftContent}>
          <Text style={styles.destinationTitle}>{travel.destination}</Text>
          <Text style={styles.destinationSubtitle}>
            {formatCurrency(travel.budget)}
          </Text>
          <Text style={styles.dateText}>
            {formatDateRange(travel.startDate, travel.endDate)}
          </Text>
        </View>

        <View style={styles.rightContent}>
          <View
            style={[
              styles.statusContainer,
              getStatusIconContainer(travel.status),
            ]}
          >
            <Text
              style={[
                styles.statusText,
                { color: getStatusTextColor(travel.status) },
              ]}
            >
              {getTravelStatusText(travel.status)}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  travelCard: {
    backgroundColor: AppColors.surface,
    borderRadius: 12,
    marginBottom: 12,
    marginHorizontal: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  cardContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  leftContent: {
    flex: 1,
  },
  destinationTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 4,
  },
  destinationSubtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  dateText: {
    fontSize: 13,
    color: "#999",
  },
  budgetText: {
    fontSize: 13,
    color: "#999",
    marginBottom: 8,
  },
  rightContent: {
    marginLeft: 16,
  },
  statusContainer: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    minWidth: 80,
  },
  plannedIconContainer: {
    backgroundColor: "#e3f2fd",
  },
  inProgressIconContainer: {
    backgroundColor: "#fff3e0",
  },
  completedIconContainer: {
    backgroundColor: "#e8f5e8",
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
  },
  parisIconContainer: {
    backgroundColor: "#e3f2fd",
  },
  florenceIconContainer: {
    backgroundColor: "#e8f5e8",
  },
  iconText: {
    fontSize: 20,
  },
});

export default TravelItemComponent;
