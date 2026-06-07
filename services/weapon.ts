import { getMHUrl } from "@/lib/api"


export async function getWeaponType() {
    const endpoint = '/weapons?p={"type":true,"assets.icon":true}'
    try {
        const response = await fetch(getMHUrl(endpoint))
        if (!response.ok) throw new Error('Failed to fetch weapon data.')

        const weapons = await response.json()
        const uniqueWeaponTypes = [];
        const seenTypes = new Set();
        
        for (const weapon of weapons) {
        if (!seenTypes.has(weapon.type)) {
            seenTypes.add(weapon.type);
            uniqueWeaponTypes.push({
            type: weapon.type,
            icon: weapon.assets?.icon || null
            });
        }
        }
        
        return uniqueWeaponTypes;
    } catch (error) {
        console.error("Error fetching weapon types:", error);
        return [];
    }
}

