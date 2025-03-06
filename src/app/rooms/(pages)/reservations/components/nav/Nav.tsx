'use client'

import { useDeleteReservation } from '@/hooks/useReservations'
import { HOME_PATHS } from '@/shared/constants'
import { switchClass } from '@/shared/helpers/switchClassName'
import { TReservationResolver, reservationResolver } from '@/shared/resolvers/reservation.resolver'
import Back from '@/shared/ui/back/Back'
import { useUser } from '@clerk/nextjs'
import { Link } from 'next-view-transitions'
import { type JSX } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { v1 as uuid } from 'uuid'

import { useReservationStore, useReservationsStore } from '../../store/reservation.store'
import './style.scss'

const Nav = (): JSX.Element | null => {
  const reservations = useReservationsStore(s => s.reservations)
  const { reservation, setReservation } = useReservationStore()
  const { user } = useUser()
  const { mutate, isPending } = useDeleteReservation()
  const hookForm = useForm<TReservationResolver>({
    resolver: reservationResolver,
    values: {
      roomID: reservation ? String(reservation.id) : '',
      roomName: reservation ? String(reservation.id) : '',
      comment: ''
    }
  })

  if (!reservations) return null

  const { register, handleSubmit, formState } = hookForm
  const { errors } = formState
  const { roomID: roomIdError, roomName: roomNameError, comment: commentError } = errors
  const thereError = !!roomIdError || !!roomNameError || !!commentError || !reservation

  const getReservation = (id: string) => {
    return reservations.find(r => String(r.id) === id)
  }

  const onFormSubmit = async (data: TReservationResolver) => {
    const toastId = toast.loading('Cancelando reserva')
    mutate(
      { reservationId: data.roomID, userId: user?.id ?? '' },
      {
        onSuccess() {
          setReservation(null)
          toast.success('Reserva cancelada', { id: toastId })
        }
      }
    )
    toast.dismiss(toastId)
  }

  const onErrors = errors => {
    toast.error('Todos los campos de filtrado son necesarios')
    console.error('error', errors)
  }

  const handleChange = (id: string): void => {
    const reservationExist = getReservation(id)
    if (!reservationExist) return
    setReservation(reservationExist)
  }

  return (
    <>
      <Back row />
      <h3 className='reservationNav-subtitle'>¿Cancelar reserva?</h3>
      {reservation && (
        <p className='reservationNav-id inline-block'>
          La reserva con el código&nbsp; <b className='gr'>{reservation.id}</b>
          &nbsp;esta seleccionada
        </p>
      )}
      <h5 className='reservationNav-precaution'>
        Te agradecemos que hayas leído correctamente nuestras{' '}
        <Link href={HOME_PATHS.Polices.link} target='_blank' rel='noreferrer'>
          políticas
        </Link>
        &nbsp;para cancelar tu reserva 🤓
      </h5>
      <form onSubmit={handleSubmit(onFormSubmit, onErrors)} className={`reservationNav-form ${switchClass(!thereError, 'ok')}`}>
        <section className={`reservationNav-form__section ${switchClass(roomIdError, 'error')}`}>
          <h5>ID de reserva:</h5>
          <p className='reservationNav-section__error'>{roomIdError?.message}</p>
          <label className='reservationNav-form__select'>
            <select
              {...register('roomID', {
                onChange(event) {
                  const id = event.target.value
                  handleChange(id)
                }
              })}
            >
              <option value='' style={{ display: 'none' }}>
                Selecciona una opción
              </option>
              {reservations.map(r => {
                return (
                  <option key={uuid()} value={r.id}>
                    Código {r.id}
                  </option>
                )
              })}
            </select>
          </label>
        </section>

        <section className={`reservationNav-form__section ${switchClass(roomNameError, 'error')}`}>
          <h5>Escoge la reserva a cancelar:</h5>
          <p className='reservationNav-section__error'>{roomNameError?.message}</p>
          <span className='reservationNav-form__info'>(El proceso es automático, pero puede verificar para mayor seguridad)</span>
          <label className='reservationNav-form__select auto'>
            <select
              {...register('roomName', {
                onChange(event) {
                  const id = event.target.value
                  handleChange(id)
                }
              })}
            >
              <option value='' style={{ display: 'none' }}>
                Selecciona una opción
              </option>
              {reservations.map(r => {
                return (
                  <option key={uuid()} value={r.id}>
                    {r.room.name} S/ {Number(r.total)}
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
        {!isPending && (
          <button type='submit' className='reservationNav-submit'>
            {thereError ? 'Completa todo los campos' : 'Cancelar reserva'}
          </button>
        )}
      </form>
    </>
  )
}

export default Nav
