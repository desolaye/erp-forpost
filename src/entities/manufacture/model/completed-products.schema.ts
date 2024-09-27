import { z } from 'zod'

export const ZCompletedProduct = z.object({
  id: z.string().uuid(),
  productDevelopmentId: z.string().uuid(),

  name: z.string(),
  serialNumber: z.string(),
})

export type CompletedProductType = z.infer<typeof ZCompletedProduct>
