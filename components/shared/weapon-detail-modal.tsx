'use client'

import { Weapon } from "@/types/weapon"
import { ElementType } from "@/types"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import Typography from "./typography"
import RarityBadge from "./rarity-badge"
import SharpnessBar from "./sharpness-bar"
import { Badge } from "../ui/badge"
import { cn } from "@/lib/utils"
import { capitalize } from "@/lib/format"
import Image from "next/image"
import { Sparkles, Gem, Shield, Crosshair } from "lucide-react"

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

const ELEMENT_BG_COLORS: Record<ElementType, string> = {
  fire: "bg-red-500/10 border-red-500/20",
  water: "bg-blue-500/10 border-blue-500/20",
  ice: "bg-cyan-400/10 border-cyan-400/20",
  thunder: "bg-yellow-400/10 border-yellow-400/20",
  dragon: "bg-purple-500/10 border-purple-500/20",
  poison: "bg-purple-400/10 border-purple-400/20",
  blast: "bg-orange-500/10 border-orange-500/20",
  sleep: "bg-indigo-400/10 border-indigo-400/20",
  paralysis: "bg-amber-400/10 border-amber-400/20",
  stun: "bg-yellow-300/10 border-yellow-300/20",
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
  weapon: Weapon | null
  weaponMap: Map<number, Weapon>
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function WeaponDetailModal({ weapon, weaponMap, open, onOpenChange }: Props) {
  if (!weapon) return null

  const image = weapon.assets?.image
  const icon = weapon.assets?.icon
  const branches = weapon.crafting.branches
    .map((id) => weaponMap.get(id))
    .filter((w): w is Weapon => w !== undefined)

  const previous = weapon.crafting.previous
    ? weaponMap.get(weapon.crafting.previous)
    : null

  const materials = weapon.crafting.craftable
    ? weapon.crafting.craftingMaterials
    : weapon.crafting.upgradeMaterials

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <DialogTitle className="text-lg">{weapon.name}</DialogTitle>
            <RarityBadge rarity={weapon.rarity}>R{weapon.rarity}</RarityBadge>
          </div>
          <DialogDescription className="flex items-center gap-2">
            {capitalize(weapon.type.replaceAll("-", " "))} · {capitalize(weapon.damageType)}
            {weapon.elderseal && (
              <>
                <span className="text-border">·</span>
                <span className="text-purple-400">{capitalize(weapon.elderseal)} Elderseal</span>
              </>
            )}
          </DialogDescription>
        </DialogHeader>

        {/* Image + Main Stats */}
        <div className="flex gap-4">
          <div className="flex size-28 shrink-0 items-center justify-center rounded-xl bg-muted/30 border border-border">
            {image ? (
              <Image
                src={image}
                alt={weapon.name}
                width={96}
                height={96}
                className="object-contain"
              />
            ) : icon ? (
              <Image
                src={icon}
                alt={weapon.name}
                width={56}
                height={56}
                className="object-contain"
              />
            ) : (
              <Typography variant="notes" className="text-muted-foreground">
                No image
              </Typography>
            )}
          </div>

          <div className="flex flex-1 flex-col gap-2.5">
            {/* Attack stat */}
            <div className="flex items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10">
                <Crosshair className="size-4 text-primary" />
              </div>
              <div>
                <Typography variant="h3" className="tabular-nums leading-none">
                  ATK {weapon.attack.display}
                </Typography>
                <Typography variant="notes" className="text-muted-foreground">
                  Raw: {weapon.attack.raw}
                </Typography>
              </div>
            </div>

            {/* Affinity */}
            {weapon.attributes.affinity != null && weapon.attributes.affinity !== 0 && (
              <div className="flex items-center gap-2">
                <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10">
                  <Sparkles className={cn(
                    "size-4",
                    weapon.attributes.affinity > 0 ? "text-green-400" : "text-red-400"
                  )} />
                </div>
                <div>
                  <Typography
                    variant="h4"
                    className={cn(
                      "tabular-nums leading-none",
                      weapon.attributes.affinity > 0 ? "text-green-400" : "text-red-400"
                    )}
                  >
                    Affinity {weapon.attributes.affinity > 0 ? "+" : ""}{weapon.attributes.affinity}%
                  </Typography>
                </div>
              </div>
            )}

            {/* Defense */}
            {weapon.attributes.defense != null && weapon.attributes.defense !== 0 && (
              <div className="flex items-center gap-2">
                <div className="flex size-8 items-center justify-center rounded-lg bg-blue-500/10">
                  <Shield className="size-4 text-blue-400" />
                </div>
                <div>
                  <Typography variant="h4" className="tabular-nums leading-none text-blue-400">
                    Defense +{weapon.attributes.defense}
                  </Typography>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Upgrade path info */}
        <div className="flex items-center gap-2 rounded-lg border border-border bg-muted/30 px-3 py-2">
          {previous ? (
            <div className="flex items-center gap-1.5 text-xs">
              <Typography variant="notes" className="text-muted-foreground">Upgrades from</Typography>
              <Typography variant="notes" className="font-medium">{previous.name}</Typography>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 text-xs">
              <Typography variant="notes" className="text-muted-foreground">Base weapon</Typography>
              <Sparkles className="size-3 text-amber-400" />
            </div>
          )}
          {branches.length > 0 && (
            <>
              <span className="text-border">|</span>
              <div className="flex items-center gap-1.5 text-xs">
                <Typography variant="notes" className="text-muted-foreground">
                  Upgrades to {branches.length} {branches.length === 1 ? "weapon" : "weapons"}
                </Typography>
              </div>
            </>
          )}
        </div>

        {/* Elements */}
        {weapon.elements.length > 0 && (
          <div className="space-y-2">
            <Typography variant="notes" className="font-medium text-muted-foreground">
              Elements
            </Typography>
            <div className="flex flex-wrap gap-2">
              {weapon.elements.map((el, i) => (
                <div
                  key={i}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5",
                    ELEMENT_BG_COLORS[el.type],
                    el.hidden && "opacity-50"
                  )}
                >
                  <Typography
                    variant="notes"
                    className={cn("tabular-nums font-medium", ELEMENT_COLORS[el.type])}
                  >
                    {ELEMENT_LABELS[el.type]} {el.damage}
                  </Typography>
                  {el.hidden && (
                    <Badge variant="outline" className="text-[9px] h-4 px-1">
                      Hidden
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Sharpness */}
        {weapon.durability?.length > 0 && (
          <div className="space-y-2">
            <Typography variant="notes" className="font-medium text-muted-foreground">
              Sharpness
            </Typography>
            <SharpnessBar durability={weapon.durability} />
          </div>
        )}

        {/* Slots */}
        {weapon.slots.length > 0 && (
          <div className="space-y-2">
            <Typography variant="notes" className="font-medium text-muted-foreground">
              Slots
            </Typography>
            <div className="flex gap-1.5">
              {weapon.slots.map((slot, i) => (
                <div
                  key={i}
                  className="flex size-8 items-center justify-center rounded-md border border-border bg-muted/30"
                >
                  <Gem className="size-3.5 text-muted-foreground" />
                  <Typography variant="notes" className="ml-0.5 font-semibold tabular-nums">
                    {slot.rank}
                  </Typography>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Materials */}
        {materials.length > 0 && (
          <div className="space-y-2">
            <Typography variant="notes" className="font-medium text-muted-foreground">
              {weapon.crafting.craftable ? "Crafting Materials" : "Upgrade Materials"}
            </Typography>
            <div className="grid grid-cols-2 gap-2">
              {materials.map((m, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between rounded-lg border border-border bg-muted/20 px-3 py-1.5"
                >
                  <Typography variant="notes" className="truncate">
                    {m.item.name}
                  </Typography>
                  <Badge variant="secondary" className="shrink-0 text-[10px]">
                    ×{m.quantity}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Branches */}
        {branches.length > 0 && (
          <div className="space-y-2">
            <Typography variant="notes" className="font-medium text-muted-foreground">
              Upgrades Into
            </Typography>
            <div className="flex flex-wrap gap-2">
              {branches.map((w) => (
                <Badge key={w.id} variant="outline" className="text-xs gap-1.5">
                  {w.name}
                  <RarityBadge rarity={w.rarity}>R{w.rarity}</RarityBadge>
                </Badge>
              ))}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}