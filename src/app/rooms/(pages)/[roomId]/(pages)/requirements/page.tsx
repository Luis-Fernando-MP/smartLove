'use client'

import { useCreateReservation } from '@/hooks/useReservations'
import { ROOM_NAME_CACHE } from '@/hooks/useRooms'
import { ISendReserveData } from '@/services/reserve/reserve.service.types'
import { noAvailableDateInRange } from '@/shared/helpers/roomDate'
import { switchClass } from '@/shared/helpers/switchClassName'
import { TRequirementsUser, requirementsUserResolver } from '@/shared/resolvers/requirementsUser.resolver'
import { useClerk, useUser } from '@clerk/nextjs'
import { useQueryClient } from '@tanstack/react-query'
import { AlertCircleIcon, ArrowLeftIcon, CheckCircle2Icon } from 'lucide-react'
import { Link } from 'next-view-transitions'
import { usePathname, useRouter } from 'next/navigation'
import { type JSX, useEffect, useRef } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useLocalStorage } from 'usehooks-ts'

import { useRoomStore } from '../../store/room.store'
import RegisterRequirementsUser from '../components/RegisterRequirementsUser/RegisterRequirementsUser'
import DateCrossing from '../components/crossing/DateCrossing'
import TotalCalculate from '../components/totalCalculate/TotalCalculate'
import useRequirementsStore from '../store/useRequirementsStore'
import './style.scss'

const Page = (): JSX.Element | null => {
  const [_, setIsNewPay] = useLocalStorage('newPay', '')
  const { totalAmount, fromDate, toDate, nights, igv, subtotal, surcharge } = useRequirementsStore()
  const { mutate: resMutate, isPending } = useCreateReservation()
  const methods = useForm({ resolver: requirementsUserResolver, mode: 'all' })
  const room = useRoomStore(store => store.room)
  const { openSignIn } = useClerk()

  const $formRef = useRef<HTMLFormElement>(null)
  const { user } = useUser()
  const currentPath = usePathname()
  const { push } = useRouter()
  const client = useQueryClient()
  const { isValid } = methods.formState

  useEffect(() => {
    const inProcess = localStorage.getItem('process') === '1'
    if (inProcess && user !== null && room !== null) handleContinue()
  }, [user, room])

  if (!room) return null
  const { reservations, id: roomID } = room

  function handleContinue() {
    if (!$formRef.current) return
    $formRef.current.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))
  }

  const handleSubmit = async (clientData: TRequirementsUser) => {
    const noValidDateForm = [totalAmount, nights, igv, subtotal, surcharge].some(i => i < 1)
    if (noValidDateForm) return toast.error('Complete el formulario por favor')

    const notAvailable = noAvailableDateInRange({
      dates: reservations,
      endDate: toDate,
      startDate: fromDate
    })
    if (notAvailable) return toast.error('Las fechas seleccionadas no están disponibles')

    if (user === null) {
      toast.error('Necesitas iniciar sesión para continuar')
      return openSignIn({
        forceRedirectUrl: currentPath,
        afterSignOutUrl: currentPath,
        signUpForceRedirectUrl: currentPath
      })
    }

    const reserveData: ISendReserveData = {
      client: {
        email: user?.emailAddresses[0].emailAddress ?? '',
        ...clientData
      },
      room: { id: roomID },
      fromDate,
      toDate,
      days: nights,
      subtotal,
      totalAmount,
      igv,
      userId: user?.id ?? '',
      status: 1
    }

    handleReservation(reserveData)
  }

  const handleReservation = (data: ISendReserveData) => {
    const toastId = toast.loading('🚀 Estamos Procesando tu reserva')
    resMutate(data, {
      onSuccess() {
        client.refetchQueries({ queryKey: [ROOM_NAME_CACHE, String(roomID)] })
        if ($formRef.current) $formRef.current.reset()

        toast.success('Reserva creada correctamente', { id: toastId })
        setIsNewPay('new pay')
        push(`/rooms/${roomID}/pay`)
      },
      onError() {
        toast.error('Error al crear la reserva', { id: toastId })
      }
    })

    setTimeout(() => toast.dismiss(toastId), 5000)
    localStorage.removeItem('process')
  }

  return (
    <section className='requirementsRoom'>
      <div className='requirementsRoom-actions'>
        <Link href={`/rooms/${roomID}/`} className='requirementsRoom-back'>
          <ArrowLeftIcon />
          Ir a los detalles
        </Link>

        <button onClick={handleContinue} className={`requirementsRoom-go ${switchClass(!isValid, 'inactive')}`}>
          {isValid && (
            <>
              <CheckCircle2Icon />
              Procesar la reserva
            </>
          )}

          {!isValid && (
            <>
              <AlertCircleIcon />
              Requerimos todos tus datos
            </>
          )}
        </button>
      </div>

      <TotalCalculate />
      <section className='requirementsRoom-wrapper'>
        <DateCrossing dates={reservations ?? []} selectFrom={fromDate} selectEnd={toDate} />
        <FormProvider {...methods}>
          <RegisterRequirementsUser ref={$formRef} onSubmit={handleSubmit} showSubmit={!isPending} />
        </FormProvider>
      </section>
    </section>
  )
}

export default Page
