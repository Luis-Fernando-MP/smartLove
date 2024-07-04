'use client'

import { Link } from 'next-view-transitions'
import 'next/navigation'
import { type JSX, useEffect, useMemo } from 'react'

import './style.scss'

const Page = (): JSX.Element => {
  const isNewPay = useMemo(() => localStorage.getItem('newPay') ?? '', [])

  useEffect(() => {
    const handleUnload = () => {
      localStorage.removeItem('newPay')
    }
    window.addEventListener('beforeunload', handleUnload)
    return () => window.removeEventListener('beforeunload', handleUnload)
  }, [])

  return (
    <article className='pay-success'>
      <h3>
        {isNewPay === '1'
          ? 'Su reserva ha sido registrada correctamente'
          : 'Verifique todas sus Reservas'}
      </h3>
      <p>Puede ver más detalles en /reserves</p>
      <Link href='/rooms/reservations' className='btn bgr'>
        Mis reservas
      </Link>
    </article>
  )
}

export default Page
