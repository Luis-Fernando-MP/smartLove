import { PiIcon } from 'lucide-react'
import type { JSX, ReactNode } from 'react'
import { switchClass } from 'shared/helpers/switchClassName'

import './style.scss'

interface ICuteLittleBox {
  children?: Readonly<ReactNode[]> | null | Readonly<ReactNode>
  title: string
  subtitle: string | number
  Icon: typeof PiIcon
  active?: boolean
}

const CuteLittleBox = ({ Icon, subtitle, title, active = false }: ICuteLittleBox): JSX.Element => {
  return (
    <section className={`cuteLittleBox ${switchClass(active)}`}>
      <Icon className='cuteLittleBox-icon' />
      <p className='cuteLittleBox-title'>{title}</p>
      <h3>{subtitle}</h3>
    </section>
  )
}

export default CuteLittleBox
