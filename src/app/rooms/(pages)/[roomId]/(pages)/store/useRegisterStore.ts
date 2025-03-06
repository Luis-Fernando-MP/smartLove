import { TRequirementsUser } from '@/shared/resolvers/requirementsUser.resolver'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface IUseRegisterStore {
  formData: TRequirementsUser
  setFormData: (data: Partial<TRequirementsUser>) => void
}

export const defaultFormData = {
  fullName: '',
  lastName: '',
  passportOrID: '',
  phone: '',
  country: '',
  location: ''
}

const useRegisterStore = create(
  persist<IUseRegisterStore>(
    set => ({
      formData: defaultFormData,
      setFormData: data =>
        set(state => ({
          formData: { ...state.formData, ...data }
        }))
    }),
    {
      name: 'registerStore'
    }
  )
)

export default useRegisterStore
