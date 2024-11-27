import { publicApi } from '@/shared/api/public-api.config'
import { AttributeType } from '../model/attributes.schema'

export const putEditAttribute = async (attr: AttributeType) => {
  const response = await publicApi.put('/v1/attributes', attr)

  if (response.status >= 400) throw new Error()
  return response.data
}
