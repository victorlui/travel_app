import React from "react";
import { StatusBar, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Props {
  backgroundColor?: string;
  isDark?: boolean;
}

const StatusBarComponent: React.FC<Props> = ({
  backgroundColor = "transparent",
  isDark = true,
}) => {
  const insets = useSafeAreaInsets();
  return (
    <>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={isDark ? "dark-content" : "light-content"}
      />

      {/* View apenas para área da StatusBar */}
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: insets.top,
          backgroundColor: backgroundColor,
        }}
      />
    </>
  );
};

export default StatusBarComponent;
