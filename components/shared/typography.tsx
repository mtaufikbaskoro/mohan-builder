import { cn } from '@/lib/utils';
import React from 'react'

const variants = ['h1', 'h2', 'h3', 'h4', 'p'] as const

interface TypographyProps {
  variant: typeof variants[number];
  className?: string,
  children: React.ReactNode
}

export default function Typography({variant, className, children}: TypographyProps) {
    switch (variant) {
        case 'h1': return <h1 className={cn('text-4xl font-bold', className)}>{children}</h1>
        case 'h2': return <h2 className={cn('text-xl font-semibold', className)}>{children}</h2>
        case 'h3': return <h3 className={cn('text-lg font-medium', className)}>{children}</h3>
        case 'h4': return <h4 className={cn('text-md', className)}>{children}</h4>
        case 'p': return <p className={cn(className)}>{children}</p>
    }
}