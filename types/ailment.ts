import { SkillRank } from ".";

// Recovery Actions Enum
export type RecoveryAction = 'crouch' | 'dodge';

// Item Interface (if you haven't already defined it globally)
export interface Item {
  id: number;
  name: string;
  description: string;
  rarity: number;
  carryLimit: number;
  value: number;
}

export interface Skill {
  id: number;
  name: string;
  description: string;
  ranks: SkillRank[];
}

// Recovery and Protection Interfaces
export interface Recovery {
  actions: RecoveryAction[]; // Actions that can be taken to remove the ailment
  items: Item[];             // Items that can remove the ailment
}

export interface Protection {
  items: Item[];             // Items that can prevent the ailment
  skills: Skill[];           // Skills that can prevent the ailment
}

export interface Ailment {
  id: number;
  name: string;
  description: string;
  recovery: Recovery;     // Methods to recover from the ailment
  protection: Protection; // Methods for mitigating or preventing the ailment
}