import { publicApi } from '@/shared/api/public-api.config'
import { GetWithParamsType } from '@/shared/model/get-with-params.type'

import { CompletedProductResponseType } from '../../model/completed-products.schema'

export const getProductCompleted = async (props: GetWithParamsType) => {
  const { params, filters } = props

  const response = await publicApi.get<CompletedProductResponseType>(
    'v1/completed-products/on-storage',
    {
      params: {
        ...params,
        ...filters,
      },
    },
  )

  return response.data
}
