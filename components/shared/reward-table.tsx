import { MonsterReward, RewardCondition } from "@/types/monster"
import { Rank } from "@/types"
import Typography from "./typography"
import RarityBadge from "./rarity-badge"
import { Badge } from "../ui/badge"
import { capitalize } from "@/lib/format"
import { cn } from "@/lib/utils"

const RANK_COLORS: Record<Rank, string> = {
  low: "bg-green-500/10 text-green-400 border-green-500/30",
  high: "bg-blue-500/10 text-blue-400 border-blue-500/30",
  master: "bg-purple-500/10 text-purple-400 border-purple-500/30",
}

type FlatReward = {
  itemName: string
  itemRarity: number
  source: string
  rank: Rank
  quantity: number
  chance: number
}

function flattenRewards(rewards: MonsterReward[]): FlatReward[] {
  return rewards.flatMap((r) =>
    r.conditions.map((c: RewardCondition) => ({
      itemName: r.item.name,
      itemRarity: r.item.rarity,
      source: sourceLabel(c),
      rank: c.rank,
      quantity: c.quantity,
      chance: c.chance,
    }))
  )
}

function sourceLabel(c: RewardCondition): string {
  const subtype = c.subtype && c.subtype !== "None" ? ` (${c.subtype})` : ""
  return `${capitalize(c.type)}${subtype}`
}

type Props = {
  rewards: MonsterReward[]
}

export default function RewardTable({ rewards }: Props) {
  const rows = flattenRewards(rewards)
  if (rows.length === 0) {
    return (
      <Typography variant="p" className="text-muted-foreground">
        No reward data available.
      </Typography>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-border">
            <th className="py-2 pr-4 font-medium text-muted-foreground">Item</th>
            <th className="py-2 pr-4 font-medium text-muted-foreground">Source</th>
            <th className="py-2 pr-4 font-medium text-muted-foreground">Rank</th>
            <th className="py-2 pr-4 font-medium text-muted-foreground text-right">Qty</th>
            <th className="py-2 font-medium text-muted-foreground text-right">Chance</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              className={cn(
                "border-b border-border/50",
                i % 2 === 0 && "bg-muted/20"
              )}
            >
              <td className="py-2 pr-4">
                <div className="flex items-center gap-2">
                  <Typography variant="notes" className="font-medium">
                    {row.itemName}
                  </Typography>
                  <RarityBadge rarity={row.itemRarity}>R{row.itemRarity}</RarityBadge>
                </div>
              </td>
              <td className="py-2 pr-4">
                <Typography variant="notes" className="text-muted-foreground">
                  {row.source}
                </Typography>
              </td>
              <td className="py-2 pr-4">
                <Badge
                  variant="outline"
                  className={cn("text-[10px] uppercase", RANK_COLORS[row.rank])}
                >
                  {row.rank}
                </Badge>
              </td>
              <td className="py-2 pr-4 text-right">
                <Typography variant="notes" className="text-muted-foreground">
                  x{row.quantity}
                </Typography>
              </td>
              <td className="py-2 text-right">
                <Typography
                  variant="notes"
                  className={cn(
                    row.chance >= 50
                      ? "text-green-400"
                      : row.chance >= 20
                        ? "text-yellow-400"
                        : "text-red-400"
                  )}
                >
                  {row.chance}%
                </Typography>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}