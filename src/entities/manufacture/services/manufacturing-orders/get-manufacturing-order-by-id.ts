import { publicApi } from '@/shared/api/public-api.config'

import {
  ManufacturingOrderFromBackType,
  ZManufacturingOrderByIdParser,
} from '../../model/manufacturing-orders.schema'

export const getManufacturingOrderById = async (orderId: string) => {
  const response = await publicApi.get<ManufacturingOrderFromBackType>(
    `v1/manufacturing-order/${orderId}`,
  )

  const parsed = ZManufacturingOrderByIdParser.safeParse(response.data)
  if (response.status >= 400 || !parsed.success) throw new Error()
  return parsed.data
}
