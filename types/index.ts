export type Rank = 'low' | 'high' | 'master';

export type ElementType = 'fire' | 'water' | 'ice' | 'thunder' | 'dragon' | 'blast' | 'poison' | 'sleep' | 'paralysis' | 'stun';

// Crafting and Items
export interface Item {
  id: number;
  name: string;
  description: string;
  rarity: number;
  carryLimit: number;
  value: number; // Zenny value [10]
}

export interface CraftingCost {
  quantity: number;
  item: Item; // The item consumed during crafting [4]
}

// Skill Data
export interface SkillModifiers {
  affinity?: number;
  attack?: number;
  damageFire?: number;
  damageWater?: number;
  damageIce?: number;
  damageThunder?: number;
  damageDragon?: number;
  defense?: number;
  health?: number;
  sharpnessBonus?: number;
  resistAll?: number;
  resistFire?: number;
  resistWater?: number;
  resistIce?: number;
  resistThunder?: number;
  resistDragon?: number; 
}

export interface SkillRank {
  id: number;
  level: number;
  description: string;
  skill: number; // The ID of the skill
  skillName: string;
  modifiers: SkillModifiers; 
}

export interface Skill {
  id: number; // The skill's ID [2]
  name: string; // The name of the skill [2]
  description: string; // A short description of the skill [2]
  ranks: SkillRank[]; // An array of available ranks for the skill [2]
}
