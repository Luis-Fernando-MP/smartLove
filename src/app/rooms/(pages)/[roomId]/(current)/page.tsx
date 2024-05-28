'use client'

import { type JSX } from 'react'

import RecommendationController from './components/recommendation/RecommendationController'

const Page = (): JSX.Element => {
  return (
    <>
      <h5>Otras habitaciones recomendadas :)</h5>
      <RecommendationController />
    </>
  )
}

//
export default Page
