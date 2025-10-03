import { FormInput } from "@/components/form/FormInput";
import { PrimaryButton } from "@/components/form/PrimaryButton";
import { ThemedText } from "@/components/themed-text";
import Header from "@/components/ui/Header";
import { AppColors } from "@/constants/colors";
import LayoutMain from "@/layouts/LayoutApp";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";

const AddPayments: React.FC = () => {
  const [paymentType, setPaymentType] = useState<"credit" | "debit">("credit");
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [cpf, setCpf] = useState("");

  const formatCardNumber = (text: string) => {
    const cleaned = text.replace(/\s/g, "");
    const formatted = cleaned.replace(/(.{4})/g, "$1 ").trim();
    return formatted.substring(0, 19);
  };

  const formatExpiryDate = (text: string) => {
    const cleaned = text.replace(/\D/g, "");
    if (cleaned.length >= 2) {
      return cleaned.substring(0, 2) + "/" + cleaned.substring(2, 4);
    }
    return cleaned;
  };

  const formatCPF = (text: string) => {
    const cleaned = text.replace(/\D/g, "");
    return cleaned
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})/, "$1-$2")
      .replace(/(-\d{2})\d+?$/, "$1");
  };

  const handleSavePayment = () => {
    // Implementar lógica de salvamento
    console.log("Salvando método de pagamento...");
  };

  return (
    <LayoutMain>
      <Header title="Adicionar Método de Pagamento" />

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Seção Pagamento Seguro */}
        <View style={styles.secureSection}>
          <View style={styles.secureHeader}>
            <Ionicons
              name="shield-checkmark"
              size={20}
              color={AppColors.success}
            />
            <ThemedText style={styles.secureTitle}>Pagamento Seguro</ThemedText>
          </View>
          <ThemedText style={styles.secureDescription}>
            Seus dados de pagamento são criptografados e protegidos
          </ThemedText>
        </View>

        {/* Tipo de Pagamento */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Tipo de Pagamento</ThemedText>
          <View style={styles.paymentTypeContainer}>
            <TouchableOpacity
              style={[
                styles.paymentTypeButton,
                paymentType === "credit" && styles.paymentTypeButtonActive,
              ]}
              onPress={() => setPaymentType("credit")}
            >
              <Ionicons
                name="card"
                size={24}
                color={
                  paymentType === "credit"
                    ? AppColors.surface
                    : AppColors.textSecondary
                }
              />
              <ThemedText
                style={[
                  styles.paymentTypeText,
                  paymentType === "credit" && styles.paymentTypeTextActive,
                ]}
              >
                Cartão de Crédito
              </ThemedText>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.paymentTypeButton,
                paymentType === "debit" && styles.paymentTypeButtonActive,
              ]}
              onPress={() => setPaymentType("debit")}
            >
              <Ionicons
                name="card"
                size={24}
                color={
                  paymentType === "debit"
                    ? AppColors.surface
                    : AppColors.textSecondary
                }
              />
              <ThemedText
                style={[
                  styles.paymentTypeText,
                  paymentType === "debit" && styles.paymentTypeTextActive,
                ]}
              >
                Cartão de Débito
              </ThemedText>
            </TouchableOpacity>
          </View>
        </View>

        {/* Formulário do Cartão */}
        <View style={styles.section}>
          <FormInput
            label="Nome no Cartão"
            value={cardName}
            onChangeText={setCardName}
            placeholder="João Silva"
            required
          />

          <FormInput
            label="Número do Cartão"
            value={cardNumber}
            onChangeText={(text) => setCardNumber(formatCardNumber(text))}
            placeholder="1234 5678 9012 3456"
            keyboardType="numeric"
            maxLength={19}
            required
          />

          <View style={styles.row}>
            <View style={styles.halfWidth}>
              <FormInput
                label="Validade"
                value={expiryDate}
                onChangeText={(text) => setExpiryDate(formatExpiryDate(text))}
                placeholder="MM/AA"
                keyboardType="numeric"
                maxLength={5}
                required
              />
            </View>
            <View style={styles.halfWidth}>
              <FormInput
                label="CVV"
                value={cvv}
                onChangeText={setCvv}
                placeholder="123"
                keyboardType="numeric"
                maxLength={4}
                secureTextEntry
                required
              />
            </View>
          </View>

          <FormInput
            label="CPF (Opcional)"
            value={cpf}
            onChangeText={(text) => setCpf(formatCPF(text))}
            placeholder="000.000.000-00"
            keyboardType="numeric"
            maxLength={14}
          />
        </View>

        {/* Dados Protegidos */}
        <View style={styles.protectedSection}>
          <View style={styles.protectedHeader}>
            <Ionicons name="lock-closed" size={20} color={AppColors.success} />
            <ThemedText style={styles.protectedText}>
              Seus dados são criptografados e protegidos
            </ThemedText>
          </View>
        </View>

        {/* Botão Salvar */}
        <View style={styles.buttonContainer}>
          <PrimaryButton
            title="Salvar Método de Pagamento"
            onPress={handleSavePayment}
            style={styles.saveButton}
          />

          <TouchableOpacity style={styles.cancelButton}>
            <ThemedText style={styles.cancelButtonText}>Cancelar</ThemedText>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LayoutMain>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  secureSection: {
    backgroundColor: "#E8F5E8",
    padding: 16,
    borderRadius: 8,
    marginBottom: 24,
  },
  secureHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  secureTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
    color: AppColors.success,
  },
  secureDescription: {
    fontSize: 14,
    color: AppColors.textSecondary,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
    color: AppColors.text,
  },
  paymentTypeContainer: {
    flexDirection: "row",
    gap: 12,
  },
  paymentTypeButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: AppColors.border,
    backgroundColor: AppColors.surface,
  },
  paymentTypeButtonActive: {
    backgroundColor: AppColors.primary,
    borderColor: AppColors.primary,
  },
  paymentTypeText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: "500",
    color: AppColors.text,
  },
  paymentTypeTextActive: {
    color: AppColors.surface,
  },
  row: {
    flexDirection: "row",
    gap: 12,
  },
  halfWidth: {
    flex: 1,
  },
  acceptedCards: {
    flexDirection: "row",
    gap: 8,
  },
  cardBrand: {
    backgroundColor: AppColors.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  cardBrandText: {
    color: AppColors.surface,
    fontSize: 12,
    fontWeight: "600",
  },
  protectedSection: {
    backgroundColor: "#E8F5E8",
    padding: 16,
    borderRadius: 8,
    marginBottom: 32,
  },
  protectedHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    gap: 10,
  },
  protectedTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
    color: AppColors.success,
  },
  protectedDescription: {
    fontSize: 14,
    color: AppColors.textSecondary,
  },
  protectedText: {
    fontSize: 16,
    color: AppColors.textSecondary,
    flex: 1,
  },
  buttonContainer: {
    marginBottom: 70,
  },
  saveButton: {
    marginBottom: 12,
  },
  cancelButton: {
    alignItems: "center",
    padding: 16,
  },
  cancelButtonText: {
    fontSize: 16,
    color: AppColors.textSecondary,
  },
});

export default AddPayments;
