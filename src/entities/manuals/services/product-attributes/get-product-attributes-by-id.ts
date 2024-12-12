import { publicApi } from '@/shared/api/public-api.config'
import { ProductAttributeType } from '../../model/product-attributes.schema'

export const getProductAttributesById = async (id: string) => {
  const response = await publicApi.get<ProductAttributeType[]>(
    `v1/product-attributes/${id}`,
  )

  return response.data
}
