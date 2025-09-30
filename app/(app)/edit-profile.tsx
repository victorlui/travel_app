import StatusBarComponent from "@/components/ui/StatusBar";
import { AppColors } from "@/constants/colors";
import { useAuthStore } from "@/store/authStore";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

export default function EditProfileScreen() {
  const { user } = useAuthStore();
  const insets = useSafeAreaInsets();

  const [name, setName] = useState(user?.name || "Maria Silva");
  const [email, setEmail] = useState(user?.email || "maria.silva@email.com");
  const [phone, setPhone] = useState("(11) 99999-9999");

  const handleSave = () => {
    Alert.alert("Sucesso", "Perfil atualizado com sucesso!");
    router.back();
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <SafeAreaView edges={["top"]} style={styles.container}>
      <StatusBarComponent backgroundColor={AppColors.surface} />
      <View style={styles.header}>
        <TouchableOpacity onPress={handleCancel} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={AppColors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Editar Perfil</Text>
        <View style={styles.placeholder} />
      </View>
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
              style={styles.input}
              value={phone}
              onChangeText={setPhone}
              placeholder="Digite seu telefone"
              keyboardType="phone-pad"
            />
          </View>
        </View>
      </ScrollView>
      <View
        style={[styles.actionButtons, { paddingBottom: insets.bottom * 1.3 }]}
      >
        <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
          <Text style={styles.cancelButtonText}>Cancelar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Salvar alterações</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
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
    marginTop: 16,
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
  notificationSection: {
    backgroundColor: AppColors.surface,
    marginTop: 16,
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: AppColors.text,
    marginBottom: 16,
  },
  notificationItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
  },
  notificationInfo: {
    flex: 1,
    marginRight: 16,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: AppColors.text,
    marginBottom: 4,
  },
  notificationSubtitle: {
    fontSize: 14,
    color: AppColors.textSecondary,
  },
  planSection: {
    backgroundColor: AppColors.surface,
    marginTop: 16,
    paddingHorizontal: 20,
    paddingVertical: 24,
    marginBottom: 100, // Espaço para os botões fixos
  },
  planCard: {
    borderWidth: 1,
    borderColor: AppColors.border,
    borderRadius: 12,
    padding: 16,
  },
  planName: {
    fontSize: 16,
    fontWeight: "600",
    color: AppColors.text,
    marginBottom: 8,
  },
  planDescription: {
    fontSize: 14,
    color: AppColors.textSecondary,
    lineHeight: 20,
    marginBottom: 16,
  },
  upgradeButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: AppColors.primary,
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  upgradeButtonText: {
    color: AppColors.surface,
    fontSize: 14,
    fontWeight: "600",
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
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: AppColors.surface,
  },
});
