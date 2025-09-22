import { ThemedText } from "@/components/themed-text";
import { AppColors } from "@/constants/colors";
import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";

export interface PrimaryButtonProps extends TouchableOpacityProps {
  title: string;
  loading?: boolean;
  variant?: "primary" | "secondary" | "outline";
  size?: "small" | "medium" | "large";
  icon?: React.ReactNode;
}

export function PrimaryButton({
  title,
  loading = false,
  variant = "primary",
  size = "medium",
  icon,
  style,
  disabled,
  ...props
}: PrimaryButtonProps) {
  const getButtonStyle = () => {
    const baseStyle = {
      backgroundColor:
        variant === "primary"
          ? AppColors.primary
          : variant === "secondary"
          ? AppColors.secondary
          : "transparent",
      borderWidth: variant === "outline" ? 2 : 0,
      borderColor: variant === "outline" ? AppColors.primary : "transparent",
    };

    const sizeStyle = {
      paddingHorizontal: size === "small" ? 16 : size === "medium" ? 24 : 32,
      paddingVertical: size === "small" ? 10 : size === "medium" ? 14 : 18,
      minHeight: size === "small" ? 40 : size === "medium" ? 52 : 60,
    };

    return { ...baseStyle, ...sizeStyle };
  };

  const getTextStyle = () => {
    return {
      color:
        variant === "primary"
          ? "#FFFFFF"
          : variant === "secondary"
          ? "#FFFFFF"
          : AppColors.primary,
      fontSize: size === "small" ? 14 : size === "medium" ? 16 : 18,
      fontWeight: "600" as const,
    };
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        getButtonStyle(),
        disabled && styles.disabled,
        style,
      ]}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <ActivityIndicator
          color={
            variant === "primary" || variant === "secondary"
              ? "#FFFFFF"
              : AppColors.primary
          }
          size="small"
        />
      ) : (
        <>
          {icon && <>{icon}</>}
          <ThemedText style={[getTextStyle(), icon ? { marginLeft: 8 } : null]}>
            {title}
          </ThemedText>
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  disabled: {
    opacity: 0.6,
  },
});
