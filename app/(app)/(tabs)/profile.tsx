import PlanUpgrade from "@/components/ui/PlanUpgrade";
import { AppColors } from "@/constants/colors";
import LayoutMain from "@/layouts/LayoutApp";
import { useAuthStore } from "@/store/authStore";
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

export default function ProfileScreen() {
  const { user, logout } = useAuthStore();

  const menuItems = [
    {
      id: "password",
      title: "Alterar senha",
      icon: "lock-closed-outline",
      color: "#FF4757",
    },
    {
      id: "payments",
      title: "Pagamentos e Assinaturas",
      icon: "card-outline",
      color: "#2ED573",
    },
    // {
    //   id: "settings",
    //   title: "Configurações do app",
    //   icon: "settings-outline",
    //   color: "#5352ED",
    // },
    // {
    //   id: "support",
    //   title: "Suporte / Fale conosco",
    //   icon: "chatbubble-outline",
    //   color: "#A55EEA",
    // },
    // {
    //   id: "help",
    //   title: "Ajuda e FAQ",
    //   icon: "help-circle-outline",
    //   color: "#FFA502",
    // },
  ];

  const handleMenuPress = (itemId: string) => {
    switch (itemId) {
      case "payments":
        router.push("/(app)/payments");
        break;
      case "password":
        router.push("/(app)/change-password");
        break;
      default:
        console.log(`Pressed: ${itemId}`);
    }
  };

  const handleEditProfile = () => {
    router.push("/(app)/edit-profile");
  };

  const handleLogout = () => {
    logout();
    router.push("/(auth)/login");
  };

  return (
    <LayoutMain>
      <View style={[styles.header]}>
        <View style={styles.profileInfo}>
          <TouchableOpacity style={styles.profileButton}>
            <Text style={styles.profileButtonText}>
              {user?.name?.charAt(0) || "M"}
            </Text>
          </TouchableOpacity>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{user?.name || "Maria Silva"}</Text>
            <Text style={styles.userEmail}>
              {user?.email || "maria.silva@email.com"}
            </Text>
            <TouchableOpacity
              style={styles.editButton}
              onPress={handleEditProfile}
            >
              <Text style={styles.editButtonText}>Editar Perfil</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: 20,
          paddingTop: 20,
        }}
      >
        <View>
          {/* Plano Gratuito */}
          <PlanUpgrade />

          {/* Menu Items */}
          <View style={styles.menuContainer}>
            {menuItems.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.menuItem}
                onPress={() => handleMenuPress(item.id)}
              >
                <View style={styles.menuItemLeft}>
                  <View
                    style={[
                      styles.iconContainer,
                      { backgroundColor: `${item.color}20` },
                    ]}
                  >
                    <Ionicons
                      name={item.icon as any}
                      size={20}
                      color={item.color}
                    />
                  </View>
                  <Text style={styles.menuItemText}>{item.title}</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Sair da conta</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={handleLogout}>
          <Text style={styles.deleteButtonText}>Excluir conta</Text>
        </TouchableOpacity>
      </ScrollView>
    </LayoutMain>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  header: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  profileInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  profileButton: {
    backgroundColor: AppColors.bgButtonGray,
    padding: 15,
    borderRadius: "100%",
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  profileButtonText: {
    fontSize: 24,
    fontWeight: "600",
    color: AppColors.textSecondary,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1A1A1A",
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: "#8E8E93",
    marginBottom: 8,
  },
  editButton: {
    alignSelf: "flex-start",
  },
  editButtonText: {
    fontSize: 14,
    color: "#007AFF",
    fontWeight: "500",
  },

  menuContainer: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    borderRadius: 12,
    marginBottom: 20,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F2F2F7",
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  menuItemText: {
    fontSize: 16,
    color: "#1A1A1A",
    flex: 1,
  },
  logoutButton: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
  },
  logoutButtonText: {
    fontSize: 16,
    color: "#FF3B30",
    fontWeight: "500",
  },
  deleteButton: {
    backgroundColor: "transparent",
    marginHorizontal: 20,
    borderRadius: 12,
    paddingVertical: 16,
    marginVertical: 20,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#FF3B30",
  },
  deleteButtonText: {
    fontSize: 16,
    color: "#FF3B30",
    fontWeight: "500",
  },
});
