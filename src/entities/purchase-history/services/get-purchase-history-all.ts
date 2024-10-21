import { publicApi } from '@/shared/api/public-api.config'
import { ZPurchaseHistoryResponse } from '../model/purchase-history.schema'

interface IGetParams {
  limit: number
  skip: number
  purchased: boolean | number

  days?: string
  month?: string
  year?: string
}

export const getPurchaseHistoryAll = async (params: IGetParams) => {
  const response = await publicApi.get('/v1/entry-storage-histories', {
    params: {
      Limit: params.limit,
      Skip: params.skip,
      Days: params.days,
      Month: params.month,
      Year: params.year,
      Purchased: typeof params.purchased === 'number' ? undefined : params.purchased,
    },
  })

  const parsed = ZPurchaseHistoryResponse.safeParse(response.data)
  if (!parsed.success) console.error(parsed.error)

  return parsed.data
}
