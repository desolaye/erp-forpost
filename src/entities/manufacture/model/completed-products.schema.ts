import { z } from 'zod'

export const ZCompletedProduct = z.object({
  id: z.string().uuid(),
  productDevelopmentId: z.string().uuid(),

  name: z.string(),
  serialNumber: z.string(),
})

export const ZCompletedProductResponse = z.object({
  completedProducts: z.array(ZCompletedProduct),
  totalCount: z.number(),
})

export type CompletedProductType = z.infer<typeof ZCompletedProduct>
export type CompletedProductResponseType = z.infer<typeof ZCompletedProductResponse>
