import { publicApi } from '@/shared/api/public-api.config'

export const putIssueLaunch = async (id: string) => {
  const response = await publicApi.put(`v1/issues/${id}/launch`)
  return response
}
