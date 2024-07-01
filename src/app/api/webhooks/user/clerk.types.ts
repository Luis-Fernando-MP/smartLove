export type TWebhookEventType =
  | 'user.created'
  | 'user.updated'
  | 'user.deleted'
  | 'user.createdAtEdge'

export interface IWebhookEvent {
  data: IModifyUser
  object: 'event'
  type: TWebhookEventType
}

export interface IModifyUser {
  id: string
  first_name: string
  last_name: any
  has_image: boolean
  banned: boolean
  image_url: string
  profile_image_url: string
  created_at: number
  last_active_at: number
  email_addresses: EmailAddress[]
  external_accounts: ExternalAccount[]
}

export interface IDeletedUser {
  deleted: boolean
  id: string
}

interface EmailAddress {
  email_address: string
  id: string
  updated_at: number
  created_at: number
  linked_to: any[]
  verification: Verification[]
}

interface Verification {
  expire_at: null
  status: 'verified'
  strategy: string
}

interface ExternalAccount {
  id: string
  username: any
  given_name: string
  family_name: string
  email_address: string
  google_id: string
  verification: Verification[]
  created_at: number
  updated_at: number
}
