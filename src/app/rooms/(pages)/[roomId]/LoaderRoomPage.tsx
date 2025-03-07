import { newKey } from '@/shared/key'
import type { JSX } from 'react'

import NavContainer from '../../components/navContainer/NavContainer'

const LoaderRoomPage = (): JSX.Element => {
  return (
    <main className='dashboard-main room'>
      <NavContainer className='roomNav'>
        <h3 className='text-center'>
          <b className='gr'>Cangando</b> las imágenes
        </h3>
        <div className='flex w-full flex-wrap gap-2'>
          {new Array(5).fill(Math.random()).map(key => (
            <div key={newKey()} className='skeleton-co -lg flex h-96 w-64 flex-col gap-1 p-4'>
              <div className='skeleton -md h-full w-full' />
              <div className='skeleton mt-4 h-7 w-full' />
            </div>
          ))}
        </div>
      </NavContainer>
      <article className='dashboard-body'>
        <div className='h-full w-full'>
          <button className='skeleton mt-2 h-8 w-20' />
          <div className='skeleton mx-auto mt-2 h-10 w-1/2' />
          <div className='skeleton mx-auto mt-3 h-14 w-1/3' role='none' />
          <p className='skeleton mx-auto mt-2 h-5 w-1/6' role='none' />
          <p className='skeleton mx-auto mt-2 h-5 w-1/6' role='none' />
          <div className='skeleton mx-auto mt-5 h-24 w-1/2' />
          <div className='skeleton mx-auto mt-2 h-8 w-32' />
          <p className='skeleton mx-auto mt-2 h-5 w-1/6' role='none' />
        </div>
      </article>
    </main>
  )
}

export default LoaderRoomPage
