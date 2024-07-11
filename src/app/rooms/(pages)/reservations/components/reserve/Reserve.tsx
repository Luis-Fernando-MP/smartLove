'use client'

import { LoaderCircle, NotebookTabs, Printer, Repeat, XIcon } from 'lucide-react'
import { type JSX, type ReactNode } from 'react'
import { IReservation } from 'services/reserve/reserve.service.types'
import { sansitaSwashed } from 'shared/fonts'
import { breakDownDate } from 'shared/helpers/formatDate'
import { switchClass } from 'shared/helpers/switchClassName'
import ToggleLogo from 'shared/ui/colorSchemeButton/ToggleLogo'
import CuteLittleBox from 'shared/ui/cuteLittleBox/CuteLittleBox'

import './style.scss'
import useReserve, { littleBoxData } from './useReserve'

interface IReserve {
  children?: Readonly<ReactNode[]> | null | Readonly<ReactNode>
  reserve: IReservation
}

const Reserve = ({ reserve }: IReserve): JSX.Element => {
  const { handlePrint, loading, refReservePrint, setReservation, isReading } = useReserve({
    reserve
  })

  const scroll = () => {
    if (typeof window === 'undefined' || refReservePrint?.current) return
    const parent = document.querySelector('.reservations.dashboard-body__reservations')
    if (!parent || parent instanceof HTMLElement) return
    console.log('scroll', parent)

    parent.scrollTo({
      top: refReservePrint.current?.offsetTop,
      behavior: 'smooth'
    })
  }

  scroll()

  const { fechaIngreso, fechaSalida } = reserve

  const from = breakDownDate(new Date(fechaIngreso))
  const to = breakDownDate(new Date(fechaSalida))

  return (
    <article className={`reserve ${switchClass(isReading)}`} ref={refReservePrint}>
      <button
        className='reserve-container'
        onClick={() => {
          setReservation(isReading ? null : reserve)
        }}
      >
        <ToggleLogo />
        <h3 className={`${sansitaSwashed.className} center`}>{reserve.habitacion.nombre}</h3>
        <section className='reserve-operations'>
          <div className='reserve-operation'>
            <h4>Ope.</h4>
            <h5 className='gr'>{reserve.idReserva}</h5>
          </div>
          <div className='reserve-operation'>
            <h4>Hora</h4>
            <p>{reserve.fechaIngreso.slice(0, 10)}</p>
          </div>
          <div className='reserve-operation'>
            <h4>Fecha</h4>
            <p>{reserve.fechaSalida.slice(0, 10)}</p>
          </div>
        </section>

        <section className='reserve-littleBoxes'>
          {littleBoxData(reserve).map(i => (
            <CuteLittleBox key={i.title} {...i} />
          ))}
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
