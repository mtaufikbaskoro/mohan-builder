import { getMHUrl } from "@/lib/api"
import { WeaponType } from "@/types/weapon"

export function getWeaponIcon (type: WeaponType) {
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

export async function getWeaponType() {
    const endpoint = '/weapons?p={"type":true,"assets.icon":true}'
    try {
        const response = await fetch(getMHUrl(endpoint))
        if (!response.ok) throw new Error('Failed to fetch weapon data.')

        const weapons = await response.json()
        const uniqueWeaponTypes = [];
        const seenTypes = new Set();
        
        for (const weapon of weapons) {
        if (!seenTypes.has(weapon.type)) {
            seenTypes.add(weapon.type);
            uniqueWeaponTypes.push({
            type: weapon.type,
            icon: weapon.assets?.icon || null
            });
        }
        }
        
        return uniqueWeaponTypes;
    } catch (error) {
        console.error("Error fetching weapon types:", error);
        return [];
    }
}

export async function getWeaponByType(type: WeaponType) {
    const query = JSON.stringify({ type })
    const endpoint = `/weapons?q=${query}`
    try {
        const response = await fetch(getMHUrl(endpoint))
        if (!response.ok) throw new Error('Failed to fetch weapon data.')
        const weapons = await response.json()
        return weapons;
    } catch (error) {
        console.error("Error fetching weapon types:", error);
        return [];
    }
}

