import { readFileSync } from "node:fs"
import { join } from "node:path"
import { Monster } from "@/types/monster"

function readLocalFile<T>(filename: string): T | null {
  try {
    const filePath = join(process.cwd(), "public", "data", filename)
    const raw = readFileSync(filePath, "utf-8")
    return JSON.parse(raw) as T
  } catch {
    return null
  }
}

export async function getMonsters(): Promise<Monster[]> {
  const local = readLocalFile<Monster[]>("monsters.json")
  return local ?? []
}

export async function getMonsterById(id: number): Promise<Monster | null> {
  const monsters = readLocalFile<Monster[]>("monsters.json") ?? []
  return monsters.find((m) => m.id === id) ?? null
}