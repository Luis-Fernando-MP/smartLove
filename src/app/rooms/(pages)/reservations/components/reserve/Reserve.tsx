'use client'

import { LoaderCircle, NotebookTabs, Printer, Repeat, Skull, XIcon } from 'lucide-react'
import { type JSX, type ReactNode } from 'react'
import { IReservation } from 'services/reserve/reserve.service.types'
import { sansitaSwashed } from 'shared/fonts'
import { breakDownDate } from 'shared/helpers/formatDate'
import ToggleLogo from 'shared/ui/colorSchemeButton/ToggleLogo'
import CuteLittleBox from 'shared/ui/cuteLittleBox/CuteLittleBox'

import './style.scss'
import useReserve from './useReserve'

interface IReserve {
  children?: Readonly<ReactNode[]> | null | Readonly<ReactNode>
  reserve: IReservation
}

const Reserve = ({ reserve }: IReserve): JSX.Element => {
  const {
    handlePrint,
    handleReservationDeselected,
    handleReservationSelected,
    littleBoxData,
    loading,
    refReservePrint,
    isReading
  } = useReserve({
    reserve
  })

  const { fechaIngreso, fechaSalida } = reserve

  const join = breakDownDate(new Date(fechaIngreso))
  const out = breakDownDate(new Date(fechaSalida))

  return (
    <article className='reserve' ref={refReservePrint}>
      <ToggleLogo />
      <h3 className={`${sansitaSwashed.className} center`}>{reserve.habitacion.nombre}</h3>
      <aside className='reserve-actions'>
        <button className='reserve-action' title='Repetir reservación'>
          <Repeat />
        </button>
        <button className='reserve-action' title='Cancelar reservación'>
          <Skull />
        </button>
        <button
          className='reserve-action'
          title='Detalles'
          onClick={isReading ? handleReservationDeselected : handleReservationSelected}
        >
          {isReading ? <XIcon /> : <NotebookTabs />}
        </button>
        <button className='reserve-action print' title='Imprimir' onClick={handlePrint}>
          {loading ? <LoaderCircle className='animate-spin' /> : <Printer />}
        </button>
      </aside>

      <section className='reserve-operations'>
        <div className='reserve-operation'>
          <h4>Ope.</h4>
          <p>{reserve.idReserva}</p>
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
        {littleBoxData().map(i => (
          <CuteLittleBox key={i.title} {...i} />
        ))}
      </section>

      <section className='reserve-date'>
        <div className='reserve-date__from'>
          <h5>Desde:</h5>
          <h3>
            <b>{join.day}</b>
            <span>{join.monthAbbr}</span>
            {join.year}
          </h3>
        </div>
        <div className='reserve-date__to'>
          <h5>Hasta:</h5>
          <h3>
            <b>{out.day}</b>
            <span>{out.monthAbbr}</span>
            {out.year}
          </h3>
        </div>
      </section>
    </article>
  )
}

export default Reserve
