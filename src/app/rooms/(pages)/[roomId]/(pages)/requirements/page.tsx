'use client'

import { useClerk, useUser } from '@clerk/nextjs'
import { useCreateReservation } from 'hooks/useReservations'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { type JSX, useEffect, useRef } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { ISendReserveData } from 'services/reserve/reserve.service.types'
import { switchClass } from 'shared/helpers/switchClassName'
import {
  TRequirementsUser,
  requirementsUserResolver
} from 'shared/resolvers/requirementsUser.resolver'

import { useRoomStore } from '../../store/room.store'
import RegisterRequirementsUser from '../components/RegisterRequirementsUser/RegisterRequirementsUser'
import TotalCalculate from '../components/totalCalculate/TotalCalculate'
import { defaultFormData } from '../store/useRegisterStore'
import useRequirementsStore from '../store/useRequirementsStore'
import './style.scss'

const Page = (): JSX.Element => {
  const { totalAmount, fromDate, toDate, nights, igv, subtotal } = useRequirementsStore()
  const roomID = useRoomStore(store => store.id)
  const $formRef = useRef<HTMLFormElement>(null)
  const { user } = useUser()
  const { openSignIn } = useClerk()
  const currentPath = usePathname()
  const { push } = useRouter()
  const { mutate: resMutate } = useCreateReservation()

  // const { setTempPayData } = usePayStore()

  const methods = useForm({
    resolver: requirementsUserResolver,
    values: defaultFormData,
    mode: 'all'
  })

  const handleContinue = () => {
    if (!$formRef.current) return
    $formRef.current.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))
  }

  useEffect(() => {
    // Continuamos con la reserva
    const inProcess = localStorage.getItem('process') === '1'
    if (inProcess && user !== null) {
      handleContinue()
    }
  }, [user])

  const handleSubmit = async (clientData: TRequirementsUser) => {
    localStorage.setItem('process', '1')

    if (user === null) {
      return openSignIn({
        forceRedirectUrl: currentPath,
        afterSignOutUrl: currentPath,
        signUpForceRedirectUrl: currentPath,
        routing: 'virtual'
      })
    }

    const reserveData: ISendReserveData = {
      cliente: {
        email: user?.emailAddresses[0].emailAddress ?? '',
        ...clientData
      },
      habitacion: { codigo: Number(roomID) },
      fechaIngreso: fromDate,
      fechaSalida: toDate,
      totalDias: nights,
      subtotal,
      total: totalAmount,
      igv,
      id: user?.id ?? '',
      estado: 1
    }
    const toId = toast.loading('Procesando reserva')
    resMutate(reserveData, {
      onError() {
        toast.error('Hemos fallados en crear la reserva', { id: toId })
      },
      onSuccess() {
        toast.success('Reserva creada', { id: toId })
        push(`/rooms/${roomID}/pay`)
      }
    })
    localStorage.removeItem('process')
    localStorage.setItem('newPay', '1')
  }

  const { isValid } = methods.formState

  return (
    <section className='requirementsRoom'>
      <div className='requirementsRoom-actions'>
        <Link href={`/rooms/${roomID}/`} className='btn'>
          Regresar a los detalles
        </Link>
        <button
          onClick={handleContinue}
          className={`btn bgr  ${switchClass(!isValid, 'inactive')}`}
        >
          {isValid ? 'Continuar con la reserva' : 'Requerimos todos tus datos'}
        </button>
      </div>
      <TotalCalculate />
      <div className='subtitle'>
        <h2 className='gr'>Datos de usuario</h2>
        <span>Completa tus datos personales, para reservar la habitación</span>
      </div>
      <FormProvider {...methods}>
        <RegisterRequirementsUser onSubmit={handleSubmit} ref={$formRef} />
      </FormProvider>
    </section>
  )
}

export default Page
