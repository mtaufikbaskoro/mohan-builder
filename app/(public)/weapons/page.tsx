import Image from 'next/image'
import React from 'react'

const Page = () => {
    return (
            <div>
                <Image
                    src="https://assets.mhw-db.com/weapons/great-sword/icons/83b9e1fa727ca6ba922b53a42626a167.26ad6221e21811da5278502fabfc138b33d622bc.png"
                    alt="great-sword-icon"
                    width={40}
                    height={40}
                    loading='eager'
                />
            </div>
        )
}

export default Page