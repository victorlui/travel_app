import { AppColors } from "@/constants/colors";
import { Plan } from "@/types/plan";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface PlanItemProps {
  plan: Plan;
  isCurrentPlan?: boolean;
  handlePlanSelection: (plan: Plan) => void;
}

const PlanItem: React.FC<PlanItemProps> = ({
  plan,
  isCurrentPlan = false,
  handlePlanSelection,
}) => {
  const isVIP = plan.name.toLowerCase() === "premium";

  const formatPrice = (price: number) => {
    return `R$ ${price.toFixed(2).replace(".", ",")}`;
  };

  const getBenefits = () => {
    return plan.description.split(".").filter((item) => item.trim().length > 0);
  };

  const handleUpgrade = () => {
    handlePlanSelection(plan);
  };

  return (
    <View style={[styles.container, isVIP && styles.vipContainer]}>
      {/* Header com Badge e Preço */}
      <View style={styles.header}>
        <View style={styles.badgeContainer}>
          <View
            style={[styles.badge, isVIP ? styles.vipBadge : styles.freeBadge]}
          >
            <Text style={[styles.badgeText, isVIP && styles.vipBadgeText]}>
              {isVIP ? "VIP" : "Gratuito"}
            </Text>
          </View>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>{formatPrice(plan.price)}</Text>
          <Text style={styles.priceUnit}>/mês</Text>
        </View>
      </View>

      {/* Lista de Benefícios */}
      <View style={styles.benefitsContainer}>
        {getBenefits().map((benefit, index) => (
          <View key={index} style={styles.benefitItem}>
            <Text style={styles.checkmark}>✓</Text>
            <Text style={styles.benefitText}>{benefit.trim()}</Text>
          </View>
        ))}
      </View>

      {/* Botão de Ação */}
      {!isCurrentPlan && (
        <TouchableOpacity style={styles.upgradeButton} onPress={handleUpgrade}>
          <Text style={styles.upgradeButtonText}>Fazer Upgrade para VIP</Text>
        </TouchableOpacity>
      )}

      {isCurrentPlan && (
        <TouchableOpacity
          disabled
          style={styles.buttonCurrent}
          onPress={handleUpgrade}
        >
          <Text style={styles.buttonCurrentText}>Plano atual</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 16,
    marginBottom: 16,
    backgroundColor: "#fff",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  vipContainer: {
    borderColor: "#10B981",
    borderWidth: 2,
  },
  currentPlanContainer: {
    backgroundColor: "#FFF4E6",
    borderWidth: 1,
    borderColor: "#FFB366",
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginBottom: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  currentPlanText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#D97706",
    textAlign: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  badgeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  vipBadge: {
    backgroundColor: "#10B981",
    borderRadius: 20,
  },
  freeBadge: {
    backgroundColor: "#F3F4F6",
  },
  badgeText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#6B7280",
  },
  vipBadgeText: {
    color: "#FFFFFF",
  },
  novoText: {
    fontSize: 10,
    fontWeight: "500",
    color: "#FFFFFF",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  priceContainer: {
    alignItems: "flex-end",
  },
  price: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1F2937",
  },
  priceUnit: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: -2,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 16,
  },
  benefitsContainer: {
    marginBottom: 20,
  },
  benefitItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 8,
    paddingRight: 8,
  },
  checkmark: {
    fontSize: 16,
    color: "#10B981",
    marginRight: 12,
    marginTop: 1,
    fontWeight: "600",
  },
  benefitText: {
    fontSize: 14,
    color: "#4B5563",
    flex: 1,
    lineHeight: 20,
  },
  planCurrent: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 12,
  },
  upgradeButton: {
    backgroundColor: "#10B981",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  upgradeButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  buttonCurrent: {
    backgroundColor: AppColors.surface,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: AppColors.textSecondary,
  },
  buttonCurrentText: {
    color: AppColors.textSecondary,
    fontSize: 16,
    fontWeight: "600",
  },
});

export default PlanItem;
