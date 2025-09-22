import { ThemedText } from "@/components/themed-text";
import { AppColors } from "@/constants/colors";
import React from "react";
import { StyleSheet, View } from "react-native";
import GooglePlacesTextInput from "react-native-google-places-textinput";

export interface PlacesAutocompleteInputProps {
  label: string;
  placeholder?: string;
  value: string;
  onPlaceSelected: (place: any) => void;
  error?: string;
  required?: boolean;
}

export function PlacesAutocompleteInput({
  label,
  placeholder = "Para onde você quer viajar?",
  value,
  onPlaceSelected,
  error,
  required = false,
}: PlacesAutocompleteInputProps) {
  return (
    <View style={styles.container}>
      <ThemedText style={styles.label}>
        {label}
        {required && <ThemedText style={styles.required}> *</ThemedText>}
      </ThemedText>
      <GooglePlacesTextInput
        apiKey="AIzaSyDhglC8UcIN-HqX_FqpbcHhdewVVzF_D8g"
        placeHolderText={placeholder}
        onPlaceSelect={(place) => {
          onPlaceSelected(place);
        }}
        onError={(error) => {
          console.log(error);
        }}
        value={value}
        languageCode="pt-BR"
        fetchDetails={true}
        detailsFields={["formattedAddress", "location", "viewport", "photos"]}
        style={{
          container: {
            width: "100%",
            marginHorizontal: 0,
          },
          placeholder: {
            color: AppColors.textSecondary,
          },
          input: {
            borderWidth: 1,
            borderColor: error ? AppColors.error : AppColors.border,
            borderRadius: 12,
            paddingHorizontal: 16,
            paddingVertical: 14,
            fontSize: 16,
            backgroundColor: AppColors.surface,
            color: AppColors.text,
            minHeight: 48,
          },
          suggestionsContainer: {
            position: "absolute",
            width: "100%",
            top: 50,
            zIndex: 1000,
            backgroundColor: AppColors.surface,
            borderRadius: 12,
            borderWidth: 1,
            borderColor: AppColors.border,
          },
        }}
        minCharsToFetch={2}
        debounceDelay={300}
      />
      {error && <ThemedText style={styles.error}>{error}</ThemedText>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
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
  error: {
    fontSize: 14,
    color: AppColors.error,
    marginTop: 4,
  },
});
