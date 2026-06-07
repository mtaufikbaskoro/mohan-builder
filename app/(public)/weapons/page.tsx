import Typography from '@/components/shared/typography'
import { getWeaponType } from '@/services/weapon'
import Image from 'next/image'
import React from 'react'

interface UniqueWeapon {
    type: string,
    icon?: string
}

const Page = async () => {
    const uniqueWeapons: UniqueWeapon[] = await getWeaponType()

    return (
        <div className="w-full max-w-5xl grid grid-cols-3 gap-4">
            {uniqueWeapons.map(weapon => (
                    <div key={weapon.type} className="p-6 border-2 border-accent rounded-lg flex items-center gap-4">
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
                    </div> 
            ))}
        </div>
    )
}

export default Page