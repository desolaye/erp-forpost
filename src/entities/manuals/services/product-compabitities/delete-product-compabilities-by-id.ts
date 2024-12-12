import { publicApi } from '@/shared/api/public-api.config'
import { ProductAttributeType } from '../../model/product-attributes.schema'

export const deleteProductCompabilitiesById = async (id: string) => {
  const response = await publicApi.delete<ProductAttributeType[]>(
    `v1/product-compatibilities/${id}`,
  )

  return response
}
