import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useWardrobeStore } from '../../store/useWardrobeStore';
import { ClothingCategory, ClothingStyle, Season } from '../../types/wardrobe';

interface AddItemModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function AddItemModal({ visible, onClose }: AddItemModalProps) {
  const { addItem } = useWardrobeStore();
  const [name, setName] = useState('');
  const [category, setCategory] = useState<ClothingCategory>('tops');
  const [styles, setStyles] = useState<ClothingStyle[]>([]);
  const [color, setColor] = useState('');
  const [seasons, setSeasons] = useState<Season[]>([]);
  const [imageUri, setImageUri] = useState<string | null>(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleSubmit = () => {
    if (!name || !imageUri) return;

    addItem({
      name,
      category,
      style: styles,
      color,
      season: seasons,
      imageUrl: imageUri,
    });

    // Reset form
    setName('');
    setCategory('tops');
    setStyles([]);
    setColor('');
    setSeasons([]);
    setImageUri(null);
    onClose();
  };

  const toggleStyle = (style: ClothingStyle) => {
    if (styles.includes(style)) {
      setStyles(styles.filter((s) => s !== style));
    } else {
      setStyles([...styles, style]);
    }
  };

  const toggleSeason = (season: Season) => {
    if (seasons.includes(season)) {
      setSeasons(seasons.filter((s) => s !== season));
    } else {
      setSeasons([...seasons, season]);
    }
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View className="flex-1 bg-background">
        <View className="flex-row justify-between items-center p-4 border-b border-gray-200">
          <TouchableOpacity onPress={onClose}>
            <Text className="text-primary">Cancel</Text>
          </TouchableOpacity>
          <Text className="text-lg font-bold">Add Item</Text>
          <TouchableOpacity onPress={handleSubmit}>
            <Text className="text-primary font-medium">Save</Text>
          </TouchableOpacity>
        </View>

        <ScrollView className="flex-1 p-4">
          <TouchableOpacity
            onPress={pickImage}
            className="h-40 bg-card rounded-lg items-center justify-center mb-4"
          >
            {imageUri ? (
              <Image
                source={{ uri: imageUri }}
                className="w-full h-full rounded-lg"
                resizeMode="cover"
              />
            ) : (
              <Text className="text-text-secondary">Tap to add photo</Text>
            )}
          </TouchableOpacity>

          <Text className="text-text font-medium mb-2">Name</Text>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Item name"
            className="bg-card p-3 rounded-lg mb-4"
          />

          <Text className="text-text font-medium mb-2">Category</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="mb-4"
          >
            {['tops', 'bottoms', 'dresses', 'outerwear', 'shoes', 'accessories'].map(
              (cat) => (
                <TouchableOpacity
                  key={cat}
                  onPress={() => setCategory(cat as ClothingCategory)}
                  className={`px-4 py-2 rounded-full mr-2 ${
                    category === cat ? 'bg-primary' : 'bg-card'
                  }`}
                >
                  <Text
                    className={category === cat ? 'text-white' : 'text-text'}
                  >
                    {cat}
                  </Text>
                </TouchableOpacity>
              )
            )}
          </ScrollView>

          <Text className="text-text font-medium mb-2">Style</Text>
          <View className="flex-row flex-wrap mb-4">
            {['casual', 'formal', 'business', 'sporty', 'party'].map((style) => (
              <TouchableOpacity
                key={style}
                onPress={() => toggleStyle(style as ClothingStyle)}
                className={`px-4 py-2 rounded-full mr-2 mb-2 ${
                  styles.includes(style as ClothingStyle)
                    ? 'bg-primary'
                    : 'bg-card'
                }`}
              >
                <Text
                  className={
                    styles.includes(style as ClothingStyle)
                      ? 'text-white'
                      : 'text-text'
                  }
                >
                  {style}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text className="text-text font-medium mb-2">Color</Text>
          <TextInput
            value={color}
            onChangeText={setColor}
            placeholder="Color"
            className="bg-card p-3 rounded-lg mb-4"
          />

          <Text className="text-text font-medium mb-2">Season</Text>
          <View className="flex-row flex-wrap">
            {['spring', 'summer', 'fall', 'winter', 'all'].map((season) => (
              <TouchableOpacity
                key={season}
                onPress={() => toggleSeason(season as Season)}
                className={`px-4 py-2 rounded-full mr-2 mb-2 ${
                  seasons.includes(season as Season)
                    ? 'bg-primary'
                    : 'bg-card'
                }`}
              >
                <Text
                  className={
                    seasons.includes(season as Season)
                      ? 'text-white'
                      : 'text-text'
                  }
                >
                  {season}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
} 