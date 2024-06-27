import { PanelRightClose } from 'lucide-react'
import type { JSX } from 'react'
import { switchClass } from 'shared/helpers/switchClassName'

import { useReservationStore } from '../../store/reservation.store'

const Details = (): JSX.Element | null => {
  const { reservation, setReservation } = useReservationStore()
  if (!reservation) return null

  return (
    <aside className={`RDetails dashboard-body__details ${switchClass(!!reservation)}`}>
      <button className='RDetails-close' onClick={() => setReservation(null)}>
        <PanelRightClose />
      </button>
      Repetir
      {JSON.stringify(reservation)}
    </aside>
  )
}

export default Details
