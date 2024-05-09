import type { JSX } from 'react'
import { getCharacteristics } from 'services/getCharacteristics'
import Characteristics from 'shared/ui/characteristics/Characteristics'

import './style.scss'

const Resume = async (): Promise<JSX.Element> => {
  const characteristics = await getCharacteristics()

  return (
    <article className='resume'>
      <div className='resume-title'>
        <h2>HOTEL SMART PRO</h2>
        <p>
          Hotel de lujo con habitaciones LED, sensores, Rooftop, Bar y mucho
          más…
        </p>
      </div>
      <Characteristics characteristics={characteristics} />
    </article>
  )
}

export default Resume
