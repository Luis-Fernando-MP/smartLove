import Link from 'next/link'
import type { JSX, ReactNode } from 'react'
import Marquee from 'react-fast-marquee'
import { HOME_PATHS } from 'shared/constants'
import Footer from 'shared/ui/footer/Footer'

import characteristics from './characteristics.json'
import Characteristic from './components/characteristic/Characteristics'
import Header from './components/header/Header'
import Nav from './components/nav/Nav'
import './style.scss'
import './userMobile.scss'

interface TRootLayout {
  children?: Readonly<ReactNode[]> | null | Readonly<ReactNode>
}

function RootLayout({ children }: TRootLayout): JSX.Element {
  return (
    <>
      <main className='main'>
        <div className='main-static-header' />
        <Link href={HOME_PATHS.Resume.link} target='_blank' className='main-speed' rel='noreferrer'>
          SMART LOVE, San Juan de Miraflores 15058, en el sector Alipio Ponce lote 6
        </Link>
        <Nav />
        <Header />
        <Marquee autoFill gradientColor='var(--bg-primary)' gradient>
          {characteristics.map(characteristic => (
            <Characteristic key={characteristic.title} characteristic={characteristic} />
          ))}
        </Marquee>
        <section className='main-content'>{children}</section>
      </main>
      <Footer />
    </>
  )
}

export default RootLayout
