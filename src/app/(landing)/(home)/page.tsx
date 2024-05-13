import { MapPinned } from 'lucide-react'
import { type JSX } from 'react'
import { getCharacteristics } from 'services/getCharacteristics'
import Characteristics from 'shared/ui/characteristics/Characteristics'
import MapComponent from 'shared/ui/map/MapComponent'

import './style.scss'

const Resume = async (): Promise<JSX.Element> => {
  const characteristics = await getCharacteristics()

  return <article className='resume'>hola</article>
}

export default Resume
