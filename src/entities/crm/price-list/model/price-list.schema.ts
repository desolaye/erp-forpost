import { z } from 'zod'
import { isoToTime } from '@/shared/utils/iso-to-time'

export const ZPriceList = z
  .object({
    id: z.string().uuid(),
    operationId: z.string().uuid(),
    updatedById: z.string().uuid(),
    productId: z.string().uuid(),

    operationName: z.string(),
    productName: z.string(),
    updatedAt: z.string(),
    updatedByName: z.string(),

    price: z.number(),
  })
  .transform((data) => ({
    ...data,
    price: `${data.price}`,
    updatedAt: isoToTime(data.updatedAt),
  }))

export const ZPriceListResponse = z.object({
  priceLists: z.array(ZPriceList),
  totalCount: z.number(),
})

export const ZPriceListValidator = z.object({
  operationId: z.object({
    label: z.string(),
    value: z.string().uuid(),
  }),
  productId: z.object({
    label: z.string(),
    value: z.string().uuid(),
  }),
  price: z.string().regex(/[0-9]+/gi),
})

export const ZPriceListToBack = ZPriceListValidator.transform((data) => ({
  ...data,
  operationId: data.operationId.value,
  productId: data.productId.value,
}))

export type PriceListType = z.infer<typeof ZPriceList>
export type PriceListResponseType = z.infer<typeof ZPriceListResponse>
export type PriceListValidatorType = z.infer<typeof ZPriceListValidator>
export type PriceListToBackType = z.infer<typeof ZPriceListToBack>
