import { Stack } from "expo-router";
import React from "react";

const RootLayoutApp: React.FC = () => {
  return (
    <Stack>
      {/* //<Stack.Screen name="index" options={{ headerShown: false }} /> */}
      <Stack.Screen name="welcome" options={{ headerShown: false }} />
      <Stack.Screen name="home" options={{ headerShown: false }} />
      <Stack.Screen name="create-itinerary" options={{ headerShown: false }} />
      <Stack.Screen
        name="itinerary_generation"
        options={{ headerShown: false }}
      />
    </Stack>
  );
};

export default RootLayoutApp;
