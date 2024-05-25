import axios from 'axios'
import { Beer, CalendarClock, Car, Check, PawPrint, Wifi } from 'lucide-react'
import { API_URL } from 'shared/constants'

export const listOfCharacteristicsComponent = {
  Check,
  PawPrint,
  Car,
  Wifi,
  Beer,
  CalendarClock
}

const axiosCharacteristics = axios.create({
  baseURL: API_URL
})

export const getCharacteristics = async (): Promise<any[]> => {
  try {
    const res = await axiosCharacteristics('/characteristics')
    if (res.statusText !== 'OK') throw new Error('Hay problemas al cargar las características')

    console.log(res.data)
    return res.data.map(({ title, icon }) => {
      return { title, Icon: listOfCharacteristicsComponent[icon] }
    })
  } catch (error) {
    console.error('Error fetching rooms:', error)
    throw error
  }
}
