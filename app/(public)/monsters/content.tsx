'use client'

import { useState } from "react"
import { Monster, MonsterType } from "@/types/monster"
import Typography from "@/components/shared/typography"
import MonsterCard from "@/components/shared/monster-card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type FilterOption = "all" | MonsterType

type Props = {
  monsters: Monster[]
}

export default function Content({ monsters }: Props) {
  const [filter, setFilter] = useState<FilterOption>("all")

  const largeCount = monsters.filter((m) => m.type === "large").length
  const smallCount = monsters.filter((m) => m.type === "small").length

  const filtered = filter === "all" ? monsters : monsters.filter((m) => m.type === filter)

  return (
    <div className="w-full max-w-5xl space-y-6">
      <Typography variant="h1">Monsters</Typography>
      <hr />

      <div className="flex gap-2">
        {([
          { key: "all", label: `All (${monsters.length})` },
          { key: "large", label: `Large (${largeCount})` },
          { key: "small", label: `Small (${smallCount})` },
        ] as const).map(({ key, label }) => (
          <Button
            key={key}
            variant="ghost"
            size="sm"
            onClick={() => setFilter(key)}
            className={cn(
              "rounded-full",
              filter === key && "bg-primary/10 text-primary hover:bg-primary/20"
            )}
          >
            {label}
          </Button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((monster) => (
          <MonsterCard key={monster.id} monster={monster} />
        ))}
      </div>
    </div>
  )
}