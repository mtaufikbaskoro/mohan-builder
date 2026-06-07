'use client'

import { Weapon } from "@/types/weapon"
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react"

interface WeaponContextType {
    weapons: Weapon[],
    setWeapons: Dispatch<SetStateAction<Weapon[]>>
}
const WeaponContext = createContext<WeaponContextType | undefined>(undefined)

interface WeaponProviderProps {
    children: ReactNode
}
export function WeaponProvider({ children }: WeaponProviderProps) {
    const [ weapons, setWeapons ] = useState<Weapon[]>([])

    return (
        <WeaponContext.Provider value={{ 
            weapons,
            setWeapons
        }}>
            {children}
        </WeaponContext.Provider>
    )
}

export function useWeapon() {
    const context = useContext(WeaponContext)
    if (context === undefined) {
        throw new Error('useWeapon must be inside WeaponProvider.')
    }
    return context
}
