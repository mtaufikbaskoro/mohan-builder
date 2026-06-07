'use client'

import Link from "next/link"
import Image from 'next/image'
import { UniqueWeapon } from "./page"
import Typography from "@/components/shared/typography"

type Props = {
    uniqueWeapons: UniqueWeapon[]
}
const Content = ({ uniqueWeapons }: Props) => {
    return (
        <div className="w-full max-w-5xl space-y-4">
            <Typography variant="h1">List of Weapon Types</Typography>
            <hr />
            <div className="w-full max-w-5xl grid grid-cols-3 gap-4">
                {uniqueWeapons.map(weapon => (
                        <Link 
                            href={`/weapons/${weapon.type}`} 
                            key={weapon.type} 
                            className="p-6 border-2 border-accent rounded-lg flex items-center gap-4 hover:bg-accent/10 transition-colors"
                        >
                            { weapon.icon && 
                                <Image
                                    className="size-6"
                                    src={weapon.icon}
                                    alt="weapon-type-icon" 
                                    width={24}
                                    height={24}
                                    loading="eager"
                                />
                            }
                            <Typography className="capitalize" variant='h4'>{weapon.type.replaceAll('-', ' ')}</Typography>
                        </Link> 
                ))}
            </div>
        </div>
    )
}

export default Content
