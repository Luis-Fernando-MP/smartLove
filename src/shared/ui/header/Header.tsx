import { Hotel } from 'lucide-react'
import { Mada, Yeseva_One } from 'next/font/google'
import Link from 'next/link'
import type { JSX } from 'react'

import './style.scss'
import './userMobile.scss'

const yesevaOne = Yeseva_One({
  subsets: ['latin'],
  weight: ['400']
})

const mada = Mada({
  subsets: ['latin'],
  weight: ['300']
})

function Header(): JSX.Element {
  return (
    <header className='headerApp'>
      <Link href='/' className='headerApp-brand'>
        <div className='headerApp-brand__hotel'>
          <Hotel size={30} />
        </div>
        <div className='headerApp-brand__titleBox'>
          <h2 className={yesevaOne.className}>Smart Pro</h2>
          <h5 className={mada.className}>Hotel sauna rooftop bar</h5>
        </div>
      </Link>
      <article className='headerApp-account'>
        <button className='btn'>Regístrate</button>
        <button className='btn'>Ingresar</button>
      </article>
    </header>
  )
}

export default Header
