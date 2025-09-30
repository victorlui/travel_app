import { FontAwesome6 } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Banner: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Título principal */}
        <Text style={styles.title}>Planeje sua próxima</Text>
        <Text style={styles.subtitle}>viagem com IA</Text>

        {/* Descrição */}
        <Text style={styles.description}>
          Descubra destinos incríveis e crie itinerários personalizados
        </Text>

        {/* Informação do plano gratuito */}
        <View style={styles.planInfo}>
          <FontAwesome6 name="crown" size={24} color="#10B981" />
          <Text style={styles.planText}>
            <Text style={styles.planBold}>Plano Gratuito:</Text> você pode criar
            até <Text style={styles.planHighlight}>3 itinerários</Text> por mês
          </Text>
        </View>

        {/* Botão de ação */}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>+ Criar novo itinerário</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#EFF6FF",
    borderRadius: 16,
    padding: 24,
  },
  content: {
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#2d3748",
    textAlign: "center",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 24,
    fontWeight: "600",
    color: "#256AED",
    textAlign: "center",
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: "#718096",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 20,
  },
  planInfo: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 24,
    gap: 10,
  },
  crownIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  planText: {
    fontSize: 14,
    color: "#4a5568",
    flex: 1,
    textAlign: "center",
  },
  planBold: {
    fontWeight: "600",
  },
  planHighlight: {
    color: "#10B981",
    fontWeight: "600",
  },
  button: {
    backgroundColor: "#10B981",
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default Banner;
