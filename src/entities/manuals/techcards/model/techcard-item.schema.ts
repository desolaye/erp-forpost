import { z } from 'zod'

export const ZTechcardItem = z.object({
  id: z.string().uuid(),
  productId: z.string().uuid(),
  techCardId: z.string().uuid(),

  quantity: z.number(),
  productName: z.string(),
})

export type TechcardItemType = z.infer<typeof ZTechcardItem>
