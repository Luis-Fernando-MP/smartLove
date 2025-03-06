import { switchClass } from '@/shared/helpers/switchClassName'
import { ArrowLeft } from 'lucide-react'
import { Link } from 'next-view-transitions'
import type { JSX, ReactNode } from 'react'

import './style.scss'

interface IBack {
  children?: Readonly<ReactNode[]> | null | Readonly<ReactNode>
  row?: boolean
}

const Back = ({ row = false }: IBack): JSX.Element => {
  return (
    <section className={`back ${switchClass(row, 'row')}`}>
      <Link href='/rooms' className='back-action'>
        <ArrowLeft />
        <p>Regresar</p>
      </Link>
    </section>
  )
}

export default Back
