import { FormInput } from "@/components/form/FormInput";
import { PrimaryButton } from "@/components/form/PrimaryButton";
import Header from "@/components/ui/Header";
import { AppColors } from "@/constants/colors";
import { useKeyboardBehavior } from "@/hooks/useKeyboardBehavior";
import LayoutMain from "@/layouts/LayoutApp";
import { useUserService } from "@/services/user";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function ChangePasswordScreen() {
  const behaviour = useKeyboardBehavior();
  const { updatePassword } = useUserService();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Validação dos requisitos da senha
  const passwordRequirements = [
    {
      text: "Pelo menos 8 caracteres",
      met: newPassword.length >= 8,
    },
    {
      text: "Uma letra maiúscula",
      met: /[A-Z]/.test(newPassword),
    },
    {
      text: "Uma letra minúscula",
      met: /[a-z]/.test(newPassword),
    },
    {
      text: "Um número",
      met: /\d/.test(newPassword),
    },
    {
      text: "Um símbolo especial",
      met: /[!@#$%^&*(),.?":{}|<>]/.test(newPassword),
    },
  ];

  const validateForm = () => {
    const newErrors = {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    };

    if (!currentPassword.trim()) {
      newErrors.currentPassword = "Senha atual é obrigatória";
    }

    if (!newPassword.trim()) {
      newErrors.newPassword = "Nova senha é obrigatória";
    } else if (newPassword.length < 8) {
      newErrors.newPassword = "A senha deve ter pelo menos 8 caracteres";
    } else if (!passwordRequirements.every((req) => req.met)) {
      newErrors.newPassword = "A senha não atende aos requisitos";
    }

    if (!confirmPassword.trim()) {
      newErrors.confirmPassword = "Confirmação de senha é obrigatória";
    } else if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = "As senhas não coincidem";
    }

    if (currentPassword === newPassword) {
      newErrors.newPassword = "A nova senha deve ser diferente da atual";
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error !== "");
  };

  const handleChangePassword = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await updatePassword(currentPassword, newPassword);

      Alert.alert("Sucesso", "Senha alterada com sucesso!", [
        {
          text: "OK",
          onPress: () => router.back(),
        },
      ]);
    } catch (error: any) {
      console.log(error.response.data);
      Alert.alert(
        "Erro",
        (error.response && error.response.data.detail) ||
          "Erro ao alterar senha"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <LayoutMain edges={["top", "bottom"]}>
      <Header title="Alterar Senha" />

      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={behaviour}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
        enabled={true}
      >
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          nestedScrollEnabled={true}
        >
          {/* Seção de Segurança */}
          <View style={styles.securitySection}>
            <View style={styles.securityHeader}>
              <View style={styles.securityIcon}>
                <MaterialIcons
                  name="security"
                  size={24}
                  color={AppColors.primary}
                />
              </View>
              <Text style={styles.securityTitle}>Segurança da Conta</Text>
            </View>
            <View style={styles.securityContent}>
              <Text style={styles.securityDescription}>
                Escolha uma senha forte para proteger sua conta. Use uma
                combinação de letras, números e símbolos.
              </Text>
            </View>
          </View>

          {/* Formulário */}
          <View style={styles.formContainer}>
            {/* Senha Atual */}
            <View style={styles.passwordContainer}>
              <FormInput
                label="Senha Atual"
                value={currentPassword}
                onChangeText={setCurrentPassword}
                placeholder="Digite sua senha atual"
                secureTextEntry={!showCurrentPassword}
                error={errors.currentPassword}
                icon={
                  <Feather
                    name="lock"
                    size={18}
                    color={AppColors.textSecondary}
                  />
                }
              />
              <TouchableOpacity
                style={styles.showPasswordButton}
                onPress={() => setShowCurrentPassword(!showCurrentPassword)}
              >
                <Feather
                  name={showCurrentPassword ? "eye-off" : "eye"}
                  size={18}
                  color={AppColors.textSecondary}
                />
              </TouchableOpacity>
            </View>

            {/* Nova Senha */}
            <View style={styles.passwordContainer}>
              <FormInput
                label="Nova Senha"
                value={newPassword}
                onChangeText={setNewPassword}
                placeholder="Digite sua nova senha"
                secureTextEntry={!showNewPassword}
                error={errors.newPassword}
                icon={
                  <Feather
                    name="lock"
                    size={18}
                    color={AppColors.textSecondary}
                  />
                }
              />
              <TouchableOpacity
                style={styles.showPasswordButton}
                onPress={() => setShowNewPassword(!showNewPassword)}
              >
                <Feather
                  name={showNewPassword ? "eye-off" : "eye"}
                  size={18}
                  color={AppColors.textSecondary}
                />
              </TouchableOpacity>
            </View>

            {/* Força da Senha */}
            {newPassword.length > 0 && (
              <View style={styles.passwordStrengthContainer}>
                <Text style={styles.passwordStrengthTitle}>Força da senha</Text>
                <View style={styles.passwordStrengthBar}>
                  <View
                    style={[
                      styles.passwordStrengthFill,
                      {
                        width: `${
                          (passwordRequirements.filter((req) => req.met)
                            .length /
                            passwordRequirements.length) *
                          100
                        }%`,
                        backgroundColor:
                          passwordRequirements.filter((req) => req.met).length <
                          3
                            ? AppColors.error
                            : passwordRequirements.filter((req) => req.met)
                                .length < 5
                            ? AppColors.warning
                            : AppColors.success,
                      },
                    ]}
                  />
                </View>
                <Text style={styles.passwordStrengthText}>
                  {passwordRequirements.filter((req) => req.met).length < 3
                    ? "Fraca"
                    : passwordRequirements.filter((req) => req.met).length < 5
                    ? "Média"
                    : "Forte"}
                </Text>
              </View>
            )}

            {/* Confirmar Nova Senha */}
            <View style={styles.passwordContainer}>
              <FormInput
                label="Confirmar Nova Senha"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Confirme sua nova senha"
                secureTextEntry={!showConfirmPassword}
                error={errors.confirmPassword}
                autoComplete="new-password"
                textContentType="newPassword"
                returnKeyType="done"
                icon={
                  <Feather
                    name="lock"
                    size={18}
                    color={AppColors.textSecondary}
                  />
                }
              />
              <TouchableOpacity
                style={styles.showPasswordButton}
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <Feather
                  name={showConfirmPassword ? "eye-off" : "eye"}
                  size={18}
                  color={AppColors.textSecondary}
                />
              </TouchableOpacity>
            </View>

            {/* Requisitos da Senha */}
            <View style={styles.requirementsContainer}>
              <Text style={styles.requirementsTitle}>Requisitos da senha:</Text>
              {passwordRequirements.map((requirement, index) => (
                <View key={index} style={styles.requirementItem}>
                  <MaterialIcons
                    name={requirement.met ? "check" : "close"}
                    size={16}
                    color={
                      requirement.met ? AppColors.success : AppColors.error
                    }
                  />
                  <Text
                    style={[
                      styles.requirementText,
                      {
                        color: requirement.met
                          ? AppColors.success
                          : AppColors.textSecondary,
                      },
                    ]}
                  >
                    {requirement.text}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/* Botões de Ação */}
          <View style={styles.buttonContainer}>
            <PrimaryButton
              title="Salvar Alterações"
              onPress={handleChangePassword}
              loading={isLoading}
              style={styles.saveButton}
            />

            <TouchableOpacity
              style={styles.cancelButton}
              onPress={handleCancel}
              disabled={isLoading}
            >
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LayoutMain>
  );
}

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: AppColors.background,
  },
  scrollContent: {
    flexGrow: 1,
  },
  securitySection: {
    backgroundColor: "#EFF6FF",
    padding: 20,
    margin: 16,
    borderRadius: 12,
  },
  securityHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  securityIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: `${AppColors.primary}15`,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  securityContent: {
    flex: 1,
    marginVertical: 16,
  },
  securityTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: AppColors.text,
    marginBottom: 4,
  },
  securityDescription: {
    fontSize: 14,
    color: AppColors.textSecondary,
    lineHeight: 20,
  },

  formContainer: {
    backgroundColor: AppColors.surface,
    padding: 24,
    marginTop: 8,
    margin: 16,
    borderRadius: 12,
  },
  passwordContainer: {
    position: "relative",
    marginBottom: 16,
  },
  showPasswordButton: {
    position: "absolute",
    right: 16,
    top: 42,
    padding: 8,
    zIndex: 1,
  },
  passwordStrengthContainer: {
    marginBottom: 16,
  },
  passwordStrengthTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: AppColors.text,
    marginBottom: 8,
  },
  passwordStrengthBar: {
    height: 4,
    backgroundColor: AppColors.border,
    borderRadius: 2,
    marginBottom: 4,
  },
  passwordStrengthFill: {
    height: "100%",
    borderRadius: 2,
  },
  passwordStrengthText: {
    fontSize: 12,
    color: AppColors.textSecondary,
  },
  requirementsContainer: {
    marginTop: 16,
  },
  requirementsTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: AppColors.text,
    marginBottom: 12,
  },
  requirementItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  requirementText: {
    fontSize: 14,
    marginLeft: 8,
  },
  buttonContainer: {
    padding: 24,
    backgroundColor: AppColors.surface,
    marginTop: 8,
    margin: 16,
    borderRadius: 12,
  },
  saveButton: {
    marginBottom: 12,
  },
  cancelButton: {
    paddingVertical: 14,
    alignItems: "center",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: AppColors.border,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: "500",
    color: AppColors.text,
  },
});
