import { z } from 'zod'
import { statusToText } from '@/shared/utils/status-to-text'

export const ZProductDevelop = z
  .object({
    id: z.string().uuid(),
    productId: z.string().uuid(),
    manufacturingProcessId: z.string().uuid(),
    issueId: z.string().uuid(),

    productName: z.string(),
    batchNumber: z.string(),
    operationName: z.string(),
    serialNumber: z.string(),

    settingOption: z.number(),
    status: z.number(),
  })
  .transform((data) => ({
    ...data,
    status: statusToText(data.status),
  }))

export const ZProductDevelopResponse = z.object({
  developments: z.array(ZProductDevelop),
  totalCount: z.number(),
})

export type ProductDevelopType = z.infer<typeof ZProductDevelop>
export type ProductDevelopResponseType = z.infer<typeof ZProductDevelopResponse>
