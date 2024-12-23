import { publicApi } from '@/shared/api/public-api.config'

export const deleteItemTechcard = async (id: string) => {
  const response = await publicApi.delete(`v1/tech-card-item/${id}`)

  if (response.status >= 400) throw new Error()
  return response.data
}
