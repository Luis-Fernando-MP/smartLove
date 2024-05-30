'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { JSX, ReactNode } from 'react'

import useStepsRoom from '../../store/room.store'
import { stepsData } from './steps.data'
import './style.scss'

interface ISteps {
  children?: Readonly<ReactNode[]> | null | Readonly<ReactNode>
  total: number
  id: string
}

const Steps = ({ total, id }: ISteps): JSX.Element => {
  const { currentStep } = useStepsRoom()
  const pathname = usePathname()

  return (
    <section className='room-steps'>
      {stepsData({ id, totalMount: total, urlName: pathname }).map(step => {
        const { RenderStep, isActive, ref, value } = step
        const activeLink = value <= currentStep

        return (
          <Link
            key={ref}
            href={activeLink ? ref : ''}
            className={`room-step ${isActive && activeLink ? 'active' : 'inactive'}`}
          >
            {RenderStep}
          </Link>
        )
      })}
    </section>
  )
}

export default Steps
