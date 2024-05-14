import Link from 'next/link'
import type { JSX } from 'react'
import Facebook from 'shared/assets/Facebook'
import Tiktok from 'shared/assets/Tiktok'
import WhatsApp from 'shared/assets/WhatsApp'
import { FACEBOOK_URL, TIKTOK_URL, WHATSAPP_URL } from 'shared/constants'

import style from './style.module.scss'

function Social(): JSX.Element {
  return (
    <article className={style.social}>
      <Link href={WHATSAPP_URL} target='_blank' rel='noreferrer'>
        <WhatsApp />
      </Link>
      <Link href={FACEBOOK_URL} target='_blank' rel='noreferrer'>
        <Facebook />
      </Link>
      <Link href={TIKTOK_URL} target='_blank' rel='noreferrer'>
        <Tiktok />
      </Link>
    </article>
  )
}

export default Social
