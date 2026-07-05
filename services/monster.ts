import { readFileSync } from "node:fs"
import { join } from "node:path"
import { getMHUrl } from "@/lib/api"
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

async function fetchFromApi<T>(endpoint: string): Promise<T> {
  const response = await fetch(getMHUrl(endpoint))
  if (!response.ok) throw new Error(`Failed to fetch ${endpoint}`)
  return response.json()
}

export async function getMonsters(): Promise<Monster[]> {
  const local = readLocalFile<Monster[]>("monsters.json")
  if (local && local.length > 0) return local

  return fetchFromApi<Monster[]>("/monsters")
}

export async function getMonsterById(id: number): Promise<Monster> {
  return fetchFromApi<Monster>(`/monsters/${id}`)
}