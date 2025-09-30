import { AppColors } from "@/constants/colors";
import { User } from "@/types/auth";
import { FontAwesome6 } from "@expo/vector-icons";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Props {
  user: User | null;
}

const HeaderHome: React.FC<Props> = ({ user }) => {
  const inssets = useSafeAreaInsets();
  return (
    <View style={[styles.header, { paddingTop: inssets.top }]}>
      <View style={styles.logoContainer}>
        <Image
          source={require("@/assets/images/logo.png")}
          style={styles.logo}
        />
        <Text style={styles.headerText}>TravelAI</Text>
      </View>
      <TouchableOpacity style={styles.profileButton}>
        <FontAwesome6 name="user" size={24} color={AppColors.textSecondary} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: AppColors.surface,
    paddingBottom: 25,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: AppColors.text,
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
});

export default HeaderHome;
