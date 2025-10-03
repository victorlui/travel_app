import StatusBarComponent from "@/components/ui/StatusBar";
import { AppColors } from "@/constants/colors";
import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface LayoutMainProps {
  children: React.ReactNode;
  edges?: ("top" | "bottom" | "left" | "right")[];
}

const LayoutMain: React.FC<LayoutMainProps> = ({
  children,
  edges = ["top"],
}) => {
  return (
    <SafeAreaView edges={edges} style={styles.container}>
      <StatusBarComponent backgroundColor={AppColors.surface} />
      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
});

export default LayoutMain;
