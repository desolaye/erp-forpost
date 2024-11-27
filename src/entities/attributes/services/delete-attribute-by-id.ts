import { publicApi } from '@/shared/api/public-api.config'

export const deleteAttributeById = async (attrId: string) => {
  const response = await publicApi.delete(`/v1/attributes/${attrId}`)

  if (response.status >= 400) throw new Error()
  return response.data
}
