import { SHUN_DEV, WHATSAPP_URL } from '@/shared/constants'
import { Link } from 'next-view-transitions'
import type { JSX } from 'react'

import './style.scss'
import './userMobile.scss'

function Footer({ className }: { className?: string }): JSX.Element {
  return (
    <footer className={`footer ${className ?? ''}`}>
      <article className='footer-container'>
        <section className='footer-description'>
          <h3>Smart Pro</h3>
          <h5>
            Tu hotel favorito en la ciudad, donde la
            <br /> comodidad y la tecnología se unen para <br />
            ofrecerte una experiencia única.
          </h5>
        </section>
        <aside className='footer-paths'>
          <Link href={SHUN_DEV} target='_blank' rel='noopener noreferrer'>
            <h5 className='gr font3'>Shuni Dev</h5>
          </Link>
          <h5>
            <Link href={WHATSAPP_URL} target='_blank' rel='noopener noreferrer'>
              Ayuda
            </Link>
          </h5>
          <Link href='/support'>Resumen</Link>
          <Link href='/polices'>Políticas</Link>
        </aside>
      </article>
      <span>SmartLove©2024</span>
    </footer>
  )
}

export default Footer
