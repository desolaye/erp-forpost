import { z } from 'zod'

export const ZProductCompability = z.object({
  id: z.string().uuid(),
  productId: z.string().uuid(),
  parentProductId: z.string().uuid(),

  productName: z.string(),
  parentProductName: z.string(),
})

export type ProductCompabilityType = z.infer<typeof ZProductCompability>
