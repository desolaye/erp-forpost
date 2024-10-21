import { isoToTime } from '@/shared/utils/iso-to-time'
import { z } from 'zod'

const ZPurchaseHistory = z.object({
  id: z.string().uuid(),
  storageId: z.string().uuid(),
  productId: z.string().uuid(),

  storageName: z.string(),
  productName: z.string(),
  entryDate: z.string(),

  quantity: z.number(),
  purchased: z.boolean(),
})

export const ZPurchaseHistoryResponse = z
  .object({
    entries: z.array(ZPurchaseHistory),
    totalCount: z.number(),
  })
  .transform((data) => ({
    ...data,
    entries: data.entries.map((v) => ({
      ...v,
      entryDate: isoToTime(v.entryDate, true),
      purchased: v.purchased ? 'Закупочный' : 'Собственный',
    })),
  }))

export type PurchaseHistoryType = z.infer<typeof ZPurchaseHistory>
export type PurchaseHistoryResponseType = z.infer<typeof ZPurchaseHistoryResponse>
