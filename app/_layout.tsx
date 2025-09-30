import { AlertContainer } from "@/components/ui/AlertContainer";
import { FullScreenLoading } from "@/components/ui/FullScreenLoading";
import { useIsAuthenticated } from "@/store/authStore";
import * as NavigationBar from "expo-navigation-bar";
import { Stack, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";

const RootLayout: React.FC = () => {
  NavigationBar.setButtonStyleAsync("dark");
  const isAuthenticated = useIsAuthenticated();
  const router = useRouter();
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const initializeApp = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsInitializing(false);

      setTimeout(() => {
        if (isAuthenticated) {
          router.replace("/(app)/(tabs)/home");
        }
      }, 200);
    };

    initializeApp();
  }, [isAuthenticated, router]);

  return (
    <>
      <Stack>
        <Stack.Screen name="intro" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(app)" options={{ headerShown: false }} />
      </Stack>
      <AlertContainer />

      {/* Loading durante a inicialização */}
      <FullScreenLoading
        visible={isInitializing}
        title="Inicializando TravelAI..."
        subtitle="Preparando tudo para sua experiência de viagem perfeita"
      />
    </>
  );
};

export default RootLayout;
