'use client'

import Link from 'next/link'
import { type JSX } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { HOME_PATHS } from 'shared/constants'
import { switchClass } from 'shared/helpers/switchClassName'
import { TReservationResolver, reservationResolver } from 'shared/resolvers/reservation.resolver'
import Back from 'shared/ui/back/Back'

import { usePruneReserveStore } from '../../store/reservation.prune.store'
import { useReservationsStore } from '../../store/reservation.store'
import './style.scss'

const Nav = (): JSX.Element | null => {
  const reservations = useReservationsStore(s => s.reservations)
  const hookForm = useForm<TReservationResolver>({
    resolver: reservationResolver,
    defaultValues: {}
  })
  const { reservation, setReservation } = usePruneReserveStore()

  if (!reservations) return null

  const { register, handleSubmit, formState } = hookForm
  const { errors } = formState
  const { roomID: roomIdError, roomName: roomNameError, comment: commentError } = errors

  const getReservation = (id: string) => {
    console.log(reservations.find(r => String(r.idReserva) === id))

    return reservations.find(r => String(r.idReserva) === id)
  }

  const onFormSubmit = (data: TReservationResolver) => {
    toast.success('Enviando datos: \n' + JSON.stringify(data))
  }

  const onErrors = errors => {
    toast.error('Todos los campos de filtrado son necesarios')
    console.error('error', errors)
  }

  return (
    <>
      <Back row />
      <h3 className='reservationNav-subtitle'>¿Cancelar reserva?</h3>
      <h1>{reservation?.idReserva}</h1>
      <h5 className='reservationNav-precaution'>
        Te agradecemos que hayas leído correctamente nuestras{' '}
        <Link href={HOME_PATHS.Polices.link} target='_blank' rel='noreferrer'>
          políticas
        </Link>
        &nbsp;para cancelar tu reserva 🤓
      </h5>
      <form onSubmit={handleSubmit(onFormSubmit, onErrors)} className='reservationNav-form'>
        <section className={`reservationNav-form__section ${switchClass(roomIdError, 'error')}`}>
          <h5>ID de reserva:</h5>
          <p className='reservationNav-section__error'>{roomIdError?.message}</p>
          <label className='reservationNav-form__select'>
            <select
              {...register('roomID', {
                onChange(event) {
                  const id = event.target.value
                  console.log(id)

                  console.log(getReservation(id))

                  // setReservation(r)
                }
              })}
            >
              <option value='' style={{ display: 'none' }}>
                Selecciona una opción
              </option>
              {reservations.map(r => {
                return (
                  <option key={r.idReserva} value={r.idReserva}>
                    Código {r.idReserva}
                  </option>
                )
              })}
            </select>
          </label>
        </section>

        <section className={`reservationNav-form__section ${switchClass(roomNameError, 'error')}`}>
          <h5>Escoge la reserva a cancelar:</h5>
          <p className='reservationNav-section__error'>{roomNameError?.message}</p>
          <span className='reservationNav-form__info'>
            (El proceso es automático, pero puede verificar para mayor seguridad)
          </span>
          <label className='reservationNav-form__select auto'>
            <select {...register('roomName')}>
              <option value='' style={{ display: 'none' }}>
                Selecciona una opción
              </option>
              {reservations.map(r => {
                return (
                  <option key={r.idReserva} value={r.idReserva}>
                    Pago {r.total}
                  </option>
                )
              })}
            </select>
          </label>
        </section>

        <section className={`reservationNav-form__section ${switchClass(commentError, 'error')}`}>
          <h5>Coméntanos tu razón:</h5>
          <p className='reservationNav-section__error'>{commentError?.message}</p>
          <span className='reservationNav-form__info'>
            (puedes omitir el comentario si gustas, pero recuerda que tu option nos importa)
          </span>
          <textarea {...register('comment')} placeholder='¿Que estas pensando?' />
        </section>

        <button type='submit' className='reservationNav-submit bgr'>
          Cancelar reserva
        </button>
      </form>
    </>
  )
}

export default Nav
