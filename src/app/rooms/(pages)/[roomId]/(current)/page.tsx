'use client'

import { type JSX } from 'react'

import RecommendationController from './components/recommendation/RecommendationController'

const Page = (): JSX.Element => {
  return (
    <>
      <h4 className='text-center'>
        Otras <b className='gr'>Recomendaciones</b>
      </h4>
      <RecommendationController />
    </>
  )
}

export default Page
