import { WeaponSharpness } from "@/types/weapon"

const SHARPNESS_COLORS: Record<string, string> = {
  red: "bg-red-600",
  orange: "bg-orange-500",
  yellow: "bg-yellow-400",
  green: "bg-green-500",
  blue: "bg-blue-500",
  white: "bg-white",
  purple: "bg-purple-500",
}

type Props = {
  durability: WeaponSharpness[]
}

export default function SharpnessBar({ durability }: Props) {
  const sharpness = durability[0]
  if (!sharpness) return null

  const segments = (Object.keys(sharpness) as (keyof WeaponSharpness)[]).map(
    (color) => ({
      color,
      value: sharpness[color],
    })
  )

  const total = segments.reduce((sum, s) => sum + s.value, 0)
  if (total === 0) return null

  return (
    <div className="flex h-3 w-full max-w-[200px] overflow-hidden rounded-sm border border-border">
      {segments.map((s) =>
        s.value > 0 ? (
          <div
            key={s.color}
            className={SHARPNESS_COLORS[s.color]}
            style={{ width: `${(s.value / total) * 100}%` }}
          />
        ) : null
      )}
    </div>
  )
}