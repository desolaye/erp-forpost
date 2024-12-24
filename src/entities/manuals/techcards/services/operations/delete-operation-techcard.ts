import { publicApi } from '@/shared/api/public-api.config'

export const deleteOperationTechcard = async (id: string) => {
  const response = await publicApi.delete(`v1/tech-card-operation/${id}`)

  if (response.status >= 400) throw new Error()
  return response.data
}
