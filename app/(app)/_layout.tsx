import { Stack } from "expo-router";
import React from "react";

const RootLayoutApp: React.FC = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* //<Stack.Screen name="index"  /> */}
      <Stack.Screen name="welcome" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="create-itinerary" />
      <Stack.Screen name="itinerary_generation" />
      <Stack.Screen name="profile" />
    </Stack>
  );
};

export default RootLayoutApp;
