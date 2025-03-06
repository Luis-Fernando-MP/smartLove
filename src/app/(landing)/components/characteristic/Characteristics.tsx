import parseServiceToIcon from '@/shared/helpers/parseServiceToIcon'
import type { JSX, ReactNode } from 'react'

import './style.scss'

export interface ICharacter {
  title: string
  icon: string
}

interface ICharacteristic {
  children?: Readonly<ReactNode[]> | null
  characteristic: ICharacter
}

function Characteristic({ characteristic }: ICharacteristic): JSX.Element {
  const { icon, title } = characteristic
  const { Icon } = parseServiceToIcon(icon)
  return (
    <section className='characteristic'>
      <Icon />
      <p>{title}</p>
    </section>
  )
}

export default Characteristic
