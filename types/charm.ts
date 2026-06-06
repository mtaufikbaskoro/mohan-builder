import { CraftingCost, SkillRank } from ".";

// Charm Specific Nested Types
export interface CharmRankCrafting {
  craftable: boolean; // False means it must be upgraded from the previous level
  materials: CraftingCost[];
}

export interface CharmRank {
  level: number;
  rarity: number;
  skills: SkillRank[];
  crafting: CharmRankCrafting;
  // Note: The API documentation notes that CharmRank.name is deprecated and planned for removal, so it is omitted here.
}

export interface Charm {
  id: number;
  name: string;
  ranks: CharmRank[]; // An array of the different ranks (upgrade levels) of the charm
}