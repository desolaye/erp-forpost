import { publicApi } from '@/shared/api/public-api.config'

export const deleteAppStaffNotificationById = async (notificationId: string) => {
  const response = await publicApi.delete(
    `v1/application-user-notifications/${notificationId}`,
  )

  if (response.status >= 400) throw new Error()
  return response.data
}
