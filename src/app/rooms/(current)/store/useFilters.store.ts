import { TFilterRoomsValidator, capacitiesValues, classificationsValues, pricingValues } from '@/shared/resolvers/rooms.resolver'
import { create } from 'zustand'

interface IFiltersStore {
  filters: TFilterRoomsValidator
  setFIlters: (newFilters: TFilterRoomsValidator) => void
}

const useFilters = create<IFiltersStore>(set => ({
  filters: {
    pricing: pricingValues[0].value,
    classification: classificationsValues[0].value,
    capacity: capacitiesValues[0].value
  },
  setFIlters: (newFilters: TFilterRoomsValidator) => set(() => ({ filters: newFilters }))
}))

export default useFilters
