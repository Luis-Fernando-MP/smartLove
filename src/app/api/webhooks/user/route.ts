import { createUser, deleteUser } from '@/services/users/setUser.service'
import { IUser } from '@/services/users/user.service.types'
import { USER_WEBHOOK } from '@/shared/constants'
import { IncomingHttpHeaders } from 'http'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import { Webhook, WebhookRequiredHeaders } from 'svix'

import { IDeletedUser, IWebhookEvent, TWebhookEventType } from './clerk.types'

// /api/webhooks/user
async function handler(request: Request) {
  const payload = await request.json()
  const headersList = await headers()
  const heads = {
    'svix-id': headersList.get('svix-id'),
    'svix-timestamp': headersList.get('svix-timestamp'),
    'svix-signature': headersList.get('svix-signature')
  }

  const wh = new Webhook(USER_WEBHOOK)
  let evt: IWebhookEvent | null = null

  try {
    evt = wh.verify(JSON.stringify(payload), heads as IncomingHttpHeaders & WebhookRequiredHeaders) as IWebhookEvent
  } catch (err) {
    console.error((err as Error).message)
    return NextResponse.json({}, { status: 400 })
  }

  const eventType: TWebhookEventType = evt.type
  if (eventType === 'user.created' || eventType === 'user.updated') {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { id, first_name, image_url, last_name, email_addresses } = evt.data
    const sendUserData: IUser = {
      id,
      email: email_addresses[0].email_address,
      first_name: first_name ?? '',
      last_name: last_name ?? '',
      image_url: image_url
    }
    await createUser(sendUserData as any)
  }
  if (eventType === 'user.deleted') {
    const deletedUser = evt.data as unknown as IDeletedUser
    console.log(deletedUser)
    if (!deletedUser.deleted) return Response.json({ status: 'ok' })
    await deleteUser(deletedUser.id)
  }

  return Response.json({ status: 'ok' })
}

export const GET = handler
export const POST = handler
export const PUT = handler
