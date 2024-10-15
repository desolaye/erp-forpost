import { publicApi } from '@/shared/api/public-api.config'
import { PriceListToBackType } from '../model/price-list.schema'

export const postCreatePriceList = async (priceList: PriceListToBackType) => {
  const response = await publicApi.post('v1/price-list', priceList)
  return response
}
