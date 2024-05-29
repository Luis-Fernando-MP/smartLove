'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { type JSX } from 'react'

import RecommendationController from './components/recommendation/RecommendationController'
import './style.scss'

const Page = (): JSX.Element => {
  const path = usePathname()
  return (
    <>
      <Link href={`${path}/requirements`} className='btn currentRoom-continue'>
        Continuar con la Reserva
      </Link>
      <h4 className='text-center'>
        Otras <b className='gr'>Recomendaciones</b>
      </h4>
      <RecommendationController />
    </>
  )
}

export default Page
