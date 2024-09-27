import { z } from 'zod'

export const ZTechcardByProductDevelop = z.object({
  // id: z.string().uuid(),
  techCardId: z.string().uuid(),
  productId: z.string().uuid(),

  productName: z.string(),
  quantity: z.number(),
})

export type TechcardByProductDevelopType = z.infer<typeof ZTechcardByProductDevelop>
