import { Rank, Item, ElementType } from ".";
import { Ailment } from "./ailment";

// Monster-specific Enums
export type MonsterType = 'small' | 'large';

export type MonsterSpecies = 
  | 'bird wyvern' 
  | 'brute wyvern' 
  | 'elder dragon' 
  | 'fanged beast' 
  | 'fanged wyvern' 
  | 'fish' 
  | 'flying wyvern' 
  | 'herbivore' 
  | 'lynian' 
  | 'neopteron' 
  | 'piscine wyvern' 
  | 'relict' 
  | 'wingdrake';

export type RewardConditionType = 
  | 'carve' 
  | 'investigation' 
  | 'mining' 
  | 'palico' 
  | 'plunderblade' 
  | 'reward' 
  | 'siege reward' 
  | 'shiny' 
  | 'track' 
  | 'wound';

// Nested Location Types
export interface Camp {
  id: number;
  name: string;
  zone: number;
}

export interface Location {
  id: number;
  name: string;
  zoneCount: number;
  camps: Camp[];
}

// Combat Data Types
export interface MonsterResistance {
  element: ElementType;
  condition: string | null; // e.g., "covered in mud", null if always active
}

export interface MonsterWeakness {
  element: ElementType;
  stars: number; // Corresponds directly to the number of stars in the hunter's log
  condition: string | null;
}

// Reward Types
export interface RewardCondition {
  type: RewardConditionType;
  subtype: string; // e.g., "body" or "tail" for a carve
  rank: Rank;
  quantity: number;
  chance: number; // Percent chance (whole number between 1 and 100)
}

// Assuming Item is already defined as:
// export interface Item { id: number; name: string; description: string; rarity: number; carryLimit: number; value: number; }

export interface MonsterReward {
  id: number;
  item: Item;
  conditions: RewardCondition[];
}

export interface Monster {
  id: number;
  name: string;
  type: MonsterType;
  species: MonsterSpecies;
  description: string;
  elements: ElementType[]; // Elements used by the monster
  ailments: Ailment[];     // Ailments inflicted by the monster
  locations: Location[];   // Locations where the monster can be found
  resistances: MonsterResistance[];
  weakness: MonsterWeakness[];
  rewards: MonsterReward[]; // Possible rewards / drops
}
