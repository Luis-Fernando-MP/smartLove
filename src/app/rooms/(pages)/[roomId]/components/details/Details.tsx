import { CalendarClockIcon, DollarSignIcon, PlusIcon } from 'lucide-react'
import Link from 'next/link'
import type { JSX } from 'react'
import { sansitaSwashed } from 'shared/fonts'
import { getSlugs } from 'shared/helpers/getSlugOBJ'
import Back from 'shared/ui/back/Back'
import SlugTooltip from 'shared/ui/slugTooltip/slugTooltip'

import { useRoomStore } from '../../store/room.store'
import Steps from '../steps/Steps'
import './style.scss'

const Details = (): JSX.Element | null => {
  const { id, room } = useRoomStore()
  if (!room) return null
  const { contadorreserva, onSale, estado, precio, nombre, codigo } = room
  // const { classSlug, tagSlug, slugDescription } = getSlugs({
  //   counter: contadorreserva,
  //   onSale,
  //   itsFull: estado
  // })

  return (
    <>
      <Back row />
      <Steps total={precio} id={id} />
      {/* <section className='roomDetails' data-slug={tagSlug}> */}
      <section className='roomDetails'>
        {/* <SlugTooltip description={slugDescription} tag={tagSlug} className={classSlug} /> */}
        <h1 className={`${sansitaSwashed.className} title`}>{nombre}</h1>
        <div className='roomDetails-container'>
          <h5 className='roomDetails-characteristic'>
            <DollarSignIcon />
            <b>{precio}xDía</b>
          </h5>
          <span className='roomDetails-characteristic'>
            <PlusIcon />
            {contadorreserva} Reservas pasadas
          </span>
          <Link href={`/rooms/${codigo}/calendar`} className='roomDetails-calendar gr'>
            <CalendarClockIcon color='var(--tn-primary)' />
            <span>Ver calendario de actividades</span>
          </Link>
        </div>
      </section>
    </>
  )
}

export default Details
