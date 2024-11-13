import { publicApi } from '@/shared/api/public-api.config'
import { ProductToBackType } from '../../model/product.schema'

export const postCreateProduct = async (product: ProductToBackType) => {
  const response = await publicApi.post<string>('v1/products', {
    ...product,
    version: '1',
  })

  return response
}
