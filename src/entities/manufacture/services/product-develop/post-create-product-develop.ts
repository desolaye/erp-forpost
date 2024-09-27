import { publicApi } from '@/shared/api/public-api.config'
import { ProductStructureType } from '../../model/product-structure.schema'

export const postCreateProductDevelop = async (product: ProductStructureType) => {
  const response = await publicApi.post('v1/product-development', product)
  return response
}
