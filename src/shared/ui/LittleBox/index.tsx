import { switchClass } from '@/shared/helpers/switchClassName'
import { PiIcon } from 'lucide-react'
import type { JSX, ReactNode } from 'react'

import './style.scss'

interface Props {
  children?: Readonly<ReactNode[]> | null | Readonly<ReactNode>
  title: string
  subtitle: string
  Icon: typeof PiIcon
  active?: boolean
}

const LittleBox = ({ Icon, subtitle, title, active = false }: Props): JSX.Element => {
  return (
    <section className={`littleBox ${switchClass(active)}`}>
      <Icon className='littleBox-icon' />
      <p className='littleBox-title'>{title}</p>
      <h3>{subtitle}</h3>
    </section>
  )
}

export default LittleBox
