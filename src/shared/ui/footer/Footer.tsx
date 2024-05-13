/* eslint-disable react/jsx-no-target-blank */
import Link from 'next/link'
import type { JSX } from 'react'
import { WHATSAPP_URL } from 'shared/constants'
import { mada } from 'shared/fonts'

import './style.scss'
import './userMobile.scss'

function Footer(): JSX.Element {
  return (
    <footer className='footer'>
      <article className='footer-container'>
        <section className='footer-description'>
          <h3>Smart Pro</h3>
          <h5 className={mada.className}>
            Tu hotel favorito en la ciudad, donde la
            <br /> comodidad y la tecnología se unen para <br />
            ofrecerte una experiencia única.
          </h5>
        </section>
        <aside className='footer-paths'>
          <h5>
            <Link href={WHATSAPP_URL} target='_blank'>
              Ayuda
            </Link>
          </h5>
          <Link href='/faq'>FAQ</Link>
          <Link href='/support'>Soporte</Link>
          <Link href='/polices'>Políticas</Link>
        </aside>
      </article>
      <span>SmartLove©2024</span>
    </footer>
  )
}

export default Footer
