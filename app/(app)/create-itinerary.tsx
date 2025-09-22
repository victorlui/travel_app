import { PrimaryButton } from "@/components/form/PrimaryButton";
import { BudgetStep } from "@/components/steps/BudgetStep";
import { DateSelectionStep } from "@/components/steps/DateSelectionStep";
import { DestinationStep } from "@/components/steps/DestinationStep";
import { ReviewSummaryStep } from "@/components/steps/ReviewSummaryStep";
import { WhoIsGoingStep } from "@/components/steps/WhoIsGoingStep";
import { StepIndicator } from "@/components/ui/StepIndicator";
import { AppColors } from "@/constants/colors";
import { useStepNavigation } from "@/hooks/useStepNavigation";
import { generateItinerary } from "@/services/itineraryService";
import { useRouter } from "expo-router";
import React from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CreateItinerary() {
  const {
    currentStep,
    stepData,
    nextStep,
    previousStep,
    updateStepData,
    canGoNext,
    canGoPrevious,
    isLastStep,
    totalSteps,
    goToStep,
  } = useStepNavigation(5);

  const router = useRouter();

  const handleNext = async () => {
    if (isLastStep) {
      try {
        const res = await generateItinerary(stepData);
        console.log("res", res);
        router.replace("/(app)/itinerary_generation");
      } catch (error) {
        console.log("error", error);
      }
    } else {
      // Check if all data is already filled before moving to next step
      const isAllDataFilled =
        stepData.travelers &&
        stepData.startDate &&
        stepData.endDate &&
        stepData.destination &&
        stepData.budget;

      // If all data is filled, go directly to review step
      if (isAllDataFilled && currentStep < totalSteps - 1) {
        goToStep(totalSteps);
      } else {
        nextStep();
      }
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <WhoIsGoingStep
            value={stepData.travelers}
            onValueChange={(value) => updateStepData({ travelers: value })}
          />
        );
      case 2:
        return (
          <DateSelectionStep
            startDate={stepData.startDate}
            endDate={stepData.endDate}
            onStartDateChange={(date) => updateStepData({ startDate: date })}
            onEndDateChange={(date) => updateStepData({ endDate: date })}
          />
        );
      case 3:
        return (
          <DestinationStep
            destination={stepData.destination}
            onDestinationChange={(destination) => {
              console.log("destino", destination);
              updateStepData({ destination: destination.text.text });
            }}
          />
        );
      case 4:
        return (
          <BudgetStep
            budget={stepData.budget}
            onBudgetChange={(budget) => updateStepData({ budget })}
          />
        );
      case 5:
        return <ReviewSummaryStep stepData={stepData} goToStep={goToStep} />;
      default:
        return null;
    }
  };

  return (
    <SafeAreaView
      edges={["bottom", "top"]}
      style={{ flex: 1, backgroundColor: "#fff" }}
    >
      <StatusBar barStyle="dark-content" backgroundColor="#f2f2f2" />
      <StepIndicator currentStep={currentStep} totalSteps={totalSteps} />

      <View style={styles.stepContent}>{renderCurrentStep()}</View>

      <View style={styles.navigationContainer}>
        {canGoPrevious && (
          <PrimaryButton
            title="Voltar"
            variant="outline"
            onPress={previousStep}
            style={styles.previousButton}
          />
        )}

        <PrimaryButton
          title={isLastStep ? "Gerar Itinerário" : "Próximo"}
          onPress={handleNext}
          disabled={!canGoNext}
          style={styles.nextButton}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  stepContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
  navigationContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 12,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: AppColors.border,
  },
  previousButton: {
    flex: 1,
  },
  nextButton: {
    flex: 2,
  },
});