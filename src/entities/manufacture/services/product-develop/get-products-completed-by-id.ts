import { publicApi } from '@/shared/api/public-api.config'

import { CompletedProductType } from '../../model/completed-products.schema'

export const getProductsCompletedId = async (id: string) => {
  const response = await publicApi.get<CompletedProductType[]>(
    `v1/completed-products/product/${id}`,
  )

  return response.data
}
