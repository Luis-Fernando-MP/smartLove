'use client'

import { isDateInRange } from '@/shared/helpers/roomDate'
import { round } from '@/shared/helpers/round'
import { STAY_USER, currentIndexCase, discountByStay, stayCases } from '@/shared/helpers/stayUserCases'
import dayjs from 'dayjs'
import { Link } from 'next-view-transitions'
import toast from 'react-hot-toast'

import { useRoomStore } from '../../../store/room.store'
import useUseTotalCalculate from '../../hooks/useTotalCalculate'
import ConditionalDayButton from '../conditionalDayButton/ConditionalDayButton'
import DateCrossing from '../crossing/DateCrossing'
import './style.scss'

const ADD_DAY = 0

const TotalCalculate = (): JSX.Element | null => {
  const room = useRoomStore(store => store.room)
  const calculateHook = useUseTotalCalculate({ room })
  if (!calculateHook || !room) return null
  const {
    currentUserStay,
    diffDays,
    fromDate,
    handleChangeNights,
    roomPrice,
    setFromDate,
    setToDate,
    stayUser,
    subtotal,
    toDate,
    totalAmount,
    totalIGV,
    totalSurcharge
  } = calculateHook

  const oneNight = diffDays <= 0 + ADD_DAY
  const today = dayjs()
  const { reservations } = room

  const handleChange = (date: string) => {
    const dateValue = date
    if (dateValue === '' || !room) return handleChangeNights(1)

    const selectedDate = dayjs(dateValue)
    const isDateValid = isDateInRange(reservations, dateValue)
    if (isDateValid) {
      toast.error('La fecha seleccionada no está disponible')
      return null
    }
    return selectedDate.toDate()
  }

  return (
    <div>
      <DateCrossing dates={reservations ?? []} selectFrom={fromDate} selectEnd={toDate} />
      <article className='totalCalculate'>
        <section className='totalCalculate-days'>
          <div className='totalCalculate-separator'>
            <h3 className='gr'>Tiempo de hospedaje:</h3>
            <div className='totalCalculate-container time' />
          </div>
          <div className='totalCalculate-separator'>
            <h5>Desde:</h5>
            <div className='totalCalculate-container'>
              <input
                type='date'
                className='totalCalculate-date btn'
                min={today.format('YYYY-MM-DD')}
                max={dayjs(toDate)
                  .add(0 + -1 * ADD_DAY, 'day')
                  .format('YYYY-MM-DD')}
                value={fromDate}
                onChange={e => {
                  const isCorrectChange = handleChange(e.target.value)
                  if (isCorrectChange) setFromDate(isCorrectChange)
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
                min={dayjs(fromDate)
                  .add(0 + ADD_DAY, 'day')
                  .format('YYYY-MM-DD')}
                value={toDate}
                onChange={e => {
                  const isCorrectChange = handleChange(e.target.value)
                  if (isCorrectChange) setToDate(isCorrectChange)
                }}
              />
            </div>
          </div>
        </section>
        <section className={`totalCalculate-total ${stayUser}`}>
          <progress
            value={currentIndexCase(diffDays)}
            max={stayCases.length - 1}
            className={`totalCalculate-progress ${stayUser}`}
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

            {currentUserStay === STAY_USER.LONG && (
              <div className='totalCalculate-container service'>
                <p>*Descuento {discountByStay(STAY_USER.LONG) * 100}%</p>
                <h4>PEN {round(roomPrice * discountByStay(STAY_USER.LONG) * diffDays)}</h4>
              </div>
            )}
            {currentUserStay === STAY_USER.EXTENDED && (
              <div className='totalCalculate-container service'>
                <p>*Descuento {discountByStay(STAY_USER.EXTENDED) * 100}%</p>
                <h4>PEN {round(roomPrice * discountByStay(STAY_USER.EXTENDED) * diffDays)}</h4>
              </div>
            )}

            <div className='totalCalculate-container total'>
              <div className='total-title'>
                <h3>TOTAL**</h3>

                {(stayUser === STAY_USER.LONG || stayUser === STAY_USER.EXTENDED) && (
                  <h4 className='tach'>{totalAmount + roomPrice * diffDays * discountByStay(stayUser)}</h4>
                )}
              </div>
              <h2>PEN {totalAmount}</h2>
            </div>
          </div>

          <div className='totalCalculate-separator polices'>
            <Link href='/polices#taxes'>Ver detalles de impuestos</Link>
            <Link href='/polices#fees'>Ver detalles de tarifas flexibles</Link>
          </div>
        </section>
      </article>
    </div>
  )
}

export default TotalCalculate
