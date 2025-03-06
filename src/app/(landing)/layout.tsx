import { HOME_PATHS } from '@/shared/constants'
import Footer from '@/shared/ui/footer/Footer'
import { Link } from 'next-view-transitions'
import type { JSX, ReactNode } from 'react'
import Marquee from 'react-fast-marquee'

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
      <Nav />
      <main className='main'>
        <Header />
        <div className='main-static-header' />
        <Marquee autoFill gradientColor='var(--bg-primary)' gradient>
          {characteristics.map(characteristic => (
            <Characteristic key={characteristic.title} characteristic={characteristic} />
          ))}
        </Marquee>
      </main>
      <section className='main-content'>{children}</section>
      <Link href={HOME_PATHS.Resume.link} target='_blank' className='main-speed' rel='noreferrer'>
        SMART LOVE, San Juan de Miraflores 15058, en el sector Alipio Ponce lote 6
      </Link>
      <Footer />
    </>
  )
}

export default RootLayout
