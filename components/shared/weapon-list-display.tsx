'use client'

import { Weapon } from "@/types/weapon"
import Typography from "./typography"
import { Button } from "../ui/button"
import { Eye } from "lucide-react"
import RarityBadge from "./rarity-badge"
import { capitalize } from "@/lib/format"

type Props = {
    weapon: Weapon
}
export default function WeaponListDisplay ({ weapon }: Props) {
    const { name, damageType, rarity, attack } = weapon

    return (
        <li className="px-2 py-1 w-full max-w-5xl border-2 border-accent rounded-lg flex justify-between items-center bg-gray-200">
            <div>
                <Typography variant="h3">{name}</Typography>
                <Typography variant="notes">
                    <RarityBadge rarity={rarity}>Rarity: {rarity}</RarityBadge>&nbsp;| {capitalize(damageType)} | Damage : {attack.display}
                </Typography>
            </div>
            <div>
                <Button variant={'outline'} size="icon"><Eye /></Button>
            </div>
        </li>
    )
}
