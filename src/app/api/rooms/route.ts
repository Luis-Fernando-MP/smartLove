import { Prisma, Services } from '@prisma/client'
import { prisma } from 'db/prisma'
import { NextResponse } from 'next/server'

export type TFullDataRoom = Prisma.RoomGetPayload<{
  include: {
    images: true
    reservations: true
  }
}> & {
  services: Services[]
}
export async function GET() {
  try {
    const rooms = await prisma.room.findMany({
      include: {
        RoomServices: {
          include: {
            ServicesRel: true
          }
        },
        images: true,
        reservations: true
      }
    })
    if (rooms.length < 1) return []
    const parseRooms = rooms.map(room => {
      const temporalRoom = {
        ...room,
        services: room.RoomServices.map(roomService => roomService.ServicesRel)
      }
      const { RoomServices, ...newRoom } = temporalRoom
      return newRoom
    })
    return Response.json(parseRooms ?? [])
  } catch (error) {
    console.log(error)
    return new NextResponse('INTERNAL SERVER ERROR', { status: 501 })
  }
}
