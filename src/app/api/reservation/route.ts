import { prisma } from '@/db/prisma'
import { ISendReserveData } from '@/services/reserve/reserve.service.types'
import { Prisma, Services } from '@prisma/client'
import dayjs from 'dayjs'
import { NextResponse } from 'next/server'

export type TFullDataRoom = Prisma.RoomGetPayload<{
  include: {
    images: true
    reservations: true
  }
}> & {
  services: Services[]
}
export async function POST(request: Request) {
  try {
    const data = (await request.json()) as ISendReserveData
    if (!data) return Response.json({ message: 'Missing props' }, { status: 400 })

    const { room, userId, ...reservation } = data
    const clientData = await prisma.client.findUnique({ where: { clerkId: userId } })
    if (!clientData) return Response.json({ message: "The client account don't exist" }, { status: 404 })

    const roomData = await prisma.room.findUnique({ where: { id: room.id } })
    if (!roomData) return Response.json({ message: "The room don't exist" }, { status: 404 })

    const reserved = await prisma.reservation.create({
      data: {
        clientId: clientData.clientId,
        roomId: roomData.id,
        checkIn: dayjs(reservation.fromDate).toISOString(),
        checkOut: dayjs(reservation.toDate).toISOString(),
        totalDays: reservation.days,
        subtotal: reservation.subtotal,
        tax: reservation.igv,
        status: true,
        total: reservation.totalAmount,
        fromDate: dayjs(reservation.fromDate).toISOString(),
        toDate: dayjs(reservation.toDate).toISOString()
      }
    })
    if (!reserved) throw new Error('Reservation not created')
    return Response.json({ statusText: 'OK', ...reserved })
  } catch (error: any) {
    console.log('from api/reservation POST', error)
    return new NextResponse(error.message ?? 'INTERNAL SERVER ERROR', { status: 501 })
  }
}

export type TFullReservation = Prisma.ReservationGetPayload<{
  include: {
    room: true
    client: true
  }
}> & {
  services: Services[]
}
export async function GET() {
  try {
    const reservations = await prisma.reservation.findMany({ include: { room: true, client: true } })
    return Response.json(reservations ?? [])
  } catch (error: any) {
    console.log(error)
    return new NextResponse(error.message ?? 'INTERNAL SERVER ERROR', { status: 501 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const reservationId = searchParams.get('id')
    if (!reservationId) return Response.json({ message: 'Reservation ID is missing' }, { status: 400 })

    const deletedReservation = await prisma.reservation.delete({
      where: { id: Number(reservationId) }
    })
    if (!deletedReservation) return Response.json({ message: 'Reservation not found' }, { status: 404 })

    return new NextResponse(JSON.stringify({ statusText: 'Reservation deleted successfully' }), {
      status: 200
    })
  } catch (error: any) {
    console.log(error)
    return new NextResponse(error.message ?? 'INTERNAL SERVER ERROR', { status: 501 })
  }
}
