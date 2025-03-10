import { PiIcon } from 'lucide-react'
import type { JSX, ReactNode } from 'react'

import './style.scss'

interface Props {
  children?: Readonly<ReactNode[]> | null | Readonly<ReactNode>
  title: string
  subtitle: string
  Icon: typeof PiIcon
}

const LittleBox = ({ Icon, subtitle, title }: Props): JSX.Element => {
  return (
    <section className={`littleBox`}>
      <Icon className='littleBox-icon' />
      <p className='littleBox-title'>{title}</p>
      <h3>{subtitle}</h3>
    </section>
  )
}

export default LittleBox
