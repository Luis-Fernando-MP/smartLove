'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { JSX, ReactNode } from 'react'

import './style.scss'

interface ISteps {
  children?: Readonly<ReactNode[]> | null | Readonly<ReactNode>
  total: number
  id: string
}

const Steps = ({ total, id }: ISteps): JSX.Element => {
  const pathname = usePathname()

  console.log(pathname)

  return (
    <section className='room-steps'>
      <Link
        href={`/rooms/${id}`}
        className={`room-step ${pathname.startsWith(`/rooms/${id}`) ? 'active' : ''}`}
      >
        Habitación
      </Link>
      <Link
        href={`/rooms/${id}/requirements`}
        className={`room-step ${pathname === `/rooms/${id}/requirements` ? 'active' : ''}`}
      >
        Requisitos
      </Link>
      <Link
        href={`/rooms/${id}/pay`}
        className={`room-step ${pathname === `/rooms/${id}/pay` ? 'active' : ''}`}
      >
        <div>
          <span>Total</span>
          <p>PEN {total}</p>
        </div>
      </Link>
    </section>
  )
}

export default Steps
