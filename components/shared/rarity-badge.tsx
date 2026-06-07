'use client'

import { ReactNode } from "react"
import { Badge } from "../ui/badge"
import { cn } from "@/lib/utils"

interface Palette {
    background: string,
    text: string
}

// 1. Move the color dictionary OUTSIDE the component so it doesn't get recreated on every render.
const RARITY_PALETTES: Record<number, Palette> = {
    1: { background: 'bg-slate-900/40 border-slate-400', text: 'text-slate-200' },
    2: { background: 'bg-lime-250/40 border-lime-500', text: 'text-lime-400' },
    3: { background: 'bg-cyan-250/40 border-cyan-500', text: 'text-cyan-400' },
    4: { background: 'bg-blue-250/40 border-blue-500', text: 'text-blue-400' },
    5: { background: 'bg-purple-250/40 border-purple-500', text: 'text-purple-400' },
    6: { background: 'bg-orange-250/40 border-orange-500', text: 'text-orange-400' },
    7: { background: 'bg-red-250/40 border-red-500', text: 'text-red-400' },
    8: { background: 'bg-amber-250/40 border-amber-500', text: 'text-amber-400' },
    9: { background: 'bg-sky-250/30 border-sky-300', text: 'text-sky-300' },
    10: { background: 'bg-fuchsia-250/30 border-fuchsia-300', text: 'text-fuchsia-300' },
    11: { background: 'bg-orange-250/30 border-orange-300', text: 'text-orange-300' },
    12: { background: 'bg-rose-250/30 border-rose-300', text: 'text-rose-300' },
}

const DEFAULT_PALETTE: Palette = {
    background: 'bg-slate-800/40 border-slate-400',
    text: 'text-slate-200'
}

type Props = {
    rarity: number,
    children: ReactNode
}
export default function RarityBadge ({ rarity, children }: Props) {
    const palette = RARITY_PALETTES[rarity] || DEFAULT_PALETTE

    return <Badge className={cn('text-xs', palette.background, palette.text)}>{children}</Badge>
}
