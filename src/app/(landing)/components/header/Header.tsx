import { Star } from 'lucide-react'
import { Link } from 'next-view-transitions'
import type { JSX } from 'react'
import { HOME_PATHS } from 'shared/constants'
import { sansitaSwashed } from 'shared/fonts'

import './style.scss'
import './userMobile.scss'

function Header(): JSX.Element {
  return (
    <header className='headerApp'>
      <p>
        Hotel de lujo con habitaciones LED, sensores,
        <br />
        Rooftop, Bar y mucho más…
      </p>
      <h1 className={sansitaSwashed.className}>
        reserva tu estancia
        <br />
        con <b className='gr'>SmartPro</b>
      </h1>
      <h4>
        +1000 usuarios registrados y +35 habitaciones
        <br />
        disponibles esperando por ti!
      </h4>
      <Link href={HOME_PATHS.Rooms.link} className='headerApp-go'>
        Reservar ahora
      </Link>
      <section className='headerApp-starts'>
        <Star className='active' />
        <Star className='active' />
        <Star className='active' />
        <Star />
        <Star />
      </section>
    </header>
  )
}

export default Header
