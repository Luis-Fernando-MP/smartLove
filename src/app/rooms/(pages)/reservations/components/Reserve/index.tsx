'use client'

import { TClientReservation } from '@/app/api/reservation/by-user/[idUser]/route'
import { breakDownDate } from '@/shared/helpers/formatDate'
import { switchClass } from '@/shared/helpers/switchClassName'
import ToggleLogo from '@/shared/ui/ColorSchemeButton/ToggleLogo'
import LittleBox from '@/shared/ui/LittleBox'
import dayjs from 'dayjs'
import { ImageIcon, LoaderCircle, NotebookTabs, Printer, XIcon } from 'lucide-react'
import { type JSX, useCallback, useEffect, useMemo } from 'react'

import './style.scss'
import useReserve, { littleBoxData } from './useReserve'

interface IReserve {
  reserve: TClientReservation
}

const Reserve = ({ reserve }: IReserve): JSX.Element => {
  const { handlePrint, handleDownloadImage, loading, refReservePrint, setReservation, isReading } = useReserve({
    reserve
  })

  useEffect(() => {
    if (typeof window === 'undefined' || !refReservePrint?.current) return

    const parent = document.querySelector('.reservations.dashboard-body__reservations')
    if (!parent || parent instanceof HTMLElement) return

    parent.scrollTo({
      top: refReservePrint.current.offsetTop,
      behavior: 'smooth'
    })
  }, [refReservePrint])

  const { checkIn, checkOut, room, id, createdAt } = reserve

  const dates = useMemo(() => {
    const from = breakDownDate(dayjs(checkIn).toString())
    const to = breakDownDate(dayjs(checkOut).toString())
    const date = dayjs(createdAt)
    return {
      from,
      to,
      date
    }
  }, [checkIn, checkOut, createdAt])

  const handleReservationClick = useCallback(() => {
    setReservation(isReading ? null : reserve)
  }, [isReading, reserve, setReservation])

  const littleBoxItems = useMemo(() => littleBoxData(reserve), [reserve])

  const pastDate = useMemo(() => {
    const now = dayjs().startOf('day')
    const checkOutDate = dayjs(checkOut).startOf('day')

    return now.isAfter(checkOutDate)
  }, [checkOut])

  return (
    <article className={`reserve ${switchClass(!!isReading)}`}>
      <button
        className={`reserve-container ${switchClass(pastDate, 'past')}`}
        onClick={handleReservationClick}
        ref={refReservePrint}
      >
        <ToggleLogo className='reserve-logo' />
        <h3 className='font3'>{room.name}</h3>

        <section className='reserve-operations'>
          <div className='reserve-operation'>
            <h4>Ope.</h4>
            <h2 className='gr'>{id}</h2>
          </div>
          <div className='reserve-operation'>
            <h4>Hora</h4>
            <p>{dates.date.format('hh:mm A')}</p>
          </div>
          <div className='reserve-operation'>
            <h4>Fecha</h4>
            {dates.date.format('DD/MM/YY')}{' '}
          </div>
        </section>

        <section className='reserve-littleBoxes'>
          {littleBoxItems.map(i => {
            const { Icon, subtitle, title } = i
            return <LittleBox key={i.title} Icon={Icon} subtitle={subtitle} title={title} />
          })}
        </section>

        <section className='reserve-date'>
          <div className='reserve-date__from'>
            <h5>Desde:</h5>
            <h3>
              <b>{dates.from.day}</b>
              <span>{dates.from.monthAbbr}</span>
              {dates.from.year}
            </h3>
          </div>
          <div className='reserve-date__to'>
            <h5>Hasta:</h5>
            <h3>
              <b>{dates.to.day}</b>
              <span>{dates.to.monthAbbr}</span>
              {dates.to.year}
            </h3>
          </div>
        </section>
      </button>
      <aside className='reserve-actions'>
        <button className='reserve-action' title='Descargar Imagen' onClick={handleDownloadImage}>
          <ImageIcon />
        </button>
        <button className='reserve-action' title='Detalles' onClick={handleReservationClick}>
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
