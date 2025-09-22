import * as NavigationBar from "expo-navigation-bar";
import { Stack } from "expo-router";
import React from "react";

const RootLayout: React.FC = () => {
  NavigationBar.setButtonStyleAsync("dark");

  return (
    <Stack>
      <Stack.Screen name="(app)" options={{ headerShown: false }} />
    </Stack>
  );
};

export default RootLayout;
