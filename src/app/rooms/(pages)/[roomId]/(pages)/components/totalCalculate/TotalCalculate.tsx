'use client'

import dayjs, { Dayjs } from 'dayjs'
import { Link } from 'next-view-transitions'
import toast from 'react-hot-toast'
import { round } from 'shared/helpers/round'
import {
  STAY_USER,
  currentIndexCase,
  discountByStay,
  stayCases
} from 'shared/helpers/stayUserCases'
import { switchClass } from 'shared/helpers/switchClassName'

import { useRoomStore } from '../../../store/room.store'
import useUseTotalCalculate from '../../hooks/useTotalCalculate'
import ConditionalDayButton from '../conditionalDayButton/ConditionalDayButton'
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

  const isDateInRange = (date: Date | string) => {
    return room.fechas?.some(fecha => {
      const inicio = dayjs(fecha.fechaInicio, 'YYYY-MM-DD')
      const fin = dayjs(fecha.fechaFin, 'YYYY-MM-DD')
      return dayjs(date).isBetween(inicio, fin, null, '[]')
    })
  }

  const handleFromDateChange = e => {
    const dateValue = e.target.value
    if (dateValue === '') return handleChangeNights(1)
    const selectedDate = dayjs(dateValue)
    const isDateValid = isDateInRange(dateValue)
    if (isDateValid) {
      toast.error('La fecha seleccionada no está disponible')
      return
    }
    setFromDate(selectedDate.toDate())
  }

  const handleToDateChange = e => {
    const dateValue = e.target.value
    if (dateValue === '') return handleChangeNights(1)
    const selectedDate = dayjs(dateValue)
    const isDateValid = isDateInRange(dateValue)

    if (isDateValid) {
      toast.error('La fecha seleccionada no está disponible')

      return
    }

    setToDate(selectedDate.toDate())
  }

  const handleTodayTomorrow = () => {
    const tomorrow = today.add(1 + ADD_DAY, 'day')

    let isTomorrowValid = true
    if (room.fechas && room.fechas.length > 0) {
      isTomorrowValid = !isDateInRange(tomorrow.toDate())
    }
    if (!isTomorrowValid) {
      toast.error('Mañana no está disponible para hospedaje')
      return
    }
    setFromDate(today.toDate())
    setToDate(tomorrow.toDate())
  }

  const handleChangeDays = days => {
    const newFromDate = today.toDate()
    const newToDate = today.add(days, 'day').toDate()

    if (isDateInRange(newFromDate) ?? isDateInRange(newToDate)) {
      toast.error('Las fechas seleccionadas no están disponibles')
      return
    }
    handleChangeNights(days)
  }

  return (
    <div>
      <section className='totalCalculate'>
        <article className='totalCalculate-days'>
          <div className='totalCalculate-separator'>
            <h3 className='gr'>Tiempo de hospedaje:</h3>
            <div className='totalCalculate-container time'>
              {/* <button
                className={`btn ${switchClass(oneNight)}`}
                onClick={() => handleChangeDays(0 + ADD_DAY)}
              >
                Solo 1 día
              </button>
              <button
                className={`btn ${switchClass(!oneNight)}`}
                onClick={() => handleChangeDays(1 + ADD_DAY)}
              >
                +de 1 día
              </button>
              <button
                className={`btn ${switchClass(
                  diffDays === 1 + ADD_DAY && today.isSame(dayjs(fromDate), 'day')
                )}`}
                onClick={handleTodayTomorrow}
              >
                🐢 Solo hoy y mañana
              </button> */}
            </div>
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
                onChange={handleFromDateChange}
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
                onChange={handleToDateChange}
              />
            </div>
          </div>
        </article>
        <article className={`totalCalculate-total ${stayUser}`}>
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
    </div>
  )
}

export default TotalCalculate
