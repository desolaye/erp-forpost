import { publicApi } from '@/shared/api/public-api.config'

export const deleteAgent = async (id: string) => {
  const response = await publicApi.delete(`v1/contractors/${id}`)
  return response
}
