import { Prisma } from '@prisma/client'
import { prisma } from 'db/prisma'
import { NextRequest, NextResponse } from 'next/server'

export type TClientReservation = Prisma.ReservationGetPayload<{
  include: { room: { include: { images: true } }; client: true }
}>

interface IGetReservationParams {
  params: { idUser: string }
}

export async function GET(req: NextRequest, { params }: IGetReservationParams) {
  try {
    const { idUser } = params
    const clientData = await prisma.client.findUnique({
      where: { clerkId: idUser ?? '' }
    })
    if (!clientData) throw new Error("The client account doesn't exist")

    const reservations = await prisma.reservation.findMany({
      where: { clientId: clientData.clientId },
      include: { room: { include: { images: true } }, client: true }
    })

    return NextResponse.json(reservations)
  } catch (error: any) {
    console.error(error)
    return new NextResponse(error?.message ?? 'INTERNAL SERVER ERROR', { status: 500 })
  }
}
