import { z } from 'zod'

export const ZTechcardResponse = z.object({
  id: z.string().uuid(),
  productId: z.string().uuid(),

  number: z.string(),
  description: z.string().nullable(),
  productName: z.string(),
})

export const ZTechcardsAllResponse = z.object({
  items: z.array(ZTechcardResponse),
  totalCount: z.number(),
})

export type TechcardsAllResponseType = z.infer<typeof ZTechcardsAllResponse>
