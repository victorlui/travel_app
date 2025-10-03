/* eslint-disable react-hooks/exhaustive-deps */
import PlanItem from "@/components/plan/plan-item";
import PlanItemSkeleton from "@/components/plan/plan-item-skeleton";

import Header from "@/components/ui/Header";
import LayoutMain from "@/layouts/LayoutApp";
import { usePlanService } from "@/services/plans";
import { useAuthStore } from "@/store/authStore";
import { Plan } from "@/types/plan";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

const ChangePlanScreen: React.FC = () => {
  const { user, updateUser } = useAuthStore();
  const { getPlans } = usePlanService();

  const [isLoading, setIsLoading] = useState(false);
  const [planOptions, setPlanOptions] = useState<Plan[]>([]);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        setIsLoading(true);
        const plans = await getPlans();
        console.log("plans", plans);
        setPlanOptions(plans);
      } catch (error) {
        console.log("error", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPlans();
  }, []);

  const handlePlanSelection = (plan: Plan) => {
    console.log("plan", plan);
  };

  return (
    <LayoutMain edges={["bottom", "top"]}>
      <Header title="Alterar Plano" />

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerSection}>
          <Text style={styles.title}>Planos Disponíveis</Text>
          <Text style={styles.subtitle}>
            Escolha o plano que melhor se adapta às suas necessidades de viagem
          </Text>
        </View>

        <View>
          {isLoading ? (
            // Renderiza skeletons durante o carregamento
            <>
              <PlanItemSkeleton />
              <PlanItemSkeleton />
              <PlanItemSkeleton />
            </>
          ) : (
            // Renderiza os planos reais após o carregamento
            planOptions.map((plan) => (
              <PlanItem
                key={plan.id}
                plan={plan}
                isCurrentPlan={plan.name === user?.plan?.name}
                handlePlanSelection={handlePlanSelection}
              />
            ))
          )}
        </View>
      </ScrollView>
    </LayoutMain>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  headerSection: {
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1A1A1A",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#8E8E93",
    lineHeight: 22,
  },
});

export default ChangePlanScreen;
