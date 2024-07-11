import { forwardRef, useCallback, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'
import { switchClass } from 'shared/helpers/switchClassName'
import { TRequirementsUser, keysValues } from 'shared/resolvers/requirementsUser.resolver'

import useRegisterStore, { defaultFormData } from '../../store/useRegisterStore'
import './style.scss'

interface IRegisterRequirementsUser {
  onSubmit: (data: any) => void
}

// eslint-disable-next-line react/display-name
const RegisterRequirementsUser = forwardRef<HTMLFormElement, IRegisterRequirementsUser>(
  ({ onSubmit }, ref) => {
    const { formData, setFormData } = useRegisterStore()
    const { register, handleSubmit, formState, setValue, reset } =
      useFormContext<TRequirementsUser>()
    const { errors: err, isValid } = formState

    useEffect(() => {
      Object.entries(formData).forEach(([key, value]) => {
        setValue(key as keyof TRequirementsUser, value)
      })
    }, [formData, setValue])

    const onError = (): void => {
      toast.error('Completa todos los campos correctamente')
      console.error('error', err)
    }

    const onReset = (): void => {
      reset()
      setFormData(defaultFormData)
    }

    const handleInputChange = useCallback(
      async (name: keyof TRequirementsUser, value: string) => {
        // eslint-disable-next-line promise/param-names
        // if (err[name]) return
        setFormData({
          ...formData,
          [name]: value
        })
      },
      [formData, setFormData]
    )

    return (
      <form onSubmit={handleSubmit(onSubmit, onError)} className='regRequirements-form' ref={ref}>
        {Object.entries(keysValues).map(([key, field]) => (
          <section
            className={`regRequirements-section ${switchClass(err[field], 'error')}`}
            key={key}
          >
            <div className='regRequirements-section__field'>
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
            <p className='regRequirements-section__error'>{err[field]?.message}</p>
          </section>
        ))}
        <div className='regRequirements-form__actions'>
          <button
            type='submit'
            className={`regRequirements-form__submit btn bgr ${switchClass(!isValid, 'inactive')}`}
          >
            {isValid ? 'Continuar con la reserva' : 'Requerimos todos tus datos'}
          </button>
          <button type='button' onClick={onReset} className='regRequirements-form__reset btn'>
            Limpiar campos
          </button>
        </div>
      </form>
    )
  }
)

export default RegisterRequirementsUser
