import { IncomingHttpHeaders } from 'http'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import { createUser } from 'services/users/setUser.service'
import { USER_WEBHOOK } from 'shared/constants'
import { Webhook, WebhookRequiredHeaders } from 'svix'

import { IDeletedUser, IModifyUser, IWebhookEvent, TWebhookEventType } from './clerk.types'

// /api/webhooks/user
async function handler(request: Request) {
  const payload = await request.json()
  const headersList = headers()
  const heads = {
    'svix-id': headersList.get('svix-id'),
    'svix-timestamp': headersList.get('svix-timestamp'),
    'svix-signature': headersList.get('svix-signature')
  }

  const wh = new Webhook(USER_WEBHOOK)
  let evt: IWebhookEvent | null = null

  try {
    evt = wh.verify(
      JSON.stringify(payload),
      heads as IncomingHttpHeaders & WebhookRequiredHeaders
    ) as IWebhookEvent
  } catch (err) {
    console.error((err as Error).message)
    return NextResponse.json({}, { status: 400 })
  }

  const eventType: TWebhookEventType = evt.type
  console.log('tipo: ', evt.type)

  if (eventType === 'user.created' || eventType === 'user.updated') {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { id, first_name, image_url, last_name, email_addresses } = evt.data
    const isCreated = await createUser({
      id,
      first_name,
      last_name,
      image_url,
      email: email_addresses[0].email_address
    })
    console.log(isCreated)
  }
  if (eventType === 'user.deleted') {
    const deletedUser = evt.data as unknown as IDeletedUser
    if (deletedUser.deleted) {
      console.log('deleted')
    } else {
      console.log('error to deleted')
    }
    console.log(deletedUser)
  }

  return Response.json({ status: 'ok' })
}

export const GET = handler
export const POST = handler
export const PUT = handler
