import { prisma } from '@/db/prisma'
import { TFilterRoomsValidator } from '@/shared/resolvers/rooms.resolver'
import { Prisma, Services } from '@prisma/client'
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
    const data = (await request.json()) as TFilterRoomsValidator
    const { capacity, classification, pricing } = data
    const rooms = await prisma.room.findMany({
      where: {
        AND: [
          classification !== 'ALL' && {
            classifications: {
              some: {
                classification: classification
              }
            }
          },
          capacity !== 'ALL' && {
            capacities: {
              some: {
                capacity: capacity
              }
            }
          },
          pricing !== 'ALL' && {
            pricings: {
              some: {
                pricing: pricing
              }
            }
          }
        ].filter(Boolean) as Prisma.RoomWhereInput[]
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

    const parseRooms = rooms.map((room: any) => {
      const services = room.RoomServices?.map((roomService: any) => roomService.ServicesRel) || []
      delete room.RoomServices
      const newRoom = { ...room, services }
      return newRoom
    })

    return Response.json(parseRooms ?? [])
  } catch (error) {
    console.log(error)
    return new NextResponse('INTERNAL SERVER ERROR', { status: 501 })
  }
}
