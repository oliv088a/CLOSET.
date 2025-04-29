import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from 'react-native';
import { useWardrobeStore } from '../store/useWardrobeStore';
import { GeminiService } from '../services/ai/geminiService';
import { ClothingItem, ClothingStyle } from '../types/wardrobe';

interface OutfitSuggestion {
  items: ClothingItem[];
  description: string;
  reasoning: string;
}

export default function OutfitScreen() {
  const { items } = useWardrobeStore();
  const [loading, setLoading] = useState(false);
  const [suggestion, setSuggestion] = useState<OutfitSuggestion | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<ClothingStyle | null>(null);

  const generateOutfit = async () => {
    if (items.length === 0) return;

    setLoading(true);
    try {
      const result = await GeminiService.generateOutfitSuggestion({
        items,
        preferredStyle: selectedStyle || undefined,
      });
      setSuggestion(result);
    } catch (error) {
      console.error('Error generating outfit:', error);
      // You might want to show an error message to the user here
    } finally {
      setLoading(false);
    }
  };

  const styles: ClothingStyle[] = ['casual', 'formal', 'business', 'sporty', 'party'];

  return (
    <View className="flex-1 bg-background">
      <View className="p-4">
        <Text className="text-xl font-bold text-text mb-4">AI Outfit Generator</Text>
        
        <Text className="text-text font-medium mb-2">Select Style</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mb-4"
        >
          {styles.map((style) => (
            <TouchableOpacity
              key={style}
              onPress={() => setSelectedStyle(style)}
              className={`px-4 py-2 rounded-full mr-2 ${
                selectedStyle === style ? 'bg-primary' : 'bg-card'
              }`}
            >
              <Text
                className={selectedStyle === style ? 'text-white' : 'text-text'}
              >
                {style}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <TouchableOpacity
          onPress={generateOutfit}
          disabled={loading || items.length === 0}
          className={`py-3 rounded-lg ${
            items.length === 0 ? 'bg-gray-300' : 'bg-primary'
          }`}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-white text-center font-medium">
              {items.length === 0
                ? 'Add items to your wardrobe first'
                : 'Generate Outfit'}
            </Text>
          )}
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 p-4">
        {suggestion && (
          <View className="bg-card rounded-lg p-4">
            <Text className="text-lg font-bold text-text mb-2">
              Suggested Outfit
            </Text>
            
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="mb-4"
            >
              {suggestion.items.map((item) => (
                <View
                  key={item.id}
                  className="mr-4 bg-background rounded-lg overflow-hidden"
                >
                  <Image
                    source={{ uri: item.imageUrl }}
                    className="w-24 h-24"
                    resizeMode="cover"
                  />
                  <View className="p-2">
                    <Text className="text-sm font-medium text-text">
                      {item.name}
                    </Text>
                  </View>
                </View>
              ))}
            </ScrollView>

            <Text className="text-text font-medium mb-1">Description</Text>
            <Text className="text-text-secondary mb-3">
              {suggestion.description}
            </Text>

            <Text className="text-text font-medium mb-1">Reasoning</Text>
            <Text className="text-text-secondary">{suggestion.reasoning}</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
} 