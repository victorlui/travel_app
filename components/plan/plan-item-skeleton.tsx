import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

const PlanItemSkeleton: React.FC = () => {
  const shimmerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const shimmerAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(shimmerAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );

    shimmerAnimation.start();

    return () => shimmerAnimation.stop();
  }, [shimmerAnim]);

  const shimmerOpacity = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.7],
  });

  const SkeletonBox = ({ width, height, style }: { width: number | string; height: number; style?: any }) => (
    <Animated.View
      style={[
        styles.skeletonBox,
        { width, height, opacity: shimmerOpacity },
        style,
      ]}
    />
  );

  return (
    <View style={styles.container}>
      {/* Header com Badge e Preço */}
      <View style={styles.header}>
        <View style={styles.badgeContainer}>
          <SkeletonBox width={80} height={24} style={styles.badge} />
        </View>
        <View style={styles.priceContainer}>
          <SkeletonBox width={100} height={28} style={{ marginBottom: 4 }} />
          <SkeletonBox width={40} height={16} />
        </View>
      </View>

      {/* Título */}
      <SkeletonBox width="60%" height={20} style={{ marginBottom: 16 }} />

      {/* Benefícios */}
      <View style={styles.benefitsContainer}>
        {[1, 2, 3, 4].map((item) => (
          <View key={item} style={styles.benefitItem}>
            <SkeletonBox width={16} height={16} style={{ marginRight: 12, marginTop: 1 }} />
            <SkeletonBox width={`${Math.random() * 40 + 60}%`} height={16} />
          </View>
        ))}
      </View>

      {/* Botão */}
      <SkeletonBox width="100%" height={48} style={styles.button} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 16,
    marginBottom: 16,
    backgroundColor: "#fff",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  badgeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  badge: {
    borderRadius: 20,
  },
  priceContainer: {
    alignItems: "flex-end",
  },
  benefitsContainer: {
    marginBottom: 20,
  },
  benefitItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 8,
    paddingRight: 8,
  },
  button: {
    borderRadius: 12,
  },
  skeletonBox: {
    backgroundColor: "#E1E5E9",
    borderRadius: 4,
  },
});

export default PlanItemSkeleton;