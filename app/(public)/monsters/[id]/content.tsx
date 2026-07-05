'use client'

import { Monster, MonsterSpecies } from "@/types/monster"
import { ElementType } from "@/types"
import Typography from "@/components/shared/typography"
import ElementWeakness from "@/components/shared/element-weakness"
import RewardTable from "@/components/shared/reward-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { capitalize } from "@/lib/format"
import { cn } from "@/lib/utils"
import { ArrowLeft } from "lucide-react"
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
  monster: Monster
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-xl border-2 border-border bg-card p-5">
      <Typography variant="h3" className="mb-3">{title}</Typography>
      {children}
    </section>
  )
}

export default function Content({ monster }: Props) {
  const weaknesses = (monster.weakness ?? [])
    .filter((w) => w.stars > 0)
    .sort((a, b) => b.stars - a.stars)

  const resistances = (monster.resistances ?? []).filter(
    (r) => !weaknesses.some((w) => w.element === r.element)
  )

  return (
    <div className="w-full max-w-5xl space-y-6">
      <Button variant="ghost" size="sm">
        <Link href="/monsters" className="gap-1 inline-flex items-center">
          <ArrowLeft className="size-4" />
          Back to Monsters
        </Link>
      </Button>

      {/* Header */}
      <div className="flex flex-wrap items-center gap-3">
        <Typography variant="h1">{monster.name}</Typography>
        <Badge
          variant="outline"
          className={cn(
            "text-xs uppercase",
            monster.type === "large"
              ? "border-amber-500/50 text-amber-400"
              : "border-slate-500/50 text-slate-400"
          )}
        >
          {monster.type}
        </Badge>
        <Badge
          variant="outline"
          className={cn("text-xs", SPECIES_COLORS[monster.species])}
        >
          {capitalize(monster.species)}
        </Badge>
      </div>

      <hr />

      {monster.description && (
        <Typography variant="p" className="text-muted-foreground italic">
          &ldquo;{monster.description}&rdquo;
        </Typography>
      )}

      {/* Elements & Ailments */}
      <Section title="Elements & Ailments">
        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <Typography variant="notes" className="font-medium text-muted-foreground">
              Uses:
            </Typography>
            {monster.elements.length > 0
              ? monster.elements.map((el) => (
                  <Badge key={el} variant="outline" className={cn("text-xs", ELEMENT_COLORS[el])}>
                    {ELEMENT_LABELS[el]}
                  </Badge>
                ))
              : <Typography variant="notes" className="text-muted-foreground">None</Typography>}
          </div>
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <Typography variant="notes" className="font-medium text-muted-foreground">
              Inflicts:
            </Typography>
            {monster.ailments.length > 0
              ? monster.ailments.map((a) => (
                  <Badge key={a.id ?? a.name} variant="outline" className="text-xs border-red-500/30 text-red-400">
                    {a.name}
                  </Badge>
                ))
              : <Typography variant="notes" className="text-muted-foreground">None</Typography>}
          </div>
        </div>
      </Section>

      {/* Weaknesses */}
      <Section title="Weaknesses">
        {weaknesses.length > 0 ? (
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {weaknesses.map((w) => (
              <div key={w.element} className="flex flex-col">
                <ElementWeakness element={w.element} stars={w.stars} />
                {w.condition && (
                  <Typography variant="notes" className="text-muted-foreground text-[10px]">
                    ({w.condition})
                  </Typography>
                )}
              </div>
            ))}
          </div>
        ) : (
          <Typography variant="p" className="text-muted-foreground">No weakness data available.</Typography>
        )}

        {resistances.length > 0 && (
          <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1">
            <Typography variant="notes" className="font-medium text-muted-foreground">
              Resistances:
            </Typography>
            {resistances.map((r) => (
              <Badge key={r.element} variant="outline" className={cn("text-xs", ELEMENT_COLORS[r.element])}>
                {ELEMENT_LABELS[r.element]}
                {r.condition && <span className="ml-1 text-[10px] opacity-70">({r.condition})</span>}
              </Badge>
            ))}
          </div>
        )}
      </Section>

      {/* Locations */}
      <Section title="Locations">
        {monster.locations.length > 0 ? (
          <div className="grid gap-2 sm:grid-cols-2">
            {monster.locations.map((loc) => (
              <div key={loc.id} className="flex items-center justify-between rounded-lg border border-border px-4 py-2">
                <Typography variant="p">{loc.name}</Typography>
                <Typography variant="notes" className="text-muted-foreground">
                  {loc.zoneCount} zones{loc.camps ? ` · ${loc.camps.length} camps` : ""}
                </Typography>
              </div>
            ))}
          </div>
        ) : (
          <Typography variant="p" className="text-muted-foreground">No location data available.</Typography>
        )}
      </Section>

      {/* Rewards */}
      <Section title="Rewards">
        <RewardTable rewards={monster.rewards} />
      </Section>
    </div>
  )
}