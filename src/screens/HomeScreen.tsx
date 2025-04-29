import React from 'react';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, Surface, useTheme, TouchableRipple, Card } from 'react-native-paper';

export const HomeScreen = () => {
  const theme = useTheme();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ScrollView style={{ flex: 1 }}>
        <Surface style={{ padding: 16 }}>
          <Text variant="headlineMedium" style={{ color: theme.colors.text }}>
            Welcome to Closet
          </Text>
          <Text variant="bodyLarge" style={{ marginTop: 8, color: theme.colors.textSecondary }}>
            Discover your perfect outfit
          </Text>
          
          <Surface style={{ marginTop: 24 }}>
            <Text variant="titleMedium" style={{ marginBottom: 16, color: theme.colors.text }}>
              Today's Suggestions
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <Card style={{ width: 160, marginRight: 16 }}>
                <Card.Cover source={{ uri: 'https://picsum.photos/160' }} />
                <Card.Content>
                  <Text variant="bodyMedium">Outfit 1</Text>
                </Card.Content>
              </Card>
              <Card style={{ width: 160 }}>
                <Card.Cover source={{ uri: 'https://picsum.photos/161' }} />
                <Card.Content>
                  <Text variant="bodyMedium">Outfit 2</Text>
                </Card.Content>
              </Card>
            </ScrollView>
          </Surface>

          <Surface style={{ marginTop: 32 }}>
            <Text variant="titleMedium" style={{ marginBottom: 16, color: theme.colors.text }}>
              Recent Outfits
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <Card style={{ width: 160, marginRight: 16 }}>
                <Card.Cover source={{ uri: 'https://picsum.photos/162' }} />
                <Card.Content>
                  <Text variant="bodyMedium">Recent 1</Text>
                </Card.Content>
              </Card>
              <Card style={{ width: 160 }}>
                <Card.Cover source={{ uri: 'https://picsum.photos/163' }} />
                <Card.Content>
                  <Text variant="bodyMedium">Recent 2</Text>
                </Card.Content>
              </Card>
            </ScrollView>
          </Surface>
        </Surface>
      </ScrollView>
    </SafeAreaView>
  );
}; 