import { publicApi } from '@/shared/api/public-api.config'
import { ProductType } from '../../model/product.schema'

export const getProductById = async (id: string) => {
  const response = await publicApi.get<ProductType>(`v1/products/${id}`)
  return response
}
