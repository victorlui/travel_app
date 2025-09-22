import { Ionicons } from "@expo/vector-icons";

export interface BudgetRange {
  id: string;
  label: string;
  range: string;
  min: number;
  max: number;
  icon: keyof typeof Ionicons.glyphMap;
}

export const budgetRanges: BudgetRange[] = [
  {
    id: "budget",
    label: "Econômico",
    range: "R$ 1.000 - R$ 3.000",
    min: 1000,
    max: 3000,
    icon: "wallet" as const,
  },
  {
    id: "mid",
    label: "Intermediário",
    range: "R$ 3.000 - R$ 8.000",
    min: 3000,
    max: 8000,
    icon: "card" as const,
  },
  {
    id: "luxury",
    label: "Luxo",
    range: "R$ 8.000+",
    min: 8000,
    max: 20000,
    icon: "diamond" as const,
  },
];
