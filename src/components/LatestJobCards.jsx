import React from 'react'
import { Badge } from './ui/badge'

function LatestJobCards() {
  return (
    <div className="p-6 rounded-lg shadow-lg bg-white border border-gray-200 hover:shadow-xl transition-shadow duration-300 ease-in-out cursor-pointer transform hover:-translate-y-1">
        <div>
        <h1 className='font-medium text-lg'>Company Name</h1>
        <p className='text-sm text-grayColor'>India</p>
        </div>
        <div>
            <h1 className='font-bold text-lg my-2'>Job Title</h1>
            <p className='text-sm text-grayColor'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, officia.</p>
        </div>
        <div className='flex item-center gap-2 mt-4'>
            <Badge className={'text-blueColor font-bold'} variant = "ghost">12 Openings</Badge>
            <Badge className={'text-redColor font-bold'} variant = "ghost">Part Time</Badge>
            <Badge className={'text-purpleColor font-bold'} variant = "ghost">24 LPA</Badge>
        </div>
        </div>
  )
}

export default LatestJobCards