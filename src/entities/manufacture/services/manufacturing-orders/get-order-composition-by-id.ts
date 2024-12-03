import { publicApi } from '@/shared/api/public-api.config'

import { ManufacturingOrderProductType } from '../../model/manufacturing-orders.schema'

export const getOrderCompositionById = async (orderId: string) => {
  const response = await publicApi.get<ManufacturingOrderProductType[]>(
    `v1/manufacturing-order-composition/${orderId}`,
  )

  if (response.status >= 400) throw new Error()
  return response.data
}
