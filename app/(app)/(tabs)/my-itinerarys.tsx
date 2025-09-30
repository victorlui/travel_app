import { ThemedText } from "@/components/themed-text";
import TravelItemComponent from "@/components/ui/TravelItem";
import { AppColors } from "@/constants/colors";
import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

const mockItineraries: any[] = [
  {
    id: "1",
    destination: "Paris, França",
    startDate: "2024-03-15",
    endDate: "2024-03-18",
    status: "planned",
    travelers: "couple",
    budget: 3500,
  },
  {
    id: "2",
    destination: "Florença, Itália",
    startDate: "2024-02-22",
    endDate: "2024-02-28",
    status: "completed",
    travelers: "solo",
    budget: 4200,
  },
];

const MyItinerarys: React.FC = () => {
  const insets = useSafeAreaInsets();
  return (
    <SafeAreaView edges={["top"]} style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top * 1 }]}>
        <ThemedText style={styles.title}>Meus Itinerários</ThemedText>
      </View>

      <FlatList
        data={mockItineraries}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <TravelItemComponent travel={item} />}
        contentContainerStyle={styles.scrollView}
      />

      {/* Floating Action Button */}
      {/* <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push("/(app)/create-itinerary")}
      >
        <Ionicons name="add" size={24} color={AppColors.surface} />
      </TouchableOpacity> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.surface,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: AppColors.surface,
    borderBottomWidth: 1,
    borderBottomColor: AppColors.border,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: AppColors.text,
  },
  headerIcons: {
    flexDirection: "row",
    gap: 8,
  },
  iconButton: {
    padding: 4,
  },
  usageContainer: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: AppColors.surface,
    borderBottomWidth: 1,
    borderBottomColor: AppColors.border,
  },
  usageIndicator: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  usageText: {
    fontSize: 14,
    color: AppColors.textSecondary,
  },
  scrollView: {
    flex: 1,
    marginVertical: 20,
    paddingBottom: 30,
  },
  fab: {
    position: "absolute",
    bottom: 24,
    right: 24,
    backgroundColor: AppColors.success,
    padding: 20,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
  },
});

export default MyItinerarys;
