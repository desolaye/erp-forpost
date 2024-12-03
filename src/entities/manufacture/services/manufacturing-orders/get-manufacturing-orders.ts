import { publicApi } from '@/shared/api/public-api.config'

import {
  ManufacturingOrderResponseType,
  ZManufacturingOrderParser,
} from '../../model/manufacturing-orders.schema'

type RequestProps = {
  skip?: number
  limit?: number
  number?: string

  priorityStatus?: number
  manufacturingOrderStatus?: number
}

export const getManufacturingOrders = async (props: RequestProps) => {
  const { priorityStatus, limit, manufacturingOrderStatus, skip, number } = props

  const response = await publicApi.get<ManufacturingOrderResponseType>(
    'v1/manufacturing-order',
    {
      params: {
        Skip: skip,
        Limit: limit,
        Number: number,
        Priority: priorityStatus,
        ManufacturingOrderStatusValue: manufacturingOrderStatus,
      },
    },
  )

  const parsed = ZManufacturingOrderParser.safeParse(response.data)

  if (response.status >= 400 || !parsed.success) throw new Error()
  return parsed.data
}
