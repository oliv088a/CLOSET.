export type ClothingCategory =
  | 'tops'
  | 'bottoms'
  | 'dresses'
  | 'outerwear'
  | 'shoes'
  | 'accessories';

export type ClothingStyle =
  | 'casual'
  | 'formal'
  | 'business'
  | 'sporty'
  | 'party';

export type Season = 'spring' | 'summer' | 'fall' | 'winter' | 'all';

export interface ClothingItem {
  id: string;
  name: string;
  category: ClothingCategory;
  style: ClothingStyle[];
  color: string;
  season: Season[];
  imageUrl: string;
  brand?: string;
  material?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Outfit {
  id: string;
  name: string;
  items: ClothingItem[];
  style: ClothingStyle[];
  season: Season[];
  occasion?: string;
  favorite: boolean;
  createdAt: Date;
  updatedAt: Date;
} 