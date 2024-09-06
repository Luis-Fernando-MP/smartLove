export interface ISendReserveData {
  client: {
    fullName: string
    lastName: string
    email: string
    country: string
    location: string
    passportOrID: string
    phone: string
  }
  room: { id: number }
  userId: string

  fromDate: string
  toDate: string
  days: number
  subtotal: number
  igv: number
  totalAmount: number
  status: number
}
