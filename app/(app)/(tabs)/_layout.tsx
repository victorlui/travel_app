import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";

const RootLayoutTabs: React.FC = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#007AFF",
        headerShown: false,
        headerStyle: { backgroundColor: "#0000FF" },
        headerTintColor: "#fff",
        // status bar separado:
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Início",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="my-itinerarys"
        options={{
          title: "Meus Itinerários",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="map-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Perfil",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default RootLayoutTabs;
