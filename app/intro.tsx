import { AppColors } from "@/constants/colors";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width, height } = Dimensions.get("window");

const features = [
  {
    icon: "smart-toy",
    title: "IA Inteligente",
    description:
      "Nossa inteligência artificial cria itinerários personalizados baseados nas suas preferências",
    color: AppColors.primary,
  },
  {
    icon: "location-on",
    title: "Qualquer Destino",
    description:
      "Explore destinos ao redor do mundo com sugestões locais autênticas",
    color: AppColors.secondary,
  },
  {
    icon: "schedule",
    title: "Planejamento Rápido",
    description:
      "Crie sua viagem perfeita em minutos, não em horas de pesquisa",
    color: AppColors.success,
  },
];

const welcomeSlides = [
  {
    title: "Bem-vindo ao TravelAI",
    subtitle: "Seu assistente pessoal para viagens inesquecíveis",
    image: require("@/assets/images/beach.jpg"),
    showFeatures: false,
  },
  {
    title: "Viagens Inteligentes",
    subtitle:
      "Descubra como nossa IA pode transformar seu planejamento de viagem",
    image: require("@/assets/images/sunset.jpg"),
    showFeatures: true,
  },
];

export default function IntroScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const router = useRouter();

  const next = () => {
    if (currentIndex < welcomeSlides.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      scrollViewRef.current?.scrollTo({
        x: nextIndex * width,
        animated: true,
      });
    } else {
      router.push("/(auth)/login");
    }
  };

  const skip = () => {
    router.push("/(auth)/login");
  };

  const renderFeatureCard = (feature: (typeof features)[0], index: number) => (
    <View key={index} style={styles.featureCard}>
      <View style={[styles.featureIcon, { backgroundColor: feature.color }]}>
        <MaterialIcons name={feature.icon as any} size={24} color="white" />
      </View>
      <View style={styles.featureContent}>
        <Text style={styles.featureTitle}>{feature.title}</Text>
        <Text style={styles.featureDescription}>{feature.description}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      {/* Skip Button */}
      <TouchableOpacity style={styles.skipButton} onPress={skip}>
        <Text style={styles.skipText}>Pular</Text>
      </TouchableOpacity>

      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
        onScroll={(e) => {
          const index = Math.round(
            e.nativeEvent.contentOffset.x /
              e.nativeEvent.layoutMeasurement.width
          );
          setCurrentIndex(index);
        }}
        scrollEventThrottle={16}
      >
        {welcomeSlides.map((slide, index) => (
          <View key={index} style={styles.slide}>
            {/* Background Image */}
            <Image source={slide.image} style={styles.backgroundImage} />

            {/* Gradient Overlay */}
            <View style={styles.gradientOverlay} />

            {/* Content */}
            <View style={styles.contentContainer}>
              {/* Header */}
              <View style={styles.headerContent}>
                <Text style={styles.mainTitle}>{slide.title}</Text>
                <Text style={styles.mainSubtitle}>{slide.subtitle}</Text>
              </View>

              {/* Features Section */}
              {slide.showFeatures && (
                <View style={styles.featuresContainer}>
                  <Text style={styles.featuresTitle}>
                    O que você pode fazer:
                  </Text>
                  {features.map((feature, idx) =>
                    renderFeatureCard(feature, idx)
                  )}
                </View>
              )}

              {/* Welcome Message for first slide */}
              {!slide.showFeatures && (
                <View style={styles.welcomeContainer}>
                  <View style={styles.welcomeCard}>
                    <MaterialIcons
                      name="travel-explore"
                      size={48}
                      color={AppColors.primary}
                    />
                    <Text style={styles.welcomeCardTitle}>
                      Planeje. Explore. Descubra.
                    </Text>
                    <Text style={styles.welcomeCardText}>
                      Transforme suas ideias de viagem em itinerários detalhados
                      com o poder da inteligência artificial.
                    </Text>
                  </View>
                </View>
              )}
            </View>

            {/* Footer */}
            <View style={styles.footer}>
              {/* Page Indicators */}
              <View style={styles.pageIndicators}>
                {welcomeSlides.map((_, idx) => (
                  <View
                    key={idx}
                    style={[
                      styles.indicator,
                      {
                        backgroundColor:
                          currentIndex === idx
                            ? "white"
                            : "rgba(255,255,255,0.4)",
                        width: currentIndex === idx ? 24 : 8,
                      },
                    ]}
                  />
                ))}
              </View>

              {/* Action Button */}
              <TouchableOpacity style={styles.actionButton} onPress={next}>
                <Text style={styles.actionButtonText}>
                  {currentIndex === welcomeSlides.length - 1
                    ? "Começar Jornada"
                    : "Continuar"}
                </Text>
                <Feather
                  name={
                    currentIndex === welcomeSlides.length - 1
                      ? "arrow-right"
                      : "chevron-right"
                  }
                  size={20}
                  color="white"
                />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  scrollView: {
    flex: 1,
  },
  slide: {
    width,
    height,
    position: "relative",
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
    position: "absolute",
    resizeMode: "cover",
  },
  gradientOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  skipButton: {
    position: "absolute",
    top: 50,
    right: 20,
    zIndex: 10,
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  skipText: {
    color: "white",
    fontSize: 14,
    fontWeight: "500",
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 100,
    justifyContent: "space-between",
  },
  headerContent: {
    alignItems: "center",
    marginBottom: 40,
  },
  mainTitle: {
    fontSize: 36,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginBottom: 16,
    textShadowColor: "rgba(0,0,0,0.3)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  mainSubtitle: {
    fontSize: 18,
    color: "rgba(255,255,255,0.9)",
    textAlign: "center",
    lineHeight: 24,
    textShadowColor: "rgba(0,0,0,0.3)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  welcomeContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  welcomeCard: {
    backgroundColor: "rgba(255,255,255,0.95)",
    borderRadius: 24,
    padding: 32,
    alignItems: "center",
    marginHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  welcomeCardTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: AppColors.text,
    marginTop: 16,
    marginBottom: 12,
    textAlign: "center",
  },
  welcomeCardText: {
    fontSize: 16,
    color: AppColors.textSecondary,
    textAlign: "center",
    lineHeight: 22,
  },
  featuresContainer: {
    flex: 1,
    justifyContent: "center",
  },
  featuresTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
    marginBottom: 24,
    textAlign: "center",
  },
  featureCard: {
    flexDirection: "row",
    backgroundColor: "rgba(255,255,255,0.95)",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: AppColors.text,
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    color: AppColors.textSecondary,
    lineHeight: 20,
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 40,
    alignItems: "center",
  },
  pageIndicators: {
    flexDirection: "row",
    marginBottom: 32,
    alignItems: "center",
  },
  indicator: {
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
    // Note: React Native doesn't support CSS transitions
    // The animation is handled by the width property change
  },
  actionButton: {
    backgroundColor: AppColors.primary,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 50,
    shadowColor: AppColors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  actionButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    marginRight: 8,
  },
});
