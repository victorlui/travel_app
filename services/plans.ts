import { Plan } from "@/types/plan";
import api from "./api";

export function usePlanService() {
  async function getPlans() {
    try {
      const response = await api.get<Plan[]>("/plans/plans");

      return response.data || [];
    } catch (error: any) {
      throw error;
    }
  }

  return { getPlans };
}
