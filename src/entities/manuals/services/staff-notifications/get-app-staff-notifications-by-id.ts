import { publicApi } from '@/shared/api/public-api.config'

import { AppStaffNotificationType } from '../../model/staff-notifications.schema'

export const getAppStaffNotificationsById = async (userId: string) => {
  const response = await publicApi.get<AppStaffNotificationType[]>(
    `v1/application-user-notifications/${userId}`,
  )

  if (response.status >= 400) throw new Error()
  return response.data
}
