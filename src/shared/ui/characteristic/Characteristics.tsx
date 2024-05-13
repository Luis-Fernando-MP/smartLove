import { Hotel } from 'lucide-react'
import type { JSX, ReactNode } from 'react'

import './style.scss'

export interface ICharacter {
  title: string
  Icon: typeof Hotel
}

interface ICharacteristic {
  children?: Readonly<ReactNode[]> | null
  characteristic: ICharacter
}

function Characteristic({ characteristic }: ICharacteristic): JSX.Element {
  const { Icon, title } = characteristic
  return (
    <section className='characteristic'>
      <p>{title}</p>
      <Icon />
    </section>
  )
}

export default Characteristic
