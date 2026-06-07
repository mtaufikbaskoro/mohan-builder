import { WeaponProvider } from "@/context/weapon-context"
import { ReactNode } from "react"

export default function Layout({
    children
}: {
    children: ReactNode
}) {
    return <WeaponProvider>{children}</WeaponProvider>
}