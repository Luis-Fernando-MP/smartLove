import { DollarSignIcon, LucideBadgePlus } from 'lucide-react'
import type { JSX } from 'react'
import { sansitaSwashed } from 'shared/fonts'
import { getSlugOBJ } from 'shared/helpers/getSlugOBJ'
import parseServiceToIcon from 'shared/helpers/parseServiceToIcon'
import Back from 'shared/ui/back/Back'
import SlugTooltip from 'shared/ui/slugTooltip/slugTooltip'

import { useRoomStore } from '../../store/room.store'
import Steps from '../steps/Steps'
import './style.scss'

const Details = (): JSX.Element | null => {
  const { id, room } = useRoomStore()
  if (!room) return null
  const { contadorreserva, onSale, estado, precio, nombre, serviciosHabitacion } = room
  const { classSlug, tagSlug, slugDescription } = getSlugOBJ({
    counter: contadorreserva,
    onSale,
    itsFull: estado
  })

  return (
    <>
      <Back row />
      <Steps total={precio} id={id} />
      <section className='roomDetails' data-slug={tagSlug}>
        <SlugTooltip description={slugDescription} tag={tagSlug} className={classSlug} />
        <h1 className={`${sansitaSwashed.className} title`}>{nombre}</h1>
        <h3 className='roomDetails-characteristic'>
          <DollarSignIcon />
          <b>{precio}xDía</b>
        </h3>
        <span className='roomDetails-characteristic'>
          <LucideBadgePlus />
          <b>{contadorreserva} Reservas pasadas</b>
        </span>
      </section>
    </>
  )
}

export default Details
