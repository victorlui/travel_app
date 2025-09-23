import { persist } from "zustand/middleware";
import { createStore } from "zustand/vanilla";

type ItineraryGenerationStoreState = {
  message: string;
  success: boolean;
  task_id: string;
  travel: {
    created_at: string;
    destination: string;
    end_date: string;
    id: number;
    max_budget: number;
    min_budget: number;
    start_date: string;
    status: "planned" | "in_progress" | "completed" | "cancelled";
    travelers: "solo" | "couple" | "family" | "group";
    updated_at: string;
  };
};

type ItineraryGenerationStoreActions = {
  data: ItineraryGenerationStoreState | null;
  setItineraryGeneration: (
    nextItineraryGeneration: ItineraryGenerationStoreState
  ) => void;
};

type ItineraryGenerationStore = ItineraryGenerationStoreActions;

export const useItineraryGenerationStore =
  createStore<ItineraryGenerationStore>()(
    persist(
      (set) => ({
        data: null,
        setItineraryGeneration: (nextItineraryGeneration) =>
          set({ data: nextItineraryGeneration }),
      }),
      { name: "itinerary-generation-storage" }
    )
  );
