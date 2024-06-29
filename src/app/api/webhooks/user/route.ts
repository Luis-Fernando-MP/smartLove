import { IncomingHttpHeaders } from 'http'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import { USER_WEBHOOK } from 'shared/constants'
import { Webhook, WebhookRequiredHeaders } from 'svix'

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
  let evt: Event | null = null

  try {
    evt = wh.verify(
      JSON.stringify(payload),
      heads as IncomingHttpHeaders & WebhookRequiredHeaders
    ) as Event
  } catch (err) {
    console.error((err as Error).message)
    return NextResponse.json({}, { status: 400 })
  }

  const eventType: EventType = evt.type
  if (eventType === 'user.created' || eventType === 'user.updated') {
    const { id, ...attributes } = evt.data

    // TODO: update user
    console.log(id, attributes)
  }
}

type EventType = 'user.created' | 'user.updated' | '*'
interface Event {
  data: Record<string, string | number>
  object: 'event'
  type: EventType
}

export const GET = handler
export const POST = handler
export const PUT = handler
