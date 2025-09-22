import React from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';
import { AppColors } from '@/constants/colors';

export interface TravelCardProps extends ViewProps {
  children: React.ReactNode;
}

export function TravelCard({ children, style, ...props }: TravelCardProps) {
  return (
    <View style={[styles.card, style]} {...props}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: AppColors.surface,
    borderRadius: 16,
    padding: 20,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
});