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

  const materials = weapon.crafting.craftable
    ? weapon.crafting.craftingMaterials
    : weapon.crafting.upgradeMaterials

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg">{weapon.name}</DialogTitle>
          <DialogDescription>
            {capitalize(weapon.type.replaceAll("-", " "))} · {capitalize(weapon.damageType)}
          </DialogDescription>
        </DialogHeader>

        <div className="flex gap-4">
          <div className="flex size-32 shrink-0 items-center justify-center rounded-lg bg-muted/50">
            {image ? (
              <Image
                src={image}
                alt={weapon.name}
                width={128}
                height={128}
                className="object-contain"
              />
            ) : icon ? (
              <Image
                src={icon}
                alt={weapon.name}
                width={64}
                height={64}
                className="object-contain"
              />
            ) : (
              <Typography variant="notes" className="text-muted-foreground">
                No image
              </Typography>
            )}
          </div>

          <div className="flex flex-1 flex-col gap-2">
            <div className="flex items-center gap-2">
              <RarityBadge rarity={weapon.rarity}>Rarity {weapon.rarity}</RarityBadge>
              {weapon.elderseal && (
                <Badge variant="outline" className="text-[10px] border-purple-500/30 text-purple-400">
                  {capitalize(weapon.elderseal)} Elderseal
                </Badge>
              )}
            </div>

            <Typography variant="h3" className="tabular-nums">
              ATK {weapon.attack.display}
            </Typography>
            <Typography variant="notes" className="text-muted-foreground">
              Raw: {weapon.attack.raw}
            </Typography>

            {weapon.attributes.affinity != null && weapon.attributes.affinity !== 0 && (
              <Typography variant="notes" className={weapon.attributes.affinity > 0 ? "text-green-400" : "text-red-400"}>
                Affinity: {weapon.attributes.affinity > 0 ? "+" : ""}{weapon.attributes.affinity}%
              </Typography>
            )}

            {weapon.attributes.defense != null && weapon.attributes.defense !== 0 && (
              <Typography variant="notes" className="text-blue-400">
                Defense: +{weapon.attributes.defense}
              </Typography>
            )}
          </div>
        </div>

        {weapon.elements.length > 0 && (
          <div className="space-y-1">
            <Typography variant="notes" className="font-medium text-muted-foreground">
              Elements
            </Typography>
            <div className="flex flex-wrap gap-x-3 gap-y-1">
              {weapon.elements.map((el, i) => (
                <Typography
                  key={i}
                  variant="notes"
                  className={cn("tabular-nums", ELEMENT_COLORS[el.type], el.hidden && "opacity-50")}
                >
                  {ELEMENT_LABELS[el.type]} {el.damage}
                  {el.hidden && <span className="text-[10px]"> (hidden)</span>}
                </Typography>
              ))}
            </div>
          </div>
        )}

        {weapon.durability?.length > 0 && (
          <div className="space-y-1">
            <Typography variant="notes" className="font-medium text-muted-foreground">
              Sharpness
            </Typography>
            <SharpnessBar durability={weapon.durability} />
          </div>
        )}

        {weapon.slots.length > 0 && (
          <div className="space-y-1">
            <Typography variant="notes" className="font-medium text-muted-foreground">
              Slots
            </Typography>
            <div className="flex gap-1">
              {weapon.slots.map((slot, i) => (
                <Badge key={i} variant="outline" className="size-6 items-center justify-center rounded-sm p-0 text-xs">
                  {slot.rank}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {materials.length > 0 && (
          <div className="space-y-1">
            <Typography variant="notes" className="font-medium text-muted-foreground">
              {weapon.crafting.craftable ? "Crafting Materials" : "Upgrade Materials"}
            </Typography>
            <div className="flex flex-wrap gap-2">
              {materials.map((m, i) => (
                <Badge key={i} variant="secondary" className="text-xs">
                  {m.item.name} ×{m.quantity}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {branches.length > 0 && (
          <div className="space-y-1">
            <Typography variant="notes" className="font-medium text-muted-foreground">
              Upgrades Into
            </Typography>
            <div className="flex flex-wrap gap-2">
              {branches.map((w) => (
                <Badge key={w.id} variant="outline" className="text-xs">
                  {w.name}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}