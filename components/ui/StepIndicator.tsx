import { AppColors } from "@/constants/colors";
import React from "react";
import { StyleSheet, View } from "react-native";

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export function StepIndicator({ currentStep, totalSteps }: StepIndicatorProps) {
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <View style={styles.container}>
      <View style={styles.progressTrack}>
        <View
          style={[styles.progressFill, { width: `${progressPercentage}%` }]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  progressTrack: {
    height: 8,
    backgroundColor: AppColors.border,
    borderRadius: 4,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: AppColors.primary,
    borderRadius: 4,
  },
});
