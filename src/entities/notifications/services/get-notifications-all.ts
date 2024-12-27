import { publicApi } from '@/shared/api/public-api.config'

import {
  NotificationResponseType,
  ZNotificationResponse,
} from '../model/notification.schema'

type RequestProps = {
  limit: number
  skip: number
}

export const getNotificationsAll = async (params: RequestProps) => {
  const response = await publicApi.get<NotificationResponseType>(
    'v1/nofitications-for-users',
    { params },
  )

  const parsed = ZNotificationResponse.safeParse(response.data)
  if (!parsed.success) console.error(parsed.error)

  return parsed.data
}
