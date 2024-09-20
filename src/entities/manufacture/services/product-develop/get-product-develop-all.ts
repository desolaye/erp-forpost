import { publicApi } from '@/shared/api/public-api.config'
import { GetWithParamsType } from '@/shared/model/get-with-params.type'

import { ProductDevelopResponseType } from '../../model/product-develop.schema'

export const getProductDevelopAll = async (props: GetWithParamsType) => {
  const { params } = props

  const response = await publicApi.get<ProductDevelopResponseType>(
    'v1/product-development',
    {
      params,
    },
  )

  return response.data
}
