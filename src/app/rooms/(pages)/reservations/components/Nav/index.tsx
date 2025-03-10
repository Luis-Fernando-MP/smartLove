'use client'

import NavContainer from '@/app/rooms/components/navContainer/NavContainer'
import { useDeleteReservation } from '@/hooks/useReservations'
import { HOME_PATHS } from '@/shared/constants'
import { switchClass } from '@/shared/helpers/switchClassName'
import { TReservationResolver, reservationResolver } from '@/shared/resolvers/reservation.resolver'
import Back from '@/shared/ui/back/Back'
import { useUser } from '@clerk/nextjs'
import dayjs from 'dayjs'
import { AlertCircleIcon, AlertTriangleIcon, HashIcon, HotelIcon, InfoIcon, MessageSquareIcon, XCircleIcon } from 'lucide-react'
import { Link } from 'next-view-transitions'
import { type JSX } from 'react'
import { useCallback, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { useReservationStore, useReservationsStore } from '../../store/reservation.store'
import './style.scss'

const toastId = 'cancel-reservation'
const Nav = (): JSX.Element | null => {
  const { reservation, setReservation } = useReservationStore()
  const { mutate, isPending } = useDeleteReservation()
  const { reservations } = useReservationsStore()
  const { user } = useUser()

  const defaultValues = useMemo(
    () => ({
      roomID: reservation ? String(reservation.id) : '',
      roomName: reservation ? String(reservation.id) : '',
      comment: ''
    }),
    [reservation]
  )

  const isExpiredReservation = useMemo(() => {
    if (!reservation) return false
    return dayjs().isAfter(dayjs(reservation.checkOut))
  }, [reservation])

  const hookForm = useForm<TReservationResolver>({
    resolver: reservationResolver,
    values: defaultValues
  })

  const { register, handleSubmit, formState } = hookForm
  const { roomID: roomIdError, roomName: roomNameError, comment: commentError } = formState.errors
  const thereError = !!roomIdError || !!roomNameError || !!commentError || !reservation

  const getReservation = useCallback(
    (id: string) => {
      return reservations.find(r => String(r.id) === id)
    },
    [reservations]
  )

  const onFormSubmit = useCallback(
    async (data: TReservationResolver) => {
      toast.loading(isExpiredReservation ? 'Eliminando registro' : 'Cancelando reserva', { id: toastId })
      mutate(
        { reservationId: data.roomID, userId: user?.id ?? '' },
        {
          onSuccess() {
            console.log(isExpiredReservation ? 'Registro eliminado' : 'Reserva cancelada')
            toast.success(isExpiredReservation ? 'Registro eliminado' : 'Reserva cancelada', { id: toastId })
            setReservation(null)
          },
          onError() {
            toast.error(isExpiredReservation ? 'Error al eliminar registro' : 'Error al cancelar la reserva', { id: toastId })
          }
        }
      )
      setTimeout(() => toast.dismiss(toastId), 5000)
    },
    [mutate, setReservation, user?.id, isExpiredReservation]
  )

  const onErrors = useCallback(() => {
    toast.error('Todos los campos de filtrado son necesarios')
  }, [])

  const handleChange = useCallback(
    (id: string): void => {
      const reservationExist = getReservation(id)
      if (!reservationExist) return
      setReservation(reservationExist)
    },
    [getReservation, setReservation]
  )

  const reservationOptions = useMemo(
    () =>
      reservations.map(r => ({
        id: r.id,
        code: `Código ${r.id}`,
        details: `${r.room.name} S/ ${Number(r.total)}`
      })),
    [reservations]
  )

  if (!reservations) return null

  return (
    <NavContainer className='reservationNav'>
      <Back row />
      <h2 className='font3 gr'>{isExpiredReservation ? '¿Eliminar registro?' : '¿Cancelar reserva?'}</h2>
      <h4>
        Te agradecemos que hayas leído correctamente nuestras&nbsp;
        <Link href={HOME_PATHS.Polices.link} target='_blank' rel='noopener noreferrer' className='reservationNav-link'>
          políticas
        </Link>
        &nbsp;para {isExpiredReservation ? 'eliminar el registro' : 'cancelar tu reserva'} 🤓
      </h4>

      {reservation && (
        <h4 className='reservationNav-selected'>
          {isExpiredReservation ? 'El registro' : 'La reserva'} con el código de
          <br />
          <b className='gr'>Operación: {reservation.id}</b>&nbsp;esta seleccionada
        </h4>
      )}

      <form
        onSubmit={handleSubmit(onFormSubmit, onErrors)}
        className={`reservationForm ${switchClass(!thereError, 'ok')} ${switchClass(isPending, 'loading')}`}
      >
        <section className={`reservationForm-section ${switchClass(!!roomIdError, 'error')}`}>
          <h5 className='reservationForm-title'>
            <HashIcon className='inline-icon' /> ID de {isExpiredReservation ? 'registro' : 'reserva'}:
          </h5>
          <h4 className='reservationForm-error'>{roomIdError?.message}</h4>

          <div className='reservationForm-select'>
            <select
              className='reservationForm-input'
              {...register('roomID', {
                onChange: event => handleChange(event.target.value)
              })}
            >
              <option value='' style={{ display: 'none' }}>
                Selecciona una opción
              </option>
              {reservationOptions.map(({ id, code }) => (
                <option key={`id-${id}`} value={id}>
                  {code}
                </option>
              ))}
            </select>
          </div>
        </section>

        <section className={`reservationForm-section ${switchClass(!!roomNameError, 'error')}`}>
          <h5 className='reservationForm-title'>
            <HotelIcon className='inline-icon' /> Selecciona la habitación a {isExpiredReservation ? 'eliminar' : 'cancelar'}:
          </h5>
          <h4 className='reservationForm-error'>{roomNameError?.message}</h4>
          <span className='reservationForm-caution'>
            <InfoIcon size={14} className='inline-icon' /> El proceso es automático, pero puedes verificar para mayor seguridad
          </span>

          <div className='reservationForm-select'>
            <select
              className='reservationForm-input'
              {...register('roomName', {
                onChange: event => handleChange(event.target.value)
              })}
            >
              <option value='' style={{ display: 'none' }}>
                Selecciona una opción
              </option>
              {reservationOptions.map(({ id, details }) => (
                <option key={`name-${id}`} value={id}>
                  {details}
                </option>
              ))}
            </select>
          </div>
        </section>

        <section className={`reservationForm-section ${switchClass(!!commentError, 'error')}`}>
          <h5 className='reservationForm-title'>
            <MessageSquareIcon className='inline-icon' /> Cuéntanos el motivo:
          </h5>
          <h4 className='reservationForm-error'>{commentError?.message}</h4>
          <span className='reservationForm-caution'>
            <AlertCircleIcon size={14} className='inline-icon' /> Tu opinión es importante para nosotros, pero puedes omitir este
            campo si lo deseas
          </span>

          <textarea
            className='reservationForm-area'
            {...register('comment')}
            placeholder={`¿Cuál es el motivo de la ${isExpiredReservation ? 'eliminación' : 'cancelación'}?`}
          />
        </section>

        <button type='submit' className='reservationForm-submit' disabled={isPending}>
          {thereError ? (
            <>
              <AlertTriangleIcon className='inline-icon' /> Por favor completa los campos requeridos
            </>
          ) : (
            <>
              <XCircleIcon className='inline-icon' /> {isExpiredReservation ? 'Eliminar registro' : 'Cancelar reserva'}
            </>
          )}
        </button>
      </form>
    </NavContainer>
  )
}

export default Nav
