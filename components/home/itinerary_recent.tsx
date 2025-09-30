import { router } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import TravelItemComponent from "../ui/TravelItem";

interface TravelItem {
  id: string;
  destination: string;
  startDate: string;
  endDate: string;
  status: "planned" | "in_progress" | "completed";
  travelers: string;
  budget: number;
}

interface ItineraryRecentProps {
  ListHeaderComponent?: React.ComponentType<any> | React.ReactElement | null;
}

const ItineraryRecent: React.FC<ItineraryRecentProps> = ({
  ListHeaderComponent,
}) => {
  const [recentTravels, setRecentTravels] = useState<TravelItem[]>([
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
  ]);

  const renderTravelItem = ({ item: travel }: { item: TravelItem }) => (
    <TravelItemComponent travel={travel} />
  );

  const renderSectionHeader = () => (
    <View style={styles.sectionHeader}>
      <Text style={styles.title}>Itinerários Recentes</Text>
      <TouchableOpacity
        onPress={() => router.push("/(app)/(tabs)/my-itinerarys")}
      >
        <Text style={styles.seeAllText}>Ver todos</Text>
      </TouchableOpacity>
    </View>
  );

  const renderFullHeader = () => (
    <View>
      {ListHeaderComponent &&
        (typeof ListHeaderComponent === "function" ? (
          <ListHeaderComponent />
        ) : (
          ListHeaderComponent
        ))}
      {renderSectionHeader()}
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={recentTravels}
        renderItem={renderTravelItem}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderFullHeader}
        style={styles.flatListContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flatListContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1a1a1a",
  },
  seeAllText: {
    fontSize: 14,
    color: "#007AFF",
    fontWeight: "500",
  },
  flatListContainer: {
    flex: 1,
    flexGrow: 1,
  },
  flatListContent: {
    flexGrow: 1,
  },
});

export default ItineraryRecent;
