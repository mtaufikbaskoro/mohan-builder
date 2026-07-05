import { WeaponType } from "@/types/weapon"

export function getWeaponIcon(type: WeaponType) {
  switch (type) {
    case "great-sword": return process.env.NEXT_PUBLIC_GREAT_SWORD_ICON
    case "long-sword": return process.env.NEXT_PUBLIC_LONG_SWORD_ICON
    case "sword-and-shield": return process.env.NEXT_PUBLIC_SWORD_AND_SHIELD_ICON
    case "dual-blades": return process.env.NEXT_PUBLIC_DUAL_BLADES_ICON
    case "hammer": return process.env.NEXT_PUBLIC_HAMMER_ICON
    case "hunting-horn": return process.env.NEXT_PUBLIC_HUNTING_HORN_ICON
    case "lance": return process.env.NEXT_PUBLIC_LANCE_ICON
    case "gunlance": return process.env.NEXT_PUBLIC_GUNLANCE_ICON
    case "switch-axe": return process.env.NEXT_PUBLIC_SWITCH_AXE_ICON
    case "charge-blade": return process.env.NEXT_PUBLIC_CHARGE_BLADE_ICON
    case "insect-glaive": return process.env.NEXT_PUBLIC_INSECT_GLAIVE_ICON
    case "light-bowgun": return process.env.NEXT_PUBLIC_LIGHT_BOWGUN_ICON
    case "heavy-bowgun": return process.env.NEXT_PUBLIC_HEAVY_BOWGUN_ICON
    case "bow": return process.env.NEXT_PUBLIC_BOW_ICON
    default: return ""
  }
}