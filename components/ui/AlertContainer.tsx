import { AppColors } from "@/constants/colors";
import { Alert, useAlerts, useAlertStore } from "@/store/alertStore";
import { Feather } from "@expo/vector-icons";
import React, { useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

interface AlertItemProps {
  alert: Alert;
  onHide: (id: string) => void;
}

function AlertItem({ alert, onHide }: AlertItemProps) {
  const slideAnim = useRef(new Animated.Value(-width)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animação de entrada
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleHide = () => {
    // Animação de saída
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: width,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onHide(alert.id);
    });
  };

  const getAlertStyles = () => {
    switch (alert.type) {
      case "success":
        return {
          backgroundColor: AppColors.success,
          iconName: "check-circle" as const,
        };
      case "error":
        return {
          backgroundColor: AppColors.error,
          iconName: "alert-circle" as const,
        };
      case "warning":
        return {
          backgroundColor: AppColors.warning,
          iconName: "alert-triangle" as const,
        };
      case "info":
      default:
        return {
          backgroundColor: AppColors.primary,
          iconName: "info" as const,
        };
    }
  };

  const alertStyles = getAlertStyles();

  return (
    <Animated.View
      style={[
        styles.alertContainer,
        {
          backgroundColor: alertStyles.backgroundColor,
          transform: [{ translateX: slideAnim }],
          opacity: opacityAnim,
        },
      ]}
    >
      <View style={styles.alertContent}>
        <Feather
          name={alertStyles.iconName}
          size={20}
          color="white"
          style={styles.alertIcon}
        />
        <View style={styles.alertTextContainer}>
          <Text style={styles.alertTitle}>{alert.title}</Text>
          {alert.message && (
            <Text style={styles.alertMessage}>{alert.message}</Text>
          )}
        </View>
        <TouchableOpacity
          onPress={handleHide}
          style={styles.closeButton}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Feather name="x" size={18} color="white" />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}

export function AlertContainer() {
  const alerts = useAlerts();
  const { hideAlert } = useAlertStore();

  if (alerts.length === 0) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container} pointerEvents="box-none">
      <View style={styles.alertsList}>
        {alerts.map((alert) => (
          <AlertItem key={alert.id} alert={alert} onHide={hideAlert} />
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 50,
    left: 0,
    right: 0,
    zIndex: 9999,
    pointerEvents: "box-none",
  },
  alertsList: {
    paddingHorizontal: 16,
    paddingTop: 8,
    gap: 8,
  },
  alertContainer: {
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  alertContent: {
    flexDirection: "row",
    alignItems: "flex-start",
    padding: 16,
    gap: 12,
  },
  alertIcon: {
    marginTop: 2,
  },
  alertTextContainer: {
    flex: 1,
  },
  alertTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
    marginBottom: 2,
  },
  alertMessage: {
    fontSize: 14,
    color: "white",
    opacity: 0.9,
    lineHeight: 18,
  },
  closeButton: {
    padding: 4,
    marginTop: -2,
  },
});
