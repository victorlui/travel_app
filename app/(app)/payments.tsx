import Header from "@/components/ui/Header";
import PlanUpgrade from "@/components/ui/PlanUpgrade";
import { AppColors } from "@/constants/colors";
import LayoutMain from "@/layouts/LayoutApp";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface PaymentHistory {
  id: string;
  plan: string;
  amount: number;
  date: string;
  status: "paid" | "pending";
  paymentMethod: string;
}

interface PaymentMethod {
  id: string;
  type: "card" | "pix";
  name: string;
  details: string;
  isDefault?: boolean;
}

const PaymentsScreen: React.FC = () => {
  const currentPlan = {
    name: "Premium",
    price: 29.9,
    period: "mensal",
    features: ["Crie itinerários sem limites", "Acesso recursos exclusivos"],
    nextBilling: "15 de Janeiro, 2024",
  };

  const paymentHistory: PaymentHistory[] = [
    {
      id: "1",
      plan: "Plano Premium",
      amount: 29.9,
      date: "15 de Dezembro, 2023",
      status: "paid",
      paymentMethod: "Cartão ••••4532",
    },
    {
      id: "2",
      plan: "Plano Premium",
      amount: 29.9,
      date: "15 de Novembro, 2023",
      status: "paid",
      paymentMethod: "Boleto bancário",
    },
    {
      id: "3",
      plan: "Plano Premium",
      amount: 29.9,
      date: "15 de Novembro, 2023",
      status: "pending",
      paymentMethod: "Boleto bancário",
    },
  ];

  const paymentMethods: PaymentMethod[] = [
    {
      id: "1",
      type: "card",
      name: "Cartão ••••4532",
      details: "Mastercard • Principal",
      isDefault: true,
    },
    {
      id: "2",
      type: "pix",
      name: "PIX",
      details: "Pagamento instantâneo",
    },
  ];

  const handleGeneratePlan = () => {
    // Implementar lógica para gerar plano
    console.log("Gerar plano");
  };

  const handleCancelSubscription = () => {
    // Implementar lógica para cancelar assinatura
    console.log("Cancelar assinatura");
  };

  const handleAddPaymentMethod = () => {
    router.push("/(app)/add-payments");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "#10B981";
      case "pending":
        return "#F59E0B";
      default:
        return AppColors.textSecondary;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "paid":
        return "Pago";
      case "pending":
        return "Pendente";
      default:
        return status;
    }
  };

  const getPaymentMethodIcon = (type: string) => {
    switch (type) {
      case "card":
        return "card-outline";
      case "pix":
        return "flash-outline";
      default:
        return "card-outline";
    }
  };

  return (
    <LayoutMain edges={["top", "bottom"]}>
      <Header title="Pagamentos e Assinaturas" />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Plano Atual */}
        <PlanUpgrade />

        {/* Histórico de Pagamentos */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Histórico de Pagamentos</Text>
          {paymentHistory.map((payment) => (
            <View key={payment.id} style={styles.paymentItem}>
              <View style={styles.paymentInfo}>
                <Text style={styles.paymentPlan}>{payment.plan}</Text>
                <Text style={styles.paymentDate}>{payment.date}</Text>
                <Text style={styles.paymentMethod}>
                  {payment.paymentMethod}
                </Text>
              </View>
              <View style={styles.paymentRight}>
                <Text style={styles.paymentAmount}>
                  R$ {payment.amount.toFixed(2)}
                </Text>
                <View
                  style={[
                    styles.statusBadge,
                    { backgroundColor: getStatusColor(payment.status) + "20" },
                  ]}
                >
                  <View
                    style={[
                      styles.statusDot,
                      { backgroundColor: getStatusColor(payment.status) },
                    ]}
                  />
                  <Text
                    style={[
                      styles.statusText,
                      { color: getStatusColor(payment.status) },
                    ]}
                  >
                    {getStatusText(payment.status)}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Métodos de Pagamento */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Métodos de Pagamento</Text>
          {paymentMethods.map((method) => (
            <View key={method.id} style={styles.paymentMethodItem}>
              <View style={styles.methodLeft}>
                <View style={styles.methodIcon}>
                  <Ionicons
                    name={getPaymentMethodIcon(method.type) as any}
                    size={24}
                    color={AppColors.primary}
                  />
                </View>
                <View style={styles.methodInfo}>
                  <Text style={styles.methodName}>{method.name}</Text>
                  <Text style={styles.methodDetails}>{method.details}</Text>
                </View>
              </View>
              <TouchableOpacity>
                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color={AppColors.textSecondary}
                />
              </TouchableOpacity>
            </View>
          ))}

          <TouchableOpacity
            style={styles.button}
            onPress={handleAddPaymentMethod}
            activeOpacity={0.7}
          >
            <View>
              <Ionicons name="add" size={24} color="#34C759" />
            </View>
            <Text style={styles.buttonText}>Adicionar novo método</Text>
          </TouchableOpacity>
        </View>

        {/* Cancelar Assinatura */}
        <View style={styles.section}>
          <View style={styles.cancelContainer}>
            <Text style={styles.cancelTitle}>Cancelar Assinatura</Text>
            <Text style={styles.cancelMessage}>
              Ao cancelar, você manterá acesso aos recursos Premium até o final
              do período atual.
            </Text>
            <TouchableOpacity onPress={handleCancelSubscription}>
              <Text style={styles.cancelLink}>Cancelar minha assinatura</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.renewalContainer}>
            <View style={styles.renewalIconContainer}>
              <Ionicons name="information-circle" size={16} color="#3B82F6" />
            </View>
            <View style={styles.renewalTextContainer}>
              <Text style={styles.renewalTitle}>
                Sua assinatura será renovada automaticamente em 15 de Fevereiro,
                2024.
              </Text>
              <Text style={styles.renewalDescription}>
                Você pode cancelar a qualquer momento nas configurações da
                conta.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </LayoutMain>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    paddingVertical: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: AppColors.text,
    marginBottom: 12,
    paddingHorizontal: 20,
  },
  currentPlanCard: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    borderRadius: 12,
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
  planHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  planInfo: {
    flex: 1,
  },
  planName: {
    fontSize: 18,
    fontWeight: "600",
    color: AppColors.text,
    marginBottom: 4,
  },
  planDescription: {
    fontSize: 14,
    color: AppColors.textSecondary,
    lineHeight: 20,
  },
  premiumBadge: {
    backgroundColor: AppColors.primary,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  premiumText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  generateButton: {
    backgroundColor: AppColors.primary,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  generateButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  paymentItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    marginBottom: 8,
    padding: 16,
    borderRadius: 8,
  },
  paymentInfo: {
    flex: 1,
  },
  paymentPlan: {
    fontSize: 16,
    fontWeight: "500",
    color: AppColors.text,
    marginBottom: 4,
  },
  paymentDate: {
    fontSize: 14,
    color: AppColors.textSecondary,
    marginBottom: 2,
  },
  paymentMethod: {
    fontSize: 12,
    color: AppColors.textSecondary,
  },
  paymentRight: {
    alignItems: "flex-end",
  },
  paymentAmount: {
    fontSize: 16,
    fontWeight: "600",
    color: AppColors.text,
    marginBottom: 4,
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "500",
  },
  paymentMethodItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    marginBottom: 8,
    padding: 16,
    borderRadius: 8,
  },
  methodLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  methodIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: AppColors.primary + "10",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  methodInfo: {
    flex: 1,
  },
  methodName: {
    fontSize: 16,
    fontWeight: "500",
    color: AppColors.text,
    marginBottom: 2,
  },
  methodDetails: {
    fontSize: 14,
    color: AppColors.textSecondary,
  },
  button: {
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
    marginHorizontal: 20,
  },
  buttonText: {
    color: "#34C759",
    fontSize: 14,
    fontWeight: "600",
  },

  cancelContainer: {
    backgroundColor: "#FEF2F2",
    marginHorizontal: 20,
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  cancelTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#DC2626",
    marginBottom: 8,
  },
  cancelMessage: {
    fontSize: 14,
    color: "#7F1D1D",
    lineHeight: 20,
    marginBottom: 12,
  },
  cancelLink: {
    fontSize: 14,
    fontWeight: "500",
    color: "#DC2626",
    textDecorationLine: "underline",
  },
  renewalContainer: {
    flexDirection: "row",
    backgroundColor: "#EFF6FF",
    marginHorizontal: 20,
    padding: 16,
    borderRadius: 8,
    alignItems: "flex-start",
  },
  renewalIconContainer: {
    marginRight: 12,
    marginTop: 2,
  },
  renewalTextContainer: {
    flex: 1,
  },
  renewalTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#1E40AF",
    lineHeight: 20,
    marginBottom: 4,
  },
  renewalDescription: {
    fontSize: 14,
    color: "#1E40AF",
    lineHeight: 20,
  },
});

export default PaymentsScreen;
