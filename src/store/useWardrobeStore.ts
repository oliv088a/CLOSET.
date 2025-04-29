import { create } from 'zustand';
import { StateCreator } from 'zustand';
import { ClothingItem, Outfit } from '../types/wardrobe';

interface WardrobeState {
  items: ClothingItem[];
  outfits: Outfit[];
  loading: boolean;
  error: string | null;
  
  // Actions
  addItem: (item: Omit<ClothingItem, 'id' | 'createdAt' | 'updatedAt'>) => void;
  removeItem: (id: string) => void;
  updateItem: (id: string, updates: Partial<ClothingItem>) => void;
  addOutfit: (outfit: Omit<Outfit, 'id' | 'createdAt' | 'updatedAt'>) => void;
  removeOutfit: (id: string) => void;
  updateOutfit: (id: string, updates: Partial<Outfit>) => void;
  toggleOutfitFavorite: (id: string) => void;
}

const createWardrobeStore: StateCreator<WardrobeState> = (set) => ({
  items: [],
  outfits: [],
  loading: false,
  error: null,

  addItem: (newItem: Omit<ClothingItem, 'id' | 'createdAt' | 'updatedAt'>) => {
    const item: ClothingItem = {
      ...newItem,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    set((state: WardrobeState) => ({
      items: [...state.items, item],
    }));
  },

  removeItem: (id: string) => {
    set((state: WardrobeState) => ({
      items: state.items.filter((item) => item.id !== id),
    }));
  },

  updateItem: (id: string, updates: Partial<ClothingItem>) => {
    set((state: WardrobeState) => ({
      items: state.items.map((item) =>
        item.id === id
          ? { ...item, ...updates, updatedAt: new Date() }
          : item
      ),
    }));
  },

  addOutfit: (newOutfit: Omit<Outfit, 'id' | 'createdAt' | 'updatedAt'>) => {
    const outfit: Outfit = {
      ...newOutfit,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    set((state: WardrobeState) => ({
      outfits: [...state.outfits, outfit],
    }));
  },

  removeOutfit: (id: string) => {
    set((state: WardrobeState) => ({
      outfits: state.outfits.filter((outfit) => outfit.id !== id),
    }));
  },

  updateOutfit: (id: string, updates: Partial<Outfit>) => {
    set((state: WardrobeState) => ({
      outfits: state.outfits.map((outfit) =>
        outfit.id === id
          ? { ...outfit, ...updates, updatedAt: new Date() }
          : outfit
      ),
    }));
  },

  toggleOutfitFavorite: (id: string) => {
    set((state: WardrobeState) => ({
      outfits: state.outfits.map((outfit) =>
        outfit.id === id
          ? { ...outfit, favorite: !outfit.favorite, updatedAt: new Date() }
          : outfit
      ),
    }));
  },
});

export const useWardrobeStore = create<WardrobeState>(createWardrobeStore); 