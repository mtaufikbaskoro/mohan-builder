import { getMHUrl, getLocalDataUrl } from "@/lib/api"
import { Weapon, WeaponType } from "@/types/weapon"

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

async function fetchFromLocal<T>(filename: string): Promise<T | null> {
  try {
    const response = await fetch(getLocalDataUrl(filename))
    if (!response.ok) return null
    return response.json()
  } catch {
    return null
  }
}

async function fetchFromApi<T>(endpoint: string): Promise<T> {
  const response = await fetch(getMHUrl(endpoint))
  if (!response.ok) throw new Error(`Failed to fetch ${endpoint}`)
  return response.json()
}

export async function getWeaponType() {
  const local = await fetchFromLocal<Array<{ type: string; assets: { icon: string | null } }>>('weapons.json')
  const weapons = local ?? await fetchFromApi<Array<{ type: string; assets: { icon: string | null } }>>('/weapons?p={"type":true,"assets.icon":true}')

  const uniqueWeaponTypes: Array<{ type: WeaponType; icon: string | undefined }> = []
  const seenTypes = new Set<string>()

  for (const weapon of weapons) {
    if (!seenTypes.has(weapon.type)) {
      seenTypes.add(weapon.type)
      uniqueWeaponTypes.push({
        type: weapon.type as WeaponType,
        icon: weapon.assets?.icon || undefined
      })
    }
  }

  return uniqueWeaponTypes
}

export async function getWeaponByType(type: WeaponType): Promise<Weapon[]> {
  const query = JSON.stringify({ type })
  const local = await fetchFromLocal<Weapon[]>('weapons.json')

  if (local) {
    return local.filter((w) => w.type === type)
  }

  const endpoint = `/weapons?q=${query}`
  return fetchFromApi<Weapon[]>(endpoint)
}