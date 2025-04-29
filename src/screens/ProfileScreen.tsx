import React from 'react';
import { View, Text } from 'react-native';

export default function ProfileScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-background">
      <Text className="text-xl font-bold text-text">Profile</Text>
      <Text className="mt-2 text-text-secondary">Your style preferences and settings</Text>
    </View>
  );
} 