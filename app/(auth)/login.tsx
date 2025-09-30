import { FormInput } from "@/components/form/FormInput";
import { PrimaryButton } from "@/components/form/PrimaryButton";
import { AppColors } from "@/constants/colors";
import { loginUser } from "@/services/authService";
import { useAuthStore } from "@/store/authStore";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );

  const router = useRouter();
  const { isLoading } = useAuthStore();

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};

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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    // Simular login (substituir pela lógica real de autenticação)
    try {
      await loginUser(email, password);
      //router.push("/(app)/welcome");
    } catch (error) {
      setErrors({
        email: "Email ou senha inválidos",
        password: "Email ou senha inválidos",
      });
    }
  };

  //   const handleSocialLogin = (provider: string) => {
  //     console.log(`Login com ${provider}`);
  //     // Implementar login social
  //   };

  const goToSignup = () => {
    router.push("/(auth)/register");
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      {/* Background Image */}
      <Image
        source={require("@/assets/images/sunset.jpg")}
        style={styles.backgroundImage}
      />

      {/* Gradient Overlay */}
      <View style={styles.gradientOverlay} />

      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          style={styles.keyboardView}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
        >
          {/* Header */}
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

          {/* Content Container */}
          <View style={styles.contentContainer}>
            {/* Welcome Message */}
            <View style={styles.welcomeContainer}>
              <Text style={styles.welcomeTitle}>Bem-vindo de volta!</Text>
              <Text style={styles.welcomeSubtitle}>
                Entre na sua conta para continuar
              </Text>
            </View>

            {/* Login Form */}
            <View style={styles.formContainer}>
              <View style={styles.inputContainer}>
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
                    placeholder="Sua senha"
                    secureTextEntry={!showPassword}
                    autoComplete="password"
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
                </View>
              </View>

              {/* Forgot Password */}
              <TouchableOpacity style={styles.forgotPassword}>
                <Text style={styles.forgotPasswordText}>
                  Esqueceu sua senha?
                </Text>
              </TouchableOpacity>

              {/* Login Button */}
              <PrimaryButton
                title="Entrar"
                onPress={handleLogin}
                loading={isLoading}
                style={styles.loginButton}
              />

              {/* Social Login */}
              {/* <View style={styles.socialSection}>
                <View style={styles.socialContainer}>
                  <TouchableOpacity
                    style={styles.socialButton}
                    onPress={() => handleSocialLogin("Google")}
                  >
                    <MaterialIcons name="google" size={20} color="#DB4437" />
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.socialButton}
                    onPress={() => handleSocialLogin("Apple")}
                  >
                    <MaterialIcons name="apple" size={20} color="#000" />
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.socialButton}
                    onPress={() => handleSocialLogin("Facebook")}
                  >
                    <MaterialIcons name="facebook" size={20} color="#4267B2" />
                  </TouchableOpacity>
                </View>
              </View> */}
            </View>

            {/* Footer */}
            <View style={styles.footer}>
              <View style={styles.signupContainer}>
                <Text style={styles.signupText}>Não tem uma conta? </Text>
                <TouchableOpacity onPress={goToSignup}>
                  <Text style={styles.signupLink}>Cadastre-se</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
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
    height: "100%",
    resizeMode: "cover",
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
  header: {
    paddingTop: 20,
    paddingBottom: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
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
    marginBottom: 24,
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
  },
  inputContainer: {
    marginBottom: 12,
  },
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
  forgotPassword: {
    alignSelf: "flex-end",
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: AppColors.primary,
    fontSize: 14,
    fontWeight: "500",
  },
  loginButton: {
    marginBottom: 20,
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
    fontSize: 14,
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
    paddingTop: 16,
    paddingBottom: 8,
    alignItems: "center",
  },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  signupText: {
    color: "rgba(255,255,255,0.9)",
    fontSize: 14,
  },
  signupLink: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },
});
