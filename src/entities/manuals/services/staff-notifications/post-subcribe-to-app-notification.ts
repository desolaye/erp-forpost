import { publicApi } from '@/shared/api/public-api.config'

type RequestProps = {
  userId: string
  notificationId: string
}

export const postSubscribeToAppNotification = async (props: RequestProps) => {
  const response = await publicApi.post('v1/application-user-notifications', props)

  if (response.status >= 400) throw new Error()
  return response.data
}
