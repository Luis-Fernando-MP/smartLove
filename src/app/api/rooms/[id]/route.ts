import { prisma } from 'db/prisma'
import { NextResponse } from 'next/server'

interface Params {
  id: string
}

export async function GET(request: Request, response: { params: Params }) {
  try {
    const { id } = response.params
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
      services: room.RoomServices.map(roomService => roomService.ServicesRel)
    }
    const { RoomServices, ...newRoom } = temporalRoom
    return Response.json(newRoom ?? {})
  } catch (error) {
    console.log(error)
    return new NextResponse('INTERNAL SERVER ERROR', { status: 501 })
  }
}
