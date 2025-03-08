import { switchClass } from '@/shared/helpers/switchClassName'
import { TRequirementsUser, keysValues } from '@/shared/resolvers/requirementsUser.resolver'
import { AlertCircleIcon, CheckCircle2Icon, Trash2Icon } from 'lucide-react'
import { forwardRef, memo, useCallback, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'

import useRegisterStore, { defaultFormData } from '../../store/useRegisterStore'
import './style.scss'

interface Props {
  onSubmit: (data: TRequirementsUser) => void
  showSubmit: boolean
}

const RegisterRequirementsUser = memo(
  forwardRef<HTMLFormElement, Props>(({ onSubmit, showSubmit }, ref) => {
    const { formData, setFormData } = useRegisterStore()
    const { register, handleSubmit, formState, setValue, reset, trigger } = useFormContext<TRequirementsUser>()
    const { errors: err, isValid } = formState

    useEffect(() => {
      Object.entries(formData).forEach(([key, value]) => {
        setValue(key as keyof TRequirementsUser, value)
      })
      trigger()
    }, [formData, setValue, trigger])

    const onError = useCallback((): void => {
      toast.error('Completa todos los campos correctamente')
    }, [])

    const onReset = useCallback((): void => {
      reset()
      setFormData(defaultFormData)
    }, [reset, setFormData])

    const handleInputChange = useCallback(
      (name: keyof TRequirementsUser, value: string) => {
        setFormData({
          ...formData,
          [name]: value
        })
      },
      [formData, setFormData]
    )

    const renderField = useCallback(
      ([key, field]: [string, string]) => {
        const error = err[field as keyof TRequirementsUser]

        return (
          <section className={`regRequirements-section ${switchClass(!!error, 'error')}`} key={key}>
            <div className='regRequirements-field'>
              <h5>
                <span>*</span>
                {key}:
              </h5>
              <input
                type='search'
                autoComplete='off'
                {...register(field as keyof TRequirementsUser, {
                  onChange(event) {
                    handleInputChange(field as keyof TRequirementsUser, event.target.value)
                  }
                })}
              />
            </div>

            <p className='regRequirements-section__error'>{error?.message}</p>
          </section>
        )
      },
      [err, handleInputChange, register]
    )

    const renderSubmitButton = useCallback(() => {
      return (
        <button type='submit' className={`regRequirements-btn submit ${switchClass(!isValid, 'inactive')}`}>
          {isValid ? (
            <>
              <CheckCircle2Icon />
              Continuar con la reserva
            </>
          ) : (
            <>
              <AlertCircleIcon />
              Requerimos todos tus datos
            </>
          )}
        </button>
      )
    }, [isValid])

    return (
      <article className={`regRequirements ${switchClass(!showSubmit, 'loading')}`}>
        <div className='subtitle'>
          <h2 className='gr font3'>Datos de usuario</h2>
          <h4>
            Completa tus datos personales,
            <br /> para reservar la habitación
          </h4>
        </div>

        <form onSubmit={handleSubmit(onSubmit, onError)} className='regRequirements-form' ref={ref}>
          {Object.entries(keysValues).map(renderField)}
          <div className='regRequirements-actions'>
            {showSubmit && renderSubmitButton()}
            <button type='button' onClick={onReset} className='regRequirements-btn'>
              <Trash2Icon />
              Limpiar campos
            </button>
          </div>
        </form>
      </article>
    )
  })
)

RegisterRequirementsUser.displayName = 'RegisterRequirementsUser'

export default RegisterRequirementsUser
