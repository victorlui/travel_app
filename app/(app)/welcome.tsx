import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
const { width } = Dimensions.get("window");
const intros = [
  {
    title: "Planeje sua viagem perfeita",
    subtitle: "Crie itinerários personalizados para qualquer destino do mundo",
    image: require("@/assets/images/rain.jpg"),
  },
  {
    title: "Roteiros inteligentes",
    subtitle:
      "Nossa IA gera sugestões baseadas em suas preferências e orçamento",
    image: require("@/assets/images/sunset.jpg"),
  },
  {
    title: "Explore com confiança",
    subtitle:
      "Tenha todos os detalhes da sua viagem organizados em um só lugar",
    image: require("@/assets/images/passport.jpg"),
  },
];

export default function IntroScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const router = useRouter();

  const next = () => {
    if (currentIndex < intros.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      // Adicionar scroll automático para o próximo slide
      scrollViewRef.current?.scrollTo({
        x: nextIndex * width,
        animated: true,
      });
    } else {
      router.push("/(app)/create-itinerary");
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={{ flexGrow: 1, backgroundColor: "red" }}
        onScroll={(e) => {
          const index = Math.round(
            e.nativeEvent.contentOffset.x /
              e.nativeEvent.layoutMeasurement.width
          );
          setCurrentIndex(index);
        }}
      >
        {intros.map((item, index) => (
          <View key={index} style={[styles.slide]}>
            <Image
              source={item.image}
              style={{ objectFit: "fill", width: "100%", height: "100%" }}
            />

            <View style={styles.containerInfo}>
              <View>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.subtitle}>{item.subtitle}</Text>
              </View>

              <View style={styles.footerContainerInfo}>
                <View style={styles.footerContainerInfoDots}>
                  {intros.map((_, index) => (
                    <View
                      key={index}
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: 5,
                        backgroundColor:
                          currentIndex === index ? "black" : "gray",
                        marginHorizontal: 5,
                      }}
                    />
                  ))}
                </View>
                <TouchableOpacity style={styles.button} onPress={next}>
                  <Text style={{ color: "white" }}>
                    {currentIndex === intros.length - 1 ? (
                      "Começar"
                    ) : (
                      <Feather name="chevron-right" size={24} color="white" />
                    )}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  containerInfo: {
    position: "absolute",
    padding: 20,
    borderRadius: 20,
    borderCurve: "continuous",
    backgroundColor: "rgba(255, 255, 255, 0.589)", // dá translucidez junto com blur
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
    marginHorizontal: 10,
    height: 300,
    justifyContent: "space-between",
  },
  slide: {
    width,
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 18,
    color: "#333",
    marginBottom: 15,
  },
  footerContainerInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 40,
  },
  footerContainerInfoDots: {
    flexDirection: "row",
  },
  button: {
    alignSelf: "flex-end",
    backgroundColor: "#466354",
    borderRadius: 50,
    padding: 10,
  },
});
