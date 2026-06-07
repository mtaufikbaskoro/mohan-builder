import { CraftingCost, ElementType } from ".";

export type DamageType = 'blunt' | 'piercing' | 'slashing';
export type EldersealType = 'low' | 'average' | 'high' | null;
export type WeaponType = 
  | 'great-sword' | 'long-sword' | 'sword-and-shield' | 'dual-blades' 
  | 'hammer' | 'hunting-horn' | 'lance' | 'gunlance' | 'switch-axe' 
  | 'charge-blade' | 'insect-glaive' | 'light-bowgun' | 'heavy-bowgun' | 'bow';

export interface Attack {
  display: number; // The attack value displayed in game [5]
  raw: number;     // The true raw attack value [5]
}

export interface Slot {
  rank: number; // The rank of the slot [6]
}

export interface WeaponElement {
  type: ElementType;
  damage: number;
  hidden: boolean; // Whether the element requires Free Elem/Ammo Up [7]
}

export interface WeaponSharpness {
  red: number;
  orange: number;
  yellow: number;
  green: number;
  blue: number;
  white: number;
  purple: number; // The number of normal hits for each color [8]
}

export interface WeaponAssets {
  icon: string | null;
  image: string | null; // URL to the weapon's in-game model [7]
}

export interface WeaponAttributes {
  affinity?: number;
  defense?: number; // Dictionary of modifiers like affinity and defense [9]
}

export interface WeaponCraftingInfo {
  craftable: boolean;
  previous: number | null; // ID of the weapon this upgrades from [5]
  branches: number[];      // IDs this weapon upgrades into [5]
  craftingMaterials: CraftingCost[];
  upgradeMaterials: CraftingCost[];
}

export interface BaseWeapon {
  id: number;
  name: string;
  rarity: number;
  attack: Attack;
  slots: Slot[];
  elements: WeaponElement[];
  crafting: WeaponCraftingInfo;
  assets: WeaponAssets;
  durability: WeaponSharpness[];
  elderseal: EldersealType;
  damageType: DamageType;
  attributes: WeaponAttributes;
}

export interface Bow extends BaseWeapon {
  type: 'bow';
  coatings: string[]; // e.g., 'close range', 'paralysis', 'power', etc. [3]
}

export interface ChargeBladeOrSwitchAxe extends BaseWeapon {
  type: 'charge-blade' | 'switch-axe';
  phial: {
    type: string; // e.g., 'impact', 'power', 'dragon', 'exhaust' [12, 13]
    damage: number | null; 
  };
}

export interface Gunlance extends BaseWeapon {
  type: 'gunlance';
  shelling: {
    type: string; // 'long', 'normal', or 'wide' [13]
    level: number;
  };
}

export interface InsectGlaive extends BaseWeapon {
  type: 'insect-glaive';
  boostType: string; // e.g., 'sever', 'speed', 'health' [13, 14]
}

export interface Bowgun extends BaseWeapon {
  type: 'light-bowgun' | 'heavy-bowgun';
  ammo: Array<{
    type: string;
    capacities: number[]; // Ordered by level, index 0 is level 1 [14]
  }>;
  specialAmmo: string; // e.g., 'wyvernblast', 'wyvernheart' [15]
  deviation: string;   // 'none', 'low', 'average', 'high' [16]
}

export interface StandardWeapon extends BaseWeapon {
  type: 
    | 'great-sword'
    | 'long-sword'
    | 'sword-and-shield'
    | 'dual-blades'
    | 'hammer'
    | 'hunting-horn'
    | 'lance';
}

export type Weapon = 
  | Bow 
  | ChargeBladeOrSwitchAxe 
  | Gunlance 
  | InsectGlaive 
  | Bowgun 
  | StandardWeapon;

