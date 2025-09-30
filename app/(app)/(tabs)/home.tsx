import Banners from "@/components/home/banner";
import HeaderHome from "@/components/home/header-home";
import ItineraryRecent from "@/components/home/itinerary_recent";
import { useAuthStore } from "@/store/authStore";

import React from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const { user } = useAuthStore();

  const renderHeader = () => (
    <View style={styles.headerContent}>
      <HeaderHome user={user ?? null} />
      <View style={styles.bannerContainer}>
        <Banners />
      </View>
    </View>
  );

  return (
    <SafeAreaView edges={["top"]} style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <ItineraryRecent ListHeaderComponent={renderHeader} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  headerContent: {
    backgroundColor: "#FFFFFF",
  },
  bannerContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
});
