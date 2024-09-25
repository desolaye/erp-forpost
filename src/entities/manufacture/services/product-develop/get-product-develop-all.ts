import { publicApi } from '@/shared/api/public-api.config'
import { GetWithParamsType } from '@/shared/model/get-with-params.type'

import {
  ProductDevelopResponseType,
  ZProductDevelopResponse,
} from '../../model/product-develop.schema'

export const getProductDevelopAll = async (props: GetWithParamsType) => {
  const { params } = props

  const response = await publicApi.get<ProductDevelopResponseType>(
    'v1/product-development',
    {
      params,
    },
  )

  const parsed = ZProductDevelopResponse.safeParse(response.data)
  if (parsed.error) console.log(parsed.error)

  return parsed.data
}
