import Header from "@/components/ui/Header";
import { AppColors } from "@/constants/colors";
import LayoutMain from "@/layouts/LayoutApp";
import { useUserService } from "@/services/user";
import { useAuthStore } from "@/store/authStore";
import {
  formatPhoneBrazil,
  isValidBrazilianPhone,
  unformatPhone,
  validatePhoneInput,
} from "@/utils/helpers";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function EditProfileScreen() {
  const { user } = useAuthStore();
  const { updateProfile } = useUserService();
  const insets = useSafeAreaInsets();

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(
    formatPhoneBrazil(user?.phone || "") || ""
  );
  const [phoneError, setPhoneError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handlePhoneChange = (text: string) => {
    // Usa a função de validação que impede entrada inválida
    const validatedPhone = validatePhoneInput(text, phone);
    setPhone(validatedPhone);

    // Limpa o erro quando o usuário está digitando
    if (phoneError) {
      setPhoneError("");
    }
  };

  const validatePhone = () => {
    if (phone.trim() === "") {
      setPhoneError("");
      return true; // Campo opcional
    }

    const phoneNumbers = unformatPhone(phone);

    if (phoneNumbers.length < 10) {
      setPhoneError("Telefone deve ter pelo menos 10 dígitos");
      return false;
    }

    if (!isValidBrazilianPhone(phone)) {
      setPhoneError("Número de telefone inválido");
      return false;
    }

    setPhoneError("");
    return true;
  };

  const handleSave = async () => {
    // Valida o telefone antes de salvar
    if (!validatePhone()) {
      return;
    }

    setIsLoading(true);

    try {
      await updateProfile({
        name,
        email,
        phone: unformatPhone(phone),
      });
      Alert.alert("Sucesso", "Perfil atualizado com sucesso!");
      router.back();
    } catch (error) {
      console.error("Error updating profile:", error);
      Alert.alert("Erro", "Ocorreu um erro ao atualizar o perfil.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <LayoutMain>
      <Header title="Editar" />
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.formSection}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nome completo</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Digite seu nome completo"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>E-mail</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Digite seu e-mail"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Telefone (opcional)</Text>
            <TextInput
              style={[styles.input, phoneError ? styles.inputError : null]}
              value={phone}
              onChangeText={handlePhoneChange}
              onBlur={validatePhone}
              placeholder="(11) 99999-9999"
              keyboardType="numeric"
              maxLength={15}
            />
            {phoneError ? (
              <Text style={styles.errorText}>{phoneError}</Text>
            ) : null}
          </View>
        </View>
      </ScrollView>
      <View
        style={[styles.actionButtons, { paddingBottom: insets.bottom * 1.3 }]}
      >
        {!isLoading && (
          <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
            <Text style={styles.cancelButtonText}>Cancelar</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={[styles.saveButton, isLoading && styles.saveButtonLoading]}
          onPress={handleSave}
          disabled={isLoading}
        >
          {isLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator
                size="small"
                color={AppColors.surface}
                style={styles.loadingSpinner}
              />
              <Text style={styles.saveButtonText}>Salvando...</Text>
            </View>
          ) : (
            <Text style={styles.saveButtonText}>Salvar alterações</Text>
          )}
        </TouchableOpacity>
      </View>
    </LayoutMain>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: AppColors.surface,
    borderBottomWidth: 1,
    borderBottomColor: AppColors.border,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: AppColors.text,
  },
  placeholder: {
    width: 32,
  },
  scrollView: {
    flex: 1,
    backgroundColor: AppColors.surface,
  },
  profileSection: {
    alignItems: "center",
    paddingVertical: 32,
    backgroundColor: AppColors.surface,
  },
  profileImageContainer: {
    position: "relative",
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: AppColors.bgButtonGray,
    alignItems: "center",
    justifyContent: "center",
  },
  profileImageText: {
    fontSize: 32,
    fontWeight: "600",
    color: AppColors.textSecondary,
  },
  editImageButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: AppColors.primary,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: AppColors.surface,
  },
  formSection: {
    backgroundColor: AppColors.surface,
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: AppColors.text,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: AppColors.border,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: AppColors.text,
    backgroundColor: AppColors.surface,
  },
  inputError: {
    borderColor: "#FF6B6B",
  },
  errorText: {
    fontSize: 12,
    color: "#FF6B6B",
    marginTop: 4,
  },
  actionButtons: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: AppColors.surface,
    borderTopWidth: 1,
    borderTopColor: AppColors.border,
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: AppColors.border,
    alignItems: "center",
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: "500",
    color: AppColors.text,
  },
  saveButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 8,
    backgroundColor: AppColors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  saveButtonLoading: {
    backgroundColor: AppColors.primary,
    opacity: 0.8,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: AppColors.surface,
  },
  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  loadingSpinner: {
    marginRight: 8,
  },
});
