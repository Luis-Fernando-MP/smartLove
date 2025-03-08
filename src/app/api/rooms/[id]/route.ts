import { prisma } from '@/db/prisma'
import { NextRequest, NextResponse } from 'next/server'

interface Params {
  params: Promise<{ id: string }>
}

export async function GET(_: NextRequest, response: Params) {
  try {
    const { id } = await response.params
    const room = await prisma.room.findUnique({
      where: { id: Number(id) },
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
    if (!room) throw new Error('the room not found')

    const temporalRoom = {
      ...room,
      services: room.RoomServices.map((roomService: any) => roomService.ServicesRel)
    }
    const { RoomServices, ...newRoom } = temporalRoom
    console.log(RoomServices)
    return Response.json(newRoom ?? {})
  } catch (error) {
    console.log(error)
    return new NextResponse('INTERNAL SERVER ERROR', { status: 501 })
  }
}
