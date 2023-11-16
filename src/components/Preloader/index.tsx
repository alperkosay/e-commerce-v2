"use client"
import React from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

const Preloader = () => {

    return (
        <div className='fixed inset-0 grid place-items-center bg-background z-50'>
            <div className='max-w-sm w-full flex flex-col items-center gap-6'>
                <AiOutlineLoading3Quarters
                    size={50}
                    className='animate-spin'
                />
            </div>
        </div>
    )
}

export default Preloader
