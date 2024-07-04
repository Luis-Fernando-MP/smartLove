'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { type JSX, type ReactNode } from 'react'
import { switchClass } from 'shared/helpers/switchClassName'

import './style.scss'

interface ISteps {
  children?: Readonly<ReactNode[]> | null | Readonly<ReactNode>
  total: number
  id: string
}

const Steps = ({ total, id }: ISteps): JSX.Element => {
  const pathname = usePathname()
  const baseUrlSteps = `/rooms/${id}`
  const activeStep3 = pathname === `${baseUrlSteps}/pay`
  const activeStep2 = pathname === `${baseUrlSteps}/requirements` || activeStep3
  return (
    <section className='room-steps'>
      <Link href={baseUrlSteps} className='room-step active'>
        <p>Habitación</p>
      </Link>
      <Link
        href={`${baseUrlSteps}/requirements`}
        className={`room-step ${switchClass(activeStep2)}`}
      >
        <p>Requisitos</p>
      </Link>
      <Link href={`${baseUrlSteps}/pay`} className={`room-step ${switchClass(activeStep3)}`}>
        <div>
          <span>Total</span>
          <h5>PEN {total}</h5>
        </div>
      </Link>
    </section>
  )
}

export default Steps
