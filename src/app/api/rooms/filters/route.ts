import { Prisma, Services } from '@prisma/client'
import { prisma } from 'db/prisma'
import { NextResponse } from 'next/server'
import { TFilterRoomsValidator } from 'shared/resolvers/rooms.resolver'

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
    const data = (await request.json()) as TFilterRoomsValidator
    const { capacity, classification, pricing } = data
    const rooms = await prisma.room.findMany({
      where: {
        AND: [
          { classification: { has: classification !== 'ALL' ? classification : 'ALL' } },
          { capacity: { has: capacity !== 'ALL' ? capacity : 'ALL' } },
          { pricing: { has: pricing !== 'ALL' ? pricing : 'ALL' } }
        ]
      },
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
    if (rooms.length < 1) return Response.json([])

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
