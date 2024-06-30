'use client'

import { PanelRightClose } from 'lucide-react'
import type { JSX } from 'react'
import { switchClass } from 'shared/helpers/switchClassName'

import { useReservationStore } from '../../store/reservation.store'
import './style.scss'

const Details = (): JSX.Element | null => {
  const { reservation: r, deselectReservation } = useReservationStore()

  const handleCloseDetails = (): void => {
    deselectReservation()
  }

  return (
    <aside className={`RDetails dashboard-body__details ${switchClass(!!r)}`}>
      <button className='RDetails-close btn' onClick={handleCloseDetails}>
        <PanelRightClose />
        Cerrar
      </button>
      <h4>
        <b>DETALLES</b> de la Reserva:
      </h4>
      <p>{r?.idReserva}</p>
    </aside>
  )
}

export default Details
