import { publicApi } from '@/shared/api/public-api.config'
import { ProductValidatorType } from '../../model/product.schema'

export const postCreateProduct = async (product: ProductValidatorType) => {
  const response = await publicApi.post<string>('v1/products', {
    ...product,
    version: '1',
  })

  return response
}
