import { isoToTime } from '@/shared/utils/iso-to-time'
import { z } from 'zod'

const ZManufacturingOrderFromBack = z.object({
  id: z.string().uuid(),
  invoiceId: z.string().uuid(),

  number: z.string(),
  description: z.string(),
  comment: z.string().nullable(),
  createdAt: z.string(),

  priority: z.object({
    value: z.number(),
    name: z.string(),
  }),

  manufacturingOrderStatus: z.object({
    value: z.number(),
    name: z.string(),
  }),
})

const ZManufactureOrderProduct = z.object({
  id: z.string(),
  manufacturingProcessOrderId: z.string(),
  productId: z.string(),
  productName: z.string(),
  quantity: z.number(),
})

export const ZManufacturingOrder = ZManufacturingOrderFromBack.extend({
  priority: z.number().or(z.string()),
  manufacturingOrderStatus: z.number().or(z.string()),
})

export const ZManufacturingOrderResponse = z.object({
  items: z.array(ZManufacturingOrderFromBack),
  totalCount: z.number(),
})

export const ZManufacturingOrderParser = ZManufacturingOrderResponse.transform<{
  totalCount: number
  items: ManufacturingOrderType[]
}>((data) => ({
  totalCount: data.totalCount,
  items: data.items.map((v) => ({
    ...v,
    priority: v.priority.value,
    manufacturingOrderStatus: v.manufacturingOrderStatus.value,
    createdAt: isoToTime(v.createdAt),
  })),
}))

export const ZManufacturingOrderByIdParser =
  ZManufacturingOrderFromBack.transform<ManufacturingOrderType>((data) => ({
    ...data,
    priority: data.priority.value,
    manufacturingOrderStatus: data.manufacturingOrderStatus.value,
    createdAt: isoToTime(data.createdAt),
  }))

export type ManufacturingOrderType = z.infer<typeof ZManufacturingOrder>
export type ManufacturingOrderFromBackType = z.infer<typeof ZManufacturingOrderFromBack>
export type ManufacturingOrderProductType = z.infer<typeof ZManufactureOrderProduct>
export type ManufacturingOrderResponseType = z.infer<typeof ZManufacturingOrderResponse>
