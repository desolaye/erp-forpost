import { GetWithParamsType } from '@/shared/model/get-with-params.type'
import { publicApi } from '@/shared/api/public-api.config'

import {
  NotificationResponseType,
  ZNotificationResponse,
} from '../model/notification.schema'

export const getNotificationsAll = async (props: GetWithParamsType) => {
  const { params } = props

  const response = await publicApi.get<NotificationResponseType>(
    'v1/nofitications-for-users',
    {
      params: { ...params },
    },
  )

  const parsed = ZNotificationResponse.safeParse(response.data)
  if (!parsed.success) console.error(parsed.error)

  return parsed.data
}
