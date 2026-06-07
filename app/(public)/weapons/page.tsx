import { getWeaponType } from '@/services/weapon'
import { WeaponType } from '@/types/weapon'
import Content from './content'

export interface UniqueWeapon {
    type: WeaponType,
    icon?: string
}

const Page = async () => {
    const uniqueWeapons: UniqueWeapon[] = await getWeaponType()

    return <Content uniqueWeapons={uniqueWeapons} />
}

export default Page