import { FormInput } from "@/components/form/FormInput";
import { PrimaryButton } from "@/components/form/PrimaryButton";
import { FullScreenLoading } from "@/components/ui/FullScreenLoading";
import { AppColors } from "@/constants/colors";
import { registerUser } from "@/services/authService";
import { useAuthStore, useIsLoading } from "@/store/authStore";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  KeyboardAvoidingViewProps,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { height } = Dimensions.get("window");

export default function RegisterScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  const router = useRouter();
  const isLoading = useIsLoading();
  const { setLoading } = useAuthStore();

  const defaultValue: KeyboardAvoidingViewProps["behavior"] =
    Platform.OS === "ios" ? "padding" : "height";

  const [behaviour, setBehaviour] =
    useState<KeyboardAvoidingViewProps["behavior"]>(defaultValue);

  useEffect(() => {
    const showListener = Keyboard.addListener("keyboardDidShow", () => {
      setBehaviour(defaultValue);
    });
    const hideListener = Keyboard.addListener("keyboardDidHide", () => {
      setBehaviour(undefined);
    });

    return () => {
      showListener.remove();
      hideListener.remove();
    };
  }, [defaultValue]);

  const validateForm = () => {
    const newErrors: {
      name?: string;
      email?: string;
      password?: string;
      confirmPassword?: string;
    } = {};

    if (!name.trim()) {
      newErrors.name = "Nome é obrigatório";
    } else if (name.trim().length < 2) {
      newErrors.name = "Nome deve ter pelo menos 2 caracteres";
    }

    if (!email) {
      newErrors.email = "Email é obrigatório";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email inválido";
    }

    if (!password) {
      newErrors.password = "Senha é obrigatória";
    } else if (password.length < 6) {
      newErrors.password = "Senha deve ter pelo menos 6 caracteres";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Confirmação de senha é obrigatória";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Senhas não coincidem";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    try {
      await registerUser(name, email, password);
      router.replace("/(app)/welcome");
    } finally {
      setLoading(false);
    }
  };

  const goToLogin = () => {
    router.push("/(auth)/login");
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Image
        source={require("@/assets/images/beach.jpg")}
        style={styles.backgroundImage}
      />

      <View style={styles.gradientOverlay} />

      <KeyboardAvoidingView
        style={[styles.keyboardView]}
        behavior={behaviour}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContentContainer}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          <View style={styles.contentWrapper}>
            <View style={styles.header}>
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => router.back()}
              >
                <Feather name="arrow-left" size={24} color="white" />
              </TouchableOpacity>

              <View style={styles.logoContainer}>
                <MaterialIcons name="travel-explore" size={36} color="white" />
                <Text style={styles.logoText}>TravelAI</Text>
              </View>
            </View>

            <View style={styles.welcomeContainer}>
              <Text style={styles.welcomeTitle}>Crie sua conta</Text>
              <Text style={styles.welcomeSubtitle}>
                Junte-se a nós e comece a planejar suas viagens
              </Text>
            </View>

            <View style={styles.formContainer}>
              <View style={styles.inputContainer}>
                <FormInput
                  label="Nome completo"
                  value={name}
                  onChangeText={setName}
                  placeholder="Seu nome completo"
                  autoCapitalize="words"
                  autoComplete="name"
                  error={errors.name}
                  icon={
                    <Feather
                      name="user"
                      size={18}
                      color={AppColors.textSecondary}
                    />
                  }
                />

                <FormInput
                  label="Email"
                  value={email}
                  onChangeText={setEmail}
                  placeholder="seu@email.com"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoComplete="email"
                  error={errors.email}
                  icon={
                    <Feather
                      name="mail"
                      size={18}
                      color={AppColors.textSecondary}
                    />
                  }
                />

                <View style={styles.passwordContainer}>
                  <FormInput
                    label="Senha"
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Crie uma senha"
                    secureTextEntry={!showPassword}
                    autoComplete="new-password"
                    error={errors.password}
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
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    <Feather
                      name={showPassword ? "eye-off" : "eye"}
                      size={18}
                      color={AppColors.textSecondary}
                    />
                  </TouchableOpacity>
                  <View style={styles.passwordContainer}>
                    <FormInput
                      label="Confirmar senha"
                      value={confirmPassword}
                      onChangeText={setConfirmPassword}
                      placeholder="Confirme sua senha"
                      secureTextEntry={!showConfirmPassword}
                      autoComplete="new-password"
                      error={errors.confirmPassword}
                      icon={
                        <Feather
                          name="lock"
                          size={18}
                          color={AppColors.textSecondary}
                        />
                      }
                    />
                    <TouchableOpacity
                      style={styles.showConfirmPasswordButton}
                      onPress={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      <Feather
                        name={showConfirmPassword ? "eye-off" : "eye"}
                        size={18}
                        color={AppColors.textSecondary}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.termsContainer}>
                  <Text style={styles.termsText}>
                    Ao criar uma conta, você concorda com nossos{" "}
                    <Text style={styles.termsLink}>Termos de Uso</Text> e{" "}
                    <Text style={styles.termsLink}>
                      Política de Privacidade
                    </Text>
                  </Text>
                </View>

                <PrimaryButton
                  title="Criar conta"
                  onPress={handleRegister}
                  loading={isLoading}
                  style={styles.registerButton}
                />
              </View>
            </View>
            <View style={styles.footer}>
              <View style={styles.loginContainer}>
                <Text style={styles.loginText}>Já tem uma conta? </Text>
                <TouchableOpacity onPress={goToLogin}>
                  <Text style={styles.loginLink}>Entrar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Componente de Loading em Tela Cheia */}
      <FullScreenLoading
        visible={isLoading}
        title="Criando sua conta..."
        subtitle="Aguarde enquanto configuramos tudo para você começar a planejar suas viagens incríveis"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  backgroundImage: {
    position: "absolute",
    width: "100%",
    height: "120%",
    resizeMode: "cover",
    objectFit: "fill",
    flex: 1,
  },
  gradientOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  safeArea: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
    paddingHorizontal: 24,
  },
  scrollView: {
    flex: 1,
  },
  scrollContentContainer: {
    flexGrow: 1,
    minHeight: height - 100, // Garante altura mínima
  },
  contentWrapper: {
    flex: 1,
    justifyContent: "space-between",
  },
  header: {
    paddingTop: 40,
    paddingBottom: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  logoContainer: {
    alignItems: "center",
  },
  logoText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
    marginTop: 6,
    textShadowColor: "rgba(0,0,0,0.3)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "space-between",
  },
  welcomeContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  welcomeTitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginBottom: 8,
    textShadowColor: "rgba(0,0,0,0.3)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: "rgba(255,255,255,0.9)",
    textAlign: "center",
    textShadowColor: "rgba(0,0,0,0.3)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  formContainer: {
    backgroundColor: "rgba(255,255,255,0.95)",
    borderRadius: 20,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
    marginBottom: 20, // Adiciona margem inferior
  },
  inputContainer: {},
  passwordContainer: {
    position: "relative",
  },
  showPasswordButton: {
    position: "absolute",
    right: 16,
    top: 42,
    padding: 8,
    zIndex: 1,
  },
  showConfirmPasswordButton: {
    position: "absolute",
    right: 16,
    top: 42,
    padding: 8,
    zIndex: 1,
  },
  termsContainer: {
    marginBottom: 20,
  },
  termsText: {
    fontSize: 12,
    color: AppColors.textSecondary,
    textAlign: "center",
    lineHeight: 18,
  },
  termsLink: {
    color: AppColors.primary,
    fontWeight: "500",
  },
  registerButton: {
    marginBottom: 16,
  },
  socialSection: {
    alignItems: "center",
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    width: "100%",
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: AppColors.border,
  },
  dividerText: {
    marginHorizontal: 12,
    color: AppColors.textSecondary,
    fontSize: 12,
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 12,
  },
  socialButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: AppColors.surface,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: AppColors.border,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  footer: {
    paddingTop: 12,
    paddingBottom: 70,
    alignItems: "center",
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  loginText: {
    color: "rgba(255,255,255,0.9)",
    fontSize: 14,
  },
  loginLink: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },
});
