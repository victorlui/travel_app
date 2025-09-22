import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { AppColors } from "@/constants/colors";
import { useThemeColor } from "@/hooks/use-theme-color";
import React, { useState } from "react";
import { Platform, StyleSheet, TouchableOpacity } from "react-native";

export interface DatePickerInputProps {
  label: string;
  value: Date | null;
  onDateChange: (date: Date | null) => void;
  error?: string;
  required?: boolean;
  minimumDate?: Date;
  maximumDate?: Date;
}

export function DatePickerInput({
  label,
  value,
  onDateChange,
  error,
  required = false,
  minimumDate,
  maximumDate,
}: DatePickerInputProps) {
  const [showPicker, setShowPicker] = useState(false);
  const borderColor = useThemeColor({}, "text");
  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor(
    { light: AppColors.text, dark: AppColors.text },
    "text"
  );
  const errorColor = "#FF6B6B";
  const placeholderColor = `${textColor}80`;

  const formatDate = (date: Date | null) => {
    if (!date) return "Selecionar data";
    return date.toLocaleDateString("pt-BR");
  };

  const handlePress = () => {
    if (Platform.OS === "web") {
      // Para web, você pode usar um date picker HTML5 ou uma biblioteca
      const input = document.createElement("input");
      input.type = "date";
      input.onchange = (e) => {
        const selectedDate = new Date((e.target as HTMLInputElement).value);
        onDateChange(selectedDate);
      };
      input.click();
    } else {
      setShowPicker(true);
    }
  };

  return (
    <ThemedView lightColor="#222222" darkColor="#FFF" style={styles.container}>
      <ThemedText style={styles.label}>
        {label}
        {required && (
          <ThemedText style={[styles.required, { color: errorColor }]}>
            {" "}
            *
          </ThemedText>
        )}
      </ThemedText>
      <TouchableOpacity
        style={[
          styles.input,
          {
            borderColor: error ? errorColor : borderColor,
            backgroundColor: "#FFFFFF",
          },
        ]}
        onPress={handlePress}
      >
        <ThemedText
          style={[
            styles.inputText,
            {
              color: value ? textColor : placeholderColor,
            },
          ]}
        >
          {formatDate(value)}
        </ThemedText>
      </TouchableOpacity>
      {error && (
        <ThemedText style={[styles.error, { color: errorColor }]}>
          {error}
        </ThemedText>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    color: AppColors.text,
  },
  required: {
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    minHeight: 48,
    justifyContent: "center",
  },
  inputText: {
    fontSize: 16,
  },
  error: {
    fontSize: 14,
    marginTop: 4,
  },
});
