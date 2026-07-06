'use client'

import { Weapon } from "@/types/weapon"
import { ElementType } from "@/types"
import Typography from "./typography"
import RarityBadge from "./rarity-badge"
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
  weapon: Weapon
  onSelect: (weapon: Weapon) => void
}

export default function WeaponListItem({ weapon, onSelect }: Props) {
  const image = weapon.assets?.image
  const icon = weapon.assets?.icon

  return (
    <button
      onClick={() => onSelect(weapon)}
      className={cn(
        "group flex w-full items-center gap-3 rounded-lg border border-border bg-card px-4 py-3 text-left transition-all hover:border-primary/30 hover:bg-primary/5 hover:shadow-sm"
      )}
    >
      {/* Weapon icon */}
      <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted/50">
        {image ? (
          <Image
            src={image}
            alt={weapon.name}
            width={32}
            height={32}
            className="object-contain"
          />
        ) : icon ? (
          <Image
            src={icon}
            alt={weapon.name}
            width={24}
            height={24}
            className="object-contain"
          />
        ) : (
          <Typography variant="notes" className="text-muted-foreground">
            N/A
          </Typography>
        )}
      </div>

      {/* Name */}
      <div className="min-w-0 flex-1">
        <Typography variant="p" className="truncate font-medium">
          {weapon.name}
        </Typography>
      </div>

      {/* Attack */}
      <div className="hidden shrink-0 items-center gap-1 sm:flex">
        <Typography variant="notes" className="tabular-nums font-semibold text-muted-foreground">
          ATK {weapon.attack.display}
        </Typography>
      </div>

      {/* Damage type */}
      <div className="hidden shrink-0 lg:block">
        <Typography variant="notes" className="text-muted-foreground">
          {capitalize(weapon.damageType)}
        </Typography>
      </div>

      {/* Elements */}
      {weapon.elements.length > 0 && (
        <div className="hidden shrink-0 gap-2 md:flex">
          {weapon.elements.slice(0, 3).map((el, i) => (
            <Typography
              key={i}
              variant="notes"
              className={cn("tabular-nums", ELEMENT_COLORS[el.type], el.hidden && "opacity-50")}
            >
              {ELEMENT_LABELS[el.type]} {el.damage}
            </Typography>
          ))}
        </div>
      )}

      {/* Rarity */}
      <div className="shrink-0">
        <RarityBadge rarity={weapon.rarity}>R{weapon.rarity}</RarityBadge>
      </div>

      {/* Slots */}
      {weapon.slots.length > 0 && (
        <div className="hidden shrink-0 gap-0.5 sm:flex">
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

      {/* Chevron */}
      <ChevronRight className="size-4 shrink-0 text-muted-foreground/40 transition-transform group-hover:translate-x-0.5" />
    </button>
  )
}