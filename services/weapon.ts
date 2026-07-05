import { readFileSync } from "node:fs"
import { join } from "node:path"
import { Weapon, WeaponType } from "@/types/weapon"

function readLocalFile<T>(filename: string): T | null {
  try {
    const filePath = join(process.cwd(), "public", "data", filename)
    const raw = readFileSync(filePath, "utf-8")
    return JSON.parse(raw) as T
  } catch {
    return null
  }
}

export async function getWeaponType() {
  const weapons = readLocalFile<Array<{ type: string; assets: { icon: string | null } }>>("weapons.json") ?? []

  const typeMap = new Map<string, { type: WeaponType; icon: string | undefined; count: number }>()

  for (const weapon of weapons) {
    const existing = typeMap.get(weapon.type)
    if (existing) {
      existing.count++
    } else {
      typeMap.set(weapon.type, {
        type: weapon.type as WeaponType,
        icon: weapon.assets?.icon || undefined,
        count: 1,
      })
    }
  }

  return Array.from(typeMap.values())
}

export async function getWeaponByType(type: WeaponType): Promise<Weapon[]> {
  const weapons = readLocalFile<Weapon[]>("weapons.json") ?? []
  return weapons.filter((w) => w.type === type)
}