import { publicApi } from '@/shared/api/public-api.config'
import { ProductCompabilityType } from '../../model/product-compabilities.schema'

export const getProductCompabilitiesById = async (id: string) => {
  const response = await publicApi.get<ProductCompabilityType[]>(
    `v1/product-compatibilities/${id}`,
  )

  return response.data
}
