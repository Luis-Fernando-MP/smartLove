'use client'

import { TClientReservation } from 'app/api/reservation/by-user/[idUser]/route'
import dayjs from 'dayjs'
import { LoaderCircle, NotebookTabs, Printer, Repeat, XIcon } from 'lucide-react'
import { type JSX, type ReactNode } from 'react'
import { sansitaSwashed } from 'shared/fonts'
import { breakDownDate } from 'shared/helpers/formatDate'
import { switchClass } from 'shared/helpers/switchClassName'
import ToggleLogo from 'shared/ui/colorSchemeButton/ToggleLogo'
import CuteLittleBox from 'shared/ui/cuteLittleBox/CuteLittleBox'

import './style.scss'
import useReserve, { littleBoxData } from './useReserve'

interface IReserve {
  children?: Readonly<ReactNode[]> | null | Readonly<ReactNode>
  reserve: TClientReservation
}

const Reserve = ({ reserve }: IReserve): JSX.Element => {
  const { handlePrint, loading, refReservePrint, setReservation, isReading } = useReserve({
    reserve
  })

  const scroll = () => {
    if (typeof window === 'undefined' || refReservePrint?.current) return
    const parent = document.querySelector('.reservations.dashboard-body__reservations')
    if (!parent || parent instanceof HTMLElement) return

    parent.scrollTo({
      top: refReservePrint.current?.offsetTop,
      behavior: 'smooth'
    })
  }

  scroll()

  const { checkIn, checkOut, room, id, createdAt } = reserve
  const from = breakDownDate(dayjs(checkIn).toString())
  const to = breakDownDate(dayjs(checkOut).toString())
  const date = dayjs(createdAt)

  return (
    <article className={`reserve ${switchClass(isReading)}`} ref={refReservePrint}>
      <button
        className='reserve-container'
        onClick={() => {
          setReservation(isReading ? null : reserve)
        }}
      >
        <ToggleLogo />
        <h3 className={`${sansitaSwashed.className} center`}>{room.name}</h3>
        <section className='reserve-operations'>
          <div className='reserve-operation'>
            <h4>Ope.</h4>
            <h5 className='gr'>{id}</h5>
          </div>
          <div className='reserve-operation'>
            <h4>Hora</h4>
            <p>{date.format('hh:mm A')}</p>
          </div>
          <div className='reserve-operation'>
            <h4>Fecha</h4>
            {date.format('DD/MM/YY')}{' '}
          </div>
        </section>

        <section className='reserve-littleBoxes'>
          {littleBoxData(reserve).map(i => {
            const { Icon, subtitle, title, active } = i
            return (
              <CuteLittleBox
                key={i.title}
                Icon={Icon}
                subtitle={Number(subtitle)}
                title={title}
                active={active}
              />
            )
          })}
        </section>

        <section className='reserve-date'>
          <div className='reserve-date__from'>
            <h5>Desde:</h5>
            <h3>
              <b>{from.day}</b>
              <span>{from.monthAbbr}</span>
              {from.year}
            </h3>
          </div>
          <div className='reserve-date__to'>
            <h5>Hasta:</h5>
            <h3>
              <b>{to.day}</b>
              <span>{to.monthAbbr}</span>
              {to.year}
            </h3>
          </div>
        </section>
      </button>
      <aside className='reserve-actions'>
        <button className='reserve-action hidden' title='Repetir reservación'>
          <Repeat />
        </button>
        <button
          className='reserve-action'
          title='Detalles'
          onClick={() => {
            setReservation(isReading ? null : reserve)
          }}
        >
          {isReading ? <XIcon /> : <NotebookTabs />}
        </button>
        <button className='reserve-action print' title='Imprimir' onClick={handlePrint}>
          {loading ? <LoaderCircle className='animate-spin' /> : <Printer />}
        </button>
      </aside>
    </article>
  )
}

export default Reserve
