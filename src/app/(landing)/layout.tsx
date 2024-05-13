import Link from 'next/link'
import type { JSX, ReactNode } from 'react'
import Marquee from 'react-fast-marquee'
import { getCharacteristics } from 'services/getCharacteristics'
import Characteristic from 'shared/ui/characteristic/Characteristics'
import Footer from 'shared/ui/footer/Footer'
import Header from 'shared/ui/header/Header'

import Nav from './components/nav/Nav'
import './style.scss'
import './userMobile.scss'

interface TRootLayout {
  children?: Readonly<ReactNode[]> | null | Readonly<ReactNode>
}

async function RootLayout({ children }: TRootLayout): Promise<JSX.Element> {
  const characteristics = await getCharacteristics()

  console.log(characteristics)

  return (
    <>
      <main className='home'>
        <div className='home-static-header' />
        <Link href='/' target='_blank' className='home-speed'>
          SMART LOVE, San Juan de Miraflores 15058, en el sector Alipio Ponce
          lote 6
        </Link>
        <Nav />
        <Header />
        <Marquee autoFill gradientColor='#fff' gradient>
          {characteristics.map(characteristic => (
            <Characteristic
              key={characteristic.title}
              characteristic={characteristic}
            />
          ))}
        </Marquee>
        <section className='home-content'>{children}</section>
      </main>
      <Footer />
    </>
  )
}

export default RootLayout
