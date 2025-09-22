import { StepData } from "@/hooks/useStepNavigation";
import api from "./api";

export interface ItineraryData {
  id: number;
  destination: string;
  travelers: string;
  startDate: Date | null;
  endDate: Date | null;
  budget: any;
  activities: Activity[];
}

export interface Activity {
  day: number;
  title: string;
  description: string;
  time: string;
}

export const generateItinerary = async (stepData: StepData): Promise<any> => {
  try {
    console.log("stepData", stepData);
    const data = {
      destination: stepData.destination,
      start_date: stepData.startDate?.toISOString(),
      end_date: stepData.endDate?.toISOString(),
      min_budget: stepData.budget?.min || 0,
      max_budget: stepData.budget?.max || 0,
      status: "planned",
      travelers: stepData.travelers,
    };
    const res = await api.post("/travels", data);
    const itinerary = res.data;
    return itinerary;
  } catch (error: any) {
    console.log("error", error.response);
    throw new Error("Erro ao gerar itinerário. Tente novamente.");
  }
};
