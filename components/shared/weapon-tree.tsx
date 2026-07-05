'use client'

import { Weapon } from "@/types/weapon"
import Typography from "./typography"
import RarityBadge from "./rarity-badge"
import { cn } from "@/lib/utils"

type Props = {
  weaponId: number
  weaponMap: Map<number, Weapon>
  onSelect: (weapon: Weapon) => void
  depth?: number
}

export default function WeaponTree({ weaponId, weaponMap, onSelect, depth = 0 }: Props) {
  const weapon = weaponMap.get(weaponId)
  if (!weapon) return null

  const branches = weapon.crafting.branches
    .map((id) => weaponMap.get(id))
    .filter((w): w is Weapon => w !== undefined)

  return (
    <div className={cn(depth > 0 && "ml-6 border-l-2 border-border pl-4")}>
      <button
        onClick={() => onSelect(weapon)}
        className={cn(
          "group flex items-center gap-2 rounded-lg px-3 py-2 text-left transition-all hover:bg-primary/10 hover:pl-4",
          depth === 0 && "border-l-[3px] border-primary pl-3"
        )}
      >
        <Typography variant="p" className="font-medium group-hover:text-primary">
          {weapon.name}
        </Typography>
        <RarityBadge rarity={weapon.rarity}>R{weapon.rarity}</RarityBadge>
        {branches.length > 1 && (
          <span className="ml-auto text-[10px] text-muted-foreground">
            {branches.length} paths
          </span>
        )}
      </button>
      {branches.map((child) => (
        <WeaponTree
          key={child.id}
          weaponId={child.id}
          weaponMap={weaponMap}
          onSelect={onSelect}
          depth={depth + 1}
        />
      ))}
    </div>
  )
}