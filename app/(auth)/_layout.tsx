import { Stack } from "expo-router";
import React from "react";

const RootLayout: React.FC = () => {
  return (
    <Stack>
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="register" options={{ headerShown: false }} />
    </Stack>
  );
};

export default RootLayout;
