import { publicApi } from '@/shared/api/public-api.config'

export const postCreateNotification = async (message: string) => {
  const response = await publicApi.post('v1/nofitications-for-users', {
    message,
  })

  return response.data
}
