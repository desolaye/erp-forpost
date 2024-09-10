import { publicApi } from '@/shared/api/public-api.config'
import { ProductType } from '../../model/product.schema'

export const getProductsManual = async () => {
  const response = await publicApi.get<ProductType[]>('v1/products')
  return response
}
