import { publicApi } from '@/shared/api/public-api.config'

export const getAttributeById = async (attrId: string) => {
  const response = await publicApi.get(`/v1/attributes/${attrId}`)

  if (response.status >= 400) throw new Error()
  return response.data
}
