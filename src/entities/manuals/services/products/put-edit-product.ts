import { publicApi } from '@/shared/api/public-api.config'
import { ProductType } from '../../model/product.schema'

export const putEditProduct = async (product: ProductType) => {
  const response = await publicApi.put<ProductType>(`v1/products`, product)
  return response
}
