import { SkillRank } from ".";

export interface Decoration {
  id: number;
  name: string;
  rarity: number;
  slot: number; // The slot size that the decoration fits into (e.g., 1, 2, 3, or 4)
  skills: SkillRank[]; // An array of skill ranks that the decoration provides
}