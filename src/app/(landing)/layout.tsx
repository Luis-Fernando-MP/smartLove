import { Sansita_Swashed } from 'next/font/google'
import Image from 'next/image'
import type { JSX, ReactNode } from 'react'
import Header from 'shared/ui/header/Header'

import Nav from './components/nav/Nav'
import './style.scss'
import './userMobile.scss'

const sansitaSwashed = Sansita_Swashed({
  subsets: ['latin'],
  weight: ['900']
})

interface TRootLayout {
  children?: Readonly<ReactNode[]> | null | Readonly<ReactNode>
}

function RootLayout({ children }: TRootLayout): JSX.Element {
  return (
    <main className='home'>
      <Header />
      <section className='backgroundNav'>
        <Image
          className='backgroundNav-image'
          src='/homeBackground.webp'
          alt='home background'
          fill
        />
        <div className='backgroundNav-container'>
          <h1 className={sansitaSwashed.className}>
            <span>Reserva tu estancia con </span>
            <b>SmartPro</b>
          </h1>
          <h4>
            +1000 usuarios registrados y +35 habitaciones disponibles esperando
            por ti!
          </h4>
          <Nav />
        </div>
      </section>
      {children}
    </main>
  )
}

export default RootLayout
