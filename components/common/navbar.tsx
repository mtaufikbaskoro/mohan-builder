import React from 'react'
import Typography from '../shared/typography'
import { Button } from '../ui/button'

export default function Navbar () {
    return (
        <nav className='w-full h-12 bg-accent flex justify-center items-center'>
            <div className='w-full max-w-5xl font-sans text-sm px-5 flex justify-between items-center gap-20'>
                <Typography variant="h2">Mohan Builder</Typography>
                <ul className='flex flex-1 justify-end gap-6 items-center'>
                    <li>
                        <Button variant={"ghost"}>Monsters</Button>
                    </li>
                    <li>
                        <Button variant={"ghost"}>Weapons</Button>
                    </li>
                    <li>
                        <Button>Sign In</Button>
                    </li>
                </ul>
            </div>
        </nav>
    )
}