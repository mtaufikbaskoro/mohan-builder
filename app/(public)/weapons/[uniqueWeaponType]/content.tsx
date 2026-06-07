'use client'

import Typography from "@/components/shared/typography"
import WeaponListDisplay from "@/components/shared/weapon-list-display"
import { getWeaponIcon } from "@/services/weapon"
import { Weapon, WeaponType } from "@/types/weapon"
import Image from 'next/image'
import React from "react"

type Props = {
    weapons: Weapon[],
    weaponType: WeaponType
}
const Content = ({
    weapons,
    weaponType
}: Props) => {
    const baseWeapons = React.useMemo(() => {
        return weapons.filter(weapon => weapon.crafting.previous === null);
    }, [weapons]);

    const icon = getWeaponIcon(weaponType)

    return (
        <div className="w-full max-w-5xl space-y-4">
            <div className="flex justify-start items-center gap-4">
                { icon && (
                    <Image
                        className="size-10"
                        src={icon}
                        alt="weapon-type-icon" 
                        width={0}
                        height={0}
                        loading="eager"
                    />
                )}
                <Typography className="uppercase" variant="h1">{weaponType ? weaponType.replaceAll('-', ' ') : ''}</Typography>
            </div>
            <hr />
            <ul className="space-y-2">
                {baseWeapons && baseWeapons.map(weapon => (
                    <WeaponListDisplay key={weapon.id} weapon={weapon} />
                ))}
            </ul>
        </div>
    )
}

export default Content
