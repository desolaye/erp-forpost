import { publicApi } from '@/shared/api/public-api.config'
import { GetWithParamsType } from '@/shared/model/get-with-params.type'

import {
  ProductDevelopResponseType,
  ZProductDevelopResponse,
} from '../../model/product-develop.schema'

export const getProductDevelopByIssueId = async (
  id: string,
  params: GetWithParamsType,
) => {
  const response = await publicApi.get<ProductDevelopResponseType>(
    `v1/product-development/issue/${id}`,
    { params: params.params },
  )

  const parsed = ZProductDevelopResponse.parse(response.data)

  return parsed
}
