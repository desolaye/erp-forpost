import { publicApi } from '@/shared/api/public-api.config'
import { AttributeType } from '../model/attributes.schema'

export const getAttributesAll = async () => {
  const response = await publicApi.get<AttributeType[]>('/v1/attributes')

  if (response.status >= 400) throw new Error()
  return response.data
}
