import { Monster, MonsterSpecies } from "@/types/monster"
import Typography from "./typography"
import ElementWeakness from "./element-weakness"
import { Badge } from "../ui/badge"
import { cn } from "@/lib/utils"
import { capitalize } from "@/lib/format"
import Link from "next/link"

const SPECIES_COLORS: Record<MonsterSpecies, string> = {
  "elder dragon": "bg-red-500/10 text-red-500 border-red-500/30",
  "flying wyvern": "bg-amber-500/10 text-amber-500 border-amber-500/30",
  "brute wyvern": "bg-orange-500/10 text-orange-500 border-orange-500/30",
  "fanged wyvern": "bg-yellow-500/10 text-yellow-500 border-yellow-500/30",
  "bird wyvern": "bg-green-500/10 text-green-500 border-green-500/30",
  "piscine wyvern": "bg-blue-500/10 text-blue-500 border-blue-500/30",
  "herbivore": "bg-lime-500/10 text-lime-500 border-lime-500/30",
  "neopteron": "bg-teal-500/10 text-teal-500 border-teal-500/30",
  "fanged beast": "bg-rose-500/10 text-rose-500 border-rose-500/30",
  "fish": "bg-cyan-500/10 text-cyan-500 border-cyan-500/30",
  "wingdrake": "bg-sky-500/10 text-sky-500 border-sky-500/30",
  "lynian": "bg-pink-500/10 text-pink-500 border-pink-500/30",
  "relict": "bg-slate-500/10 text-slate-500 border-slate-500/30",
}

type Props = {
  monster: Monster
}

export default function MonsterCard({ monster }: Props) {
  const weakness = monster.weakness ?? []
  const topWeaknesses = [...weakness]
    .sort((a, b) => b.stars - a.stars)
    .slice(0, 3)

  const locationNames = (monster.locations ?? [])
    .map((l) => l.name)
    .slice(0, 2)
    .join(", ")

  return (
    <Link
      href={`/monsters/${monster.id}`}
      className={cn(
        "group flex flex-col gap-2 rounded-xl border-2 border-border bg-card p-5 transition-all hover:border-primary/30 hover:shadow-lg hover:-translate-y-0.5"
      )}
    >
      <div className="flex items-start justify-between">
        <Typography variant="h3">{monster.name}</Typography>
        <Badge
          variant="outline"
          className={cn(
            "text-[10px] uppercase",
            monster.type === "large"
              ? "border-amber-500/50 text-amber-400"
              : "border-slate-500/50 text-slate-400"
          )}
        >
          {monster.type}
        </Badge>
      </div>

      <Badge
        variant="outline"
        className={cn("self-start text-[10px]", SPECIES_COLORS[monster.species])}
      >
        {capitalize(monster.species)}
      </Badge>

      {topWeaknesses.length > 0 && (
        <div className="flex flex-wrap gap-x-3 gap-y-1">
          {topWeaknesses.map((w) => (
            <ElementWeakness
              key={w.element}
              element={w.element}
              stars={w.stars}
            />
          ))}
        </div>
      )}

      {locationNames && (
        <Typography variant="notes" className="text-muted-foreground">
          {locationNames}
          {(monster.locations ?? []).length > 2 && ` +${(monster.locations ?? []).length - 2} more`}
        </Typography>
      )}
    </Link>
  )
}