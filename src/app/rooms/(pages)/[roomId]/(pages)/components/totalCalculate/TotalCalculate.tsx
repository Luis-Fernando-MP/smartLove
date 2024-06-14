'use client'

import Link from 'next/link'
import { addDays, formatDate, stringToDate, today } from 'shared/helpers/formatDate'
import {
  STAY_USER,
  currentClassCase,
  currentIndexCase,
  discountByStay,
  stayCases
} from 'shared/helpers/stayUserCases'
import { switchClass } from 'shared/helpers/switchClassName'

import { useRoomStore } from '../../../store/room.store'
import useUseTotalCalculate from '../../hooks/useTotalCalculate'
import ConditionalDayButton from '../conditionalDayButton/ConditionalDayButton'
import './style.scss'

const TotalCalculate = (): JSX.Element | null => {
  const room = useRoomStore(store => store.room)
  const calculateHook = useUseTotalCalculate({ room })
  if (!calculateHook) return null
  const {
    subtotal,
    totalIGV,
    totalSurcharge,
    totalAmount,
    diffDays,
    toDate,
    fromDate,
    stayUser,
    roomPrice,
    setToDate,
    setFromDate,
    handleChangeNights
  } = calculateHook

  const oneNight = diffDays <= 1

  return (
    <section className='totalCalculate'>
      <article className='totalCalculate-days'>
        <div className='totalCalculate-separator'>
          <h3 className='gr'>Tiempo de hospedaje:</h3>
          <div className='totalCalculate-container time'>
            <button
              className={`btn ${switchClass(oneNight)}`}
              onClick={() => handleChangeNights(1)}
            >
              Solo 1 día
            </button>
            <button
              className={`btn ${switchClass(!oneNight)}`}
              onClick={() => handleChangeNights(2)}
            >
              +de 1 día
            </button>
            <button
              className={`btn ${switchClass(diffDays === 2)}`}
              onClick={() => {
                setFromDate(today())
                setToDate(addDays(today(), 2))
              }}
            >
              🐢 Solo hoy y mañana
            </button>
          </div>
        </div>
        <div className='totalCalculate-separator'>
          <h5>Desde:</h5>
          <div className='totalCalculate-container'>
            <input
              type='date'
              className='totalCalculate-date btn'
              min={formatDate(today())}
              max={formatDate(addDays(stringToDate(toDate), -1))}
              value={fromDate}
              disabled={oneNight}
              onChange={e => {
                const dateValue = e.target.value
                if (dateValue === '') return handleChangeNights(1)
                setFromDate(stringToDate(dateValue))
              }}
            />
          </div>
        </div>
        <div className='totalCalculate-separator'>
          <h5>Hasta:</h5>
          <div className='totalCalculate-container'>
            <input
              type='date'
              className='totalCalculate-date btn'
              min={formatDate(addDays(stringToDate(fromDate), 1))}
              value={toDate}
              disabled={oneNight}
              onChange={e => {
                const dateValue = e.target.value
                if (dateValue === '') return handleChangeNights(1)
                setToDate(stringToDate(dateValue))
              }}
            />
          </div>
        </div>
      </article>
      <article className={`totalCalculate-total ${stayUser}`}>
        <progress
          value={currentIndexCase(diffDays)}
          max={stayCases.length - 1}
          className={`totalCalculate-progress  ${stayUser}`}
        />
        <div className='totalCalculate-separator subtotal'>
          <h3>Subtotal:</h3>
          <div className='totalCalculate-container subtotal'>
            <ConditionalDayButton days={diffDays} oneNight={oneNight} />
            <h4>PEN {subtotal}</h4>
          </div>
        </div>
        <div className='totalCalculate-separator'>
          <h5>Costo final:</h5>
          <div className='totalCalculate-container igv'>
            <p>*ICV 18%</p>
            <h4>PEN {totalIGV}</h4>
          </div>
          <div className='totalCalculate-container service'>
            <p>*Recargo x Servicio 10%</p>
            <h4>PEN {totalSurcharge}</h4>
          </div>

          {currentClassCase(diffDays) === STAY_USER.LONG && (
            <div className='totalCalculate-container service'>
              <p>*Descuento {discountByStay(STAY_USER.LONG) * 100}%</p>
              <h4>PEN {roomPrice * discountByStay(STAY_USER.LONG) * diffDays}</h4>
            </div>
          )}
          {currentClassCase(diffDays) === STAY_USER.EXTENDED && (
            <div className='totalCalculate-container service'>
              <p>*Descuento {discountByStay(STAY_USER.EXTENDED) * 100}%</p>
              <h4>PEN {roomPrice * discountByStay(STAY_USER.EXTENDED) * diffDays}</h4>
            </div>
          )}

          <div className='totalCalculate-container total'>
            <div className='total-title'>
              <h3>TOTAL**</h3>

              {(stayUser === STAY_USER.LONG || stayUser === STAY_USER.EXTENDED) && (
                <h4 className='tach'>
                  {totalAmount + roomPrice * diffDays * discountByStay(stayUser)}
                </h4>
              )}
            </div>
            <h2>PEN {totalAmount}</h2>
          </div>
        </div>

        <div className='totalCalculate-separator polices'>
          <Link href='/polices#taxes'>Ver detalles de impuestos</Link>
          <Link href='/polices#fees'>Ver detalles de tarifas flexibles</Link>
        </div>
      </article>
    </section>
  )
}

export default TotalCalculate
