import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useWardrobeStore } from '../store/useWardrobeStore';
import { ClothingItem } from '../types/wardrobe';
import AddItemModal from '../components/wardrobe/AddItemModal';

export default function WardrobeScreen() {
  const { items } = useWardrobeStore();
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);

  const renderItem = (item: ClothingItem) => (
    <TouchableOpacity
      key={item.id}
      className="bg-card m-2 rounded-lg shadow-sm overflow-hidden"
    >
      <Image
        source={{ uri: item.imageUrl }}
        className="w-32 h-32"
        resizeMode="cover"
      />
      <View className="p-2">
        <Text className="font-medium text-text">{item.name}</Text>
        <Text className="text-sm text-text-secondary">{item.category}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-background">
      <View className="flex-row justify-between items-center p-4">
        <Text className="text-xl font-bold text-text">My Wardrobe</Text>
        <TouchableOpacity
          className="bg-primary px-4 py-2 rounded-full"
          onPress={() => setIsAddModalVisible(true)}
        >
          <Text className="text-white font-medium">Add Item</Text>
        </TouchableOpacity>
      </View>

      {items.length === 0 ? (
        <View className="flex-1 items-center justify-center">
          <Text className="text-text-secondary text-lg">
            Your wardrobe is empty
          </Text>
          <Text className="text-text-secondary mt-2">
            Add some items to get started
          </Text>
        </View>
      ) : (
        <ScrollView
          className="flex-1"
          contentContainerStyle={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-evenly',
          }}
        >
          {items.map(renderItem)}
        </ScrollView>
      )}

      <AddItemModal
        visible={isAddModalVisible}
        onClose={() => setIsAddModalVisible(false)}
      />
    </View>
  );
} 