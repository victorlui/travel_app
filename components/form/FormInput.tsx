import { ThemedText } from "@/components/themed-text";
import { AppColors } from "@/constants/colors";
import React from "react";
import { StyleSheet, TextInput, TextInputProps, View } from "react-native";

export interface FormInputProps extends TextInputProps {
  label: string;
  error?: string;
  required?: boolean;
  icon?: React.ReactNode;
}

export function FormInput({
  label,
  error,
  required = false,
  icon,
  style,
  ...props
}: FormInputProps) {
  return (
    <View style={styles.container}>
      <ThemedText style={styles.label}>
        {label}
        {required && <ThemedText style={styles.required}> *</ThemedText>}
      </ThemedText>
      <View style={styles.inputContainer}>
        {icon && <View style={styles.iconContainer}>{icon}</View>}
        <TextInput
          style={[
            styles.input,
            icon ? styles.inputWithIcon : null,
            error && styles.inputError,
            style,
          ]}
          placeholderTextColor={AppColors.textSecondary}
          {...props}
        />
      </View>
      {error && <ThemedText style={styles.error}>{error}</ThemedText>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: AppColors.text,
    marginBottom: 8,
  },
  required: {
    color: AppColors.error,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: AppColors.border,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    backgroundColor: AppColors.surface,
    color: AppColors.text,
  },
  inputWithIcon: {
    paddingLeft: 48,
  },
  inputError: {
    borderColor: AppColors.error,
  },
  iconContainer: {
    position: "absolute",
    left: 16,
    zIndex: 1,
  },
  error: {
    fontSize: 14,
    color: AppColors.error,
    marginTop: 4,
  },
});
