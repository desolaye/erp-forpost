import { publicApi } from '@/shared/api/public-api.config'
import { ProductAttributeType } from '../../model/product-attributes.schema'

export const deleteProductAttributesById = async (id: string) => {
  const response = await publicApi.delete<ProductAttributeType[]>(
    `v1/product-attributes/${id}`,
  )

  return response
}
