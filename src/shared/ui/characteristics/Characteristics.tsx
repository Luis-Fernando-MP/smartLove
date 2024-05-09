import { Hotel } from 'lucide-react'
import Link from 'next/link'
import type { JSX, ReactNode } from 'react'

import './style.scss'

export interface ICharacter {
  title: string
  Icon: typeof Hotel
}

interface ICharacteristics {
  children?: Readonly<ReactNode[]> | null
  characteristics: ICharacter[]
}

function Characteristics({ characteristics }: ICharacteristics): JSX.Element {
  return (
    <ul className='characteristics'>
      {characteristics.map(character => {
        return (
          <li key={character.title} className='characteristics-item'>
            <character.Icon />
            <p>{character.title}</p>
          </li>
        )
      })}
      <Link href='/' className='characteristics-link'>
        Ver todos los Servicios
      </Link>
    </ul>
  )
}

export default Characteristics
