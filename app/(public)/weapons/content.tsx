'use client'

import Link from "next/link"
import Image from 'next/image'
import { UniqueWeapon } from "./page"
import Typography from "@/components/shared/typography"
import { Badge } from "@/components/ui/badge"

const BLADEMASTER: string[] = [
  "great-sword", "long-sword", "sword-and-shield", "dual-blades",
  "hammer", "hunting-horn", "lance", "gunlance",
  "switch-axe", "charge-blade", "insect-glaive",
]

const GUNNER: string[] = ["light-bowgun", "heavy-bowgun", "bow"]

type Props = {
  uniqueWeapons: UniqueWeapon[]
}

export default function Content({ uniqueWeapons }: Props) {
  const grouped = (types: string[]) =>
    uniqueWeapons.filter((w) => types.includes(w.type))

  const blademaster = grouped(BLADEMASTER)
  const gunner = grouped(GUNNER)

  return (
    <div className="w-full max-w-5xl space-y-8">
      <div>
        <Typography variant="h1">Weapons</Typography>
        <Typography variant="p" className="text-muted-foreground mt-1">
          {uniqueWeapons.length} weapon types · {uniqueWeapons.reduce((s, w) => s + w.count, 0)} total weapons
        </Typography>
      </div>

      <div className="space-y-6">
        <div>
          <Typography variant="h3" className="mb-3 text-muted-foreground">
            Blademaster
          </Typography>
          <div className="grid gap-3 sm:grid-cols-2">
            {blademaster.map((weapon) => (
              <Link
                href={`/weapons/${weapon.type}`}
                key={weapon.type}
                className="group flex items-center gap-4 rounded-xl border-2 border-border bg-card p-5 transition-all hover:border-primary/30 hover:shadow-lg hover:-translate-y-0.5"
              >
                {weapon.icon && (
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20">
                    <Image
                      className="size-8"
                      src={weapon.icon}
                      alt="weapon-type-icon"
                      width={32}
                      height={32}
                      loading="eager"
                    />
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <Typography className="capitalize" variant="h4">
                    {weapon.type.replaceAll("-", " ")}
                  </Typography>
                </div>
                <Badge variant="secondary" className="shrink-0">
                  {weapon.count} weapons
                </Badge>
              </Link>
            ))}
          </div>
        </div>

        <div>
          <Typography variant="h3" className="mb-3 text-muted-foreground">
            Gunner
          </Typography>
          <div className="grid gap-3 sm:grid-cols-2">
            {gunner.map((weapon) => (
              <Link
                href={`/weapons/${weapon.type}`}
                key={weapon.type}
                className="group flex items-center gap-4 rounded-xl border-2 border-border bg-card p-5 transition-all hover:border-primary/30 hover:shadow-lg hover:-translate-y-0.5"
              >
                {weapon.icon && (
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20">
                    <Image
                      className="size-8"
                      src={weapon.icon}
                      alt="weapon-type-icon"
                      width={32}
                      height={32}
                      loading="eager"
                    />
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <Typography className="capitalize" variant="h4">
                    {weapon.type.replaceAll("-", " ")}
                  </Typography>
                </div>
                <Badge variant="secondary" className="shrink-0">
                  {weapon.count} weapons
                </Badge>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}