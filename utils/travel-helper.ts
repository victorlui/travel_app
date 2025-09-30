export const formatDateRange = (startDate: string, endDate: string) => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const startDay = start.getDate();
  const endDay = end.getDate();
  const month = start.toLocaleDateString("pt-BR", { month: "short" });
  const year = start.getFullYear();

  return `${startDay}-${endDay} ${month} ${year}`;
};

export const getTravelStatusText = (
  status: "planned" | "in_progress" | "completed"
) => {
  if (status === "planned") return "Planejado";
  if (status === "in_progress") return "Em andamento";
  if (status === "completed") return "Concluído";
  return "Planejado";
};

export const getStatusTextColor = (
  status: "planned" | "in_progress" | "completed"
) => {
  if (status === "planned") return "#1976d2"; // Azul mais escuro
  if (status === "in_progress") return "#f57c00"; // Laranja mais escuro
  if (status === "completed") return "#388e3c"; // Verde mais escuro
  return "#1976d2";
};
