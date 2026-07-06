'use client'

import { useState, useMemo, useCallback } from "react"
import Typography from "@/components/shared/typography"
import WeaponTree from "@/components/shared/weapon-tree"
import WeaponCard from "@/components/shared/weapon-card"
import WeaponListItem from "@/components/shared/weapon-list-item"
import WeaponDetailModal from "@/components/shared/weapon-detail-modal"
import { getWeaponIcon } from "@/lib/weapon-icons"
import { Weapon, WeaponType } from "@/types/weapon"
import { ElementType } from "@/types"
import { capitalize } from "@/lib/format"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import {
  GitBranch,
  Grid3x3,
  List,
  Search,
  Sword,
  Star,
  Swords,
  X,
  Flame,
  Droplets,
  Zap,
  Snowflake,
  Skull,
  Wind,
  Atom,
  Moon,
  Crosshair,
  Shield,
  Target,
} from "lucide-react"

const BLADEMASTER: WeaponType[] = [
  "great-sword", "long-sword", "sword-and-shield", "dual-blades",
  "hammer", "hunting-horn", "lance", "gunlance",
  "switch-axe", "charge-blade", "insect-glaive",
]
const GUNNER: WeaponType[] = ["light-bowgun", "heavy-bowgun", "bow"]

type ViewMode = "tree" | "grid" | "list"

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

const ELEMENT_ICONS: Record<ElementType, React.ComponentType<{ className?: string }>> = {
  fire: Flame,
  water: Droplets,
  ice: Snowflake,
  thunder: Zap,
  dragon: Skull,
  poison: Atom,
  blast: Wind,
  sleep: Moon,
  paralysis: Crosshair,
  stun: Shield,
}

const DAMAGE_TYPES = ["blunt", "piercing", "slashing"] as const

type Props = {
  weapons: Weapon[]
  weaponType: WeaponType
}

