import { GoogleGenerativeAI } from '@google/generative-ai';
import { ClothingItem, Outfit } from '../../types/wardrobe';
import { GOOGLE_GEMINI_API_KEY } from '@env';

const genAI = new GoogleGenerativeAI(GOOGLE_GEMINI_API_KEY);

interface OutfitSuggestionParams {
  items: ClothingItem[];
  occasion?: string;
  weather?: {
    temperature: number;
    conditions: string;
  };
  preferredStyle?: string;
}

interface OutfitSuggestion {
  items: ClothingItem[];
  description: string;
  reasoning: string;
}

export class GeminiService {
  private static model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  static async generateOutfitSuggestion({
    items,
    occasion,
    weather,
    preferredStyle,
  }: OutfitSuggestionParams): Promise<OutfitSuggestion> {
    try {
      const prompt = this.buildPrompt({
        items,
        occasion,
        weather,
        preferredStyle,
      });

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      // Parse the AI response
      const suggestion = this.parseAIResponse(text, items);
      
      return suggestion;
    } catch (error) {
      console.error('Error generating outfit suggestion:', error);
      throw new Error('Failed to generate outfit suggestion');
    }
  }

  private static buildPrompt({
    items,
    occasion,
    weather,
    preferredStyle,
  }: OutfitSuggestionParams): string {
    const itemsDescription = items.map(item => 
      `- ${item.name} (${item.category}): ${item.color}, suitable for ${item.season.join(', ')}, style: ${item.style.join(', ')}`
    ).join('\n');

    return `As a fashion AI assistant, create an outfit from the following wardrobe items:

Available Items:
${itemsDescription}

Additional Context:
${occasion ? `Occasion: ${occasion}` : ''}
${weather ? `Weather: ${weather.temperature}°C, ${weather.conditions}` : ''}
${preferredStyle ? `Preferred Style: ${preferredStyle}` : ''}

Please suggest an outfit that:
1. Matches well in terms of colors and style
2. Is appropriate for the occasion and weather (if specified)
3. Follows basic fashion principles

Respond in the following JSON format:
{
  "selectedItems": ["item1_id", "item2_id", ...],
  "description": "A brief description of the outfit",
  "reasoning": "Explanation of why these items work well together"
}`;
  }

  private static parseAIResponse(response: string, availableItems: ClothingItem[]): OutfitSuggestion {
    try {
      const parsed = JSON.parse(response);
      const selectedItems = availableItems.filter(item => 
        parsed.selectedItems.includes(item.id)
      );

      return {
        items: selectedItems,
        description: parsed.description,
        reasoning: parsed.reasoning,
      };
    } catch (error) {
      console.error('Error parsing AI response:', error);
      throw new Error('Failed to parse AI response');
    }
  }
} 