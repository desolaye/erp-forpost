import { publicApi } from '@/shared/api/public-api.config'
import { AttributeType } from '../model/attributes.schema'

export const postCreateAttribute = async (attr: AttributeType) => {
  const response = await publicApi.post('/v1/attributes', {
    ...attr,
    attributeName: attr.name,
  })

  if (response.status >= 400) throw new Error()
  return response.data
}
