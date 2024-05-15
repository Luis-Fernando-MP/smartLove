import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import type { JSX } from 'react'

import './style.scss'

const Back = (): JSX.Element => {
  const router = useRouter()

  const goBack = () => {
    router.replace('/rooms')
  }

  return (
    <section className='back'>
      <button onClick={goBack} className='back-action'>
        <ArrowLeft />
        <p>Regresar</p>
      </button>
    </section>
  )
}

export default Back
