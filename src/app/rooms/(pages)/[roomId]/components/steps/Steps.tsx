import type { JSX, ReactNode } from 'react'

import './style.scss'

interface ISteps {
  children?: Readonly<ReactNode[]> | null | Readonly<ReactNode>
  total: number
}

const Steps = ({ total }: ISteps): JSX.Element => {
  return (
    <section className='room-steps'>
      <button className='room-step active'>Habitación</button>
      <button className='room-step'>Requisitos</button>
      <button className='room-step'>
        <div>
          <span>Total</span>
          <p>PEN {total}</p>
        </div>
      </button>
    </section>
  )
}

export default Steps