export default function Content({ weapons, weaponType }: Props) {
  const [selectedWeapon, setSelectedWeapon] = useState<Weapon | null>(null)
  const [open, setOpen] = useState(false)
  const [view, setView] = useState<ViewMode>("tree")
  const [search, setSearch] = useState("")
  const [selectedRarities, setSelectedRarities] = useState<Set<number>>(new Set())
  const [selectedElements, setSelectedElements] = useState<Set<ElementType>>(new Set())
  const [selectedDamageTypes, setSelectedDamageTypes] = useState<Set<string>>(new Set())

  const weaponMap = useMemo(() => {
    const map = new Map<number, Weapon>()
    for (const w of weapons) {
      map.set(w.id, w)
    }
    return map
  }, [weapons])

  const rootWeapons = useMemo(
    () => weapons.filter((w) => w.crafting.previous === null),
    [weapons]
  )

  const classification = BLADEMASTER.includes(weaponType) ? "blademaster" : "gunner"
  const isBlademaster = classification === "blademaster"

  const hasActiveFilters = search.length > 0 || selectedRarities.size > 0 || selectedElements.size > 0 || selectedDamageTypes.size > 0

  const matchesFilters = useCallback(
    (weapon: Weapon): boolean => {
      if (search.length > 0) {
        if (!weapon.name.toLowerCase().includes(search.toLowerCase())) return false
      }
      if (selectedRarities.size > 0) {
        if (!selectedRarities.has(weapon.rarity)) return false
      }
      if (selectedElements.size > 0) {
        const hasMatchingElement = weapon.elements.some((el) => selectedElements.has(el.type))
        if (!hasMatchingElement) return false
      }
      if (selectedDamageTypes.size > 0) {
        if (!selectedDamageTypes.has(weapon.damageType)) return false
      }
      return true
    },
    [search, selectedRarities, selectedElements, selectedDamageTypes]
  )

  const filteredWeapons = useMemo(
    () => (hasActiveFilters ? weapons.filter(matchesFilters) : weapons),
    [weapons, hasActiveFilters, matchesFilters]
  )

  const filteredRootWeapons = useMemo(() => {
    if (!hasActiveFilters) return rootWeapons

    // Check if a root weapon or any of its descendants matches
    const hasMatchingDescendant = (weaponId: number, visited = new Set<number>()): boolean => {
      if (visited.has(weaponId)) return false
      visited.add(weaponId)

      const weapon = weaponMap.get(weaponId)
      if (!weapon) return false

      if (matchesFilters(weapon)) return true

      for (const branchId of weapon.crafting.branches) {
        if (hasMatchingDescendant(branchId, visited)) return true
      }
      return false
    }

    return rootWeapons.filter((root) => hasMatchingDescendant(root.id))
  }, [rootWeapons, hasActiveFilters, weaponMap, matchesFilters])

  const handleSelect = (weapon: Weapon) => {
    setSelectedWeapon(weapon)
    setOpen(true)
  }

  const toggleRarity = (r: number) => {
    setSelectedRarities((prev) => {
      const next = new Set(prev)
      if (next.has(r)) next.delete(r)
      else next.add(r)
      return next
    })
  }

  const toggleElement = (e: ElementType) => {
    setSelectedElements((prev) => {
      const next = new Set(prev)
      if (next.has(e)) next.delete(e)
      else next.add(e)
      return next
    })
  }

  const toggleDamageType = (d: string) => {
    setSelectedDamageTypes((prev) => {
      const next = new Set(prev)
      if (next.has(d)) next.delete(d)
      else next.add(d)
      return next
    })
  }

  const clearFilters = () => {
    setSearch("")
    setSelectedRarities(new Set())
    setSelectedElements(new Set())
    setSelectedDamageTypes(new Set())
  }

  const icon = getWeaponIcon(weaponType)
  const totalWeapons = weapons.length

  const maxRarity = useMemo(() => Math.max(...weapons.map((w) => w.rarity)), [weapons])
  const maxAttack = useMemo(() => Math.max(...weapons.map((w) => w.attack.display)), [weapons])

  const rarityOptions = useMemo(() => {
    const rarities = new Set(weapons.map((w) => w.rarity))
    return Array.from(rarities).sort((a, b) => a - b)
  }, [weapons])

  const elementOptions = useMemo(() => {
    const elements = new Set<ElementType>()
    for (const w of weapons) {
      for (const el of w.elements) {
        elements.add(el.type)
      }
    }
    return Array.from(elements)
  }, [weapons])

  return (
    <div className="w-full max-w-5xl space-y-6">
      {/* ===== HERO / HEADER SECTION ===== */}
      <div
        className={cn(
          "relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br p-6 sm:p-8",
          isBlademaster
            ? "from-blue-950/40 via-slate-900/30 to-slate-950/50"
            : "from-amber-950/40 via-red-900/20 to-slate-950/50"
        )}
      >
        {/* Decorative background elements */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.03]">
          <div className="absolute -right-20 -top-20 size-64 rounded-full bg-primary" />
          <div className="absolute -bottom-10 -left-10 size-40 rounded-full bg-primary" />
        </div>

        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            {icon && (
              <div
                className={cn(
                  "flex size-16 shrink-0 items-center justify-center rounded-xl transition-transform hover:scale-110",
                  isBlademaster ? "bg-blue-500/10" : "bg-amber-500/10"
                )}
              >
                <Image
                  className="size-10 drop-shadow-lg"
                  src={icon}
                  alt="weapon-type-icon"
                  width={40}
                  height={40}
                  loading="eager"
                />
              </div>
            )}
            <div>
              <div className="flex items-center gap-2">
                <Typography
                  className="text-2xl font-extrabold uppercase tracking-wider sm:text-3xl"
                  variant="h1"
                >
                  {weaponType.replaceAll("-", " ")}
                </Typography>
              </div>
              <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                <Badge
                  variant="outline"
                  className={cn(
                    "text-[10px]",
                    isBlademaster ? "border-blue-500/30 text-blue-400" : "border-amber-500/30 text-amber-400"
                  )}
                >
                  {capitalize(classification)}
                </Badge>
                <span>
                  {rootWeapons.length} upgrade trees
                </span>
                <span>·</span>
                <span>{totalWeapons} weapons</span>
                <span>·</span>
                <span>Highest rarity {maxRarity}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== STATS OVERVIEW CARDS ===== */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="group flex flex-col gap-1 rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/30 hover:shadow-lg hover:-translate-y-0.5">
          <Swords className="size-5 text-muted-foreground transition-colors group-hover:text-primary" />
          <Typography variant="h3" className="text-lg tabular-nums">
            {totalWeapons}
          </Typography>
          <Typography variant="notes" className="text-muted-foreground">
            Total Weapons
          </Typography>
        </div>
        <div className="group flex flex-col gap-1 rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/30 hover:shadow-lg hover:-translate-y-0.5">
          <GitBranch className="size-5 text-muted-foreground transition-colors group-hover:text-primary" />
          <Typography variant="h3" className="text-lg tabular-nums">
            {rootWeapons.length}
          </Typography>
          <Typography variant="notes" className="text-muted-foreground">
            Upgrade Trees
          </Typography>
        </div>
        <div className="group flex flex-col gap-1 rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/30 hover:shadow-lg hover:-translate-y-0.5">
          <Star className="size-5 text-muted-foreground transition-colors group-hover:text-primary" />
          <Typography variant="h3" className="text-lg tabular-nums">
            {maxRarity}
          </Typography>
          <Typography variant="notes" className="text-muted-foreground">
            Highest Rarity
          </Typography>
        </div>
        <div className="group flex flex-col gap-1 rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/30 hover:shadow-lg hover:-translate-y-0.5">
          <Sword className="size-5 text-muted-foreground transition-colors group-hover:text-primary" />
          <Typography variant="h3" className="text-lg tabular-nums">
            {maxAttack}
          </Typography>
          <Typography variant="notes" className="text-muted-foreground">
            Highest ATK
          </Typography>
        </div>
      </div>

      {/* ===== VIEW MODE TOGGLE ===== */}
      <div className="flex items-center justify-between">
        <div className="inline-flex rounded-lg border border-border bg-muted/50 p-1">
          {(["tree", "grid", "list"] as ViewMode[]).map((mode) => {
            const Icon = mode === "tree" ? GitBranch : mode === "grid" ? Grid3x3 : List
            const label = mode === "tree" ? "Tree" : mode === "grid" ? "Grid" : "List"
            return (
              <button
                key={mode}
                onClick={() => setView(mode)}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-all",
                  view === mode
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Icon className="size-3.5" />
                {label}
              </button>
            )
          })}
        </div>
      </div>

      {/* ===== SEARCH & FILTER BAR ===== */}
      <div className="space-y-3">
        {/* Search input */}
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search weapons..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-border bg-card py-2 pl-10 pr-4 text-sm outline-none transition-all placeholder:text-muted-foreground focus:border-primary/50 focus:ring-2 focus:ring-primary/10"
          />
        </div>

        {/* Filter chips */}
        <div className="flex flex-wrap gap-2">
          {/* Rarity filter */}
          {rarityOptions.map((r) => (
            <button
              key={`rarity-${r}`}
              onClick={() => toggleRarity(r)}
              className={cn(
                "inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-medium transition-all",
                selectedRarities.has(r)
                  ? "border-primary/50 bg-primary/10 text-primary"
                  : "border-border bg-muted/50 text-muted-foreground hover:border-primary/30 hover:text-foreground"
              )}
            >
              <Star className="size-3" />
              R{r}
            </button>
          ))}

          {/* Separator */}
          {elementOptions.length > 0 && rarityOptions.length > 0 && (
            <span className="mx-1 w-px self-stretch bg-border" />
          )}

          {/* Element filter */}
          {elementOptions.map((el) => {
            const EIcon = ELEMENT_ICONS[el]
            return (
              <button
                key={`el-${el}`}
                onClick={() => toggleElement(el)}
                className={cn(
                  "inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-medium transition-all",
                  selectedElements.has(el)
                    ? "border-primary/50 bg-primary/10 text-primary"
                    : "border-border bg-muted/50 text-muted-foreground hover:border-primary/30",
                  ELEMENT_COLORS[el]
                )}
              >
                <EIcon className="size-3" />
                {ELEMENT_LABELS[el]}
              </button>
            )
          })}

          {/* Separator */}
          {DAMAGE_TYPES.length > 0 && elementOptions.length > 0 && (
            <span className="mx-1 w-px self-stretch bg-border" />
          )}

          {/* Damage type filter */}
          {DAMAGE_TYPES.map((dt) => (
            <button
              key={`dt-${dt}`}
              onClick={() => toggleDamageType(dt)}
              className={cn(
                "inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-medium transition-all",
                selectedDamageTypes.has(dt)
                  ? "border-primary/50 bg-primary/10 text-primary"
                  : "border-border bg-muted/50 text-muted-foreground hover:border-primary/30 hover:text-foreground"
              )}
            >
              <Target className="size-3" />
              {capitalize(dt)}
            </button>
          ))}

          {/* Clear filters */}
          {hasActiveFilters && (
            <>
              <span className="mx-1 w-px self-stretch bg-border" />
              <button
                onClick={clearFilters}
                className="inline-flex items-center gap-1 rounded-full border border-destructive/30 bg-destructive/5 px-2.5 py-1 text-[11px] font-medium text-destructive transition-all hover:border-destructive/50 hover:bg-destructive/10"
              >
                <X className="size-3" />
                Clear
              </button>
            </>
          )}
        </div>
      </div>

      {/* ===== WEAPON VIEWS ===== */}
      <div className="min-h-[200px]">
        {view === "tree" && (
          <div className="space-y-1">
            {filteredRootWeapons.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-3 py-16 text-muted-foreground">
                <Search className="size-10 opacity-30" />
                <Typography variant="p">
                  {hasActiveFilters
                    ? "No weapons match your filters"
                    : "No weapons found for this type"}
                </Typography>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="text-xs text-primary underline underline-offset-2 hover:opacity-80"
                  >
                    Clear all filters
                  </button>
                )}
              </div>
            ) : (
              filteredRootWeapons.map((root) => (
                <WeaponTree
                  key={root.id}
                  weaponId={root.id}
                  weaponMap={weaponMap}
                  onSelect={handleSelect}
                  matchesFilter={matchesFilters}
                  hasActiveFilters={hasActiveFilters}
                />
              ))
            )}
          </div>
        )}

        {view === "grid" && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredWeapons.length === 0 ? (
              <div className="col-span-full flex flex-col items-center justify-center gap-3 py-16 text-muted-foreground">
                <Search className="size-10 opacity-30" />
                <Typography variant="p">
                  {hasActiveFilters
                    ? "No weapons match your filters"
                    : "No weapons found"}
                </Typography>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="text-xs text-primary underline underline-offset-2 hover:opacity-80"
                  >
                    Clear all filters
                  </button>
                )}
              </div>
            ) : (
              filteredWeapons.map((weapon) => (
                <button
                  key={weapon.id}
                  onClick={() => handleSelect(weapon)}
                  className="text-left outline-none"
                >
                  <WeaponCard weapon={weapon} />
                </button>
              ))
            )}
          </div>
        )}

        {view === "list" && (
          <div className="space-y-1">
            {filteredWeapons.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-3 py-16 text-muted-foreground">
                <Search className="size-10 opacity-30" />
                <Typography variant="p">
                  {hasActiveFilters
                    ? "No weapons match your filters"
                    : "No weapons found"}
                </Typography>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="text-xs text-primary underline underline-offset-2 hover:opacity-80"
                  >
                    Clear all filters
                  </button>
                )}
              </div>
            ) : (
              filteredWeapons.map((weapon) => (
                <WeaponListItem
                  key={weapon.id}
                  weapon={weapon}
                  onSelect={handleSelect}
                />
              ))
            )}
          </div>
        )}
      </div>

      {/* ===== WEAPON DETAIL MODAL ===== */}
      <WeaponDetailModal
        weapon={selectedWeapon}
        weaponMap={weaponMap}
        open={open}
        onOpenChange={setOpen}
      />
    </div>
  )
}