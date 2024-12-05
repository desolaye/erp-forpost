import { publicApi } from '@/shared/api/public-api.config'

import { AppNotificationType } from '../../model/staff-notifications.schema'
import { staffAppNotificationToText } from '../../utils/staff-app-notification-to-text'

export const getAppNotificationList = async () => {
  const response = await publicApi.get<AppNotificationType[]>(
    'v1/application-notifications',
  )

  if (response.status >= 400) throw new Error()
  return response.data.map((v) => ({
    ...v,
    notificationName: staffAppNotificationToText(v.notificationName),
  }))
}
