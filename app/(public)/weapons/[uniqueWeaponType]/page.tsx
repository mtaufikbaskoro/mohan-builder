import { getWeaponByType } from '@/services/weapon'
import { Weapon, WeaponType } from '@/types/weapon'
import Content from './content'

const Page = async ({
    params
}: {
    params: Promise<{ uniqueWeaponType: WeaponType }>
}) => {
    const { uniqueWeaponType } = await params
    const weapons: Weapon[] = await getWeaponByType(uniqueWeaponType)

    return <Content weaponType={uniqueWeaponType} weapons={weapons} />
}

export default Page