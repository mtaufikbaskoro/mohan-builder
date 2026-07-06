'use client'

import { Weapon } from "@/types/weapon"
import { ElementType } from "@/types"
import Typography from "./typography"
import RarityBadge from "./rarity-badge"
import SharpnessBar from "./sharpness-bar"
import { Badge } from "../ui/badge"
import { cn } from "@/lib/utils"
import { capitalize } from "@/lib/format"
import Image from "next/image"
import { ChevronRight } from "lucide-react"

const ELEMENT_COLORS: Record<ElementType, string> = {
  fire: "text-red-500",
  water: "text-blue-500",
  ice: "text-cyan-400",
  thunder: "text-yellow-400",
  dragon: "text-purple-500",
  poison: "text-purple-400",
  blast: "text-orange-500",
  sleep: "text-indigo-400",
  paralysis: "text-amber-400",
  stun: "text-yellow-300",
}

const ELEMENT_LABELS: Record<ElementType, string> = {
  fire: "Fire",
  water: "Water",
  ice: "Ice",
  thunder: "Thunder",
  dragon: "Dragon",
  poison: "Poison",
  blast: "Blast",
  sleep: "Sleep",
  paralysis: "Paralysis",
  stun: "Stun",
}

type Props = {
  weaponId: number
  weaponMap: Map<number, Weapon>
  onSelect: (weapon: Weapon) => void
  depth?: number
  matchesFilter?: (weapon: Weapon) => boolean
  hasActiveFilters?: boolean
}

export default function WeaponTree({
  weaponId,
  weaponMap,
  onSelect,
  depth = 0,
  matchesFilter,
  hasActiveFilters = false,
}: Props) {
  const weapon = weaponMap.get(weaponId)
  if (!weapon) return null

  const branches = weapon.crafting.branches
    .map((id) => weaponMap.get(id))
    .filter((w): w is Weapon => w !== undefined)

  const image = weapon.assets?.image
  const icon = weapon.assets?.icon

  const isMatch = !hasActiveFilters || !matchesFilter || matchesFilter(weapon)
  const hasMatchingDescendant = hasActiveFilters && matchesFilter
    ? branches.some((b) => {
        const check = (id: number, visited = new Set<number>()): boolean => {
          if (visited.has(id)) return false
          visited.add(id)
          const w = weaponMap.get(id)
          if (!w) return false
          if (matchesFilter(w)) return true
          for (const branchId of w.crafting.branches) {
            if (check(branchId, visited)) return true
          }
          return false
        }
        return check(b.id)
      })
    : false

  if (hasActiveFilters && !isMatch && !hasMatchingDescendant) return null

  return (
    <div className={cn(depth > 0 && "ml-6 border-l-2 border-border/50 pl-4")}>
      <button
        onClick={() => onSelect(weapon)}
        className={cn(
          "group flex w-full items-start gap-3 rounded-xl border border-border bg-card p-3 text-left transition-all hover:border-primary/30 hover:bg-primary/5 hover:shadow-sm",
          depth === 0 && "border-l-[3px] border-l-primary",
          hasActiveFilters && !isMatch && "opacity-40"
        )}
      >
        {/* Weapon icon */}
        <div className="flex size-14 shrink-0 items-center justify-center rounded-lg bg-muted/50 transition-colors group-hover:bg-primary/5">
          {image ? (
            <Image
              src={image}
              alt={weapon.name}
              width={48}
              height={48}
              className="object-contain"
            />
          ) : icon ? (
            <Image
              src={icon}
              alt={weapon.name}
              width={36}
              height={36}
              className="object-contain"
            />
          ) : (
            <Typography variant="notes" className="text-muted-foreground">
              N/A
            </Typography>
          )}
        </div>

        {/* Weapon info */}
        <div className="flex min-w-0 flex-1 flex-col gap-1.5">
          {/* Name + Rarity */}
          <div className="flex items-center gap-2">
            <Typography variant="p" className="truncate font-semibold group-hover:text-primary">
              {weapon.name}
            </Typography>
            <RarityBadge rarity={weapon.rarity}>R{weapon.rarity}</RarityBadge>
          </div>

          {/* Attack + Damage type */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5">
            <Typography variant="notes" className="tabular-nums font-semibold">
              ATK {weapon.attack.display}
            </Typography>
            <Typography variant="notes" className="text-muted-foreground">
              {capitalize(weapon.damageType)}
            </Typography>
            {weapon.elderseal && (
              <Badge variant="outline" className="text-[10px] border-purple-500/30 text-purple-400">
                {capitalize(weapon.elderseal)} Elderseal
              </Badge>
            )}
          </div>

          {/* Affinity */}
          {weapon.attributes.affinity != null && weapon.attributes.affinity !== 0 && (
            <Typography
              variant="notes"
              className={weapon.attributes.affinity > 0 ? "text-green-400" : "text-red-400"}
            >
              Affinity: {weapon.attributes.affinity > 0 ? "+" : ""}{weapon.attributes.affinity}%
            </Typography>
          )}

          {/* Elements */}
          {weapon.elements.length > 0 && (
            <div className="flex flex-wrap gap-x-3 gap-y-0.5">
              {weapon.elements.map((el, i) => (
                <Typography
                  key={i}
                  variant="notes"
                  className={cn(
                    "tabular-nums",
                    ELEMENT_COLORS[el.type],
                    el.hidden && "opacity-50"
                  )}
                >
                  {ELEMENT_LABELS[el.type]} {el.damage}
                  {el.hidden && <span className="text-[10px]"> (hidden)</span>}
                </Typography>
              ))}
            </div>
          )}

          {/* Sharpness */}
          {weapon.durability?.length > 0 && (
            <SharpnessBar durability={weapon.durability} />
          )}

          {/* Slots + Branches */}
          <div className="flex items-center gap-2">
            {weapon.slots.length > 0 && (
              <div className="flex gap-0.5">
                {weapon.slots.map((slot, i) => (
                  <Badge
                    key={i}
                    variant="outline"
                    className="size-5 items-center justify-center rounded-sm p-0 text-[10px]"
                  >
                    {slot.rank}
                  </Badge>
                ))}
              </div>
            )}

            {branches.length > 0 && (
              <Typography variant="notes" className="text-muted-foreground">
                {branches.length > 1 ? `${branches.length} upgrade paths` : "1 upgrade path"}
              </Typography>
            )}
          </div>
        </div>

        {/* Right chevron */}
        <ChevronRight className="mt-1 size-4 shrink-0 text-muted-foreground/30 transition-all group-hover:translate-x-0.5 group-hover:text-muted-foreground" />
      </button>

      {branches.map((child) => (
        <WeaponTree
          key={child.id}
          weaponId={child.id}
          weaponMap={weaponMap}
          onSelect={onSelect}
          depth={depth + 1}
          matchesFilter={matchesFilter}
          hasActiveFilters={hasActiveFilters}
        />
      ))}
    </div>
  )
}