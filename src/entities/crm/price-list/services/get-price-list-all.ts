import { publicApi } from '@/shared/api/public-api.config'
import { ZPriceListResponse } from '../model/price-list.schema'
import { GetWithParamsType } from '@/shared/model/get-with-params.type'

interface IGetPriceListAll {
  params: GetWithParamsType['params']
  productName?: string
}

export const getPriceListAll = async (props: IGetPriceListAll) => {
  const { params, productName } = props

  const response = await publicApi.get('v1/price-list', {
    params: {
      Skip: params.skip,
      Limit: params.limit,
      ProductName: productName,
    },
  })

  const parsed = ZPriceListResponse.safeParse(response.data)
  if (parsed.error) console.error(parsed.error)

  return parsed.data
}
