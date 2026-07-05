'use client'

import { useState, useMemo } from "react"
import Typography from "@/components/shared/typography"
import WeaponTree from "@/components/shared/weapon-tree"
import WeaponDetailModal from "@/components/shared/weapon-detail-modal"
import { getWeaponIcon } from "@/lib/weapon-icons"
import { Weapon, WeaponType } from "@/types/weapon"
import Image from "next/image"

type Props = {
  weapons: Weapon[]
  weaponType: WeaponType
}

export default function Content({ weapons, weaponType }: Props) {
  const [selectedWeapon, setSelectedWeapon] = useState<Weapon | null>(null)
  const [open, setOpen] = useState(false)

  const weaponMap = useMemo(() => {
    const map = new Map<number, Weapon>()
    for (const w of weapons) {
      map.set(w.id, w)
    }
    return map
  }, [weapons])

  const rootWeapons = useMemo(
    () => weapons.filter((w) => w.crafting.previous === null),
    [weapons]
  )

  const handleSelect = (weapon: Weapon) => {
    setSelectedWeapon(weapon)
    setOpen(true)
  }

  const icon = getWeaponIcon(weaponType)
  const totalWeapons = weapons.length

  return (
    <div className="w-full max-w-5xl space-y-6">
      <div className="flex items-center gap-4">
        {icon && (
          <Image
            className="size-10"
            src={icon}
            alt="weapon-type-icon"
            width={0}
            height={0}
            loading="eager"
          />
        )}
        <Typography className="uppercase" variant="h1">
          {weaponType.replaceAll("-", " ")}
        </Typography>
      </div>

      <Typography variant="p" className="text-muted-foreground">
        {rootWeapons.length} upgrade trees · {totalWeapons} weapons
      </Typography>

      <hr />

      {rootWeapons.length === 0 ? (
        <Typography variant="p" className="text-muted-foreground">
          No weapons found for this type.
        </Typography>
      ) : (
        <div className="space-y-1">
          {rootWeapons.map((root) => (
            <WeaponTree
              key={root.id}
              weaponId={root.id}
              weaponMap={weaponMap}
              onSelect={handleSelect}
            />
          ))}
        </div>
      )}

      <WeaponDetailModal
        weapon={selectedWeapon}
        weaponMap={weaponMap}
        open={open}
        onOpenChange={setOpen}
      />
    </div>
  )
}