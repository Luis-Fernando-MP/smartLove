import { newKey } from '@/shared/key'
import type { JSX } from 'react'

const RoomsLoader = (): JSX.Element => {
  return (
    <div className='flex w-full flex-col gap-3'>
      <h3>
        Estamos <b className='gr'>cangando</b> el contenido :)
      </h3>
      <p className='skeleton h-5 w-1/3' />
      <p className='skeleton h-5 w-2/12' />
      <div className='flex flex-wrap gap-3'>
        {new Array(10).fill(Math.random()).map(() => (
          <div key={newKey()} className='skeleton-co h-90 w-64 p-4'>
            <div className='skeleton h-32 w-full' />
            <div className='skeleton m-auto mt-4 h-6 w-3/4' />
            <div className='mt-2 space-y-2'>
              <div className='skeleton h-4 w-full' />
              <div className='skeleton h-4 w-5/6' />
              <div className='skeleton h-4 w-4/6' />
              <div className='skeleton h-4 w-4/12' />
            </div>
            <div className='skeleton mt-4 h-7 w-full' />
          </div>
        ))}
      </div>
    </div>
  )
}

export default RoomsLoader
