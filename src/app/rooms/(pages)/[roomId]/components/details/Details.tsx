import { sansitaSwashed } from '@/shared/fonts'
import { getSlugs } from '@/shared/helpers/getSlugOBJ'
import SlugTooltip from '@/shared/ui/slugTooltip/slugTooltip'
import { CalendarRange, DollarSignIcon, PlusIcon } from 'lucide-react'
import { Link } from 'next-view-transitions'
import type { JSX } from 'react'

import { useRoomStore } from '../../store/room.store'
import Steps from '../steps/Steps'
import './style.scss'

const Details = (): JSX.Element | null => {
  const room = useRoomStore(s => s.room)
  if (!room) return null
  const { reservationCount, price, name, id } = room
  const slugs = getSlugs({
    counter: reservationCount,
    itsFull: false
  })

  return (
    <>
      <Steps total={Number(price)} id={String(room.id)} />
      <section className='roomDetails'>
        <aside className='slugs'>
          {slugs.map(slug => {
            const { classSlug, tagSlug, slugDescription } = slug
            return <SlugTooltip key={tagSlug} description={slugDescription} tag={tagSlug} className={classSlug} />
          })}
        </aside>

        <h1 className={`${sansitaSwashed.className} title`}>{name}</h1>

        <div className='roomDetails-container'>
          <h5 className='roomDetails-dolar'>
            <DollarSignIcon />
            <b>{String(price)}xDía</b>
          </h5>
          <div className='roomDetails-characteristic'>
            <PlusIcon />
            <h4>{reservationCount} Reservas pasadas</h4>
          </div>
          <Link href={`/rooms/${id}/calendar`} className='roomDetails-calendar'>
            <CalendarRange color='var(--tn-primary)' />
            <h4>Ver calendario</h4>
          </Link>
        </div>
        <p className='roomDetails-description'>{room.description}</p>
      </section>
    </>
  )
}

export default Details
