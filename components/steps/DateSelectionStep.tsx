import { ThemedText } from "@/components/themed-text";
import { AppColors } from "@/constants/colors";
import React, { useMemo } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";

interface DateSelectionStepProps {
  startDate?: Date | null;
  endDate?: Date | null;
  onStartDateChange: (date: Date | null) => void;
  onEndDateChange: (date: Date | null) => void;
}

LocaleConfig.locales["pt-br"] = {
  monthNames: [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ],
  monthNamesShort: [
    "Jan",
    "Fev",
    "Mar",
    "Abr",
    "Mai",
    "Jun",
    "Jul",
    "Ago",
    "Set",
    "Out",
    "Nov",
    "Dez",
  ],
  dayNames: [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
  ],
  dayNamesShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
  today: "Hoje",
};

LocaleConfig.defaultLocale = "pt-br";

export function DateSelectionStep({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
}: DateSelectionStepProps) {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  // Função para lidar com a seleção de datas
  const handleDayPress = (day: any) => {
    // Criar a data de forma mais precisa para evitar problemas de timezone
    const [year, month, dayNum] = day.dateString.split('-').map(Number);
    const selectedDate = new Date(year, month - 1, dayNum);

    if (!startDate || (startDate && endDate)) {
      // Se não há data de início ou já temos ambas as datas, começar nova seleção
      onStartDateChange(selectedDate);
      onEndDateChange(null);
    } else if (startDate && !endDate) {
      // Se temos data de início mas não de fim
      if (selectedDate < startDate) {
        // Se a data selecionada é anterior à data de início, trocar as datas
        onStartDateChange(selectedDate);
        onEndDateChange(startDate);
      } else {
        // Se a data selecionada é posterior, definir como data de fim
        onEndDateChange(selectedDate);
      }
    }
  };

  // Gerar as datas marcadas para o range
  const markedDates = useMemo(() => {
    const marked: any = {};

    if (startDate && !endDate) {
      // Apenas data de início selecionada
      const startDateString = startDate.toISOString().split("T")[0];
      marked[startDateString] = {
        selected: true,
        selectedColor: AppColors.primary,
        startingDay: true,
        endingDay: true,
        color: AppColors.primary,
      };
    } else if (startDate && endDate) {
      // Range completo selecionado
      const startDateString = startDate.toISOString().split("T")[0];
      const endDateString = endDate.toISOString().split("T")[0];

      // Marcar data de início
      marked[startDateString] = {
        selected: true,
        selectedColor: AppColors.primary,
        startingDay: true,
        color: AppColors.primary,
      };

      // Marcar data de fim
      marked[endDateString] = {
        selected: true,
        selectedColor: AppColors.primary,
        endingDay: true,
        color: AppColors.primary,
      };

      // Marcar dias intermediários
      const currentDate = new Date(startDate);
      currentDate.setDate(currentDate.getDate() + 1);

      while (currentDate < endDate) {
        const dateString = currentDate.toISOString().split("T")[0];
        marked[dateString] = {
          selected: true,
          selectedColor: AppColors.primary + "30",
          color: AppColors.primary + "30",
        };
        currentDate.setDate(currentDate.getDate() + 1);
      }
    }

    return marked;
  }, [startDate, endDate]);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <ThemedText style={styles.title}>
          Quando sua aventura vai começar e terminar? ✈️
        </ThemedText>
        <ThemedText style={styles.subtitle}>
          Escolha suas datas de viagem para nos ajudar a planejar o roteiro
          perfeito
        </ThemedText>
        {!startDate && (
          <ThemedText style={styles.instructionText}>
            Toque em uma data para selecionar o início da viagem
          </ThemedText>
        )}
        {startDate && !endDate && (
          <ThemedText style={styles.instructionText}>
            Agora selecione a data de retorno
          </ThemedText>
        )}
      </View>

      <View style={styles.dateContainer}>
        <Calendar
          initialDate={new Date().toISOString()}
          onDayPress={handleDayPress}
          minDate={tomorrow.toISOString()}
          markedDates={markedDates}
          markingType={"period"}
          theme={{
            todayTextColor: "#FF5A3C",
            arrowColor: AppColors.primary,
            textDayFontWeight: "500",
            textMonthFontWeight: "bold",
            textDayFontSize: 16,
            selectedDayBackgroundColor: AppColors.primary,
            selectedDayTextColor: "#FFFFFF",
          }}
        />
      </View>

      {startDate && endDate && (
        <View style={styles.durationContainer}>
          <ThemedText style={styles.durationText}>
            Duração da viagem:{" "}
            {Math.ceil(
              (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
            ) + 1}{" "}
            dias
          </ThemedText>
          <ThemedText style={styles.dateRangeText}>
            {startDate.toLocaleDateString("pt-BR")} -{" "}
            {endDate.toLocaleDateString("pt-BR")}
          </ThemedText>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    marginBottom: 32,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: AppColors.text,
    marginBottom: 8,
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 16,
    color: AppColors.textSecondary,
    lineHeight: 22,
  },
  instructionText: {
    fontSize: 14,
    color: AppColors.primary,
    marginTop: 12,
    fontWeight: "500",
  },
  dateContainer: {
    gap: 20,
  },
  durationContainer: {
    marginTop: 24,
    padding: 16,
    backgroundColor: AppColors.primary + "10",
    borderRadius: 12,
    alignItems: "center",
  },
  durationText: {
    fontSize: 16,
    fontWeight: "600",
    color: AppColors.primary,
  },
  dateRangeText: {
    fontSize: 14,
    color: AppColors.textSecondary,
    marginTop: 4,
  },
});
