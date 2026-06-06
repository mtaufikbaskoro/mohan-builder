import { CraftingCost, Rank, SkillRank } from ".";

export type ArmorType = 'head' | 'chest' | 'gloves' | 'waist' | 'legs'; 

export interface Defense {
  base: number;
  max: number;
  augmented: number; 
}

export interface Resistances {
  fire: number;
  water: number;
  ice: number;
  thunder: number;
  dragon: number; 
}

export interface Slot {
  rank: number; 
}

// Armor Set Information
export interface SetInfo {
  id: number;
  name: string;
  rank: Rank;
  pieces: number[]; // An array of IDs of all armor pieces in the set [3]
}

// Visual Assets
export interface ArmorAssets {
  imageMale: string | null;
  imageFemale: string | null; 
}

// Attributes
export interface ArmorAttributes {
  requiredGender?: 'male' | 'female'; // Only present if restricted to a gender [5]
}

export interface ArmorCraftingInfo {
  materials: CraftingCost[]; 
}

export interface Armor {
  id: number;
  name: string;
  type: ArmorType;
  rank: Rank;
  rarity: number;
  defense: Defense;
  resistances: Resistances;
  slots: Slot[]; // Contains between 0 and 3 items
  skills: SkillRank[];
  armorSet: SetInfo;
  assets: ArmorAssets;
  crafting: ArmorCraftingInfo;
  attributes: ArmorAttributes;
}

// Armor Set Bonus Nested Types
export interface ArmorSetBonusRank {
  pieces: number; // The minimum number of pieces equipped to trigger this bonus tier
  skill: SkillRank; // The skill rank provided by this tier
}

export interface ArmorSetBonus {
  id: number;
  name: string;
  ranks: ArmorSetBonusRank[]; // The different ranks of the bonus
}

export interface ArmorSet {
  id: number;
  name: string;
  rank: Rank;
  pieces: Armor[]; // An array of the full armor pieces that make up the set
  bonus: ArmorSetBonus | null; // Null if the set does not provide a bonus
}
