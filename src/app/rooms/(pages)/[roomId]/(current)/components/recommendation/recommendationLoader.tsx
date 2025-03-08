'use client'

import { newKey } from '@/shared/key'
import { type JSX } from 'react'

const recommendationLoader = (): JSX.Element => {
  return (
    <div className='skeleton-co flex w-[900px] flex-col items-center gap-3'>
      <h5>
        Estamos <b className='gr'>cangando</b> el contenido 🏙️
      </h5>
      {new Array(10).fill(Math.random()).map(key => (
        <section key={newKey(key)} className='skeleton h-90 flex w-[750px] flex-col items-center justify-center gap-2 p-4'>
          <div className='skeleton-co mx-auto mb-1 h-[100px] w-full' />
          <div className='skeleton-co mx-auto mb-1 h-6 w-3/4' />
          <div className='skeleton-co mx-auto mb-1 h-6 w-2/5' />
          <div className='skeleton-co mx-auto mb-2 h-[80px] w-full' />
          <div className='m-auto flex justify-center gap-1'>
            <div className='skeleton-co h-7 w-[100px]' />
            <div className='skeleton-co h-7 w-[100px]' />
          </div>
        </section>
      ))}
    </div>
  )
}

export default recommendationLoader
