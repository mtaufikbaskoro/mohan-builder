import { ElementType } from "@/types"
import { cn } from "@/lib/utils"

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
  element: ElementType
  stars: number
}

export default function ElementWeakness({ element, stars }: Props) {
  return (
    <span className={cn("inline-flex items-center gap-0.5 text-xs font-medium", ELEMENT_COLORS[element])}>
      {ELEMENT_LABELS[element]}
      <span className="text-yellow-500">
        {"★".repeat(stars)}
        {"☆".repeat(3 - stars)}
      </span>
    </span>
  )
}