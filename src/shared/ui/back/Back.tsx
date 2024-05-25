import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import type { JSX, ReactNode } from 'react'

import './style.scss'

interface IBack {
  children?: Readonly<ReactNode[]> | null | Readonly<ReactNode>
  row?: boolean
}

const Back = ({ row = false }: IBack): JSX.Element => {
  const router = useRouter()

  const goBack = () => {
    router.replace('/rooms')
  }

  return (
    <section className={`back ${row ? 'row' : ''}`}>
      <button onClick={goBack} className='back-action'>
        <ArrowLeft />
        <p>Regresar</p>
      </button>
    </section>
  )
}

export default Back
