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
}

export default function WeaponCard({ weapon }: Props) {
  const image = weapon.assets?.image
  const icon = weapon.assets?.icon

  return (
    <div
      className={cn(
        "flex gap-4 rounded-xl border-2 border-border bg-card p-4 transition-all hover:border-primary/30 hover:shadow-lg"
      )}
    >
      <div className="flex size-20 shrink-0 items-center justify-center rounded-lg bg-muted/50">
        {image ? (
          <Image
            src={image}
            alt={weapon.name}
            width={64}
            height={64}
            className="object-contain"
          />
        ) : icon ? (
          <Image
            src={icon}
            alt={weapon.name}
            width={40}
            height={40}
            className="object-contain"
          />
        ) : (
          <Typography variant="notes" className="text-muted-foreground">N/A</Typography>
        )}
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <div className="flex items-center gap-2">
          <Typography variant="h3" className="truncate">{weapon.name}</Typography>
          <RarityBadge rarity={weapon.rarity}>R{weapon.rarity}</RarityBadge>
        </div>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <Typography variant="notes" className="font-semibold tabular-nums">
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

        {weapon.slots.length > 0 && (
          <div className="flex gap-1">
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

        {weapon.durability?.length > 0 && (
          <SharpnessBar durability={weapon.durability} />
        )}
      </div>
    </div>
  )
}