import { prisma } from '@/db/prisma'

import { IUser } from './user.service.types'

export const createUser = async (userData: IUser) => {
  try {
    const client = await prisma.client.create({
      data: {
        clerkId: userData.id,
        firstName: userData.first_name ?? '',
        lastName: userData.last_name ?? '',
        documentNumber: '',
        phone: '',
        city: '',
        address: ''
      }
    })
    if (!client) throw new Error('Error while creating client')
    const user = await prisma.user.create({
      data: {
        email: userData.email,
        photoUrl: userData.image_url ?? '',
        clientId: client.clientId,
        status: true,
        password: ''
      }
    })
    if (!user) throw new Error('Error while creating user')

    return user
  } catch (error: any) {
    console.error(error?.message)
    throw new Error(error?.message)
  }
}

export const deleteUser = async (userId: string) => {
  try {
    const client = await prisma.client.findUnique({ where: { clerkId: userId } })
    if (!client) throw new Error('Error while deleting user')
    const user = await prisma.user.delete({ where: { clientId: client.clientId } })
    if (!user) throw new Error('Error while deleting user')
    await prisma.client.delete({ where: { clientId: client.clientId } })
  } catch (error: any) {
    console.error(error?.message)
    throw new Error(error?.message)
  }
}
