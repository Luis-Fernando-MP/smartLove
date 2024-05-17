import {
  TFilterRoomsValidator,
  capacitiesValues,
  classificationsValues,
  pricingValues
} from 'shared/resolvers/rooms.resolver'
import { create } from 'zustand'

interface IFiltersStore {
  filters: TFilterRoomsValidator
  setFIlters: (newFilters: TFilterRoomsValidator) => void
}

const useFilters = create<IFiltersStore>(set => ({
  filters: {
    pricing: pricingValues[1].value,
    classification: classificationsValues[1].value,
    capacity: capacitiesValues[1].value
  },
  setFIlters: (newFilters: TFilterRoomsValidator) => set(state => ({ filters: newFilters }))
}))

export default useFilters
