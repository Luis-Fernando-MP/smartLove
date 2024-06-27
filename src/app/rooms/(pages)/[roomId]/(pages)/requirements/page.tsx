'use client'

import { useUser } from '@clerk/nextjs'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { type JSX, useMemo, useRef } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
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
  const { totalAmount, fromDate, toDate, nights } = useRequirementsStore()
  const roomID = useRoomStore(store => store.id)
  const $formRef = useRef<HTMLFormElement>(null)
  const router = useRouter()
  const { user } = useUser()

  const defaultFormValues = useMemo(() => {
    if (!user) return defaultFormData
    const { emailAddresses, lastName, fullName } = user
    return {
      ...defaultFormData,
      fullName: fullName ?? defaultFormData.fullName,
      lastName: lastName ?? defaultFormData.lastName,
      email: emailAddresses[0].emailAddress
    }
  }, [user])

  console.log(defaultFormValues)

  const methods = useForm({
    resolver: requirementsUserResolver,
    values: defaultFormValues,
    mode: 'all'
  })

  const handleContinue = () => {
    if (!$formRef.current) return
    $formRef.current.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))
  }

  const handleSubmit = (data: TRequirementsUser) => {
    const sendData = {
      cliente: { idCliente: 1, ...data },
      habitacion: { codigo: roomID },
      fechaIngreso: fromDate,
      fechaSalida: toDate,
      totalDias: nights,
      subtotal: 0,
      total: totalAmount
    }
    console.log(sendData)

    toast.loading('Estamos registrando tu reserva: ' + JSON.stringify(sendData))
    // router.push({
    //   pathname: `/rooms/${roomID}/pay`,
    //   query: { data: JSON.stringify(data) }
    // })1
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
        <RegisterRequirementsUser
          onSubmit={handleSubmit}
          ref={$formRef}
          defaultFormValues={defaultFormValues}
        />
      </FormProvider>
    </section>
  )
}

export default Page
